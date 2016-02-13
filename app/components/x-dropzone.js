import Ember from 'ember';

function setFilesStatusChanged(compRef, myDropzone) {
  compRef.sendAction("filesStatusChanged", myDropzone.files);
}

export default Ember.Component.extend({
  classNames: ['dropzone'],

  insertDropzone: function () {
    var compRef = this;
    this.$().dropzone({
      url: this.get('url'),
      maxFiles: this.get('maxFiles'),
      uploadMultiple:this.get('uploadMultiple'),
      acceptedFiles: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      autoProcessQueue: this.get('autoProcessQueue'),
      addRemoveLinks: this.get('addRemoveLinks'),
      dictDefaultMessage: "<b>drop here.test</b><br><button type='button' id='SelectFL'>Choose File</button>",
      clickable: "#SelectFL",
      previewsContainer: "#preview",

      headers: {
        'Cache-Control': null,
        'X-Requested-With': null
      },

      init: function () {
        Dropzone.autoDiscover = false;
        var myDropzone = this;

        document.querySelector("button[id=" + compRef.submitBtn + "]").addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
          myDropzone.processQueue();
        });

        compRef.parentController.set("dropZoneRef", myDropzone);

        this.on("maxfilesexceeded", function (file) {
          this.removeAllFiles();
          this.addFile(file);
        });

        this.on("addedfile", function (file) {
          var acceptedExtensions = ["xlsx", "xls"];
          var selectedFileExt = file.name.split('.').pop();
          if (Ember.$.inArray(selectedFileExt, acceptedExtensions) === -1) {
            this.removeFile(file);
            alert("Please upload only Excel !");
          }
          setFilesStatusChanged(compRef, myDropzone);
        });

        this.on("removedfile", function () {
          setFilesStatusChanged(compRef, myDropzone);
        });

        this.on("totaluploadprogress", function () {
          setFilesStatusChanged(compRef, myDropzone);
        });

        this.on("success", function (file, response) {
          compRef.sendAction('vupdSuccess', file, response);
          setFilesStatusChanged(compRef, myDropzone);
        });
        this.on("error", function (file, response) {
          compRef.sendAction('vupdError', file, response);
          setFilesStatusChanged(compRef, myDropzone);
        });
      }
    });
  }.on('didInsertElement')
});
