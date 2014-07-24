Immobilien.Detail = (function() {
	var that = {},
	informations = new Array (), 
	map = false,
    firstload = true,
    images = true, 
    dataVisible = false, 
    des = false,
    contact = false,
    globalMap = null,
    latitude = null,
    longitude = null,
    amountOfImages = 4,

	init = function() {
	   console.log("Detail.js aufgerufen");	
	},

	startDetail = function (data) {
        console.log("detail started");

        //setupMap();
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
        setupMap();
        createHTMLTags(),
        setupGalleria();

		//Zurück zum Hauptmenü
	    $(document).on("click", "#backToSearch", function(event){
      		Immobilien.MainController.reloadStartscreen(); 
    	});

	    //Minimieren bzw. maximieren der Map-Ansicht
    	$(document).on("click", "#map-size-button", function(event){
    		if (map === true) {
    			$("#map-content").height(0);
      			$("#map-size-button").removeClass("glyphicon-minus");
      			$("#map-size-button").addClass("glyphicon-plus");
      			map = false; 
    		} else {
    			$("#map-content").height(400);
    			$("#map-size-button").removeClass("glyphicon-plus");
      			$("#map-size-button").addClass("glyphicon-minus");
                if (firstload) {
                    setupMap();
                    firstload = false;    
                }
    			map = true;
    		}
    	});

        //Minimieren bzw. maximieren der Bildergalerie
        $(document).on("click", "#images-size-button", function(event){
            if (images === true) {
                console.log("einklappen");
                $("#images-content").height(0);
                $('.galleria').data('galleria').destroy();
                for (var i = 1; i <= parseInt(amountOfImages); i++) {
                    var img = document.getElementById("image" + i);
                    console.log("image" + i);
                    img.style.visibility = "hidden";
                }
                $("#images-size-button").removeClass("glyphicon-minus");
                $("#images-size-button").addClass("glyphicon-plus");
                images = false; 
            } else {
                console.log("ausklappen");
                $("#images-content").height(400);
                setupGalleria();
                /*
                for (var i = 1; i <= parseInt(amountOfImages); i++) {
                    var img = document.getElementById("image" + i);
                    console.log("image" + i);
                    img.style.visibility = "visible";
                }
                */
                $("#images-size-button").removeClass("glyphicon-plus");
                $("#images-size-button").addClass("glyphicon-minus");
                images = true;
            }
        });

        //Minimieren bzw. maximieren der Objektdaten
        $(document).on("click", "#data-size-button", function(event){
            if (dataVisible === true) {
                $("#data-content").height(0);
                $("#data-size-button").removeClass("glyphicon-minus");
                $("#data-size-button").addClass("glyphicon-plus");
                $("#data-content-list").css({"visibility":"hidden"});
                dataVisible = false; 
            } else {
                $("#data-content").height(400);
                $("#data-size-button").removeClass("glyphicon-plus");
                $("#data-size-button").addClass("glyphicon-minus");
                $("#data-content-list").css({"visibility":"visible"});
                dataVisible = true;
            }
        });

        //Minimieren bzw. maximieren der Objektbeschreibungen
        $(document).on("click", "#des-size-button", function(event){
            if (des === true) {
                $("#des-content").height(0);
                $("#des-size-button").removeClass("glyphicon-minus");
                $("#des-size-button").addClass("glyphicon-plus");
                $("#des-content-text").css({"visibility":"hidden"});
                des = false; 
            } else {
                $("#des-content").height(200);
                $("#des-size-button").removeClass("glyphicon-plus");
                $("#des-size-button").addClass("glyphicon-minus");
                $("#des-content-text").css({"visibility":"visible"});
                des = true;
            }
        });

        //Minimieren bzw. maximieren des Kontaktformulars
        $(document).on("click", "#contact-size-button", function(event){
            if (contact === true) {
                $("#contact-content").height(0);
                $("#contact-size-button").removeClass("glyphicon-minus");
                $("#contact-size-button").addClass("glyphicon-plus");
                $("#contact-content").css({"visibility":"hidden"});
                contact = false; 
            } else {
                $("#contact-content").height(100);
                $("#contact-size-button").removeClass("glyphicon-plus");
                $("#contact-size-button").addClass("glyphicon-minus");
                $("#contact-content").css({"visibility":"visible"});
                contact = true;
            }
        });

        $(document).on("click", "#write-email", function(event){
            console.log("write email");
            var link = "mailto:domi.bauer@arcor.de"
             + "?cc="
             + "&subject=" + escape("MZ-Immobilien: Interesse an Objekt #" + informations.id)
             + "&body=" + escape("Hallo, ich interessiere mich fuer Ihr Objekt in der " + informations.streetname + " " + informations.housenumber + ", " + informations.plz + " " + informations.city +". Bitte senden Sie mir einen Besichtigungsterm zu.");
            window.location.href = link;
        }); 

        $(document).on("click", "#merkliste-button", function(event){
            Immobilien.MainController.loadMerkliste(); 
        });

        $(document).on("click", "#add-merkliste", function(event){
            Immobilien.MainController.addToMerkliste(informations); 
        });


	},

    setupGalleria = function () {
        //start the gallery

        Galleria.loadTheme('./libs/galleria/themes/classic/galleria.classic.min.js');
        Galleria.run('.galleria');

    },

    createHTMLTags = function () {
        //creates html-tags for the pictures
        //needed for the gallery
        var id = informations.id;
        var imageUrl;

        for (var i = 1; i <= amountOfImages; i++) {
            //create up zo 4 image-tags for the gallery
            imageUrl = "./res/image/" + id + "_" + i + ".jpg";
            var imgElement = document.createElement("img");
            imgElement.setAttribute("id", "image" + i);
            imgElement.setAttribute("src", imageUrl);
            document.getElementById("galleria").appendChild(imgElement);
        }
    },

    setupMap = function () {
        console.log("map called");
        google.maps.event.addDomListener(window, 'load');

        var address = informations.city + ", " + informations.streetname + " " + informations.housenumber;
        console.log(address);

        placeMarkersOnMap(address);

        setGeoData(address);

        var mapOptions = {
            center: new google.maps.LatLng(latitude, longitude),
            zoom: 15,
        };

        globalMap = new google.maps.Map(document.getElementById("map-content"),
                mapOptions);
    },

    setGeoData = function (address) {
        geocoder = new google.maps.Geocoder();

        geocoder.geocode( { 'address': address}, function(results, status) {

            if (status == google.maps.GeocoderStatus.OK) {
                latitude = results[0].geometry.location.lat();
                longitude = results[0].geometry.location.lng();
            }
        });
    },

    placeMarkersOnMap = function(address) {

        geocoder = new google.maps.Geocoder();

        var latitude, longitude;

        geocoder.geocode( { 'address': address}, function(results, status) {

            if (status == google.maps.GeocoderStatus.OK) {
                latitude = results[0].geometry.location.lat();
                longitude = results[0].geometry.location.lng();

                console.log(latitude, longitude);

                var marker = new google.maps.Marker({
                    map: globalMap,
                    position: results[0].geometry.location,
                    animation: google.maps.Animation.DROP,
                    icon: 'res/markers/marker1.png'
                });
            }
        });
    },

	setText = function () {
        console.log(informations);
		document.getElementById("immo-headline").innerHTML = informations.rooms + " Zimmer "+ informations.type;
        document.getElementById("des-content-text").innerHTML = informations.description;

        appendLi ("Kaltmiete: " +  informations.price +",00 €");
        appendLi ("Nebenkosten: " +  informations.extra_cost +" €");
        appendLi ("Gesamtkosten: " +  (parseInt(informations.extra_cost) + parseInt(informations.price))  +",00 €");
        appendLi ("Kaution: " +  informations.bail +" €");
        appendLi ("Provision: " +  informations.commission +" €");
        appendLi ("Adresse: " + informations.streetname + " " + informations.housenumber + ", " + informations.plz + " " + informations.city);
        appendLi ("Anzahl der Zimmer: " +  informations.rooms);
        appendLi ("Wohnfläche: " +  informations.size + "qm");
        appendLi ("Objektzustand: " +  informations.status);
        appendLi ("Anzahl der Etagen: " +  informations.floors);
        appendLi ("Befeuerung: " +  informations.heatingtype);
        appendLi ("Extras: " +  informations.extra);
        appendLi ("Keller: " +  informations.cellar);
        appendLi ("Küche: " +  informations.built_in_kitchen);
        appendLi ("Baujahr: " +  informations.year_of_construction);
        appendLi ("Stellplatz: " +  informations.parking_space);
        appendLi ("Verfügbare Stellplätze: " +  informations.parking_space_amount);
        appendLi ("Kosten für Stellplatz: " +  informations.parking_space_price +" €");
        if (informations.vacant_from != "") {
          appendLi ("Verfügbar ab: " +  informations.vacant_from);  
        } else {
           appendLi ("Verfügbar ab: sofort"); 
        }

        document.getElementById("telephone").innerHTML = ("Telefon: ") + informations.telephone;
        document.getElementById("e-mail").innerHTML = ("E-Mail: ") + informations.email;


        
	},

    appendLi = function (content) {
        var ul = document.getElementById("data-content-list");
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(content));
        ul.appendChild(li);

    };

	that.init = init;
	that.startDetail = startDetail; 

	return that;

}());