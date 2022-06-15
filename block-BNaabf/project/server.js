let absolutePath = __dirname.split("node-js")[0] + "projects/client/index.js";
let relativePath = `/Users/vikas/Desktop/projects/client/index.js`;

// Write code inside `server.js` to
// - create a basic server
// - add listener on port 5678
// - display the form.html page on `/form` route using `GET` http method
// - once the form is submitted, capture the data on server side using `data/end` event on request object
// - make sure to add `method` and `action` attribute to `HTML form` in form.html
// - send captured data in response as html page 

// You have to basically handle 2 routes
// 1. to display the form data -> GET on `/form` route
// 2. to capture data from form and display it -> POST on `/form` route

let http = require("http");
let fs = require("fs");
let qs = require("querystring");


let server = http.createServer(handleRequest);

function handleRequest(req, res) {
    let store = "";
    req.on('data', (chunk) => {
        store += chunk;
    })

    req.on('end', () => {
        if (req.method === "GET" && req.url === "/form") {
            res.setHeader("content-type", "text/html");
            fs.createReadStream("./form.html").pipe(res);
        } else if (req.method === "POST" && req.url === "/form") {
            let parsedData = qs.parse(store);
            res.setHeader("content-type", "text/html");
            res.end(`<h1>${parsedData.username}</h1> <p>${parsedData.age}</p> <h2>${parsedData.Email}</h2>`)
        }
    });

    // my way of solving it:- 

    // if (req.method === "GET" && req.url === "/form") {
    //     fs.readFile("./form.html", (err, cnt) => {
    //         res.end(cnt);
    //     })
    // } else if (req.method === "POST" && req.url === "/form") {
    //     req.on('data', (chunk) => {
    //         store += chunk;
    //     })

    //     req.on('end', () => {
    //         let parsedData = qs.parse(store);
    //         res.setHeader("content-type", "text/html");
    //         console.log(parsedData);
    //         res.end(`<h1>${parsedData.username}</h1> <p>${parsedData.age}</p> <h2>${parsedData.Email}</h2>`)
    //     })
    // }
}





server.listen(5678, () => {
    console.log("port listening on 5678");
})