var Blueprint = (function( $, window, document, undefined )  {

  var Blueprint = function( viewController, initElement ) {
      // The blueprint prototype will decorate the extending view controller with it's functions
      return new Blueprint.fn.init(viewController, initElement);
    };

  // Blueprint internal functions
  Blueprint.fn = Blueprint.prototype = {
    constructor : Blueprint,
    init : function( viewController, initElements ) {

      // extend the viewController, do a deep copy so each vc is unique
      var viewController = $.extend(true, {}, this.fn, viewController);

      // prepare the initElements map
      if(initElements instanceof $ || $.zepto.isZ(initElements)) { // is a single jQuery wrapped element
        initElements = { 'main' : initElements };
      }

      // define the elements object
      viewController.elements = initElements;

      // define the template object
      viewController.templates = {};

      // define the model object
      viewController.model = {};
      // scan the init element for data
      viewController.dataScan(initElements.main);

      // run build
      if( typeof viewController.construct == 'function') viewController.construct();

      return viewController;
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

  /**
   * Blueprint.dataScan
   * Finds an element of class .json with a well formatted JSON string and stores it into
   * the view controller's model
   *
   * Data elements with an ID will be stored in the model keyed by that ID, otherwise they
   * will be merged into under the 'data' key.
   *
   * @param $element
   *    An element to scan for data
   */
  Blueprint.fn.dataScan = function( $elements ) {
    if(!$elements) return;
    $elements.main.find('.json').each(function() {
      var $this = $(this),
          key = $this.attr('id') || 'data';
      viewController.model[ key ] = $.extend(viewController.model[ key ], $.parseJSON($this.text().remove()));
    });
  };

  /**
   * Blueprint.data
   * Finds an element of class .json with a well formatted JSON string and stores it into
   * the view controller's model
   *
   * Data elements with an ID will be stored in the model keyed by that ID, otherwise they
   * will be merged into under the 'data' key.
   *
   * @param $element
   *    An element to scan for data
   */
  Blueprint.fn.data = function( key, value ) {
    // key defaults to data
    key = key || 'data';

    // if key is an object, save the object to the model
    if(typeof key == 'object') {
      $.extend(this.model, key);
      return this;
    }

    // if a value is present, set the key to that value in the model
    if(typeof value != 'undefined') {
      this.model[key] = value;
      return this;
    }

    return this.model[key];

  };

  return Blueprint;

})( typeof Zepto == 'undefined' ? jQuery : Zepto, window, document );