Doppl's gradle plugin can generate pod definitions that can be used by Cocoapods 
to more simply setup Xcode projects and integrate generated Objective-C code.

Run the gradle command:

```bash
./gradlew dopplBuild
```

This command will transform Java using J2objc, explode dependencies, and also generate
2 podspec files.

* doppllib.podspec
* testdoppllib.podspec

To use your translated code in an Xcode project, create an iOS project and add a 
Podfile with one of the following.

For standard (non-test) projects, put the following into your Podfile

```Ruby
platform :ios, '9.0'

target '[target name]' do
    use_frameworks!
    pod 'doppllib', :path => '../app/build'
end
```

For test projects, put the following

```Ruby
platform :ios, '9.0'

target '[target name]' do
    use_frameworks!
    pod 'testdoppllib', :path => '../app/build'
end
```

Then run 

```bash
pod install
```

This should wrap your generated objective c code in an Xcode Framework, which will let you
call the code from Swift.

## Note

Currently the setup for Cocoapods doesn't allow you to include both the app code and test code 
in the same workspace. Will update as situation improves. 