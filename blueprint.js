var Blueprint = (function( $, window, document, undefined )  {

  var Blueprint = function( viewController, initElement ) {
      // The blueprint prototype will decorate the extending view controller with it's functions
      return new Blueprint.fn.init(viewController, initElement);
    };

  // Blueprint internal functions
  Blueprint.fn = Blueprint.prototype = {
    constructor : Blueprint,
    init : function( viewController, initElement ) {

      // extend the viewController
      var output = $.extend(this.fn, viewController);

      // get a new copy of blueprint for this element
      // var blueprint = new Blueprint();
      // don't proceed without an init elemnet
      if(!initElement || !initElement.length) return;

      // define the elements object
      output.elements = {
        main : initElement // important we remove blueprint-js here otherwise we'll get an infinite loop
      };

      // define the template object
      output.templates = {};

      // define the model object
      var jsonElement = initElement.find('.json');
      output.model = {
        json : jsonElement.length ? jsonElement.remove() : false,
        data : jsonElement.length ? $.parseJSON(jsonElement.text()) : {}
      };

      // run build
      if( typeof output.construct == 'function') output.construct();
      return output;
    }
  };

  Blueprint.fn.init.prototype = Blueprint;

  /**
   * Blueprint.theme
   * Theme handling method
   *
   * @param template
   *    The template to insert from the .templates object
   * @param variables
   *    Map of variables to make available to the template
   * @param options
   *    An object of optional parameters
   *    - offsetElement: the element the theme will be inserted into or around based on the insertMethod, if not specified the theme output will be returned
   *    - insertMethod: append | prepend | insertAfter | insertBefore
   *    - preprocess: a function to run before the theme function is run, receives variables as an argument
   *    - postprocess: a function to run after the theme function is run but before it is inserted into the DOM, receives the theme output as an argument
   *    - afterInsert: a function to run after the element is inserted onto the DOM, receives the theme output as an argument
   */
  Blueprint.fn.theme = function( template, variables, options ) {
    var self = this,
      buffer;

    // if the specfied template isn't available bail
    if(typeof this.templates[template] != 'function') return;

    // normalize inputs
    options = $.extend({
      'insertMethod'  : 'append',
      'offsetElement' : {},
      'preprocess'    : null,
      'postprocess'   : null,
      'afterInsert'   : null
    }, options);

    variables = !variables ? {} : variables;
    // run the preprocess method if provided
    if(typeof options.preprocess == 'function') {
      options.preprocess.apply(this, [variables]);
    }

    // run the theme function
    var buffer = this.templates[template](variables);

    // run the preprocess method if provided
    if(typeof options.postprocess == 'function') {
      options.postprocess.apply(this, [buffer]);
    }

    // if no offset element is specified, just return the buffer
    if(!options.offsetElement.length) return buffer;

    // update the offset element with content back from the template function
    options.offsetElement[options.insertMethod](buffer);

    // run the preprocess method if provided
    if(typeof options.afterInsert == 'function') {
      window.setTimeout(function() {
        options.afterInsert.call(self, [buffer]);
      }, 10);
    }

    // return the buffer
    return buffer;

  };

  return Blueprint;

})( typeof Zepto == 'undefined' ? jQuery : Zepto, window, document );