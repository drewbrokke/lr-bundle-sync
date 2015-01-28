var gulp = require('gulp');
var path = require('path');
var chalk = require('chalk');
var S = require('string');
var fs = require('fs-extra');

var config = fs.readJsonSync('conf/config.json');
var liferayHome = config.liferayHome;
var bundleHome = config.bundleHome;

var docrootHome = path.join(liferayHome, 'portal-web', 'docroot');
var rootHome = path.join(bundleHome, 'tomcat-7.0.42', 'webapps', 'ROOT');

function startGulpWatch(src, dest) {
	console.log(chalk.bgBlack.gray('Listening for changes to') + chalk.bgBlack(' \"docroot\".\n'));

	gulp.watch(path.join(src,'**/*.*'), function(event) {
		var filePath = path.dirname(event.path).replace(src, dest);

		gulp.src(event.path)
			.pipe(gulp.dest(filePath));

		var date = new Date();
		var time = [
			date.getHours(),
			date.getMinutes(),
			date.getSeconds(),
		].join(':');

		console.log(chalk.yellow(time) + ' - ' +  chalk.green('Updated file: ') + event.path.replace(src, ''));
	});
}

if (!liferayHome.length || !bundleHome.length) {
	console.log(chalk.red('Please run \"npm run config\" to configure your source and bundle paths'));
}
else if (fs.existsSync(docrootHome) && fs.existsSync(rootHome)) {
	startGulpWatch(docrootHome, rootHome);
}
else {
	console.log(chalk.red('Make sure \"liferayHome\" is pointed to your Liferay source directory.'));
	console.log(chalk.red('Make sure \"bundleHome\" is pointed to the top-level bundle directory.'));
}

