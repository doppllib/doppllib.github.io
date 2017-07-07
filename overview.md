---
layout: default
title: {{ site.name }}
---

Doppl is an Android-centric code sharing framework. It facilitates sharing logic between Android and iOS apps, while keeping UI's completely native and specific to the respective platform.

The core technology is J2objc. Doppl adds tools and libraries to facilitate development. The goal is to build no-compromise applications on both iOS and Android while maximizing development efficiency.

J2objc provides a Java transpiler to convert Java to Objective-C, as well as the necessary Java runtime and some core Android class functionality.

Doppl builds upon J2objc.

## Tools

1. [Gradle plugin](docs/gradleplugin.html) to convert and package your shared Java code.
2. Testing tools to facilitate Junit tests running in Objective-C/Xcode.
3. [Expanded core Android support](https://github.com/doppllib/core-doppl) which includes SQLite, Shared Preferences, Threading, and other common parts of the Android runtime.
4. [Tested and optimized versions](docs/librarystatus.html) of common Java/Android libraries.

## OK. Why?

Having done lots of work on mobile over the years, we believe the most efficient way to build for either Android or iOS is to use the native tools: Android Studio and Xcode. Google and Apple spend a lot of time and money improving these tools, and both have robust and mature developer ecosystems.

All other code sharing, or fully cross platform, frameworks use a 3rd language, which needs a different set of tools and libraries, and generally has a significantly smaller ecosystem. Read the [Doppl post](https://medium.com/@kpgalligan/doppl-e075a0fde44c) for more detail, but TL;DR, a 3rd platform has more risk and lower developer efficiency.

With Doppl, first of all, you only get one half of a cross platform solution, because the Android side is 100% native. You just build and run as you would normally, respecting best practice recommendations of separating view from logic (MVP, MVVM, etc).

You have access to many of the most popular Android libraries, including RxJava, Retrofit, Dagger, Gson, Sqlite tools, etc.

Your shared code is written in Java, but the platform specific Android code can be written in Kotlin (or whatever), and the iOS code can be Objective-C or Swift.

Integrating platform specific code with shared code is natural, not a special case. Create an interface in the shared code, and implement it on either platform. This lets you share as little or as much code as you'd like.

Fluid native integration also removes a major concern inherent in many other platforms. What do you do if you're days from a release and something in the shared code isn't working? Easy. On Android, nothing, because there is no shared code. On iOS, code around it with your native logic and fix it later.

J2objc is mature and used by major Google projects. Doppl makes it easier to integrate in your development lifecycle and expands how much code you can share.

Dramatic increase in efficiency. Minimal increase in risk.
