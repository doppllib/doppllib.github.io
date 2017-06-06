## Transitive Dependencies

Doppl is currently using classifiers for dependencies. We were using Ivy as the
dependency system, and classifiers with Ivy would resolve transitive dependencies.
Dependencies were moved to maven to be published to jcenter, but Maven doesn't
support more than one artifact (or something like that). Summary, for now you need
to list all transitive dependencies.
