$(document).ready(function () {
  $(window).resize(function() { 
    if($(window).width() < 1400){
      document.getElementsByClassName("main-content")[0].style = "grid-column: 1 / 3";
    }
    else{
      if(document.getElementsByClassName("navigation-menu")[0].style.display != "none"){
        document.getElementsByClassName("main-content")[0].style = "grid-column: 2 / 3";
      }
    }
  });
});

function openNav() {
  if(document.querySelector(".container").classList.contains("without-sidebar"))
    document.querySelector(".container").classList.remove("without-sidebar");
  else
    document.querySelector(".container").classList.add("without-sidebar");
}

function getCook(cookiename) {
  
  var cookiestring=RegExp(cookiename+"=[^;]+").exec(document.cookie);
  return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
  
}