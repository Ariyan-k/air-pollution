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
        .then(data => data.msg || data.message || "Unknown error occurred")
        .catch(err => {
            console.error(err);
            return "Network error";
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
        .then(data => data.msg || data.message || "Unknown error occurred")
        .catch(err => {
            console.error(err);
            return "Network error";
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
        .then(data => data.msg || data.message || "Unknown error occurred")
        .catch(err => {
            console.error(err);
            return "Network error";
        });
}

export {
    fetchSignup,
    fetchLogin,
    fetchHomepage
}