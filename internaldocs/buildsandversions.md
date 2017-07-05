# Forking and Branching

## Release tracking

When tracking a remote project, create a fork. You *can* develop in master, but we're really targeting public library releases, so create a branch tied to the release.

Name the branch `doppl-X.Y`. Whatever the published release of the remote project is, give it the same number, but prefix with doppl.

To create a branch tied to a release, find the release on github, and get the release hash.

<video
    width="650"
    height="255"
    controls preload
    data-setup='{ "autoplay": true, "preload": "auto" }'>
   <source src="githubrelease.mp4" type='video/mp4' />
  </video>

On the command line, create a branch tied to that commit. In this case, for `auto` and version `1.3`:

```bash
git branch doppl-1.3 6b066e7d5a8fe03188f9d95bb2a3c27eceeeb630
```

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

"doppl-vX.Y.Z"

This is to visually distinguish versions, obviously. It doesn't really do anything else.

**NOTE** Previously branches and versions had different shortended prefixes, but `doppl` is more clear and consistent. Many existing projects have the old prefixes, but they should be standardized going forward.
