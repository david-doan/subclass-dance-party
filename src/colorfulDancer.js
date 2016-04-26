var makeColorfulDancer = function(top, left, timeBetweenSteps) {
  makeBlinkyDancer.call(this, top, left, timeBetweenSteps);
};

makeColorfulDancer.prototype = Object.create(makeBlinkyDancer.prototype);
makeColorfulDancer.prototype.constructor = makeColorfulDancer;

makeColorfulDancer.prototype.step = function() {
  makeDancer.prototype.step.call(this);
  //assign it a hexcolor id for a random color
  var randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  $(this.$node).css('border-color', randomColor);
};

