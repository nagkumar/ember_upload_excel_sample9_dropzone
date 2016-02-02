import Ember from 'ember';

export default Ember.Controller.extend({
  submitBtn: "submit-up1",
  submitBtn2: "submit-up2",
  status_message: "",
  dropZoneRef: "",
  files: [],

  actions: {
    filesStatusChanged: function (aFiles) {
      Ember.Logger.info('files', aFiles);
      this.files.clear();
      this.files.addObjects(aFiles);
    }
  }
});
