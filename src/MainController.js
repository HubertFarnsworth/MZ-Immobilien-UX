Immobilien.MainController = (function() {
	var that = {},

	init = function() {
		console.log("MainController.js aufgerufen");
		Startscreen = Immobilien.Startscreen;
		Startscreen.init(); 
	};

	that.init = init;

	return that;
}());