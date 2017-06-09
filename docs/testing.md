# Testing

Junit 4.11 is natively supported in J2objc. Basic unit testing with Junit works. However, using other libraries and running code inside of an "Android" environment will take some more libraries and discussions.

## Basic Junit

If you're using JUnit 4.11, you can write basic unit tests, translate them to Objective-C, and run them in Xcode or on the command line.

## Mockito

Mockito is also supported out of the box with J2objc, but is a special case. Mock is supported, but spy is not. It will fail. This needs a permanent solution, but as a temporary stopgap, we've added an annotation processor to generate proxy objects with mock or spy capability.

## Libraries

Testing libraries that are standard Java will likely be OK to translate. However, testing libraries tend to be liberal with their own dependencies, so often you'll find it easier to cut out convenience libraries. YMMV.

## Android Context

To support testing at a more "application" level and/or avoid abstracting out implementation details, you can use our wrapper around Robolectric to create a testable Android runtime implementation in iOS, or delegate to Robolectric when running in Java.

**This will NOT do everything Robolectric does**

Robolectric has a lot of support for threads, UI components, etc. Our wrapper simply provides access to Context. The tests will run in the UI thread, and you can manipulate threads as needed as if it were a standard app. Robolectric provides far more control, and most of these features are way out of current scope.

## Running your tests

The Doppl test library has helper classes that allow you to run translated JUnit tests in iOS. You'll need to provide a list of tests to run to the helper classes, either manually or using the test class file generator.

#### From Android Studio

The Doppl plugin will generate `dopplTests.txt` and copy that to your output directory. This file is generated when you run when you run `dopplDeploy` and have testing configured.

By default, the plugin assumes that you'll have your test inside the `src/test/java` directory, and that your test files will be named something matching "&ast;&ast;/&ast;Test.java". The files selected also respect the `translatePattern`, so organize your files accordingly.

You can customize the name by specifying `testIdentifier` in the `dopplConfig` block.

#### From Xcode

Add the `dopplTests.txt` file to the main application target's `Copy Bundle Resources`.

In your `AppDelegate.m` add:

```
[DopplRuntime start];
[CoTouchlabDopplTestingDopplJunitTestHelper runResourceWithNSString:@"dopplTests.txt"];
```

This will run all of tests in the classes listed in `dopplTests.txt` on app startup.
