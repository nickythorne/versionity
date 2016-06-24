#!/usr/bin/env node

const Semver = require('semver');
const application = require('commander');
const package = require('../package.json');
const exec = require('child_process').exec;
const utils = require('./utils');

const INVALID_DIRECTORY_ERROR = '\nApplication must be run in a valid node application directory. There must be a valid package.json file with a declared version key.\n\n';

application.version(package.version)
    .usage('\<semver release type\> [options]')
    .description('Performs a semver version update on the current directory package.json file, based on the release type specified.')
    .option('-i. --identifier [identifier]', 'A custom identifier that can be specified for pre-type version updates.')
    .option('-p, --publish', 'Automatically publishes the application after performing the version update.')
    .on('--help', utils.displayCustomHelpMessage);

utils.validateApplicationRun(application, INVALID_DIRECTORY_ERROR);

application.action(function(semverReleaseType) {

    var applicationPackage = utils.getNodePackageFile();
    var applicationSemver = new Semver(applicationPackage.version);

    try {

        applicationSemver.inc(semverReleaseType, application.identifier);

        npmUpdateVersion(applicationSemver.version, function(newVersion) {
            console.log('Successfully updated package: ' + applicationPackage.name + ' version from: ' + applicationPackage.version + ' to ' + newVersion.replace(/\n$/, ''));
            (application.publish) ? npmPublish(applicationPackage.version) : process.exit();
        });

    } catch(e) {
        throw Error('Unknown release type specified: ' + semverReleaseType);
    }

});

function npmUpdateVersion(newVersion, callback) {

    exec('npm version ' + newVersion, function(error, stdout) {

        if(error) throw Error('An error occurred updating the package version: Error: ' + error);
        callback(stdout);

    });

}

function npmPublish(revertVersion) {

    console.log('Publishing package...');

    exec('npm publish', function(error, stdout) {

        var error = true;
        if(error) {
            npmUpdateVersion(revertVersion, function() {
                throw Error('An error occurred when attempting to publish. Reverted package update. Error:' + error);
            });
        }

        console.log('Successfully published package. ' + stdout);
        process.exit();

    });

}


application.parse(process.argv);
