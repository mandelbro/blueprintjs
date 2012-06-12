
/**
 * Footer View Controller
 * Custom view controller module to include a footer
 */
function footerViewController(parentobj, initElement) {
	var self = this;
	// setup the initial loading element
	this.init(parentobj, initElement);

	// add templates
	this.templates = {

		'footer'	: function(variables) {
			var output;
			// add the content
			output = '<p class="copyright">All this awesome content was included dynamically by Blueprint JS, made by Vandelay Industries (Copyright 2012, All rights reserved).</p>';

			return output;
		}

	}

	// update the main content element
	this.theme('footer', this.elements.main);

}

/*
 * extend the ViewController Object
 */
footerViewController.prototype = new ViewController();