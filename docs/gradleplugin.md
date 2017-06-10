# Doppl Gradle Plugin

The Doppl Gradle plugin is the core of the Doppl framework. It is a tool to manage dependencies, collect target source code, and process everything through J2objc.

## History

The Doppl plugin started as a fork of the earlier [j2objc-gradle](https://github.com/j2objc-contrib/j2objc-gradle) plugin. Although ideologically similar, the two plugins differ significantly in the details. See below for more details on the changes.

## Dependency Management

`doppl` and `testDoppl` are configurations, just like compile, where you then provide a library that has been configured to work with doppl.

```groovy
doppl 'co.doppl.lib:androidbase:0.7.4.0'
testDoppl 'co.doppl.lib:androidbasetest:0.7.4.0'

compile 'de.greenrobot:eventbus:2.4.0'
doppl 'co.doppl.de.greenrobot:eventbus:2.4.0.1'
```

### Archive Format

The archive is zip format with the extension 'dop', which contains the Objective-C code, the jar (J2objc needs to read the Java types), and a few config files.

**Note**

*We keep Objective-C in this archive, but we'll probably need to change that in the future. If/when J2objc metadata changes, old builds won't be compatible. There isn't really a technical reason to keep Objective-C vs the source Java itself, except (arguably) performance, but this is minimal.*

The libraries we've published tend to be prefixed with co.doppl, even when a fork of another public library, and have an extra number to their version. The extra number allows multiple releases tagged to a base version, but it's also there because Maven can't really handle two artifacts at one location.

For a list of frameworks that are currently supported, take a look at the [doppl library dashboard](librarystatus.html).

## Output

`copyMainOutput`: The output path for Objective-C files.

```groovy
copyMainOutput '../ios/scratchllframework/main'
```

`copyTestOutput`: The output path for Objective-C test files.

`mainBridgingHeaderOutput`: The output path for main's Objective-C bridging header file.

```groovy
mainBridgingHeaderOutput '../ios/ios/Main-Bridging-Header.h'
```

`testBridgingHeaderOutput`: The output path for test's Objective-C bridging header file.

`copyDependencies`: Boolean; Collect your Doppl dependency Objective-C and write it to the Xcode output directory. Defaults to false.

- `translatePattern {}`: By default, j2objc translates all of the `.java` files in the project unless you tell it otherwise.
	- `Include` specifies the directories or files that you explicitly want to be translated.
	- `Exclude` specifies directories or files that you do not want translated.

```groovy
translatePattern {
        include '**/shared/**'
    }
```

`translatedPathPrefix`: Maps a path to a prefix you wish to replace it with. For example:

```groovy
translatedPathPrefix 'co.touchlab.droidconandroid.shared.data', 'DCD'
```

Instead of having your Objective-C classname be CoTouchlabDroidconAndroidSharedDataHome, it will be shortened to DCDHome. **There are more steps to this that need to be explained in a separate document.**

## Input

`generatedSourceDirs`: Add generated source files directories (e.g. files created from Dagger annotations). You probably don't need this parameter; it's only used if the plugin cannot find the generated files by itself.

```groovy
generatedSourceDirs 'build/generated/source/apt/main'
```

`generatedTestSourceDirs`: Add generated source files directories (e.g. files created from Dagger annotations) in tests. Again, you probably don't need this parameter; it's only used if the plugin cannot find the generated files by itself.

`overlaySourceDirs`: Use if you're going to have generated Java that actually replaces Java in your folders. So far, this has only been relevant to Realm; you probably won't need this parameter.

## Other

`disableAnalytics`: Boolean; whether you want Analytics turned on. Defaults to false. To see what data we're collecting, see [this document](analytics_link).

`emitLineDirectives`: Boolean; Generates debugging support. Defaults to false. For more information on debugging, see our [document on debugging](debugging_link).

`translateArgs`: Used to add different options to the way your Java code is translated. The list of supported options can be found [here](https://developers.google.com/j2objc/reference/j2objc).

`TranslateTask` already uses some of these args, so they do not have to be added manually. To see the arguments being added, you can [look at the source here](https://github.com/doppllib/doppl-gradle/blob/master/src/main/groovy/co/touchlab/doppl/gradle/tasks/TranslateTask.groovy#L332).

`skipDependsTasks`: Boolean; Skips the need to depend on test, jar, and javaCompile tasks. Defaults to false.

## Not supported

CyclerFinder in general.

`cycleFinderArgs`: Not currently supported.

## Comparison to j2objc-gradle

j2objc-gradle handles a lot of the dev process of J2objc, including compiling and running tests, and managing Xcode projects with CocoaPods. A lot of what was removed were features better handled by other tools. The general design is to do as little as is needed, and where better methods/tools are available, use them. The Doppl plugin assembles dependencies and pushes code to J2objc, but compiling Objective-C and linking apps is all done in Xcode. The idea is you are going to have an easier time debugging Objective-C linker issues in Xcode than using Gradle on the command line.

### No Native Build

j2objc-gradle used Gradle's native build functionality to compile and package libraries in the build step. In our experience, this could be problematic, and when things failed, debugging was difficult. Native build, at least in the way it was implemented, was cut off after Gradle 2.8, so the original plugin was capped at that version. This was not workable going forward. Doppl's gradle plugin works fine through current Gradle versions, including version 4 alpha.

### No Pods

j2objc-gradle used CocoaPods and attempted to manage the Xcode project directly. This can get messy. Doppl doesn't attempt to manage your Xcode project. You simply tell it where to put your Objective-C output. This is not all positive, as you have several setup steps on a new project, but CocoaPods can be difficult to work with when things aren't going right.

### Off By Default

j2objc-gradle would run and rebuild your Objective-C whenever you ran a build, which makes sense if you're always building that code. In practice, you're generally editing Java while building Android, then running the Objective-C conversion, and moving over to Xcode. To save time, the Doppl gradle plugin only runs when you specifically want to build the Objective-C code, which is definitely not always (in practice).

### Android Compatible

You can have a standalone Java module, or run the Doppl gradle plugin inside an Android project. You'll need to tell it what classes can and cannot be transpiled, but you don't need to have a multi module build.

### Dependencies

The ability to automatically fetch source jars and transpile them has been removed. Dependencies have a specific configuration and are built for Doppl by the Gradle plugin. The source jar download may be added back in the future, but in general we think most libraries should at least have their tests run, and setting up a separate project to build a library is not too difficult. You can also simply copy the library source to your project, if you don't want to bother making another library.
