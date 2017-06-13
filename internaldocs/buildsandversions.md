## All releases

0. Check gradle plugin version (currently 0.8.2)
0. Check core version (currently 0.7.5)
1. Change version in code to concrete (ie. not SNAPSHOT)
2. Clean build, publish, and upload.
3. Update README.md usage section, either manually or with scripts. Review README.md for any other updates.
4. Commit that version with messsage "Version xxx", push to github.
5. Create a "release" on github.
6. Increment version number, and add SNAPSHOT suffix back to version.
7. Commit and push.
8. On github, manually update the `master` branch's README.md. Copy/paste the release version. Double-check that the versions in usage are correct.

## Release info

Select the right branch, obviously. For primary projects, the version name should simply

"vX.Y.Z"

If we're tracking a remote fork for a Doppl-only version, the version string should be

"dpvX.Y.Z"

This is to visually distinguish versions, obviously. It doesn't really do anything else.
