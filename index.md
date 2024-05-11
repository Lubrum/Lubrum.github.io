---
layout: default
title: Home
subtitle: Tek Broon Solutions
---
<div data-router-view="name" class="home">
  <h1 class="post-home-title">Tek Broon Solutions</h1>

  <br />
  <br />

  <div class="container">
    <div class="card text-white bg-dark mb-3">
      <div class="row" style="background: linear-gradient(109.6deg, rgba(0, 0, 0, 0.43) 31.2%, rgb(43, 41, 41) 98.9%);">
        <div class="col-12 col-xl-9">
          <div class="px-3 py-3">
            <h3 style="padding: 0px;">Olá !</h3>
            <br />
            <hr />
            <br />
            Sou o Luciano Brum, engenheiro de software especializado em soluções para o ecossistema Java com experiência na manutenção e evolução de produtos legados e criação de produtos com tecnologias modernas.
            <br />
            <br />
            Trabalho com sistemas de pequeno, médio e grande porte em diferentes áreas. Para citar algumas: produção de indicadores para pecuária de corte e leiteira, sistemas de monitoramento de frotas de transporte público, sistema de informações para passageiros de transporte público e aplicativos para consulta de horários e solicitação de ônibus e escalas de tripulantes. Atualmente, trabalho com demandas de um sistema integrado odontológico e projeto de reconhecimento facial.
          </div>
        </div>
        <div class="col d-none d-xl-block">
          <div class="d-flex align-items-center justify-content-center">
            <img src="{{ site.baseurl }}/assets/img/jpg/profile.jpg" alt="Foto do autor dos posts, Luciano Brum, sorrindo em uma parada de ônibus">
          </div>
        </div>
      </div>
    </div>
  </div>

  <h2>{{ include.title }}</h2>
  <div class="container">
    <div class="row">
      {% for experience in site.data.home.experiences %}
      <div class="col py-2">
        <div class="card text-white bg-dark mb-3 align-items-center h-100">
          <img style="height: 150px; width: auto; margin: 1rem;" src="{{ site.baseurl }}{{ experience.logo }}" alt="Image" class="img-fluid card-img-top">
          <hr style="width: 100%;"/>
          <div class="card-body">
            <h3 class="card-title">{{ experience.company }}</h3>
            <p>{{ experience.position }}</p>
            <p>{{ experience.from }} - {{ experience.to }}</p>
            <p class="card-text">
              <p>{{ experience.description }}</p>
            </p>
          </div>
        </div>
      </div>
      {% endfor %}
    </div>
  </div>

</div>