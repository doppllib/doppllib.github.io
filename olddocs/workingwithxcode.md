# Xcode Setup

J2ojbc outputs Objective-C code that, by default, does not have ARC enabled. There are a few libraries that J2objc may require, and some additional ones required by Doppl libraries. We'll explain some of the details and decisions here with regards to how Xcode can be configured.

## J2ojbc Frameworks

Building J2ojbc from source includes static libs, headers, and (optionally) Framework distributions. We have opted to focus on the Frameworks. You'll find the core libraries included with J2ojbc in the dist package. These include Guava, JavaInject, JRE, JSR305, JUnit, Mockito, and Xalan.

We've run into packaging issues with the way these frameworks are set up. You can include them in your project, but still need to add a header search path to find the correct headers. Post release we'll be working on cleaner framework support.

In general you'll need to include the JRE framework for anything to work. The remainder are use dependent. You'll also have to include the iconv library to correctly link JRE.

## Transpile Output

Stock J2ojbc puts output classes in the same folder structure that Java supports. Packages and folders have to match. Xcode **does not** like folders, at least not in the same way that Java does. The primary modification of J2ojbc for Doppl was to support a flat output structure.

If you add new code, Xcode won't know where to find it. Right click on a folder and select "Add Files to ...". Because the output structure is a flat set of files, you can just import output folders completely and should avoid name collisions. We suggest using groups instead of folders inside Xcode.

## Linker Args

* -lz - Link with the zip/compression library. Needed for various Java things.
* -lsqlite3 - Link with sqlite. This is only needed for the extended Android support, which implements sqlite functionality.
* -ObjC - By default, Xcode will only include object code for code that is directly referenced. That means if you try to dynamically load something that isn't referenced, it won't be found. This linker flag drags everything into the output, but will add to your total deploy size. When releasing to production, it would be a good idea to try to remove this.

## ARC

J2ojbc has ARC off by default. In our tests, turning ARC on sometimes doesn't go well, so we've also left it off. You'll need to tell the build system about this. For our projects, the easiest way to do that was by creating an embedded framework, but YMMV.

## General Xcode Setup

The Gradle Plugin doesn't apply too many opinions about where you can put your code and how it's built. However, we have a general pattern that we use to set up projects.

There is a main project, generally a `Single View Application`.

After creating the main project, we add an embedded framework. This is where we write out the Objective-C code. The reason for having a different target is simple. You can apply the relatively "unusual" settings to all files at once. Specfically, you can tell the compiler to avoid ARC on all files in the framework.

You'll also add whatever J2ojbc frameworks you want to use to the embedded framework target.

You can try the [sample app](https://github.com/doppllib/PartyClickerSample) to see a functional project. To set up a new project with this configuration, see the following.

### Steps

1. Create a new project in Xcode and select `Single View Application`, and select Objective-C as your language. You can still use Swift in the project, but initially selecting Objective-C will "force" Xcode to create a bridging header when you add your first Swift file.

2. Go to `Xcode -> Preferences -> Locations` and select the Custom Paths tab. Add a value with `J2OBJC_LOCAL_PATH` as the name and the path to your J2ojbc dist folder as the value (no trailing slash).

3. Add the embedded framework. Go to `File -> New -> Target` and select  `Cocoa Touch Framework`. Name your Framework whatever you named it in your `build.gradle` file.

4. Go to your app's project file and select your framework from the list of targets. In the `General` tab under `Linked Frameworks and Libraries` add
    - `libiconv.tbd` is used for character encoding and decoding. Required for all J2ObjC usage.
    - `UIKit.framework` provides the required infrastructure for your iOS app.

5. Open Finder and navigate to the directory that you saved j2objc to. Inside the `dist/frameworks` folder should be `JRE.framework`. Drag that file into your set of `Linked Frameworks and Libraries`.

6. Now, select the `Build Settings` tab and find `Other Linker Flags` within the `Linking` drop down. Add `-ObjC`, `-lz`, and `-lsqlite3` (if needed)

    - `-ObjC` causes all classes in all linked static libraries to be included in the app, whether or not they are actually used. It is also used to recognize classes that fail to load at runtime (e.g. through reflection like JUnit and Mockito).

    - `-lz` is used by java.util.zip. You need to link this if you are linking jre_zip.

    - `-lsqlite3` includes sqlite support.

7. Find the `Search Paths` drop down.

    - In `Framework Search Paths` add `$(J2OBJC_LOCAL_PATH)/frameworks`

    - In `Header Search Paths` add `$(J2OBJC_LOCAL_PATH)/frameworks/JRE.framework/Headers`. If you are using other J2objc frameworks, add them here as well.

8. Find the `Apple LLVM 8.1 - Language - Objective-C` drop down, and set `Objective-C Automatic Reference Counting` to No.

### Deploying your code

When you first run `./gradlew dopplDeploy`, none of your code will show up in Xcode. To make it show up, you must right click on the framework that you made earlier, and click "Add files to *project-name*" and select `main` (and `test` if you deployed tests).

Similarly, if you add or remove java files, further deploys will not show these changes immediately. To make them show up, you have to add them to the `main` or `test` directory in your iOS Project in the same manner.

### Running your tests

If you've written tests for your app, by default doppl will create a `dopplTests.txt` file listing all classes that end with Test. This can be specified further in the `dopplConfig` closure in your `build.gradle` file.

Add the `dopplTests.txt` file to the `ios` target's `Copy Bundle Resources` in the `Build Phases` tag.

In your `AppDelegate.m` file add these two code snippets:

```
#import "DopplRuntime.h"
#import "OneTest.h"
```

```
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    // add these two lines
    [DopplRuntime start];
    [OneTest runDopplResourcesWithNSString:@"dopplTests.txt"];

    return YES;
}
```

`DopplRuntime` is only necessary if you're doing anything with the extended Doppl/Android support.

This will run all of tests in the classes listed in `dopplTests.txt` on app startup.
