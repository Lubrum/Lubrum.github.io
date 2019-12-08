$(document).ready(function () {
  $(window).resize(function() { 
    if($(window).width() < 1400){
      document.getElementsByClassName("main-content")[0].style = "grid-column: 1 / 3";
    }
    else{
      //document.getElementsByClassName("site-nav")[0].style = "max-width: none; max-height: none;";
      if(document.getElementsByClassName("navigation-menu")[0].style.display != "none"){
        document.getElementsByClassName("main-content")[0].style = "grid-column: 2 / 3";
      }
    }
  });
/*
  $("#nav-trigger").change( function(){
    if( $(this).is(':checked') ) {
      document.getElementsByClassName("site-nav")[0].style = "max-width: 25%; max-height: none;";
    } 
    else{
      document.getElementsByClassName("site-nav")[0].style = "max-width: 10%; max-height: 90%;";
    }
 });*/
});

function openNav() {
  if(document.querySelector(".container").classList.contains("animate"))
    document.querySelector(".container").classList.remove("animate");
  else
    document.querySelector(".container").classList.add("animate");
  
}