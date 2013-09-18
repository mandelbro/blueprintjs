
# Blueprint View Controller Builder

BlueprintJS allows you to create dynamic view controller modules.

Borrowing from the conventions of MVC frameworks, view controllers
are a flexible and dynamic way of managing modular features within
an appliction.

Blueprint offers some convenient base functionality on top of which
you build your view controller. The concept is similar to the way the
jQuery wrapper adds convenience methods to HTML elements, and in fact
Blueprint implements the Decorator pattern, which decorates it's sub-
classes with shared base features.

Each view controller object that extends this object inherits three
important methods: init, build, and theme

## init
   parses any JSON from the first element with the class .json,
   this allows you to import a hashmap of data from the server.
   The init function invokes the build method
## build
   Setup up two important objects, elements and templates, which
   are used to manage dynamic content in the theme method
## theme
   A theming engine invoked in by custom view controller modules
   to include html content