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