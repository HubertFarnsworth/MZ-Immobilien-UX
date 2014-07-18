Immobilien.Results = (function() {
	var that = {},
  data = new Array(),
   


	init = function() {
		console.log("Results.js aufgerufen");

		var resultsTemplate = _.template($("#results-tpl").html());
    //var resultingHtml = resultsTemplate({datalist : data})

    //$("#results").html(resultingHtml);
    $("#results").html(resultsTemplate);

    getData();      
	},

  getData = function () {
        var xmlArray = new Array(); 
        xmlArray[0] = loadXMLDoc("res/properties/4696025.xml");
        xmlArray[1] = loadXMLDoc("res/properties/4699501.xml");
        xmlArray[2] = loadXMLDoc("res/properties/4699604.xml");
        xmlArray[3] = loadXMLDoc("res/properties/4700505.xml");
        xmlArray[4] = loadXMLDoc("res/properties/4703070.xml");
        xmlArray[5] = loadXMLDoc("res/properties/4704162.xml");
        xmlArray[6] = loadXMLDoc("res/properties/4707083.xml");
        xmlArray[7] = loadXMLDoc("res/properties/5123397.xml");
        xmlArray[8] = loadXMLDoc("res/properties/5135982.xml");
        xmlArray[9] = loadXMLDoc("res/properties/5630932.xml");
        xmlArray[10] = loadXMLDoc("res/properties/5923747.xml");

        for (var i = 0; i < xmlArray.length; i++) {
          //setText(xmlArray[i]);
          //data["Wohnung" + i] = immo;
          data["Wohnung " + (i+1)] = getImmoData(xmlArray[i]); 
        }
        console.log(data);
  },

	getImmoData = function (xml) {
		/*var rooms = xml.getElementsByTagName("number_of_rooms")[0].innerHTML;
    var type = xml.getElementsByTagName("type")[0].innerHTML;
    var city = xml.getElementsByTagName("city")[0].innerHTML;
    var plz = xml.getElementsByTagName("zipcode")[0].innerHTML;
    var size = xml.getElementsByTagName("living_space")[0].innerHTML;
    var price = xml.getElementsByTagName("price")[0].innerHTML;

    document.getElementById("immo-headline").innerHTML = rooms + " Zimmer " + type;
		document.getElementById("immo-plz").innerHTML = plz + " " + city;
		document.getElementById("immo-size").innerHTML = "Wohnfläche: " + size + " qm"; 
		document.getElementById("immo-price").innerHTML = "Preis: " + price + " €";
		document.getElementById("immo-rooms").innerHTML = "Zimmeranzahl: " + rooms;*/

    var immo = new Array();

    immo ["id"] = xml.getElementsByTagName("id")[0].innerHTML;
    immo ["rooms"] = xml.getElementsByTagName("number_of_rooms")[0].innerHTML; 
    immo ["type"] =  xml.getElementsByTagName("type")[0].innerHTML; 
    immo ["city"] =  xml.getElementsByTagName("city")[0].innerHTML;
    immo ["plz"] =  xml.getElementsByTagName("zipcode")[0].innerHTML;
    immo ["size"] =  xml.getElementsByTagName("living_space")[0].innerHTML;
    immo ["price"] =  xml.getElementsByTagName("price")[0].innerHTML;

    return immo; 
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