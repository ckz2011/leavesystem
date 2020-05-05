const axios = require('axios');

try {
    let response = axios.post(url, {});
    console.log(response);
} catch (e) {
    console.log(e);
}