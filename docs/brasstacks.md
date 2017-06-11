# Brass Tacks (aka Does This Actually Work and Do You Need It?)

There are a number of things you should consider when looking at Doppl.

## How much shared code?

First and most obvious, if you're going to use a "code sharing" framework, rather than a full cross platform solution that includes UI, and you aren't sharing much code, you probably don't need it.

**You should only use Doppl if you're sharing significant amounts of code**

Don't underestimate how much code is shared. Most apps talk to the network, do some data manipulation, possibly even store things occasionally, and this is all code that is easily shared. Still, though, if you're mostly calling a server and showing cat pictures, it might not be necessary.

## Memory Models Differ

Java uses garbage collection. Objective-C, and Swift, do not. They use reference counting. Is this usually a big issue? No. Do you need to understand it? Yes. A bit, anyway.

This issue will turn some away, but keep in mind that there are a lot of iOS developers, and they have had to understand this the whole time. Xcode has pretty fantastic diagnostic tools to help too. It's something to learn, but not to freak out about.

## J2objc Adds Bulk

The iOS package will gain some weight due to the Java runtime in J2objc. As it turns out, getting a concrete number of "how much", from a client download and storage perspective, is pretty difficult. From our tests, if you go as light as possible and strip the doors off, you'll add about 10megs. Those are itunes connect reported numbers. One of our recent "fully functional" apps tops out at about 25-27 megs on device (that's everything, not just J2objc).

On the Android side, since there's nothing shared, J2objc and Doppl add 0 megs. Keep this in mind in case you were considering, say, [instant apps](https://developer.android.com/topic/instant-apps/faqs.html#apk-size).

Anyway, a tradeoff. All code sharing and cross platform frameworks will add runtime bulk.

## Critical Libraries

There are some serious blockers that prevent OKHttp and Retrofit2 from being live, but this is a topic of broader community concern, so cross fingers that we'll have something soon.

RxJava and RxJava2 are so far the major exceptions to the "memory isn't a problem" rule. RxJava, by design, has many cyclical object references. We've been chopping away at RxJava 1.2.1 and use it in production apps, and will start working on memory in RxJava2 soon after preview launch. They "work", and generally any leaks are small in user apps, but keep this in mind and run the Xcode Profiler to keep an eye on it.
