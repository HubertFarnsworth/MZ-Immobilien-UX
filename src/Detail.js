Immobilien.Detail = (function() {
	var that = {},
	informations = new Array (), 
	map = false, 
    images = true, 
    data = false, 
    des = false,
    contact = false, 

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

		//Zurück zum Hauptmenü
	    $(document).on("click", "#backToSearch", function(event){
      		Immobilien.MainController.init(); 
    	});

	    //Minimieren bzw. maximieren der Map-Ansicht
    	$(document).on("click", "#map-size-button", function(event){
    		if (map === true) {
    			$("#map-content").height(0);
      			$("#map-size-button").removeClass("glyphicon-minus");
      			$("#map-size-button").addClass("glyphicon-plus");
      			map = false; 
    		} else {
    			$("#map-content").height(300);
    			$("#map-size-button").removeClass("glyphicon-plus");
      			$("#map-size-button").addClass("glyphicon-minus");
    			map = true;
    		}
    	});

        //Minimieren bzw. maximieren der Bildergalerie
        $(document).on("click", "#images-size-button", function(event){
            if (images === true) {
                $("#images-content").height(0);
                $("#images-size-button").removeClass("glyphicon-minus");
                $("#images-size-button").addClass("glyphicon-plus");
                images = false; 
            } else {
                $("#images-content").height(300);
                $("#images-size-button").removeClass("glyphicon-plus");
                $("#images-size-button").addClass("glyphicon-minus");
                images = true;
            }
        });

        //Minimieren bzw. maximieren der Objektdaten
        $(document).on("click", "#data-size-button", function(event){
            if (data === true) {
                $("#data-content").height(0);
                $("#data-size-button").removeClass("glyphicon-minus");
                $("#data-size-button").addClass("glyphicon-plus");
                data = false; 
            } else {
                $("#data-content").height(300);
                $("#data-size-button").removeClass("glyphicon-plus");
                $("#data-size-button").addClass("glyphicon-minus");
                data = true;
            }
        });

        //Minimieren bzw. maximieren der Objektbeschreibungen
        $(document).on("click", "#des-size-button", function(event){
            if (des === true) {
                $("#des-content").height(0);
                $("#des-size-button").removeClass("glyphicon-minus");
                $("#des-size-button").addClass("glyphicon-plus");
                des = false; 
            } else {
                $("#des-content").height(300);
                $("#des-size-button").removeClass("glyphicon-plus");
                $("#des-size-button").addClass("glyphicon-minus");
                des = true;
            }
        });

        //Minimieren bzw. maximieren des Kontaktformulars
        $(document).on("click", "#contact-size-button", function(event){
            if (contact === true) {
                $("#contact-content").height(0);
                $("#contact-size-button").removeClass("glyphicon-minus");
                $("#contact-size-button").addClass("glyphicon-plus");
                contact = false; 
            } else {
                $("#contact-content").height(300);
                $("#contact-size-button").removeClass("glyphicon-plus");
                $("#contact-size-button").addClass("glyphicon-minus");
                contact = true;
            }
        });
	},

	setText = function () {
		document.getElementById("immo-headline").innerHTML = informations.rooms + " Zimmer "+ informations.type;
	};

	that.init = init;
	that.startDetail = startDetail; 

	return that;

}());