# Ivy Deploy

The ivy publisher that ships with gradle is generally more convenient for deploying
multiple artifacts to a local file system repository. That's why we've been using it
over maven.

## Single project

This is the simplest situation. You just need to tell the publisher that you'll be pushing
both the java and Doppl artifacts.

In your module's build.gradle file:

```gradle

group = 'com.yourcompany.whatever'
version = '1.2.4'

publishing {
    publications {
        ivy(IvyPublication) {
            from components.java

            //Optional
            module 'runtime'

            artifact(dopplArchive) {
                classifier 'doppl'
                extension 'jar'
            }
        }
    }
    repositories {
        ivy { url dopplIvyDeploy }
    }
}
```

Whatever group and version you specify will be used to mark the dependency. The 'module' entry is optional. If the name of the gradle module is the same, you can omit it. That will fill in the 'name' of the dependency.

Because you're publishing the java and Doppl together, they have the same version number. Publishing Doppl forks is somewhat more complicated.

## Forked project

Many of the popular libraries we're publishing are forks of public java libraries. To track Doppl versions around these forks, we append another number to the version. This disambiguates the dependency resolution for gradle, and allows us to publish releases tacked to a major java release.

However, out of the box, the Ivy publisher will use the Java transitive dependencies in the Ivy descriptor file.  In the build.gradle file, the relevant dependencies are listed as follows.

```
compile 'com.google.code.gson:gson:2.6.2'
compile 'io.reactivex:rxjava:1.2.1'

doppl 'com.google.code.gson:gson:2.6.2.8:doppl'
doppl 'io.reactivex:rxjava:1.2.1.5:doppl'
```

In the Ivy descriptor

```
  <dependencies>
    <dependency org="com.google.j2objc" name="j2objc-annotations" rev="0.2.1" conf="runtime-&gt;default"/>
    <dependency org="com.google.code.gson" name="gson" rev="2.6.2" conf="runtime-&gt;default"/>
    <dependency org="io.reactivex" name="rxjava" rev="1.2.1" conf="runtime-&gt;default"/>
  </dependencies>
```

The Ivy publisher lists the Java dependencies. This will prevent the doppl dependencies from working transitively. To fix this, you can manipulate the Ivy descriptor in Gradle.

```
publishing {
    publications {
        ivy(IvyPublication) {
            from components.java
            artifact(dopplArchive) {
                classifier 'doppl'
                extension 'jar'

            }
            descriptor {
                withXml {
                    asNode().dependencies.dependency.find {
                        it.@name == "rxjava"
                    }.@rev = "1.2.1.5"
                    asNode().dependencies.dependency.find {
                        it.@name == "gson"
                    }.@rev = "2.6.2.8"
                }
            }
        }
    }

    repositories {
        ivy { url dopplIvyDeploy }
    }
}
```

This will force the Doppl published version to correctly list dependencies.

```
<dependencies>
    <dependency org="com.google.j2objc" name="j2objc-annotations" rev="0.2.1" conf="runtime-&gt;default"/>
    <dependency org="junit" name="junit" rev="4.11" conf="runtime-&gt;default"/>
    <dependency org="com.google.code.gson" name="gson" rev="2.6.2.8" conf="runtime-&gt;default"/>
    <dependency org="io.reactivex" name="rxjava" rev="1.2.1.5" conf="runtime-&gt;default"/>
    <dependency org="co.touchlab.doppl" name="androidbase" rev="0.7.0-SNAPSHOT" conf="runtime-&gt;default"/>
  </dependencies>
```

Obviously you should use variables for the version strings to avoid copy/paste issues. Just FYI.            
