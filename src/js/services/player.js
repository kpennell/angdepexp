
'use strict';

angular.module('app')
     .service('Player', ['$rootScope',
     function($rootScope) {

    var playingSound;
    $rootScope.trackPlayingIndex;  // trying to figure out index


    return {

      playing: false,

      play: function (track, index) {

        $rootScope.trackPlayingIndex = index;

        if (!track) {
          if (this.currentTrack && playingSound) {
            playingSound.play();
            this.playing = true;
            $rootScope.$broadcast('statusChanged', true);
          }

          return;
        }

        var player = this;

        SC.stream(track.properties.stream_url, function(sound){

          if (playingSound) {
           playingSound.stop();
         }

          sound.play({
            whileplaying: function () {
              player.duration = Math.floor(this.durationEstimate / 1000);
              player.position = Math.floor(this.position / 1000);
              player.progress = (this.position / this.durationEstimate) * 100;
              $rootScope.$broadcast('statusChanged', true);
            },
            onfinish: function () {
              $rootScope.$broadcast('finished');
            }
          });

          //console.log(player);

          playingSound = sound;
          player.currentTrack = track;
          player.playing = true;
          $rootScope.$broadcast('statusChanged', true);
        });
      },

      pause: function () {
        if (playingSound) {
          playingSound.pause();
          this.playing = false;
          $rootScope.trackPlayingIndex = {};

          $rootScope.$broadcast('statusChanged', true);
        }

      },

      setPosition: function (percent) {
        playingSound.setPosition(percent * playingSound.duration);
      },


};




     }
   ]);
