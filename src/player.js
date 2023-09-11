
    var options = {
      controls: true,
      autoplay: true,
      preload: 'auto',
      width:640,
      height:360
    };
    var player = videojs('my-video',options);
    
    player.src({type: 'video/mp4', src: 'https://download.samplelib.com/mp4/sample-30s.mp4'});
    player.onPlayerReady = function onPlayerReady() {
      videojs.log('Your player is ready!');

      // In this context, `this` is the player that was created by Video.js.
      player.play();

      // How about an event listener?
      player.on('ended', function() {
        videojs.log('Awww...over so soon?!');
      });
    };
