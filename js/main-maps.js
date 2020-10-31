"use strict";
import { MOST_WANTED_4, MOST_WANTED_3, MOST_WANTED_2, MOST_WANTED_1, MOST_WANTED_0 } from './main-info.js';
import { LOC_MOST_WANTED_0, LOC_MOST_WANTED_1, LOC_MOST_WANTED_2, LOC_MOST_WANTED_3, LOC_MOST_WANTED_4 } from './main-info.js';

const API_MAPS_KEY = 'AIzaSyCa1yYaTu89zifBmqsEHF8_wpq-Kr4_gEg';

/* Controller for Show Maps */
let scripMap = document.createElement('script');
scripMap.src = `https://maps.googleapis.com/maps/api/js?key=${API_MAPS_KEY}&callback=initMap`;
scripMap.defer = true;

let map, infoWindow;

window.initMap = () => {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { 
            lat: 19.432946, 
            lng: -99.133270
        },
        zoom: 15,
    });
    // Current Location
    infoWindow = new google.maps.InfoWindow();
    const LOCATION_BUTTON = document.createElement("button");
    LOCATION_BUTTON.textContent = "Access to your current Location";
    LOCATION_BUTTON.classList.add("custom-map-control-button");
    
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(LOCATION_BUTTON);

    LOCATION_BUTTON.addEventListener("click", () => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const POS_C = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    infoWindow.setPosition(POS_C);
                    infoWindow.setContent("Location Found");
                    infoWindow.open(map);
                    map.setCenter(POS_C);
                },
                () => {
                    handleLocationError(true, infoWindow, map.getCenter());
                }
            );
        } else {
            handleLocationError(false, infoWindow, map.getCenter());
        }
    });

    // Place a draggable marker on the map
    let customPos = {
        lat: 19.432946, 
        lng: -99.133270
    };

    let customMarker = new google.maps.Marker({
        position: customPos,
        map: map,
        draggable: true,
        title: "Drag me!"
    });
};

let handleLocationError = (browserHasGeolocation, infoWindow, POS_C) => {
    infoWindow.setPosition(POS_C);
    infoWindow.setContent(
        browserHasGeolocation ? "Error: The Geolocation service failed." : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
}

document.querySelector('#mapselector').addEventListener('click', evnt2 => {
    let idMaps = (evnt2.target.id);

    if(idMaps === '5'){
        const LOCATIONS_5 = LOC_MOST_WANTED_4.concat(LOC_MOST_WANTED_3, LOC_MOST_WANTED_2, LOC_MOST_WANTED_1, LOC_MOST_WANTED_0);
        selectInMap(LOCATIONS_5);
    } else if(idMaps === '4'){
        const LOCATIONS_4 = LOC_MOST_WANTED_4;
        selectInMap(LOCATIONS_4);
    } else if(idMaps === '3'){
        const LOCATIONS_3 = LOC_MOST_WANTED_3;
        selectInMap(LOCATIONS_3);
    } else if(idMaps === '2'){
        const LOCATIONS_2 = LOC_MOST_WANTED_2;
        selectInMap(LOCATIONS_2);
    } else if(idMaps === '1'){
        const LOCATIONS_1 = LOC_MOST_WANTED_1;
        selectInMap(LOCATIONS_1);
    } else if(idMaps === '0'){
        const LOCATIONS_0 = LOC_MOST_WANTED_0;
        selectInMap(LOCATIONS_0);
    }
});

let selectInMap = (param) => {
    const LABELS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const MARKERS = param.map((location, i) => {
        return new google.maps.Marker({
            position: location,
            label: LABELS[i % LABELS.length],
        });
    });

    let markerCluster = new MarkerClusterer(map, MARKERS, {
        imagePath:
            "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
    });
}

document.head.appendChild(scripMap);