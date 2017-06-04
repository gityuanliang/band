/**
 * Created by Administrator on 2017-05-06.
 */
/*加载函数*/
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func();
        }
    }
}
/*�id�class�tagname封装*/
var $id=function(em){
    if(!document.getElementById){
        return false;
    }else{
        return document.getElementById(em);
    }
};
var $tagName=function(tName,dct){
    if(!document.getElementsByTagName){
        return false;
    }else{
        return dct.getElementsByTagName(tName);
    }
};
var $clName=function(clName,dct){
    dct.getElementsByClassName(clName);
};
/*添加过渡函数*/
function addTransition(em){
    em.style.transition="all 0.5s ease 0s";
    em.style.webkitTranition='all 0.5s ease 0s'
};
/*移除过渡函数*/
function removeTransition(em){
    em.style.transition='none';
    em.style.webkitTranition='none';
}
/*首页轮播图*/
 function slide(){
     if(!$id('slideShow')) return false;
     var slideShow=$id('slideShow');
     var banners=$id('banners');
     var bannerWidth=parseInt(banners.offsetWidth/5);
     var index=0;
     /*位移函数*/
     function transformL(x){
        banners.style.transform='translateX('+x+"px)";
     }
     var timer=setInterval(function(){
         index++;
         console.log(index);
         addTransition(banners);
         transformL(-index*bannerWidth);
     },1000);
     banners.addEventListener('transitionEnd',function(){
         if(index>=5){
             index=-1;
             console.log(1);
             removeTransition(banners);
             transformL(-index*bannerWidth);
         }else if(index<=0){
             index=5;
             removeTransition(banners);
             transformL(-index*bannerWidth);
         }
     },false);
     banners.addEventListener('webkitTransitionEnd',function(){
         if(index>=5){
             index=0;
             removeTransition(banners);
             transformL(-index*bannerWidth);
         }else if(index<=0){
             index=5;
             removeTransition(banners);
             transformL(-index*bannerWidth);
         }
     },false);
     function changeImg(){
         var nav=$id('nav');
         var as=nav.getElementsByTagName('a');
         for(let i=0;i<as.length;i++){
             as[i].onmouseover=function(){
                 clearInterval(timer);
                 index=i;
                 banners.style.transform='translateX('+(-index*150)+"px)"
             };
             as[i].onmouseout=function(){
                 timer=setInterval(function(){
                     index++;
                     console.log(index);
                     addTransition(banners);
                     transformL(-index*bannerWidth);
                 },1000);
             }
         }
     }
     changeImg();
 };
/*onmouseouver变图*/
function ahref(){
    if(!$id('nav')) return false;
    var nav=$id('nav');
    var as=nav.getElementsByTagName('a');
    for(var i=0;i<as.length;i++){
        var aHref=as[i].href;
    }
};

/*nav点击变色*/
function changColor(){
    var nav=$id('nav');
    var lis=$tagName('li',nav);
    for(var i= 0,len=lis.length;i<len;i++){
        lis[i].onclick=function(){
            if(i!==0){
                lis[0].removeAttribute('class','here');
            }
        };
        var href=lis[i].lastChild.getAttribute("href");
        var winHref=window.location.href;
        if(winHref.indexOf(href)!==-1){
            lis[i].setAttribute('class','here');
        }
    }
};

/*about中点击文字切换*/
function disBlock(){
    var Skript=$id('Skript');
    if(!Skript) return false;
    var Domsters=$id('Domsters');
    var SkriptDetail=$id('SkriptDetail');
    var DomstersDetail=$id('DomstersDetail');
    Skript.onclick=function(){
        SkriptDetail.style.display="block";
    };
    Domsters.onclick=function(){
        DomstersDetail.style.display="block";
    }
};

/******
 photos
 *******/
/*点击放入相册*/
function gallery(){
 var name=$id('name');
    var placeholder=$id('placeholder');
    var description=$id('description');
    if(name==null)return false;
    var imgs=name.getElementsByTagName('img');
    for(var i= 0,len=imgs.length;i<len;i++){
        imgs[i].onclick=function(){
            var src=this.getAttribute('src');
            var title=this.getAttribute('title');
            placeholder.setAttribute('src',src);
        /*    var srcp=placeholder.getAttribute('src');
            console.log(srcp);*/
            description.innerHTML=title;
        }
    }
};
/*拖拽放入相册*/
//拖拽结束
    function allowDrop(ev)
    {
        ev.preventDefault();
    }
//拖动开始
    var route;
    var photosName;
    function drag(ev)
    {
        route=ev.target.getAttribute("src");
        photosName=ev.target.getAttribute('title');
    }
//放置
    function drop(ev)
    {
        ev.preventDefault();
        var placeholder=document.getElementById('placeholder');
        var placeholderChild=placeholder.childNodes;
        var description=$id('description');
        placeholder.setAttribute('src',route);
        description.innerHTML=photosName;
    }
/*live*/
function hoverColor(){
    var schedule=$id("schedule");
    if(!schedule)return false;
    console.log(schedule);
    var grays=schedule.getElementsByClassName('gray');
    for(var i= 0,len=grays.length;i<len;i++){
        grays[i].onmouseover=function(){
            this.setAttribute('class','mouseoverColor')
        };
        grays[i].onmouseout=function(){
            this.removeAttribute('class','mouseoverColor')
        }
    }
};
/******
 contact
 *******/
/*获取老版本浏览器lable获取焦点*/
function focusLabels(){
    var mes=$id("mes");
    if(!mes)return false;
    if(!document.getElementsByTagName)return false;
    var lables=document.getElementsByTagName('lable');
    for(var i=0;i<lables.length;i++){
        if(!lables[i].getAttribute('for')) continue;
        lables[i].onclick=function(){
            var id=this.getAttribute('for');
            if(!document.getElementById(id))return false;
            var element=document.getElementById(id);
            element.focus();
        }
    }
}
/*placeholder*/
/*
    var thisform=document.forms[i];
    resetFields(thisform);
*/
function resetFields(whichform){
    if(Modernizr.input.placeholder) return;
    for(var i=0;i<whichform.elements.length;i++){
        var element=whichform.elements[i];
        /*若果类型为submit则跳过*/
        if(element.type=='submit') continue;
        var check=element.placeholder || element.getAttribute('placeholder');
        /*如果没有placeholder,有则终止函数*/
        if(!check)continue;
        /*获取焦点，清除placeholder*/
        element.onfocus=function(){
            var text=this.placeholder||this.getAttribute('placeholder');
            if(this.value==text){
                this.className='';
                this.value='';
            }
        };
        /*失去焦点添加placeholder*/
        element.onblur=function(){
          if(this.value==''){
              this.calssName='placeholder';
              this.value=this.placeholder||this.getAttribute('placeholder');
          }
        };
        /*先执行一次onblur*/
        element.onblur();
    }
}

/*验证输入是否为空*/
function isFilled(field){
    //去除空格后的长度
    if (field.value.replace('','').length==0)return false;
    var placeholder=field.placeholder||field.getAttribute('placeholder');
    return (field.value !==placeholder);
};
function isEmail(field){
    var checkEmail=/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
     console.log(checkEmail.test(field));
     if(checkEmail.test(field.value))return true;
   /* return (field.value.indexOf("@")!= -1 && field.value.indexOf(".")!= -1);*/
};
/*执行函数*/
function validateForm(whichform){
    for(var i=0;i<whichform.elements.length;i++){
        var element=whichform.elements[i];
        if(element.getAttribute("required") == "required"){
            if(!isFilled(element)){
                alert("please fill in the "+element.name+" field.");
                return false;
            }
            if(element.type=='email'){
                alert(element.type);
                alert(!isEmail(element));
                if(!isEmail(element)){
                    alert("The"+element.name+"field must be a valid email address.");
                    return false;
                }
            }
        }
    }
    return true;
};

/*获取表单，并验证*/
function prepareForms(){
    for(var i=0;i<document.forms.length;i++){
        var mes=$id("mes");
        if(!mes)return false;
        var thisform=document.forms[i];
        /*js 设置placeholder防止老版本浏览器不兼容*/
        resetFields(thisform);
        /*提交验证*/
        thisform.onsubmit=function(){
            /*先判断验证是否通过*/
            if(!validateForm(this)) return false;
            var article=document.getElementsByTagName('article')[0];
            if(summitFormWithAjax(this,article)){}return false;
            /*如果ajax异常则用本地网页*/
            return true;
        }
    }
}
/**********
 以上为contact内容
 ***********/
/*ajax 的 XMLHttpRequest对象*/
function getHTTPObject(){
    if(typeof XMLHttpRequest=="undefined"){
        XMLHttpRequest=function(){
            try{ return new ActiveXObject("Msxml2.XMLHTTP.6.0");}
            catch(e){}
            try{ return new ActiveXObject("Msxml2.XMLHTTP.3.0");}
            catch(e){}
            try{ return new ActiveXObject("Msxml2.XMLHTTP");}
            catch(e){}
            return false;
        }
    }
    return new XMLHttpRequest();
}
/*加载过渡动画*/
function displayAjaxLoading(element){
    while(element.hasChildNodes()){
        element.removeChild(element.lastChild);
    }
    var content=document.createElement('img');
    content.setAttribute('src','../images/loading.gif');
    content.setAttribute('alt','加载中，请等待');
    element.appendChild(content);
}
/*表单*/
function summitFormWithAjax(whichform,thetarget){
    var requset=getHTTPObject();
    if(!requset){
        return false;
    }
    displayAjaxLoading(thetarget);
    var dataParts=[];
    var element;
    for(var i=0;i<whichform.elements.length;i++){
        element=whichform.elements[i];
        /*编码成URL安全的字符串*/
        dataParts[i]=element.name+"="+encodeURIComponent(element.value);
    }
    var data=dataParts.join("&");
    //初始化 HTTP 请求参数，例如 URL 和 HTTP 方法，但是并不发送请求。
    requset.open('POST',whichform.getAttribute('action'),true);
    //向一个打开但未发送的请求设置或添加一个 HTTP 请求。
    requset.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    //状态改变时
    requset.onreadystatechange=function(){
        if(requset.readyState==4){
            if(requset.status==200||requset.status==0){
                var matches=requset.responseText.match(/<article>([\s\S]+)<\/article>/);
                if(matches.length>1){
                    thetarget.innerHTML=matches[1];
                }else{
                    thetarget.innerHTML="<p> Oops.there is an error</p>";
                }
            }else{
                thetarget.innerHTML='<p>'+requset.statusText+'</P>';
            }
        }
    };
    //发送请求
    requset.send(data);
    return true;
}

function loadEvents() {
    // home
    slide();
    changColor();
    // about
    disBlock();
    // photos
    gallery();
    // live
    hoverColor();
    // contact
    focusLabels();
    prepareForms();
}

// Load events
addLoadEvent(loadEvents);