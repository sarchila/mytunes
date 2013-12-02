// SongQueue.js - Defines a backbone model class for the song queue.
window.MyTunes = window.MyTunes || {};
window.MyTunes.Collections = window.MyTunes.Collections || {};

MyTunes.Collections.SongQueue = MyTunes.Collections.Songs.extend({

  initialize: function(){
  },
  playFirst: function(){
    _.first(this.models).play();
  }
});

MyTunes.Collections.SongQueue.prototype.add = function(song){
  MyTunes.Collections.Songs.prototype.add.call(this, song);
  if (this.length === 1 ){
    this.playFirst();
  }
};