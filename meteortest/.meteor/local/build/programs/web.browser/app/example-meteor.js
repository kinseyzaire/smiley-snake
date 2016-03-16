(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// example-meteor.js                                                   //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
if (Meteor.isClient) {                                                 // 1
  Template.game.helpers();                                             // 2
}                                                                      //
                                                                       //
// game is a global var from /client/games/breakout.js                 //
if (Meteor.isServer) {                                                 // 7
  Meteor.startup(function () {                                         // 8
    // code to run on server at startup                                //
  });                                                                  //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);
