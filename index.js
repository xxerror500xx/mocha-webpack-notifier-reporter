var mocha = require('mocha');
const notifier = require('node-notifier');

module.exports = MyReporter;

notifier.notify({
  title: 'Mocha testing START!',
  message: 'Started!'
});
function MyReporter(runner) {
  console.log('in mocha-notifier-reporter.js');
  mocha.reporters.Base.call(this, runner);
  var passed = 0;
  var failed = 0;
  var total = 0;

  runner.on('pass', function(test){
    passed++;
    console.log('pass: %s', test.fullTitle());
  });

  runner.on('fail', function(test, err){
    failed++;
    console.log('fail: %s -- error: %s', test.fullTitle(), err.message);
    notifier.notify({
      title: test.fullTitle(),
      message: err.message
    });
  });

  runner.on('end', function(){
    total = passed + failed;
    console.log('end: %d/%d', passed, total);
    notifier.notify({
      title: 'Mocha testing END!',
      message: 'Pass: ' + passed + ' Failed: ' + failed + ' Total: '+ + total
    });
    process.exit(failed);
  });

}
