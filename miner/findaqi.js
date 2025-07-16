export function findAqiCPCB(components) {
    const breakpoints = {
        "pm2_5": [
            {aqiLow:0, aqiHigh:50, concLow:0, concHigh:30},
            {aqiLow:51, aqiHigh:100, concLow:31, concHigh:60},
            {aqiLow:101, aqiHigh:200, concLow:61, concHigh:90},
            {aqiLow:201, aqiHigh:300, concLow:91, concHigh:120},
            {aqiLow:301, aqiHigh:400, concLow:121, concHigh:250},
            {aqiLow:401, aqiHigh:500, concLow:251, concHigh:350}
        ],
        "pm10": [
            {aqiLow:0, aqiHigh:50, concLow:0, concHigh:50},
            {aqiLow:51, aqiHigh:100, concLow:51, concHigh:100},
            {aqiLow:101, aqiHigh:200, concLow:101, concHigh:250},
            {aqiLow:201, aqiHigh:300, concLow:251, concHigh:350},
            {aqiLow:301, aqiHigh:400, concLow:351, concHigh:430},
            {aqiLow:401, aqiHigh:500, concLow:431, concHigh:500}
        ],
        "no2": [
            {aqiLow:0, aqiHigh:50, concLow:0, concHigh:40},
            {aqiLow:51, aqiHigh:100, concLow:41, concHigh:80},
            {aqiLow:101, aqiHigh:200, concLow:81, concHigh:180},
            {aqiLow:201, aqiHigh:300, concLow:181, concHigh:280},
            {aqiLow:301, aqiHigh:400, concLow:281, concHigh:400},
            {aqiLow:401, aqiHigh:500, concLow:401, concHigh:500}
        ],
        "so2": [
            {aqiLow:0, aqiHigh:50, concLow:0, concHigh:40},
            {aqiLow:51, aqiHigh:100, concLow:41, concHigh:80},
            {aqiLow:101, aqiHigh:200, concLow:81, concHigh:380},
            {aqiLow:201, aqiHigh:300, concLow:381, concHigh:800},
            {aqiLow:301, aqiHigh:400, concLow:801, concHigh:1600},
            {aqiLow:401, aqiHigh:500, concLow:1601, concHigh:2000}
        ],
        "co": [
            {aqiLow:0, aqiHigh:50, concLow:0, concHigh:1},
            {aqiLow:51, aqiHigh:100, concLow:1.1, concHigh:2},
            {aqiLow:101, aqiHigh:200, concLow:2.1, concHigh:10},
            {aqiLow:201, aqiHigh:300, concLow:10.1, concHigh:17},
            {aqiLow:301, aqiHigh:400, concLow:17.1, concHigh:34},
            {aqiLow:401, aqiHigh:500, concLow:34.1, concHigh:50}
        ],
        "o3": [
            {aqiLow:0, aqiHigh:50, concLow:0, concHigh:50},
            {aqiLow:51, aqiHigh:100, concLow:51, concHigh:100},
            {aqiLow:101, aqiHigh:200, concLow:101, concHigh:168},
            {aqiLow:201, aqiHigh:300, concLow:169, concHigh:208},
            {aqiLow:301, aqiHigh:400, concLow:209, concHigh:748},
            {aqiLow:401, aqiHigh:500, concLow:749, concHigh:1000}
        ],
        "nh3": [
            {aqiLow:0, aqiHigh:50, concLow:0, concHigh:200},
            {aqiLow:51, aqiHigh:100, concLow:201, concHigh:400},
            {aqiLow:101, aqiHigh:200, concLow:401, concHigh:800},
            {aqiLow:201, aqiHigh:300, concLow:801, concHigh:1200},
            {aqiLow:301, aqiHigh:400, concLow:1201, concHigh:1800},
            {aqiLow:401, aqiHigh:500, concLow:1801, concHigh:2000}
        ]
    };

    const subIndices = {};
    for (const pollutant in breakpoints) {
        const conc = components[pollutant];
        if (conc === undefined) continue;
        for (const bp of breakpoints[pollutant]) {
            if (conc >= bp.concLow && conc <= bp.concHigh) {
                let index = ((bp.aqiHigh - bp.aqiLow) / (bp.concHigh - bp.concLow)) * (conc - bp.concLow) + bp.aqiLow;
                subIndices[pollutant] = Math.round(index);
                break;
            }
        }
    }

    let maxAqi = 0;
    let dominantPollutant = null;
    for (const [pollutant, index] of Object.entries(subIndices)) {
        if (index > maxAqi) {
            maxAqi = index;
            dominantPollutant = pollutant;
        }
    }

    return { aqi: maxAqi, dominantPollutant, subIndices };
}

export function findAqiEPA(components) {
    const breakpoints = {
        "pm2_5": [
            {aqiLow:0, aqiHigh:50, concLow:0.0, concHigh:12.0},
            {aqiLow:51, aqiHigh:100, concLow:12.1, concHigh:35.4},
            {aqiLow:101, aqiHigh:150, concLow:35.5, concHigh:55.4},
            {aqiLow:151, aqiHigh:200, concLow:55.5, concHigh:150.4},
            {aqiLow:201, aqiHigh:300, concLow:150.5, concHigh:250.4},
            {aqiLow:301, aqiHigh:400, concLow:250.5, concHigh:350.4},
            {aqiLow:401, aqiHigh:500, concLow:350.5, concHigh:500.4}
        ],
        "pm10": [
            {aqiLow:0, aqiHigh:50, concLow:0, concHigh:54},
            {aqiLow:51, aqiHigh:100, concLow:55, concHigh:154},
            {aqiLow:101, aqiHigh:150, concLow:155, concHigh:254},
            {aqiLow:151, aqiHigh:200, concLow:255, concHigh:354},
            {aqiLow:201, aqiHigh:300, concLow:355, concHigh:424},
            {aqiLow:301, aqiHigh:400, concLow:425, concHigh:504},
            {aqiLow:401, aqiHigh:500, concLow:505, concHigh:604}
        ],
        "no2": [
            {aqiLow:0, aqiHigh:50, concLow:0, concHigh:53},
            {aqiLow:51, aqiHigh:100, concLow:54, concHigh:100},
            {aqiLow:101, aqiHigh:150, concLow:101, concHigh:360},
            {aqiLow:151, aqiHigh:200, concLow:361, concHigh:649},
            {aqiLow:201, aqiHigh:300, concLow:650, concHigh:1249},
            {aqiLow:301, aqiHigh:400, concLow:1250, concHigh:1649},
            {aqiLow:401, aqiHigh:500, concLow:1650, concHigh:2049}
        ],
        "so2": [
            {aqiLow:0, aqiHigh:50, concLow:0, concHigh:35},
            {aqiLow:51, aqiHigh:100, concLow:36, concHigh:75},
            {aqiLow:101, aqiHigh:150, concLow:76, concHigh:185},
            {aqiLow:151, aqiHigh:200, concLow:186, concHigh:304},
            {aqiLow:201, aqiHigh:300, concLow:305, concHigh:604},
            {aqiLow:301, aqiHigh:400, concLow:605, concHigh:804},
            {aqiLow:401, aqiHigh:500, concLow:805, concHigh:1004}
        ],
        "co": [
            {aqiLow:0, aqiHigh:50, concLow:0.0, concHigh:4.4},
            {aqiLow:51, aqiHigh:100, concLow:4.5, concHigh:9.4},
            {aqiLow:101, aqiHigh:150, concLow:9.5, concHigh:12.4},
            {aqiLow:151, aqiHigh:200, concLow:12.5, concHigh:15.4},
            {aqiLow:201, aqiHigh:300, concLow:15.5, concHigh:30.4},
            {aqiLow:301, aqiHigh:400, concLow:30.5, concHigh:40.4},
            {aqiLow:401, aqiHigh:500, concLow:40.5, concHigh:50.4}
        ],
        "o3": [
            {aqiLow:0, aqiHigh:50, concLow:0.0, concHigh:54},
            {aqiLow:51, aqiHigh:100, concLow:55, concHigh:70},
            {aqiLow:101, aqiHigh:150, concLow:71, concHigh:85},
            {aqiLow:151, aqiHigh:200, concLow:86, concHigh:105},
            {aqiLow:201, aqiHigh:300, concLow:106, concHigh:200},
            {aqiLow:301, aqiHigh:400, concLow:201, concHigh:300},
            {aqiLow:401, aqiHigh:500, concLow:301, concHigh:400}
        ]
    };

    const subIndices = {};
    for (const pollutant in breakpoints) {
        const conc = components[pollutant];
        if (conc === undefined) continue;
        for (const bp of breakpoints[pollutant]) {
            if (conc >= bp.concLow && conc <= bp.concHigh) {
                let index = ((bp.aqiHigh - bp.aqiLow) / (bp.concHigh - bp.concLow)) * (conc - bp.concLow) + bp.aqiLow;
                subIndices[pollutant] = Math.round(index);
                break;
            }
        }
    }

    let maxAqi = 0;
    let dominantPollutant = null;
    for (const [pollutant, index] of Object.entries(subIndices)) {
        if (index > maxAqi) {
            maxAqi = index;
            dominantPollutant = pollutant;
        }
    }

    return { aqi: maxAqi, dominantPollutant, subIndices };
}

export function findAqi(components, method='cpcb') {
    if (method === 'epa') {
        console.log("Calculating aqi according to US EPA method - ");
        return findAqiEPA(components);
    } else {
        console.log("Calculating aqi according to CPCB method - ");
        return findAqiCPCB(components);
    }
}
