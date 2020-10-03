$(document).ready(function () {
  $(window).resize(function() { 
    if($(window).width() < 1200){
      document.getElementsByClassName("main-content")[0].style = "grid-column: 1 / 3";
    }
    else{
      if(document.getElementsByClassName("navigation-menu")[0].style.display != "none"){
        document.getElementsByClassName("main-content")[0].style = "grid-column: 2 / 3";
      }
    }
  });
});

function open_sidebar() {
  if(document.querySelector(".container").classList.contains("without-sidebar")) {
    document.querySelector(".container").classList.remove("without-sidebar");
    document.cookie = "without-sidebar=false";
  } else {
    document.querySelector(".container").classList.add("without-sidebar");
    document.cookie = "without-sidebar=true";
  }
}