const  path = require('path');

function validateApplicationRun(application, errorMessage) {
    
    if(!getNodePackageFile(application.directory)) {
        throw Error(errorMessage);
    }

    if(process.argv.length <= 2) {
        application.outputHelp();
        process.exit(1);
    }
    
}

function getNodePackageFile(overrideDirectory) {
    
    try {

        var currentDirectory = overrideDirectory || process.cwd();
        var directoryPackagePath = path.join(currentDirectory, 'package.json');
        require.resolve(directoryPackagePath);

        return require(directoryPackagePath);

    } catch(e) {
        return false
    }
    
}

function displayCustomHelpMessage() {

    console.log('  Examples:');
    console.log('');
    console.log('    $ versionity major');
    console.log('    $ versionity patch');
    console.log('    $ versionity preminor --identifier SNAPSHOT');
    console.log('    $ versionity prerelease --i beta');
    console.log('');
    
}

module.exports = {
    validateApplicationRun : validateApplicationRun,
    getNodePackageFile : getNodePackageFile,
    displayCustomHelpMessage : displayCustomHelpMessage
};
