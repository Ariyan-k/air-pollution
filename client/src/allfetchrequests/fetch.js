const BASE_URL = 'http://localhost:3000';

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
        .catch(err => console.error(err));
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
        .catch(err => console.error(err));
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
        .catch(err => console.error(err));
}

export {
    fetchSignup,
    fetchLogin,
    fetchHomepage
}