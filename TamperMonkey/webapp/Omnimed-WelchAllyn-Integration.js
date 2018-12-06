// ==UserScript==
// @name         Retrieve Vital Signs
// @namespace    http://www.omnimed.com/
// @version      0.1
// @description  Javascript to add a button in the vital signs window. This button will retrieve the vital signs measurements from a Welch-Allyn device.
// @author       developpement@omnimed.com
// @match        https://*/omnimed/do/dashboard/*
// @grant        none
// ==/UserScript==

window.httpGet = function(theUrl) {
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
};

window.RetrieveVitalSigns = function() {

    var measurementsURL = "https://127.0.0.1:9234/WelchAllyn/Device/GetCurrentReading?deviceid=" + device.deviceid;
    var measurementsResponse = window.httpGet(measurementsURL);
    //var measurementsResponse = '[{"reading":"0","bmi":"34","clinicianid":"4321","date":"2013-09-14T13:23:33","diastolic":"80","height":"70.2","hr":"61","map":"84","o2sat":"96","pain":"4","patientid":"1234567","pulse":"60","respiration":"22","systolic":"120","temperature":"97.3","weight":"150.7"}]';
    var measurements = null;

    if (measurementsResponse != null) {
      measurements = JSON.parse(measurementsResponse)[0];
    }

    //Get the EMR Unit system.
    // 1 = 'Metric, 2 = 'Imperial'
  	var emrUnits =  jQuery('*[id$="vitalSignObservationSystemUnitSelectOneMenu"] option:selected').val();

    //Temperature
    var temperature = null;
    if (device.tempdisplayunit == 'DEG_C') {
        temperature = measurements.temperature;
    } else {
        // DEG_F
        temperature = (measurements.temperature - 32) / 9 * 5;
    }
    //Rounding to 1 decimal.
    if (temperature != null && temperature != "0") {
        temperature = Math.round(temperature * 10) / 10;
        jQuery('*[id$="indicatorDataValueTemperatureInputText"]').val(temperature);
    }

    //Blood pressure
    var bloodPressure = null;
    if (device.nibpdisplayunit == 'NIBP_MMHG') {
        bloodPressure = Math.round(measurements.systolic) + '/' + Math.round(measurements.diastolic);
    } else {
        // NIBP_KPA
        bloodPressure = Math.round(measurements.systolic * 7.5) + '/' + Math.round(measurements.diastolic * 7.5);
    }
    if (bloodPressure != "0/0" ) {
        jQuery('*[id$="indicatorDataValueBloodPressureInputText"]').val(bloodPressure);
    }

    //Heart rate
    var heartRate = null;
    if (measurements.pulse !=null && measurements.pulse != "0") {
      heartRate = Math.round(measurements.pulse);
    } else {
      heartRate = Math.round(measurements.hr);
    }
    if (heartRate != null && heartRate != "0") {
        jQuery('*[id$="indicatorDataValueHeartRateInputText"]').val(heartRate);
    }

    //o2Saturation
    var o2Saturation = Math.round(measurements.o2sat);
    if (o2Saturation != null && o2Saturation != "0" ) {
        jQuery('*[id$="indicatorDataValueOxygenSaturationInputText"]').val(o2Saturation);
    }

    //Height
    var heightMeters = null;
    var heightFeet = null;
    var heightInches = null;
    if (emrUnits == 1) {
        if (device.heightdisplayunit == 'UNITS_CENTIMETERS') {
            heightMeters = measurements.height / 100;
        } else if (device.heightdisplayunit == 'UNITS_INCHES')  {
            heightMeters = measurements.height * 0.0254;
        } else {
            //TODO UNITS_FEET_INCHES
        }
        //Rounding to 2 decimal.
        heightMeters = Math.round(heightMeters * 100) / 100;
        if (heightMeters != null && heightMeters != "0") {
            jQuery('*[id$="indicatorDataValueMetricHeightInputText"]').val(heightMeters);
            heightConversionRequired();
        }
    } else {
        if (device.heightdisplayunit == 'UNITS_INCHES') {
            heightFeet = Math.floor(measurements.height / 12);
            heightInches = measurements.height - heightFeet * 12;
        } else if (device.heightdisplayunit == 'UNITS_CENTIMETERS') {
            heightFeet = Math.floor((measurements.height / 2.54) / 12);
            heightInches = Math.floor(measurements.height / 2.54) - heightFeet * 12;
        } else {
            //TODO UNITS_FEET_INCHES
        }
        //Rounding to 1 decimal.
        heightInches = Math.round(heightInches * 10) / 10;
        if (heightInches !=null && heightInches != "0") {
            jQuery('*[id$="indicatorDataValueImperialHeightInchesInputText"]').val(heightInches);
            heightConversionRequired();
        }
        if (heightFeet !=null && heightFeet != "0") {
            jQuery('*[id$="indicatorDataValueImperialHeightFeetInputText"]').val(heightFeet);
            heightConversionRequired();
        }
    }

    //Weight
    var weight = null;
    if (emrUnits == 1) {
        if (device.weightdisplayunit == 'UNITS_KG') {
            weight = measurements.weight;
        } else {
            // UNITS_LBS
            weight = measurements.weight / 2.2;
        }
        //Rounding to 2 decimal.
        weight = Math.round(weight * 100) / 100;
        if (weight !=null && weight != "0") {
            jQuery('*[id$="indicatorDataValueMetricWeightInputText"]').val(weight);
            weightConversionRequired();
        }
    } else {
        if (device.weightdisplayunit == 'UNITS_LBS') {
            weight = measurements.weight;
        } else {
            // UNITS_KG
            weight = measurements.weight * 2.2;
        }
        //Rounding to 2 decimal.
        weight = Math.round(weight * 100) / 100;
        if (weight !=null && weight != "0") {
            jQuery('*[id$="indicatorDataValueImperialWeightInputText"]').val(weight);
            weightConversionRequired();
        }
    }


};


jQuery(document).bind('ajaxSuccess', function(event,request,settings) {

    if ( (jQuery('*[id$="addVitalSignObservationCommandButton\\:commandDialogWithoutIconButton"]').is(':visible')
        	|| jQuery('*[id$="addVitalSignObservationFromListCommandButton"]').is(':visible') )
        	&& ! jQuery('#welch-allynButton').is(':visible')) {

        //Get the divice informations.
        var deviceURL = "https://127.0.0.1:9234/WelchAllyn/Device/GetDevices";
        var deviceResponse = window.httpGet(deviceURL);
        //var deviceResponse = '[{"deviceid":"USB_0001","date":"2013-09-16T14:09:55","firmware":"1.71.03","heightdisplayunit":"UNITS_INCHES","location":"Ward2","modelname":"VSM 6000 Series","modelnumber":"6000","nibpdisplayunit":"NIBP_MMHG","serialnumber":"103000671611","tempdisplayunit":"DEG_F","weightdisplayunit":"UNITS_LBS"}]';
        device = null;

      	if (deviceResponse != null) {
            device = JSON.parse(deviceResponse)[0];
        }

        if (! (device == null) ) {
           var button = jQuery("<button "
                   + " id=\"welch-allynButton\""
                   + " class=\"ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only  dialogWithoutIcon\""
                   + " onclick=\"window.RetrieveVitalSigns();return false;\""
                   + " type=\"submit\" role=\"button\" aria-disabled=\"false\">"
                   + "<span class=\"ui-button-text ui-c\">Welch-Allyn</span></button>");

           button.prependTo('#vitalSignObservationDialog\\:Fragment .buttonBar');

        }

  }
});
