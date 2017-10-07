# Doppl Design

In the world of "cross platform", you've got a few flavors to choose from. The "everything" libraries, which do logic and UI, and the "shared code" libraries, which mostly stay away from the UI.

We tend to fall into the shared code camp, as a shared UI is difficult to do well.

Doppl is a build tool for J2objc, as well as a set of libraries to support significantly more of the Android system, so increase the amount of shared code.

Why another tool? It comes down to development efficiency and risk. All other tools use a 3rd language and ecosystem. This generally means far smaller communities, libraries, tools and support. The direct impact is lower development efficiency. More effort/time to make the same thing.

Building an app using the native tools is going to be the most efficient way to do it. To put it another way, if you were going to make an app that was only deployed to iOS, and didn't use Xcode, you'd probably be wasting some time.

Xamarin, React Native, whatever, when building for a single platform, is going to add time to your development over what that platform's tools would require.

With Doppl we're using Google's J2objc, which is a mature and well tested technology, and leveraging the libraries and ecosystem of Android, which is large and robust. Your shared code is written in Java, in Android Studio, so your Android development time is unaffected. Your UI and platform specific code is implemented as usual in Android, and using Xcode with either Objective-C or Swift.

Integrating platform specific code into shared code is simple and natural. Just create an interface and implement it on both platforms. This reduces your platform risk significantly. If something isn't working or isn't supported, simply code around it.

One other important distinction, there's no cross platform code on the Android side. It's 100% native Android. On the iOS side, the code is Objective-C, so you can use all the diagnostic tools in Xcode.

## Android library

Out of the box, J2objc does not provide much of the Android stack. To facilitate more code sharing, parts of the Android stack were pulled from AOSP and implemented on iOS. It is not a full implementation, but parts of the Android stack that make sense in the iOS context.

Under the hood, Android and iOS are very similar. This makes sense, as they are OS's designed to support mobile devices. They also have much in common with most other windowed operating systems and environments.
