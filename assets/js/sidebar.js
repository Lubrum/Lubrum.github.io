function open_sidebar() {
    if (document.querySelector(".navigation-menu").classList.contains("element-ready")) {
        document.querySelector(".navigation-menu").classList.remove("element-ready")
        if (document.querySelector(".cosmos-container").classList.contains("without-sidebar")) {
            document.querySelector(".cosmos-container").classList.remove("without-sidebar");
            setTimeout(() => { document.querySelector(".navigation-menu").classList.add("element-ready"); }, 800);
            document.cookie = "without-sidebar=false";
        } else {
            document.querySelector(".cosmos-container").classList.add("without-sidebar");
            setTimeout(() => { document.querySelector(".navigation-menu").classList.add("element-ready"); }, 800);
            document.cookie = "without-sidebar=true";
        }
    }
}

function twe_author_description() {  
    
    var app = document.getElementById('author-description');

    var typewriter = new Typewriter(app, {
      loop: false,
      delay: 50,
    });
  
    typewriter
      .typeString('Engenheiro de Computação<br><br>')
      .pauseFor(100)
      .typeString('<strong>Mestre em Computação Aplicada</strong><br><br>')
      .pauseFor(100)
      .typeString('<strong>Desenvolvedor Backend/Mobile</strong><br><br>')
      .pauseFor(100)
      .typeString('Entusiasta da área de dados')
      .pauseFor(100)
      .start();
  
}

function setOverflowX() {
    let cosmosContainer = document.getElementsByClassName("cosmos-container")[0];
    cosmosContainer.style.overflowX = "hidden";
}

function unsetOverflowX() {
    let cosmosContainer = document.getElementsByClassName("cosmos-container")[0];
    cosmosContainer.style.overflowX = "visible";
}

window.onload = function() {

    twe_author_description();

    const sidebar = document.getElementsByClassName("navigation-menu")[0];
    sidebar.addEventListener("transitionstart", function(event) {
        if (event.target.classList.contains('navigation-menu') && event.propertyName === 'transform') {
            setOverflowX()
        }
    })
    sidebar.addEventListener("transitionend", function(event) {
        if (event.target.classList.contains('navigation-menu') && event.propertyName === 'transform') {
            setTimeout(() => {
                unsetOverflowX()
            }, 100);
        }
    })
}

window.addEventListener('resize', function(event) {
    if (window.innerWidth < 1200) {
        document.getElementsByClassName("main-content")[0].style = "grid-column: 1 / 2";
    } else {
        if (document.getElementsByClassName("navigation-menu")[0].style.display != "none") {
            document.getElementsByClassName("main-content")[0].style = "grid-column: 2 / 3";
        } else {
            document.getElementsByClassName("main-content")[0].style = "grid-column: 1 / 3";
        }
    }
});
