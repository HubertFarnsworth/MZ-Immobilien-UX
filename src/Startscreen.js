Immobilien.Startscreen = (function() {
	var that = {},

	init = function() {
		console.log("StartScreenView.js aufgerufen");

        startScreenTemplate = _.template($("#startscreen-tpl").html());
        $("#content").html(startScreenTemplate);

        //$("#input").css('background-color', '#F23242');

		googleAutocomplete(); 
		createMietenKaufenButton();
		setupDatepicker(); 
		setupSliders(); 
		setupAutocompleteWas(); 
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
                values: [ 250, 400 ],
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

	//Google-Autocomplete für Wo-Input 
	googleAutocomplete = function () {
		google.maps.event.addDomListener(window, 'load', initialize);

        function initialize() {
            var map;
            var mapOptions = {
                center: new google.maps.LatLng(49.0167, 11.0833),
                zoom: 7,
            };
            map = new google.maps.Map(document.getElementById("map-canvas"),
                mapOptions);

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
            values: [ 250, 400 ],
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

        sliderInputChanged(0);
        sliderInputChanged(1);

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

        sliderInputChanged(2);
        sliderInputChanged(3);

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

        sliderInputChanged(4);
        sliderInputChanged(5);
	},

    sliderInputChanged = function (id) {
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

        switch (id) {
            case 0:
                inputID = "#money-lower-input";
                specialSign = "€";
                slider = "#moneyslider"
                break;
            case 1:
                inputID = "#money-upper-input";
                specialSign = "€";
                slider = "#moneyslider"
                break;
            case 2:
                inputID = "#rooms-lower-input";
                specialSign = "";
                slider = "#roomsslider"
                break;
            case 3:
                inputID = "#rooms-upper-input";
                specialSign = "";
                slider = "#roomsslider"
                break;
            case 4:
                inputID = "#size-lower-input";
                specialSign = "m²";
                slider = "#sizeslider"
                break;
            case 5:
                inputID = "#size-upper-input";
                specialSign = "m²";
                slider = "#sizeslider"
                break;
        }

        var signLength = specialSign.length;

        $(inputID).change(function() {
            var value = $(this).val();
            
            if  (value.slice(- signLength) === specialSign) {
                //user entered special sign as last charater
                //delete this sign from the value
                //otherwise input field might have two special signs
                value = $(this).val().slice(0, - signLength);
            }

            var $this = $(this);
            $(slider).slider("values", $this.data("index"), value);

            //add special sign to value
            $(inputID).val(value + specialSign);
        });
    }

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
	};

	that.init = init;

	return that;
}());