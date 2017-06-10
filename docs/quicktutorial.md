# Party Clicker Tutorial

For a quick intro to how Doppl works, try this [simple tutorial app](https://github.com/doppllib/PartyClickerSample). We'll walk you through the steps to get set up and running, and explain a few concepts along the way.

## Requirements

1. A Mac OSX PC, with a few gigs of free drive space
2. Android Studio
3. Xcode

## Install J2objc

Doppl is based on [J2objc](https://developers.google.com/j2objc/), which converts Java to Objective-C. It's **almost** stock, but has some local tweaks, which means we have to distribute our own slightly altered version. The changes are mostly about file organization, rather than anything with the runtime. [Read more here](dopplj2objc.html).

Download the [Doppl J2objc Runtime](http://dopplmaven.s3-website-us-east-1.amazonaws.com/dist.zip), and extract the zip file to your local drive. This is your **j2objc dist** directory.

## Get the Sample

Clone [the sample app](https://github.com/doppllib/PartyClickerSample).

```bash
git clone https://github.com/doppllib/PartyClickerSample.git
```

Open the sample app in Android Studio.

**Note** *If you're not an Android developer, that means go to File > Open, then open the PartyClickerSample directory. There is no project or "workspace" file to open.*

### Configure Android Studio

Edit the local.properties file. If it doesn't exist, create it in your project root. Add a property point to your **j2objc dist**

```groovy
j2objc.home=[j2objc dist]
```

If you're having trouble finding local.properties, watch the video:

<iframe width="560" height="315" src="https://www.youtube.com/embed/H95OKwQ_9FU" frameborder="0" allowfullscreen></iframe>

Assuming you have a device or emulator to test on, you should be able to run the Android app at this point.

### Configure Xcode

Xcode also needs to know where J2objc is installed. Open XCode > Preferences, Locations > Custom Paths. Add 'J2OBJC_LOCAL_PATH' and set Path to **j2objc dist** (no trailing slash).

<iframe width="560" height="315" src="https://www.youtube.com/embed/swLXzvIOm9A" frameborder="0" allowfullscreen></iframe>

Various settings in the project use this property to point to J2objc, and if set up properly, your project should be portable among developers with different local drive location configurations. See [Xcode Setup](xcodesetup.html) for more details.

## Run Sample

Assuming everything is set up correctly, you should be able to navigate to the `ios` folder, open the project, and run it on an iPhone simulator. Make sure you have the `ios` application target set with a valid simulator.

<iframe width="560" height="315" src="https://www.youtube.com/embed/gFXQjVsu2b8" frameborder="0" allowfullscreen></iframe>

If the sample doesn't run, something in the setup isn't working. Retrace steps and/or watch the full demo video.

# The Parts

Back in Android Studio, find the root directory **build.gradle** file. This contains references to our artifact repo, which will eventually move to jcenter, and the classpath to the Doppl Gradle plugin.

<pre data-src="https://github.com/doppllib/PartyClickerSample/blob/master/build.gradle"></pre>
