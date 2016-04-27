var makePengDancer = function(top, left, timeBetweenSteps) {
  makeDancer.call(this, top, left, timeBetweenSteps);
  this.movRight = true;
  this.topp = top;
  $(this.$node).append('<img src="src/penguin.png"></img>');
  $(this.$node).css('border', 'none');
  $(this.$node).addClass('wiggler');
  this.maxLeft = left - Math.floor(Math.random * 100);
  this.maxLeft < 0 ? this.maxLeft = 0 : this.maxLeft;

  this.maxRight = left + Math.floor(Math.random * 100);
  this.maxRight > $(window).width() ? this.maxRight = 0 : this.maxRight;
  
  $(this.$node).click(function(){
    $(this).children().attr("src", 'src/explosion.gif-c200');
    var score = $('#numScore').text();
    var newScore = parseInt(score, 10) + 1;
    $('#numScore').text(newScore);
    $(this).children().delay(800).hide(0);
    var closure = this;
    setTimeout(function() {
      $(closure).remove();
    }, 1000);
  });
};

makePengDancer.prototype = Object.create(makeDancer.prototype);
makePengDancer.prototype.constructor = makePengDancer;

makePengDancer.prototype.step = function() {
  makeDancer.prototype.step.call(this);
  
  var closure = this;

  if (closure.isDancing) {
    closure.animateDiv();   
  } else {
    $(closure.$node).stop(true, false);
    $(closure.$node).clearQueue().finish();
  }          
};

makePengDancer.prototype.makeNewPosition = function() {
  var h = $(window).height() - 50;
  var w = $(window).width() - 50;

  var nh = Math.floor(Math.random() * h);
  var nw = Math.floor(Math.random() * w);

  return [nh, nw];    
};

makePengDancer.prototype.animateDiv = function() {
  var newq = this.makeNewPosition();
  var oldq = $(this.$node).offset();
  var speed = this.calcSpeed([oldq.top, oldq.left], newq);
  var closure = this;
  
  $(this.$node).animate({ top: newq[0], left: newq[1] }, speed, function() {
    if (closure.isDancing) {
      closure.animateDiv();  
    }    
  });
    
};

makePengDancer.prototype.calcSpeed = function(prev, next) {
    
  var x = Math.abs(prev[1] - next[1]);
  var y = Math.abs(prev[0] - next[0]);

  var greatest = x > y ? x : y;

  var speedModifier = 0.1;

  var speed = Math.ceil(greatest / speedModifier);

  return speed;

};


// makePengDancer.prototype.animateDiv = function() {
//   var newq; 
//   var speed = Math.random() * 2000;
//   var closure = this;
//   if(closure.movRight){
//     newq = closure.maxRight;
//   } else {
//     newq = closure.maxLeft;
//   }
//   closure.movRight = !closure.movRight;
//   $(this.$node).animate({ top: closure.topp, left: newq }, speed, function() {
//     if (closure.isDancing) {
//       closure.animateDiv();  
//     }    
//   });
    
// };

