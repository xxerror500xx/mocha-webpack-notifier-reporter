const mocha = require('mocha');
const notifier = require('node-notifier');
const path = require('path');
const mochaIcon = path.join(__dirname, 'icons/mocha.svg');
const errorIcon = path.join(__dirname, '../mocha/images/error.png');
const okIcon = path.join(__dirname, '../mocha/images/ok.png');

module.exports = MyReporter;

notifier.notify({
  title: 'Test cycle',
  message: 'Started',
  icon: mochaIcon
});
function MyReporter(runner) {
  console.log('in mocha-notifier-reporter.js');
  mocha.reporters.Base.call(this, runner);
  var passed = 0;
  var failed = 0;
  var total = 0;

  runner.on('pass', function(test){
    passed++;
    // console.log('pass: %s', test.fullTitle());
  });

  runner.on('fail', function(test, err){
    failed++;
    console.log('Fail: %s -- error: %s', test.fullTitle(), err.message);
    notifier.notify({
      title: test.fullTitle(),
      message: err.message,
      icon: errorIcon
    });
  });

  runner.on('end', function(){
    var iconType = okIcon;
    if (failed > 0) {
      iconType = errorIcon;
    }

    total = passed + failed;
    console.log('end: %d/%d', passed, total);
    notifier.notify({
      title: 'Test Results',
      message: ' Failed: ' + failed + ' | Pass: ' + passed + ' | Total: '+ total,
      icon: iconType
    });
    notifier.notify({
      title: 'Test cycle',
      message: 'Ended!',
      icon: mochaIcon
    });
    // process.exit(failed);
  });

}
