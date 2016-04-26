var makeMovingDancer = function(top, left, timeBetweenSteps) {
  makeDancer.call(this, top, left, timeBetweenSteps);
  $(this.$node).append('<img src="src/doge.jpg"></img>');
  $(this.$node).css('border', 'none');
  $(this.$node).click(function(){
    $(this).children().attr("src", 'src/explosion.gif-c200');
    $(this).children().delay(800).hide(0);
    var closure = this;
    setTimeout(function() {
      $(closure).remove();
    }, 1000);
  });
};

makeMovingDancer.prototype = Object.create(makeDancer.prototype);
makeMovingDancer.prototype.constructor = makeMovingDancer;

makeMovingDancer.prototype.step = function() {
  makeDancer.prototype.step.call(this);
  var closure = this;
  $(document).ready(function() {
    closure.animateDiv(); 
  }); 
};


makeMovingDancer.prototype.makeNewPosition = function() {
  var h = $(window).height() - 50;
  var w = $(window).width() - 50;

  var nh = Math.floor(Math.random() * h);
  var nw = Math.floor(Math.random() * w);

  return [nh, nw];    
};

makeMovingDancer.prototype.animateDiv = function() {
  var newq = this.makeNewPosition();
  var oldq = $(this.$node).offset();
  var speed = this.calcSpeed([oldq.top, oldq.left], newq);
  var closure = this;
  
  $(this.$node).animate({ top: newq[0], left: newq[1] }, speed, function() {
    closure.animateDiv();        
  });
    
};

makeMovingDancer.prototype.calcSpeed = function(prev, next) {
    
  var x = Math.abs(prev[1] - next[1]);
  var y = Math.abs(prev[0] - next[0]);

  var greatest = x > y ? x : y;

  var speedModifier = 0.1;

  var speed = Math.ceil(greatest / speedModifier);

  return speed;

};



