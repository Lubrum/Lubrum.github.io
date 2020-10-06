window.addEventListener('resize', function(event){
  if(window.innerWidth < 1200) {
    document.getElementsByClassName("main-content")[0].style = "grid-column: 1 / 2";
  }
  else{
    if(document.getElementsByClassName("navigation-menu")[0].style.display != "none"){
      document.getElementsByClassName("main-content")[0].style = "grid-column: 2 / 3";
    } else {
      document.getElementsByClassName("main-content")[0].style = "grid-column: 1 / 3";
    }
  }
});

function open_sidebar() {
  if(document.querySelector(".cosmos-container").classList.contains("without-sidebar")) {
    document.querySelector(".cosmos-container").classList.remove("without-sidebar");
    document.cookie = "without-sidebar=false";
  } else {
    document.querySelector(".cosmos-container").classList.add("without-sidebar");
    document.cookie = "without-sidebar=true";
  }
}