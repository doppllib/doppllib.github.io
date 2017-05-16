# Library Status

This page lists the available libraries, links to repos, and the status of those
libraries. Below that we also have a "wish list" of things to be added in the
future.

## Libraries

### Gson

https://github.com/doppllib/gson-doppl

Very stable and performant in general. A few unit test issues with TimeZone as it comes
from underlying iOS data, and not 100% the same (although these are extreme cases).

+ 2.6.2 - 💚

### Dagger

https://github.com/doppllib/dagger

No issues

+ 2.5 - 💚

### Retrofit 1

https://github.com/doppllib/retrofit-doppl

Works well in all general cases. Removed Apache and OKHttp clients. Just uses
Http(s)UrlConnection. Requires extended Android runtime for async calls.

+ 1.9.0 - 💚

### RxAndroid

https://github.com/doppllib/RxAndroid

Works fine, but need to set up repo. All work done locally.

+ 1.2.1 - 💚

### EventBus

https://github.com/doppllib/EventBus-doppl

Tests don't (yet) work on command line due to threading complications. Work fine
running in Xcode manually.

+ 2.4.0 - 💚

### Squeaky

https://github.com/doppllib/Squeaky-doppl

Code works fine, but an Android ORM that we wrote then didn't really promote, so
not a generally recommended option (but it works).

+ 0.5.0 - 💚

### SqlDelight

This works well, but still porting over repo from one org to another. Also need to rerun
tests (were working with an older version).

+ 0.6.1 - 💛

### greenDAO

This seems to work OK, but full test implementation pending. Removed ContentProvider support.
Also need to split out
with and without encryption, or figure out a good way to avoid compiler/linker issues.

+ 3.2.2 - 💛

### SqlCipher

Seems to work, but will need more testing to be comfortable. The actual encrypting side
is standard iOS SqlCipher, so testing will be more around full support of Android/jni
bridge and no memory leaks (no current known issues, though)

+ 3.5.7 - 💛

### Cupboard

Library works well. Tests pass. Removed ContentProvider and associated references, but otherwise OK.
Need to push to a new home as original root is Mercury. Soon...
