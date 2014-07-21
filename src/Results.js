Immobilien.Results = (function() {
	var that = {},
  data = new Array(),

	init = function() {
		console.log("Results.js aufgerufen");
    //getData();

    data = Immobilien.Startscreen.getRessources();
    console.log(data); 

		var resultsTemplate = _.template($("#results-tpl").html());
    var resultingHtml = resultsTemplate({Properties : data});

    $("#results").html(resultingHtml);

    $(document).on("click", ".Property", function(event){
      var PropertyID = event.target.id;
      for (var i = 0; i < data.length; i++) {
        if (data[i].id === PropertyID) {
          Immobilien.MainController.startDetail(data[i]);
        }
      }
    });

    $( ".Property" ).mouseenter(function() {
      $(this).addClass("hover");
      $(this).css("cursor", "pointer");
    });

    $( ".Property" ).mouseleave(function() {
      $(this).removeClass("hover");
    });

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
          data[i] = getImmoData(xmlArray[i]); 
        }
  },

	getImmoData = function (xml) {
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


	loadXMLDoc = function (filename) {
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