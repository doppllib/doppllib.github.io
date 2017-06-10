## All releases

1. Change version in code to concrete (ie. not SNAPSHOT)
2. Clean build, publish, and upload.
3. Commit that version with messsage "Version xxx", push to github.
4. Create a "release" on github.
5. Increment version number, and add SNAPSHOT suffix back to version.
6. Commit and push.

## Release info

Select the right branch, obviously. For primary projects, the version name should simply

"vX.Y.Z"

If we're tracking a remote fork for a Doppl-only version, the version string should be

"dpvX.Y.Z"

This is to visually distinguish versions, obviously. It doesn't really do anything else.
