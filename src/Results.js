Immobilien.Results = (function() {
	var that = {},


	init = function() {
		console.log("Results.js aufgerufen");

		resultsTemplate = _.template($("#results-tpl").html());
        $("#results").html(resultsTemplate);

        var xmlDoc=loadXMLDoc("res/properties/4696025.xml");
        setText(xmlDoc);
        
	},

	setText = function (xml) {
		var rooms = xml.getElementsByTagName("number_of_rooms")[0].innerHTML;
        var type = xml.getElementsByTagName("type")[0].innerHTML;
        var city = xml.getElementsByTagName("city")[0].innerHTML;
        var plz = xml.getElementsByTagName("zipcode")[0].innerHTML;
        var size = xml.getElementsByTagName("living_space")[0].innerHTML;
        var price = xml.getElementsByTagName("price")[0].innerHTML;

        document.getElementById("immo-headline").innerHTML = rooms + " Zimmer " + type;
		document.getElementById("immo-plz").innerHTML = plz + " " + city;
		document.getElementById("immo-size").innerHTML = "Wohnfläche: " + size + " qm"; 
		document.getElementById("immo-price").innerHTML = "Preis: " + price + " €";
		document.getElementById("immo-rooms").innerHTML = "Zimmeranzahl: " + rooms; 
	},


	loadXMLDoc = function (filename)
        {
            if (window.XMLHttpRequest)
              {
              xhttp=new XMLHttpRequest();
              }
            else // code for IE5 and IE6
              {
              xhttp=new ActiveXObject("Microsoft.XMLHTTP");
              }
            xhttp.open("GET",filename,false);
            xhttp.send();
            return xhttp.responseXML;
    };

	that.init = init;

	return that;

}());