# Libraries!

The following is a list of libraries we use in various projects. Some are managed by us, others are
Java source libraries that work well as simple source dependencies.

## JUnit

```gradle
dependencies {
  testImplementation "junit:junit:4.12"
  testDoppl "co.doppl.junit:junit:4.12.0"
}
```

## Mockito

J2objc mockito version is from the 1.9.x lineage. This version is from the main J2objc repo, but
split out into its own dependency. The J2objc version supports **mock** but not **spy**. 

```gradle
dependencies {
  testImplementation "org.mockito:mockito-core:1.9.5"
  testDoppl "co.doppl.org.mockito:mockito-core:1.9.5.1"
}
```

## Gson

https://github.com/doppllib/gson

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