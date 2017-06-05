# Package Prefixes

By default, class names and file names output by J2objc/Doppl by default are made
up of the Java package and the class name. For example, the Gson class, which has
the fully qualified classname of **com.google.gson.Gson** will have an Objective-C
class called **ComGoogleGsonGson**, and generate files called **ComGoogleGsonGson.h**
and **ComGoogleGsonGson.m**.

The fully qualified names exist to avoid name classes, but can be very verbose.
J2objc allows you to provide alternative (presumably) shorter prefixes for
packages. [Read here](https://developers.google.com/j2objc/guides/package-prefixes).

Doppl's gradle plugin allows you to specify package prefix mappings in your build
file. The gradle plugin will also merge prefixes from dependencies, if applicable.

## Gradle Steps

In your dopplConfig block, add configs for your prefixes. For example, from the
[Party Clicker Sample](https://github.com/doppllib/PartyClickerSample)

```
dopplConfig {

    //Other stuff...

    translatedPathPrefix 'com.kgalligan.partyclicker', 'P'
    translatedPathPrefix 'com.kgalligan.partyclicker.data', 'PD'
    translatedPathPrefix 'com.kgalligan.partyclicker.presenter', 'PP'
    translatedPathPrefix 'com.kgalligan.partyclicker.test', 'PT'

    //More other stuff...
}
```

This will replace the package names with the shortened prefixes. For example,
**ComKgalliganPartyclickerDataParty** becomes **PDParty**.

When you run the **dopplDeploy** gradle task, you'll get a prefixes.properties file
copied to your Objective-C output directory.

## Xcode Steps

In order to access these prefixed classes with reflection, you'll need to add
the prefixes.properties file to the app's resource bundle. To do that, open
your settings, select the app target, and open the "Build Phases" tab. Under
"Copy Bundle Resources", click '+' and find the prefixes.properties file in your
translated output directory. See the [J2objc docs](https://developers.google.com/j2objc/guides/package-prefixes) for more info.
