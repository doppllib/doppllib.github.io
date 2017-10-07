# Creating a library

The fundamental goal of creating a library is to publish a doppl artifact to an accessible repo. Doppl artifacts are a zip archive that conforms to a specific structure, which is defined and constructed with the doppl gradle plugin.

For most simple libraries, the java used to create the objective-c code matches the source library 100%. In other cases, some classes are modified or removed. In other, more complex examples, custom native code is supplied.

In general, you'll want to translate and run the unit tests created for the source library. In the case of popular open source libraries (gson, etc), extensive testing is provided in the source repo, so full success in Xcode/iOS means you're likely to have a complete and robust library. However, because memory rules are different in Objective-C, monitoring for memory leaks is also important.

## Modifications

There are some common reasons for source libraries and J2objc libraries to differ.

1. Missing implementations - Doppl/J2objc doesn't have a corresponding implementation. For example, database libraries that implement code for ContentProvider.
2. Memory management - J2objc [provides annotations to help break memory cycles](https://j2objc.blogspot.com/2017/01/breaking-retain-cycles-with-weak-and.html). Code changes often fall into this category.
3. Testing quirks - Test differences, either because of platform differences and/or missing test dependencies.

## How much work does this take?

That's highly variable. Some are very quick. As an exercise, we took the new Room Sqlite library, the morning after the alpha release, and [got that working and into our sample app](https://medium.com/@kpgalligan/androids-room-db-on-ios-f844e2350817) in about 2 hours. That does **not** represent the full work, as the tests were not available at the time (or still?). Another Sqlite library, Cupboard, took about 4 hours to branch, port, run tests, and publish.

SQLCipher took a couple days, and that is complex as it includes JRE and C++ integrations.

Those are the success stories.

On the other end of the spectrum, RxJava by it's nature creates a lot of cyclical object references, and they are difficult to untangle. We use it in our apps, and all but a handful of tests pass, but there are unresolved memory leaks that need to be monitored.

Retrofit 1 was quick. Retrofit 2 is blocked because we need to figure out something with OKHttp, or bypass it.

Summary, most are quick and simple. A handful are not.

## Gradle dependency structure

The Doppl Gradle plugin has a set of configurations to define dependencies. They are `doppl` and `testDoppl`. These generally mirror `compile` and `testCompile`.

The general concept of Doppl dependencies, and the name (from [Doppelgänger](https://en.wikipedia.org/wiki/Doppelg%C3%A4nger)), is to be able to use mirror equivalents of popular Android libraries.

```groovy
dependencies {
    compile 'com.android.support:appcompat-v7:25.1.0'

    //Database ORM
    compile 'co.touchlab.squeaky:squeaky-query:0.5.1'
    annotationProcessor 'co.touchlab.squeaky:squeaky-processor:0.5.1'
    testAnnotationProcessor 'co.touchlab.squeaky:squeaky-processor:0.5.1'
    doppl 'co.touchlab.squeaky:squeaky-query:0.5.1.0'

    //Dagger
    compile 'com.google.dagger:dagger:2.5'
    annotationProcessor 'com.google.dagger:dagger-compiler:2.5'
    testAnnotationProcessor 'com.google.dagger:dagger-compiler:2.5'
    doppl 'co.doppl.com.google.dagger:dagger:2.5.2'

    //Rx
    compile 'io.reactivex:rxandroid:1.2.1'
    doppl 'co.doppl.io.reactivex:rxandroid:1.2.1.2'

    //Test Support
    testCompile 'junit:junit:4.11'
    testCompile "co.doppl.lib:androidbasetest:0.7.5"
    testDoppl "co.doppl.lib:androidbasetest:0.7.5.0"
    testCompile "org.robolectric:robolectric:3.3.2"
    testCompile 'org.mockito:mockito-core:1.9.5'
}
```
*Sample build.gradle dependencies block*

The artifact itself is a zip file with the extension `dop`. They are packaged and deployed in a way conceptually similar to `aar` files.

Inside a doppl dependency you will find

1. lib folder - Holds a jar (j2objc uses this for translation)
2. src folder - Translated objective c, as well as c++ if any
3. lib.mappings - Explicitly maps java class to objective-c file. This exists because core j2objc uses exploded folders and doppl uses long file names, to play better with Xcode. Don't worry about it too much as the plugin will deal with this.

Also, If you look at the numbering structure, by convention we'll create a branch tagged at a public release version of the source library and work from that. In this example, we started with rxjava 1.2.1. From there, another number is used to specify Doppl version, as various changes may be ongoing, but tied to a concrete Java artifact release. Also, Maven and/or Gradle don't like having 2 main artifacts in one place, so having the extra number allows for 2 "places".

You obviously don't have to conform to this, and in cases where you're publishing both the java and doppl library, it's your call, but that's what we do.

## Note on our forks

If you're going to try to add versions of libraries from our forks, be aware that most of them have all of their Doppl related changes in a version tagged branch, **not** in master. To create a newer version, best practice would be to create another version tagged branch from the source release commit, then merge the Doppl changes.

## Building the library

Run the following:

<pre class="command-line" data-user="you" data-host="yourmac"><code class="language-bash">
./gradlew dopplArchive</code></pre>

That will create the archive structure and file. It will also define an artifact called 'dopplArchive' which you can reference and publish.

If you associate `dopplArchive` with a publication in Gradle, you can simply run the `publish` task. See the [gradlescripts repo](https://github.com/doppllib/gradlescripts) for an example.

## Local (touchlab) build process

Our forks of various libraries are built and deployed using our [gradlescripts](https://github.com/doppllib/gradlescripts). Most of our forks define 2 repo url's with variables, as well as the location of the gradlescripts themselves. These settings are applied in:

```
~/.gradle/gradle.properties
```

```properties
dopplMavenDeploy=file://Users/[you]/[your local repo]
dopplRepo=https://dl.bintray.com/doppllib/maven
dopplSharedScriptHome=[your local path to gradlescripts]

bintrayUser=[you]
bintrayApiKey=[your key]
```

The `dopplMavenDeploy` is just a local folder you create where Gradle can publish artifacts, and other projects can find them. The bintay stuff is for [bintray.com](https://bintray.com/). That exercise is left for the reader.
