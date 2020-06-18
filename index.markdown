---
layout: default
title: Home
subtitle: Um blog sobre Ciência de Dados, Desenvolvimento de Software e tecnologias recentes 
---
<div data-router-view="name" class="home">
  <h1 class="post-home-title">Data Science Broon</h1>
  <h5 class="post-home-subtitle"> {{ page.subtitle }} </h5>

  {%- if site.posts.size > 0 -%}
  <form action="{{site.baseurl}}/search.html" method="get">
    <div class="searchBox">
      <input class="searchInput" type="text" id="search-box" name="query" placeholder="Busca por Posts">
         <button class="searchButton">
            <i class="material-icons">search</i>
          </button>
    </div>
  </form>
  <article class="post h-entry" itemscope itemtype="http://schema.org/BlogPosting">
    <ul class="post-list">
      {%- for post in site.posts -%}
        <li class="post-li">
          {%- if post.widget -%}
          <a class="post-link" href="{{ post.url | relative_url }}" target="_blank"> 
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
    <br>
  </article>
  {%- endif -%}
</div>