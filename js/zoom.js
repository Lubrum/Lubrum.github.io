
// sourcecode : https://activebridge.org/blog/image-zoom-on-pure-css //
function zoom(e){
  var zoomer = e.currentTarget;
  e.offsetX ? offsetX = e.offsetX : offsetX = e.touches[0].pageX
  e.offsetY ? offsetY = e.offsetY : offsetY = e.touches[0].pageY
  x = offsetX / zoomer.offsetWidth * 100
  y = offsetY / zoomer.offsetHeight * 100
  zoomer.style.backgroundPosition = x + '% ' + y + '%';
}
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

    animate2(oldContent, newContent);
  });
}

function animate2(oldContent, newContent) {
  
  var fadeOut = oldContent.className += " " + "animated fadeOut";
  
  setTimeout(function (){ 
    oldContent.parentNode.removeChild(oldContent);
    //oldScript.parentNode.removeChild(oldScript);
  }, 1000);

  var fadeIn = newContent.className += " " + "animated fadeIn";
  
  setTimeout(function (){ 
    newContent.classList.remove("animated");
    newContent.classList.remove("fadeIn");
    //if($(window).width() >=  1400){
     // $('.main-content').css('grid-column', '2 / 3');
    //} 
  }, 1000);
}
*/
$('.post-link').click(function (e) {
  var t = this,  href = t.href;
  // prevent the default behavior //
  e.preventDefault();

  // allows websites to access and modify the browser’s history without loading any pages //
  history.pushState(null, null, t.href);

  changePage();

});

window.addEventListener('popstate', changePage);

function loadPage(url) {
  return fetch(url, {
    method: 'GET'
  }).then(function(response) {
    return response.text();
  });
}

var body = document.querySelector('.container');

function getCook(cookiename) {
  
  var cookiestring=RegExp(cookiename+"=[^;]+").exec(document.cookie);
  return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
  
}

function changePage() {

  // Note, the URL has already been changed
  var url = window.location.href;

  loadPage(url).then(function(responseText) {
    var wrapper = document.createElement('div');
    wrapper.innerHTML = responseText;

    var oldContent = document.querySelector('.main-content');
    var oldContainer = document.querySelector('.container');

    //if(oldContainer.classList.contains("without-sidebar")) {
     // document.getElementsByClassName("main-content")[0].style = "grid-column: 1 / 3";
      //wrapper.getElementsByClassName("main-content")[0].style = "grid-column: 1 / 3";
    //}

    var newContent = wrapper.querySelector('.main-content');

    var scriptElement = document.createElement('script');
    scriptElement.id = "fb-script"
    scriptElement.type = 'text/javascript';
    scriptElement.src = "https://connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v4.0&appId=2337139719936629&autoLogAppEvents=1";

    body.appendChild(newContent);
    body.appendChild(scriptElement);

    animate(oldContent, newContent);
  });
}

function animate(oldContent, newContent) {

  var fadeOut = oldContent.className += " " + "animated fadeOut";
  
  setTimeout(function (){ 
    oldContent.parentNode.removeChild(oldContent); 
  }, 2200);

  var fadeIn = newContent.className += " " + "animated fadeIn";
  
  setTimeout(function (){ 
    newContent.classList.remove("animated");
    newContent.classList.remove("fadeIn");
    if($(window).width() >=  1400){
      $('.main-content').css('grid-column', '2 / 3');
    } 
  }, 1200);
}
