Immobilien.Startscreen = (function() {
	var that = {},
    map,
    geocoder = null,

	init = function() {
		console.log("StartScreenView.js aufgerufen");

        startScreenTemplate = _.template($("#startscreen-tpl").html());
        $("#content").html(startScreenTemplate);


        /*var xmlDoc=loadXMLDoc("res/properties/4696025.xml");
        var x = xmlDoc.getElementsByTagName("city")[0].innerHTML;
        console.log(x);*/

        //$("#input").css('background-color', '#F23242');

		setupGoogleComponents();
		createMietenKaufenButton();
		setupDatepicker(); 
		setupSliders(); 
		setupAutocompleteWas(); 
        setupTopButtons();
        setupCheckbox();
	},

	//Funktionen für Mieten/Kaufen-Buttons werden gesetzt
	createMietenKaufenButton = function () {
		$("#Mieten-Button").click(function() {
            //user clicks on rent-button
            //give user feedback (change button states)
            $("#Mieten-Button").attr('class', 'btn btn-primary');
            $("#Kaufen-Button").attr('class', 'btn btn-default');

            //refresh moneyslider with rent-values
            $("#moneyslider").slider({
                values: [ 50, 400 ],
                step: 10,
                min: 50,
                max: 2000,
                range: true,
                slide: function(event, ui) {
                    for (var i = 0; i < ui.values.length; ++i) {
                        $("input.moneyInput[data-index=" + i + "]").val(ui.values[i] + "€");
                    }
                }
            });

            //refill money-input-fields with the current values of the slider
            $("#money-lower-input").val(250 + "€");
            $("#money-upper-input").val(400 + "€");
        });

        $("#Kaufen-Button").click(function() {
            //user clicks on buy-button
            //give user feedback (change button states)
            $("#Kaufen-Button").attr('class', 'btn btn-primary');
            $("#Mieten-Button").attr('class', 'btn btn-default');

            //refresh moneyslider with buy-values
            $("#moneyslider").slider({
                values: [ 10000, 250000 ],
                step: 250,
                min: 10000,
                max: 800000,
                range: true,
                slide: function(event, ui) {
                    for (var i = 0; i < ui.values.length; ++i) {
                        $("input.moneyInput[data-index=" + i + "]").val(ui.values[i] + "€");
                    }
                }
            });
            
            //refill money-input-fields with the current values of the slider
            $("#money-lower-input").val(10000 + "€");
            $("#money-upper-input").val(250000 + "€");
        });
	},

    //Setup der Navigationsbuttons
    setupTopButtons = function () {
        $("#gesuche-button").attr('class', 'btn btn-primary');
        $("#anbieten-button").attr('class', 'btn btn-default');
        $("#merkliste-button").attr('class', 'btn btn-default');

        $("#gesuche-button").click(function() {
            //user clicks on gesuche-button
            //give user feedback (change button states)
            $("#gesuche-button").attr('class', 'btn btn-primary');
            $("#anbieten-button").attr('class', 'btn btn-default');
            $("#merkliste-button").attr('class', 'btn btn-default');
        });

        $("#anbieten-button").click(function() {
            //user clicks on anbieten-button
            //give user feedback (change button states)
            $("#gesuche-button").attr('class', 'btn btn-default');
            $("#anbieten-button").attr('class', 'btn btn-primary');
            $("#merkliste-button").attr('class', 'btn btn-default');
        });

        $("#merkliste-button").click(function() {
            //user clicks on merkliste-button
            //give user feedback (change button states)
            $("#gesuche-button").attr('class', 'btn btn-default');
            $("#anbieten-button").attr('class', 'btn btn-default');
            $("#merkliste-button").attr('class', 'btn btn-primary');
        });
    },

	//Google-Autocomplete für Wo-Input 
	setupGoogleComponents = function () {
		google.maps.event.addDomListener(window, 'load', initialize);

        var mapOptions = {
                center: new google.maps.LatLng(49.0167, 11.0833),
                zoom: 7,
            };

        map = new google.maps.Map(document.getElementById("map-canvas"),
                mapOptions);   

        function initialize() {
            //hier war mapOptions und new map-aufruf
            console.log(map);

            autocomplete = new google.maps.places.Autocomplete(input, options);

            google.maps.event.addListener(autocomplete, 'place_changed', onPlaceChanged);

            function onPlaceChanged() {
                var place = autocomplete.getPlace();
                if (place.geometry) {
                    map.panTo(place.geometry.location);
                    map.setZoom(13);
                } else {
                    $('wo-input').placeholder = 'Stadt eingeben';
                }
            }       
        }
        geocoder = new google.maps.Geocoder();
        
        var address = "Regensburg";
        var latitude, longitude;
        //map = new google.maps.Map(document.getElementById("map-canvas"));

        geocoder.geocode( { 'address': address}, function(results, status) {

            if (status == google.maps.GeocoderStatus.OK) {
                latitude = results[0].geometry.location.lat();
                longitude = results[0].geometry.location.lng();
                console.log(latitude, longitude);
            }
        });

        var myLatlng = new google.maps.LatLng(49,12);
        console.log(map);

        var marker = new google.maps.Marker({
            map: map,
            position: myLatlng,
            animation: google.maps.Animation.DROP,
            title: 'asd'
        });
        console.log(marker);
        marker.setMap(map);

        var input = document.getElementById('wo-input');
        var options = {
            types: ['(cities)'],
            componentRestrictions: {country: 'de'}
        };      
	},

	//Datepicker-Funktion
	setupDatepicker = function () {
		$(function() {
            $( "#datepicker-min" ).datepicker({
                inline: true,
                showOtherMonths: true,
                dayNamesMin: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
                monthNames: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
                dateFormat: 'dd.mm.yy',
                firstDay: 1,
                changeMonth: true,
                changeYear: true,
                minDate: 0,
                onClose: function( selectedDate ) {
                    $( "#datepicker-max" ).datepicker( "option", "minDate", selectedDate );
                }
            });

            $( "#datepicker-max" ).datepicker({
                inline: true,
                showOtherMonths: true,
                dayNamesMin: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
                monthNames: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
                dateFormat: 'dd.mm.yy',
                firstDay: 1,
                changeMonth: true,
                changeYear: true,
                minDate: 0,
                onClose: function( selectedDate ) {
                    $( "#datepicker-min" ).datepicker( "option", "maxDate", selectedDate );
                }
            });
        });
	},

	//Setup der Slider für Kosten, Zimmer, Wohnfläche
	setupSliders = function() {
		 $("#moneyslider").slider({
            values: [ 50, 400 ],
            step: 10,
            min: 50,
            max: 2000,
            range: true,
            slide: function(event, ui) {
                for (var i = 0; i < ui.values.length; ++i) {
                    $("input.moneyInput[data-index=" + i + "]").val(ui.values[i] + "€");
                }
            }
        });

        sliderInputChanged(0, $("#money-lower-input").val());
        sliderInputChanged(1, $("#money-upper-input").val());

        $("#roomsslider").slider({
            values: [ 1, 4 ],
            step: 1,
            min: 1,
            max: 20,
            range: true,
            slide: function(event, ui) {
                for (var i = 0; i < ui.values.length; ++i) {
                    $("input.roomsInput[data-index=" + i + "]").val(ui.values[i]);
                }
            }
        });

        sliderInputChanged(2, $("#rooms-lower-input").val());
        sliderInputChanged(3, $("#rooms-upper-input").val());

        $("input.sliderValue").change(function() {
            var $this = $(this);
            $("#roomsslider").slider("values", $this.data("index"), $this.val());
        });

        $("#sizeslider").slider({
            values: [ 10, 100 ],
            step: 10,
            min: 10,
            max: 600,
            range: true,
            slide: function(event, ui) {
                for (var i = 0; i < ui.values.length; ++i) {
                    $("input.sizeInput[data-index=" + i + "]").val(ui.values[i] + "m²");
                }
            }
        });

        $("input.sliderValue").change(function() {
            var $this = $(this);
            $("#sizeslider").slider("values", $this.data("index"), $this.val());
        });

        sliderInputChanged(4, $("#size-lower-input").val());
        sliderInputChanged(5, $("#size-upper-input").val());
	},

    sliderInputChanged = function (id, oldValue) {
        //input fields manually changed by user
        //update the slider

        /*
        id: give id of input-field
        id 0: money-lower-input was changed
        id 1: money-upper-input was changed
        id 2: rooms-lower-input was changed
        id 3: rooms-upper-input was changed
        id 4: size-lower-input was changed
        id 5: size-upper-input was changed
        */
        var specialSign;
        var slider;
        var inputID;
        var oppositeInputID;

        switch (id) {
            case 0:
                inputID = "#money-lower-input";
                oppositeInputID = "#money-upper-input";
                specialSign = "€";
                slider = "#moneyslider"
                break;
            case 1:
                inputID = "#money-upper-input";
                oppositeInputID = "#money-lower-input";
                specialSign = "€";
                slider = "#moneyslider"
                break;
            case 2:
                inputID = "#rooms-lower-input";
                oppositeInputID = "#rooms-upper-input";
                specialSign = "";
                slider = "#roomsslider"
                break;
            case 3:
                inputID = "#rooms-upper-input";
                oppositeInputID = "#rooms-lower-input";
                specialSign = "";
                slider = "#roomsslider"
                break;
            case 4:
                inputID = "#size-lower-input";
                oppositeInputID = "#size-upper-input";
                specialSign = "m²";
                slider = "#sizeslider"
                break;
            case 5:
                inputID = "#size-upper-input";
                oppositeInputID = "#size-lower-input";
                specialSign = "m²";
                slider = "#sizeslider"
                break;
        }

        var signLength = specialSign.length;

        $(inputID).change(function() {
            var value = $(this).val();
            var current = $(this);



            //check if entered value is below or above the value of the oppsite input
            //if so, user gets notification that this is not allowed

            if (parseInt(value) <= 0) {
                //user typed a negative number
                //reset input-field to old value
                $(inputID).val(oldValue);
                //tell user
                alert("Fehlerhafte Eingabe! Der Wert muss größer als Null sein.");
            }

            else {
                if (parseInt(id) % 2 != 0) {
                    //input of this field should be lower than opposite input value
                    if (value >=  parseInt($(oppositeInputID).val())) {
                        //is allowed
                        refreshSliderFillInput(value, specialSign, signLength, inputID, slider, current);
                    }
                    else {
                        //is not allowed
                        //reset input-field to old value
                        $(inputID).val(oldValue);
                        //tell user
                        console.log(value, $(oppositeInputID).val());
                        alert("Fehlerhafte Eingabe! Der Wert darf nicht unter dem minimal-Wert liegen.");
                    }
                }

                else {
                    //input of this field should be lower than opposite input value
                    if (value <=  parseInt($(oppositeInputID).val())) {
                        //is allowed
                        refreshSliderFillInput(value, specialSign, signLength, inputID, slider, current);
                    }
                    else {
                        //is not allowed
                        //reset input-field to old value
                        $(inputID).val(oldValue);
                        //tell user
                        alert("Fehlerhafte Eingabe! Der Wert darf nicht über dem maximal-Wert liegen.");
                    }
                }
            }
            
            
        });
    }

    refreshSliderFillInput = function (value, specialSign, signLength, inputID, slider, current) {
        if  (value.slice(- signLength) === specialSign) {
                //user entered special sign as last charater
                //delete this sign from the value
                //otherwise input field might have two special signs
                value = current.val().slice(0, - signLength);
            }

            //var $this = $(this);
            $(slider).slider("values", current.data("index"), value);

            //add special sign to value
            $(inputID).val(value + specialSign);
    },

	//Setup von Autocomplete für Was-Input
	setupAutocompleteWas = function () {
		$(function() {
            var availableTags = [
                "Haus",
                "Wohnung",
                "Doppelhaushälfte",
                "Grundstück",
                "Garage"
            ];

            $( "#was-input" ).autocomplete({
                source: availableTags,
                minLength: 0
            }).focus(function(){            
                $(this).trigger('keydown.autocomplete');
            });
        });
	},

    setupCheckbox = function () {
        $("#checkbox-provision").prettyCheckable();
    },

    placeMarkersOnMap = function() {

        var address = "Regensburg";
        var latitude, longitude;
        map = new google.maps.Map(document.getElementById("map-canvas"));

        geocoder.geocode( { 'address': address}, function(results, status) {

            if (status == google.maps.GeocoderStatus.OK) {
                latitude = results[0].geometry.location.lat();
                longitude = results[0].geometry.location.lng();
                console.log(latitude, longitude);
            }
        });

        var myLatlng = new google.maps.LatLng(49,12);
        console.log(map);

        var marker = new google.maps.Marker({
            map: map,
            position: myLatlng,
            animation: google.maps.Animation.DROP,
            title: 'asd'
        });
        console.log(marker);
        marker.setMap(map);
    };

	that.init = init;

	return that;
}());