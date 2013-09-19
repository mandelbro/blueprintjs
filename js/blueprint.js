var Blueprint = (function( $, window, document, undefined )  {

  var Blueprint = function( ) {
      // The blueprint prototype will decorate the extending view controller with it's functions
      return Blueprint.fn.call( this );
    };

  // Blueprint internal functions
  Blueprint.fn = function( ) {
    return {
      init : function( initElement ) {
        // don't proceed without an init elemnet
        if(!initElement || !initElement.length) return;

        // define the elements object
        this.elements = {
          main : initElement // important we remove blueprint-js here otherwise we'll get an infinite loop
        };

        // define the template object
        this.templates = {};

        // define the model object
        var jsonElement = initElement.find('.json');
        this.model = {
          json : jsonElement.length ? jsonElement.remove() : false,
          data : jsonElement.length ? $.parseJSON(jsonElement.text()) : {}
        };
        // run build
        if( typeof this.build == 'function') this.build();
        // return the object
        return this;
      },

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
       *    - afterInsert: a function to run after the element is inserted onto the DOM, receives the offset element as an argument
       */
      theme : function( template, variables, options ) {
        var buffer;

        // if the specfied template isn't available bail
        if(typeof this.templates[template] != 'function') return;

        // normalize inputs
        options = $.extend(options, {
          'insertMethod'  : 'append',
          'offsetElement' : {},
          'preprocess'    : null,
          'postprocess'   : null,
          'afterInsert'   : null
        });

        variables = !variables ? {} : variables;

        // run the preprocess method if provided
        if(typeof options.preprocess == 'function') {
          options.preprocess(variables);
        }

        // run the theme function
        var buffer = this.templates[template](variables);

        // run the preprocess method if provided
        if(typeof options.postprocess == 'function') {
          options.postprocess(buffer);
        }

        // if no element is specified, just return the buffer
        if(!element.length) return buffer;

        // update the target element with content back from the template function
        element[options.insertMethod](buffer);

        // run the preprocess method if provided
        if(typeof options.afterInsert == 'function') {
          options.afterInsert(element);
        }

        // return the buffer
        return buffer;

      }
    }

  };

  return Blueprint();

})( typeof Zepto == 'object' ? Zepto : $, window, document );