function obj(src){
  
    var sliceSize = 10;
    var items = [];
    var $this = this;
    this.img;
    var d = new Date().getTime();
    this.id = 'tmax';
    
    var particles = [];
    this.createCanvas = function(){
    
        this.img = new Image();
        this.img.src = src;
    
    this.img.onload = function(){
    
        var obj = createParticles($this.img, this.id,sliceSize);
        this.item = obj;
        $this.item = obj;
        items.push(this.item);
        //console.log(items)
        var parent = document.getElementById('mccText');
        parent.appendChild(obj);
    }
    console.log('acabo6');
  }
  
  function createParticles(imgObj,id,sliceSize){
        
    //calculating the num of slice(x,y)
		var xSlices = Math.ceil(imgObj.width / sliceSize);
		var ySlices = Math.ceil(imgObj.height / sliceSize);  
    
    //we have slice who are less then the sliceSize. lets calculate them 
    var width_fix = imgObj.width % sliceSize;
    var height_fix = imgObj.height % sliceSize;
		var elem = document.createElement("div");
		particles = new Array();
    
        
	 for(var n = 0; n < xSlices; n++) {
	        for(var i = 0; i < ySlices; i++) {
	          var imgX = n * sliceSize;
	          var imgY = i * sliceSize;
              var wf = (n == xSlices -1 ) ? width_fix : sliceSize;
	          particles.push({x: imgX,y: imgY,imgX: imgX,imgY: imgY,vx: 0,vy: 0,wf: wf});
	        }
	  }
	      
    console.log(particles);
    elem.id = $this.id;
    elem.style.width = imgObj.width+"px";
    elem.style.height = imgObj.height+"px";
    elem.style.position = "absolute";
    elem.style.zIndex = 1;
    var canvas;
    var context;
    
		for(var n = 0; n < particles.length; n++) {
		      
      //create  canvas  for each particle
      var particle = particles[n];
      canvas = document.createElement("canvas");
      canvas.width = sliceSize;
      canvas.height = sliceSize;
      if(particle.wf != sliceSize)
        canvas.width = particle.wf;
      canvas.style.left = particle.x+"px";
      canvas.style.top = particle.y+"px";
      canvas.style.position = 'absolute';
      canvas.style.display = 'none';

      //drawing the tile
      context = canvas.getContext("2d");
      context.drawImage(imgObj, particle.imgX, particle.imgY, sliceSize, sliceSize, 0, 0, sliceSize, sliceSize);    
      elem.appendChild(canvas);

      //lets put the tile outside the screen(x = -1000| y = random)
      TweenMax.to(canvas,0,{x:'-=' + (particle.x - 1500),y:'+=' +getRandom(-450,450)}); 
      console.log('acabo7');       
   }         
   return elem;
		
	}
  
  this.explode = function(id){

		//alert('explode');
		var elem = this.item;
		elem.style.display = "block";
	//	console.log(this.item);
    console.log( this.item.id);
		
		var childrenNum = $("#"+this.item.id).children();
        childrenNum = shuffle(childrenNum);
        
        var tl = new TimelineMax({paused:true});
        //TweenMax.staggerTo(childrenNum,0.3,{top:0,left:0});
        for(var i = 0; i < childrenNum.length; i++) {
            var item = childrenNum.eq(i);
            var w = $(window).width();
            
            var dTime = 0.01 * i;
            TweenMax.to(item,1,{x:getRandom(-1010,813),y:getRandom(-313,810),delay:dTime,display:'block',ease:Power2.easeOut});
       
            TweenMax.to(item,1,{z:getRandom(-200,200),x:getRandom(-1010,813),y:getRandom(-313,810),rotationY:getRandom(0,1560),rotationX:getRandom(0,1560),delay:1 + dTime});
            TweenMax.to(item,0.5,{z:getRandom(-200,200),x:getRandom(-1010,813),y:getRandom(-313,810),rotationY:getRandom(0,1560),rotationX:getRandom(0,1560),delay:2 + dTime});
            TweenMax.to(item,7,{z:getRandom(-200,200),x:getRandom(-1010,813),y:getRandom(-313,810),delay: 2.5+ dTime,ease:SlowMo.ease,scaleX:1,scaleY:1});
            
            if(i%4 == 0)
              var dt = i*0.001;
             else
               var dt = 0;

            TweenMax.to(item,1,{rotationY:0,rotationX:0,x:0,y:0,z:0,delay:10.5 + dt,ease:Power2.easeOut});
            
        }
      setTimeout(function () {
        $('#intro').hide();
        $('#content').show();
      }, 12000);
	}
    this.reset = function(){
        console.log($("#"+this.id).children().length);
        $("#"+this.id).empty().remove();
        $("#container").children("div").remove();
        $this.createCanvas();
    }
};

$(function(){

    var img;        
    var src_img = "./assets/img/mccLetrasFinal.png";
    img = new obj(src_img);
    img.createCanvas();
    setTimeout(function() {
      img.explode('img');
    }, 2000);
    // $('#button').click(function() {
    //     var src_img2 = "./assets/img/monoCabezaFinal.png";
    //     img2 = new obj(src_img2);
    //     img2.explode('img2');
    //     img.explode('img');
    // });
}); 

function getRandom(min, max) {  
  return Math.random() * (max - min) + min;
  
}
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};