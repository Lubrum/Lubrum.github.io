---
layout: post
title: Investigando Programas de Pós-Graduação em Computação no Brasil
subtitle: Foram coletados dados do site Sucupira e de um arquivo em PDF, processados, organizados e integrados com shapefiles para a geração de mapas para se obter uma visão geral dos Programas de Computação no Brasil atualmente.
date: 2019-11-23 08:00:00 -0300
categories: análise de dados
language: R
author: luciano_brum
---

<h1> Resumo </h1>

Saudações pessoal. 

A ideia deste post é compartilhar com vocês alguns códigos e resultados que gerei ao coletar, processar e analisar os dados dos Programas de Pós-Graduação do Brasil.

<br>

<h1> Metodologia </h1>

As seguintes ferramentas e linguagens foram utilizadas para a produção das análises e geração dos gráficos:
- [R](https://www.r-project.org/) (R, 2019): Linguagem de Programação utilizada para Ciência de Dados. Em nosso caso, utilizada específicamente para as etapas de importação, organização, limpeza e visualização de dados;
- [RStudio](https://https://rstudio.com/) (RStudio, 2019): Ambiente de Programação Integrado para Ciência de Dados, de forma geral. Em nosso caso, foi o ambiente utilizado para programar as soluções com a linguagem R;
- [Excel](https://support.office.com/pt-br/excel) versão 2013 (Microsoft Excel, 2019): Programa de planilhas eletrônicas para armazenamento, manipulação e visualização de dados;
- [Github](https://github.com/) (Github, 2019): Plataforma com comunidades de desenvolvedores para descoberta, compartilhamento e criação de códigos e soluções de software com controle de versão. O Github foi utilizado para compartilhar o código utilizado neste tutorial para garantir a reprodutibilidade dos experimentos e isenção na realização das análises dos dados. Os códigos do projeto podem ser acessados [neste link](https://github.com/Lubrum/Graduating-Programs-Brazil).

<h1> Sobre os dados coletados </h1>

Inicialmente, os dados dos Programas de Pós-Graduação em Computação foram extraídos de um arquivo em PDF, obtido neste [link](https://capes.gov.br/images/stories/download/avaliacao/relatorios-finais-quadrienal-2017/20122017-CIENCIA-DA-COMPUTACAO-quadrienal.pdf). Abaixo, é apresentada a forma que os dados estavam armazenados no PDF.

<br>

<img class="img_content" src="{{ site.baseurl }}/assets/img/post6/figure1.png" alt="Print do PDF com dados dos Programas de Pós-Graduação em Computação do Brasil.">

<br>

Eu tinha como objetivo gerar um vídeo e apresentar a metodologia de como se extrair dados de arquivos em PDF e gerar análises visuais destes dados, e como estudo de caso, os dados dos Programas de Computação. 

Olhem só como ficou o script para realizar a extração do PDF para uma planilha excel... 
Para entender em detalhes a sequência lógica dos comandos e metodologia adotada, acessem meu **Github -> [Lubrum](https://github.com/Lubrum/Graduating-Programs-Brazil)**).

<br>

```R
if (!require(pdftools)) install.packages("pdftools", repos = "http://cran.us.r-project.org")
require(pdftools)

if (!require(dplyr)) install.packages("dplyr", repos = "http://cran.us.r-project.org")
require(dplyr)

if (!require(readr)) install.packages("readr", repos = "http://cran.us.r-project.org")
require(readr)

if (!require(stringi)) install.packages("stringi", repos = "http://cran.us.r-project.org")
require(stringi)

if (!require(stringr)) install.packages("stringr", repos = "http://cran.us.r-project.org")
require(stringr)

if (!require(xlsx)) install.packages("xlsx", repos = "http://cran.us.r-project.org")
require(xlsx)

file_pdf <- pdf_text("../pdf/Evaluation report - Computer science.pdf") %>% read_lines()
file_pdf <- file_pdf[1098:1190]
file_pdf <- file_pdf[-(grep("Coordenação", file_pdf))]
file_pdf <- file_pdf[-(grep("Diretoria", file_pdf))]
file_pdf <- file_pdf[-(24:28)] #Remove UFBA-UNIFACS-UEFS 
file_pdf <- file_pdf[-(34:35)] #Remove some useless info
file_pdf <- file_pdf[-(75:76)] #Remove some useless info
file_pdf <- file_pdf[-(44:46)] #Remove UFSCAR-Sorocaba
file_pdf <- file_pdf[-(47:49)] #Remove USP-ICMC
file_pdf[56]<-gsub("-CA-MP","  ",file_pdf[56]) 
file_pdf[57]<-gsub("-IN-MP","  ",file_pdf[57]) 
file_pdf <- strsplit(file_pdf, "  ")
list_pdf <- 0
a <- 1

for(i in 1:length(file_pdf)){
    info_number <- length(file_pdf[[i]][!stri_isempty(file_pdf[[i]])])
    for(j in 1:info_number){
        list_pdf[a] <- str_trim(file_pdf[[i]][!stri_isempty(file_pdf[[i]])][j])
        a <- a + 1
    }
}

data_pdf <- data.frame(stringsAsFactors = FALSE, "Universidade" = 0, "Curso" = 0, "Nivel" = 0, "Nota" = 0)
a <- 1
for(i in seq(from = 2, to = length(list_pdf), by = 5)){
    data_pdf[a,1] <- list_pdf[i]
    data_pdf[a,2] <- list_pdf[i+1]
    data_pdf[a,3] <- list_pdf[i+2]
    data_pdf[a,4] <- list_pdf[i+3]
    a <- a + 1
}

write.xlsx(data_pdf, file = "../pdf/universities_before.xlsx", col.names = TRUE, row.names = TRUE, append = FALSE)
```

<br>

Porém, descobri posteriormente sobre a existência do site [Sucupira](https://sucupira.capes.gov.br/sucupira/public/consultas/coleta/programa/quantitativos/quantitativoIes.jsf?areaAvaliacao=2&areaConhecimento=10300007). O **Sucupira** possui os dados de todos os Programas de Pós-Graduação do Brasil. Abaixo, uma foto da página dos Programas de Pós em Computação do Brasil. É possível clicar em cada um dos Programas e obter informações mais específicas de cada um.

<br>

<img class="img_content" src="{{ site.baseurl }}/assets/img/post6/figure2.png" alt="Print do site Sucupira com dados dos Programas de Pós-Graduação em Computação do Brasil.">

<br>

Então decidi expandir o horizonte dos meus objetivos. Primeiro realizei a metodologia de extração dos dados do PDF, e na sequência realizei uma validação e integração com os dados da plataforma Sucupira. O processo de integração e validação foi manual, conferindo caso a caso, entre os dados do PDF e os do Sucupira. Dados faltantes foram inseridos na base de dados, que no momento eram planilhas eletrônicas (Excel).

Posteriormente, pensei: já que estou coletando dados dos Programas, por que não coletar informações sobre as linhas de pesquisa, áreas de concentração e temas de pesquisa? Então manualmente acessei o site de cada um dos Programas e gerei uma base de dados com essas informações, também armazenadas em planilhas eletrônicas (Excel).

O resultado deste processo pode ser conferido abaixo.

<br>

<img class="img_content" src="{{ site.baseurl }}/assets/img/post6/figure3.png" alt="Print da planilha Excel com os dados dos Programas de Pós-Graduação em Computação do Brasil.">

<br>

Também foram geradas outras planilhas com dados de área de concentração, linhas de pesquisa, temas de pesquisa e nível do Programa. 

<h1> Resultados </h1>

Com os dados consolidados, foi necessário apenas importar, integrar e visualizar os mesmos. Segue abaixo parte do código para a integração dos dados (sem a importação das bibliotecas) e geração do primeiro mapa com algumas informações dos Programas :D. 

[O shapefile dos mapas pode ser obtido aqui](http://www.uel.br/laboratorios/lapege/pages/base-de-dados-shp-do-brasil.php) e os dados das cidades e estados do Brasil no [Github do kelvins](https://github.com/kelvins/Municipios-Brasileiros/tree/master/csv).

```R
universities <- read.xlsx("csv/universities_after.xlsx", sheetIndex = 1, encoding = "UTF-8")
brazilian_cities <- read.csv("csv/brazilian_cities.csv", sep = ",", stringsAsFactors = FALSE, encoding = "UTF-8")
brazilian_states <- read.csv("csv/brazilian_states.csv",sep = ",", stringsAsFactors = FALSE, encoding = "UTF-8")
research_names <- read.xlsx("csv/research_names.xlsx", sheetIndex = 1, encoding = "UTF-8")
university_research <- read.xlsx("csv/university_research.xlsx", sheetIndex = 1, encoding = "UTF-8")
graduation_level <- read.xlsx("csv/graduation_level.xlsx", sheetIndex = 1, encoding = "UTF-8")
course_name <- read.xlsx("csv/course_name.xlsx", sheetIndex = 1, encoding = "UTF-8")
concentration_area <- read.xlsx("csv/concentration_area.xlsx", sheetIndex = 1, encoding = "UTF-8")
university_concentration_area <- read.xlsx("csv/university_concentration_area.xlsx", sheetIndex = 1, encoding = "UTF-8")
shape_brazil <- readOGR("shapefile/Brazil.shp", "Brazil", use_iconv = TRUE)

all_data <- universities %>% left_join(brazilian_cities, by = c("city_id" = "ibge_code"))
all_data <- all_data %>% left_join(brazilian_states, by = c("state_id" = "state_id"))
all_data <- all_data %>% left_join(university_research, by = c("id" = "university_id"))
all_data <- all_data %>% left_join(research_names, by = c("research_id" = "id"))
all_data <- all_data %>% left_join(graduation_level, by = c("level" = "id"))
all_data <- all_data %>% left_join(course_name, by = c("course" = "id"))
all_data <- all_data %>% left_join(university_concentration_area, by = c("id" = "university_id"))
all_data <- all_data %>% left_join(concentration_area, by = c("concentration_area_id" = "id"))

all_data <- all_data[,-9]
all_data <- all_data[,-13]
all_data <- all_data[,-13]
all_data <- all_data[,-15]
all_data$latitude <- as.numeric(as.character(all_data$latitude))
all_data$longitude <- as.numeric(as.character(all_data$longitude))
all_data$grade <- as.numeric(as.character(all_data$grade))

mybreaks <- as.numeric(c(3, 4, 5, 6, 7))

theme <- theme(axis.text = element_text(size = 16),
              plot.caption = element_text(size = 12, face = "bold"),
              axis.title = element_text(size = 18, face = "bold"),
              legend.title = element_text(size = 18), 
              legend.text = element_text(size = 14),
              legend.key.size = unit(1.0, "cm"),
              legend.key.width = unit(0.4,"cm"),
              text = element_text(color = "#22211d"), 
              legend.background = element_rect(fill = "#dddddd", color = "black"),
              panel.background = element_rect(fill = "#BFD5E3", colour = "#6D9EC1"),
              plot.title = element_text(size = 22, hjust = 0.5, color = "#4e4d47"))

labs <- labs(x = "Longitude", y = "Latitude", 
caption = "Data source: Computer Science Graduating Programs - Sucupira Website") 

all_data_2 <- subset(all_data, all_data$graduation_level == "Mestrado e Doutorado Acadêmicos")

ggplot() + 
geom_polygon(data = shape_brazil, aes(x = long, y = lat, group = group), fill = "white", color = "black", size = 0.15) +
geom_point(data = all_data_2[!duplicated(all_data_2$id),], 
aes(x = longitude, y = latitude, size = grade, color = grade, shape = 19, alpha = I(2/grade))) +
geom_text_repel(data = all_data_2[all_data_2$longitude > -45 & 
!duplicated(all_data_2$code),], 
aes(x = longitude, y = latitude, label = code, size = 6), hjust = 0, 
nudge_x = -34 - subset(all_data_2, all_data_2$longitude > -45 & 
!duplicated(all_data_2$code))$longitude, direction = "y", show.legend = FALSE) +
geom_text_repel(data = all_data_2[all_data_2$longitude <= -45 & 
!duplicated(all_data_2$code),], 
aes(x = longitude, y = latitude, label = code, size = 6), hjust = 1, 
nudge_x = -72 - subset(all_data_2, all_data_2$longitude <= -45 & 
!duplicated(all_data_2$code))$longitude, direction = "y", show.legend = FALSE) + 
scale_shape_identity() +
scale_color_viridis(name = "Conceito", breaks = mybreaks) +
scale_size_continuous(name = "Conceito", breaks = mybreaks) +
coord_map() + 
guides(colour = guide_legend(), size = guide_legend()) +
ggtitle("Programas de Pós-Graduação com Mestrado e Doutorado") +
labs + theme
```
<br>

<img class="img_content" src="{{ site.baseurl }}/assets/img/post6/figure4.png" alt="Mapa com os Programas de Pós-Graduação em Computação do Brasil com ambos mestrado e doutorado no mesmo programa, representados com pontos coloridos.">
 
Também é possível gerar gifs como a apresentada abaixo, mostrando o surgimento dos Programas com o passar dos anos no Brasil.

<img class="img_content" src="{{ site.baseurl }}/assets/img/post6/figure5.gif" alt="Mapa animado com o surgimento, com o passar dos anos, dos Programas de Pós-Graduação em Computação do Brasil, representados com pontos coloridos.">

<h1> Próximos passos </h1>

No momento é possível fazer os seguintes filtros por Programa de Pós-Graduação em Computação:
- Programas por conceito da CAPES;
- Programas por região geográfica (cidade ou estado);
- Programas por nível de Pós (Mestrado, Doutorado ou Mestrado Profissional);
- Programas por área de concentração;
- Programas por tema de pesquisa;
- Programas por ano ou período de criação;

A ideia para a sequência do projeto, além de compartilhar estes dados e informações, é criar uma maneira de disponibilizar essas informações em uma solução online, com interface amigável com o usuário, para o mesmo selecionar os filtros e dados/informações de seu interesse. Uma ferramenta direcionada para graduados com interesse no ingresso na Pós-Graduação. Também há a possibilidade de agregar mais informações por Programa, como dados dos pesquisadores, alunos e respectivas publicações. Para esta última proposta, precisarei do auxílio da comunidade para esta etapa, pois são MUITOS dados para serem coletados, integrados, e mantidos. O projeto inteiro está em meu Github, e quem tiver interesse em colaborar com o projeto, é só entrar em contato!! :-)

<h1> Considerações Finais </h1>

Bom pessoal, então era isso. 

Quis trazer para vocês um pouco de ideias, códigos e resultados, com base em um problema que enfrentei em um ponto da minha vida, e muitos meses depois vislumbrei essa possibilidade de solução. Compartilhei a ideia com vocês, agora é colocar a mão na massa e dar a sequência. 

Para os interessados em contribuir, servirá como experiência prática com o R e tecnologias web, processamento e análise de dados, estatística, visualização de dados, um pouco de Git e talvez outras tecnologias não vislumbradas no momento. Também é possível agregar a participação de vocês neste projeto nos seus próprios portfólios pessoais, para apresentar no currículo ou em entrevistas de emprego. Enfim, muito bônus mas também respectivo ônus.

Obrigado e até o próximo post !! 

<div class="skills">
    <hr class="hr-text" data-content="############">
</div>

<h1> Referências Bibliográficas </h1>

[Github. Built for developers. Acesso em: 08 set. 2019.](https://github.com/)

[Microsoft Excel. Excel. Acesso em: 08 set. 2019.](https://products.office.com/pt-br/excel)

[R. The R Project for Statistical Computing. Acesso em: 08 set. 2019.](https://www.r-project.org/)

[RStudio. RStudio about. Acesso em: 23 nov. 2019.](https://rstudio.com/about/)