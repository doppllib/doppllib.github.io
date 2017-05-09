# Creating a library

The fundamental goal of creating a library is to publish a doppl artifact to an accesible repo. Doppl artifacts are a zip archive that conforms to a specific structure, which is defined and constructed with the doppl gradle plugin.

For most simple libraries, the java used to create the objective-c code matches the source library 100%. In other cases, some classes are modified or removed. In other, more complex examples, custom native code is supplied.

In general, you'll want to translate and run the unit tests created for the source library. In the case of popular open source libraries (gson, etc), extensive testing is done, so full success in Xcode means you're likely to have a complete and robust library. However, because memory rules are different in Objective-C, monitoring for memory leaks is also important.

## Modifications

Where libraries tend to different from their source Java libraries tend to fall into the following categories:

1. Missing implementations - Doppl/J2objc doesn't have a corresponding implementation. For example, database libraries that implement code for ContentProvider.
2. Memory management - J2objc provides annotations to help break memory cycles. Code changes often fall into this category.
3. Testing quirks - Test differences, either because of platform differences and/or missing test dependencies.

