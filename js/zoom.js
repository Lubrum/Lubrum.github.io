// sourcecode : https://activebridge.org/blog/image-zoom-on-pure-css //
function zoom(e){
  var zoomer = e.currentTarget;
  e.offsetX ? offsetX = e.offsetX : offsetX = e.touches[0].pageX
  e.offsetY ? offsetY = e.offsetY : offsetY = e.touches[0].pageY
  x = offsetX / zoomer.offsetWidth * 100
  y = offsetY / zoomer.offsetHeight * 100
  zoomer.style.backgroundPosition = x + '% ' + y + '%';
}

$('.post-link').click(function (e) {
  var t = this,  href = t.href;
   
  // prevent the default behavior //
  e.preventDefault();

  // allows websites to access and modify the browser’s history without loading any pages //
  history.pushState(null, null, t.href);

  changePage();

});

window.addEventListener('popstate', changePage);

var cache = {};
function loadPage(url) {
  if (cache[url]) {
    return new Promise(function(resolve) {
      resolve(cache[url]);
    });
  }

  return fetch(url, {
    method: 'GET'
  }).then(function(response) {
    cache[url] = response.text();
    return cache[url];
  });
}

var body = document.querySelector('.container');

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

    body.appendChild(newContent);
    animate(oldContent, newContent);
  });
}

function animate(oldContent, newContent) {
  
  var fadeOut = oldContent.className += " " + "animated fadeOut";
  
  setTimeout(function (){ 
    oldContent.parentNode.removeChild(oldContent); 
  }, 1200);

  var fadeIn = newContent.className += " " + "animated fadeIn";
  
  setTimeout(function (){ 
    newContent.classList.remove("animated");
    newContent.classList.remove("slideInRight");
    if($(window).width() >=  1400){
      $('.main-content').css('grid-column', '2 / 3');
    } 
  }, 800);
}
