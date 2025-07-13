export default function findAqi(components) {
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

        const bps = breakpoints[pollutant];
        let index = 0;
        for (const bp of bps) {
            if (conc >= bp.concLow && conc <= bp.concHigh) {
                index = ((bp.aqiHigh - bp.aqiLow)/(bp.concHigh - bp.concLow))*(conc - bp.concLow) + bp.aqiLow;
                index = Math.round(index);
                break;
            }
        }
        subIndices[pollutant] = index;
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