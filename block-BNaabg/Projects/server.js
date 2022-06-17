let http = require("http");
let fs = require("fs");
// let qs = require("querystring");
const userDir = __dirname + "/users/";

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
    var store = "";
    req.on('data', (chunk) => {
        store += chunk;
    })

    req.on('end', () => {
        if (req.method === "POST" && req.url === "/users") {
            // grab the username from store data
            var username = JSON.parse(store).username;
            console.log(username);
            // check whether this username exists in users directory or not

            // We have to create a file using username + append .json to create a proper file

            // wx flag ensures that given username.json should not already exist in users directory, therwise throws an error

            fs.open(userDir + username + ".json", "wx", (err, fd) => {
                // fd is pointing to newly created file inside users directory
                // once file is created, we can write content to file
                // since store has all the data of the user
                fs.writeFile(fd, store, (err) => {
                    // err indicated file was not written
                    // if no error, file was written successfully
                    // close the file
                    fs.close(fd, (err) => {
                        // if no err, send response to client
                        res.end(`${username} successfully created`);
                    });
                });
            });
        }
    })
}

server.listen(2345);