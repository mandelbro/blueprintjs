
/**
 * Blueprint View Controller
 * Create an extendable View Controller object used by your custom
 * View controller modules
 *
 * Each view controller object that extends this object inherits three
 * important methods: init, build, and theme
 *
 * @method init
 *		parses any JSON from the first element with the class .json,
 * 		this allows you to import a hashmap of data from a server
 *		language like PHP. The init function invokes the build method
 * @method build
 *		Setups up two important objects, elements and templates, which
 *		are used to manage dynamic content in the theme method
 * @method theme
 *		A theming engine invoked in by custom view controller modules
 *		to include html content
 */
function ViewController() {

	this.init = function(parentobj, initElement) {
		// grab the json array from the init element
		this.info = $.parseJSON(initElement.find('.json:first').text());
		// build the initial
		this.build(initElement);
	};

}

/**
 * ViewController.build
 * Builds the resource list view controller output elements for the first
 * time.
 * Declares the this.element map that will hold specific elements
 * Declares the this.templates map that allows you to use the theme system
 *
 * @param initElement
 * 		The init element for the view controller
 */
ViewController.prototype.build = function(initElement) {
	// define the elements object
	this.elements = {
		main : $('<div id="'+ initElement.attr('id') +'"></div>')
	};
	// define the template object
	this.templates = {};

	// insert new element
	initElement.replaceWith(this.elements.main);
};

/**
 * ViewController.theme
 * Theme handling method
 *
 * @param template
 * 		The template to insert from the .templates object
 * @param element
 *		The element to update
 * @param variables
 *		Map of variables to make available to the template
 * @param preprocess
 *		A preprocess function will will receive all the variables passed
 */
ViewController.prototype.theme = function(template, element, variables, preprocess) {
	var output, method;
	// normalize inputs
	variables = !variables ? {} : variables;
	// run the preprocess method if provided
	if(preprocess) {
		preprocess(variables);
	}

	// make the update type configurable from the variables array and preprocess function
	method = variables.updateMethod ? variables.updateMethod : 'append';

	try {
		// update the target element with content back from the template function
		element[method](this.templates[template](variables));
	}
	catch(e) {
		console.log(e);
	}

};


/**
 * Initializes controller functions
 */
var initViewController = function () {
	var controllers = {};
	// loop through the DOM and find init elements
	$('.js-init').each(function(index, element) {
		element = $(element);
		var id = element.attr('id');
		try {
			controllers[id] = new window[id + 'ViewController'](null, element);
		}
		catch(e) {
			console.log(e);
		}
	});
};