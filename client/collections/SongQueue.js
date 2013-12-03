// SongQueue.js - Defines a backbone model class for the song queue.
window.MyTunes = window.MyTunes || {};
window.MyTunes.Collections = window.MyTunes.Collections || {};

MyTunes.Collections.SongQueue = MyTunes.Collections.Songs.extend({

  initialize: function(){
    this.on('add', this.checkIfFirst, this);
    this.on('ended', this.playNext, this);
    this.on('dequeue', this.dq, this);
  },

  checkIfFirst: function(){
    if (this.length === 1){
      this.playFirst();
    }
  },

  playNext: function(){
    this.shift();
    if (this.length > 0) this.playFirst();
  },

  playFirst: function(){
    this.at(0).play();
  },

  dq: function(song){
    this.remove(song);
  }
});

MyTunes.Collections.SongQueue.prototype.add = function(song){
  MyTunes.Collections.Songs.prototype.add.call(this, song);
  if (this.length === 1 ){
    this.playFirst();
  }
};
