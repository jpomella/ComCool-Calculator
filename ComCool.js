function init() {

	var url = "http://localhost/javascript/comcool/working/data.json";
	var request = new XMLHttpRequest();
	request.open("GET", url);
	request.send(null);

	request.onload = function () {
		if (request.status === 200) {
			result = JSON.parse(request.responseText);
			drawMainTable();
			drawTable2();
			drawTable3();
		}
	rooms = result.numberOfRooms;
	};
}

function drawMainTable() {
	
	var div = document.getElementById("calc");
	
	var drawTable = document.createElement("table");
		drawTable.id = "calcTable";
		drawTable.className = "tg";
		div.appendChild(drawTable);
		
	var table = document.getElementById("calcTable");

		//Draw Location Field
		for ( var i = 0; i < result.locations.length ; i++ ) {
			if ( result.locations[i].name !== null) {
				var locations = document.getElementById("location");
				var option = document.createElement("option");
				option.value = result.locations[i].name;
				option.text = result.locations[i].name;
				locations.appendChild(option);
			}
		}
		
		//Create Head Elements
		for ( var i = 0; i < result.titles.length; i++ ) {
		var createHead = document.createElement("th");
			createHead.innerHTML = result.titles[i].name;
			table.appendChild(createHead);
			}
			
		//Create Row Elements
		for ( var i = 0; i < result.numberOfRooms ; i++ ) {
            var row = table.insertRow(-1);
 
            var cell1 = row.insertCell(0);
            var roomInput = document.createElement("input");
            roomInput.type = "text";
            roomInput.id = "R" + i + "Name";
            cell1.appendChild(roomInput);
 
            var cell2 = row.insertCell(1);
            var lInput = document.createElement("input");
            lInput.type = "number";
            lInput.id = "R" + i + "L";
			lInput.onchange = calculateRoomM3;
			lInput.className = "smallInput";
            cell2.appendChild(lInput);
 
            var cell3 = row.insertCell(2);
            var wInput = document.createElement("input");
            wInput.type = "number";
            wInput.id = "R" + i + "W";
			wInput.onchange = calculateRoomM3;
			wInput.className = "smallInput";
            cell3.appendChild(wInput);
			
			var cell4 = row.insertCell(3);
            var hInput = document.createElement("input");
            hInput.type = "number";
            hInput.id = "R" + i + "H";
			hInput.onchange = calculateRoomM3;
			hInput.className = "smallInput";
            cell4.appendChild(hInput);

			var cell5 = row.insertCell(4);
            var extraRoomFactorInput = document.createElement("input");
            extraRoomFactorInput.type = "number";
            extraRoomFactorInput.id = "R" + i + "Factor";
			extraRoomFactorInput.value = "1.0";
			extraRoomFactorInput.step = "0.1";
			extraRoomFactorInput.min = "1.0";
			extraRoomFactorInput.max = "1.3";
			extraRoomFactorInput.onchange = calculateRoomM3;
            cell5.appendChild(extraRoomFactorInput);
			
			var cell6 = row.insertCell(5);
            var m3Output = document.createElement("output");
            m3Output.id = "R" + i + "M3Total";
            cell6.appendChild(m3Output);
			
			var cell7 = row.insertCell(6);
            var suggDia = document.createElement("output");
            suggDia.id = "R" + i + "Dia";
			suggDia.className = "dropperField";
            cell7.appendChild(suggDia);
			
			var cell8 = row.insertCell(7);
            var outSize = document.createElement("select");
            outSize.id = "R" + i + "OutletSize";
			outSize.onchange = calculateDuctDia;
            cell8.appendChild(outSize);
		
				for ( var x = 0; x < result.ductInfo.length ; x++ ) {
					if ( result.ductInfo[x].ventSize != "nil") {
						var option = document.createElement("option");
						option.value = result.ductInfo[x].ventSize;
						option.text = result.ductInfo[x].ventSize;
						outSize.appendChild(option);
					}
				}
			
			var cell9 = row.insertCell(8);
            var ductDia = document.createElement("output");
            ductDia.id = "R" + i + "DuctSize";
            cell9.appendChild(ductDia);
		}	

}

function drawTable2() {
	
	var p = document.getElementById("total");
	
	var table = document.createElement("Table");
		table.id = "totalTable";
		table.className = "tg";
		p.appendChild(table);
    
    var tableBody = document.createElement('tbody');
    table.appendChild(tableBody);
	
		for (var i = 0; i < 3; i++){
			var tr = document.createElement('TR');
			var outputBox = document.createElement("output");
			var inputBox = document.createElement("input");
		
			tableBody.appendChild(tr);
	
			var td = document.createElement('TD');
				if ( i === 0 ) {
					td.appendChild(document.createTextNode("Total M3 All Rooms:"));
				} else if ( i == 1 ) {
					td.appendChild(document.createTextNode("Extra House Heat Load:"));
				} else if ( i == 2 ) {
					td.appendChild(document.createTextNode("Total System m3 Required:"));
				}
			tr.appendChild(td);
		
			var td = document.createElement('TD');
				if ( i === 0 ) {
					outputBox.id = "HouseM3Total";
					td.appendChild(outputBox);
				} else if ( i == 1 ) {
					inputBox.type = "number";
					inputBox.id = "HouseHeatLoad";
					inputBox.value = "1.0";
					inputBox.step = "0.1";
					inputBox.min = "1.0";
					inputBox.max = "1.3";
					inputBox.onchange = calculateAdjustedM3;
					td.appendChild(inputBox);
				} else if ( i == 2 ) {
					outputBox.id = "HouseAdjustM3Total";
					td.appendChild(outputBox);
				}

		    tr.appendChild(td);

		}
}
	
function drawTable3() {
	
	var div = document.getElementById("dropper");
	
	//create table
	var drawTable = document.createElement("table");
		drawTable.id = "dropperTable";
		drawTable.className = "tg";
		div.appendChild(drawTable);

	var table = document.getElementById("dropperTable");		
		
	//Create Head Elements
	for ( var i = 0; i < 3; i++ ) {
		var createHead = document.createElement("th");
			if ( i === 0) {
				createHead.innerHTML = "";
			} else if ( i === 1) {
				createHead.innerHTML = "Dropper Duct Size";
			} else if ( i === 2) {
				createHead.innerHTML = "Dropper Duct Capacity";
			}
			table.appendChild(createHead);
	}	

	for ( var i = 0; i < 6 ; i++ ) {
	
	var rowCount = table.rows.length;
	var row = table.insertRow(rowCount);
	
		var cell1 = row.insertCell(0);
		var dropperName = document.createElement("output");
			dropperName.innerHTML = "Dropper Duct Side " + [i + 1];
			cell1.appendChild(dropperName);		

		var cell2 = row.insertCell(1);
		var dropperInput = document.createElement("input");
			dropperInput.type = "number";
			dropperInput.id = "D" + [i] + "Size";
			dropperInput.step = "50";
			dropperInput.min = "300";
			dropperInput.max = "550";
			dropperInput.onchange = calculateDropperCapacity;
			dropperInput.className = "dropperField";
			cell2.appendChild(dropperInput);
		
		var cell3 = row.insertCell(2);
		var dropperOutput = document.createElement("output");
			dropperOutput.id = "D" + [i] + "Capacity";
			cell3.appendChild(dropperOutput);	
	
	}
	
	var rowCount = table.rows.length;
	var row = table.insertRow(rowCount);
	
		var cell1 = row.insertCell(0);
		var designCapacity = document.createElement("output");
			designCapacity.colSpan = "2";
			designCapacity.innerHTML = "Design Dropper Capacity";
			cell1.colSpan = "2";
			cell1.appendChild(designCapacity);
			
		var cell2 = row.insertCell(1);
		var DTotalCapacity = document.createElement("output");
			DTotalCapacity.id = "DTotalCapacity";	
			cell2.appendChild(DTotalCapacity);
	
	var rowCount = table.rows.length;
	var row = table.insertRow(rowCount);
	
		var cell1 = row.insertCell(0);
		var modelCapacity = document.createElement("output");
			modelCapacity.innerHTML = "Model Dropper Capacity";
			cell1.colSpan = "2";
			cell1.appendChild(modelCapacity);
			
		var cell2 = row.insertCell(1);
		var dropperCapacityUnit = document.createElement("output");
			dropperCapacityUnit.id = "dropperCapacityUnit";
			cell2.appendChild(dropperCapacityUnit);

	var rowCount = table.rows.length;
	var row = table.insertRow(rowCount);
	
		var cell1 = row.insertCell(0);
		var modelSelect = document.createElement("output");
			modelSelect.innerHTML = "Model Selection";
			cell1.colSpan = "2";
			cell1.appendChild(modelSelect);
			
		var cell2 = row.insertCell(1);
		var model = document.createElement("output");
			model.id = "model";
			cell2.appendChild(model);					


}

function findLocation() {
	var getLocationFactor = document.getElementById("location").value;
	
	for ( var i = 0 ; i < result.locations.length ; i++) {
		if (result.locations[i].name === getLocationFactor) {
		getLocationValue = result.locations[i].factor;
		}	
	}
}

function calculateRoomM3() {

	findLocation();

	var str = this.id,
		slice = str.slice(0,2),
		roomL = slice + "L",
		roomW = slice + "W", 
		roomH =  slice + "H",
		roomFactor =  slice + "Factor",
		roomTotal = slice + "M3Total",
		roomDuctDia = slice + "Dia",
		
		roomL = document.getElementById(roomL).value;
		roomW = document.getElementById(roomW).value;
		roomH = document.getElementById(roomH).value;
		roomFactor = document.getElementById(roomFactor).value;
		roomTotal = document.getElementById(roomTotal);
		roomDuctDia = document.getElementById(roomDuctDia);
		
		var roomM3 = Math.round((roomL * roomW * roomH) * roomFactor);
		roomTotal.innerHTML = roomM3;
		
		for ( var x = 0; x < result.ductInfo.length; x++) {
			if (roomM3 >= result.ductInfo[x].roomDuctSizeLoc1 && roomM3 <= result.ductInfo[x + 1].roomDuctSizeLoc1 && getLocationValue === 1) {			
				roomDuctDia.innerHTML = result.ductInfo[x + 1].ductSize;
			} else if (roomM3 >= result.ductInfo[x].roomDuctSizeLoc2 && roomM3 <= result.ductInfo[x + 1].roomDuctSizeLoc2 && getLocationValue === 2) {
				roomDuctDia.innerHTML = result.ductInfo[x + 1].ductSize;
			} else if (roomM3 >= result.ductInfo[x].roomDuctSizeLoc3 && roomM3 <= result.ductInfo[x + 1].roomDuctSizeLoc3 && getLocationValue === 3) {
				roomDuctDia.innerHTML = result.ductInfo[x + 1].ductSize;
			} else if (roomM3 >= result.ductInfo[x].roomDuctSizeLoc4 && roomM3 <= result.ductInfo[x + 1].roomDuctSizeLoc4 && getLocationValue === 4) {
				roomDuctDia.innerHTML = result.ductInfo[x + 1].ductSize;
			} else if (roomM3 >= result.ductInfo[x].roomDuctSizeLoc5 && roomM3 <= result.ductInfo[x + 1].roomDuctSizeLoc5 && getLocationValue === 5) {
				roomDuctDia.innerHTML = result.ductInfo[x + 1].ductSize;
			} 
		}
		
		if ( roomTotal.value > result.ductInfo[6].roomDuctSizeLoc1 && getLocationValue === 1) {
			roomDuctDia.innerHTML = "Outlet Capacity Reached";
		} else if ( roomTotal.value > result.ductInfo[6].roomDuctSizeLoc2 && getLocationValue === 2) {
			roomDuctDia.innerHTML = "Outlet Capacity Reached";
		} else if ( roomTotal.value > result.ductInfo[6].roomDuctSizeLoc3 && getLocationValue === 3) {
			roomDuctDia.innerHTML = "Outlet Capacity Reached";
		} else if ( roomTotal.value > result.ductInfo[6].roomDuctSizeLoc4 && getLocationValue === 4) {
			roomDuctDia.innerHTML = "Outlet Capacity Reached";
		} else if ( roomTotal.value > result.ductInfo[6].roomDuctSizeLoc5 && getLocationValue === 5) {
			roomDuctDia.innerHTML = "Outlet Capacity Reached";
		}
		
		calculateTotalM3();
}

function calculateTotalM3() {

	var	totalM3Element = document.getElementById("HouseM3Total");
	var totalM3Calc = 0;
	
	for ( var i = 0; i < rooms; i++) {
		var roomM3Calc = document.getElementById("R" + i + "M3Total").value;
		if (roomM3Calc !== "") {
			totalM3Calc = totalM3Calc + Number(roomM3Calc);
		}
	}
	
	totalM3Element.innerHTML = totalM3Calc;	
	
	calculateAdjustedM3();
}

function calculateAdjustedM3() {

	var totalM3Element = document.getElementById("HouseM3Total");
	var heatLoad = document.getElementById("HouseHeatLoad");
	var adjustedM3Element = document.getElementById("HouseAdjustM3Total");
	var adjustedM3;
	
	adjustedM3 = Math.round(totalM3Element.value * heatLoad.value);
	adjustedM3Element.innerHTML = adjustedM3;	

	unitArray = [];
	
	for ( var x = 0 ; x < result.modelFinder.length; x++) {
		if (adjustedM3 <= result.modelFinder[x].location1Capacity && getLocationValue === 1) {
		unitArray.push(result.modelFinder[x].model);
		} else if (adjustedM3 <= result.modelFinder[x].location2Capacity && getLocationValue === 2) {
		unitArray.push(result.modelFinder[x].model);
		} else if (adjustedM3 <= result.modelFinder[x].location3Capacity && getLocationValue === 3) {
		unitArray.push(result.modelFinder[x].model);
		}  else if (adjustedM3 <= result.modelFinder[x].location4Capacity && getLocationValue === 4) {
		unitArray.push(result.modelFinder[x].model);
		}  else if (adjustedM3 <= result.modelFinder[x].location5Capacity && getLocationValue === 5) {
		unitArray.push(result.modelFinder[x].model);
		}

		replaceWithDropdownModel( "model" , unitArray);
	}
	
	return [
	unitArray
	];
}

function calculateDuctDia() {
	
	var str = this.id,
		slice = str.slice(0,2),
		roomOutletSize = slice + "OutletSize",
		roomDuctDia = slice + "DuctSize",
		diaResult;
		
		roomOutletSize = document.getElementById(roomOutletSize).value,
		roomDuctdia = document.getElementById(roomDuctDia);
	
		for ( var x = 0; x < result.ductInfo.length ; x++) {
			if (result.ductInfo[x].ventSize == roomOutletSize) {
				diaResult = result.ductInfo[x].ductSize;
			}
		}
	
		roomDuctdia.innerHTML = diaResult;	
}

function replaceWithDropdownModel( id , valueList ){
    var element = document.getElementById( id );
    var dropdown = document.createElement("select"),
        value = element.value,
        option;
    dropdown.id = id;
	dropdown.onchange = finalUnitCalc;
    for( var i = 0 ; i < valueList.length ; i++ ){
        option = document.createElement("option"); 
        option.text = valueList[i];
        option.value = valueList[i];
        if( option.value == value){
          option.selected = true;
          
        }
        dropdown.options.add(option);
    }
    element.parentNode.replaceChild( dropdown , element );
}

function calculateDropperCapacity() {
		
		totalDropperCapacity = 0;
		dropperSides = 6;
		
		var str = this.id,
		slice = str.slice(0,2),
		dropperOutletSize = slice + "Size",
		dropperDuctCapacity = slice + "Capacity",
		dropperResult;
		
		dropperOutletSize = document.getElementById(dropperOutletSize).value;
		dropperDuctCapacity = document.getElementById(dropperDuctCapacity);

			for ( var x = 0; x < result.ductInfo.length ; x++) {
				if (result.ductInfo[x].ductSize == dropperOutletSize) {
					dropperResult = result.ductInfo[x].dropperCapacity;
				} else if (dropperOutletSize > 551 && dropperOutletSize > 1) {
					dropperResult = "Size Does Not Exist, Try Lower";
				}	else if (dropperOutletSize < 349 && dropperOutletSize > 1) {
					dropperResult = "Size Does Not Exist, Try Higher";
				}
			
			}

		dropperDuctCapacity.innerHTML = dropperResult;	
		
		calculateTotalDropperCapacity();

	}

function calculateTotalDropperCapacity() {

	var totalDropperElement = document.getElementById("DTotalCapacity"),
		totalDropperCalc = 0;
		
	for (var i = 0 ; i < dropperSides; i++) {
		var DropperCalc = document.getElementById("D" + i + "Capacity").value;
			if (DropperCalc !== "") {
				totalDropperCalc = totalDropperCalc + Number(DropperCalc);
			}
	
	}
	
	totalDropperElement.innerHTML = totalDropperCalc;	

}

function finalUnitCalc() {
		
	var selectedUnit = document.getElementById("model").value,
		dropperCapacityUnit = document.getElementById("dropperCapacityUnit");
	
	for ( var i = 0 ; i < result.modelFinder.length ; i++) {
			if (selectedUnit === result.modelFinder[i].model) {
			dropperCapacityUnit.innerHTML = result.modelFinder[i].dropperCapacity;
			}
	}
}

window.onload = init;
