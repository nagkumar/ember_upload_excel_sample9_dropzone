import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['dropzone'],

  insertDropzone: function () {
    var compRef = this;
    var ram = this.$().dropzone({
      url: this.get('url'),
      maxFiles: 1,
      acceptedFiles: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      autoProcessQueue: this.get('autoProcessQueue'),
      autoDiscover: false,
      addRemoveLinks: this.get('addRemoveLinks'),
      previewContainer: false,
      headers: {
        //'Authorization': authorizationHeader,
        // remove Cache-Control and X-Requested-With, to be sent along with the request
        'Cache-Control': null,
        'X-Requested-With': null
      },

      success: (file, res) => {
        this.sendAction('vupd', file, res);
      },

      accept: function (file, done) {
        if (file.name === "ram.raj") {
          done("Naha, you don't.");
        }
        else {
          done();
        }
      },

      init: function () {
        var myDropzone = this;
        this.on("maxfilesexceeded", function (file) {
          this.removeAllFiles();
          this.addFile(file);
        });

        this.on("addedfile", function (file) {
          alert("Added file.");
        });
        this.on("success",
          function (file, res) {
            alert("Sucessfully uploaded file." + file.name);
          });

        document.querySelector("button[id=" + compRef.submitBtn + "]").addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
          myDropzone.processQueue();
        });

        this.on("sendingmultiple", function () {
          // Gets triggered when the form is actually being sent.
          // Hide the success button or the complete form.
        });
        this.on("successmultiple", function (files, response) {
          // Gets triggered when the files have successfully been sent.
          // Redirect user or notify of success.
        });
        this.on("errormultiple", function (files, response) {
          // Gets triggered when there was an error sending the files.
          // Maybe show form again, and notify user of error
        });
      }
    });
  }.on('didInsertElement')
});
