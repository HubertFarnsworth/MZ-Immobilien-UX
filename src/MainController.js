Immobilien.MainController = (function() {
	var that = {},
	

	init = function() {
		console.log("MainController.js aufgerufen");

		Startscreen = Immobilien.Startscreen;
		Results = Immobilien.Results;
		
		Startscreen.init(); 
		Results.init(); 
	},

	startDetail = function(id)  {
		Detail = Immobilien.Detail; 
		Detail.startDetail(id); 
	};

	that.init = init;
	that.startDetail = startDetail;

	return that;
}());