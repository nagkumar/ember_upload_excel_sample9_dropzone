import Ember from 'ember';

function is100Percent(aFile) {
  return aFile.upload.progress === 100;
}

export default Ember.Controller.extend({
  submitBtn: "submit-up1",
  submitBtn2: "submit-up2",
  status_message: "",
  dropZoneRef: "",
  files: [],
  serverFiles: [{
    "name": "book1.xlsx",
    "upload": {"progress": 100, "total": 8990, "bytesSent": 8990},
    "status": "success",
    "previewElement": {},
    "previewTemplate": {},
    "_removeLink": {},
    "accepted": true,
    "processing": true,
    "xhr": {}
  },
    {
      "name": "book11.xlsx",
      "upload": {"progress": 100, "total": 8990, "bytesSent": 8990},
      "status": "success",
      "previewElement": {},
      "previewTemplate": {},
      "_removeLink": {},
      "accepted": true,
      "processing": true,
      "xhr": {}
    },
    {
      "name": "book12.xlsx",
      "upload": {"progress": 100, "total": 8990, "bytesSent": 8990},
      "status": "success",
      "previewElement": {},
      "previewTemplate": {},
      "_removeLink": {},
      "accepted": true,
      "processing": true,
      "xhr": {}
    }],

  actions: {
    deleteFile: function (aFile) {
      this.serverFiles.removeObject(aFile);
    },

    filesStatusChanged: function (aFiles) {
      console.log(JSON.stringify(aFiles));
      this.files.clear();
      for (var i = 0; i < aFiles.length; i++) {
        var obj = aFiles[i];
        this.files.addObject({
          name: obj.name,
          progressIndex: obj.upload.progress,
          isProgressHide: is100Percent.call(this, obj),
          size: obj.size
        });
      }
    }
  }
});
