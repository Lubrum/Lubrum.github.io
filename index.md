---
layout: default
title: Home
subtitle: Tek Broon Solutions
---
<div data-router-view="name" class="home">
  <h1 class="post-home-title">Tek Broon Solutions</h1>

  <div class="container" style="width: unset;">
    <div class="card text-white bg-dark mb-3">
      <div class="row g-0" style="background: linear-gradient(109.6deg, rgba(0, 0, 0, 0.43) 31.2%, rgb(43, 41, 41) 98.9%);">
        <div class="col-12 col-xl-9">
          <div class="px-3 py-3">
            <h3 style="padding: 0px;">Olá !</h3>
            <br />
            <hr />
            <p style="text-align: justify; margin: 0;">
              <br />
              Sou o Luciano Brum, engenheiro de software especializado em soluções para o ecossistema Java com experiência na manutenção e evolução de produtos legados e criação de produtos com tecnologias modernas.
              <br />
              <br />
              Trabalho com sistemas de pequeno, médio e grande porte em diferentes áreas. Para citar algumas: produção de indicadores para pecuária de corte e leiteira, sistemas de monitoramento de frotas de transporte público, sistema de informações para passageiros de transporte público e aplicativos para consulta de horários e solicitação de ônibus e escalas de tripulantes. Atualmente, trabalho com demandas de um sistema integrado odontológico e projeto de reconhecimento facial.
            </p>
          </div>
        </div>
        <div class="col d-none d-xl-block px-4 py-4 d-flex align-items-center justify-content-center">
          <img class="img-fluid" src="{{ site.baseurl }}/assets/img/jpg/profile.jpg" alt="Foto do autor dos posts, Luciano Brum, sorrindo em uma parada de ônibus">
        </div>
      </div>
    </div>
  </div>

  <h2>{{ include.title }}</h2>
  <div class="container pb-4" style="width: unset;">
    <div class="row gx-sm-0 gy-4 gx-lg-4">
      {% for experience in site.data.home.experiences %}
      <div class="col-12 col-lg-4">
        <div class="card text-white bg-dark align-items-center h-100">
          <img style="height: 150px; width: auto; margin: 1rem;" src="{{ site.baseurl }}{{ experience.logo }}" alt="Image" class="img-fluid card-img-top">
          <hr style="width: 100%;"/>
          <div class="card-body">
            <h3 class="card-title">{{ experience.company }}</h3>
            <p style="margin: 0.5rem auto 0.5rem;">{{ experience.position }}</p>
            <p style="margin: 0.5rem auto 0.5rem;">{{ experience.from }} - {{ experience.to }}</p>
            <p style="margin: 0.5rem auto 0.5rem;" class="card-text">
              <p style="text-align: justify; margin: 0;">{{ experience.description }}</p>
            </p>
          </div>
        </div>
      </div>
      {% endfor %}
    </div>
  </div>

</div>