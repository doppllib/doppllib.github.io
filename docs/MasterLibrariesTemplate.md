# Libraries!

The following is a list of libraries we use in various projects. Some are managed by us, others are
Java source libraries that work well as simple source dependencies.

## JUnit

```gradle
dependencies {
  testImplementation "junit:junit:$doppl_junit_java"
  testDoppl "co.doppl.junit:junit:$doppl_junit_doppl"
}
```

## Mockito

J2objc mockito version is from the 1.9.x lineage. This version is from the main J2objc repo, but
split out into its own dependency. The J2objc version supports **mock** but not **spy**. 

```gradle
dependencies {
  testImplementation "org.mockito:mockito-core:$doppl_mockito_java"
  testDoppl "co.doppl.org.mockito:mockito-core:$doppl_mockito_doppl"
}
```

## Gson

https://github.com/doppllib/gson

```groovy
dependencies {
    compile 'com.google.code.gson:gson:$doppl_gson262_java'
    doppl 'co.doppl.com.google.code.gson:gson:$doppl_gson262_doppl'
}
```


## Dagger

https://github.com/doppllib/dagger

## Truth

https://github.com/doppllib/truth

## Assertj-core

https://github.com/doppllib/assertj-core

## Okio

https://github.com/doppllib/okio

{{doppl_rxjava2_doppl}}

## Okhttp

https://github.com/doppllib/okhttp