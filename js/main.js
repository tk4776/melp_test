"use strict";
import { MOST_WANTED_0, MOST_WANTED_1, MOST_WANTED_2, MOST_WANTED_3, MOST_WANTED_4 } from './model.js';
const API_MAPS_KEY = 'AIzaSyD9-iCX1OCyCG4Cyb5S_TD_Zq1UIV7J70g';
console.log("Hola Main");
/* Controller for Show Maps */
let scripMap = document.createElement('script');
scripMap.src = `https://maps.googleapis.com/maps/api/js?key=${API_MAPS_KEY}&callback=initMap`;
scripMap.defer = true;

window.initMap = () => {
    let map = new google.maps.Map(document.getElementById("map"), {
        center: { 
            lat: -34.397, 
            lng: 150.644 },
        zoom: 8,
    });
};

document.head.appendChild(scripMap);

