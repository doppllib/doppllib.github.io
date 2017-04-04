# Getting Started

## J2objc

We have a moderately modified version of J2objc, mostly around how files are named. You'll need to install the Doppl version of J2objc.

### Binary

Download the [binary zip](https://s3.amazonaws.com/dopplmaven/dist.zip) from here 

Extract the zip file and record the location. That will be REPO_PATH later in this doc. (For now, try to avoid spaces in the path)

### Source

Clone our forked repo at [https://github.com/doppllib/j2objc](https://github.com/doppllib/j2objc). To build the source, see the [INSTALL](https://github.com/doppllib/j2objc/blob/master/INSTALL) doc, and then run: 

```
make -j8 frameworks
```

Source builds tend to take quite a while. Just fyi.

When complete, look for the *dist* dir in the source folder. This will be REPO_PATH.

## Gradle

Currently the gradle plugin and the doppl dependencies are in an S3 repo. Add the following lines to your build scripts to find them.

```
buildscript {
    repositories {
        //Other repos
        ivy { url 'https://s3.amazonaws.com/dopplmaven/' }
    }
    dependencies {
    	//Other dependencies
        classpath 'co.touchlab.doppl:gradle:0.6.1-SNAPSHOT'
    }
}
```

```
allprojects {
    repositories {
        //Other repos
        ivy { url dopplIvyDeploy }
    }
}
```

If you're wondering, we used ivy because the maven publish plugin had difficulty with multiple components.