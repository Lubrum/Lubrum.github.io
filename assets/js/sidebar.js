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

window.onload = function() {
    twe_author_description();
}

window.addEventListener('resize', function(event) {
    document.getElementsByClassName("main-content")[0].style = "grid-column: 1 / 2";
});
