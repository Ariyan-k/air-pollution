const BASE_URL = import.meta.env.VITE_API_URL;

function fetchSignup(username, email, password) {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password
        })
    })
        .then(res => res.json())
        .then(data => data.msg)
        .catch(err => {
            console.log("Signup err : ",err);
            alert("Your device could not reach our backend, check your connection, disable VPN, or even try a different browser.");
        });
}

function fetchLogin(username, password) {
    return fetch(`${BASE_URL}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
        .then(res => res.json())
        .then(data => data.msg)
        .catch(err => {
            console.log("Login err : ",err);
            alert("Your device could not reach our backend, check your connection, disable VPN, or even try a different browser.");
        });
}

function fetchHomepage(token) {
    return fetch(`${BASE_URL}/Homepage`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(data => data.msg)
        .catch(err => console.log(err));
}

function fetchCoordinates(city) {
    const token = localStorage.getItem('Authorization').split(" ")[1];
    return fetch(`${BASE_URL}/geocode?city=${city}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.log(err));
}

function fetchHeatdata() {
    const token = localStorage.getItem('Authorization').split(" ")[1];
    return fetch(`${BASE_URL}/heatdata`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(heatdata => heatdata)
        .catch(err => console.log(err));
}

function fetchWeather({lat, lng}) {
    const token = localStorage.getItem('Authorization').split(" ")[1];
    return fetch(`${BASE_URL}/localWeather?lat=${lat}&lng=${lng}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.msg) alert(data.msg);
            else return data;
        })
        .catch(err => console.log(err));
}

// {
//   latitude: 28.625,
//   longitude: 77.25,
//   generationtime_ms: 0.10251998901367188,
//   utc_offset_seconds: 19800,
//   timezone: 'Asia/Kolkata',
//   timezone_abbreviation: 'GMT+5:30',
//   elevation: 214,
//   current_units: {
//     time: 'iso8601',
//     interval: 'seconds',
//     temperature_2m: '°C',
//     relative_humidity_2m: '%',
//     apparent_temperature: '°C',
//     is_day: '',
//     precipitation: 'mm',
//     cloud_cover: '%',
//     wind_speed_10m: 'km/h',
//     wind_direction_10m: '°',
//     wind_gusts_10m: 'km/h'
//   },
//   current: {
//     time: '2025-07-16T14:45',
//     interval: 900,
//     temperature_2m: 30,
//     relative_humidity_2m: 77,
//     apparent_temperature: 36.3,
//     is_day: 1,
//     precipitation: 0,
//     cloud_cover: 100,
//     wind_speed_10m: 5.6,
//     wind_direction_10m: 153,
//     wind_gusts_10m: 21.6
//   }
// }

export {
    fetchSignup,
    fetchLogin,
    fetchHomepage,
    fetchCoordinates,
    fetchHeatdata,
    fetchWeather
}
