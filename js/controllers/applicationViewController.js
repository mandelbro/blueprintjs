
/**
 * Application View Controller
 * Custom view controller module that doesn't include any content
 *
 * Often, with more dynamic web applications, there may be some
 * some functions to run at load time. No problem, view controller
 * modules don't necessarily need to include content as long as
 * their tasks are related to the view.
 */
var applicationViewController = {
	hookInit : function() {
		var self = this;
		// remove the included element
		this.elements.main.remove();
		// here we can run some global routines, like event listeners,
		// device recognition, or other first load tasks

		// for example, let's tell the body element what layout to choose
		// (normal or widescreen)
		if(window.outerWidth > 1440) { // woah there partner, super widescreen monitor in the house!
			$('body').addClass('widescreen');
			// we could also insert a custom stylesheet from here
		}
		else {
			$('body').addClass('normalscreen');
		}

		// finally, let's console log the JSON object we got from the DOM
		console.log(this.model);
	}
};