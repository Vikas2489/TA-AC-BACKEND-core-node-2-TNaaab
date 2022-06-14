// - add a listener on port 7000
// - send different types of data from postman and check 
// `req.headers` for `content-type` after creating below server
// - send json data from postman using `POST` request on
//  `/json` and parse it into the server.
// - send form data from postman using `POST` request on `/form` and parse
//  it into the server.
// - send in response the entire data received by server.


let http = require("http");
let qs = require("querystring");

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
    let dataFormat = req.headers['content-type'];
    console.log(dataFormat);
    let store = "";
    req.on("data", (chunk) => {
        store += chunk;
    })

    req.on("end", () => {
        if (dataFormat === "application/json") {
            var parsedData = JSON.parse(store);
            res.end(store);
        } else if (dataFormat === 'text/plain') {
            // var parsedData = qs.parse(store);
            res.end(store);
        }
    })
}

server.listen(7000, () => {
    console.log("Port listening on 7000");
})