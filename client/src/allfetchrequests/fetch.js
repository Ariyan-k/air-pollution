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

function fetchHeatpointsandaqis() {
    const token = localStorage.getItem('Authorization').split(" ")[1];
    return fetch(`${BASE_URL}/heatpointsandaqis`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(heatpointsandaqis => heatpointsandaqis)
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

export {
    fetchSignup,
    fetchLogin,
    fetchHomepage,
    fetchCoordinates,
    fetchHeatpointsandaqis,
    fetchWeather
}
