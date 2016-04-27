$(document).ready(function() {
  window.dancers = [];

  //generate random hex color
  var randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

  var convertHex = function (hex, opacity) {
    hex = hex.replace('#', '');
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);

    result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')';
    return result;
  };
  // convert hex to rgba(r,g,b,a)
  var newMaskColor = convertHex(randomColor, 90);  
  // initializes dance floor color mask
  $('.dfmask').css( {'background': 'linear-gradient(' + newMaskColor + ', rgba(255,0,0,0))'} );
  // randomize color every 500ms
  setInterval(function () {
    var randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    var newMaskColor = convertHex(randomColor, 90);
    $('.dfmask').css( {'background': 'linear-gradient(' + newMaskColor + ', rgba(255,0,0,0))'} );      
  }, 500);

  // $('.danceFloor').css('cursor', 'url(https://theforgottenshepherdess.files.wordpress.com/2011/06/crosshairs.png), auto');
  $('.addDancerButton').on('click', function(event) {
    /* This function sets up the click handlers for the create-dancer
     * buttons on dancefloor.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
    var dancerMakerFunctionName = $(this).data('dancer-maker-function-name');

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random position

    var dancer = new dancerMakerFunction(
      $("body").height() * Math.random(),
      $("body").width() * Math.random(),
      Math.random() * 1000
    );

    window.dancers.push(dancer);
    
    $('.danceFloor').append(dancer.$node);
  });

  $('.lineUp').on('click', function(event){
    var xNum = 200;
    var yNum = 200;

    for(var i=0; i<window.dancers.length; i++){
      if(window.dancers[i].__proto__.hasOwnProperty('animateDiv')){
        window.dancers[i].stop();  
      }
      window.dancers[i].getInline(xNum, yNum);
      xNum = xNum + 10;
      yNum = yNum + 10;

      // $(window.dancers[i].$node).css({ 'animation': 'rot 5s linear infinite'});
    }
       
  }); 

  $('.getInCircle').on('click', function(event){
    var time = 0;
    for(var i=0; i<window.dancers.length; i++){
      if(window.dancers[i].__proto__.hasOwnProperty('animateDiv')){
        window.dancers[i].stop();  
      }
      
      (function() {
        var closure = window.dancers[i].$node;
        setTimeout(function() {
          $(closure).css({ 'animation': 'rot 5s linear infinite'});
        }, time);
      })();
      
      time = time + 500;      
    }       
  });

  $('.bigCircle').on('click', function(event){
    var xCenter = $('.danceFloor').width() / 2;
    var yCenter = $('.danceFloor').height() / 2; 
    var radius = 100;
    var numElem = window.dancers.length;
    var angle = 0;
    var angleInc = 360 / numElem;
    var xNum = xCenter + radius;
    var yNum = yCenter + radius;


    for(var i=0; i<window.dancers.length; i++){
      if(window.dancers[i].__proto__.hasOwnProperty('animateDiv')){
        window.dancers[i].stop();  
      }

      window.dancers[i].getInline(xNum, yNum);
      angle += angleInc;
      xNum = radius * Math.sin(angle * Math.PI / 180);
      yNum = radius * Math.cos(angle * Math.Pi / 180);

    }       
  });  
});

