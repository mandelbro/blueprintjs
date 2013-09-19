
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

Each view controller object that extends this object inherits two
important methods:

- .init(): initializes the view controller properties and calls the internal this.construct method
  - this.elements: a hashmap of elements stored by the viewController, useful for accessing DOM elements later in the program flow
  - this.templates: a hashmap of templates to use with the theme method
  - this.model: Stores viewController data, you can load this object automatically by adding an element of class .json with a JSON string from the server, the object will be loaded into this.model.data
- .theme(): a template wrapper with pre/postprocess capabilities
  - offsetElement: Specify an element to automatically insert the theme output onto the DOM
  - insertMethod: Specify what DOM insertion method to use, defaults to append
  - preprocess: a function to run before the theme function is run, receives variables as an argument
  - postprocess: a function to run after the theme function is run but before it is inserted into the DOM, receives the theme output as an argument
  - afterInsert: a function to run after the element is inserted onto the DOM, receives the theme output as an argument

In addition,

## viewController.init( $element [mixed])
The init method gives your view controller a public facing method
to initialize a view controller. It enhances this process with the
following features:
- Parses JSON from the first element with the class .json into a
property viewController.model.data
- The init function invokes the build method, which allows you to
register elements, specify templates, and setup event listeners


### this.construct()
The build method gets called automatically when the viewController is
initialized and is the ideal place for:

- registering elements of the module
- specifying re-usable templates (accessible later with theme)
- and building out your event listeners.

## this.theme( template [string], variables [object], options [object])
What view controller would be complete without an easy way of adding
dynamically created content to the DOM? The theme function makes use
of a flexible templating engine that allows you to use any kind of theming
model you want, from MustacheJS to simple functions that return jQuery
elements.

## Boilerplate
[See this gist](https://gist.github.com/mandelbro/6626234) for a Blueprint based view controller boilerplate that extends Blueprint, based on the Module pattern
