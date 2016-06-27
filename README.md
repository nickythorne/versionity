Introduction
====================

`versionity` is a CLI application that allows the version of any node.js package to be updated using the [semver](http://semver.org) specification.
 It's essentially a wrapper on top of the [semver](https://github.com/npm/node-semver) package, but it will also apply the version change to the package.json directly, as-well as publish the newly version module if specified.
  
 The utility is best suited when hooked into a CI process, such that package versions are incremented correctly.
 

Installation
------------

    $ npm install versionify -g

Usage
-----------


    Options:
    
      -h, --help                     output usage information
      -V, --version                  output the version number
      -i. --identifier [identifier]  A custom identifier that can be specified for pre-type version updates.
      -p, --publish                  Automatically publishes the application after performing the version update
      -d, --directory                Change the directory where the package.json is located.
      -vo, --versionOnly             This will only output the updated version number to stdout. All other logging is disabled.



The CLI supports any of the [semver](https://github.com/npm/node-semver) release type commands for incrementing the version number, this includes:

+ major
+ premajor
+ minor
+ preminor
+ patch
+ prepatch
+ prerelease


The application must run at the root of a node.js application directory. And there must be a valid package.json with a version key present in that directory.

Please find some examples below.

The below examples are based on an initial package version of: 0.1.0:

    {
      "name": "header-router",
      "version": "0.1.0",
      ...
    }



The following command will update the package.json version to 1.0.0 as it's a major version change.

    versionity major
    Successfully updated package: header-router version from: v0.1.0 to v1.0.0
    
The following will update the version to the next patch version:

    versionity patch
    Successfully updated package: header-router version from: v1.0.0 to v1.0.1
    
The following will perform a prerelease version update:

    versionity prerelease
    Successfully updated package: header-router version from: v1.0.1 to v1.0.2-0
    
When specify any pre-* release semver update, you can use the --identifier, or -i option to specify a custom identifier. Example:

    versionity preminor --identifier SNAPSHOT
    Successfully updated package: header-router version from: v1.0.2-0 to v1.1.0-SNAPSHOT.0
    
In additon, you can also request `versionity` to publish the module to a pre-configured npm registry by adding the --publish options. Examples below performs a major version update and publishes the new versioned package:

    Successfully updated package: header-router version from: v1.1.0-SNAPSHOT.0 to v2.0.0
    Publishing package...
    Successfully published module. + header-router@2.0.0
    
    
    
    
    


