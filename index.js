const mocha = require('mocha');
var color = mocha.reporters.Base.color;
var cursor = mocha.reporters.Base.cursor;
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
  console.log('in mocha-webpack-notifier-reporter.js');
  mocha.reporters.Base.call(this, runner);
  var passed = 0;
  var failed = 0;
  var total = 0;
  runner.on('test', function(test) {
    process.stdout.write(color('pass', '    ' + test.fullTitle() + ': '));
  });

  runner.on('pending', function(test) {
    var fmt = color('checkmark', '  -') + color('pending', ' %s');
    console.log(fmt, test.fullTitle());
  });
  runner.on('pass', function(test){
    passed++;
    var fmt =
    color('checkmark', '  ' + mocha.reporters.Base.symbols.ok) +
    color('pass', ' %s: ') +
    color(test.speed, '%dms');
    cursor.CR();
    console.log(fmt, test.fullTitle(), test.duration);
    // console.log('pass: %s', test.fullTitle());
  });

  runner.on('fail', function(test, err){
    failed++;
    cursor.CR();
    console.log(color('fail', '  %d) %s'), failed++, test.fullTitle());
    notifier.notify({
      title: 'Test:' + test.fullTitle(),
      message: 'err:' + err.message,
      icon: errorIcon
    });
  });

  runner.on('end', function(test){
    var iconType = okIcon;
    if (failed > 0) {
      iconType = errorIcon;
    }

    total = passed + failed;
    console.log('Fail/Pass/Total: %d/%d/%d', failed, passed, total);
    notifier.notify({
      title: 'Test Results',
      message: ' Failed: ' + failed + ' | Pass: ' + passed + ' | Total: ' + total,
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
