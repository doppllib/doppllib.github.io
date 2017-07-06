# Starting a new project in Android Studio

One of the goals of Doppl is to have zero impact on your Android development time. However, there are some rules and patterns you'll need to follow to achieve this (or anything).

Doppl is designed to allow you to share non-UI code. You need to tell it what code to share, and make sure it doesn't try to translate code that isn't supported. That generally means UI code, platform specific code, and any code with libraries that don't have Doppl dependencies.

The simplest approach is to create a Java package called "shared" and use that for shared code, but you can organize the code any way you'd like. You'll just need to tell the Gradle plugin what it is.

## Download and Install

1. [/download.html](Download) the latest version. Extract and configure. See [/docs/quicktutorial.html](the tutorial) for more info.

2. Add to your `local.properties` file `j2objc.home=[dist dir]` where `[dist dir]` is where you've extracted the Doppl J2objc zip file, or if you've built J2objc from source, the `dist` directory.

## Add the Gradle Plugin

After creating a standard Android project with Studio, add the Doppl Gradle plugin.

1. In your project's root `build.gradle` file, under your `buildscript` and `allprojects` `repositories` block, add: `maven { url "https://dl.bintray.com/doppllib/maven" }`
*In the future these libraries should be on **jcenter***

2. In the same file, add `classpath 'co.doppl:gradle:0.8.0'` to the `dependencies` block.

3. At the top of your app's `build.gradle` file, add `apply plugin: 'co.doppl.gradle'`.

Your root `build.gradle` file should look like this

```groovy
buildscript {
    repositories {
        jcenter()
        maven { url "https://plugins.gradle.org/m2/" }
        maven { url "https://dl.bintray.com/doppllib/maven" }
    }
    dependencies {
        classpath "co.doppl:gradle:0.8.0"
    }
}

allprojects {
    repositories {
        jcenter()
        maven { url "https://dl.bintray.com/doppllib/maven" }
    }
}
```

## Configure the Build

1. Add Doppl specific dependencies as required by your shared code. `doppl` configuration for regular code, `testDoppl` for tests. Any dependencies or libraries that you use within your shared logic folder need to have both `compile` and `doppl` variants in your `dependencies` block. See the [Doppl library](doppllibrary.html) for extended Android support.

2. At the bottom of the app's `build.gradle` file, add the following code block:
```groovy
dopplConfig {

    copyMainOutput "../[iOS project folder]/[framework]/[output]"
    copyDependencies true

    translatePattern {
        include '**/[shared logic folder]/**'
    }
}
```
3. `copyMainOutput` points to the directory that you wish to deploy your Objective-C code to. To output your test code, add the `copyTestOutput` value.

4. The `translatePattern` lists folders or specific files that you want to be translated to Objective-C. If you set up a separate Java build, and all of the code is shared, you can omit this.

5. Run `./gradlew dopplDeploy` to deploy your code to Objective-C.

# Getting your deployed code in Xcode

J2objc by default does not use ARC. This means you'll need to tell Xcode that all of your Objective-C should not use ARC, but your manually written code most likely will. For our projects, we put the generated Objective-C in an embedded framework, which allows settings that apply to all files. You can organize your project any way you like, as long as ARC is turned off for J2objc-sourced files.

The Xcode setup is currently somewhat complicated. We'll be working on better integrations over time, but for now, follow the instructions below and/or watch this video.

(TODO make video)

1. Create a new project in Xcode and select `Single View Application`, and select Objective-C as your language. You can still use Swift in the project, but initially selecting Objective-C should help setup.
    - In this project, we're not setting up git for the iOS project itself, as both projects are in the same folder, and thus one repo. You're not required to do this, but if you wish to set up git for the iOS project it will come up as a subproject and you will have to handle that yourself. This won't be a problem if you create your iOS project elsewhere.

2. Go to `Xcode -> Preferences -> Locations` and select the Custom Paths tab. Add 'J2OBJC_LOCAL_PATH' and set Path
to your J2objc dist directory (no trailing slash).
![xcode paths](https://s3.amazonaws.com/dopplmaven/xcodepath.png)

3. Now, save this project inside your Android app's root folder. Remember, in our Android app's `build.gradle` file we wrote this: `copyMainOutput "../[ios project folder]/[framework]/[output]"`

4. (Optional) If you're using Swift, you'll want to create a bridging header. The easy way to do that is to create a Swift file. Xcode will ask if you want to create a briding header. Let it. You'll have to add all the generated Java, or let Doppl Gradle create bridging headers for your translated code. Best practice would probably be to include these generated files from your manually managed bridging header, as the generated files are periodically overwritten.

    1. Add the Header paths from the framework to the ios project.

    2. If you're gonna use Swift, you have to explicitly import JRE, and then it works as it should (if you have types from the JRE)

5. We now have to add a new `Cocoa Touch Framework`. To do so, go to `File -> New -> Target` and select it. Name your Framework whatever you named it in your `build.gradle` file.

6. Right click on the Framework you've just created and select `Add files to [iOS project folder]`. Select the folder that matches the name that you wrote in place of *(output folder)* in your `build.gradle` file. This will import all of the files you've deployed from your Android app. However, you won't be able to successfully build your project yet.

7. Go to your app's project file and select your framework from the list of targets. In the `General` tab under `Linked Frameworks and Libraries` add `libiconv.tbd` and `UIKit.framework`.

8. Open Finder and navigate to the directory that you saved j2objc to. Inside the `dist/frameworks` folder should be `JRE.framework`. Drag that file into your set of `Linked Frameworks and Libraries`.

9. Now, select the `Build Settings` tab and find `Other Linker Flags` within the `Linking` drop down. Add `-ObjC`, `-lz`, and `-lsqlite3`.

10. Find the `Search Paths` drop down.

  - In `Framework Search Paths` add `$(J2OBJC_LOCAL_PATH)/frameworks`

  - In `Header Search Paths` add `$(J2OBJC_LOCAL_PATH)/frameworks/JRE.framework/Headers`
11. Find the `Apple LLVM 8.1 - Language - Objective-C` drop down, and set `Objective-C Automatic Reference Counting` to No.

12. Now you should be able to build your app.
