module.exports = function (app) {
  var express = require('express');
  var uploadRouter = express.Router();

  var multer = require('multer');
  var fs = require('fs');
  var upload = multer({dest: __dirname + '/uploaded-files'});

  app.use(express.static(__dirname + '/..'));
  uploadRouter.post('/', upload.array('file'), function (request, response, next) {
    response.send({files: request.files, success: true});
  });

  app.use('/api/uploadFile', uploadRouter);
};
