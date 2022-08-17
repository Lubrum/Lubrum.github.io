---
layout: default
title: Home
subtitle: Um blog sobre Desenvolvimento de Software, Ciência de Dados e tecnologias recentes 
---
<div data-router-view="name" class="home">
  <h1 class="post-home-title">Tek Broon</h1>
  <h5 class="post-home-subtitle"> {{ page.subtitle }} </h5>

  {%- if site.posts.size > 0 -%}
  <form class="search-form" action="{{site.baseurl}}/search.html" method="get">
    <div class="search-box">
      <input class="search-input" type="text" id="search-box" name="query" placeholder="Digite o termo de busca" />
         <button class="search-button">
          <img src="{{site.baseurl}}/assets/img/png/search-icon.png" alt="Submit">
         </button>
    </div>
  </form>
  <article class="post-home" itemscope itemtype="http://schema.org/BlogPosting">
    <ul class="post-list">
      {%- for post in site.posts -%}
        <li class="post-block">
          {%- if post.widget -%}
          <a class="post-link" href="{{ post.url | relative_url }}" target="_self"> 
          {%- else -%}
          <a class="post-link" href="{{ post.url | relative_url }}">
          {%- endif -%}
            {%- assign date_format = site.minima.date_format | default: "%b %-d, %Y" -%}
            <span>{{ post.date | date: date_format }}</span>
            <h3> {{ post.title | escape }} </h3>
            <h6> {{ post.subtitle | strip_html | strip_newlines }} </h6>
            {%- if site.show_excerpts -%}
              {{ post.excerpt }}
            {%- endif -%}
          </a>
        </li>
      {%- endfor -%}
    </ul>
  </article>
  {%- endif -%}
</div>