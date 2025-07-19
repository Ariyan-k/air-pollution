//Do not update miner without thorough testing.

import fetch from 'node-fetch';
import {findAqiByMethod} from './findaqiByMethod.js';
import { Heatpoint } from '../db.js';
import fs from 'fs'

let deploylogs = "";

let detailedAqis = {
    data: []
};
let heatpoints = [];
let aqis = [];


async function convertDataForLeaflet(date, time, unixtime) {
    
    deploylogs += "\nStarting conversion...\n";
    const method = 'epa';
    deploylogs += `Calculating aqi according to ${method} method\n`;
    for (let i = 0; i < detailedAqis.data.length; i++) {
        const lat = detailedAqis.data[i].coord.lat;
        const lng = detailedAqis.data[i].coord.lon;
        const components = detailedAqis.data[i].list[0].components;
        const result = findAqiByMethod(components, method); //returns object : {aqi:_, dominantPollutant:_,subIndices:{...}}


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

        heatpoints.push([lat, lng, intensity]);
        aqis.push(aqi);

        deploylogs += `${i+1} entity converted.\n`;
    }
    await Heatpoint.updateOne(
        { name: process.env.HEATPOINTS_COLLECTION_FIELD },
        { $set: {
            heatpoints: heatpoints,
            aqis: aqis,
            date: date,
            time: time,
            unixtime: unixtime
        }}
    );
    deploylogs += `\n\n-----------------------------------\n\n`;
    
    fs.writeFileSync('./miner/logs.txt', deploylogs, 'utf-8');

    const detailedlogs = {
        heatpoints: heatpoints,
        aqis: aqis,
        detailedAqis: detailedAqis
    }

    fs.writeFileSync('./miner/detailedlogs.txt', JSON.stringify(detailedlogs, null, 2), 'utf-8');
}

async function callOpenweather(date, time, unixtime) {

    deploylogs += `\n\nTime: ${time}\nDate: ${date}\n\n`;

    const KEY_1 = process.env.KEY_1;
    const KEY_2 = process.env.KEY_2;
    const KEY_3 = process.env.KEY_3;
    const KEY_4 = process.env.KEY_4;

    const keys = [KEY_1, KEY_2, KEY_3, KEY_4];
    const allCityCoords = await JSON.parse(fs.readFileSync('./miner/cityCoords.json', 'utf-8'));
    
    for (let i = 0; i < keys.length; i++) {
        deploylogs += `Using key : KEY_${i+1}\n`;
        let key = keys[i];
        let errCount = 0;
        let j;
        for (j = 0; j < allCityCoords.latlng.length; j++) {
            const lng = allCityCoords.latlng[j][1];
            const lat = allCityCoords.latlng[j][0];
            try {
                const localData = await fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lng}&appid=${key}`);
                if (localData.ok) {
                    const parsedLocalData = await localData.json();
                    detailedAqis.data.push(parsedLocalData);
                    deploylogs+=`(${j+1}) entity added\n`;
                }
                else throw new Error(`network error`);
            }
            catch(err) {
                deploylogs+=JSON.stringify({
                    name: err.name,
                    message: err.message,
                    stack: err.stack
                }) + '\n';
                errCount+=1;
                if(errCount <= 3) {
                    j-=1;
                    deploylogs += "Entity couldn't be added, Retrying...\n";
                    continue;
                }
                else {
                    deploylogs += "Either the key's request limit is exhausted or there is a server error.\n";
                    break;
                }
            }
            
        }
        if (j === allCityCoords.latlng.length) {
            deploylogs+="All entities added.\n";
            break;
        }

    }
    convertDataForLeaflet(date, time, unixtime);
}

export default callOpenweather;