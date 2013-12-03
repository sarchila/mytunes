// AppModel.js - Defines a backbone model class for the whole app.
window.MyTunes = window.MyTunes || {};
window.MyTunes.Models = window.MyTunes.Models || {};

MyTunes.Models.AppModel = Backbone.Model.extend({

  initialize: function(params){
    this.set('currentSong', new MyTunes.Models.SongModel());
    this.set('songQueue', new MyTunes.Collections.SongQueue());

    /* Note that 'this' is passed as the third argument. That third argument is
    the context. The 'play' handler will always be bound to that context we pass in.
    In this example, we're binding it to the App. This is helpful because otherwise
    the 'this' we use that's actually in the funciton (this.set('currentSong', song)) would
    end up refering to the window. That's just what happens with all JS events. The handlers end up
    getting called from the window (unless we override it, as we do here). */
    params.library.on('play', function(song){
      this.set('currentSong', song);
      //Check the songQueue for songs
      //if this.get('currentSong') is equal to this.get('songQueue').models[0]
      //  sq.shift();
    }, this);

    params.library.on('enqueue', function(song){
      this.get('songQueue').add(song);
      if(this.get('songQueue').length === 1){
        this.get('songQueue').playFirst();
      }
    }, this);

    params.library.on('ended', function(){
      console.log('song ended');
      var sq = this.get('songQueue');
      if(sq.length > 0){
        var cache = sq.models[0];
        this.set('currentSong', cache);
        sq.shift();
      }
    }, this);

    params.library.on('enqueue', function(song){
      this.get('songQueue').add(song);
    }, this);
  }

});
