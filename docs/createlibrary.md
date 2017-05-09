# Creating a library

The fundamental goal of creating a library is to publish a doppl artifact to an accesible repo. Doppl artifacts are a zip archive that conforms to a specific structure, which is defined and constructed with the doppl gradle plugin.

For most simple libraries, the java used to create the objective-c code matches the source library 100%. In other cases, some classes are modified or removed. In other, more complex examples, custom native code is supplied.

In general, you'll want to translate and run the unit tests created for the source library. In the case of popular open source libraries (gson, etc), extensive testing is done, so full success in Xcode means you're likely to have a complete and robust library. However, because memory rules are different in Objective-C, monitoring for memory leaks is also important.

## Modifications

Where libraries tend to different from their source Java libraries tend to fall into the following categories:

1. Missing implementations - Doppl/J2objc doesn't have a corresponding implementation. For example, database libraries that implement code for ContentProvider.
2. Memory management - J2objc provides annotations to help break memory cycles. Code changes often fall into this category.
3. Testing quirks - Test differences, either because of platform differences and/or missing test dependencies.

## Gradle dependency structure

The doppl gradle plugin has a special configuration to use in the gradle dependency section, and also relies on a special classifier. Why things are this way is kind of a long story, and community feedback on how to better handle this is appreciated, but as things currently stand, a doppl dependency looks like the following:

```
doppl 'io.reactivex:rxjava:1.2.1.5:doppl'
```

The plugin will look for the 'doppl' configuration, and the ':doppl' part on the end is the classifier. That allows multiple artifacts to live in the same place. In the repo the doppl dependency is stored as a 'jar' file, but it isn't a regular jar. For some history, dependencies used to look like this:

```
doppl 'io.reactivex:rxjava:1.2.1.5@dop'
```

I couldn't get those dependencies to pull transitively, but classifier worked, so that's what's happening now. Anyway...

Inside a doppl dependency you will find

1. lib folder - Holds a jar (j2objc uses this for translation)
2. src folder - Translated objective c, as well as c++ if any
3. lib.mappings - Explicitly maps java class to objective-c file. This exists because core j2objc uses exploded folders and doppl uses long file names, to play better with Xcode. Don't worry about it too much as the plugin will deal with this.

