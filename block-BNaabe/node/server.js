// Write code to 
// - capture absolute path of `server.js`(itself)
// - get absolute path of `app.js`
// - get realtive path of `index.html`
// - get absolute path of `index.html` using `path module` 

let path = require("path");
let pathOfServer = __filename;
let pathOfApp = __dirname + '/app.js';
let pathOfIndex = "./index.html";

let relativePath = path.join(__dirname + '/index.html');

console.log(pathOfServer, pathOfApp, pathOfIndex, relativePath);

// Q. Create a server using http
// - handle post method on '/' route
// - send json data on it from postman

// ``
// `js
// // data format is
// {
//   team: 'kxip',
//   players: 18,
//   captain: 'KL Rahul'
// }
// // `
// ``
// - capture data from request on server side using data and end event on request object
// - when end event fires, send entire captured data in response with status code 201.

let http = require("http");
let server = http.createServer(handleRequest);

function handleRequest(req, res) {
    let store = "";
    req.on('data', (chunk) => {
        store += chunk;
    })

    req.on('end', () => {
        if (req.method === "POST" && req.url === "/") {
            res.statusCode = 201;
            res.end(store);
        }
    })

};

server.listen(1234);


// Q. Follow above steps with form data from postman instead of json data.
// - once data has been captured, send only captain's name in response.

let serverForForm = http.createServer(handleRequestForm);
let qs = require("querystring");

function handleRequestForm(req, res) {
    let store = "";
    req.on('data', (chunk) => {
        store += chunk;
    })

    req.on('end', () => {
        if (req.method === "POST" && req.url === "/") {
            res.statusCode = 201;
            let parsedQuery = qs.parse(store);
            res.end(parsedQuery.captain);
        }

    })

};

serverForForm.listen(4321);

// Q. Create server which can handle both json/form data without specifying which format of data is 
// being received.
// - add listener on port 9000
// - use `data/end` event to capture json/form data
// - use `req.headers['Content-Type']` to check data format
// - parse respective data format i.e. json/form 
// - send entire data in response
// - data sent from postman should have fields:
//   - city
//   - state
//   - country
//   - pin

let server9000 = http.createServer(handleRequest9000);

function handleRequest9000(req, res) {
    let dataFormat = req.headers['content-type'];
    let store = '';
    req.on('data', (chunk) => {
        store += chunk;
    })

    req.on('end', () => {
        if (dataFormat === "application/json") {
            let parsedData = JSON.parse(store);
            console.log(parsedData);
            res.end(store);
        } else if (dataFormat === "application/x-www-form-urlencoded") {
            let parsedData = qs.parse(store);
            res.end(JSON.stringify(parsedData));
        } 
    })

};

server9000.listen(9000);


// Q. create server, send json data in request from postman, parse in
//  on the server and send html response with entire parsed data information.
// - format of json data is {name: your name, email: "", }
// - Html response format is <h1>Name</h1><h2>email</h2>



let server9999 = http.createServer(handleRequest9999);

function handleRequest9999(req, res) {
    let store = "";
    req.on('data', (chunk) => {
        store += chunk;
    })

    req.on('end', () => {
        var jsonData = JSON.parse(store);
        res.setHeader("content-type", "text/html");
        res.end(`<h2>${jsonData.name}</h2><p>${jsonData.email}</hp>`)
    })

};

server9999.listen(9999);

// Q. Follow above question with form data containing fields i.e name and email. 
// - Parse form-data using `querystring` module
// - respond with HTML page containing only email from data in H2 tag.



let server9090 = http.createServer(handleRequest9090);

function handleRequest9090(req, res) {
    let store = "";
    req.on('data', (chunk) => {
        store += chunk;
    })

    req.on('end', () => {
        var jsonData = qs.parse(store);
        console.log(jsonData);
        res.setHeader("content-type", "text/html");
        res.end(`<h2>${jsonData.name}</h2><p>${jsonData.email}</hp>`)
    })

};

server9090.listen(9090);
