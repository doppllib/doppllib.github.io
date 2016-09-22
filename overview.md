---
layout: default
title: {{ site.name }}
---

Doppl is an Android-central cross platform framework. It facilitates sharing logic between Android and iOS apps, while keeping UI's completely native and specific to the respective platform.

The core technology is j2objc. Doppl adds tools and libraries to facilitate development. The goal is to build no-compromise applications on both iOS and Android while maximizing development efficiency.

J2objc provides a Java transpiler to convert Java to Objective-C, as well as the necessary Java runtime and some core Android class functionality.

Doppl builds upon J2objc.

## Tools

1. Gradle plugin to convert and package your non-UI Java code.
2. Testing tools to facilitate Junit tests running in Objective-C/Xcode.
3. Expanded core Android support (parts of the Context and Threading stack).
4. Tested and optimized versions of common Java/Android libraries.

## Extended Android Stack

### Context

Doppl implements part of the Android Context interface. Specifically the following:

#### Local files

Access to local files (https://developer.android.com/reference/android/content/Context.html#getFilesDir()). Storing and reading files in an app's local storage.

#### Shared Preferences

Standard SharedPreferences support.

#### SQLiteDatabase

Local sqlite support, with the standard Android SQLiteDatabase implementation. Support does not include ContentProvider nor content: uri access, however.

https://developer.android.com/reference/android/database/sqlite/SQLiteDatabase.html

### Threading

Support for standard Android threading stack. This includes Looper, MessageQueue, and Handler. There's also an adapter to support main thread and background thread. This suports most standard Android threading models and libraries.

## Libraries

Many popular Android and Java libraries are currently supported as parallel gradle dependencies. 



