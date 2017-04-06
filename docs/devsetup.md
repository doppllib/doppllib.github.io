# General Dev Setup

## Xcode

Xcode needs a few things set up to get things working on any given project

### All Projects

#### J2objc path

Find the path to the install directory of your J2objc instance. Open Xcode > Preferences > Locations > Custom Paths. Add a new path with the name 'J2OBJC_LOCAL_PATH' pointing at your j2objc path.

![Xcode Custom Paths](https://s3.amazonaws.com/dopplmaven/docimages/xcodeprefs.png "Xcode Custom Paths")

You *might* need to restart Xcode for that to work.

### New Projects

#### No ARC

By default, J2objc output does not use ARC. See [Memory Management](http://j2objc.org/docs/Memory-Management.html). By default the doppl gradle plugin does not tell J2objc to use ARC, but you can set 'useArc = true' in settings.

