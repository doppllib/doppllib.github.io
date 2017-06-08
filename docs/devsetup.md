# General Dev Setup

## Xcode

Xcode needs a few things set up to get things working on any given project

### All Projects

#### J2objc path

Find the path to the install directory of your J2objc instance. Open Xcode > Preferences > Locations > Custom Paths. Add a new path with the name 'J2OBJC_LOCAL_PATH' pointing at your j2objc path.

![Xcode Custom Paths](https://s3.amazonaws.com/dopplmaven/docimages/xcodeprefs.png "Xcode Custom Paths")

You *might* need to restart Xcode for that to work.

### New Projects

J2objc source does not by itself have any real restrictions on project setup and layout. However, we've found certain project and dependency organizations simpler than others.

#### No ARC

By default, J2objc output does not use ARC. See [Memory Management](http://j2objc.org/docs/Memory-Management.html). By default the doppl gradle plugin does not tell J2objc to use ARC, but you can set 'useArc = true' in settings.

How you include source into a larger project is up to you, but we've found having the generated source in an embedded framework is easier as it allows you to turn ARC off of the whole target rather than individual files.
