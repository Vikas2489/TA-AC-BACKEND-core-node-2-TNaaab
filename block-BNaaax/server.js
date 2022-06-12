 console.log(__dirname);
 console.log(__filename);

 var path = require("path");

 let relativePath = path.join(__dirname, './server.js');

 console.log(relativePath);