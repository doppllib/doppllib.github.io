# General Design and Purpose

Doppl is a build framework modeled on top of J2objc. J2objc itself is stable and performant, but designed to be a core piece of technology that is fairly environment neutral. As such, its Android code is minimal (Log, etc), and does not have a "default" build tool, other than make files (basically).

J2objc is certainly usable on its own, but setup and configuration are non-trivial, and if specifically building for Android and iOS (not general Java that might be used on a server or with GWT), is somewhat limited in the amount of code that can be shared.

Among Doppl's goals:

Provide a build tool aligned well with the "standard" Android build methodology, as in Android Studio and Gradle (sorry buck fans, but future!). It should be quick and easy to integrate with Android apps, either directly in the Android module, or in a separate Jar.

Provide parallel dependencies for popular Android libraries, and clear instructions for others to implement more. The value gain here is that if we're able to reuse many popular Android libraries, we'll be able to tap into an existing and robust ecosystem, rather than build a new one from scratch.

Implement meaningful Android framework parallels on iOS. The 'core' package includes sqlite database, shared preferences, Android threading (Looper, Handler, etc), and several other features. The purpose is to push the shared code reasonably far up towards the UI, to maximize sharing without impacting performance.

Provide testing support to allow running unit tests on logic to run in both Java and in Objective-C in Xcode.

## Best Efforts Vs All-or-Nothing

Most cross platform frameworks are either "everything", as in you should try to code everything in our alternate language/ecosystem, or oddly sandboxed, for example using C++ or embedded interpreters. For the former, you need to wrap their language around whatever native constructs you need to support, which is non-trivial at best. For the latter, you are very limited in what you can reasonably share and living very much in alternate universes.

For Doppl the goal was more of a fluid sharing of code. Share as much as is reasonable, but don't go beyond the point of diminishing returns. For example, to implement a location listener that should be started from shared code, and implement it natively on both sides. The concept and implementation are fairly trivial to understand.

Additionally, for frameworks that are designed around fully wrapping the native environment, there's the "two weeks from release" risk. What if something is simply not working in shared code? J2objc comes to the rescue here. Simply remove that logic from the "shared" code, and code it native on the iOS side. Figure it out after release.

> As an aside, I can't think of a good example of that, but if it happens you have an out.

## Time

All other cross platform methodologies involve a 3rd language and/or ecosystem, and all add significant time to develop equivalent logic. To state differently, if you were *only* releasing to iOS, using something *other* than Xcode and Swift/Objc, would waste significant time and effort due to 3rd platform cost.

Doppl's dev is done in Android Studio, so assuming you understand the design patterns, which dovetail well with best practices, your Android time should be unaffected. Assuming iOS has similar screens and features, logic (and logic tests) can easily be shared, cutting down on development time, "copy" bugs

## Risk
