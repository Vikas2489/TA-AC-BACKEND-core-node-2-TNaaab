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

    let store = "";
    req.on("data", (chunk) => {
        store += chunk;
    })

    req.on("end", () => {
        if (req.method === "POST" && req.url === "/json") {
            res.setHeader("content-type", "application/json")
            res.end(store);
        } else if (req.method === "POST" && req.url === "/form") {
            let parsedData = qs.parse(store);
            res.setHeader("content-type", "application/json");
            res.end(JSON.stringify(parsedData));
        }
    })
}

server.listen(7000, () => {
    console.log("Port listening on 7000");
})

// if (dataFormat === "application/json") {
//   var parsedData = JSON.parse(store);
//   res.end(store);
// } else if (dataFormat === 'multipart/form-data; boundary=----WebKitFormBoundarysLv84pRA4wyKtgu9') {
//   var parsedData = qs.parse(store);
//   res.end(store);
// }