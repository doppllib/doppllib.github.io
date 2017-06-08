# Doppl

## Dependency Management

`doppl` is a configuration, just like compile, where you then provide a library that has been configured to work with doppl. `:doppl` is a classifier that lets the doppl plugin know that this is a doppl-configured library.

For a list of frameworks that are currently supported, take a look at the [doppl library dashboard](put a link here eventually).

## Output

`copyMainOutput`: The output path for Objective-C files.

```
copyMainOutput "../ios/scratchllframework/main"
```

`copyTestOutput`: The output path for Objective-C test files.

`mainBridgingHeaderOutput`: The output path for main's Objective-C bridging header file.

```
mainBridgingHeaderOutput "../ios/ios/Main-Bridging-Header.h"
```

`testBridgingHeaderOutput`: The output path for test's Objective-C bridging header file.

`copyDependencies`: Boolean; Collect your Doppl dependency Objective-C and write it to the Xcode output directory. Defaults to false.

- `translatePattern {}`: By default, j2objc translates all of the `.java` files in the project unless you tell it otherwise.
	- `include` specifies the directories or files that you explicitly want to be translated.
	- `exclude` specifies directories or files that you do not want translated.

```
translatePattern {
        include '**/shared/**'
    }
```

- `testIdentifier {}`: By default, all classes that will be translated and end with "test" will be added to a file in order to make it easier to run unit tests.
	- `include` specifies a pattern that your tests follow in order to override the default "test" ending.
	- `exclude` specifies a pattern indicating classes that you do not want to be picked up by your `include`.

`translatedPathPrefix`: Replace a given path with a prefix. For more information, refer to [this document](link_to_prefix_document).

## Input

`generatedSourceDirs`: Add generated source files directories (e.g. files created from Dagger annotations). You probably don't need this parameter; it's only used if the plugin cannot find the generated files by itself.

```
generatedSourceDirs build/generated/source/apt/main
```

`generatedTestSourceDirs`: Add generated source files directories (e.g. files created from Dagger annotations) in tests. Again, you probably don't need this parameter; it's only used if the plugin cannot find the generated files by itself.

`overlaySourceDirs`: Use if you're going to have generated Java that actually replaces Java in your folders. So far, this has only been relevant to Realm; you probably won't need this parameter.

## Other

`disableAnalytics`: Boolean; whether you want Analytics turned on. Defaults to false. To see what data we're collecting, see [this document](analytics_link).

`emitLineDirectives`: Boolean; Generates debugging support. Defaults to false. For more information on debugging, see our [document on debugging](debugging_link).

`translateArgs`: Used to add different options to the way your Java code is translated. The list of supported options can be found [here](https://developers.google.com/j2objc/reference/j2objc).

`TranslateTask` already uses some of these args, so they do not have to be added manually. To see the arguments being added, you can [look at the source here](https://github.com/doppllib/doppl-gradle/blob/master/src/main/groovy/co/touchlab/doppl/gradle/tasks/TranslateTask.groovy#L332).

`skipDependsTasks`: Boolean; Skips the need to depend on test, jar, and javaCompile tasks. Defaults to false.

## Not supported

CyclerFinder in general.

`cycleFinderArgs`: Not currently supported.
