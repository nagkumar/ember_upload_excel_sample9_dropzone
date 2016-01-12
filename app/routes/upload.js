import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    uponUploadSuccess: function (file, res) {
      Ember.Logger.info('uponUploadSuccess', file, res);
      this.controllerFor('upload').set('status_message', file.name);
    },

    uponUploadError: function (file, message) {
      Ember.Logger.info('uponUploadError', file);
      this.controllerFor('upload').set('status_message', message);
    }
  }
});
