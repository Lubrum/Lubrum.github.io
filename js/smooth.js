// Import Highway
import Highway from '@dogstudio/highway';
import { TweenMax } from 'gsap';

class Fade extends Highway.Transition {

  in({ from, to, done }) {
    TweenMax.fromTo(to,
      0.5,
      { opacity: 0 },
      {
        opacity: 1, onComplete: function () {
          done();
        }
      }
    );
  }

  out({ from, done }) {
    TweenMax.fromTo(from, 
      0.5,
      { opacity: 1 },
      {
        opacity: 0,
        onComplete: function () {
          window.scrollTo(0, 0);
          from.remove();
          
          done();
        }
      }
    );
  }

}

export default Fade;

/*


// Some code is of source: https://www.smashingmagazine.com/2016/07/improving-user-flow-through-page-transitions/
var sync = 1

//var currentPathname = null // Prevent popstate on hashtags: https://gist.github.com/mahemoff/1591495

function animate(oldContent, newContent, newHead, oldHead) {
  newContent.parentNode.parentNode.parentNode.appendChild(newHead)

  var fadeOut = oldContent.className += " " + "animated fadeOut"
  setTimeout(function (){
    oldHead.parentNode.removeChild(oldHead)
    oldContent.parentNode.removeChild(oldContent)
    sync = 1
  }, 1000);
  var fadeIn = newContent.className += " " + "animated fadeIn"
  setTimeout(function (){
    //newContent.classList.remove("animated")
    //newContent.classList.remove("fadeIn")

    if($(window).width() >=  1400){
      $('.main-content').css('grid-column', '2 / 3')
    }
    //reset(document.location.href);
  }, 600);

}

function loadPage(url) {
  return fetch(url, {
    method: 'GET'
  }).then(function(response) {
    return response.text()
  });
}

function changePage() {
  var container = document.querySelector('.container')
  var url = window.location.href
  loadPage(url).then(function(responseText) {
    var wrapper = document.createElement('html')
    wrapper.innerHTML = responseText
    var oldMainContent = document.querySelector('.main-content')
    var newMainContent = wrapper.querySelector('.main-content')
    var oldHead = document.querySelector('head')
    var newHead = wrapper.querySelector('head')
    container.appendChild(newMainContent)
    animate(oldMainContent, newMainContent, newHead, oldHead)
  });
}
/*
$(document).on("click", "a.page-link,a.post-link" , function(e) {
  e.preventDefault()
  if(sync == 0){
    e.stopPropagation()
    e.preventDefault()
    return;
  }
  sync = 0
  var t = this, href = t.href
  history.pushState(null, null, t.href)
  changePage()
});

window.addEventListener('popstate', function (e){
  history.replaceState(null, null, ' '); // https://www.tutorialspoint.com/how-to-remove-the-hash-from-window-location-url-with-javascript-without-page-refresh
  //if (document.location.pathname == currentPathname || currentPathname == null) return;
  //currentPathname = document.location.pathname
  e.preventDefault()
  if(sync == 0){
    e.stopPropagation()
    return;
  }
  sync = 0
  var t = this, href = t.href
  history.pushState(null, null, t.href)
  changePage()
});


*/
