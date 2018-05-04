## This is a Sample Reporter
This is a very simple reporter that supports notifications via Webpack, Mocha, node-notifier.

## Customize your own Reporter
Clone this project
Rename this project folder to your-reporter-name
Modify the package.json details
Modify index.js to desired format & save
CD to the directory
Create the node_module with the following code
`npm pack`
install in a different project
`npm install ./path/to/your-reporter-name-1.0.0.tgz --save-dev`
add to cli, mocha.opts, package.json (Script)
`--reporter your-reporter-name`
