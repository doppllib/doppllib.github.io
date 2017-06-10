## Extended Android Stack

### Context

Doppl implements part of the Android Context interface. Specifically the following:

#### Local files

Access to local files (https://developer.android.com/reference/android/content/Context.html#getFilesDir()). Storing and reading files in an app's local storage.

#### Shared Preferences

Standard SharedPreferences support.

#### SQLiteDatabase

Local sqlite support, with the standard Android SQLiteDatabase implementation. Support does not include ContentProvider nor content: uri access, however.

https://developer.android.com/reference/android/database/sqlite/SQLiteDatabase.html

### Threading

Support for standard Android threading stack. This includes Looper, MessageQueue, and Handler. There's also an adapter to support main thread and background thread. This suports most standard Android threading models and libraries.
