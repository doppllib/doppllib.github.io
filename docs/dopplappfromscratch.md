# Starting a new project in Android Studio

1. Create your project as you usually would.

2. Setup a folder that will contain files and business logic to be shared between both of your apps.

3. Code as usual, making sure your views and logic are clearly separated.

4. Add to your `local.properties` file `j2objc.home=[dist dir]` where `[dist dir]` is the path to the `dist` folder of j2objc.

5. In your project's root `build.gradle` file, under your `buildscript` and `allprojects` `repositories` block, add: `maven { url "https://dl.bintray.com/doppllib/maven" }`

6. In the same file, add `classpath 'co.doppl:gradle:0.7.1-SNAPSHOT'` to the `dependencies` block.

7. At the top of your app's `build.gradle` file, add `apply plugin: 'co.doppl.gradle'`

8. Any dependencies or libraries that you use within your shared logic folder need to have both `compile` and `doppl` variants in your `dependencies` block. Additionally, you must include doppl itself: `doppl 'co.doppl:androidbase:0.7.1-SNAPSHOT'`. For testing, you'll need to add `testDoppl 'co.doppl.lib:androidbasetest:0.7.1-SNAPSHOT:doppl'`

9. At the bottom of this file, add the following code block:
```
dopplConfig {

    copyMainOutput "../[iOS project folder]/[framework]/[output]"
    copyDependencies true

    translatePattern {
        include '**/[shared logic folder]/**'
    }
}
```
10. `copyMainOutput` points to the directory that you wish to deploy your Objective-C code to. You will see this structure in Xcode when you make your iOS project.

11. The `translatePattern` lists folders or specific files that you want to be translated to Objective-C.

12. If your project has any compile time class generation in its tests (i.e. Dagger), you should first run `./gradlew test` in order to make sure those classes have been created so your tests can be translated correctly to Objective-C.

13. Run `./gradlew dopplDeploy` to deploy your code to Objective-C. If you're going to continuously make changes that need to be deployed, instead run `./gradlew -t dopplDeploy`, which will watch your project for new files and will deploy them every time you explicitly save files.

# Getting your deployed code in Xcode

1. Create a new project in Xcode and select `Single View Application`, and select Objective-C as your language. You can still use Swift in the project, but initially selecting Objective-C should help initial setup.
    - In this project, we're not setting up git for the iOS project itself, as both projects are in the same folder, and thus one repo. You're not required to do this, but if you wish to set up git for the iOS project it will come up as a subproject and you will have to handle that yourself. This won't be a problem if you create your iOS project elsewhere.

2. Go to `Xcode -> Preferences -> Locations` and select the Custom Paths tab. Enter in (**insert image of what to type into the paths part from the samples**), where Path is the path to your `dist` folder in j2objc.

3. Now, save this project inside your Android app's root folder. Remember, in our Android app's `build.gradle` file we wrote this: `copyMainOutput "../[ios project folder]/[framework]/[output]"`

4. (Optional) Now, if you want to create a Swift file, you can do so and create a bridging header. Or, from the Android side you can add a bridging header in your build.gradle file.

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
