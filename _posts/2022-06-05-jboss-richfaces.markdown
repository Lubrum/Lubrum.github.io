---
layout: post
title: Resolução do problema do mapa híbrido do Google Maps no Richfaces 3.x
subtitle: Explico neste artigo os passos que eu segui para fazer funcionar o Google Maps junto ao Richfaces versão 3.x (I know, it is old stuff).
date: 2022-08-07 12:19:00 -0300
categories: software
language: Java
author: luciano_brum
---

- [Resumo](#resumo)
- [Descrição do problema](#descrição-do-problema)
- [Solução](#solução)
<br>

# Resumo

E aí pessoal, beleza? 

A ideia deste post é compartilhar com vocês sobre como eu resolvi (temporariamente) um problema de compatibilidade entre o Google Maps e a biblioteca Richfaces. 

O Richfaces é uma biblioteca antiga para projetos web que utilizava JSF (JavaServer Faces) com suporte para AJAX (Asynchronous JavaScript And XML).

[Em junho 2016 ela deixou de ser mantida](https://richfaces.jboss.org/). Isso significa que os responsáveis por projetos que utilizam Richfaces deveriam ver alguma forma de substituir essa tecnologia.

Nesse meio tempo, podem surgir bugs pontuais que devem ser resolvidos sem substituir a biblioteca inteira, pois o tempo para fazer essa troca, dependendo do tamanho do projeto, poderia significar não atender demandas mais urgentes que poderiam significar a perda de um cliente.

Um desses problemas que surgiram foi o uso Google Maps no modo híbrido integrado com a biblioteca do Richfaces na versão 3.3.3.Final.

# Descrição do problema

O problema quando você usa o **Google Maps** (nas versões 3.46+) e o **richfaces-impl versão 3.3.3.Final** (e possivelmente outras versões anteriores) é que existe uma incompatibilidade entre o modo híbrido/satélite do mapa e uma das dependências da biblioteca **richfaces-impl**. Esse problema faz com que o mapa no modo Híbrido/Satélite não funcione como deveria.

Abaixo duas imagens, a primeira ilustrando o problema e a segunda mostrando como deveria ser:

<img class="img_content" src="{{ site.baseurl }}/assets/img/post12/figure1.png" alt="Imagem do Google Maps no modo satélite/híbrido com o problema mencionado.">

###### Fonte da imagem: https://i.stack.imgur.com/4a0x3.png

<img class="img_content" src="{{ site.baseurl }}/assets/img/post12/figure2.png" alt="Imagem do Google Maps no modo satélite/híbrido funcionando normalmente.">

###### Fonte da imagem: próprio autor.

# Solução

O ponto de partida para buscar a solução foi a mensagem de erro que aparecia no console do navegador ao tentar carregar o mapa no modo Híbrido.

```
This site overrides Array.from() with an implementation that doesn't support iterables, which could cause Google Maps JavaScript API v3 to not work correctly.
```

Existia uma dependência no projeto que alterava o funcionamento do método Array.from() no Javascript de modo que acarretava no mal funcionamento da versão em uso do Google Maps.

A primeira solução que funcionou por um tempo foi a de voltar algumas versões do Google Maps (até a versão 3.45.8 o mapa híbrido funcionava). Porém, [a versão 3.45.8 recentemente foi removida pelo Google](https://developers.google.com/maps/documentation/javascript/releases#3.49). A alternativa foi encontrar a dependência que tinha esse problema para realizar a correção (ou atualização de versão).

[Este link do stackoverflow](https://stackoverflow.com/a/70095410/5649810.) deu a pista sobre a biblioteca prototype.js estar causando o problema da sobrescrita do método Array.from().

O próximo passo foi descobrir qual biblioteca poderia estar utilizando o prototype.js. Ao focar nas bibliotecas relacionadas ao frontend, foi possível verificar que a lib **richfaces-impl versão 3.3.3.Final** tinha essa dependência.

Ao abrir o jar, temos os seguintes arquivos ([neste link](http://www.java2s.com/Code/JarDownload/richfaces-impl/richfaces-impl-3.3.3.final.jar.zip) é possível obter o código fonte do richfaces-impl):

- org/ajax4jsf/framework.pack.js
- org/ajax4jsf/javascript/scripts/prototype.js

No arquivo prototype.js, foi feita a seguinte substituição na linha 837:

- de: 

```
Array.from = $A;
```

- para: 
```
Array.from = Array.from || $A;
```

Isso basicamente não altera mais o comportamento do Array.from nos navegadores modernos (que é o problema original) e mantém a compatibilidade com os navegadores antigos onde essa atribuição era necessária. Essa solução foi mencionada [neste link](https://stackoverflow.com/a/66099357/5649810), onde também é dito que isso não resolve problemas de compatibilidade com navegadores antigos e o Google Maps. 

A mesma alteração do prototype.js foi feita no arquivo framework.pack.js, só que na linha 343. Esse arquivo é, aparentemente, a versão obfuscada e minificada dos scripts do richfaces-impl.

Ao realizar essas duas modificações pontuais, gerar uma nova versão do artefato do **richfaces-impl** e atualizar as dependências do projeto original (apontando para essa versão corrigida do **richfaces-impl**), o modo híbrido e satélite do Google Maps voltou a funcionar normalmente.

# Considerações Finais 

Espero que este tutorial tenha auxiliado de alguma forma no aprendizado deste problema entre Google Maps e Richfaces. Como essa lib (Richfaces) é bem antiga, possivelmente a maioria dos projetos já migrou para outras tecnologias.

Se você deseja apoiar o meu trabalho de escrita sobre os mais diversos assuntos de tecnologia, compartilhe meus artigos em suas redes sociais. O objetivo é o de contribuir com o compartilhamento de experiências práticas em desenvolvimento de software e sobre tecnologia com a comunidade.

Valeu pessoal e até o próximo post !! 
