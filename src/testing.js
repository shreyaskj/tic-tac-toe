const axios = require("axios");



axios.get('https://jsonplaceholder.typicode.com/posts')

    .then(function (response) {

        // handle success

        console.log('response - ',response);

    })

    .catch(function (error) {

        // handle error

        console.log(error);

    })

    .then(function () {

        // always executed

    });