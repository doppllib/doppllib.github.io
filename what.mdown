# What

Doppl is a set of build tools, dependency standard, and libraries built around J2objc to support Android-centric cross platform code sharing.

J2objc is great tech, but integrating code sharing into your workflow is somewhat of a hand-rolled situation. To facilitate development there is:

1) A gradle plugin to manage dependencies and call j2objc to transpile code
2) A set of j2objc libraries forked from common open source Android libraries
3) A library to provide an extended Android stack inside iOS
4) Testing support classes and libraries

