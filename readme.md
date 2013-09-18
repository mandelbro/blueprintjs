
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
The init method gives your view controller a public facing method
to initialize a view controller. It enhances this process with the
following features:
- Parses JSON from the first element with the class .json into a
property viewController.data
- The init function invokes the build method, which allows you to
register elements, specify templates, and setup event listeners


## build
The build method gets called automatically when the viewController is
initialized and is the ideal place for:

- registering elements of the module
- specifying re-usable templates (accessible later with theme)
- and building out your event listeners.

## theme
What view controller would be complete without an easy way of adding
dynamically created content to the DOM? The theme function makes use
of a flexible templating engine that allows you to use any kind of theming
model you want, from MustacheJS to simple functions that return jQuery
elements.

The secret weapon of the theme function is that it makes available a
preprocessing layer, which allows you keep controller code out of your
view functions, and basically organize the shit out of your templates.