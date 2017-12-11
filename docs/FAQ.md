# Frequently-Asked Questions

Have more questions than what you see here? [We're here to help!](./Support)

## What Classes and Methods Can I Use From the Android SDK?

For your production code,
[the `androidbase` library](https://github.com/doppllib/core-doppl/blob/master/androidbase/README.md)
in
[the `core-doppl` repo](https://github.com/doppllib/core-doppl) outlines what
is available. In general, Doppl supports classes that are relevant for non-UI
code that also make sense on iOS.

For your test suites,
[the `androidbasetest` library](https://github.com/doppllib/core-doppl/blob/master/androidbasetest/README.md)
in
[the `core-doppl` repo](https://github.com/doppllib/core-doppl) describes
the basic support Doppl has for unit tests.

If there are things that you feel that you need that are not offered by the
Doppl runtime, [ask!](./Support)

## Can We Convert Our Android Code to Swift?

Not at the present time, sorry.

While Doppl generates Objective-C code, it is included in your iOS project as a CocoaPod which can be effortlessly used from Swift

## Can We Convert Our Kotlin, Scala, Clojure, Etc. Code to iOS?

Not at the present time, sorry.

Obviously, Kotlin will be of keen interest going forward, and we are investigating
options for it.

## Nothing Seems to Build &mdash; How Can I Recover?

The basic "reset the world" recipe for a Doppl-enabled project is:

- Run the `clean` and `dopplBuild` Gradle tasks
- Re-run `pod install` for your Xcode projects
- In each Xcode workspace, choose Product > Clean from the main menu

## Where Did the Name "Doppl" Come From?

Doppl is short for [doppelgänger](https://en.wikipedia.org/wiki/Doppelg%C3%A4nger),
a German word describing a person's duplicate.
