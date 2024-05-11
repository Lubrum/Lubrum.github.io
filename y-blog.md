---
layout: default
title: Blog
subtitle: Um blog sobre Desenvolvimento de Software, Ciência de Dados e tecnologias recentes 
---
<div data-router-view="name" class="home">
  <h1 class="post-home-title">Tek Broon</h1>
  <h5 class="post-home-subtitle"> {{ page.subtitle }} </h5>

  {%- if site.posts.size > 0 -%}
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