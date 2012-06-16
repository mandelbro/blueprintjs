
/**
 * Footer View Controller
 * Custom view controller module to include a footer
 */
var footerViewController = {

	hookInit : function() {
		// update the main content element
		this.theme('footer');
	},

	hookTheme : function() {

		return {

			'footer'	: function(variables) {
				var output;
				// add the content
				output = '<p class="copyright">All this awesome content was included dynamically by Blueprint JS, made by Vandelay Industries (Copyright 2012, All rights reserved).</p>';

				return output;
			}
		}

	}

};