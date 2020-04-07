---
layout: post
title: Investigando Programas de Pós-Graduação em Computação no Brasil (PT 2)
subtitle: É apresentado o passo-a-passo necessário para hospedar um App desenvolvido com o R e o shiny de forma gratuita com o shinyapps.io, além de demonstrar funcionalidades específicas de UI e server do shiny.
date: 2020-03-23 23:55:00 -0300
categories: análise de dados
language: R
author: luciano_brum
---

<h1> Resumo </h1>

Saudações pessoal. 

A ideia deste post é compartilhar com vocês uma metodologia de como hospedar uma aplicação desenvolvida com o R no shinyapps.io. Por conveniência, vou ilustrar o tutorial com base no Sistema Operacional Ubuntu versão 19.10 (versão lançada em 17 Out. 2019). 

Os dados utilizados como base para este app são os dos Programas de Pós-Graduação em Computação do Brasil, [já trabalhados anteriormente neste post](https://lubrum.github.io/2019/11/23/Programas-Pos-Graduacao-Brasil).

O que eu preciso para reproduzir este experimento? 

- Linguagem R v. 3.6.2;
- RStudio v. 1.2.5001 (IDE opcional);
- Conjunto de planilhas com os dados dos Programas de Pós-Graduação em Computação do Brasil;
- Uma conta no shinyapps.io; 
- Conhecimentos básicos de lógica e programação, estruturas de dados e R.

<h1> Tópicos </h1>

  - Quais informações vamos trazer aos usuários?

  - Coleta e organização dos dados;

  - Elaboração da Interface do Usuário (User Interface - UI);

  - Elaboração da lógica do servidor (Server);

  - Execução do app na própria máquina (localmente);

  - Publicando o app no shinyapps.io;

<br>

<h1> Quais informações vamos trazer aos usuários? </h1>

Não adianta avançar para os tópicos técnicos do desenvolvimento sem antes ter clareza do propósito deste app. A idéia é fornecer um meio de consulta aos locais do Brasil onde existem Programas de Pós-Graduação em Computação com filtros para questões específicas, como tema de pesquisa, localização, conceito da CAPES, nível do programa, entre outros. Com os dados disponíveis também é possível gerar algumas informações estatísticas e históricas destes Programas. 

Com base nos dados disponíveis, foram elencadas as seguintes propostas de informações disponibilizadas aos usuários do app: 

- Localização (GPS) dos Programas de Pós-Graduação em Computação do Brasil, com filtros por Unidade da Federação (UF), universidade, linha de pesquisa e conceito da CAPES (mapa);

- Quantitativo de Programas por UF (gráfico de barras);

- Total de Programas com os top 10 temas de pesquisa (gráfico de barras);

- Número de Programas com determinado tema de pesquisa com o passar dos anos (possível comparação com outro tema) (gráfico de linhas);

<h1> Coleta e Organização dos Dados </h1>

<img class="img_content" src="{{ site.baseurl }}/assets/img/post7/figure1.png" alt="Print da página inicial do shinyapps.io.">

Na Parte 1, os dados dos Programas foram coletados e salvos em um arquivo no formato csv. Tais dados foram obtidos de dois locais, entre 10/2019 e 01/2020: 

- [Sucupira](https://sucupira.capes.gov.br/sucupira/public/consultas/coleta/programa/quantitativos/quantitativoIes.jsf?areaAvaliacao=2&areaConhecimento=10300007);

- Página Oficial de cada um dos Programas de Pós-Graduação em Computação do Brasil;

Esses dados foram coletados manualmente, organizados e salvos em arquivos csv em um formato normalizado (com id e fk). [Para maiores detalhes deste processo, acesse a parte 1 deste projeto](https://lubrum.github.io/2019/11/23/Programas-Pos-Graduacao-Brasil).

Abaixo são apresentados os pacotes utilizados na primeira parte do tutorial. O [código fonte completo está disponível no Github](https://github.com/Lubrum/Graduating-Programs-Brazil/tree/master/R). Observe com atenção a parte em **other attached packages**, onde são descritos os pacotes instalados e importados.

```R
sessionInfo()

R version 3.6.2 (2019-12-12)
Platform: x86_64-pc-linux-gnu (64-bit)
Running under: Ubuntu 19.10

Matrix products: default
BLAS:   /usr/lib/x86_64-linux-gnu/blas/libblas.so.3.8.0
LAPACK: /usr/lib/x86_64-linux-gnu/lapack/liblapack.so.3.8.0

locale:
 [1] LC_CTYPE=pt_BR.UTF-8          LC_NUMERIC=C                  LC_TIME=pt_BR.UTF-8          
 [4] LC_COLLATE=en_US.UTF-8        LC_MONETARY=pt_BR.UTF-8       LC_MESSAGES=en_US.UTF-8      
 [7] LC_PAPER=pt_BR.UTF-8          LC_NAME=pt_BR.UTF-8           LC_ADDRESS=pt_BR.UTF-8       
[10] LC_TELEPHONE=pt_BR.UTF-8      LC_MEASUREMENT=pt_BR.UTF-8    LC_IDENTIFICATION=pt_BR.UTF-8

attached base packages:
[1] stats     graphics  grDevices utils     datasets  methods   base     

other attached packages:
[1] forcats_0.5.0  dplyr_0.8.5    maptools_0.9-9 ggplot2_3.3.0  rgeos_0.5-2    rgdal_1.4-8    sp_1.4-1      
[8] xlsx_0.6.3    

loaded via a namespace (and not attached):
 [1] Rcpp_1.0.3       rstudioapi_0.11  magrittr_1.5     tidyselect_1.0.0 munsell_0.5.0    colorspace_1.4-1
 [7] lattice_0.20-38  R6_2.4.1         rlang_0.4.5      tools_3.6.2      grid_3.6.2       gtable_0.3.0    
[13] withr_2.1.2      assertthat_0.2.1 tibble_2.1.3     lifecycle_0.2.0  crayon_1.3.4     rJava_0.9-11    
[19] purrr_0.3.3      xlsxjars_0.6.1   glue_1.3.2       compiler_3.6.2   pillar_1.4.3     scales_1.1.0    
[25] foreign_0.8-74   pkgconfig_2.0.3 
```

Inicialmente, vamos importar e organizar esses dados para obter as informações necessárias para a UI. 

```R
# reading data
universities <- read.xlsx("csv/universities_after.xlsx", stringsAsFactors = FALSE, sheetIndex = 1, encoding = "UTF-8")
brazilian_cities <- read.csv("csv/brazilian_cities.csv", sep = ",", stringsAsFactors = FALSE, encoding = "UTF-8")
brazilian_states <- read.csv("csv/brazilian_states.csv", sep = ",", stringsAsFactors = FALSE, encoding = "UTF-8")
research_names <- read.xlsx("csv/research_names.xlsx", sheetIndex = 1, encoding = "UTF-8")
university_research <- read.xlsx("csv/university_research.xlsx", sheetIndex = 1, encoding = "UTF-8")
graduation_level <- read.xlsx("csv/graduation_level.xlsx", sheetIndex = 1, encoding = "UTF-8")
course_name <- read.xlsx("csv/course_name.xlsx", sheetIndex = 1, encoding = "UTF-8")
concentration_area <- read.xlsx("csv/concentration_area.xlsx", sheetIndex = 1, encoding = "UTF-8")
university_concentration_area <- read.xlsx("csv/university_concentration_area.xlsx", sheetIndex = 1, encoding = "UTF-8")

# joining data into one dataframe
all_data <- inner_join(universities, brazilian_cities, by = c("city_id" = "ibge_code"))
all_data <- inner_join(all_data, brazilian_states, by = c("state_id" = "state_id"))
all_data <- inner_join(all_data, university_research, by = c("id" = "university_id"))
all_data <- inner_join(all_data, research_names, by = c("research_id" = "id"))
all_data <- inner_join(all_data, graduation_level, by = c("level" = "id"))
all_data <- inner_join(all_data, course_name, by = c("course" = "id"))
all_data <- inner_join(all_data, university_concentration_area, by = c("id" = "university_id"))
all_data <- inner_join(all_data, concentration_area, by = c("concentration_area_id" = "id"))

# cleaning and preparing data
all_data <- all_data[,-9]
all_data <- all_data[,-14]
all_data <- all_data[,-16]
all_data <- all_data[,-19]
all_data$latitude <- as.numeric(as.character(all_data$latitude))
all_data$longitude <- as.numeric(as.character(all_data$longitude))
all_data$grade <- as.numeric(as.character(all_data$grade))

# reading shapefile 
shape_brazil <- readOGR("shapefile/Brazil.shp", "Brazil", encoding = "latin1")

# transforming shapefile to dataframe format
shape_brazil$id <- rownames(as.data.frame(shape_brazil))
coordinates_brazil <- fortify(shape_brazil, region = "id") # only coordinates
shape_brasil_df <- merge(coordinates_brazil, shape_brazil, by = "id", type = 'left') # add remaining attributes
```

Com os dados importados e organizados em dataframes, agora vamos criar dataframes específicos para cada um dos gráficos na UI. Isso fará com que a aplicação consuma mais memória, mas por outro lado tornará a lógica de processamento e acesso aos dados mais simples.

```R
# dados agrupados por UF e id, ordem decrescente de n° de programas por UF
barplot_1_data <- as.data.frame(
  all_data %>%
  group_by(state_code) %>%
  summarise(id = n_distinct(id)) %>%
  arrange(-id) %>%
  mutate(state_code = fct_reorder(state_code, -id))
)

# dados agrupados por tópico de pesquisa e id, apenas os top 10 em ordem decrescente de n° de programas por tópico
barplot_2_data <- as.data.frame(
  all_data %>%
  group_by(research_name) %>%
  summarise(id = n_distinct(id)) %>%
  arrange(-id) %>%
  mutate(research_name = fct_reorder(research_name, -id)) %>%
  filter( id > 10 )
)

# dados agrupados por tópico de pesquisa e ano, ordenados por ano, agregando o n° de programas por tópico de pesquisa por ano
lineplot_1_data <- as.data.frame(
  all_data %>%
  group_by(research_name, year) %>%
  summarise(id = n_distinct(id)) %>%
  arrange(year) %>%
  mutate( cumsum = cumsum(id))
)
```

O código acima (em lineplot_1_data) tem um problema: é feito o agrupamento do n° de Programas por linha de pesquisa e por ano, porém não são gerados registros para os anos em que não houve variação do n° de Programas. Abaixo um exemplo:

1995 surgiu 1 novo tópico de pesquisa em IA e havia 12 tópicos de pesquisa em IA. Portanto, 1995 passou a ter 13 Programas em IA.

1996 surgiram 2 novos tópicos de pesquisa em IA e havia 13 tópicos de pesquisa em IA. Portanto, 1995 passou a ter 15 Programas em IA.

1997 não sirgiu nenhum novo tópico em IA. Nesse caso, não é gerado registro para 1997, causando distorções nos gráficos.

O algoritmo abaixo foi feito para gerar registros nos anos em que o número de tópicos de pesquisa não variou, para todos anos e tópicos de pesquisa.

```R
# gerando registros para os anos sem variação no n° de programas para cada tópico de pesquisa
for( i in 1:length(unique(lineplot_1_data$research_name)) ) {
  name <- as.character(unique(lineplot_1_data$research_name)[i])
  last_year <- 0
  last_cumsum <- 0
  for (j in min(lineplot_1_data$year):max(lineplot_1_data$year) ) {
    if (j %in% lineplot_1_data$year[lineplot_1_data$research_name == name]){
      last_year <- j
      last_cumsum <- lineplot_1_data$cumsum[lineplot_1_data$research_name == name & lineplot_1_data$year == j]
    } 
    else {
      lineplot_1_data <- rbind.data.frame(lineplot_1_data, c(name, j, 0, last_cumsum),stringsAsFactors = FALSE)
    }
  }
}

lineplot_1_data$year <- as.numeric(lineplot_1_data$year)
lineplot_1_data$id <- as.numeric(lineplot_1_data$id)
lineplot_1_data$cumsum <- as.numeric(lineplot_1_data$cumsum)
lineplot_1_data <- lineplot_1_data[order(lineplot_1_data$year),]
```

Também foram realizadas customizações específicas para cada gráfico que será gerado na UI. Abaixo é apresentado o código para customizar o tema e layout dos gráficos. O nome das variáveis já indica o tipo de gráfico que será aplicado.

```R
map_theme <- theme(
  axis.text = element_text(size = 16),
  plot.caption = element_text(size = 12, face = "bold"),
  axis.title = element_text(size = 18, face = "bold"),
  legend.title = element_text(size = 18), 
  legend.text = element_text(size = 14),
  legend.key.size = unit(1.0, "cm"),
  legend.key.width = unit(0.4,"cm"),
  text = element_text(color = "#22211d"), 
  legend.background = element_rect(fill = "#dddddd", color = "black"),
  panel.background = element_rect(fill = "#BFD5E3", colour = "#6D9EC1"),
  plot.title = element_text(size = 22, hjust = 0.5, color = "#4e4d47")
)

map_labs <- labs(
  x = "Longitude", 
  y = "Latitude", 
  caption = "Fonte: Programas de Pós-Graduação em Computação - Plataforma Sucupira."
) 

geral_1_theme <- theme(
  axis.text = element_text(size = 12, color = "#cccccc"),
  axis.title = element_text(size = 16, face = "bold", color = "#cccccc"),
  axis.ticks = element_line(colour = "#cccccc"),
  axis.ticks.length = unit(0.5, "cm"),
  axis.ticks.margin = unit(0.8, "cm"),
  plot.caption = element_text(size = 12, face = "bold", color = "#cccccc"),
  plot.title = element_text(size = 22, hjust = 0.5, color = "#ffffff"),
  plot.background = element_rect(fill = "black"),
  panel.grid.major = element_blank(),
  panel.grid.minor = element_blank(),
  panel.background = element_rect(fill = 'black'),
  legend.background = element_rect(fill = "black", color = NA),
  legend.key = element_rect(color = "gray", fill = "black"),
  text = element_text(color = "#cccccc")
)

barplot_1_labs <- labs(
  x = "\nEstados do Brasil", 
  y = "\nNúmero de Programas\n", 
  caption = "\nFonte: Programas de Pós-Graduação em Computação - Plataforma Sucupira."
) 

barplot_2_labs <- labs(
  y = "Número de Programas de Pós-Graduação", 
  caption = "\nFonte: Programas de Pós-Graduação em Computação - Plataforma Sucupira."
) 

lineplot_1_labs <- labs(
  x = "\nAnos", 
  y = "Número de Programas\n", 
  caption = "\nFonte: Programas de Pós-Graduação em Computação - Plataforma Sucupira."
) 
```

Agora salvamos nosso ambiente (variáveis, dados e pacotes) em um arquivo RData. Depois ele será importado no servidor da aplicação (entenda o servidor/server como o backend, responsável pela lógica do app, processamento de inputs e geração dos gráficos com as informações processadas).

```R
save.image(file = "R/data/all_data.RData")
```

<br>

<h1> Elaboração da Interface do Usuário (User Interface - UI) </h1>

Agora devemos preparar a UI com os gráficos para o usuário. Abaixo o código utilizado para gerar a UI.

```R
if (!require(shiny)) install.packages("shiny")
library(shiny)

if (!require(shinydashboard)) install.packages("shinydashboard")
library(shinydashboard)

load(file = "data/all_data.RData")

ui <- navbarPage(
  "Data Science Broom",
  tabPanel(
    "Mapas",
    fluidPage(
      shinyjs::useShinyjs(),
      titlePanel("Programas de Pós-Graduação em Computação - Brasil"),
      sidebarLayout(
        sidebarPanel(
          selectInput(
            "Input_State",
            "Estado",
            choices = c("Todos", sort(unique(all_data$state_name))),
            selected = "Todos"
          ),
          selectInput(
            "Input_University",
            "Universidade",
            choices = c("Todas", as.character(sort(unique(all_data$university)))),
            selected = "Todas"
          ),
          selectInput(
            "Input_Research_Topic",
            "Assunto de Pesquisa",
            choices = c("Todos", as.character(sort(unique(all_data$research_name)))),
            selected = "Todos"
          ),
          sliderInput(
            "Input_grade_range",
            label = "Notas dos Programas:",
            min = 3,
            max = 7,
            value = c(3, 7)
          )
        ),
        mainPanel(plotOutput("map", height = 700, width = "100%"))
      )
    )
  ),
  tabPanel(
    "Gráficos",
    dashboardPage(
      dashboardHeader(disable = TRUE),
      dashboardSidebar(collapsed = TRUE,
                       sidebarMenu(
                         menuItem(
                           "Dashboard",
                           tabName = "dashboard",
                           icon = icon("dashboard")
                         )
                       )),
      dashboardBody(tags$head(tags$style(
        HTML('.content-wrapper, .right-side {
             background-color: #000000;
             }'
        )
      )),
      tabItems(
        tabItem(tabName = "dashboard",
                fluidRow(
                  box(
                    background = "black",
                    title = "Programas de Pós-Graduação em Computação por Estado",
                    solidHeader = TRUE,
                    collapsible = TRUE,
                    plotOutput("bar_1"),
                    width = 6
                  )
                  ,
                  box(
                    background = "black",
                    title = "Programas de Pós-Graduação em Computação por Tópico de Pesquisa",
                    solidHeader = TRUE,
                    collapsible = TRUE,
                    plotOutput("bar_2"),
                    width = 6
                  )
                ),
                fluidRow(
                  box(
                    background = "black",
                    title = "Histórico dos Programas de Pós-Graduação em Computação por Tópico de Pesquisa",
                    solidHeader = TRUE,
                    collapsible = TRUE,
                    "Observação: o ano apresentado é o de surgimento do Programa que originou
                    o Tópico de Pesquisa. Não é o ano de surgimento do Tópico de Pesquisa em si,
                    já que a informação dos tópicos de pesquisa não foi coletada do site da
                    CAPES e sim da página de cada Programa de Pós-Graduação em Computação do
                    Brasil.",
                    br(),br(),br(),
                    plotOutput("line_1"),
                    width = 12
                  ),
                  box(
                    background = "black",
                    box(
                      background = "black",
                      selectInput(
                        "Input_Research_1",
                        "Tópico de Pesquisa 1",
                        choices = sort(unique(lineplot_1_data$research_name)),
                        selected = lineplot_1_data$research_name[1]
                      )
                    ),
                    box(
                      background = "black",
                      selectInput(
                        "Input_Research_2",
                        "Tópico de Pesquisa 2",
                        choices = c("Nenhum", as.character(sort(unique(lineplot_1_data$research_name)))),
                        selected = "Nenhum"
                      )
                    ),
                    width = 12
                  )
                ))
      ))
    )
  )
)
```

Inicialmente são instalados e importados os pacotes shiny e shinydashboards. Na sequência, os dados/variáveis/pacotes que organizamos anteriormente são carregados com o comando **load**.
A variável **ui** será utilizada para gerar a interface gráfica para o usuário.
Teremos em nossa interface duas abas: **Mapas** e **Gráficos**, definidas nos comandos **tabPanel**. A aba **Mapas** permitirá ao usuário fazer consultas com o resultado exibido em mapas e a aba **Gráficos** permitirá ao usuário visualizar estatísticas gerais dos Programas em gráficos de barras e linhas.

Aba **Mapas**: essa tela possuirá um componente sidebar (barra lateral) onde serão inseridos os inputs (entrada de dados) do usuário para a geração dos mapas e o restante da tela é onde o mapa será apresentado. **titlePanel** é o título da barra lateral, **sidebarLayout** é o layout da página (com barra lateral) e **sidebarPanel** terá os componentes que desejamos para essa barra lateral.

<br>

<h1> Configurando o pacote rsconnect </h1>

Agora precisamos fornecer a autorização para o pacote rsconnect fazer o deploy de nossos apps. Para isso:

- Na página inicial do shinyapps.io, clique no botão superior direito referente à conta e clique em <b>tokens</b>.

- Clique no botão <b>show</b>. A aplicação vai apresentar o comando que você precisar executar localmente no seu RStudio/R para habilitar o deploy dos apps com o rsconnect. Clique em <b>Copy to clipboard</b> e cole o comando no seu RStudio e execute-o. O comando deve ser semelhante ao código abaixo.

```R
rsconnect::setAccountInfo(name='NOME-DA-MINHA-CONTA',
			  token='MEU-TOKEN-SUPER-HIPER-MEGA-SECRETO',
			  secret='SEGREDO-MAIS-SECRETO-DE-TODOS')
```

Se aparecer alguma mensagem de erro como:

```R
Error: HTTP 401
GET https://api.shinyapps.io/v1/users/current/
bad signature
```
É porque você não copiou o token da forma correta.

Se tudo ocorrer da forma prevista, não será exibido nenhum erro ou mensagem.

<br>

<h1> Criando um App de Exemplo </h1>

O código abaixo, um app de exemplo utilizando o shiny, foi retirado do próprio [tutorial de instalação e configuração do shinyapps.io](https://shiny.rstudio.com/articles/shinyapps.html). 

Crie os arquivos <b>server.R e ui.R</b> em um diretório qualquer e adicionem o seguinte conteúdo nestes arquivos.

<b>server.R</b>

```R
library(shiny)
library(ggplot2)

function(input, output) {

  dataset <- reactive({
    diamonds[sample(nrow(diamonds), input$sampleSize),]
  })

  output$plot <- renderPlot({

    p <- ggplot(dataset(), aes_string(x=input$x, y=input$y)) + geom_point()

    if (input$color != 'None')
      p <- p + aes_string(color=input$color)

    facets <- paste(input$facet_row, '~', input$facet_col)
    if (facets != '. ~ .')
      p <- p + facet_grid(facets)

    if (input$jitter)
      p <- p + geom_jitter()
    if (input$smooth)
      p <- p + geom_smooth()

    print(p)

  }, height=700)

}
```

<b>ui.R</b>

```R
library(shiny)
library(ggplot2)

dataset <- diamonds

fluidPage(

  titlePanel("Diamonds Explorer"),

  sidebarPanel(

    sliderInput('sampleSize', 'Sample Size', min=1, max=nrow(dataset),
                value=min(1000, nrow(dataset)), step=500, round=0),

    selectInput('x', 'X', names(dataset)),
    selectInput('y', 'Y', names(dataset), names(dataset)[[2]]),
    selectInput('color', 'Color', c('None', names(dataset))),

    checkboxInput('jitter', 'Jitter'),
    checkboxInput('smooth', 'Smooth'),

    selectInput('facet_row', 'Facet Row', c(None='.', names(dataset))),
    selectInput('facet_col', 'Facet Column', c(None='.', names(dataset)))
  ),

  mainPanel(
    plotOutput('plot')
  )
)
```

Certifique-se de que o <b>shiny</b> e o <b>ggplot2</b> estão instalados.Para executar o app localmente e verificar se está tudo ok, use os comandos abaixo no RStudio. Você deve estar no mesmo diretório dos arquivos para o comando runApp() funcionar.

```R
library(shiny)
runApp()
```

Se tudo funcionou, basta fazer o Deploy da aplicação. Tão simples como os comandos abaixo:

```R
library(rsconnect)
deployApp()
```

O navegador padrão da sua máquina será aberto exibindo a aplicação online funcionando bonitinho :-). Deve ser semelhante com a imagem abaixo.

<img class="img_content" src="{{ site.baseurl }}/assets/img/post7/figure3.png" alt="Print da tela com a aplicação em execução no shinyapps.io.">

<br>

<h3> Em caso de erros... </h3>

Se surgir algum erro estranho, é provável que a pasta não tenha as permissões adequadas. Para isso, use o comando abaixo no terminal do ubuntu:

```console
chmod 777 caminho/completo/do/diretório/com/o/app
```

Obviamente, isso não é correto de numerosas formas, já que qualquer usuário poderá ler, modificar e executar o conteúdo da pasta. Para fins de teste e confirmar se a aplicação está funcionando, é uma abordagem válida. Porém, o correto é definir permissões com restrições e para os usuários adequados. Este é assunto já foi amplamente discutido em diversos fóruns, basta pesquisar um pouco sobre chmod e permissões no Ubuntu. Uma alternativa menos perigosa (permissão total para o usuário local apenas, para o diretório indicado e subdiretórios):

```console
chmod -R 700 caminho/completo/do/diretório/com/o/app
```
<br>
<h1> Checando a aplicação no shinyapps.io </h1>

É possível ter um nível de controle do serviço responsável pelo app no shinyapps.io. Algumas possibilidades:

- É possível ter uma visão geral do app, no sentido de tempo online, acessos, datas de criação, atualização, tamanho da aplicação e outros.

- Também é permitido analisar métricas computacionais da aplicação, como uso de memória, CPU, uso de rede e conexões simultâneas. 

- Na versão paga, é possível customizar a URL. 

- É possível ter fácil acesso aos logs da aplicação, sendo simples o processo de checar se ocorreu algum erro inesperado ao fazer o Deploy.

Para mais detalhes, acesse [https://shiny.rstudio.com/articles/shinyapps.html](https://shiny.rstudio.com/articles/shinyapps.html).

<br>

<h1> Considerações Finais </h1>

Bom pessoal, a ideia era apresentar um passo a passo bem resumido e sucinto sobre o processo de Deploy de um app em R com o shinyapps.io. Boa parte do tutorial já é disponibilizado no site do shinyapps.io, porém nem todas as pessoas possuem facilidade com o idioma em inglês.

O próximo post será dedicado em apresentar a utilização do [RStudio Server Edição Open Source](https://rstudio.com/products/rstudio/#rstudio-server) para o seu app, com um exemplo funcional localmente na máquina.

Valeu e até o próximo post !! :-)

<div class="skills">
    <hr class="hr-text" data-content="############">
</div>