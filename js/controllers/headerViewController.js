
/**
 * Header View Controller
 * Custom view controller module to include a header
 */
var headerViewController = {
	hookInit : function() {
		// update the main content element
		this.theme('header');
		this.theme('navigation');
	},
	hookTheme : function() {
		// add templates
		return {

			'header'	: function(variables) {
				var output;
				// add the header
				output = '<h1 class="logo">Blueprint JS Templating System</h1>';

				return output;
			},
			'navigation' : function(variables) {
				// add the header
				output = $('<div class="navigation"></div>')
									 .append(
										 '<h3 class="navigation-header">Navigation</h3>'+
										 variables.linkUL
									 );
				return output;
			}

		}
	},

	/*
	 * Here we have an example of a preprocess function, say we receive and array
	 * of navigation links, it's best to preprocess that array into markup, we'll
	 * setup a property called linkUL that will deliver clean markup to our navigation
	 * theme
	 */
	templatePreprocess_navigation : function(variables) {
		var linkUL = new String();
		// build the markup for the navigation list
		linkUL = '<ul class="navigation-list">';
		for(var i in variables.links) {
			linkUL = linkUL.concat('<li><a href="#">'+ variables.links[i] +'</a></li>');
		}
		linkUL += '</ul>'
		// make sure to add the new markup variable to the variables map
		variables.linkUL = linkUL;
	}

}