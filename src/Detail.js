Immobilien.Detail = (function() {
	var that = {},
	informations = new Array (), 
	map = false,
    firstload = true,
    images = true, 
    data = false, 
    des = false,
    contact = false,
    globalMap = null,

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
                $("#data-content-text").css({"visibility":"hidden"});
                data = false; 
            } else {
                $("#data-content").height(300);
                $("#data-size-button").removeClass("glyphicon-plus");
                $("#data-size-button").addClass("glyphicon-minus");
                $("#data-content-text").css({"visibility":"visible"});
                data = true;
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
                $("#des-content").height(300);
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
                contact = false; 
            } else {
                $("#contact-content").height(300);
                $("#contact-size-button").removeClass("glyphicon-plus");
                $("#contact-size-button").addClass("glyphicon-minus");
                contact = true;
            }
        });
	},

    setupMap = function () {
        console.log("map called");
        google.maps.event.addDomListener(window, 'load');

        var address = informations.city + ", " + informations.streetname + " " + informations.housenumber;
        console.log(address);

        placeMarkersOnMap(address);

        console.log(getGeoData(address));
        var locationData = getGeoData(address);
        var lat = locationData["latitude"];
        var lng = locationData["longitude"];

        console.log(lat, lng);

        var mapOptions = {
            center: new google.maps.LatLng(lat, lng),
            zoom: 12,
        };

        globalMap = new google.maps.Map(document.getElementById("map-content"),
                mapOptions);
    },

    getGeoData = function (address) {
        geocoder = new google.maps.Geocoder();

        var latitude, longitude;
        var latlng = new Array();

        geocoder.geocode( { 'address': address}, function(results, status) {

            if (status == google.maps.GeocoderStatus.OK) {
                latitude = results[0].geometry.location.lat();
                longitude = results[0].geometry.location.lng();

                console.log(latitude, longitude);

                
                latlng["0"] = latitude;
                latlng["1"] = longitude;

                
            }
        });

        console.log(latlng);
        return latlng;
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
        document.getElementById("data-content-text").innerHTML = informations.streetname + " " + informations.housenumber;
	};

	that.init = init;
	that.startDetail = startDetail; 

	return that;

}());