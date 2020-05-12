---
layout: post
title: Análise Exploratória de Dados (EDA) e Técnicas Estatísticas com o R
subtitle: É apresentado um exemplo completo de EDA com dados de estudantes de disciplinas de Desenho Técnico de uma universidade X. Também são utilizadas alguns métodos estatísticos como anova, kruskal wallis, teste t e outros.
date: 2020-05-05 23:55:00 -0300
categories: análise de dados
language: R
author: luciano_brum
---

<h2> Resumo </h2>

Saudações pessoal. 

A ideia deste post é compartilhar com vocês um exemplo completo de Análise Exploratória de Dados (em inglês é EDA - Exploratory Data Analysis). Também são aplicadas algumas técnicas estatísticas. Este trabalho foi desenvolvido no Sistema Operacional Ubuntu versão 18.10 LTS. 

<h2> Tópicos </h2>

  - [Parte I - Fonte dos dados](#parte-i---fonte-dos-dados);

  - [Parte II - Análise Exploratória de Dados do primeiro dataset](#parte-ii---análise-exploratória-de-dados-do-primeiro-dataset);

  - [Parte III - Estatísticas do 1° dataset](#parte-iii---estatísticas-do-primeiro-dataset);

  - [Parte IV - Análise Exploratória de Dados do segundo dataset](#parte-iv---análise-exploratória-de-dados-do-segundo-dataset);

  - [Parte V - Estatísticas do 2° dataset](#parte-v---estatísticas-do-segundo-dataset);

  - [Considerações finais](#considerações-finais);

<br>

# Parte I - Fonte dos dados

Os dados utilizados como base para este trabalho são os de estudantes de disciplinas de Desenho Técnico de uma IES (Instituição de Ensino Superior), [e podem ser obtidos pelo meu Github](https://github.com/Lubrum/Data_Analysis-Technical-Drawing). 

Dois datasets foram fornecidos:

1 - Dados de estudantes separados por curso de graduação, de todos professores que ministraram a disciplina (sem informação credencial de estudantes e sem identificação de professores).

2 - Dados de estudantes da turma de um professor específico da disciplina.

Vamos iniciar com a análise do primeiro dataset.

## Parte II - Análise Exploratória de Dados do Primeiro Dataset 

Temos 16 variáveis (ou colunas) por aluno:

- Nome do aluno;
- Identidade estudantil (matrícula);
- Código do curso;
- Ano;
- Semestre;
- Código de disciplina;
- Nome da disciplina;
- Número de créditos (1 crédito = 15 horas);
- Nota final;
- Situação do aluno;
- Carga horária total em horas;
- Tipo de Admissão na Universidade;
- Ano de admissão;
- Tipo de evasão (incluindo alunos matriculados);
- Ano de evasão (se aplicável);
- Sexo;

Todas as informações sensíveis dos conjuntos de dados foram removidas antes de iniciar essa análise, como os nomes dos alunos. A identificação dos alunos foi criptografada para preservar os dados sensíveis da universidade.

Inicialmente, vamos importar os pacotes necessários para a execução de nossas análises.

<br />

```R
if (!require(xlsx)) install.packages("xlsx")
library(xlsx)

if (!require(ggplot2)) install.packages("ggplot2")
library(ggplot2)

if(!require(RColorBrewer)) install.packages("RColorBrewer")
library(RColorBrewer)

if(!require(viridis)) install.packages("viridis")
library(viridis)

if (!require(dplyr)) install.packages("dplyr")
library(dplyr)

if (!require(matlab)) install.packages("matlab")
library(matlab)

if (!require(car)) install.packages("car")
library(car)

if (!require(lattice)) install.packages("lattice")
library(lattice)

if (!require(FSA))install.packages("FSA")
library(FSA)

if (!require(rcompanion)) install.packages("rcompanion")
library(rcompanion)

if (!require(coin)) install.packages("coin")
library(coin)

if (!require(gridExtra)) install.packages("gridExtra")
library(gridExtra)

if (!require(grid)) install.packages("grid")
library(grid)

if (!require(reshape)) install.packages("reshape")
library(reshape)

if (!require(extrafont)) install.packages("extrafont")
library(extrafont)

if (!require(viridis)) install.packages("viridis")
library(viridis)

if (!require(nortest)) install.packages("nortest")
library(nortest)

if (!require(cowplot)) install.packages("cowplot")
library(cowplot)

if (!require(ggpubr)) install.packages("ggpubr")
library(ggpubr)

if (!require(ggExtra)) install.packages("ggExtra")
library(ggExtra)
```

<br />

Inicialmente, vamos importar os dados de cada uma das planilhas com dados.

<br />

```R
# importação dos dados
BAEA_path <- "../csv/Technical_Drawing_I_II - BAEA.csv"
BAEE_path <- "../csv/Technical_Drawing_I_II - BAEE.csv"
BAEC_path <- "../csv/Technical_Drawing_I_II - BAEC.csv"
BAEP_path <- "../csv/Technical_Drawing_I_II - BAEP.csv"
BAEQ_path <- "../csv/Technical_Drawing_I_II - BAEQ.csv"
BALF_path <- "../csv/Technical_Drawing_I_II - BALF.csv"

BAEA <- read.csv(BAEA_path, sep = ";", stringsAsFactors = FALSE, encoding = "latin1")
BAEE <- read.csv(BAEE_path, sep = ";", stringsAsFactors = FALSE, encoding = "latin1")
BAEC <- read.csv(BAEC_path, sep = ";", stringsAsFactors = FALSE, encoding = "latin1")
BAEP <- read.csv(BAEP_path, sep = ";", stringsAsFactors = FALSE, encoding = "latin1")
BAEQ <- read.csv(BAEQ_path, sep = ";", stringsAsFactors = FALSE, encoding = "latin1")
BALF <- read.csv(BALF_path, sep = ";", stringsAsFactors = FALSE, encoding = "latin1")
```

<br />
O que significa cada Sigla?
- BAEE: Bacharelado em Engenharia de Energias Renováveis e Ambiente;
- BAEA: Bacharelado em Engenharia de Alimentos;
- BAEC: Bacharelado em Engenharia de Computação;
- BAEP: Bacharelado em Engenharia de Produção;
- BAEQ: Bacharelado em Engenharia Química;
- BALF: Licenciatura em Física;

Com os dados importados e organizados em dataframes, podemos observar que o dataframe BAEA possui uma coluna de informações a mais. É possível verificar com uma rápida visualização no RStudio, no ***Global Environment***. Como a informação não possui contexto que agregue em nossas análises, vamos removê-la.

<br />

```R
BAEA <- BAEA[,-10]
```

<br />

Vamos checar o nome das colunas de cada dataframe, para confirmar se são as mesmas informações.

<br />

```R
> colnames(BAEA) == colnames(BAEE)
 [1] TRUE TRUE TRUE TRUE TRUE TRUE TRUE TRUE TRUE TRUE TRUE TRUE TRUE TRUE TRUE
> colnames(BAEA) == colnames(BAEC)
 [1]  TRUE  TRUE  TRUE  TRUE  TRUE  TRUE  TRUE  TRUE  TRUE FALSE  TRUE  TRUE  TRUE  TRUE  TRUE
> colnames(BAEA) == colnames(BAEP)
 [1] TRUE TRUE TRUE TRUE TRUE TRUE TRUE TRUE TRUE TRUE TRUE TRUE TRUE TRUE TRUE
> colnames(BAEA) == colnames(BAEQ)
 [1] TRUE TRUE TRUE TRUE TRUE TRUE TRUE TRUE TRUE TRUE TRUE TRUE TRUE TRUE TRUE
> colnames(BAEA) == colnames(BALF)
 [1] TRUE TRUE TRUE TRUE TRUE TRUE TRUE TRUE TRUE TRUE TRUE TRUE TRUE TRUE TRUE
```

<br />

BAEC possui um nome diferente na coluna de carga horária, então vamos deixar o nome igual ao dos outros dataframes.

<br />

```R
colnames(BAEC)[10] <- colnames(BAEA)[10]
```

<br />

Agora podemos juntar todos os dados pelas linhas com o comando rbind. Todos os dados estão agora no dataframe *all_data*.

<br />

```R
all_data <- rbind(BAEA, BAEE)
all_data <- rbind(all_data, BAEC)
all_data <- rbind(all_data, BAEP)
all_data <- rbind(all_data, BAEQ)
all_data <- rbind(all_data, BALF)
```

<br />

Feita a junção dos dados, vamos analisar individualmente o conteúdo único das colunas que contém categorias (Strings). Também vamos verificar em cada coluna se existem NaNs (*Not a Number* - Não-Números) ou campos vazios.

<br />

```R
> all_data$MATR_ALUNO[is.na(all_data$MATR_ALUNO)]
character(0)
> all_data$MATR_ALUNO[all_data$MATR_ALUNO == ""]
character(0)
> 
> all_data$COD_CURSO[is.na(all_data$COD_CURSO)]
character(0)
> all_data$COD_CURSO[all_data$COD_CURSO == ""]
character(0)
> unique(all_data$COD_CURSO)
[1] "BAEA" "BAEE" "BAEC" "BAEP" "BAEQ" "BALF"
> 
> all_data$ANO[is.na(all_data$ANO)]
integer(0)
> unique(all_data$ANO)
 [1] 2007 2009 2008 2011 2010 2012 2013 2015 2014 2017 2016 2019 2018
> 
> all_data$PERIODO[is.na(all_data$PERIODO)]
character(0)
> all_data$PERIODO[all_data$PERIODO == ""]
character(0)
> unique(all_data$PERIODO)
[1] "1. Semestre" "2. Semestre"
> 
> all_data$COD_ATIV_CURRIC[is.na(all_data$COD_ATIV_CURRIC)]
character(0)
> all_data$COD_ATIV_CURRIC[all_data$COD_ATIV_CURRIC == ""]
character(0)
> unique(all_data$COD_ATIV_CURRIC)
[1] "10801"    "BA010801" "10803"    "BA010803" "BA017528" "10802"   
> 
> all_data$NOME_ATIV_CURRIC[is.na(all_data$NOME_ATIV_CURRIC)]
character(0)
> all_data$NOME_ATIV_CURRIC[all_data$NOME_ATIV_CURRIC == ""]
character(0)
> unique(all_data$NOME_ATIV_CURRIC)
[1] "DESENHO TECNICO I"  "DESENHO TECNICO II"
> 
> all_data$CREDITOS[is.na(all_data$CREDITOS)]
integer(0)
> unique(all_data$CREDITOS)
[1] 4 2
> all_data$MEDIA_FINAL[is.na(all_data$MEDIA_FINAL)]
numeric(0)
> all_data$MEDIA_FINAL[all_data$MEDIA_FINAL > 10 | all_data$MEDIA_FINAL < 0] 
  [1] 1e+06 1e+06 1e+06 1e+06 1e+06 1e+06 1e+06 1e+06 1e+06 1e+06 1e+06 1e+06 1e+06 1e+06 1e+06 1e+06 1e+06
 [18] 1e+06 1e+06 1e+06 1e+06 1e+06 1e+06 1e+06 1e+06 1e+06 1e+06 1e+06 1e+06 1e+06 1e+06 1e+06 1e+06 1e+06
 ...
```

<br />

Olhem só, existe uma porção dos dados em que a nota na **média final** está com um valor incorreto e constante de 100000. Vamos transformar em 0 e remover os registros posteriormente.

<br />

```R
> all_data$MEDIA_FINAL[all_data$MEDIA_FINAL > 10 | all_data$MEDIA_FINAL < 0] <- 0
> 
> all_data$DESCR_SITUACAO[all_data$DESCR_SITUACAO == ""]
character(0)
> all_data$DESCR_SITUACAO[is.na(all_data$DESCR_SITUACAO)]
character(0)
> unique(all_data$DESCR_SITUACAO)
[1] "Aprovado com nota"        "Aproveitamento"           "Reprovado por Frequência"
[4] "Reprovado com nota"       "Trancamento parcial"      "Dispensado sem nota"     
[7] "Matrícula"                "Dispensado com nota"      "Disciplina Não Concluída"
> 
> all_data[is.na(all_data$TOTAL_CARGA_HORARIA),]
 [1] MATR_ALUNO          COD_CURSO           ANO                 PERIODO             COD_ATIV_CURRIC    
 [6] NOME_ATIV_CURRIC    CREDITOS            MEDIA_FINAL         DESCR_SITUACAO      TOTAL_CARGA_HORARIA
[11] FORMA_INGRESSO      ANO_INGRESSO        FORMA_EVASAO        ANO_EVASAO          SEXO               
<0 rows> (or 0-length row.names)
> unique(all_data$TOTAL_CARGA_HORARIA)
[1] 68 60 34
> 
> all_data$FORMA_INGRESSO[all_data$FORMA_INGRESSO == ""]
character(0)
> all_data$FORMA_INGRESSO[is.na(all_data$FORMA_INGRESSO)]
character(0)
> unique(all_data$FORMA_INGRESSO)
 [1] "Processo Seletivo - Vestibular"                                        
 [2] "Transf. Interna Por Reopção de Curso"                                  
 [3] "Portador de Diploma"                                                   
 [4] "Transferência"                                                         
 [5] "ENEM - Exame Nacional do Ensino Médio"                                 
 [6] "Reingresso"                                                            
 [7] "Transferência Voluntária ou Externa (oriundo de outra instituição)"    
 [8] "Reopção - Mobilidade Interna (para curso/habilitação área relacionada)"
 [9] "Chamada Regular Sisu"                                                  
[10] "Lista de Espera Sisu"                                                  
[11] "Chamada por Nota do Enem"                                              
[12] "Chamada Oral por Nota do Enem"                                         
[13] "Transferência Interna"                                                 
[14] "Programa de Estudantes-Convênio de Graduação"                          
[15] "Chamada por Nota do Enem II"                                           
[16] "Chamada por Nota no Ensino Médio"                                      
[17] "Transferência Edital de Vagas"                                         
[18] "Transferência EX-OFFICIO (amparada em lei)"                            
[19] "Chamada Oral por Nota do Ensino Medio II"                              
> 
> all_data$ANO_INGRESSO[is.na(all_data$ANO_INGRESSO)]
integer(0)
> unique(all_data$ANO_INGRESSO)
 [1] 2006 2009 2007 2008 2010 2011 2012 2013 2014 2015 2016 2017 2018 2019
> 
> all_data$FORMA_EVASAO[all_data$FORMA_EVASAO == ""]
character(0)
> all_data$FORMA_EVASAO[is.na(all_data$FORMA_EVASAO)]
character(0)
> unique(all_data$FORMA_EVASAO)
 [1] "Transf. Interna Por Reopção de Curso" "Transferência"                       
 [3] "Abandono"                             "Formado"                             
 [5] "Transferido"                          "Transferência Interna"               
 [7] "Desligamento"                         "Cancelamento"                        
 [9] "Aluno Regular"                        "Falecimento"                         
> 
> all_data$ANO_EVASAO[is.na(all_data$ANO_EVASAO)]
   [1] NA NA NA NA NA NA NA NA NA NA NA NA NA NA NA NA NA NA NA NA NA NA NA NA NA NA NA NA NA NA NA NA NA NA ...
 [ reached getOption("max.print") -- omitted X entries ]
```

Mais dados inconsistentes. O ano de evasão registrado como NA (*Not Available* - Não disponível) em muitos registros, provavelmente indicando casos de alunos que não evadiram da universidade. Vamos transformar em zeros.

<br />

```R
> all_data$ANO_EVASAO[is.na(all_data$ANO_EVASAO)] <- 0
> unique(all_data$ANO_EVASAO)
 [1] 2009 2016 2008 2011 2007 2015 2014 2013 2012 2010 2018 2017 2019    0
```

<br />

Agora vamos descartar casos de alunos nas seguintes situações:
- Dispensados sem nota (todos neste caso ficaram com média zero);
- Trancamento Parcial (todos neste caso ficaram com média zero);
- Matrícula (alunos atualmente matrículados não têm informação sobre a média final);
- Disciplina Não Concluída (todos neste caso ficaram com média zero);
- Aproveitamento em casos que a média foi 0;

Como vamos posteriormente utilizar tratamentos estatísticos, temos que ter o cuidado de não deixar a amostra viesada por causa de registros sem significância para a análise. Os casos acima citados são excepcionais e não vão agregar resultados para este trabalho de análise das médias finais dos alunos. 
*Isso não significa, porém, que tais dados não tenham utilidade. Tais dados podem ser usados para descobrir, por exemplo, o número médio de reprovações de alunos de Desenho Técnico que desistem dos cursos, ou que se formam. Isso pode ser feito através da matrícula de cada aluno. Porém, não é o nosso escopo agora. :-)*

Os alunos aprovados e reprovados por nota ou frequência possuem a informação valiosa para as nossas análises.  

Vamos também aproveitar para dar um nome mais conciso para algumas formas de evasão.

<br />

```R
> all_data <- all_data[all_data$DESCR_SITUACAO != "Dispensado sem nota",]
> all_data <- all_data[!(all_data$DESCR_SITUACAO == "Aproveitamento" & all_data$MEDIA_FINAL == 0),]
> all_data <- all_data[(all_data$DESCR_SITUACAO != "Trancamento parcial"),]
> all_data <- all_data[(all_data$DESCR_SITUACAO != "Matrícula"),]
> all_data <- all_data[(all_data$DESCR_SITUACAO != "Disciplina Não Concluída"),]
> 
> unique(all_data$FORMA_EVASAO)
[1] "Transf. Interna Por Reopção de Curso" "Transferência"                       
[3] "Abandono"                             "Formado"                             
[5] "Transferido"                          "Transferência Interna"               
[7] "Desligamento"                         "Cancelamento"                        
[9] "Aluno Regular"                       
> all_data$FORMA_EVASAO[(all_data$FORMA_EVASAO == "Transf. Interna Por Reopção de Curso")] <- "Reopção"
> all_data$FORMA_EVASAO[(all_data$FORMA_EVASAO == "Transferência Interna")] <- "Transf. Interna"
```

<br />

Agora que temos nosso conjunto de dados tratado e integrado em um único dataframe, vamos iniciar as análises gerando diversas estatísticas sobre esses dados. Para isso, vamos reutilizar a função abaixo:

<br />

```R
 statistics <- function(dataframe, response, ...) {
  group_var <- enquos(...)
  result <- as.data.frame(
    dataframe %>% 
      group_by(!!!group_var) %>% 
      summarise(mean = mean(!!sym(response)), 
                median = median(!!sym(response)), 
                sd = sd(!!sym(response)), 
                min = min(!!sym(response)), 
                max = max(!!sym(response)),
                n = NROW(!!sym(response)),
                quartil_1st = summary(!!sym(response))[2],
                quartil_3rd = summary(!!sym(response))[5],
                IQR = summary(!!sym(response))[5] - summary(!!sym(response))[2]
      )
  )
  return(result)
}
```

<br />

Na sequência, vamos observar os resultados para cada agregação possível dos nossos dados.

<br />

```R
> by_course_drawing_I <- statistics(all_data[all_data$NOME_ATIV_CURRIC == "DESENHO TECNICO I",], "MEDIA_FINAL", COD_CURSO)

> by_year_drawing_I <- statistics(all_data[all_data$NOME_ATIV_CURRIC == "DESENHO TECNICO I",], "MEDIA_FINAL", ANO)

> by_year_course_drawing_I <- statistics(all_data[all_data$NOME_ATIV_CURRIC == "DESENHO TECNICO I",], "MEDIA_FINAL", ANO, COD_CURSO)

> by_year_semester_course_drawing_I <- statistics(all_data[all_data$NOME_ATIV_CURRIC == "DESENHO TECNICO I",], "MEDIA_FINAL", ANO, COD_CURSO, PERIODO)

> by_course_drawing_II <- statistics(all_data[all_data$NOME_ATIV_CURRIC == "DESENHO TECNICO II",], "MEDIA_FINAL", COD_CURSO)

> by_year_drawing_II <- statistics(all_data[all_data$NOME_ATIV_CURRIC == "DESENHO TECNICO II",], "MEDIA_FINAL", ANO)

> by_year_course_drawing_II <- statistics(all_data[all_data$NOME_ATIV_CURRIC == "DESENHO TECNICO II",], "MEDIA_FINAL", ANO, COD_CURSO)

> by_year_semester_course_drawing_II <- statistics(all_data[all_data$NOME_ATIV_CURRIC == "DESENHO TECNICO II",], "MEDIA_FINAL", ANO, COD_CURSO, PERIODO)

# Dados sem alunos reprovados por frequência (ou seja, que desistiram da disciplina sem cumprir a carga horária mínima)
> all_data_without_failed_by_attendance <- all_data[!(all_data$DESCR_SITUACAO == "Reprovado por frequencia"),]

> by_course_drawing_I_2 <- statistics(all_data_without_failed_by_attendance[all_data_without_failed_by_attendance$NOME_ATIV_CURRIC == "DESENHO TECNICO I",], "MEDIA_FINAL", COD_CURSO)

> by_year_drawing_I_2 <- statistics(all_data_without_failed_by_attendance[all_data_without_failed_by_attendance$NOME_ATIV_CURRIC == "DESENHO TECNICO I",], "MEDIA_FINAL", ANO)

> by_year_course_drawing_I_2 <- statistics(all_data_without_failed_by_attendance[all_data_without_failed_by_attendance$NOME_ATIV_CURRIC == "DESENHO TECNICO I",], "MEDIA_FINAL", ANO, COD_CURSO)

> by_year_semester_course_drawing_I_2 <- statistics(all_data_without_failed_by_attendance[all_data_without_failed_by_attendance$NOME_ATIV_CURRIC == "DESENHO TECNICO I",], "MEDIA_FINAL", ANO, COD_CURSO, PERIODO)

> by_course_drawing_II_2 <- statistics(all_data_without_failed_by_attendance[all_data_without_failed_by_attendance$NOME_ATIV_CURRIC == "DESENHO TECNICO II",], "MEDIA_FINAL", COD_CURSO)

> by_year_drawing_II_2 <- statistics(all_data_without_failed_by_attendance[all_data_without_failed_by_attendance$NOME_ATIV_CURRIC == "DESENHO TECNICO II",], "MEDIA_FINAL", ANO)

> by_year_course_drawing_II_2 <- statistics(all_data_without_failed_by_attendance[all_data_without_failed_by_attendance$NOME_ATIV_CURRIC == "DESENHO TECNICO II",], "MEDIA_FINAL", ANO, COD_CURSO)

> by_year_semester_course_drawing_II_2 <- statistics(all_data_without_failed_by_attendance[all_data_without_failed_by_attendance$NOME_ATIV_CURRIC == "DESENHO TECNICO II",], "MEDIA_FINAL", ANO, COD_CURSO, PERIODO)

> by_course_drawing_I
  COD_CURSO     mean median       sd min  max   n quartil_1st quartil_3rd    IQR
1      BAEA 4.078723   4.98 3.093508   0 10.0 462       0.675      6.7375 6.0625
2      BAEC 4.228364   6.00 3.382119   0 10.0 269       0.000      7.0000 7.0000
3      BAEE 4.637683   6.00 3.058525   0  9.7 246       1.225      6.9375 5.7125
4      BAEP 4.341087   6.00 3.324497   0 10.0 727       0.000      7.0100 7.0100
5      BAEQ 4.819648   6.00 3.011449   0 10.0 597       2.000      7.1000 5.1000
6      BALF 3.647069   3.80 3.209636   0  9.8  58       0.000      6.4500 6.4500
```

<br />

Observando o primeiro caso (média, mediana, desvio padrão, mínimo, máximo, n° de amostras, 1° e 3° quartis e IQR (*Interquartil Range* - Distância Interquartil) dos dados agrupados por curso de graduação), percebemos que a melhor média e menor desvio padrão é do BAEQ, enquanto que a pior média e alto valor de desvio é do BALF. Por outro lado, BALF tem 1/10 das amostras de BAEQ, evidenciando que o resultado discrepante em BALF pode ser devido ao número de amostras. Cabe ressaltar que neste conjunto estão incluídos alunos aprovados, reprovados por nota e frequência (que a nota sempre fica em zero). Os outros cursos aparentemente possuem as médias mais próximas uns dos outros.

Tudo bem. Analisamos um caso. Porém temos outros numerosos casos. Podemos salvar esses dados das tabelas em planilhas para uso e analises posteriores.

Vamos tirar proveito do poder dos gráficos do R para verificarmos visualmente esses resultados.

<br />

```R
img = "../images/dark-background-1.jpg"
font_family <- "AlloyInk"
font_add("Bold Hollow", "../fonts/Raindrops BOLD.ttf")
font_add("AlloyInk", "../fonts/AlloyInk-nRLyO.ttf")
font_add("Ogowey", "../fonts/OgoweyDemo-owxDV.ttf")
showtext_auto()

# Manually open a graphics device if you run this code in RStudio
x11(width = 13, height = 11.25)

# dark theme
normal_theme <- theme(
  axis.text = element_text(family = font_family, size = 22, color = "#cccccc"),
  axis.title = element_text(family = font_family, size = 35, color = "#cccccc"),
  axis.ticks = element_line(colour = "#cccccc"),
  axis.ticks.length = unit(0.5, "cm"),
  plot.caption = element_text(family = font_family, size = 16, color = "#cccccc"),
  plot.title = element_text(family = font_family, size = 45, hjust = 0.5, color = "#ffffff"),
  plot.background = element_rect(fill = "black"),
  panel.grid.minor.y = element_line(size =.1, color = "grey"),
  panel.grid.minor.x = element_blank(),
  panel.grid.major.y = element_line(size =.1, color = "grey"),
  panel.grid.major.x = element_blank(),
  panel.background = element_rect(fill = 'black'),
  legend.background = element_rect(fill = "black", color = NA),
  legend.key = element_rect(color = "gray", fill = "black"),
  legend.text = element_text(family = font_family, size = 20, color = "#cccccc"),
  text = element_text(family = font_family, color = "#cccccc", size = 22)
)

plot <- ggplot(all_data[all_data$NOME_ATIV_CURRIC == "DESENHO TECNICO I",], 
    aes(x = COD_CURSO, y = MEDIA_FINAL, fill = COD_CURSO)) +
    geom_violin(trim = TRUE) + 
    geom_boxplot(color = "black", width = 0.1, outlier.shape = 21, outlier.size = 2, outlier.fill = "white", show.legend = FALSE) + 
    geom_segment(aes(x = 0, y = 6, xend = 7, yend = 6), linetype = "dotted", colour = "red") +
    scale_y_continuous(breaks = seq(0, 10, by = 1)) +
    xlab("\nCurso\n") + ylab("\nMedia Final\n") + 
    labs(fill = "Curso") +
    ggtitle("\nDesenho Tecnico I\n") + 
    normal_theme

ggbackground(plot, img)
```

<br />

<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post9/figure1.png)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post9/figure1.png" alt="Gráficos de caixa e violino com médias dos alunos por curso de graduação.">
</figure>

<br />

Podemos confirmar o que foi dito anteriormente através deste gráfico. Se você não sabe como interpretar um boxplot, [eu sugiro este link, que explica em detalhes cada um dos componentes do boxplot](https://towardsdatascience.com/understanding-boxplots-5e2df7bcbd51).

Vamos verificar outros casos.

<br />

<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post9/figure2.png)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post9/figure2.png" alt="Gráficos de caixa e violino com médias dos alunos por ano.">
</figure>

<br />

<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post9/figure3.png)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post9/figure3.png" alt="Gráficos de caixa e violino com médias dos alunos por curso de graduação.">
</figure>

<br />

<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post9/figure4.png)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post9/figure4.png" alt="Gráficos de caixa e violino com médias dos alunos por curso de graduação.">
</figure>

<br />

<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post9/figure5.png)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post9/figure5.png" alt="Gráficos de caixa e violino com médias dos alunos por curso de graduação.">
</figure>

<br />

<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post9/figure6.png)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post9/figure6.png" alt="Gráficos de caixa e violino com médias dos alunos por curso de graduação.">
</figure>

<br />

<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post9/figure7.png)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post9/figure7.png" alt="Gráficos de caixa e violino com médias dos alunos por curso de graduação.">
</figure>

<br />

<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post9/figure8.png)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post9/figure8.png" alt="Gráficos de caixa e violino com médias dos alunos por curso de graduação.">
</figure>

<br />

<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post9/figure9.png)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post9/figure9.png" alt="Gráficos de caixa e violino com médias dos alunos por curso de graduação.">
</figure>

<br />

<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post9/figure10.png)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post9/figure10.png" alt="Gráficos de caixa e violino com médias dos alunos por curso de graduação.">
</figure>

<br />

<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post9/figure11.png)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post9/figure11.png" alt="Gráficos de caixa e violino com médias dos alunos por curso de graduação.">
</figure>

Resumindo um pouco do que foi possível observar nos gráficos acima:

- Os alunos de Desenho I em 2008 tiveram um desempenho superior nas notas em relação aos outros anos;
- De 2009 até 2014 o desempenho caiu até começar a melhorar de 2015 até 2018;
- Em Desenho II, o curso de BAEC aparece com desempenho superior nas notas, BALF é o curso com desempenho inferior, e os cursos restantes possuem estatísticas semelhantes. *Obs: Desenho II é desenvolvida com o uso de softwares de CAD - (Desenho Auxiliado por Computador)*;
- O desempenho dos alunos entre 2009 e 2013 foi superior em Desenho II com relação aos anos posteriores;
- Sem reprovados por frequência, o desempenho por curso em Desenho I ficou mais homogêneo. O curso de BAEC apresenta notas melhores que BAEQ (provavelmente BAEQ possui mais alunos e poucos reprovados por frequência, o que pode justificar a mudança). O comportamento por ano se manteve, como no caso com todos os dados;
- O comportamento das medianas no caso de Desenho II sem reprovados manteve o mesmo padrão, diferenças mínimas por curso, ano e período.

Apesar de ser visível, temos que corroborar nossas análises com o uso de métodos estatísticos.

## Parte III - Estatísticas do Primeiro Dataset 

## Parte IV - Análise Exploratória de Dados do Segundo Dataset

## Parte V - Estatísticas do Segundo Dataset  

# Considerações Finais

Bom pessoal, a ideia foi apresentar um passo a passo detalhado sobre o processo de desenvolvimento de um app na linguagem R com o shinyapps.io. 

Abordei as fases de coleta dos dados, organização dos dados, persistência dos dados e pacotes em um arquivo, construção das lógicas da interface da aplicação e do servidor, um pouco de CSS para customizar o app e o processo de execução do app com shiny e submissão para o shinyapps.io de forma gratuita.

Espero que vocês tenham gostado do post e que ele tenha auxiliado vocês de alguma forma. Quaisquer dúvidas, podem deixar comentários logo abaixo :-)

Valeu !! Até o próximo post !! :-)

<div class="skills">
    <hr class="hr-text" data-content="############">
</div>