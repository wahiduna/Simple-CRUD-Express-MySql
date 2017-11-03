// include main HTTP module
var http = require('http');

// include formdable library for upload processing
var formidable = require('formidable');

// include file system module
var fs = require('fs');
var fse = require('fs-extra');


// Create server for listening incoming connections
http.createServer(function (req, res) {
  // File upload check with request url
  if (req.url == '/fileupload') {

    // Create form object with formidable
    var form = new formidable.IncomingForm();

    // parse the form
    form.parse(req, function (err, fields, files) {

      // get old path
      var oldpath = files.filetoupload.path;

      // set new path
      var newpath = '/home/wahiduna/Scripts/node/mysql/' + files.filetoupload.name;

      // // move file from oldpath to newpath
      // fs.rename(oldpath, newpath, function(err){
      //
      //   // if error then throw it
      //   if (err) throw err;
      //   // res.writeHead(200, {'content-type': 'text/plain'});
      //   // res.write('received upload:\n\n');
      //   // res.end(util.inspect({fields: fields, files: files}));
      //
      //   // Successfull confirmation
      //   res.write('File uploaded and move it');
      //   res.end();
      // });
      fse.copy(oldpath, newpath)
        .then(() => console.log('success!'))
        .catch(err => console.error(err))
    });
  } else {
    // Set header to text/html
    res.writeHead(200, {'Content-Type': 'text/html'});

    // Write response with file upload form
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload" multiple="multiple"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(8080);
