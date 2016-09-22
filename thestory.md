---
layout: default
title: {{ site.name }}
---

Mobile development is obviously expensive, and has been more resistant to web implementations than desktop applications. "Why" is a longer discussion, but assume this is true, and will remain so for some time.

There have been a number of attempts to build "cross platform" application solutions, and this has been going on for years. Long before smartphones. In general, building for multiple platforms falls into one of a few approaches:

* Totally separate
* Shared logic
* Shared everything

We'll tackle details of the various approaches in a different discussion, but for our purposes here, accept a few declarations:

1. The native mobile dev tools are the fastest and best way to build an app for that platform (ie use Android Studio for Andorid and Xcode for iOS). Other tools will take more time to build, have smaller support communities and libraries, and often produce lower quality output.
2. Native apps are better than HTML5 and/or shared UI apps.
3. Native development for either platform takes roughly the same amount of time and carries similar risk (controvertial, but whatever).

Which platform takes longer to build for? Trick question. The first platform. One of the major costs often ignored in cross platform discussions is the "waste" involved when building a real product. You iterate, learn lessons, change/scrap screens, tweak the server api, refactor storage because performance sucks. Whatever. In some products that's small. In some its huge. Assuming you build smart, the second platform gets to skip all that.

So, building 2 totally different apps in totally different languages is not twice as expensive.

Building a shared UI app results in a single app for each platform from a (mostly) single code base. Building an app with any shared UI framework takes significantly longer. Tools and libraries are generally much less robust. You will almost certainly run into some mysterious platform quirk. Probably several. All that extra time is exacerbated when you factor in product iteration "waste". If your tools add 30-50% more time to development, your waste is that much more expensive. Also, your output will generally not feel "native" to one or both platforms, and your UI options will be limited to a lowest-common-denominator selection. So, you get 2 apps, but not "2" in quality.

Shared logic shares some or most code below the UI. This means you need to code the UI twice, but you share the logic. If UX quality is important, and you have a lot of non-UI logic, this can be a good option. Xamarin is probably the best known platform. Spoiler alert, Doppl is like Xamarin, except you don't use a third party dev environment. The argument against Xamarin is that Xamarin studio will significantlhy slow down your development speed, especially when builing UI's. And you need to build them both in Xamarin Studio (or Visual Studio on Windows, which must be super freaky for iOS development). Also, the open source library availability is significantly less robust. However, you get 2 fully native UI's from one code base.

The concept with Doppl is that you build your Android app in Android studio, using common Android libraries. This should have minimal impact on your development time. Then you transform your non-UI code into Objective-C, and use tested and verified versions of your favorite Android libraries.

The transformed Java code appears to you in Xcode like any other Objective-C library. You can code in either Objective-C or Swift. Building your UI using Xcode's tools is going to be significantly smoother than anything else. Since your logic is shared, you reduce development time, but also potential bugs and testing effort.

What if some of your transformed code just isn't cutting it? Code it native, right in Xcode. You don't wind up in a nightmare situation where you've built an app in a weird 3rd party environment and things are simply "not working right". Just code around it.

The final subtle point. Your Android code is 100% "normal". Besides some j2objc specific annotations, you don't really change anything. That means your cross platform risk is isolated to iOS. Although us Android types don't like to admit it, Android as a platform has significantly more risks. At any given time, you'll be expected to support many platform versions, as well as many different types and sizes of hardware. This is generally not as bad as some make it out to be, but having your Android side 100% "normal" is going to work in your favor.

There are definitely cons. Right now the libraries and core j2objc code is pretty stable, but the tools are rough around the edges. Once you get used to the flow, its not so bad, but you'll have to overlook more duct tape than usual (for now).

There's not garbage collector in iOS. J2objc does not add one. That means you'll need to pay attention to your memory cycles and understand how all that works. You'll need to understand autorelease pools. There are some things to help, and those are getting better, but you do have to learn some new things. There's no magic. If this doesn't work, you should look elsewhere (or add some magic. Its open source).

We don't have any serious performance metrics, but we did run some sqlite tests. iPhone was generally faster than the Android phones, running "Android" code. Its pretty good. If you're going to get very caught up with performance, cross platform is probably not where you want to be anyway, but performance is good.

Parts:

## Core

J2objc implements some of the Android stack, but it sticks mostly to the Java layer. Doppl adds other commonly used parts of Android. Imagine taking the Android Context and cutting it in half. There's a simplified Context, which is used to compile in Java (runtime uses the provided Context), but implemented in iOS.

### SQLiteDatabase

The Android sqlite stack is implemented for iOS. iOS includes the sqlite library, and the 










