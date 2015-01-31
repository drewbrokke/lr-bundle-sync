var gulp = require('gulp');
var path = require('path');
var chalk = require('chalk');
var fs = require('fs-extra');
var watch = require('gulp-watch');
require('date-format-lite');

// Variables

var config = fs.readJsonSync('conf/config.json');

var liferayHome = config.liferayHome;
var bundleHome = config.bundleHome;

var docrootHome = path.join(liferayHome, 'portal-web', 'docroot');
var rootHome = path.join(bundleHome, 'tomcat-7.0.42', 'webapps', 'ROOT');

var watcherOptions = {
	name: 'Liferay Source Watcher',
	verbose: true
};

// Methods

function printError(error) {
	console.log(chalk.red(error));
}

function startGulpWatch(src, dest) {
	console.log(chalk.bgBlack.gray('Starting watcher...'));

	watch(path.join(src,'**/*.*'), watcherOptions)
		.pipe(gulp.dest(dest));

	console.log(chalk.bgBlack.gray('Listening for changes to') + chalk.bgBlack(' \"docroot\".') + '\n');
}

if (!liferayHome.length || !bundleHome.length) {
	printError('Please run \"npm run config\" to configure your source and bundle paths');
}
else if (fs.existsSync(docrootHome) && fs.existsSync(rootHome)) {
	startGulpWatch(docrootHome, rootHome);
}
else {
	printError('Make sure \"liferayHome\" is pointed to your Liferay source directory.');
	printError('Make sure \"bundleHome\" is pointed to the top-level bundle directory.');
}

