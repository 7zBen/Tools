var Game=(function(){
  var faces=$("#simon .b");
  var sequence=[];
  var userSequence=[];
  function init(){
    makeFacesClickable();
    $(".new-game").on('click',start);
  }
  function start(){
    $(".msg1,.msg2").html("&nbsp;");
    sequence=[];
    userSequence=[];
    addNextSequence();
    playSequence();
  }
  function makeFacesClickable(){
    faces.on('click',function(){
      highlight.call(this);
      userSequence.push($(this).index("#simon .b"));
      checkUserSequence();
    });
  }
  function checkUserSequence(){
    if(userSequence.join('')!=sequence.slice(0,userSequence.length).join('')) {
      $(".msg1").html("GAME");
      $(".msg2").html("OVER");
      return false;
    } else if(userSequence.length==sequence.length) {
      $(".msg1").html(sequence.length)
      addNextSequence();
      userSequence=[];
      setTimeout(playSequence,1000);
      return true;
    }
  }
  function addNextSequence(){
    sequence.push(Math.floor(Math.random()*4));
  }
  function highlight(){
    $(this)
      .addClass('hl');
    setTimeout(dehighlight.bind(this),300);
  }
  function dehighlight(){
    $(this)
      .removeClass('hl');
  }
  function playSequence(){
    for(var i=0;i<sequence.length;i++) {
      setTimeout(highlight.bind(faces.eq(sequence[i])),i*400);
    }
  }
  return {
    init:init,
    start:start};
})();

Game.init();
Game.start();

$(window).on('resize',function(){
  var m = Math.min($(window).height(),$(window).width());
  m-=50;
  $("#simon").css({
    height:m+'px',
    width:m+'px',
    margin:(-m/2)+'px 0 0 '+(-m/2)+'px'
  });
});