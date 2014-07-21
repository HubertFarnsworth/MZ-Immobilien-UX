Immobilien.Detail = (function() {
	var that = {},
	informations = new Array (), 


	init = function() {
	console.log("Detail.js aufgerufen");	
	},

	startDetail = function (data) {
		//Scolls to 0,0
		window.scrollTo(0, 0);

		//Templates
		var detailTemplateTop = _.template($("#detail-tpl-top").html());
		var detailTemplateBot = _.template($("#detail-tpl-bot").html());
		$("#content").html(detailTemplateTop);
		$("#results").html(detailTemplateBot);

		//Sets the Text 
		informations = data; 
		setText();

	    $(document).on("click", "#backToStart", function(event){
      		Immobilien.MainController.init(); 
    	});
	},

	setText = function () {
		document.getElementById("immo-headline").innerHTML = informations.rooms + " Zimmer "+ informations.type;
	};

	that.init = init;
	that.startDetail = startDetail; 

	return that;

}());