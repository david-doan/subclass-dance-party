var makeColorfulDancer = function(top, left, timeBetweenSteps) {
  makeBlinkyDancer.call(this, top, left, timeBetweenSteps);
  
  // we plan to overwrite the step function below, but we still want the superclass step behavior to work,
  // so we must keep a copy of the old version of this function

  // var oldStep = blinkyDancer.step;

  // blinkyDancer.step = function() {
  //   // call the old version of step at the beginning of any call to this new version of step
  //   oldStep();
  //   // toggle() is a jQuery method to show/hide the <span> tag.
  //   // See http://api.jquery.com/category/effects/ for this and
  //   // other effects you can use on a jQuery-wrapped html tag.
  //   blinkyDancer.$node.toggle();
  // };

};

makeColorfulDancer.prototype = Object.create(makeBlinkyDancer.prototype);
makeColorfulDancer.prototype.constructor = makeColorfulDancer;

makeColorfulDancer.prototype.step = function() {
  makeDancer.prototype.step.call(this);
  $(this.$node).toggle(); 
  //assign it a id for a random color
  var randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  $(this.$node).css('border-color', randomColor);
};

