# Doppl Decisions

Let's go back to the philosophy outlined in [the intro](./Intro):

- If users see it, make it native
- Otherwise, make it once

What does that mean with respect to your existing app, and what Doppl should
be doing for you?

## What Should Be Custom?

First, we should explore what Doppl *can't* solve, where native implementations
are inevitable.

### User Interfaces

The big one is the user interface. If users see it, make it native.

In Android terms, this not only includes your activities and fragments, but
also your notifications, dialogs, and other UI elements.

Users expect these things to look normal for the device that they are using.
Few users will see your app on both Android and iOS and be in position to compare
and contrast them. *All* users will see your app alongside other ones on their
device, and so comparisons will be made with the OS-standard apps and those
that the user has installed. *Your app needs to look like it belongs*, and that
inevitably requires some amount of platform-specific work.

### Platform Integration

Many things that are tied to the OS will also need to be custom-crafted for that
OS.

For example, both Android and iOS allow you to work with other hardware over
Bluetooth. However, the APIs for doing so are different, and so your code
that directly works with those APIs will need to be different.
In general, your code that directly works with those APIs should be minimal,
abstracted away via interfaces, for testability. The code using those interfaces
might be converted by Doppl, leaving you with only minimal platform-specific
bridges to write, between your interfaces and the platform-specific Bluetooth
APIs.

Another way to look at this: if you *have* to use an Android-specific API for
it, most likely, Doppl will not convert it. This includes:

- `AlarmManager`, `JobScheduler`, and other periodic work
- Any other use of Android services, content providers, and system broadcasts
- Hardware integration: sensors, GPS, audio, camera, etc.

Again, in many cases, you can separate out much of your business logic to avoid
directly working with those APIs. Doppl can convert the business logic; you would
write the bridge code for connecting that business logic with the platform-specific
APIs that you need for each platform.

## What Could Doppl Convert?

Everything else &mdash; at least in principle &mdash; represents code that Doppl
could convert for you into equivalent iOS code.

### Repository

In modern mobile app architectures, a "repository" aggregates all of the logic
for storing and loading your application data. That could be local (SQLite, files,
`SharedPreferences`) or remote (REST Web services, GraphQL Web services, gRPC
endpoints). The repository itself exposes a clean API that hides all of those
details. Partly, that is so the details could change over time without affecting
the UI that is using the repository. Partly, that is so testing the UI can
be done in isolation (with a stub repository), and that testing the repository
can be done in isolation.

Even if your code is not designed specifically around a true repository, the
sort of "on-device back-end" code that would be in a repository represents stuff
that Doppl could convert.

Frequently, your repository will leverage third-party libraries. Occasionally,
those libraries are "all-in-one" repository implementations, like
[Store](https://github.com/NYTimes/Store). More often, those libraries implement
pieces of a repository:

- Web service access: [OkHttp](https://github.com/square/okhttp), [Retrofit](https://github.com/square/retrofit), etc.
- Local persistence: [Room](https://developer.android.com/topic/libraries/architecture/room.html), [SQLCipher for Android](https://www.zetetic.net/sqlcipher/sqlcipher-for-android/), etc.
- Reactive elements for the repository API: [RxJava](https://github.com/ReactiveX/RxJava), [RxAndroid](https://github.com/ReactiveX/RxAndroid), etc.

Doppl not only converts your app code but also your libraries' code as well,
to allow this logic to run on iOS. For example, the
[Droidcon NYC sample app](https://github.com/doppllib/DroidconDopplExample)
uses RxJava, RxAndroid, Retrofit, Room, and much more.

### View-Models and Presenters

If your app is structured with a formal GUI architecture &mdash; MVC, MVP,
MVVM, etc. &mdash; many of the non-UI elements of that architecture could be
migrated to iOS by Doppl. For example, presenters in MVP and view-models in
MVVM are supposed to be independent of their respective views, and therefore
should be something that Doppl could convert.

You may find that your presenters, view-models, and related code will need
some modification, as an iOS UI may need to consume that data somewhat differently
than would your Android UI. For example, a presenter that is set up to help
populate pages in an Android `ViewPager` may not necessarily work with whatever
iOS UI you use to replace the `ViewPager`. Hence, you may find that you need
to create custom versions of presenters or view-models, not because Doppl cannot
convert the existing code, but because the existing code may not make that
much sense on iOS.

### Platform-Agnostic Presentation

Occasionally, we can still "make it once" even for things that the user can see.

For example, your app may need to create a PDF file, for printing, sending as an
email attachment, or similar uses. While users can see a PDF, you may be able to
use the same code on Android and iOS, as a PDF file itself is platform-agnostic.

Similarly, if you are generating HTML on the fly, perhaps to send in an email,
since HTML is not specific to Android or iOS, your HTML generation code may be
usable on both platforms, converted by Doppl.

### Utility Code

Any app of significance has its associated set of utility code: grunge code
for doing grunge work that is not handled by some existing framework for you.
Much of that code is merely transforming data from one format to another, and
therefore little of that code will be platform-specific. Doppl should be able
to convert most, if not all, of this for you.

## How Clean Is Your Architecture?

Back in 2012, "Uncle" Bob Martin posted his
[clean architecture](https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html)
vision. While the details differ, this architecture drives a lot of modern
mobile app development.

The key concept is that you should divide your app logic into discrete layers,
each testable in isolation via mocks and stubs. Only one layer &mdash; the outermost
one in Martin's diagram &mdash; should have any knowledge of platform-specific
considerations like user interfaces or environment-specific considerations like
Web service protocols.

A clean architecture works nicely with Doppl. Much of your logic in the inner
layers will be convertible by Doppl from Android to iOS. Even some facets
of the outer layer, such as Web service access, can be converted. The portions
of the outer layer that cannot will need to be custom-written for each platform.
That should be a small percentage of the overall code base for many apps, and
well-tested inner layers should be able to work with replacement outer layers
without issue.

In a nutshell, if it's good in general for your Android app's architecture,
it is probably good for Doppl and a resulting iOS app based on the Android app.
