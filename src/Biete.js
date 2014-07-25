Immobilien.Biete = (function() {
	var that = {},

	init = function() {
		console.log("Biete init");

		bieteTemplate = _.template($("#biete-tpl").html());
        $("#content").html(bieteTemplate);

        bieteTemplate2 = _.template($("#empty-tpl").html());
        $("#results").html(bieteTemplate2);



        $("#gesuche-button").click(function() {

        	Immobilien.MainController.init(); 

        });

        $("#merkliste-button").click(function() {
            Immobilien.MainController.loadMerkliste(); 
        });

	};



	that.init = init;

	return that;
}());