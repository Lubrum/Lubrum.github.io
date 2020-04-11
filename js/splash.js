let box = document.getElementById('splash');

function getCook(cookiename) {
  
  var cookiestring=RegExp(cookiename+"=[^;]+").exec(document.cookie);
  return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
  
}

document.addEventListener("DOMContentLoaded", function(event) {
  
  if( window.location.pathname === "/" ) {
   
    if ( getCook('valid') != 'true' ) {
      
      document.cookie = "valid=true";
      box.classList.add('show');  
     
      setTimeout(function () {
        box.classList.add('hidding'); 
      }, 2000);
     
      setTimeout(function () {
        box.classList.add('hide');     
      }, 4000);
   
    }
  
  } else {
  
    box.classList.add('hide');  
  
  }
});