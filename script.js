/*
 * 根据元素clsssName得到元素集合

 * @param fatherId 父元素的ID，默认为document

 * @tagName 子元素的标签名

 * @className 用空格分开的className字符串

 */

function getClassName(fatherId,tagName,className){

    node = fatherId&&document.getElementById(fatherId) || document;

     tagName = tagName || "*";

    className = className.split(" ");

    var classNameLength = className.length;

    for(var i=0,j=classNameLength;i<j;i++){

        //创建匹配类名的正则

        className[i]= new RegExp("(^|\\s)" + className[i].replace(/\-/g, "\\-") + "(\\s|$)");

    }

    var elements = node.getElementsByTagName(tagName);

    var result = [];

    for(var i=0,j=elements.length,k=0;i<j;i++){//缓存length属性

        var element = elements[i];

        while(className[k++].test(element.className)){//优化循环

            if(k === classNameLength){

                result[result.length] = element;

                break;

            }  

        }

        k = 0;

    }

    return result;

}

 function hasClass(ele,cls) { 
return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)')); 
} 

function addClass(ele,cls) { 
  if (!this.hasClass(ele,cls)){
    ele.className += " "+cls;
  }  
} 

function removeClass(ele,cls) { 
  if (hasClass(ele,cls)) { 
  var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)'); 
  ele.className=ele.className.replace(reg,' '); 
  } 
} 
 function g(id){return document.getElementById(id);}
window.onload=function(){
    //  获取元素对象 
    var pageHeight=document.documentElement.clientHeight;
  //sidebar edu二级内容开始
 function edulist(){
	var outer=document.getElementById("eduid");
    var list=outer.getElementsByTagName('li');
    for (var i = 0; i < list.length; i++) {
	  bind(list[i],"mouseover",handle);
    }
 }
 function bind(el,eventtype,callback){
	if(typeof el.addEventListener==='function'){
		el.addEventListener(eventtype,callback,false);
	}else if(typeof el.attachEvent==='function'){
		el.attachEvent('on'+eventtype,callback);
	}
 }
 function handle(e){
 	var target=e.target || e.srcElement;
 	var outer=document.getElementById("eduid");
    var list=outer.getElementsByTagName("li");
    for (var i = 0; i < list.length; i++) {
    	list[i].className="";
    	//list[i].className.replace("big","");
    };
    while(target.tagName !="LI"&& target.tagName!="BODY"){
    	target=target.parentNode;
    }
    target.className="big";
 }
 edulist();
  //sidebar edu二级内容结束
 
  //sidebar family二级内容开始
  var homeul=document.getElementById("homeul");
  var li1=document.getElementById("li1");
     var speed=60;
     var timer=null;
     /*var a2=document.createElement("li");
     a2.innerHTML=a1.innerHTML;
     homea.appendChild(a2);*/
      li1.innerHTML+=li1.innerHTML;
       timer=setInterval(scrollTop,speed);
     function scrollTop(){
     	if(homeul.scrollTop>=li1.offsetHeight/2){
     		homeul.scrollTop=0;
     	}
     	else{
     		homeul.scrollTop++;
     	}
     }
     homeul.onmouseover=function(){
       clearInterval(timer);
     }
     homeul.onmouseout=function(){
      timer=setInterval(scrollTop,speed);
    }
 //sidebar btn
    function siderbardetail(){
        var siderbarcon=g("sidecon");
        var sidebarbtn=g("btn-2");
        sidebarbtn.onclick=function(){
            if(siderbarcon.style.left==0+'px'){
                siderbarcon.style.left=-60+'px';
                sidebarbtn.innerHTML="&gt;";
                sidebarbtn.title="展开";
            }
            else{
                siderbarcon.style.left=0+'px';
                sidebarbtn.innerHTML="&lt;";
                sidebarbtn.title="收起";
            }
        }; 
    }
  siderbardetail();
 //about me 开始
 function movebox(){
    function autoCenter( el ){
        var bodyW = document.documentElement.clientWidth;
        var bodyH = document.documentElement.clientHeight;

        var elW = el.offsetWidth;
        var elH = el.offsetHeight;
      
        el.style.left =(bodyW-elW)/2 + 'px';
        el.style.top = (bodyH-elH)/2 + 'px';
        el.style.position="fixed";
    }

    //  自动扩展元素到全部显示区域
    function fillToBody( el ){
        el.style.width  = document.documentElement.clientWidth  +'px';
        el.style.height = document.documentElement.clientHeight+ 'px';
    }
   //autoCenter(dialog);
   //fillToBody(mask);

    var mouseOffsetX = 0;   //  偏移
    var mouseOffsetY = 0;

    var isDraging = false;  //  是否可拖拽的标记

    //  鼠标事件1 － 在标题栏上按下（要计算鼠标相对拖拽元素的左上角的坐标，并且标记元素为可拖动）
    g('aboutme').addEventListener('mousedown',function(e){
        var e = e || window.event;
        mouseOffsetX = e.pageX - g('moreme').offsetLeft;
        mouseOffsetY = e.pageY - g('moreme').offsetTop;
        isDraging = true;
    })
   //  鼠标事件2 － 鼠标移动时（要检测，元素是否可标记为移动，如果是，则更新元素的位置，到当前鼠标的位置［ps：要减去第一步中获得的偏移］）
    document.onmousemove = function( e ){
        var e = e || window.event;

        var mouseX = e.pageX;   // 鼠标当前的位置
        var mouseY = e.pageY;

        var moveX = 0;  //  浮层元素的新位置
        var moveY = 0;

        if( isDraging === true ){
            moveX = mouseX-mouseOffsetX;
            moveY = mouseY - mouseOffsetY;
            var pageWidth=document.documentElement.clientWidth;
            var pageHeight=document.documentElement.clientHeight;
            var dialogWidth= g('moreme').offsetWidth;
            var dialogHeight=g('moreme').offsetHeight;
            var maxX=pageWidth-dialogWidth;
            var maxY=pageHeight-dialogHeight;
            moveX=Math.min(maxX,Math.max(0,moveX));
            moveY=Math.min(maxY,Math.max(0,moveY));
            g('moreme').style.left = moveX + 'px';
            g('moreme').style.top  = moveY + 'px';
        }
    }
    //  鼠标事件3 － 鼠标松开的时候（标记元素为不可拖动即可）
    document.onmouseup = function(){
     isDraging = false;
     }
     function showDialog(){
        g('moreme').style.display="block";
        g("mask").style.display="block";
      
        //document.documentElement.style.cssText = 'overflow:none;+overflow:hidden;_overflow:hidden;'; 
        //document.body.style.cssText = 'overflow:hidden;+overflow:none;_overflow:none;padding:0 17px 0 0;';
     }
     function hideDialog(){
        g('moreme').style.display="none";
        g("mask").style.display="none";
         //document.documentElement.style.cssText="";
        // document.body.style.cssText="";
     }
     autoCenter(g('moreme'));
    fillToBody(g("mask"));
    g('backid').onclick=hideDialog;
    g('me').onclick=showDialog;
 }
  //about me 结束  
  movebox();
  //滚动条滚动头部样式变化及返回顶部效果开始
    window.onscroll=function(){
     var timer=null;
     var isrc=true;
         if(!isrc){
            clearInterval(timer);
          }
          isrc=false;
        var box=document.getElementById('headertop');
        var shrink=document.getElementById('shrink');
       var oscroll=document.documentElement.scrollTop ||document.body.scrollTop;
       var boxH=box.offsetHeight;
         if(oscroll>=boxH){
            box.className='now';
         }
        else{
            box.className='about-me';
        }
        if(oscroll>pageHeight){
          shrink.style.display="block";
        }else{
          shrink.style.display="none";
        }
        //ggkaishi
      var oscroll=document.documentElement.scrollTop ||document.body.scrollTop;
      var lias=g("navid").getElementsByTagName("a");
      var items=getClassName('main',"div","tt");
      var currentid="";
      for(var i=0;i<items.length;i++){
        var _item=items[i];
        var _itemTop=_item.offsetTop;
        if(oscroll>_itemTop-200){
          currentid=_item.id;
        }else{
          break;
        }
        /*alert(_itemTop)*/

      }
            if(currentid){
              for(var j=0;j<lias.length;j++){
                var _lias=lias[j];
                var _href=_lias.href.split("#");//href 返回的是一连串的字符（详细的地址）
                if(_href[_href.length-1]!=currentid){
                  removeClass(_lias,"active");
                }else{
                  addClass(_lias,"active");
                }
              }
            }
        //ggjishu
    } 
    shrink.onclick=function(){
      clearInterval(timer)
      timer=setInterval(function(){
        isrc=true;
        var oscroll=document.documentElement.scrollTop ||document.body.scrollTop;
        var ispeed=Math.floor(-oscroll/6);
               document.documentElement.scrollTop=document.body.scrollTop=oscroll+ispeed;
              if(oscroll== 0){
               clearInterval(timer);
              }
      },30)
    }
    shrink.onmouseover=function(){
        shrink.innerHTML="返回顶部";
        shrink.className="return-top";
    }
    shrink.onmouseout=function(){
      shrink.innerHTML="&#8593;";
      shrink.className="shrink";
    }
    //滚动条滚动头部样式变化及返回顶部效果结束


    //焦点图开始 
    var main=document.getElementById("focusbox"),
            pic=document.getElementById("pic"),
            prev=document.getElementById("left"),
            next=document.getElementById("right"),
            span=document.getElementById("xuh").getElementsByTagName("span"),
            foch3=document.getElementById("foch3"),
            index=1,
            animated=false,
            timer=null; 
            function showcol(){
                for (var i = 0; i < span.length; i++) {
                    if(span[i].className=="active"){
                        span[i].className="";
                        break;
                    }
                };
                span[index-1].className="active"; 
            }
            function animate(offset){
                 if (offset == 0) {
                    return;
                }
                    animated=true;
                    var newleft=parseInt(pic.style.left)+offset;
                    var time=250;
                    var interval=10;
                    var speed=offset/(time/interval);
                    function go(){
                            if(speed<0 && parseInt(pic.style.left)>newleft ||speed>0 && parseInt(pic.style.left)<newleft){
                                pic.style.left=parseInt(pic.style.left)+speed+"px";
                                setTimeout(go,interval);
                            }
                        else{
                            animated=false;
                            pic.style.left=newleft+"px";
                             if(newleft<-2800){
                                  pic.style.left=-700+"px";
                                }
                              if(newleft>-700){
                                 pic.style.left=-2800+"px"; 
                                 }
                            }
                    }
                    go();
            }
             function play() {
                timer = setTimeout(function () {
                    next.onclick();
                    play();
                }, 3000);
            }
            function stop(){
                clearTimeout(timer);
            }
            next.onclick=function(){
                if(animated==true/*!animated*/){
                    return;
                } 
                if(index==4){
                    index=1;
                }
                else{
                    index+=1; 
                }
                 animate(-700);
                 showcol();
            }
            prev.onclick=function(){
                  if(animated==true/*!animated*/){
                    return;
                } 
                 if(index==1){
                    index=4;
                }
                else{
                    index-=1; 
                }
                animate(700);
                showcol();
            }
         for (var i = 0; i < span.length; i++) {
                span[i].onclick=function(){
                     if (animated==true) {
                        return;
                    }
                    if(this.className == 'active') {
                        return;
                    }
                    var myindex=parseInt(this.getAttribute("index"));
                    var offset=-700*(myindex-index);
                    animate(offset);
                    index=myindex;
                    showcol();
                }
            };  
        main.onmouseover=stop;
        main.onmouseout=play;
        play();
        //焦点图结束
        //main family开始
      
        
         //main family结束

}        

   






