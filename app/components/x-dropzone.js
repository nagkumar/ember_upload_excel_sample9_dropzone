import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['dropzone'],

  insertDropzone: function () {
    var compRef = this;
    this.$().dropzone({
      url: this.get('url'),
      maxFiles: 1,
      acceptedFiles: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      autoProcessQueue: this.get('autoProcessQueue'),
      addRemoveLinks: this.get('addRemoveLinks'),
      dictDefaultMessage: "<b>drop here.test</b><br><button type='button' id='SelectFL'>Choose File</button>",
      clickable: "#SelectFL",
      previewContainer: false,

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
        });
        this.on("success", function (file, response) {
          compRef.sendAction('vupdSuccess', file, response);
        });
        this.on("error", function (file, response) {
          compRef.sendAction('vupdError', file, response);
        });
      }
    });
  }.on('didInsertElement')
});
