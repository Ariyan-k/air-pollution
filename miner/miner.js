//Do not update miner without thorough testing.

import fetch from 'node-fetch';
import fs from 'fs';
import {findAqi} from './findaqi.js';

const now = new Date(Date.now());
const date = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

let aqidata = JSON.parse(fs.readFileSync('./aqidata.json', 'utf-8'));
aqidata.data = [];

async function convertDataForLeaflet() {
    let heatpointsdata = JSON.parse(fs.readFileSync('./heatpointsdata.json', 'utf-8'));
    heatpointsdata.heatpoints = [];
    heatpointsdata.respectiveAqi = [];

    console.log("\n\n\nStarting conversion...\n\n\n");
    for (let i = 0; i < aqidata.data.length; i++) {
        const lat = aqidata.data[i].coord.lat;
        const lng = aqidata.data[i].coord.lon;
        const components = aqidata.data[i].list[0].components;
        const result = findAqi(components, 'epa'); //returns object : {aqi:_, dominantPollutant:_,subIndices:{...}}


        const aqi = result.aqi;
        let intensity;
        if (aqi <= 50) intensity = 0.1;
        else if (aqi <= 75) intensity = 0.2;
        else if (aqi <= 100) intensity = 0.3;
        else if (aqi <= 125) intensity = 0.4;
        else if (aqi <= 150) intensity = 0.5;
        else if (aqi <= 200) intensity = 0.6;
        else if (aqi <= 250) intensity = 0.7;
        else if (aqi <= 325) intensity = 0.8;
        else if (aqi <= 350) intensity = 0.9;
        else intensity = 1.0;

        heatpointsdata.heatpoints.push([lat, lng, intensity]);
        heatpointsdata.respectiveAqi.push(aqi);

        console.log(`${i+1} entity converted.`);
    }

    heatpointsdata.date = date;
    heatpointsdata.time = time;

    fs.writeFileSync('./heatpointsdata.json', JSON.stringify(heatpointsdata, null, 2), 'utf-8');
}

async function callOpenweather() {

    const latlngandkeys = JSON.parse(fs.readFileSync('./latlngandkeys.json', 'utf-8'));

    aqidata.date = date;
    aqidata.time = time;

    for (let i = 0; i < latlngandkeys.keys.length; i++) {
        console.log(`Running key: ${i+1}`);
        const key = latlngandkeys.keys[i];
        let errCount = 0;
        let j;
        for (j = 0; j < latlngandkeys.latlng.length; j++) {
            const lat = latlngandkeys.latlng[j][0];
            const lng = latlngandkeys.latlng[j][1];
            try {
                const localData = await fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lng}&appid=${key}`);
                if (localData.ok) {
                    const parsedLocalData = await localData.json();
                    aqidata.data.push(parsedLocalData);
                    console.log(`(${j+1}) entity added`);
                }
                else throw new Error(`network error`);
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
    fs.writeFileSync('aqidata.json', JSON.stringify(aqidata, null, 2), 'utf-8');
    convertDataForLeaflet();
}

callOpenweather();