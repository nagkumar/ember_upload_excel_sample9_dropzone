import Ember from 'ember';

export default Ember.Component.extend({
  files: "",

  didInit: function () {
    var cRef = this;
    Ember.Logger.info("try",cRef.get("dropzoneRef"));
    //Ember.set("files",  Ember.computed(function () {
    //  Ember.Logger.info(cRef);
    //  return cRef.files;
    //}));
  }.on('didInsertElement')
});
