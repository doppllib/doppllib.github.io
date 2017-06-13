# Working with Xcode

If you're an Android developer, you may not be used to working with Xcode and some of its quirks. On top of that, doppl requires some special instructions to get up and running in Xcode.

### Setting up Xcode

1. Create a new project in Xcode and select `Single View Application`, and select Objective-C as your language. You can still use Swift in the project, but initially selecting Objective-C should help initial setup.

2. Go to `Xcode -> Preferences -> Locations` and select the Custom Paths tab. Enter in (**insert image of what to type into the paths part from the samples**), where Path is the path to your `dist` folder in j2objc.

3. We now have to add a new `Cocoa Touch Framework`. To do so, go to `File -> New -> Target` and select it. Name your Framework whatever you named it in your `build.gradle` file.

4. Go to your app's project file and select your framework from the list of targets. In the `General` tab under `Linked Frameworks and Libraries` add
    - `libiconv.tbd` is used for character encoding and decoding. Required for all J2ObjC usage.
    - `UIKit.framework` provides the required infrastructure for your iOS app.

5. Open Finder and navigate to the directory that you saved j2objc to. Inside the `dist/frameworks` folder should be `JRE.framework`. Drag that file into your set of `Linked Frameworks and Libraries`.

6. Now, select the `Build Settings` tab and find `Other Linker Flags` within the `Linking` drop down. Add `-ObjC`, `-lz`, and `-lsqlite3`

    - `-ObjC` causes all classes in all linked static libraries to be included in the app, whether or not they are actually used. It is also used to recognize classes that fail to load at runtime (e.g. through reflection like JUnit and Mockito).

    - `-lz` is used by java.util.zip. You need to link this if you are linking jre_zip.

    - `-lsqlite3` includes sqlite support.

7. Find the `Search Paths` drop down.

    - In `Framework Search Paths` add `$(J2OBJC_LOCAL_PATH)/frameworks`

    - In `Header Search Paths` add `$(J2OBJC_LOCAL_PATH)/frameworks/JRE.framework/Headers`

8. Find the `Apple LLVM 8.1 - Language - Objective-C` drop down, and set `Objective-C Automatic Reference Counting` to No.

### Deploying your code

When you first run `dopplDeploy`, none of your code will show up in Xcode. To make it show up, you must right click on the framework that you made earlier, and click "Add files to *project-name*" and select `main` (and `test` if you deployed tests).

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

`DopplRuntime` is only necessary if you're doing anything with threading.

This will run all of tests in the classes listed in `dopplTests.txt` on app startup.
