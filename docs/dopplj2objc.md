# Doppl J2objc Runtime

We have a fork of the J2ojbc runtime. The github repo is [here](https://github.com/doppllib/j2objc). You can also download the packaged version by clicking the button at the top/right of the page.

Our fork is mostly stock, but there are a few differences. Over time we're hoping to remove or merge changes, and get back to stock, but for now we're keeping things up to date.

## Changes

For the curious, here are the major differences.

### Filenames

Java keeps packages in folders. J2ojbc offers more than one option, but the default is folders. This is probably OK if you're building with make files or some other mechanism, but Xcode likes to work a certain way. That is, everything is flat, even if you have things in multiple places. There are ways to work around this, but for the most part, we found them to be generally frustrating, so after much trial and error to find a good Xcode workaround, we just modified J2objc ([from another dev's PR](https://github.com/google/j2objc/pull/781)). `co.doppl.apackage.Foo` will output as `CoDopplApackageFoo.h` and `CoDopplApackageFoo.m`. You can shorten that with [package prefixes](packageprefixes.html).

One thing to keep in mind. Internally, J2ojbc tries to determine what is a "system" class by package name, and if there's a match, it'll override with the directory structure method. This is occasionally a problem, and you need to either deal with the folders or provide [your own override of that override](https://github.com/doppllib/core-doppl/blob/master/androidbase/build.gradle#L19).

### Mockito

J2objc provides a version of Mockito, but it only supports mock. Spy will compile and run, but will do nasty things. As a short term kluge, we have an annotation processor that will actually create source files that can mock and properly delegate to spy. Read more about testing [here](testing.html). A proper implementation, hopefully external so we can have multiple versions of Mockito, as well as easymock (or whatever), is in the [wish list](librarystatus.html). The changes to J2objc's Mockito are largely around loading these classes and properly setting up the delegates. It works, but can be [fairly non-pretty](https://github.com/doppllib/retrofit-doppl/blob/v1.9.0/retrofit/src/test/java/retrofit/CallbackRunnableTest.java#L21).

### Okio

There is a version of Okio in J2objc used for some internals. Some other libraries have had need for Okio, and newer versions, so we replaced the version in J2objc with an [updated version](https://github.com/doppllib/j2objc/tree/master/jre_emul/android/platform/external/okhttp/okio/okio).

### Bug Fixes

There are a few bug fixes that would need to be verified as actual bugs before submitting. Mostly around JRE support. Just stuff we've run into doing a few JRE related ports.
