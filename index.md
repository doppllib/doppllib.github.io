<center class="logoback">
    <img src="dopplslide.png" style="max-width: 225px;max-height: 125px"/>
</center>

Doppl is a set of libraries, built on top of Google's J2objc, to facilitate sharing
Android architecture to iOS. The libraries include core arechitecture (sqlite, shared preferences, local files),
and popular Java/Android libraries used by developers in most Android apps (architecture components, rxjava/rxandroid,
dagger, retrofit, and several others).

The ultimate goal is to be able to build stable, performant, testable architecture (not UI) for mobile applications and
share that across Android and iOS.

## Update March 2018

Doppl as a platform originally had a slightly modified J2objc build, and a specific Gradle plugin. The custom
parts of J2objc have been removed or merged back into Google's master project. The Gradle plugin is no longer
"Doppl" specific, and has been moved to [j2objcgradle.github.io](https://j2objcgradle.github.io/).

**You can share "regular" Java using stock J2objc using that plugin.**

The Doppl architecture specific libraries are the same and actively developed. Read on!

## Conceptual Overview

The "why" of what we're doing: [Droidcon SF Talk](https://www.youtube.com/watch?v=cfhLBDuImOM).

## Getting Started

Following the move of the Gradle plugin and using a stock J2objc, the docs of both
the Gradle plugin and Doppl libraries will need modifications. Coming soon! Sign up for the
mailing list and follow twitter to keep in touch!

## Keep in touch

[@doppllib](https://twitter.com/doppllib)

[Mailing List](http://eepurl.com/b9Kzez)

[Blog](https://medium.com/doppl)
