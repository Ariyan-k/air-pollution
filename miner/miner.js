//Do not update miner without thorough testing.

import fetch from 'node-fetch';
import fs from 'fs';

const now = new Date(Date.now());
const date = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

let weatherData = JSON.parse(fs.readFileSync('./weatherdata.json', 'utf-8'));
weatherData.data = [];

async function convertDataForLeaflet() {
    let heatpointsdata = JSON.parse(fs.readFileSync('./heatpointsdata.json', 'utf-8'));
    heatpointsdata.heatpoints = [];
    console.log("\n\n\nStarting conversion...\n\n\n");
    for (let i = 0; i < weatherData.data.length; i++) {
        const lat = weatherData.data[i].coord.lat;
        const lng = weatherData.data[i].coord.lon;
        const temp = weatherData.data[i].main.temp;
        let intensity;
        if (temp <= 273) intensity = 0.0;
        else if (temp > 273 && temp <= 283) intensity = 0.1;
        else if (temp > 283 && temp <= 293) intensity = 0.2;
        else if (temp > 293 && temp <= 303) intensity = 0.4;
        else if (temp > 303 && temp <= 313) intensity = 0.6;
        else if (temp > 313 && temp <= 323) intensity = 0.8;
        else if (temp > 323) intensity = 1.0;
        heatpointsdata.heatpoints.push([lat, lng, intensity]);
        console.log(`${i+1} entity converted. lat: ${lat} lng: ${lng} intensity: ${intensity}`);
    }

    heatpointsdata.date = date;
    heatpointsdata.time = time;

    fs.writeFileSync('./heatpointsdata.json', JSON.stringify(heatpointsdata, null, 2), 'utf-8');
}

async function callOpenweather() {

    const latlngandkeys = JSON.parse(fs.readFileSync('./latlngandkeys.json', 'utf-8'));

    weatherData.date = date;
    weatherData.time = time;

    for (let i = 0; i < latlngandkeys.keys.length; i++) {
        console.log(`Running key: ${i+1}`);
        const key = latlngandkeys.keys[i];
        let errCount = 0;
        let j;
        for (j = 0; j < latlngandkeys.latlng.length; j++) {
            const lat = latlngandkeys.latlng[j][0];
            const lng = latlngandkeys.latlng[j][1];
            try {
                const localData = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${key}`);
                if (localData.ok) {
                    const parsedLocalData = await localData.json();
                    weatherData.data.push(parsedLocalData);
                    console.log(`(${j+1}) entity added`);
                }
                else throw new Error(`HTTP error, status: ${localData.status} for lat:${lat}, lng:${lng}`);
            }
            catch(err) {
                errCount+=1;
                if(errCount <= 3) {
                    j-=1;
                    console.log("Entity couldn't be added, Retrying...");
                    continue;
                }
                else {
                    console.log("Either the key's request limit is exhausted or there is a server error.");
                    break;
                }
            }
            
        }
        if (j === latlngandkeys.latlng.length) {
            console.log("All entities added.");
            break;
        }
    }
    fs.writeFileSync('weatherdata.json', JSON.stringify(weatherData, null, 2), 'utf-8');
    convertDataForLeaflet();
}

callOpenweather();