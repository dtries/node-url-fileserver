/* INSTRUCTIONS TO RUN DEMO: 
    type "node demo-fileserver" without the quotation marks on your CLI in your terminal. Hit enter to start the local server on your computer. In the browser web address bar type "localhost:8080/summer.html" and hit enter. The summer.html file is retrieved and displayed in the browser window. Try the same for winter.html and you should be successful. Now try "localhost:8080/fall.html" and you will receive a 404 error as that file does not exist on the backend.
*/

const http = require('http'); /* Creates constant that uses node built-in http module */
const url = require('url'); /* Creates constant that uses node built-in url module */
const fs = require('fs'); /* Creates constant that uses nose built-in file system module */

http.createServer(function (req, res) { /* use http creatServer method to make a server */
    var q = url.parse(req.url, true); /* produces JSON object containing seperated out url key-value pairs for the incoming browser request. Value of each pair will be set to null if no information exists for a given key. Use console.log(JSON.stringify(q) to see the object key-value pairs in the terminal, if desired. */

    var filename = (`.${q.pathname}`); /* places . infront of pathname to produce route to the desired file (i.e., ./summer.html or ./winter.html). Could also of set filenaame equal to "." + q.pathname. The two ways are producing the route are the samething, just written differently. I prefer the method used as you don't have to bother with a lot of quotation marks and plus signs */

    fs.readFile(filename, function(err, retrievedFile) { /* use file system readFile method to attempt to retrieve the file at filename and then run function that indicates error 404 (i.e., file not found) if file does not exist, or provide the information as retrievedFile (this can be pretty much any term you would like, it does not have to be called retrievedFile, many people just use data)  */
        if (err) { /* if error is true then respond with 404 error and end fs.readFile for this specific request */
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end('404, Requested Resouce Not Found');
        }
        res.writeHead(202, {'Content-Type': 'text/html'}); /* okay to respond as file was found  */
        res.write(retrievedFile); /* send contents of file to browser, will read and render html properly as content type was set to text/html */
        res.end();
    });
}).listen(8080); /* pay attention to browser requests coming in on port 8080*/