/*
$('.page-link').click(function (e) {
  var t = this,  href = t.href;
  // prevent the default behavior //
  e.preventDefault();
  // allows websites to access and modify the browser’s history without loading any pages //
  history.pushState(null, null, t.href);
  changePage2();
});

var html = document.querySelector('html');


function changePage2() {
  // Note, the URL has already been changed
  var url = window.location.href;
  loadPage(url).then(function(responseText) {
    var wrapper = document.createElement('html');
    wrapper.innerHTML = responseText;
    var oldContent = document.querySelector('body');
    //var oldScript = document.querySelector('#fb-script');
    //var oldContainer = document.querySelector('.container');
    var newContent = wrapper.querySelector('body');
    //var scriptElement = document.createElement('script');
    //scriptElement.id = "fb-script"
    //scriptElement.type = 'text/javascript';
    //scriptElement.src = "https://connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v4.0&appId=2337139719936629&autoLogAppEvents=1";
    html.appendChild(newContent);
    //body.appendChild(scriptElement);
    console.log(html)
    animate2(oldContent, newContent);
  });
}

function animate2(oldContent, newContent) {
  var fadeOut = oldContent.className += " " + "animated fadeOut";
  //var fadeIn = newContent.className += " " + "animated fadeIn ";
  setTimeout(function (){ 
    oldContent.parentNode.removeChild(oldContent);
    //oldScript.parentNode.removeChild(oldScript);
  }, 1000);
  var fadeIn = newContent.className += " " + "animated fadeIn";
  setTimeout(function (){ 
    newContent.className = ''
    //if($(window).width() >=  1400){
     // $('.main-content').css('grid-column', '2 / 3');
    //} 
  }, 1000);
}
*/

function createjscssfile(filename, filetype){
  if (filetype=="js"){ //if filename is a external JavaScript file
      var fileref=document.createElement('script')
      fileref.setAttribute("type","text/javascript")
      fileref.setAttribute("src", filename)
  }
  else if (filetype=="css"){ //if filename is an external CSS file
      var fileref=document.createElement("link")
      fileref.setAttribute("rel", "stylesheet")
      fileref.setAttribute("type", "text/css")
      fileref.setAttribute("href", filename)
  }
  return fileref
}

function replacejscssfile(oldfilename, newfilename, filetype){
  var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none" //determine element type to create nodelist using
  var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none" //determine corresponding attribute to test for
  var allsuspects=document.getElementsByTagName(targetelement)
  for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
      if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(oldfilename)!=-1){
          var newelement=createjscssfile(newfilename, filetype)
          console.log(newelement)
          console.log(allsuspects[i])
          allsuspects[i].parentNode.replaceChild(newelement, allsuspects[i])
      }
  }
}



var container = document.querySelector('.container')

/*
function load_js(link)
{
   var head= document.getElementsByTagName('head')[0];
   var script= document.createElement('script');
   script.src= link;
   head.appendChild(script);
}*/

function animate(oldContent, newContent, newHead, oldHead) {
  
  var fadeOut = oldContent.className += " " + "animated fadeOut"
  setTimeout(function (){  
    $('.old').remove();
    oldContent.parentNode.removeChild(oldContent)
  }, 1500);
  
  var fadeIn = newContent.className += " " + "animated fadeIn"
  
  setTimeout(function (){ 
    newContent.classList.remove("animated")
    newContent.classList.remove("fadeIn")
    newContent.parentNode.parentNode.parentNode.appendChild(newHead)
    if($(window).width() >=  1400){
      $('.main-content').css('grid-column', '2 / 3')
    } 
    reset(document.location.href);
  }, 1200);
}

function loadPage(url) {
  return fetch(url, {
    method: 'GET'
  }).then(function(response) {
    return response.text()
  });
}

function changePage() {
  // Note, the URL has already been changed
  var url = window.location.href
  loadPage(url).then(function(responseText) {
    var wrapper = document.createElement('html')
    wrapper.innerHTML = responseText
    var oldMainContent = document.querySelector('.main-content')
    var oldHead = document.querySelector('head')
    var newHead = wrapper.querySelector('head')
    var newMainContent = wrapper.querySelector('.main-content')
    oldHead.className = "" + "old"
   // replacejscssfile("disqus.js", "/js/disqus.js", "js")
    container.appendChild(newMainContent)
   animate(oldMainContent, newMainContent, newHead, oldHead)
  });
}

$('.post-link').click(function (e) {
  // prevent the default behavior //
  e.preventDefault()
  var t = this, href = t.href
  // allows websites to access and modify the browser’s history without loading any pages //
  history.pushState(null, null, t.href)
  changePage()
  /*  replacejscssfile("zoom.js", "/js/zoom.js", "js") //Replace all occurences of "oldscript.js" with "newscript.js"
 //removejscssfile("disqus.js", "js") //remove all occurences of "somescript.js" on page
    //removejscssfile("splash.js", "js") //remove all occurences of "somescript.js" on page
    //removejscssfile("sidebar.js", "js") //remove all occurences of "somescript.js" on page
   // removejscssfile("jquery-3.4.1.js", "js") //remove all occurences of "somescript.js" on page
   // removejscssfile("zoom.js", "js") //remove all occurences of "somescript.js" on page
   */ //Replace all occurences of "oldscript.js" with "newscript.js"
   //replacejscssfile("splash.js", "/js/splash.js", "js") //Replace all occurences of "oldscript.js" with "newscript.js"
   //replacejscssfile("sidebar.js", "/js/sidebar.js", "js") //Replace all occurences of "oldscript.js" with "newscript.js"
   //replacejscssfile("jquery-3.4.1.js", "/js/jquery-3.4.1.js", "js") //Replace all occurences of "oldscript.js" with "newscript.js"
 
   

});

// When user clicks on back or foward page 
window.addEventListener('popstate', function (e){
  // prevent the default behavior //
  e.preventDefault()
  var t = this, href = t.href
  // allows websites to access and modify the browser’s history without loading any pages //
  history.pushState(null, null, t.href)
  changePage()
  //replacejscssfile("zoom.js", "/js/zoom.js", "js") //Replace all occurences of "oldscript.js" with "newscript.js"
 //removejscssfile("disqus.js", "js") //remove all occurences of "somescript.js" on page
    //removejscssfile("splash.js", "js") //remove all occurences of "somescript.js" on page
    //removejscssfile("sidebar.js", "js") //remove all occurences of "somescript.js" on page
   // removejscssfile("jquery-3.4.1.js", "js") //remove all occurences of "somescript.js" on page
   // removejscssfile("zoom.js", "js") //remove all occurences of "somescript.js" on page
   //replacejscssfile("disqus.js", "/js/disqus.js", "js") //Replace all occurences of "oldscript.js" with "newscript.js"
   //replacejscssfile("splash.js", "/js/splash.js", "js") //Replace all occurences of "oldscript.js" with "newscript.js"
   //replacejscssfile("sidebar.js", "/js/sidebar.js", "js") //Replace all occurences of "oldscript.js" with "newscript.js"
   //replacejscssfile("jquery-3.4.1.js", "/js/jquery-3.4.1.js", "js") //Replace all occurences of "oldscript.js" with "newscript.js"

});
var reset = function (pageUrl) {
  DISQUS.reset({
    reload: true,
    config: function () {
      this.page.identifier = pageUrl;
      this.page.url = pageUrl;
    }
  });
};


