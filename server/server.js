const http  = require("http");
const fs = require('fs');



http.createServer((req, res) => {
    console.log(req.url, req.method);
    res.setHeader("content-type", "text/html");
    

let path = './new/'
    switch (req.url) {
        case '/':
            path +='text.html'
            break;
    
        case '/te':
            path +='te.html'
            break;

            //redirecting
        case '/te-te':
            res.statusCode=301
            res.setHeader('Location', '/te');
            res.end();
            break;

        default:
            path += 'text.txt'
            break;
    };

    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        } else {

            res.end(data);
        }
    });

}).listen(2000, ()=>{
    console.log('server is live on port 2000');
})
