Immobilien.MainController = (function() {
	var that = {},

	init = function() {
		console.log("MainController.js aufgerufen");
		
		Startscreen = Immobilien.Startscreen;
		Results = Immobilien.Results; 

		Startscreen.init(); 
		Results.init(); 
	};

	that.init = init;

	return that;
}());