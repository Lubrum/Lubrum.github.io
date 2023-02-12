---
layout: post
title: Como extrair dados de documentos em PDF com o R?
subtitle: Foi realizada a extração de dados de um documento em PDF do Conselho Regional de Fisioterapia e Terapia Ocupacional (CREFITO) do Rio Grande do Sul. Tais dados foram combinados com o mapa do RS. Além dos resultados interessantes, o how-to (como fazer) e ferramentas utilizadas são apresentadas.
date: 2019-09-22 12:00:00 -0300
categories: análise de dados
language: R
author: luciano_brum
---

<h1> Resumo </h1>

Saudações pessoal. A ideia deste post é apresentar a metodologia e os resultados obtidos ao extrair e apresentar os dados de um [documento em formato PDF](http://www.crefito5.org.br/wp-content/uploads/2019/06/total-por-municipio.pdf), disponibilizado pelo [CREFITO (Conselho Regional de Fisioterapia e Terapia Ocupacional)](http://www.crefito5.org.br/). A apresentação dos dados foi realizada por meio de mapas, adquiridos no formato shapefile, produzidos com a linguagem R e bibliotecas auxiliares.

<h1> Obtenção dos dados </h1>

Os dados obtidos foram de um arquivo no formato PDF que informa, por município, o número de Consultórios, Empresas, Entidades Filantrópicas, Fisioterapeutas, Órgãos Públicos e Terapeutas Ocupacionais (CREFITO, 2019). O shapefile do mapa do Rio Grande do Sul (RS) foi obtido através do [site da FEPAM (Fundação Estadual de Proteção Ambiental Henrique Luiz Roessler - RS)](http://www.fepam.rs.gov.br/biblioteca/geo/bases_geo.asp) (FEPAM, 2019). Ainda, foram integrados os dados da estimativa populacional dos municípios do RS, presentes no [Censo Demográfico](https://sidra.ibge.gov.br/tabela/200) disponível no [portal SIDRA (Sistema de Recuperação Automática)](https://sidra.ibge.gov.br) do IBGE (Instituto Brasileiro de Geografia e Estatística) (IBGE, 2019).


<h1> Metodologia </h1>

As seguintes ferramentas e linguagens foram utilizadas para a extração e organização dos dados, realização das análises e geração dos gráficos:

- [Excel](https://support.office.com/pt-br/excel) versão 2013 (MICROSOFT EXCEL, 2019): Programa de planilhas eletrônicas para armazenamento, manipulação e visualização de dados. No presente estudo, foi utilizado para armazenar as informações obtidas da SIDRA sobre a estimativa populacional dos municípios do RS;

- [Github](https://github.com/) (GITHUB, 2019): Plataforma com comunidades de desenvolvedores para descoberta, compartilhamento e criação de códigos e soluções de software com controle de versão. O Github foi utilizado para compartilhar o código utilizado em partes deste trabalho para garantir a reprodutibilidade dos experimentos e isenção na realização das análises dos dados. Os códigos deste trabalho, além da explicação técnica e detalhada do processo, podem ser acessados [neste link](https://github.com/Lubrum/Physiotherapists-Rio-Grande-do-Sul-Brazil).

- [R](https://www.r-project.org/) (R, 2019): Linguagem de Programação utilizada para Ciência de Dados. No presente estudo, o R, em conjunto com o ambiente do RStudio, foi utilizado específicamente para as etapas de extração, importação, organização, limpeza e visualização dos dados;

- [RStudio](https://www.rstudio.com/about/) (RStudio, 2019): Ambiente de Desenvolvimento Integrado que oferece diversas facilidades para a programação na linguagem R.

<h1> Descrição e Análise dos Resultados</h1>

Os dados presentes no PDF estavam no seguinte formato:

<img class="img_content" src="{{ site.baseurl }}/assets/img/post4/figure1.png" alt="Print do arquivo no formato PDF disponibilizado pelo CREFITO.">

Após a importação no ambiente do RStudio (através das funções pdf_text e read_lines do R), os dados ficaram no seguinte formato:

<img class="img_content" src="{{ site.baseurl }}/assets/img/post4/figure2.png" alt="Print dos dados lidos do arquivo PDF do CREFITO no ambiente do RStudio.">

A dificuldade evidente é a de se extrair dados de um PDF que não possui um padrão no formato da tabela. Cada município pode ter ou não, por exemplo, consultórios de fisioterapia, e na ausência desta informação, nada era apresentado na tabela. Outro problema que ficou evidente ao realizar a integração com os dados do shapefile foi a nomeação diferenciada (e incorreta) de algumas cidades. A última página também possuia um formato distinto do restante do PDF, portanto foi necessário dar um tratamento especial para a última página do PDF. Por fim, mesmo com estratégias definidas para uma leitura algoritmica dos dados, as informações de algumas cidades não eram lidas da forma correta. Foi necessário realizar uma correção manual destes registros, através de comparações visuais com o arquivo PDF original. O formato final dos dados no RStudio é apresentado abaixo.

<img class="img_content" src="{{ site.baseurl }}/assets/img/post4/figure3.png" alt="Print dos dados lidos do arquivo PDF após a organização e tratamentos adequados, no formato de dataframe.">

Após uma série de tratamentos nos dados, envolvendo manipulação de strings, uso de estruturas condicionais e de repetição, manipulação de dataframes, integração de dados com shapefiles e conversão do formatos dos dados, foi possível gerar dois mapas sobre:

<h3> 1 - Número de fisioterapeutas nos municípios do Rio Grande do Sul.</h3>

<img class="img_content" src="{{ site.baseurl }}/assets/img/post4/figure5.png" alt="Mapa com cinco categorias de taxas de fisioterapeutas/população, por município, no estado do Rio Grande do Sul, Brasil.">

<h3> 2 - Taxa população/fisioterapeuta nos municípios do Rio Grande do Sul.</h3>

<img class="img_content" src="{{ site.baseurl }}/assets/img/post4/figure4.png" alt="Mapa com cinco categorias de números de fisioterapeutas por município no estado do Rio Grande do Sul, Brasil.">

É possível também gerar outras informações envolvendo o número de terapeutas ocupacionais, consultórios, entidades filantrópicas, órgaõs públicos e empresas, além da relação destas variáveis com o número de fisioterapeutas.

<h1> Considerações Finais </h1>

A ideia do post foi apresentar de forma sucinta um exemplo objetivo do processo de extração de informações de arquivos em formato PDF. Infelizmente, não foi possível realizar todo o processo de forma automática e, ao mesmo tempo, reutilizável para outros casos, porém é um exercício válido pelo processo de aprendizagem e extração de informação. 

Se compararmos a forma de apresentação dos dados nas tabelas do PDF e a forma apresentada nos mapas, podemos dizer que conseguimos comprimir um volume razoável de informações em um mapa e apresentá-las  de forma mais eficiente. Qualquer pessoa pode comparar o dado de um município específico com a região ou outros municípios de forma praticamente instantânea com um mapa, agora imaginem fazer isso no arquivo PDF? (Ctrl-F pra lá e pra cá...). Para melhores resultados, é possível gerar mapas interativos, de forma que o usuário possa analisar o dado de cada município de forma mais individualizada.

Pessoal, então era isso. Abaixo cito as referências utilizadas para estas análises. Obrigado e até o próximo post !! 

<h1> Referências Bibliográficas </h1>

[FEPAM. Biblioteca Digital. Acesso em: 23 set. 2019.](http://www.fepam.rs.gov.br/biblioteca/geo/bases_geo.asp)

[GITHUB. Built for developers. Acesso em: 17 set. 2019.](https://github.com/)

[INSTITUTO BRASILEIRO DE GEOGRAFIA E ESTATÍSTICA. Censo Demográfico. Acesso em: 23 set. 2019.](https://sidra.ibge.gov.br/tabela/200)

[MICROSOFT EXCEL. Excel. Acesso em: 17 set. 2019.](https://products.office.com/pt-br/excel)

[R. The R Project for Statistical Computing. Acesso em: 17 set. 2019.](https://www.r-project.org/)

[RStudio. Why RStudio? Acesso em: 23 set. 2019.](https://www.rstudio.com/about/)