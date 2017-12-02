# Testing with Doppl

Doppl supports Android unit tests. Doppl will not only convert the production
Java classes that you want to use on iOS, but it can convert the unit tests
that exercise those classes. That way, you can confirm that your converted code
works in the new environment.

As with pretty much everything with Doppl, working with unit tests is mostly
the same as what you might have done before adding Doppl to the mix. However,
there is a bit of Doppl-specific configuration to be done, and Doppl does change
some aspects of some of your tests.

## Configuring Doppl

Just as you need to teach Doppl what production classes you want to convert and
what Java dependencies you want to use on iOS, you need to teach Doppl a bit
about the tests that you want to run on iOS as well.

### Tests and dopplConfig

The `dopplConfig` closure configures Doppl. The most important configuration item
in `dopplConfig`, for most projects, is `translatePattern`, where you indicate
which Java classes should be converted to Objective-C. `translatePattern`
not only needs to have your production classes, but also your test classes.

In addition, Doppl offers `testIdentifier` to indicate which classes, out of
the converted roster, are tests. By default, if you skip `testIdentifier`,
Doppl will assume that all Java classes whose names end in `Test` are tests.
While that default may work, it is safer to provide `testIdentifier`, lest
you accidentally try testing something that happens to end in `Test` but
is not a unit test.

Both `translatePattern` and `testIdentifier` build up file sets in Gradle, using
`include` and `exclude` statements:

```groovy
dopplConfig {
    translatePattern {
        include 'com/example/myapplication/**'
    }

    testIdentifier {
        include 'com/example/myapplication/test/**'
    }
}
```

### Tests and testDoppl

Android unit tests employ JUnit, and so your `dependencies` will have a
`testImplementation` (or the older `testCompile`) statement to pull in JUnit,
plus a `testDoppl` statement to pull in its Doppl equivalent.
In addition, you can use Mockito. Hence, you can have `testImplementation` and
`testDoppl` statements to pull in those dependencies as well.

Beyond that, to use Doppl for testing, typically you will want to pull in both the regular
and the Doppl edition of `co.doppl.lib:androidbasetest` dependencies:

```groovy
dependencies {
  // other really cool dependencies go here

  testImplementation  "junit:junit:4.12"
  testDoppl           "co.doppl.junit:junit:4.12.0"
  testImplementation  "org.mockito:mockito-core:1.9.5"
  testDoppl           "co.doppl.org.mockito:mockito-core:1.9.5.0"
  testImplementation  "co.doppl.lib:androidbasetest:0.8.8"
  testDoppl           "co.doppl.lib:androidbasetest:0.8.8.0"
}
```

The `androidbasetest` dependencies provide utility code for running
Doppl-specific tests, as we will see later in this document. Also, the
Doppl edition of that artifact provides a way to access a `Context` in 
your unit tests, both on Android and iOS, as we will see later in this document.

## Writing Basic Tests

For ordinary JUnit tests &mdash; ones that do not require a mock `Context` or
things like that &mdash; you write them no differently than you would without
Doppl in the mix:

```java
public class ExampleUnitTest {
  @Test
  public void addition_isCorrect() throws Exception {
    assertEquals(4, 2+2);
  }
}
```

If you have something that you only want to run in one environment or the other,
use `PlatformUtils.isJ2objc()` to determine where you are running:

```java
if (PlatformUtils.isJ2objc()) {
  // do something unique for iOS-based tests
}
else {
  // do something else for Android-based tests
}
```

Ideally, you have little to no need for that sort of test logic separation. If
you find that you have a lot of tests that are Android-specific, consider
pulling them out into a separate JUnit test class that does not get included
in your `translatePattern` and `testIdentifier` configuration.

Running the `dopplBuild` Gradle task will not only convert your production
code but also your test code, setting things up for you to consume that
code from Xcode.

## Writing a Test Scaffold

While Doppl will convert your test code for you, you still need to arrange
to run that test code. Typically, this will come in the form of a separate
test Xcode project from your production iOS app, where you add in a few lines
to your `AppDelegate` and `ViewController` to get Doppl to run your converted
tests, emitting the results to the console.

### Setting Up the Test Project

With one minor change, setting up a test project is identical to setting
up a production project.

First, create a new Xcode project that will serve as the test project. Current
convention has that be an `iosTest/` project inside of the overall project
directory, as if it were a new Android Studio module. However, there is no
strict requirement for it to be located there or under that name. Also, current
convention says that this project should be set up using Swift, so you wind
up with files like `AppDelegate.swift` and `ViewController.swift` code-generated
for you.

Next, in the test project directory, create a `Podfile`, tying this project to
the `testdoppllib` pod that the `dopplBuild` Gradle task created:

```ruby
platform :ios, '9.0'

target 'iosTest' do
    use_frameworks!
    pod 'testdoppllib', :path => '../app/build'
end
```

The `target` value (here, `'iosTest'`) needs to match the project name,
and the value for `:path` (here '../app/build') is the relative path from
the test project directory to the `build/` directory of your module containing
your converted Java code. If your Android project is focused on an `app/`
module, and you created `iosTest/` as an Xcode project off of the overall
project root directory, then '../app/build' is the correct relative path.

Next, from the test project directory, run `pod install` to build your pod
based on this `Podfile`. This assumes that you have Cocoapods installed on your
development machine.

Then, open the `.xcworkspace` file created by the `pod install` command, using
Xcode. Run the project, as it is, to compile the pod, even though this will
give you no meaningful output, other than whatever stub UI was set up by
Xcode when you created the project.

Next, edit `AppDelegate.swift` and add an `import` for `testdoppllib`, along with
a call to `DopplRuntime.start()` inside the `application()` function:

```objc
import UIKit
import testdoppllib

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?


    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
        DopplRuntime.start()
        return true
    }

    func applicationWillResignActive(_ application: UIApplication) {
        // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
        // Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.
    }

    func applicationDidEnterBackground(_ application: UIApplication) {
        // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
        // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
    }

    func applicationWillEnterForeground(_ application: UIApplication) {
        // Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.
    }

    func applicationDidBecomeActive(_ application: UIApplication) {
        // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
    }

    func applicationWillTerminate(_ application: UIApplication) {
        // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
    }


}
```

Then, edit `ViewController.swift` and add in an `import` for `testdoppllib` there
as well.

### Specifying What to Test

The other thing that you need to add to `ViewController` is the code to actually
run the tests. This will involve one or more calls to methods on
`CoTouchlabDopplTestingDopplJunitTestHelper`, indicating what you want to test.
These go in `viewDidLoad()`, after the `super.viewDidLoad()` call.

You have three major options here, and can mix-and-match them as needed:

- `runSpecific()` takes the fully-qualified name of a Java class representing
a unit test class that you want to run

```objc
override func viewDidLoad() {
  super.viewDidLoad()
  CoTouchlabDopplTestingDopplJunitTestHelper.runSpecific(with: "com.example.myapplication.ExampleUnitTest")
}
```

- `run()` takes an `IOSObjectArray!` of fully-qualified Java class names, to 
supply a collection of unit tests to run

- `runResource()` takes the name of a text file, located in your workspace,
that will contain a list of fully-qualified Java class names representing the
unit tests to run

```objc
override func viewDidLoad() {
  super.viewDidLoad()
  CoTouchlabDopplTestingDopplJunitTestHelper.runResource(with: "dopplTests.txt")
}
```

The `dopplBuild` Gradle task will create a `dopplTests.txt` file for you, based
on the values that you supplied to the `testIdentifier` configuration in Gradle.
The `dopplTests.txt` file is located in your module's `build/j2objcSrcGenTest/`
directory. You can copy that into your workspace &mdash; as a peer of
`AppDelegate.swift` and `ViewController.swift` &mdash; and then reference it
using `CoTouchlabDopplTestingDopplJunitTestHelper.runResource(with: "dopplTests.txt")`.

### Running the Tests

At this point, running the project will run your tests. The output will appear
in the Xcode console. If everything runs correctly, you will see a "Total:" showing
the number of tests that were run and "Failures: 0". If one or more tests fail,
you will get stack traces showing what went wrong... though these are largely
Objective-C stack traces, not Java ones. The error message that you get from
JUnit will hopefully suffice for you to identify where things are going wrong.

## Using Mock Contexts

Sometimes, your tests need a `Context`, such as for database access.
In a standard Android JUnit test, you might use Robolectric to give you a mock
`Context` that will suffice for this purpose. However, Robolectric itself is
not well-suited to run on iOS directly.

To handle this, Doppl provides a test runner and means of getting at a mock
`Application` object. When running the tests on Android, the mock comes
from Robolectric. When running the tests on iOS, the mock comes from Doppl itself.

### Using the Test Runner

First, add Robolectric to your `dependencies`
(e.g., `testImplementation "org.robolectric:robolectric:3.3.2"`), if you do not
have it for other reasons already.

Then, create a JUnit test class that uses 
`DopplContextDelegateTestRunner` as the test runner:

```java
@RunWith(DopplContextDelegateTestRunner.class)
public class ExampleContextTest {
  @Test
  public void testSomething() {
    // TODO: a really cool test
  }
}
```

Here, `DopplContextDelegateTestRunner` comes from the `co.doppl.lib:androidbasetest`
dependencies that you should have set up for the `testImplementation` and
the `testDoppl` dependency scopes.

### Getting an Application Context

Then, your test methods can use `DopplRuntimeEnvironment.getApplication()`
to get a mock `Application` singleton:

```java
@RunWith(DopplContextDelegateTestRunner.class)
public class ExampleContextTest {
  @Test
  public void testSomething() {
    final SharedPreferences prefs=
      DopplRuntimeEnvironment
        .getApplication()
        .getSharedPrefences(TEST_PREFS, Context.MODE_PRIVATE);

    // TODO: a really cool test involving SharedPreferences
  }
}
```

Doppl will arrange to give you a suitable mock, both on Android (via
Robolectric) or on iOS.

## Using Spies with Mockito

Doppl integrates with J2objc's support for Mockito. However, at the present time,
that support is limited to mocks. If you want to spy an object &mdash; perhaps
to confirm that methods were invoked &mdash; J2objc does not support that.

However, *Doppl* supports object spies, though it takes a bit more work to set up,
beyond simply having Mockito as a test dependency (which is all that you need
for simple mocks). This is through a `@MockGen` annotation, backed by a compile-time
annotation processor that generates code to support object spying on iOS.

Note that this is a stop-gap implementation, while improvements to J2objc's
Mockito support are still in progress.

### Writing a Test Using a Spy

On the Android side, you can go ahead and create your unit test that
uses Mockito's spy capability:

```java
@Test
public void timer() throws InterruptedException {
  ScheduledExecutorService scheduler=Executors.newSingleThreadScheduledExecutor();
  Runnable thingy=spy(new Runnable() {
    @Override
    public void run() {
      // TODO: something useful
    }
  });

  verify(thingy, never()).run();
  scheduler.schedule(thingy, 200, TimeUnit.MILLISECONDS);
  Thread.sleep(500);
  verify(thingy, times(1)).run();
}
```

This should run fine in your Android unit tests... on Android. It will not
work on iOS, until we add in `@MockGen`.

### Adding the Annotation Processor

The annotation processor for `@MockGen` is `co.doppl.lib:testapt`, and you
will need to add this to your dependencies:

```groovy
testAnnotationProcessor "co.doppl.lib:testapt:0.8.5"
```

### Adding @MockGen

The `@MockGen` annotation goes on the test class. It has a `classes` property
that lists the fully-qualified class names of those concrete classes that you
wish to spy.

The key limitation is that `@MockGen` only supports concrete classes, not
interfaces or abstract classes. So, in the above example, we `spy()` a
`Runnable`, which Mockito can handle on Android, but `@MockGen` will not support
on iOS. Instead, you need to create a concrete class that extends the
abstract class or implements the interface, then use `@MockGen` with that.

So, for example, you could have a static class that serves as a `Runnable`
wrapper:

```java
public static class RunnableWrapper implements Runnable {
  final Runnable wrapped;

  RunnableWrapper(Runnable wrapped) {
    this.wrapped=wrapped;
  }

  @Override
  public void run() {
    wrapped.run();
  }
}
```

While `@MockGen` cannot mock a `Runnable`, it can mock a `RunnableWrapper`,
and it is safe to list it in the `@MockGen` annotation:

```java
@MockGen(classes="com.example.myapplication.ExampleUnitTest.RunnableWrapper")
```

Note that while we only have one class listed here, `classes` accepts an array
of strings, if `@MockGen` is needed for more than just one.

### Adjusting the `translatePattern`

In your `dopplConfig`, you have a `translatePattern` that indicates what
classes should be translated. Depending on how you have that set up, you may 
need to adjust it to reference any classes you had to add to satisfy the
`@MockGen` concrete-class limitation.

For example, this would not work:

```groovy
translatePattern {
  include 'com/example/myapplication/ExampleUnitTest.java'
}
```

Despite the fact that our `RunnableWrapper` is contained in that file,
it will not be picked up by J2objc and Doppl. Instead, you would need
to use a wildcard:

```groovy
translatePattern {
  include 'com/example/myapplication/ExampleUnitTest*'
}
```

### Using spy()

If you needed to create custom classes for `@MockGen`, your `spy()` calls need
to use them too:

```java
@Test
public void timer() throws InterruptedException {
  ScheduledExecutorService scheduler=Executors.newSingleThreadScheduledExecutor();
  Runnable thingy=spy(new RunnableWrapper(new Runnable() {
    @Override
    public void run() {
      // TODO: something useful
    }
  });

  verify(thingy, never()).run();
  scheduler.schedule(thingy, 200, TimeUnit.MILLISECONDS);
  Thread.sleep(500);
  verify(thingy, times(1)).run();
}
```

This code does not `spy()` a plain `Runnable`, but rather a concrete
`RunnableWrapper`, making `@MockGen` happy.

The resulting test should now work on iOS as well as on Android.
