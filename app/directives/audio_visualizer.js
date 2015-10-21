define([], function(){
  function audioVisualizer($timeout){
    // create the audio context (chrome only for now)
    // create the audio context (chrome only for now)
    if (! window.AudioContext) {
        if (! window.webkitAudioContext) {
            alert('no audiocontext found');
        }
        window.AudioContext = window.webkitAudioContext;
    }
    var audioContext = new AudioContext();
    var audioBuffer, sourceNode, analyser, javascriptNode, drawContext, tracks;
    
    var onEnded, isPlaying = false, dev = false;


    function initialize(elem){
      // get the context from the canvas to draw on
      drawContext = $(elem).get()[0].getContext("2d");
      // create a gradient for the fill. Note the strange
      // offset, since the gradient is calculated based on
      // the canvas, not the specific element we draw
      var gradient = drawContext.createLinearGradient(0,0,0,295);
      gradient.addColorStop(1,'#000000');
      gradient.addColorStop(0.75,'rgba(192,192,192,0.75)');
      gradient.addColorStop(0.25,'rgba(128,128,128,0.25)');
      gradient.addColorStop(0,'rgba(64,64,64,0.0)');

      // load the sound
      setupAudioNodes();

      // when the javascript node is called
      // we use information from the analyzer node
      // to draw the volume
      javascriptNode.onaudioprocess = function() {

          // get the average for the first channel
          var array =  new Uint8Array(analyser.frequencyBinCount);
          analyser.getByteFrequencyData(array);

          // clear the current state
          drawContext.clearRect(0, 0, 1000, 320);

          // set the fill style
          drawContext.fillStyle=gradient;
          drawSpectrum(array);

      }
      
      $(elem).on('audio:stop', function(){
        stopSound();
      }).on('audio:start', function(){
        playSound();
      });
    }
    
    function setupAudioNodes() {

        // setup a javascript node
        javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);
        // connect to destination, else it isn't called
        javascriptNode.connect(audioContext.destination);


        // setup a analyzer
        analyser = audioContext.createAnalyser();
        analyser.smoothingTimeConstant = 0.3;
        analyser.fftSize = 512;
    }

    // load the specified sound
    function loadSound(url, options) {
        if( options.onended ){
          onEnded = options.onended;
        }
          
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';

        // When loaded decode the data
        request.onload = function() {

            // decode the data
            audioContext.decodeAudioData(request.response, function(buffer) {
                // when the audio is decoded play the sound
                playSound(buffer);
            }, onError);
        }
        request.send();
    }

    function stopSound() {
        sourceNode.stop(0);
        isPlaying = false;
    }
    
    function playSound(buffer) {
        // create a buffer source node
        sourceNode = audioContext.createBufferSource();
        sourceNode.connect(analyser);
        analyser.connect(javascriptNode);

        sourceNode.connect(audioContext.destination);
        sourceNode.buffer = buffer;
        
        sourceNode.onended = onEnded;
        sourceNode.start(0);
        isPlaying = true;
    }

    // log if an error occurs
    function onError(e) {
        console.log(e);
    }

    function drawSpectrum(array) {
        for ( var i = 0; i < (array.length); i+= 5 ){
            var value = array[i];

            drawContext.fillRect(i*5+5,320-value,3*5,320);
            //console.log([i,value])
        }
    };
    return {
      restrict: "AE",
      require: "?ngModel",
      link: function($scope, elem, $attrs, ngModel){
        tracks = $scope[$attrs.audioVisualizer];
        
        if( ngModel ){
          
          ngModel.$render = function(){
            if( ngModel.$modelValue ){
              if(isPlaying) {
                stopSound();
              }
              loadSound('assets/soundtracks/' + ngModel.$modelValue + '/audio'+(dev?'_short':'')+'.ogg', {
                onended: function(){
                  $timeout(function(){
                    if( tracks.active != -1 ){
                      if( tracks.active < tracks.songs.length - 1 )
                        tracks.active += 1;
                      else
                        tracks.active = 0;
                    }
                    isPlaying = false;
                    $scope.$apply();
                  }, 200);
                }
              });
            }
          };
          
          initialize(elem);
        }
        
        $scope.$on('$destroy', function(){
          isPlaying = false;
          tracks.active = -1;
          tracks.autoNext = false;
          tracks.loop = true
        });
      }
    };
  }
  
  audioVisualizer.$inject = ['$timeout'];
  
  return audioVisualizer;
});