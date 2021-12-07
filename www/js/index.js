/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);


function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    //console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    //document.getElementById('deviceready').classList.add('ready');
    document.getElementById("submitButton").addEventListener(
    	"click", storeTripDetails);
	
	    document.getElementById("expense_submitButton").addEventListener(
    	"click", storeExpenseDetails);
	
		    document.getElementById("clear_expenseDetails").addEventListener(
    	"click", clearLocalStorage);
	
		    document.getElementById("clear_tripDetails").addEventListener(
    	"click", clearLocalStorage);
    
    updateTripDetails();
	updateExpenseDetails();
    
    

}

var db;

$(function() {
	$( "#tripDate" ).datepicker({
		dateFormat: 'dd-mm-yy'
	}); 
});

$(function() {
	$( "#returnDate" ).datepicker({
		dateFormat: 'dd-mm-yy'
	}); 
});

$(function() {
	$( "#expenseTime" ).datepicker({
		dateFormat: 'dd-mm-yy'
	}); 
});

function storeTripDetails(){
	
	var emptyFields = false;
	
	var tripName = document.getElementById("tripName").value;
	var destination = document.getElementById("destination").value;
	var tripDate = document.getElementById("tripDate").value;
	var returnDate = document.getElementById("returnDate").value;
	var description = document.getElementById("description").value;
	var transportation = document.getElementById("transportation").value;
	var radioYes = document.getElementById("radio1_0").value;
	var radioNo = document.getElementById("radio1_1").value;
	
	
	if (tripName == ""){
		emptyFields = true;
		alert("Please enter trip name");
	}
	
	if(destination == ""){
		emptyFields = true;
		alert("Please enter your trip destination");
	}
	
	if(tripDate == ""){
		emptyFields = true;
		alert("Please select your trip date");
	}
	if(returnDate == ""){
		emptyFields = true;
		alert("Please select your return date");
	}
	if(document.getElementById("radio1_0").checked == false && document.getElementById("radio1_1").checked == false){
		emptyFields = true;
		alert("Please select risk assessment option");
	}
	
	if(emptyFields == false){
		window.localStorage.setItem("tripName", tripName);
		window.localStorage.setItem("destination", destination);
		window.localStorage.setItem("tripDate", tripDate);
		window.localStorage.setItem("returnDate", returnDate);
		window.localStorage.setItem("description", description);
		window.localStorage.setItem("transportation", transportation);
		
		if(document.getElementById("radio1_0").checked == true) {
			window.localStorage.setItem("radio1_0", radioYes);
		} else {
			window.localStorage.removeItem("radio1_0");
		}
		
		if(document.getElementById("radio1_1").checked == true) {
			window.localStorage.setItem("radio1_1", radioNo);
		} else {
			window.localStorage.removeItem("radio1_1");
		}
	}
	

	

	
	if (emptyFields == false){
		updateTripDetails();
	}
	
	
	return false;
	
}

function updateTripDetails(){
	
	
	
	
	document.getElementById("trip_name").textContent = localStorage.getItem("tripName");
	document.getElementById("trip_destination").textContent = localStorage.getItem("destination");
	document.getElementById("trip_date").textContent = localStorage.getItem("tripDate");
	document.getElementById("trip_return_date").textContent = localStorage.getItem("returnDate");
	document.getElementById("trip_description").textContent = localStorage.getItem("description");
	document.getElementById("trip_transportation").textContent = localStorage.getItem("transportation");
	
	
	if(document.getElementById("risk_assessment_required").textContent = localStorage.getItem("radio1_0") && localStorage.getItem("radio1_0") != "") {
		document.getElementById("radio1_0").checked = true;
	} 
	if (document.getElementById("risk_assessment_required").textContent = localStorage.getItem("radio1_1") && localStorage.getItem("radio1_1") != "") {
		document.getElementById("radio1_1").checked = true;
	}
	


	
	
	document.getElementById("tripName").value = localStorage.getItem("tripName");
	document.getElementById("destination").value = localStorage.getItem("destination");
	document.getElementById("tripDate").value = localStorage.getItem("tripDate");
	document.getElementById("returnDate").value = localStorage.getItem("returnDate");
	document.getElementById("description").value = localStorage.getItem("description");
	document.getElementById("transportation").value = localStorage.getItem("transportation");
	

	
	if(document.getElementById("radio1_0").checked == true) {
		document.getElementById("risk_assessment_required").textContent = localStorage.getItem("radio1_0");
	} 
	if(document.getElementById("radio1_1").checked == true) {
		document.getElementById("risk_assessment_required").textContent = localStorage.getItem("radio1_1");
	}
	
	document.querySelector("#imgFileInput").addEventListener("change", function() {
		
		// File reader will convert img file to data url.
		var reader = new FileReader();
		
		reader.addEventListener("load", () => {
			
			localStorage.setItem("uploaded-image", reader.result);
			
		});
		
		reader.readAsDataURL(this.files[0]);
		
	});
	
	var uploadedImageUrl = localStorage.getItem("uploaded-image");
	
	if(uploadedImageUrl) {
		document.getElementById("trip_img").setAttribute("src", localStorage.getItem("uploaded-image"));
	}

	
	

	
	window.open("#home_page");
	
}


function storeExpenseDetails(){
	
	var emptyFields = false;
	
	var expenseType = document.getElementById("expenseType").value;
	var expenseAmount = document.getElementById("expenseAmount").value;
	var expenseTime = document.getElementById("expenseTime").value;
	var expenseComment = document.getElementById("expenseComment").value;
	
	
		if (expenseType == ""){
		emptyFields = true;
		alert("Please enter expense type");
	}
	
	if(expenseAmount == ""){
		emptyFields = true;
		alert("Please enter expense amount");
	}
	
	if(expenseTime == ""){
		emptyFields = true;
		alert("Please select expense time");
	}
	
		if(emptyFields == false){
		window.localStorage.setItem("expenseType", expenseType);
		window.localStorage.setItem("expenseAmount", expenseAmount);
		window.localStorage.setItem("expenseTime", expenseTime);
		window.localStorage.setItem("expenseComment", expenseComment);
		
	}
	
		if (emptyFields == false){
		updateExpenseDetails();
			window.open("#expenses-page");
	}
	
	
	
	return false;


	
}


function updateExpenseDetails() {
	
	document.getElementById("expense_type").textContent = localStorage.getItem("expenseType");
	document.getElementById("expense_amount").textContent = localStorage.getItem("expenseAmount");
	document.getElementById("expense_time").textContent = localStorage.getItem("expenseTime");
	document.getElementById("expense_comments").textContent = localStorage.getItem("expenseComment");
	
	document.getElementById("expenseType").value = localStorage.getItem("expenseType");
	document.getElementById("expenseAmount").value = localStorage.getItem("expenseAmount");
	document.getElementById("expenseTime").value = localStorage.getItem("expenseTime");
	document.getElementById("expenseComment").value = localStorage.getItem("expenseComment");
	
	
	document.querySelector("#expense_imgFileInput").addEventListener("change", function() {
		
		// File reader will convert img file to data url.
		var reader = new FileReader();
		
		reader.addEventListener("load", () => {
			
			localStorage.setItem("uploaded-expense-image", reader.result);
			
		});
		
		reader.readAsDataURL(this.files[0]);
		
	});
	
	var uploadedImageUrl = localStorage.getItem("uploaded-expense-image");
	
	if(uploadedImageUrl) {
		document.getElementById("expense_img").setAttribute("src", localStorage.getItem("uploaded-expense-image"));
	}


	
	
}

function clearLocalStorage(){
	localStorage.clear();
	    updateTripDetails();
	updateExpenseDetails();
}
