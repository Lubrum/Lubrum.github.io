// Some code is of source: https://www.smashingmagazine.com/2016/07/improving-user-flow-through-page-transitions/
var sync = 1
var container = document.querySelector('.container')

function animate(oldContent, newContent, newHead, oldHead) {
  var fadeOut = oldContent.className += " " + "animated fadeOut"
  setTimeout(function (){  
    $('.old').remove();
    oldContent.parentNode.removeChild(oldContent)
  }, 1100);
  
  var fadeIn = newContent.className += " " + "animated fadeIn"
  
  setTimeout(function (){ 
    newContent.classList.remove("animated")
    newContent.classList.remove("fadeIn")
    newContent.parentNode.parentNode.parentNode.appendChild(newHead)
    if($(window).width() >=  1400){
      $('.main-content').css('grid-column', '2 / 3')
    } 
    sync = 1
    reset(document.location.href);
  }, 900);
}

function loadPage(url) {
  return fetch(url, {
    method: 'GET'
  }).then(function(response) {
    return response.text()
  });
}

function changePage() {
  var url = window.location.href
  loadPage(url).then(function(responseText) {
    var wrapper = document.createElement('html')
    wrapper.innerHTML = responseText
    var oldMainContent = document.querySelector('.main-content')
    var oldHead = document.querySelector('head')
    var newHead = wrapper.querySelector('head')
    var newMainContent = wrapper.querySelector('.main-content')
    oldHead.className = "" + "old"
    container.appendChild(newMainContent)
   animate(oldMainContent, newMainContent, newHead, oldHead)
  });
}

$(document).on("click", "a.page-link,a.post-link" , function(e) {
  if(sync == 0){
    e.stopPropagation()
    e.preventDefault()
    return;
  }
  sync = 0
  $('.old').remove();
  $('.animated .fadeOut').remove()
  $('.animated .fadeIn').remove()
  $('.animated,.fadeOut').remove()
  $('.animated').remove()
  e.preventDefault()
  var t = this, href = t.href
  history.pushState(null, null, t.href)
  changePage()
});

window.addEventListener('popstate', function (e){
  if(sync == 0){
    e.stopPropagation()
    e.preventDefault()
    return;
  }
  sync = 0
  $('.old').remove();
  $('.animated .fadeOut').remove()
  $('.animated .fadeIn').remove()
  $('.animated,.fadeOut').remove()
  $('.animated').remove()
  e.preventDefault()
  var t = this, href = t.href
  history.pushState(null, null, t.href)
  changePage()
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


