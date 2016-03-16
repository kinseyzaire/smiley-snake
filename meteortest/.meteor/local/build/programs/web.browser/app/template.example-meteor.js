(function(){
Template.body.addContent((function() {
  var view = this;
  return Spacebars.include(view.lookupTemplate("game"));
}));
Meteor.startup(Template.body.renderToDocument);

Template.__checkName("game");
Template["game"] = new Template("Template.game", (function() {
  var view = this;
  return Blaze.View("lookup:game", function() {
    return Spacebars.mustache(view.lookup("game"));
  });
}));

}).call(this);
