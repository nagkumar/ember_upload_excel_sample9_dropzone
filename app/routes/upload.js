import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    uponUpload: function (file, res) {
      Ember.Logger.info('uponUpload', file, res);
      this.controllerFor('upload').set('status_message', file.name);
    }
  }
});
