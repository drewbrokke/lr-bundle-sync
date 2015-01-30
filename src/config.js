var fs = require('fs-extra');
var inquirer = require("inquirer");
var chalk = require('chalk');

var config = fs.readJsonSync('conf/config.json');

function validatePath(filePath) {
	return fs.existsSync(filePath);
}

var liferayHomeQ = {
	type: 'input',
	name: 'liferayHome',
	message: 'Path to your Liferay source directory',
	default: config.liferayHome,
	validate: validatePath
}

var bundleHomeQ = {
	type: 'input',
	name: 'bundleHome',
	message: 'Path to your bundle directory',
	default: config.bundleHome,
	validate: validatePath
}

inquirer.prompt([liferayHomeQ, bundleHomeQ], function(answers) {
	config.liferayHome = answers.liferayHome
	config.bundleHome = answers.bundleHome

	fs.writeJsonSync('conf/config.json', config);

	console.log(chalk.white.bold('\nPaths updated :)\n'));
});