var makeSizeDancer = function(top, left, timeBetweenSteps) {
  makeDancer.call(this, top, left, timeBetweenSteps);
  this.maxSize = Math.floor(Math.random() * 50) + 10;
  this.minSize = 9;
  this.sizeStep = Math.floor(Math.random() * 10) + 1;
  this.color = "#" + Math.floor(Math.random() * 16777215).toString(16);
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

makeSizeDancer.prototype = Object.create(makeDancer.prototype);
makeSizeDancer.prototype.constructor = makeSizeDancer;

makeSizeDancer.prototype.step = function() {
  makeDancer.prototype.step.call(this);
  //assign it a id for a random color
  var currDancer = $(this.$node);
  // currDancer.toggle();
  var currSize = parseInt(currDancer.css('border'));
  if (currSize < this.maxSize) {
    currSize += this.sizeStep;
    currDancer.css('border', currSize + 'px solid ' + this.color);
  } else if (currSize > this.maxSize) {
    currSize -= this.sizeStep;
    currDancer.css('border', currSize + 'px solid' + this.color);
  } else if (currSize < this.minSize) {
    currSize += this.sizeStep;
    currDancer.css('border', currSize + 'px solid' + this.color);
  }
  // var randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  // $(this.$node).css('border-color', randomColor);
};

