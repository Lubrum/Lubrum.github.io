// Source code of dynamic cookie: https://stackoverflow.com/questions/10730362/get-cookie-by-name //
function getCook(cookiename) {  
  var cookiestring=RegExp(cookiename+"=[^;]+").exec(document.cookie);
  return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
}

function splash_screen() {
  let box = document.getElementById('splash');
  if (window.location.pathname === "/") {
    if (getCook('valid') != 'true') {   
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
}