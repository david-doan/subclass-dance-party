// Creates and returns a new dancer object that can step
var makeDancer = function(top, left, timeBetweenSteps) {
  
  this.top = top;
  this.left = left;
  this.timeBetweenSteps = timeBetweenSteps;
  this.isDancing = true;


  this.step(timeBetweenSteps);
  this.$node = $('<div class="dancer"></div>');
  // now that we have defined the dancer object, we can start setting up important parts of it by calling the methods we wrote
  // this one sets the position to some random default point within the body
  this.setPosition(top, left);

};

// use jQuery to create an HTML <span> tag
// makeDancer.prototype.$node = $('<span class="dancer"></span>');

makeDancer.prototype.$node = $('<div class="dancer"></div>');

makeDancer.prototype.step = function(timeBetweenSteps) {
  // the basic dancer doesn't do anything interesting at all on each step,
  // it just schedules the next step
  var closure = this;
  setTimeout(function() { 
    if (closure.isDancing) {
      closure.step();   
    } else {
      $(closure.$node).stop(true, true);
    }
  }, this.timeBetweenSteps);  
};      

makeDancer.prototype.setPosition = function(top, left) {
  // Use css top and left properties to position our <span> tag
  // where it belongs on the page. See http://api.jquery.com/css/
  //
  var styleSettings = {
    top: top,
    left: left
  };
  this.$node.css(styleSettings);
};

makeDancer.prototype.stop = function() {
  this.isDancing = false;
};

makeDancer.prototype.dance = function() {
  this.isDancing = true;
};