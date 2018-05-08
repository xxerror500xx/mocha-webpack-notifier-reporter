## This is a Sample Reporter
This is a very simple reporter that supports notifications via Webpack, Mocha, using node-notifier to provide pop-up notifications during a development cycle.
## Use this package out of the box
1. `npm install mocha-webpack-notifier-reporter --save-dev`
## Customize your own Reporter
1. Clone this project
2. Rename this project folder to your-reporter-name
3. Modify the package.json details
4. Modify index.js to desired format & save
5. CD to the directory
6. Create the node_module with the following code
7. `npm pack`
8. install the package created in a different project
9. `npm install ./path/to/your-reporter-name-1.0.0.tgz --save-dev`
10. add to cli, mocha.opts, package.json (Script)
11. `--reporter your-reporter-name`
