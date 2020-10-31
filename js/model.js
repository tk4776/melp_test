"use strict";
import { DATA_MELP } from './data-melp.js';

const DATA_MELP_LENGTH = DATA_MELP.length;

// Getting most popular restaurants
const GET_MOST_WANTED_4 = arr => arr.filter(({ rating }) => rating == 4);
export const MOST_WANTED_4 = GET_MOST_WANTED_4(DATA_MELP);

const GET_MOST_WANTED_3 = arr => arr.filter(({ rating }) => rating == 3);
export const MOST_WANTED_3 = GET_MOST_WANTED_3(DATA_MELP);

const GET_MOST_WANTED_2 = arr => arr.filter(({ rating }) => rating == 2);
export const MOST_WANTED_2 = GET_MOST_WANTED_2(DATA_MELP);

const GET_MOST_WANTED_1 = arr => arr.filter(({ rating }) => rating == 1);
export const MOST_WANTED_1 = GET_MOST_WANTED_1(DATA_MELP);

const GET_MOST_WANTED_0 = arr => arr.filter(({ rating }) => rating == 0);
export const MOST_WANTED_0 = GET_MOST_WANTED_0(DATA_MELP);

document.querySelector('#order').addEventListener('click', evnt => {
    selection(evnt.target.id);
});

let selection = function(id){
    let output = '';
    if(id === 'az'){
        document.querySelector('#hereAZ').innerHTML = '<div class="row" id="hereAZ></div>';
        showResultsAZ(orderJSON_AZ, output);
        document.querySelector('#here09').innerHTML = '<div class="row" id="here09></div>';
    } else if(id === '09'){
        document.querySelector('#here09').innerHTML = '<div class="row" id="here09></div>';
        let options = document.createElement('div');
        options.className = "row";
        options.id = "stars";
        options.innerHTML += 
        `
            <button id="4" class="btn-full-s">4 Stars</button>
            <button id="3" class="btn-full-s">3 Stars</button>
            <button id="2" class="btn-full-s">2 Stars</button>
            <button id="1" class="btn-full-s">1 Star</button>
            <button id="0" class="btn-full-s">0 Stars</button>
        `;
        document.querySelector("#here09").appendChild(options);
        
        options.onclick = eventt => {
            const ID_STARS = eventt.target.id;
            
            if(ID_STARS === 0){
                showResultsRate(MOST_WANTED_0, output);
            } else if(ID_STARS == 1){
                showResultsRate(MOST_WANTED_1, output);
            } else if(ID_STARS == 2){
                showResultsRate(MOST_WANTED_2, output);
            } else if(ID_STARS == 3){
                showResultsRate(MOST_WANTED_3, output);
            } else if(ID_STARS == 4){
                showResultsRate(MOST_WANTED_4, output);
            }
        }
        document.querySelector('#hereAZ').innerHTML = '<div class="row" id="hereAZ></div>'
    }
}

let sortJSON = (data, key, order) => {
    return data.sort( (a,b) => {
        let x = a[key];
        let y = b[key];

        if(order === 'asc'){
            return((x<y) ? -1 : ((x>y) ? 1 : 0));
        } else if(order === 'desc') {
            return ((x>y) ? -1 : ((x<y) ? 1 : 0));
        }
    });
}

let orderJSON_AZ = sortJSON(DATA_MELP, 'name', 'asc');

let showResultsAZ = (filter, output) => {
    for(let i=0; i<DATA_MELP_LENGTH; i++){
        output = document.createElement('div');
        output.className = 'col span-1-of-3';
        output.innerHTML += 
        `
        <hr>
            <br>
            <h3>${filter[i].name}</h3>
            <blockquote>
                We're located in ${filter[i]['address']['city']}, 
                ${filter[i]['address']['street']}
                in ${filter[i]['address']['state']}.
                <cite>Contact Us! <br> Phone: ${filter[i]['contact']['phone']}
                <br>Email: ${(filter[i]['contact']['email'])}
                </cite>
            </blockquote>
            <div class="row">
                <div class="col span-1-of-2">
                    <a href="${filter[i]['contact']['site']}"><span class="ico"><i class="fas fa-link"></i></span></a>
                </div>
                <div class="col span-1-of-2">
                    <a href="https://www.facebook.com/TimeOutMex/posts/1435962823098307"><span class="ico"><i class="fab fa-facebook-square"></i></span></a>
                </div>
            </div>
        `;
    document.querySelector('#hereAZ').append(output);
    }
}

let showResultsRate = (filter, output) => {
    document.querySelector('#here09').innerHTML = '<div class="row" id="hereAZ></div>'
    for(let i=0; i<(filter.length); i++){
        output = document.createElement('div');
        output.className = 'col span-1-of-3';
        output.innerHTML += 
        `
        <hr>
            <br>
            <h3>${filter[i].name}</h3>
            <blockquote>
                We're located in ${filter[i]['address']['city']}, 
                ${filter[i]['address']['street']}
                in ${filter[i]['address']['state']}.
                <cite>Contact Us! <br> Phone: ${filter[i]['contact']['phone']}
                <br>Email: ${(filter[i]['contact']['email'])}
                <br></cite>
            </blockquote>
            <div class="row">
                <div class="col span-1-of-2">
                    <a href="${filter[i]['contact']['site']}"><span class="ico"><i class="fas fa-link"></i></span></a>
                </div>
                <div class="col span-1-of-2">
                    <a href="https://www.facebook.com/TimeOutMex/posts/1435962823098307"><span class="ico"><i class="fab fa-facebook-square"></i></span></a>
                </div>
            </div>
        `;
    document.querySelector('#here09').append(output);
    }
}

// Getting locations
const MAP_MOST_WANTED = arr => arr.map(({ address }) => address.location);
export const LOC_MOST_WANTED = MAP_MOST_WANTED(MOST_WANTED_4);

