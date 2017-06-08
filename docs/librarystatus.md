# Library Status

This page lists the available libraries, links to repos, and the status of those
libraries. Below that we also have a "wish list" of things to be added in the
future.

## Libraries

### Gson

https://github.com/doppllib/gson-doppl

Very stable and performant in general. A few unit test issues with TimeZone as it comes from underlying iOS data, and not 100% the same (although these are extreme cases).

+ 2.6.2 - 💚

### Dagger

https://github.com/doppllib/dagger

No issues

+ 2.5 - 💚

### Retrofit 1

https://github.com/doppllib/retrofit-doppl

Works well in all general cases. Removed Apache and OKHttp clients. Just uses
Http(s)UrlConnection. Requires extended Android runtime for async calls.

+ 1.9.0 - 💚

### Retrofit 2

This is *not* working now, due to dependency on OKHttp. Discussed below.

🔴

### OKHttp

Also not working. Non-ssl seems to work fine, but ssl connections require either
more security implementation in j2objc, or a different solution for ssl sockets.

🔴

### RxAndroid

https://github.com/doppllib/RxAndroid

Works fine, but need to set up repo. All work done locally.

+ 1.2.1 - 💚

### RxJava 1

https://github.com/doppllib/RxJava

Functionally works well. Handful of test failures, but obscure issues. However, several memory cycles exist. Generally
not a huge problem in application code, but compounds significantly in unit tests.

+ 1.2.1 - 💛

### EventBus

https://github.com/doppllib/EventBus-doppl

Tests don't (yet) work on command line due to threading complications. Work fine
running in Xcode manually.

+ 2.4.0 - 💚

### Squeaky

https://github.com/doppllib/Squeaky-doppl

Code works fine, but an Android ORM that we wrote then didn't really promote, so
not a generally recommended option (but it works).

+ 0.5.0 - 💚

### SqlDelight

This works well, but still porting over repo from one org to another. Also need to rerun
tests (were working with an older version).

+ 0.6.1 - 💛

### greenDAO

This seems to work OK, but full test implementation pending. Removed ContentProvider support.
Also need to split out
with and without encryption, or figure out a good way to avoid compiler/linker issues.

+ 3.2.2 - 💛

### SqlCipher

Seems to work, but will need more testing to be comfortable. The actual encrypting side
is standard iOS SqlCipher, so testing will be more around full support of Android/jni
bridge and no memory leaks (no current known issues, though)

+ 3.5.7 - 💛

### Cupboard

Library works well. Tests pass. Removed ContentProvider and associated references, but otherwise OK.
Need to push to a new home as original root is Mercury. Soon...

## Wish List

### OKHttp

This is currently the biggest todo. Assuming this is solved with no performance issues, Retrofit 2
would be trivial. There's been some solid community interest in getting this figured out, so
hopefully mid-summer.

### Retrofit 2

See above

### RxJava 1 & 2

RxJava 1 has been working well for a while in apps. However, because ObjC is reference counted
and not garbage collected, and because J2objc doesn't try to fight that, there are significant
memory cycles in RxJava. Need to find an RxJava/J2objc expert, or an RxJava expert who wants to
come hang out and/or answer lots of questions about which object owns which in a cycle.

For general use, though, RxJava 1 has been fine.

### Mockito

J2objc ships with a mockito implementation. However, there are two general issues. The lesser of the
two is Mockito is pegged to v 1.9.5. More problematic, only 'mock' is supported. 'spy' will fail. We have created
a hacky workaround for now. An annotation processor that creates mock classes with mock and spy support.
For a number of reasons, this is not ideal.

https://github.com/doppllib/core-doppl/blob/master/testapt/src/main/java/co/touchlab/doppl/testing/TestAnnotationProcessor.java

What is really needed is an ObjectiveC/J2objc implementation of dexmaker

https://github.com/linkedin/dexmaker

Then a separate version of mockito so we can have different versions available. Also probably easymock?

### J2objc Frameworks

J2objc has Frameworks, but the headers don't resolve completely, so you need to include header search paths and (sometimes?)
references in bridging headers. The core frameworks should cooperate with swift without issue. Also it should be easy
to do this with Doppl generated code.

### Consistent Header Names

Doppl has flat header names to make coordination with Xcode easier. However, core J2objc still uses file paths. Modifying
J2objc to build all code in the same manner would make the whole thing easier.

### All ARC or non-ARC

We've had issues enabling ARC on generated code. ARC presumably adds some performance overhead, but I imagine some folks would
desire ARC on everything for simplicity. Should explore that as an option on all builds and dependencies, as they're currently
also included as source.
