jQuery(() => {

    const checkIfUSA = () => {
        if ($("#country-input").val() !== "USA") {
            $("#state-input").prop("disabled", true);
            !currentLocation.state;
        } else {
            $("#state-input").prop("disabled", false);
        };
    };

    $("#state-input").on("change", () => {
        currentLocation.state = $("#state-input option:selected").val();
    });

    $("#country-input").on("change", () => {
        currentLocation.country = $("#country-input option:selected").val();
        checkIfUSA();
    });

    $("#search-button").on("click", (event) => {
        event.preventDefault();
        currentLocation.city = $("#city-input").val();
        if (history.some(obj => obj.country === currentLocation.country)
        && history.some(obj => obj.state === currentLocation.state)
        && history.some(obj => obj.city === currentLocation.city)) {
            console.log("in history");
        } else {
            displayLocation();
            saveLocation();            
            getGeoData(currentLocation);
        };       
        fieldReset();
    });

    $("#saved-locations").on("change", () => {
        currentLocation.country = $("#saved-locations option:selected").attr("country");
        currentLocation.state = $("#saved-locations option:selected").attr("state");
        currentLocation.city = $("#saved-locations option:selected").attr("city");
    });

    $("#load-button").on("click", (event) => {
        event.preventDefault();
        displayLocation();
        getGeoData(currentLocation);
        fieldReset();
    });

    const fieldReset = () => {
        $("#city-input").val("");
        $("#state-input").val("none");
        $("#country-input").val("none");
        $("#saved-locations").val("none"); 
    };

    checkIfUSA();
    loadLocations();

});