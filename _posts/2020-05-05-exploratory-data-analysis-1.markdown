---
layout: post
title: Análise Exploratória de Dados (EDA) e Técnicas Estatísticas com o R
subtitle: É apresentado um exemplo completo de EDA com dados de estudantes de disciplinas de Desenho Técnico de uma Universidade Federal. Também são utilizadas alguns métodos estatísticos como anova, kruskal wallis, teste t e outros.
date: 2020-05-17 02:00:00 -0300
categories: análise de dados
language: R
author: luciano_brum
---

<h2> Resumo </h2>

Saudações pessoal. 

A ideia deste post é compartilhar com vocês um exemplo completo de Análise Exploratória de Dados (em inglês é EDA - Exploratory Data Analysis). Também são aplicadas técnicas estatísticas como testes de normalidade, análise de variância, kruskal wallis e outros. 

Este trabalho foi desenvolvido no Sistema Operacional Ubuntu versão 18.10 LTS 64 bits, com o auxílio da linguagem R v.3.6.3 (2020-02-29) e do RStudio v. 1.2.5033.

<h2> Tópicos </h2>

  - [Parte I - Fonte dos dados](#parte-i---fonte-dos-dados);

  - [Parte II - Análise Exploratória de Dados do dataset](#parte-ii---análise-exploratória-de-dados-do-dataset);

  - [Parte III - Estatísticas do dataset](#parte-iii---estatísticas-do-dataset);

  - [Considerações finais](#considerações-finais);

<br>

# Parte I - Fonte dos dados

Os dados utilizados como base para este trabalho são os de estudantes de disciplinas de Desenho Técnico de uma IES (Instituição de Ensino Superior), [e podem ser obtidos pelo meu Github](https://github.com/Lubrum/Data_Analysis-Technical-Drawing). 

Dois datasets foram fornecidos:

1 - Dados de estudantes separados por curso de graduação, de todos professores que ministraram a disciplina (sem informação credencial de estudantes e sem identificação de professores).

2 - Dados de estudantes da turma de um professor específico da disciplina.

Vamos fazer a EDA e análises estatísticas do primeiro dataset neste post.

## Parte II - Análise Exploratória de Dados do Dataset 

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
if (!require(dplyr)) install.packages("dplyr")
library(dplyr)

if (!require(ggplot2)) install.packages("ggplot2")
library(ggplot2)

if (!require(ggpubr)) install.packages("ggpubr")
library(ggpubr)

if (!require(jpeg)) install.packages("jpeg")
library(jpeg)

if (!require(ggimage)) install.packages("ggimage")
library(ggimage)

if (!require(magick)) install.packages("magick")
library(magick)

if (!require(showtext)) install.packages("showtext")
library(showtext)

if (!require(extrafont)) install.packages("extrafont")
library(extrafont)

if (!require(ggchicklet)) install.packages("ggchicklet", repos = "https://cinc.rud.is")
library(ggchicklet)

if (!require(car)) install.packages("car")
library(car)

if (!require(lattice)) install.packages("lattice")
library(lattice)

if (!require(rcompanion)) install.packages("rcompanion")
library(rcompanion)

if (!require(FSA))install.packages("FSA")
library(FSA)
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

Agora podemos concatenar todos os dados com o comando rbind. Todos os dados estão agora no dataframe *all_data*. A concanetação com rbind é feita pelas linhas.

<br />

```R
all_data <- rbind(BAEA, BAEE)
all_data <- rbind(all_data, BAEC)
all_data <- rbind(all_data, BAEP)
all_data <- rbind(all_data, BAEQ)
all_data <- rbind(all_data, BALF)
```

<br />

Também vamos reduzir o nome de algumas colunas para facilitar o desenvolvimento na sequência.

<br />

```R
colnames(all_data)[10] <- "CARGA_HORARIA"
colnames(all_data)[9] <- "SITUACAO"
colnames(all_data)[5] <- "COD_DISCIPLINA"
colnames(all_data)[6] <- "DISCIPLINA"
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
> all_data$COD_DISCIPLINA[is.na(all_data$COD_DISCIPLINA)]
character(0)
> all_data$COD_DISCIPLINA[all_data$COD_DISCIPLINA == ""]
character(0)
> unique(all_data$COD_DISCIPLINA)
[1] "10801"    "BA010801" "10803"    "BA010803" "BA017528" "10802"   
> 
> all_data$DISCIPLINA[is.na(all_data$DISCIPLINA)]
character(0)
> all_data$DISCIPLINA[all_data$DISCIPLINA == ""]
character(0)
> unique(all_data$DISCIPLINA)
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
> all_data$SITUACAO[all_data$SITUACAO == ""]
character(0)
> all_data$SITUACAO[is.na(all_data$SITUACAO)]
character(0)
> unique(all_data$SITUACAO)
[1] "Aprovado com nota"        "Aproveitamento"           "Reprovado por Frequência"
[4] "Reprovado com nota"       "Trancamento parcial"      "Dispensado sem nota"     
[7] "Matrícula"                "Dispensado com nota"      "Disciplina Não Concluída"
> 
> all_data[is.na(all_data$CARGA_HORARIA),]
 [1] MATR_ALUNO          COD_CURSO           ANO                 PERIODO             COD_DISCIPLINA    
 [6] DISCIPLINA    CREDITOS            MEDIA_FINAL         SITUACAO      CARGA_HORARIA
[11] FORMA_INGRESSO      ANO_INGRESSO        FORMA_EVASAO        ANO_EVASAO          SEXO               
<0 rows> (or 0-length row.names)
> unique(all_data$CARGA_HORARIA)
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

<br />

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
> all_data <- all_data[all_data$SITUACAO != "Dispensado sem nota",]
> all_data <- all_data[!(all_data$SITUACAO == "Aproveitamento" & all_data$MEDIA_FINAL == 0),]
> all_data <- all_data[(all_data$SITUACAO != "Trancamento parcial"),]
> all_data <- all_data[(all_data$SITUACAO != "Matrícula"),]
> all_data <- all_data[(all_data$SITUACAO != "Disciplina Não Concluída"),]
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
DT1 <- all_data[all_data$DISCIPLINA == "DESENHO TECNICO I",]
> by_course_drawing_I <- statistics(all_data[all_data$ == "DESENHO TECNICO I",], "MEDIA_FINAL", COD_CURSO)

> by_year_drawing_I <- statistics(DT1, "MEDIA_FINAL", ANO)

> by_year_course_drawing_I <- statistics(DT1, "MEDIA_FINAL", ANO, COD_CURSO)

> by_year_semester_course_drawing_I <- statistics(DT1, "MEDIA_FINAL", ANO, COD_CURSO, PERIODO)

> by_course_drawing_II <- statistics(DT2, "MEDIA_FINAL", COD_CURSO)

> by_year_drawing_II <- statistics(DT2, "MEDIA_FINAL", ANO)

> by_year_course_drawing_II <- statistics(DT2, "MEDIA_FINAL", ANO, COD_CURSO)

> by_year_semester_course_drawing_II <- statistics(DT2, "MEDIA_FINAL", ANO, COD_CURSO, PERIODO)

# Dados sem alunos reprovados por frequência (ou seja, que desistiram da disciplina sem cumprir a carga horária mínima)
> all_data_without_failed_by_attendance <- all_data[!(all_data$DESCR_SITUACAO == "Reprovado por frequencia"),]

> by_course_drawing_I_2 <- statistics(all_data_without_failed_by_attendance[all_data_without_failed_by_attendance$DISCIPLINA == "DESENHO TECNICO I",], "MEDIA_FINAL", COD_CURSO)

> by_year_drawing_I_2 <- statistics(all_data_without_failed_by_attendance[all_data_without_failed_by_attendance$DISCIPLINA == "DESENHO TECNICO I",], "MEDIA_FINAL", ANO)

> by_year_course_drawing_I_2 <- statistics(all_data_without_failed_by_attendance[all_data_without_failed_by_attendance$DISCIPLINA == "DESENHO TECNICO I",], "MEDIA_FINAL", ANO, COD_CURSO)

> by_year_semester_course_drawing_I_2 <- statistics(all_data_without_failed_by_attendance[all_data_without_failed_by_attendance$DISCIPLINA == "DESENHO TECNICO I",], "MEDIA_FINAL", ANO, COD_CURSO, PERIODO)

> by_course_drawing_II_2 <- statistics(all_data_without_failed_by_attendance[all_data_without_failed_by_attendance$DISCIPLINA == "DESENHO TECNICO II",], "MEDIA_FINAL", COD_CURSO)

> by_year_drawing_II_2 <- statistics(all_data_without_failed_by_attendance[all_data_without_failed_by_attendance$DISCIPLINA == "DESENHO TECNICO II",], "MEDIA_FINAL", ANO)

> by_year_course_drawing_II_2 <- statistics(all_data_without_failed_by_attendance[all_data_without_failed_by_attendance$DISCIPLINA == "DESENHO TECNICO II",], "MEDIA_FINAL", ANO, COD_CURSO)

> by_year_semester_course_drawing_II_2 <- statistics(all_data_without_failed_by_attendance[all_data_without_failed_by_attendance$DISCIPLINA == "DESENHO TECNICO II",], "MEDIA_FINAL", ANO, COD_CURSO, PERIODO)

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

<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post9/figure1.png)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post9/figure1.png" alt="Gráficos de caixa e violino com médias dos alunos em Desenho I por curso de graduação.">
</figure>

<br />

Podemos confirmar o que foi dito anteriormente através deste gráfico. Se você não sabe como interpretar um boxplot, [eu sugiro este link, que explica em detalhes cada um dos componentes do boxplot](https://towardsdatascience.com/understanding-boxplots-5e2df7bcbd51).

Vamos verificar outros casos.

<br />
<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post9/figure2.png)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post9/figure2.png" alt="Gráficos de caixa e violino com médias dos alunos em Desenho I por ano.">
</figure>
<br />
<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post9/figure3.png)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post9/figure3.png" alt="Gráfico de violino com médias dos alunos em Desenho I por ano e semestre.">
</figure>
<br />
<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post9/figure4.png)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post9/figure4.png" alt="Gráficos de caixa e violino com médias dos alunos em Desenho II por curso de graduação.">
</figure>
<br />
<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post9/figure5.png)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post9/figure5.png" alt="Gráficos de caixa e violino com médias dos alunos em Desenho II por ano.">
</figure>
<br />
<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post9/figure6.png)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post9/figure6.png" alt="Gráfico de violino com médias dos alunos em Desenho II por ano e semestre.">
</figure>
<br />
<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post9/figure7.png)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post9/figure7.png" alt="Gráficos de caixa e violino com médias dos alunos em Desenho I por curso de graduação, sem notas de alunos reprovados por frequência.">
</figure>
<br />
<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post9/figure8.png)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post9/figure8.png" alt="Gráficos de caixa e violino com médias dos alunos em Desenho I por ano, sem notas de alunos reprovados pro frequência.">
</figure>
<br />
<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post9/figure9.png)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post9/figure9.png" alt="Gráfico de violino com médias dos alunos em Desenho I por ano e semestre, sem notas de alunos reprovados por frequência.">
</figure>
<br />
<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post9/figure10.png)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post9/figure10.png" alt="Gráficos de caixa e violino com médias dos alunos em Desenho II por curso de graduação, sem notas de alunos reprovados por frequência.">
</figure>
<br />
<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post9/figure11.png)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post9/figure11.png" alt="Gráficos de caixa e violino com médias dos alunos em Desenho II por ano, sem notas de alunos reprovados por frequência.">
</figure>
<br />
<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post9/figure12.png)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post9/figure12.png" alt="Gráficos de caixa e violino com médias dos alunos em Desenho II por semestre e ano, sem notas de alunos reprovados por frequência.">
</figure>
<br />

```R
#dark theme
normal_theme <- theme(
  axis.text = element_text(family = font_family, size = 22, color = "#cccccc"),
  axis.title = element_text(family = font_family, size = 35, color = "#cccccc"),
  axis.ticks = element_line(colour = "#cccccc"),
  axis.ticks.length = unit(0.5, "cm"),
  plot.caption = element_text(family = font_family, size = 16, color = "#cccccc"),
  plot.title = element_text(family = font_family,  size = 45, 
                              hjust = 0.5, color = "#ffffff"),
  plot.background = element_rect(fill = "black"),
  panel.grid.minor.y = element_line(size =.1, color = "grey"),
  panel.grid.minor.x = element_blank(),
  panel.grid.major.y = element_line(size =.1, color = "grey"),
  panel.grid.major.x = element_blank(),
  panel.background = element_rect(fill = 'black'),
  legend.background = element_rect(fill = "black", color = NA),
  legend.key = element_rect(fill = "black"),
  legend.text = element_text(family = font_family,size = 20,color = "#cccccc"),
  text = element_text(family = font_family, color = "#cccccc", size = 22)
)

# Manually open a graphics device if you run this code in RStudio
x11(width = 13, height = 11.25)

# Desenho I - violin plot + boxplot - por curso de graduação  
fig <- ggplot(DT1, 
        aes(x = COD_CURSO, 
            y = MEDIA_FINAL, 
            fill = COD_CURSO)) +
        geom_violin(trim = TRUE) + 
        geom_boxplot(color = "black",
                     width = 0.1, 
                     outlier.shape = 21, 
                     outlier.size = 2, 
                     outlier.fill = "white", 
                     show.legend = FALSE) + 
        geom_segment(aes(x = 0, 
                         y = 6, 
                         xend = 7, 
                         yend = 6), 
                     linetype = "dotted", 
                     colour = "red") +
        scale_y_continuous(breaks = seq(0, 10, by = 1)) +
        xlab("\nCurso\n") + 
        ylab("\nMedia Final\n") + 
        labs(fill = "Curso") +
        ggtitle("\nDesenho Tecnico I\n") + 
        normal_theme

ggbackground(fig, img)
savePlot(filename = "../images/figure1.png", type = "png", device = dev.cur())

# Desenho I - violin plot + boxplot - por ano
fig <- ggplot(DT1, 
        aes(x = ANO, 
            y = MEDIA_FINAL, 
            fill = as.factor(ANO))) +
        geom_violin(trim = TRUE)+ 
        geom_boxplot(color = "black",
                     width = 0.1,
                     outlier.shape = 21, 
                     outlier.size = 2, 
                     outlier.fill = "white", 
                     show.legend = FALSE) + 
        geom_segment(aes(x = 2007, 
                         y = 6, 
                         xend = 2019, 
                         yend = 6), 
                     linetype = "dotted", 
                     colour = "red") +
        scale_y_continuous(breaks = seq(0, 10, by = 1)) +
        scale_x_continuous(breaks = seq(min(all_data$ANO), 
                                        max(all_data$ANO), 
                                        by = 1)) +
        xlab("\nAno\n") + 
        ylab("\nMedia Final\n") + 
        labs(fill = "Ano") + 
        ggtitle("\nDesenho Tecnico I\n") +
        normal_theme

ggbackground(fig, img)
savePlot(filename = "../images/figure2.png", type = "png", device = dev.cur())

# Desenho I - violin plot - por semestre e ano
fig <- ggplot(DT1, 
        aes(x = as.factor(ANO), 
            y = MEDIA_FINAL, 
            fill = as.factor(PERIODO))) +
        geom_violin(trim = TRUE) +
        geom_segment(aes(x = 0, 
                         y = 6, 
                         xend = 13, 
                         yend = 6), 
                     linetype = "dotted", 
                     colour = "red") +
        scale_y_continuous(breaks = seq(0, 10, by = 1)) +
        xlab("\nAno\n") + 
        ylab("\nMedia Final\n") + 
        labs(fill = "Periodo") + 
        ggtitle("\nDesenho Tecnico I\n") +
        normal_theme +
        theme(legend.position = "bottom") 

ggbackground(fig, img)
savePlot(filename = "../images/figure3.png", type = "png", device = dev.cur())

# Desenho II - violin plot + boxplot - por curso de graduação
fig <- ggplot(DT2, 
        aes(x = COD_CURSO, 
            y = MEDIA_FINAL, 
            fill = COD_CURSO)) +
        geom_violin(trim = TRUE) + 
        geom_boxplot(color = "black", 
                     width = 0.1, 
                     outlier.shape = 21, 
                     outlier.size = 2, 
                     outlier.fill = "white", 
                     show.legend = FALSE) + 
        geom_segment(aes(x = 0, 
                         y = 6, 
                         xend = 7, 
                         yend = 6), 
                     linetype = "dotted", 
                     colour = "red") +
        scale_y_continuous(breaks = seq(0, 10, by = 1)) +
        xlab("\nCurso\n") + 
        ylab("\nMedia Final\n") + 
        labs(fill = "Curso") + 
        ggtitle("\nDesenho Tecnico II\n") +
        normal_theme

ggbackground(fig, img)
savePlot(filename = "../images/figure4.png", type = "png", device = dev.cur())

# Desenho II - violin plot + boxplot - por ano
fig <- ggplot(DT2, 
        aes(x = ANO, 
            y = MEDIA_FINAL, 
            fill = as.factor(ANO), 
            group = ANO)) +
        geom_violin(trim = TRUE)+ 
        geom_boxplot(color = "black", 
                     width = 0.1, 
                     outlier.shape = 21, 
                     outlier.size = 2, 
                     outlier.fill = "white", 
                     show.legend = FALSE) + 
        geom_segment(aes(x = 2007, 
                         y = 6, 
                         xend = 2019, 
                         yend = 6), 
                     linetype = "dotted", 
                     colour = "red") +
        scale_y_continuous(breaks = seq(0, 10, by = 1)) +
        scale_x_continuous(breaks = seq(2007, 2019, by = 1)) +
        xlab("\nAno\n") +
        ylab("\nMedia Final\n") + 
        labs(fill = "Ano") + 
        ggtitle("\nDesenho Tecnico II\n") +
        normal_theme

ggbackground(fig, img)
savePlot(filename = "../images/figure5.png", type = "png", device = dev.cur())

# Desenho II - violin plot - por semestre e ano
fig <- ggplot(DT2, 
        aes(x = as.factor(ANO), 
            y = MEDIA_FINAL, 
            fill = as.factor(PERIODO))) +
        geom_violin(trim = TRUE) +
        geom_segment(aes(x = 0, 
                         y = 6, 
                         xend = 13, 
                         yend = 6), 
                     linetype = "dotted", 
                     colour = "red") +
        scale_y_continuous(breaks = seq(0, 10, by = 1)) +
        theme(legend.position = "bottom") +
        xlab("\nAno\n") + 
        ylab("\nMedia Final\n") + 
        labs(fill = "Periodo") + 
        ggtitle("\nDesenho Tecnico II\n") +
        normal_theme

ggbackground(fig, img)
savePlot(filename = "../images/figure6.png", type = "png", device = dev.cur())

# Desenho I - violin plot + boxplot - por curso de graduação - sem reprovados por frequência
fig <- ggplot(partial_data[partial_data$DISCIPLINA == "DESENHO TECNICO I",], 
        aes(x = COD_CURSO, 
            y = MEDIA_FINAL, 
            fill = COD_CURSO)) +
        geom_violin(trim = TRUE) + 
        geom_boxplot(color = "black", 
                     width = 0.1, 
                     outlier.shape = 21, 
                     outlier.size = 2, 
                     outlier.fill = "white", 
                     show.legend = FALSE) + 
        geom_segment(aes(x = 0, 
                         y = 6, 
                         xend = 7, 
                         yend = 6), 
                     linetype = "dotted", 
                     colour = "red") +
        scale_y_continuous(breaks = seq(0, 10, by = 1)) + 
        xlab("\nCurso\n") + 
        ylab("\nMedia Final\n") + 
        labs(fill = "Curso") + 
        ggtitle("\nMedias em Desenho Tecnico I", subtitle = "Sem reprovados por frequencia\n") +
        normal_theme

ggbackground(fig, img)
savePlot(filename = "../images/figure7.png", type = "png", device = dev.cur())

# Desenho I - violin plot + boxplot - por ano - sem reprovados por frequência
fig <- ggplot(partial_data[partial_data$DISCIPLINA == "DESENHO TECNICO I",], 
        aes(x = ANO, 
            y = MEDIA_FINAL, 
            fill = as.factor(ANO), 
            group = ANO)) +
        geom_violin(trim = TRUE)+ 
        geom_boxplot(color = "black", 
                     width = 0.1, 
                     outlier.shape = 21, 
                     outlier.size = 2, 
                     outlier.fill = "white", 
                     show.legend = FALSE) + 
        geom_segment(aes(x = 2007, 
                         y = 6, 
                         xend = 2019, 
                         yend = 6), 
                     linetype = "dotted", 
                     colour = "red") +
        scale_y_continuous(breaks = seq(0, 10, by = 1)) +
        scale_x_continuous(breaks = seq(2007, 2019, by = 1)) +
        xlab("\nAno\n") + 
        ylab("\nMedia Final\n") + 
        labs(fill = "Ano") + 
        ggtitle("\nMedias em Desenho Tecnico I", subtitle = "Sem reprovados por frequencia\n") +
        normal_theme

ggbackground(fig, img)
savePlot(filename = "../images/figure8.png", type = "png", device = dev.cur())

# Desenho I - violin plot - por ano e semestre - sem reprovados por frequência
fig <- ggplot(partial_data[partial_data$DISCIPLINA == "DESENHO TECNICO I",], 
        aes(x = as.factor(ANO), 
            y = MEDIA_FINAL, 
            fill = as.factor(PERIODO))) +
        geom_violin(trim = TRUE) + 
        geom_segment(aes(x = 0, 
                         y = 6, 
                         xend = 13,
                         yend = 6), 
                     linetype = "dotted", 
                     colour = "red") +
        scale_y_continuous(breaks = seq(0, 10, by = 1)) +
        theme(legend.position = "bottom") +
        xlab("\nAno\n") + 
        ylab("\nMedia Final\n") + 
        labs(fill = "Periodo") + 
        ggtitle("\nMedias em Desenho Tecnico I", subtitle = "Sem reprovados por frequencia\n") +
        normal_theme +
        theme(plot.title = element_text(hjust = 0))

ggbackground(fig, img)
savePlot(filename = "../images/figure9.png", type = "png", device = dev.cur())

# Desenho II - violin plot + boxplot - por curso de graduação - sem reprovados por frequência
fig <- ggplot(partial_data[partial_data$DISCIPLINA == "DESENHO TECNICO II",], 
        aes(x = COD_CURSO, 
            y = MEDIA_FINAL, 
            fill = COD_CURSO)) +
        geom_violin(trim = TRUE)+ 
        geom_boxplot(color = "black",
                     width = 0.1, 
                     outlier.shape = 21, 
                     outlier.size = 2, 
                     outlier.fill = "white", 
                     show.legend = FALSE) + 
        geom_segment(aes(x = 0, 
                         y = 6, 
                         xend = 7, 
                         yend = 6), 
                     linetype = "dotted", 
                     colour = "red") +
        scale_y_continuous(breaks = seq(0, 10, by = 1)) +
        xlab("\nCurso\n") + 
        ylab("\nMedia Final\n") + 
        labs(fill = "Curso") + 
        ggtitle("\nMedias em Desenho Tecnico II", subtitle = "Sem reprovados por frequencia\n") +
        normal_theme

ggbackground(fig, img)
savePlot(filename = "../images/figure10.png", type = "png", device = dev.cur())

# Desenho II - violin plot + boxplot - por ano - sem reprovados por frequência
fig <- ggplot(partial_data[partial_data$DISCIPLINA == "DESENHO TECNICO II",], 
        aes(x = ANO, 
            y = MEDIA_FINAL, 
            fill = as.factor(ANO), 
            group = ANO)) +
        geom_violin(trim = TRUE)+ 
        geom_boxplot(color = "black",
                     width = 0.1, 
                     outlier.shape = 21, 
                     outlier.size = 2, 
                     outlier.fill = "white", 
                     show.legend = FALSE) + 
        geom_segment(aes(x = 2007,
                         y = 6, 
                         xend = 2019, 
                         yend = 6), 
                     linetype = "dotted", 
                     colour = "red") +
        scale_y_continuous(breaks = seq(0, 10, by = 1)) +
        scale_x_continuous(breaks = seq(2007, 2019, by = 1)) +
        xlab("\nAno\n") + 
        ylab("\nMedia Final\n") + 
        labs(fill = "Ano") + 
        ggtitle("\nMedias em Desenho Tecnico II", subtitle = "Sem reprovados por frequencia\n") +
        normal_theme

ggbackground(fig, img)
savePlot(filename = "../images/figure11.png", type = "png", device = dev.cur())

#  Desenho II - violin plot - por ano e semestre - sem reprovados por frequência
fig <- ggplot(partial_data[partial_data$DISCIPLINA == "DESENHO TECNICO II",], 
        aes(x = as.factor(ANO), 
            y = MEDIA_FINAL, 
            fill = as.factor(PERIODO))) +
        geom_violin(trim = TRUE) +
        geom_segment(aes(x = 0, 
                         y = 6, 
                         xend = 13, 
                         yend = 6), 
                     linetype = "dotted", 
                     colour = "red") +
        scale_y_continuous(breaks = seq(0, 10, by = 1)) +
        theme(legend.position = "bottom") +
        xlab("\nAno\n") + 
        ylab("\nMedia Final\n") + 
        labs(fill = "Periodo") + 
        ggtitle("\nMedias em Desenho Tecnico II", subtitle = "Sem reprovados por frequencia\n") +
        normal_theme +
        theme(plot.title = element_text(hjust = 0))

ggbackground(fig, img)
savePlot(filename = "../images/figure12.png", type = "png", device = dev.cur())
```
<br />

Resumindo um pouco dos gráficos acima:

- Os alunos de Desenho I em 2008 tiveram um desempenho superior nas notas em relação aos outros anos;

- De 2009 até 2014 o desempenho caiu até começar a melhorar de 2015 até 2018;

- Em Desenho II, o curso de BAEC aparece com desempenho superior nas notas, BALF é o curso com desempenho inferior, e os cursos restantes possuem estatísticas semelhantes. *Obs: Desenho II é desenvolvida com o uso de softwares de CAD - (Desenho Auxiliado por Computador)*;

- O desempenho dos alunos entre 2009 e 2013 foi superior em Desenho II com relação aos anos posteriores;

- Sem reprovados por frequência, o desempenho por curso em Desenho I ficou mais homogêneo. O curso de BAEC apresenta notas melhores que BAEQ (provavelmente BAEQ possui mais alunos e poucos reprovados por frequência, o que pode justificar a mudança). O comportamento por ano se manteve, como no caso com todos os dados;

- O comportamento das medianas no caso de Desenho II sem reprovados manteve o mesmo padrão, diferenças mínimas por curso, ano e período.

Agora vamos observar outros aspectos do nosso dataset...

<br />
<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post9/figure13.png)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post9/figure13.png" alt="Gráficos de barras com reprovados por sexo.">
</figure>
<br />
<br />
<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post9/figure14.png)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post9/figure14.png" alt="Gráficos de barras com reprovados por sexo e disciplina (n° e %).">
</figure>
<br />
<br />
<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post9/figure15.png)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post9/figure15.png" alt="Gráficos de barras com reprovados por sexo, disciplina e ano (n° e %).">
</figure>
<br />

Interessante observação que as estudantes do sexo feminino reprovam menos em quantidade e percentual se comparadas aos estudantes do sexo masculino. O percentual apresentado nos gráficos é relativo ao universo de estudantes do sexo em questão, e não do total de alunos. Exemplo: se de uma turma de 100, 50 foram reprovados e 10 destes são estudantes do sexo feminino, então 20% dos estudantes do sexo feminimo reprovaram, e não 10%. O percentual é relacionado com o universo de reprovados, e não do total de alunos.

O mesmo acontece se observamos as reprovações por ano e por disciplina. Existem raríssimas exceções onde estudantes do sexo feminino reprovaram mais em quantidade/percentual do que do sexo masculino (2008 em Desenho I e 2014 em Desenho II).

<br />
<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post9/figure16.png)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post9/figure16.png" alt="Gráficos de barras com reprovados por semestre, ano e disciplina (n°).">
</figure>
<br />
<br />
<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post9/figure17.png)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post9/figure17.png" alt="Gráficos de barras com reprovados por semestre, ano e disciplina (%).">
</figure>
<br />

Outro caso interessante são as reprovações por disciplina, semestre e ano. Na maioria dos anos, as reprovações em percentual e absolutas são maiores no 1° semestre para Desenho I e no 2° semestre para Desenho II. 

Faz sentido, já que Desenho I é pré-requisito para cursar Desenho II, que geralmente é no semestre subsequente. 

<br />
<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post9/figure18.png)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post9/figure18.png" alt="Gráficos de barras com reprovados por disciplina e forma de evasão (n°).">
</figure>
<br />

A maior parte dos reprovados por frequência em Desenho I acaba abandonando o curso de origem. Esta é uma realidade preocupante evidenciada pelo gráfico acima. O cenário é menos intenso em Desenho II, porém ainda preocupante. Vejam que uma parcela muito pequena dos estudantes que reprovaram nos Desenhos I e II se formaram ou são alunos regulares.

<br />
<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post9/figure19.png)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post9/figure19.png" alt="Gráficos de barras com número de estudantes por situação atual, disciplina e ano (n°).">
</figure>
<br />
<br />
<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post9/figure20.png)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post9/figure20.png" alt="Gráfico de linha com número de estudantes por situação atual, disciplina e ano (n°).">
</figure>
<br />
<br />
<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post9/figure21.png)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post9/figure21.png" alt="Gráfico de linha com percentual de estudantes por situação atual, disciplina e ano.">
</figure>
<br />

A diferença das reprovações por frequência e aprovações entre os Desenhos é evidenciada acima. Estudantes de Desenho I e II aparentemente tem mantido constante o seu desempenho nos últimos anos, de uma forma geral, apesar do cenário não ser satisfatório. Houveram variações significativas na quantidade de estudantes neste período analisado.

<br />
<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post9/figure22.png)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post9/figure22.png" alt="Gráfico de distribuição de médias finais dos alunos por semestre e ano em Desenho I, sem notas de alunos reprovados por frequência.">
</figure>
<br />
<br />
<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post9/figure23.png)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post9/figure23.png" alt="Gráfico de distribuição de médias finais dos alunos por semestre e ano em Desenho II, sem notas de alunos reprovados por frequência.">
</figure>
<br />

A distribuição das médias por ano e semestre, tanto em Desenho I como II, se concentram na nota 6, que é a nota mínima para aprovação. Em Desenho II, o desempenho dos estudantes tem sido muito superior ao de Desenho I.

<br />
<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post9/figure24.png)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post9/figure24.png" alt="Gráfico de densidade 2d de médias finais por ano e disciplina, sem notas de alunos reprovados por frequência.">
</figure>
<br />

Aqui novamente observamos a maior concentração das médias entre as notas 6 e 7, em Desenho I e II. O cenário é mais positivo em Desenho II, apesar de aparentemente ter piorado nos últimos anos (pois ocorreu maior concentração das médias em torno do 6 e 7, e menor concentração em notas mais altas, como aconteceu em anos entre 2007 e 2014).

<br />

```R
# Bar plot - reprovados por frequência por sexo (n e %)
by_sex <- statistics(all_data, "MEDIA_FINAL", SEXO)
by_sex_failed_by_attendance <- statistics(all_data[(all_data$SITUACAO == "Reprovado por Frequência"),], "MEDIA_FINAL", SEXO)

by_sex$per[by_sex$SEXO == "M"] <- round((by_sex_failed_by_attendance$n[by_sex_failed_by_attendance$SEXO == "M"] / by_sex$n[by_sex$SEXO == "M"]) * 100, 2)
by_sex$per[by_sex$SEXO =="F"] <- round((by_sex_failed_by_attendance$n[by_sex_failed_by_attendance$SEXO == "F"] / by_sex$n[by_sex$SEXO == "F"]) * 100, 2) 

by_sex$ndrop[by_sex$SEXO == "M"] <- round((by_sex_failed_by_attendance$n[by_sex_failed_by_attendance$SEXO == "M"]), 2)
by_sex$ndrop[by_sex$SEXO == "F"] <- round((by_sex_failed_by_attendance$n[by_sex_failed_by_attendance$SEXO == "F"]), 2) 

# Bar plot - reprovados por frequência por sexo (n e %)
a <- ggplot(by_sex, aes(x = SEXO, y = ndrop, fill = SEXO)) + 
        geom_chicklet(radius = grid::unit(10, 'mm')) +
        scale_fill_manual(name = "Sexo", values = c("#bc7b87","#7b87bc")) + 
        geom_text(data = by_sex, aes(label = ndrop), fontface = "bold", hjust = 0.5, 
                  vjust = 1.5, color = "white", size = 5) +
        xlab("\nSexo\n") + 
        ylab("\nNumero de Reprovados\n") + 
        ggtitle("\nReprovados por Frequencia", subtitle = "Desenho Tecnico I e II\n") +
        normal_theme + 
        theme(plot.title = element_text(size = 25)) 

b <- ggplot(data = by_sex, aes(x = SEXO, y = per, fill = SEXO)) + 
        geom_chicklet(radius = grid::unit(10, 'mm')) +
        scale_fill_manual(name = "Sexo", values = c("#bc7b87","#7b87bc")) +
        geom_text(data = by_sex, aes(label = paste(per, '%')), fontface = "bold", hjust = 0.5, 
                  vjust = 1.5, color = "white", size = 5) +
        xlab("\nSexo\n") + 
        ylab("\nPercentual de Reprovados\n") +
        ggtitle("\nReprovados por Frequencia", subtitle = "Desenho Tecnico I e II\n") +
        normal_theme + 
        theme(plot.title = element_text(size = 25))
        
c <- ggarrange(a, b, ncol = 2)

ggbackground(c, img)
savePlot(filename = "../images/figure13.png", type = "png", device = dev.cur())

# Bar plot - reprovados por frequência por sexo e disciplina (n e %)
frequency_failed_by_attendance_data <- all_data[(all_data$SITUACAO == "Reprovado por Frequência"),]

# por sexo e disciplina
a <- statistics(all_data, "MEDIA_FINAL", SEXO, DISCIPLINA)

# reprovados por freq. - por sexo e disciplina
b <- statistics(all_data[(all_data$SITUACAO == "Reprovado por Frequência"),], "MEDIA_FINAL", SEXO, DISCIPLINA)

b$per <- round((b$n[b$SEXO == a$SEXO && b$DISCIPLINA == a$DISCIPLINA] / 
                a$n[a$SEXO == b$SEXO && a$DISCIPLINA == b$DISCIPLINA]) * 100, 2) 

# Bar plot - reprovados por frequência - por sexo e disciplina (n e %)
fig <- ggplot(b, aes(DISCIPLINA, 
                     n, 
                     group = SEXO, 
                     color = SEXO)) + 
        geom_bar(stat = "identity", 
                 fill = "#101010", 
                 position = position_dodge2()) +
        geom_text(data = b, aes(label = paste(n,"(",per,"% )")), 
                  hjust = 0.5, 
                  vjust = 1.5, 
                  color = "white", 
                  size = 5, 
                  position = position_dodge2(width = 0.9)) +
        scale_fill_hue(c = 40) +
        scale_y_continuous(breaks = seq(0, 400, by = 50)) +
        xlab("\nDisciplina\n") + 
        ylab("\nNumero de reprovados\n") + 
        labs(fill = "Sexo") + 
        ggtitle("\nReprovados por frequencia\n\n") +
        normal_theme 

ggbackground(fig, img)
savePlot(filename = "../images/figure14.png", type = "png", device = dev.cur())

# Bar plot - reprovados por frequência por sexo, disciplina e ano (n e %)

# por sexo, disciplina e ano
a <- statistics(all_data, "MEDIA_FINAL", SEXO, DISCIPLINA, ANO)

# reprovados por frequência - por sexo, disciplina e ano
b  <- statistics(all_data[(all_data$SITUACAO == "Reprovado por Frequência"),], "MEDIA_FINAL", SEXO, DISCIPLINA, ANO)

b$per <- round((b$n[b$SEXO == a$SEXO && b$DISCIPLINA == a$DISCIPLINA && b$ANO == a$ANO] / 
                a$n[a$SEXO == b$SEXO && a$DISCIPLINA == b$DISCIPLINA && b$ANO == a$ANO]) * 100, 2) 

# Bar plot - reprovados por frequência por sexo, disciplina e ano (n e %)
fig1 <- ggplot(b, aes(ANO, n, color = SEXO)) + 
        geom_bar(stat = "identity", fill = "#101010", position = position_dodge2()) +
        scale_y_continuous(breaks = seq(0, 50, by = 5)) +
        scale_x_continuous(breaks = round(seq(min(b$ANO), max(b$ANO), by = 1), 1)) +
        scale_fill_hue(c = 40) +
        ylab("\nNum. de alunos\n") + xlab("\nAno\n") + labs(fill = "Sexo") + 
        ggtitle("\nReprovados por frequencia\n") +
        normal_theme +
        theme(plot.title = element_text(size = 25), axis.title = element_text(size = 18),
              axis.text = element_text(size = 12), strip.background = element_rect(fill = "#111111"), 
              strip.text = element_text(colour = 'white')) +
        facet_wrap(~DISCIPLINA) 

fig2 <- ggplot(b, aes(ANO, per, color = SEXO)) + 
        geom_bar(stat = "identity",  fill = "#101010", position = position_dodge2()) +
        scale_y_continuous(breaks = seq(0, 50, by = 5)) +
        scale_x_continuous(breaks = round(seq(min(b$ANO), max(b$ANO), by = 1), 1)) +
        scale_fill_hue(c = 40) +
        ylab("\nPercentual (%)\n") + xlab("\nAno\n") + labs(fill = "Sexo") +
        normal_theme +
        theme(plot.title = element_text(size = 25), axis.title = element_text(size = 18),
              axis.text = element_text(size = 12), strip.background = element_rect(fill = "#111111"), 
              strip.text = element_text(colour = 'white')) +
        facet_wrap(~DISCIPLINA) 

c <- ggarrange(fig1, fig2, nrow = 2)
x11(width = 15, height = 11.25)
ggbackground(c, img)
savePlot(filename = "../images/figure15.png", type = "png", device = dev.cur())

# Bar plot - reprovados por frequência - por semestre, disciplina e ano (n)

# by semestre + ano + disciplina
a <- statistics(all_data, "MEDIA_FINAL", PERIODO, DISCIPLINA, ANO)

# reprovados por frequência - por semestre, disciplina e ano
b  <- statistics(all_data[(all_data$SITUACAO == "Reprovado por Frequência"),], "MEDIA_FINAL", PERIODO, DISCIPLINA, ANO)

b$per <- round((b$n[b$PERIODO == a$PERIODO && b$DISCIPLINA == a$DISCIPLINA && b$ANO == a$ANO] / 
                  a$n[a$PERIODO == b$PERIODO && a$DISCIPLINA == b$DISCIPLINA && b$ANO == a$ANO]) * 100, 2) 

b$DISCIPLINA[b$DISCIPLINA == "DESENHO TECNICO I"] <- "DESENHO I"
b$DISCIPLINA[b$DISCIPLINA == "DESENHO TECNICO II"] <- "DESENHO II"

# Bar plot - reprovados por frequência - por semestre, disciplina e ano (n)
fig1 <- ggplot(b, aes(DISCIPLINA, 
                      n, 
                      fill = as.factor(PERIODO),
                      color = as.factor(PERIODO))) + 
        geom_bar(stat = "identity", 
                 position = position_dodge(),
                 alpha = 0.2) +
        scale_fill_hue(c = 50) +
        ylab("\nNum. de alunos\n") + 
        xlab("Disciplina\n") + 
        labs(fill = "", 
             color = "") + 
        ggtitle("\nReprovados por frequencia\n") +
        normal_theme + 
        theme(plot.title = element_text(size = 35), 
              axis.text = element_text(size = 12),
              legend.position = "top",
              strip.background = element_rect(fill = "#111111"), 
              strip.text = element_text(colour = 'white')) +
        facet_wrap(~ANO) 

ggbackground(fig1, img)
savePlot(filename = "../images/figure16.png", type = "png", device = dev.cur())

# Bar plot - reprovados por frequência - por semestre, disciplina e ano (%)
fig1 <- ggplot(b, aes(DISCIPLINA, 
                      per, 
                      fill = as.factor(PERIODO), 
                      color = as.factor(PERIODO))) + 
        geom_bar(stat = "identity", 
                 position = position_dodge(),
                 alpha = 0.2) +
        scale_fill_hue(c = 50) +
        ylab("\nPercentual\n") + 
        xlab("Disciplina") + 
        labs(fill = "", color = "") + 
        ggtitle("\nReprovados por frequencia\n") +
        normal_theme + 
        theme(plot.title = element_text(size = 35), 
              axis.text = element_text(size = 12),
              legend.position = "top",
              strip.background = element_rect(fill = "#111111"), 
              strip.text = element_text(colour = 'white')) +
        facet_wrap(~ANO) 

ggbackground(fig1, img)
savePlot(filename = "../images/figure17.png", type = "png", device = dev.cur())

# Bar plot - reprovados por frequência - por disciplina e modo de evasão (n)

# reprovados por frequência - por disciplina e modo de evasão
b  <- statistics(all_data[(all_data$SITUACAO == "Reprovado por Frequência"),], "MEDIA_FINAL", DISCIPLINA, FORMA_EVASAO)

b$FORMA_EVASAO[b$FORMA_EVASAO == "Reopção"] <- "Reopcao"
b$FORMA_EVASAO[b$FORMA_EVASAO == "Transferência"] <- "Transferencia"

# Bar plot - reprovados por frequência - por disciplina e modo de evasão (n)
fig1 <- ggplot(b, aes(DISCIPLINA, 
                      n, 
                      color = as.factor(FORMA_EVASAO),
                      fill = as.factor(FORMA_EVASAO))) + 
        geom_bar(stat = "identity", 
                 width = 0.5, 
                 alpha = 0.2,
                 position = position_dodge()) +
        scale_fill_hue(c = 50) + 
        ylab("\nNum. de alunos\n") + 
        labs(color = "Situacao atual",
             fill = "Situacao atual")  + 
        xlab("\nDisciplina\n") + 
        ggtitle("\nReprovados por frequencia por situacao\n") +
        normal_theme +
        theme(plot.title = element_text(size = 35)) 
       
ggbackground(fig1, img)
savePlot(filename = "../images/figure18.png", type = "png", device = dev.cur())

# Bar plot - todos alunos - por disciplina, situação atual e ano (n)

# por disciplina, situação atual e ano
b <- statistics(all_data, "MEDIA_FINAL", DISCIPLINA, SITUACAO, ANO)

b$DISCIPLINA[b$DISCIPLINA == "DESENHO TECNICO I"] <- "DESENHO I"
b$DISCIPLINA[b$DISCIPLINA == "DESENHO TECNICO II"] <- "DESENHO II"
b$SITUACAO[b$SITUACAO == "Reprovado por Frequência"] <- "Reprovado por Frequencia"

# Bar plot - todos alunos - por disciplina, situação atual e ano (n)
fig1 <- ggplot(b, aes(DISCIPLINA, 
                      n, 
                      fill = as.factor(SITUACAO),
                      color = as.factor(SITUACAO))) + 
        geom_bar(stat = "identity", 
                 width = 0.5, 
                 alpha = 0.2,
                 position = position_dodge()) +
        scale_fill_hue(c = 50) + 
        ylab("\nNum. de alunos\n") + 
        labs(color = "Situacao", 
             fill = "Situacao") + 
        xlab("\nDisciplina") + 
        ggtitle("\nAlunos por Ano, Disciplina e Situacao\n") +
        guides(fill = guide_legend(nrow = 3)) +
        normal_theme + 
        theme(plot.title = element_text(size = 30), 
              axis.text = element_text(size = 10), 
              legend.position = "top",
              strip.background = element_rect(fill = "#111111"), 
              strip.text = element_text(colour = 'white')) +
        facet_wrap(~ANO, nrow = 3) 

ggbackground(fig1, img)
savePlot(filename = "../images/figure19.png", type = "png", device = dev.cur())

# Line plot - todos alunos - por disciplina, situação atual e ano (n)
fig1 <- ggplot(b, aes(ANO, 
                      n, 
                      group = SITUACAO, 
                      color = SITUACAO)) + 
        geom_line(size = 1.5) +
        geom_point(size = 3, 
                   shape = 21, 
                   fill = "white") +
        scale_x_continuous(breaks = round(seq(min(b$ANO),
                                              max(b$ANO), 
                                              by = 1), 1)) +
        scale_y_continuous(breaks = round(seq(0, 
                                              max(b$n), 
                                              by = 10), 1)) +
        ylab("\nNum. de Alunos\n") + 
        xlab("\nAno") +
        labs(color = "Situacao do Aluno") + 
        ggtitle("\nAlunos por Ano, Disciplina e Situacao\n") +
        guides(color = guide_legend(nrow = 3)) +
        normal_theme +  
        theme(plot.title = element_text(size = 25), 
              axis.text = element_text(size = 12), 
              legend.position = "bottom",
              strip.background = element_rect(fill = "#111111"), 
              strip.text = element_text(colour = 'white')) +
        facet_wrap(~DISCIPLINA, nrow = 2) 

ggbackground(fig1, img)
savePlot(filename = "../images/figure20.png", type = "png", device = dev.cur())

# Line plot - todos alunos - por disciplina, situação atual e ano (%)

b <- as.data.frame(b %>% 
        group_by(ANO, DISCIPLINA) %>% 
        mutate(percent = 100*(n/sum(n))))

# Line plot - todos alunos - por disciplina, situação atual e ano (%)
fig1 <- ggplot(b, aes(ANO, 
                      percent, 
                      group = SITUACAO, 
                      color = SITUACAO)) + 
        geom_line(size = 1.5) +
        geom_point(size = 3, 
                   shape = 21, 
                   fill = "white") +
        scale_x_continuous(breaks = round(seq(min(b$ANO), 
                                              max(b$ANO), 
                                              by = 1),1)) +
        scale_y_continuous(breaks = round(seq(0, 100, by = 10),1)) +
        ylab("\nPercentual de Alunos (%)\n") + 
        xlab("\nAno") +
        labs(color = "Situacao do Aluno") + 
        ggtitle("\n% de Alunos por Situacao em cada Disciplina e Ano") +
        guides(color = guide_legend(nrow = 3)) +
        normal_theme +  
        theme(plot.title = element_text(size = 25), 
              axis.text = element_text(size = 12), 
              legend.position = "bottom", 
              legend.text = element_text(size = 14),
              strip.background = element_rect(fill = "#111111"), 
              strip.text = element_text(colour = 'white')) +
        facet_wrap(~DISCIPLINA, nrow = 2) 

ggbackground(fig1, img)
savePlot(filename = "../images/figure21.png", type = "png", device = dev.cur())

# Density curve plot - sem reprovados por frequência - nota final por semestre e ano em Desenho I
fig1 <- ggplot(partial_data[partial_data$DISCIPLINA == "DESENHO TECNICO I",], 
        aes(x = MEDIA_FINAL , 
            fill = as.factor(ANO), 
            colour = PERIODO)) +
        geom_density(alpha = 0.9, 
                     size = 1) + 
        scale_x_continuous(breaks = round(seq(min(partial_data$MEDIA_FINAL), 
                                              max(partial_data$MEDIA_FINAL), 
                                              by = 5), 10)) +
        xlab("\nMedia Final") + 
        ylab("\nDensidade\n") + 
        labs(fill = "Ano", 
             colour = "Semestre") +
        ggtitle("\nDistribuicao das Medias em Desenho I (Sem rep. por frequencia)\n") +
        normal_theme +       
        theme(strip.background = element_blank(), 
              strip.text = element_blank(), 
              axis.title = element_text(size = 18), 
              plot.title = element_text(size = 18), 
              axis.text = element_text(size = 15), 
              legend.position = "bottom", 
              legend.text = element_text(size = 15)) +
        facet_wrap(ANO ~ PERIODO, nrow = 5)

ggbackground(fig1, img)
savePlot(filename = "../images/figure22.png", type = "png", device = dev.cur())

# Density curve plot - sem reprovados por frequência - nota final por semestre e ano em Desenho II
fig1 <- ggplot(partial_data[partial_data$DISCIPLINA == "DESENHO TECNICO II",], 
        aes(x = MEDIA_FINAL , 
            fill = as.factor(ANO), 
            colour = PERIODO)) +
        geom_density(alpha = 0.9, 
                     size = 1) +
        scale_x_continuous(breaks = round(seq(min(partial_data$MEDIA_FINAL), 
                                              max(partial_data$MEDIA_FINAL), 
                                              by = 5), 10)) +
        xlab("\nMedia Final") + 
        ylab("\nDensidade") + 
        labs(fill = "Ano", 
             colour = "Semestre") +
        ggtitle("\nDistribuicao das Medias em Desenho II (Sem rep. por frequencia)\n") +
        normal_theme +       
        theme(strip.background = element_blank(), 
              strip.text = element_blank(), 
              axis.title = element_text(size = 18), 
              plot.title = element_text(size = 18), 
              axis.text = element_text(size = 15), 
              legend.position = "bottom", 
              legend.text = element_text(size = 15)) +
        facet_wrap(ANO ~ PERIODO, nrow = 5)

ggbackground(fig1, img)
savePlot(filename = "../images/figure23.png", type = "png", device = dev.cur())

# Density plot - sem reprovados por frequência - nota final por ano e disciplina
fig1 <- ggplot(partial_data,
        aes(x = ANO, y = MEDIA_FINAL)) +
        ggtitle("\nDensidade das Medias por Ano (Sem reprovados por frequencia)\n") +
        ylab("\nMedia Final\n") + xlab("\nAno") + 
        labs(fill = "Densidade") +      
        stat_density2d(aes(fill = ..density..), 
                       contour = F, 
                       geom = 'tile') +
      scale_fill_gradient(low = "black", high = "white") +
        geom_segment(aes(x = 2007, y = 6, xend = 2019, yend = 6), 
                     linetype = "dotted", colour = "black") +
        geom_segment(aes(x = 2007, y = 7, xend = 2019, yend = 7), 
                     linetype = "dotted", colour = "black") +
        geom_segment(aes(x = 2016, y = 0, xend = 2016, yend = 10), 
                     linetype = "dotted", colour = "black") +
        geom_segment(aes(x = 2018, y = 0, xend = 2018, yend = 10), 
                     linetype = "dotted", colour = "black") +
        scale_x_continuous(expand = c(0, 0), breaks = seq(2007, 2019, by = 1)) +
        scale_y_continuous(expand = c(0, 0), breaks = seq(0, 10, by = 1)) +
        normal_theme +       
        theme(axis.title = element_text(size = 18), 
              axis.text = element_text(size = 15), 
              panel.spacing = unit(2, "lines"), 
              plot.title = element_text(hjust = 0.5, size = 18), 
              axis.text.x = element_text(face = "bold", size = 8), 
              legend.key.width = unit(2, "cm"), 
              legend.position = "bottom", legend.text = element_text(size = 11)) +
        facet_wrap(~DISCIPLINA)

ggbackground(fig1, img)
savePlot(filename = "../images/figure24.png", type = "png", device = dev.cur())
```
<br />

Apesar dos resultados das análises serem visíveis, temos que corroborar com o uso de métodos estatísticos.

## Parte III - Estatísticas do Dataset 

Vamos testar hipóteses sobre as variáveis ​​independentes e a nota final dos alunos. Primeiro, separamos as análises, uma incluindo dados de Desenho Técnico I e a outra com dados de Desenho Técnico II, já que são disciplinas distintas. Começaremos com Desenho I.

Primeiro, transformamos os dados da coluna do período para números, representando o primeiro e o segundo semestres. Na sequência, o período e o ano são transformados em fatores, para trabalharmos na sequência com este formato.

<br />

```R
all_data$PERIODO[all_data$PERIODO == "1. Semestre"] <- 1
all_data$PERIODO[all_data$PERIODO == "2. Semestre"] <- 2
all_data$PERIODO <- as.factor(all_data$PERIODO)
all_data$ANO <- as.factor(all_data$ANO)
DT1 <- all_data[all_data$DISCIPLINA == "DESENHO TECNICO I",]
```
<br />

### Caso I: Performance dos Estudantes por Semestre e Ano em Desenho Técnico I 

Primeiro vamos checar as três pressuposições da análise de variância:

<p style = "color: #ff8080">
(1) <b>Amostras independentes</b> – uma observação não pode ser influenciada pela anterior ou pela próxima. Esse pressuposto garante que os dados sejam coletados aleatoriamente dentro do espaço amostral.
</p>

<p style = "color: #d2ff4d">
(2) <b>Resíduos seguem uma distribuição normal</b> – assume-se que a média geral dos resíduos é igual a zero, ou seja, distribuem-se normalmente. 
</p>

<p style = "color: #b3c6ff">
(3) <b>Homogeneidade das variâncias entre os grupos</b> – as variâncias dentro de cada grupo é aproximadamente igual àquela dentro de todos os grupos. Desta forma, cada tratamento contribui de forma igual para a soma dos quadrados.
</p>

<p style = "color: #ff8080">
No caso de (1): podemos assumir que cada estudante é responsável por seu respectivo esforço e, por consequência, suas notas. A influência entre alunos é desprezível neste caso. Portanto, o primeiro pressuposto está ok (isso vale para todas as análises na sequência).
</p>

<p style = "color: #d2ff4d">
No caso de (2): realizar o <b>teste de shapiro-walk</b>, para checar se os resíduos/erros possuem uma distribuição normal. Para isso, vamos antes executar uma análise de variância com o <b>aov</b> no R
</p>
<br />

```R
#              |  var. indep. | var. depend. | conjunto de dados
aov_result <- aov(MEDIA_FINAL ~ ANO * PERIODO, data = DT1)
shapiro.test(residuals(aov_result))

Shapiro-Wilk normality test

data:  residuals(aov_result)
W = 0.93032, p-value < 2.2e-16
```
<br />
<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post9/figure25.png)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post9/figure25.png" alt="Gráficos de caixa e violino com médias dos alunos por curso de graduação.">
</figure>

<br />
<p style = "color: #d2ff4d">
p-value < 0.05 : H0 (Hipótese Nula) rejeitada, a evidência de que a distribuição de resíduos não segue uma distribuição normal é estatisticamente significante.

Resultado: os resíduos não têm uma distribuição normal.
</p>
<p style = "color: #b3c6ff">
No caso de (3): teste de homogeneidade da variância entre grupos. Primeiro manualmente e depois com o <b>teste de Levene</b>.
</p>
<br />

```R
max(aggregate(MEDIA_FINAL ~ ANO + PERIODO, DT1, var)$MEDIA_FINAL)/min(aggregate(MEDIA_FINAL ~ ANO + PERIODO, DT1, var)$MEDIA_FINAL)

[1] 1.620751
```
<br />


[Regra empírica: Variações que não excedem a taxa de 1.5:1 entre a variância máxima e mínima não violam o pressuposto.](https://doi.org/10.3758/s13428-017-0918-2) 
<p style = "color: #b3c6ff">
Resultado: 1.62. A variação entre os grupos possui discrepâncias. Vamos confirmar com testes de Levene.
</p>

<br />

```R
leveneTest(MEDIA_FINAL ~ ANO, DT1, center = median)

Levenes Test for Homogeneity of Variance (center = median)
        Df F value    Pr(>F)    
group   12  4.6556 1.579e-07 ***
      2346                      
---
Signif. codes:  0 "***" 0.001 "**" 0.01 "*" 0.05 "." 0.1 " " 1

leveneTest(MEDIA_FINAL ~ PERIODO, DT1, center = median)

Levenes Test for Homogeneity of Variance (center = median)
        Df F value  Pr(>F)  
 group    1  6.2454 0.01252 *
       2357                  
 ---
 Signif. codes:  0 "***" 0.001 "**" 0.01 "*" 0.05 "." 0.1 " " 1

leveneTest(MEDIA_FINAL ~ ANO * PERIODO, DT1, center = median)

Levenes Test for Homogeneity of Variance (center = median)
         Df F value    Pr(>F)    
 group   24  2.2232 0.0005779 ***
       2334                      
 ---
 Signif. codes:  0 "***" 0.001 "**" 0.01 "*" 0.05 "." 0.1 " " 1
```
<br />

<p style = "color: #b3c6ff">
p-value < 0,05: H0 rejeitado em todos os testes de Levene, a evidência de que as variações entre os grupos (anos, semestres e ambos) são diferentes é estatisticamente significante.
</p>
<p style = "color: #ffccff;font-size: 35px">Oh good ! E agora?</p>

<b>Calma, podemos recorrer aos testes não-paramétricos...</b>

<p style = "color: #ffccff">
Uma das técnicas que é possível utilizar com violações das pressuposições da anova é o teste de Kruskal-Wallis. É testado se a função de distribuição das médias entre os grupos é igual (H0).
</p>
<br />

```R
kruskal.test(MEDIA_FINAL ~ ANO, DT1)

Kruskal-Wallis rank sum test
data:  MEDIA_FINAL by ANO
Kruskal-Wallis chi-squared = 134.28, df = 12, p-value < 2.2e-16

kruskal.test(MEDIA_FINAL ~ PERIODO, DT1)

Kruskal-Wallis rank sum test
data:  MEDIA_FINAL by PERIODO
Kruskal-Wallis chi-squared = 4.8196, df = 1, p-value = 0.02814

kruskal.test(MEDIA_FINAL ~ interaction(ANO, PERIODO), DT1)

Kruskal-Wallis rank sum test
data:  MEDIA_FINAL by interaction(ANO, PERIODO)
Kruskal-Wallis chi-squared = 172.89, df = 24, p-value < 2.2e-16
```
<br />
<p style = "color: #ffccff">
p-value < 0,05: H0 rejeitado em todos os testes de Kruskal-Wallis. Portanto, a diferença de distribuição das médias em pelo menos um dos grupos de anos e semestres é estatisticamente significante.
</p>

Vamos observar graficamente estes dados.
<br />
<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post9/figure26.png)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post9/figure26.png" alt="Distribuição de médias dos alunos por ano.">
</figure>
<br />
<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post9/figure27.png)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post9/figure27.png" alt="Distribuição de médias dos alunos por semestre.">
</figure>
<br />
<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post9/figure28.png)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post9/figure28.png" alt="Distribuição de médias dos alunos por ano e semestre.">
</figure>
<br />

É possível observar que no caso dos semestres, as distribuições possuem alguma semelhança. Por isso o p-value dos semestres como tratamento resultou em um valor mais próximo de 0.05. Ao verificarmos ano e ambos ano e semestre, as diferenças entre os grupos se mostraram mais significativas. 

Agora a questão que fica é: quais grupos possuem diferença significativa?

Antes vamos aplicar o teste de **size effect** com a função **multiVDA**. O teste indica a probabilidade da amostra de um grupo ser maior que a de outro grupo.

[Resultados: o VDA varia de 0 a 1, com 0.5 indicando igualdade estocástica e 1 indicando que o primeiro grupo domina o segundo. O CD varia de -1 a 1, com 0 indicando igualdade estocástica e 1 indicando que o primeiro grupo domina o segundo. r varia de aproximadamente -0,86 a 0,86, dependendo do tamanho da amostra, com 0 indicando nenhum efeito e um resultado positivo indicando que os valores no primeiro grupo são maiores que no segundo.](https://www.rdocumentation.org/packages/rcompanion/versions/2.3.0/topics/multiVDA)

<br />

```R
multiVDA(MEDIA_FINAL ~ ANO, data = DT1)
# Par de grupos mais distinto: 78.5% de probabilidade de valores de 2008 serem superiores aos de 2014.

multiVDA(MEDIA_FINAL ~ PERIODO, data = DT1)
# Par de grupos mais distinto: 47.4% de probabilidade de valores do primeiro semestre serem superiores aos do segundo.

multiVDA(MEDIA_FINAL ~ SEX, data = DT1)
# Par de grupos mais distinto: 51.4% de probabilidade de valores do sexo F serem superiores aos do sexo M.

multiVDA(MEDIA_FINAL ~ COD_CURSO, data = DT1)
# Par de grupos mais distinto: 60.1% de probabilidade de valores do curso BAEQ serem superiores aos do curso BALF.
```
<br />

Agora para finalizar vamos aplicar o teste de dunncan (dunnTest) para checar quais grupos de atributos pertencem a mesma classe de médias. Em outras palavras, quais grupos não possuem diferença estatística significante comparado com outros.

<br />

```R
PT = dunnTest(MEDIA_FINAL ~ ANO,
          data = DT1,
          method = "bh") 

O <- cldList(P.adj ~ Comparison,
          data = PT$res,
          threshold = 0.05,
          remove.zero = FALSE)
```
<br />
<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post9/figure29.png)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post9/figure29.png" alt="Resultados do teste de Dunncan.">
</figure>
<br />

As médias dos alunos em anos que pertencem a mesma label não possuem diferença estatística significativa. Este é o resultado que o teste nos trouxe. 

Infelizmente não é possível utilizar mais de uma variável dependente neste teste, mas a solução do problema é uma simples manipulação do dataframe, conforme apresento abaixo.

<br />

```R
merged_data <- transform(DT1, ANO_PERIODO = paste(ANO, '.', PERIODO))

PT = dunnTest(MEDIA_FINAL ~ ANO_PERIODO,
              data = merged_data,
              method = "bh") 

O <- cldList(P.adj ~ Comparison,
             data = PT$res,
             threshold = 0.05,
             remove.zero = FALSE)
```
<br />
<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post9/figure30.png)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post9/figure30.png" alt="Resultados do teste de Dunncan.">
</figure>
<br />

Agora vamos proceder as mesmas análises, porém com os alunos de Desenho Técnico II.

<p style = "color: #ff8080">
Caso (1): podemos assumir que cada estudante é responsável por seu respectivo esforço e, por consequência, suas notas. A influência entre alunos é desprezível neste caso. Portanto, o primeiro pressuposto está ok.
</p>

<p style = "color: #d2ff4d">
Caso (2): Os resíduos seguem uma distribuição normal?
</p>

<br />

```R
> DT2 <- all_data[all_data$DISCIPLINA == "DESENHO TECNICO II",]
> aov_result <- aov(MEDIA_FINAL ~ ANO * PERIODO, data = DT2)
> 
> # Normality of errors test
> shapiro.test(residuals(aov_result))

	Shapiro-Wilk normality test

data:  residuals(aov_result)
W = 0.88, p-value <0.0000000000000002
```
<br />
<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post9/figure31.png)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post9/figure31.png" alt="Histograma dos resíduos.">
</figure>
<br />

<p style = "color: #d2ff4d">
p-value < 0.05 : H0 (Hipótese Nula) rejeitada, a evidência de que a distribuição de resíduos não segue uma distribuição normal é estatisticamente significante.

Resultado: os resíduos não têm uma distribuição normal.
</p>
<p style = "color: #b3c6ff">
Caso (3): teste de homogeneidade da variância entre grupos. 
</p>

<br />

```R
> max(aggregate(MEDIA_FINAL ~ ANO + PERIODO, DT2, var)$MEDIA_FINAL)/min(aggregate(MEDIA_FINAL ~ ANO + PERIODO, DT2, var)$MEDIA_FINAL)
[1] 5.044
> 
> leveneTest(MEDIA_FINAL ~ ANO, DT2, center = median)
Levenes Test for Homogeneity of Variance (center = median)
        Df F value  Pr(>F)    
group   12    3.66 0.00002 ***
      1260                    
---
Signif. codes:  0 "***" 0.001 "**" 0.01 "*" 0.05 "." 0.1 " " 1
> leveneTest(MEDIA_FINAL ~ PERIODO, DT2, center = median)
Levenes Test for Homogeneity of Variance (center = median)
        Df F value Pr(>F)
group    1     1.3   0.25
      1271 
---
Signif. codes:  0 "***" 0.001 "**" 0.01 "*" 0.05 "." 0.1 " " 1              
> leveneTest(MEDIA_FINAL ~ ANO * PERIODO, DT2, center = median)
Levenes Test for Homogeneity of Variance (center = median)
        Df F value   Pr(>F)    
group   23    2.67 0.000033 ***
      1249                     
---
Signif. codes:  0 "***" 0.001 "**" 0.01 "*" 0.05 "." 0.1 " " 1
```
<br />

<p style = "color: #b3c6ff">
Onde p-value < 0,05: H0 rejeitado, a evidência de que as variações das médias entre os grupos (anos, e ambos semestres e anos) são diferentes é estatisticamente significante.
<br>
Onde p-value >= 0,05: H0 é aceita, a evidência de que as variações das médias entre os grupos de semestres são diferentes não é estatisticamente significante.
</p>

Como houveram violações dos pressupostos, vamos recorrer novamente aos métodos não-paramétricos.

<br />

```R
> kruskal.test(MEDIA_FINAL ~ ANO, DT2)

	Kruskal-Wallis rank sum test

data:  MEDIA_FINAL by ANO
Kruskal-Wallis chi-squared = 127, df = 12, p-value <0.0000000000000002

> kruskal.test(MEDIA_FINAL ~ PERIODO, DT2)

	Kruskal-Wallis rank sum test

data:  MEDIA_FINAL by PERIODO
Kruskal-Wallis chi-squared = 9.3, df = 1, p-value = 0.002

> kruskal.test(MEDIA_FINAL ~ interaction(ANO, PERIODO), DT2)

	Kruskal-Wallis rank sum test

data:  MEDIA_FINAL by interaction(ANO, PERIODO)
Kruskal-Wallis chi-squared = 142, df = 23, p-value <0.0000000000000002
```
<br />
<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post9/figure32.png)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post9/figure32.png" alt="Distribuição de médias dos alunos por ano.">
</figure>
<br />
<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post9/figure33.png)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post9/figure33.png" alt="Distribuição de médias dos alunos por semestre.">
</figure>
<br />
<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post9/figure34.png)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post9/figure34.png" alt="Distribuição de médias dos alunos por ano e semestre.">
</figure>
<br />

No caso dos semestres, as distribuições das médias possuem alguma semelhança. Ao verificarmos ano e ambos ano e semestre, as diferenças entre os grupos se mostraram mais significativas. Um resultado semelhante ao de Desenho Técnico I.

Agora vamos verificar quais grupos possuem semelhanças significativas.

<br />

```R
merged_data <- transform(DT2, ANO_PERIODO = paste(ANO, '.', PERIODO))

PT = dunnTest(MEDIA_FINAL ~ ANO_PERIODO,
              data = merged_data,
              method = "bh") 

O <- cldList(P.adj ~ Comparison,
             data = PT$res,
             threshold = 0.05,
             remove.zero = FALSE)
```
<br />
<br />
<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post9/figure35.png)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post9/figure35.png" alt="Resultados do teste de Dunncan.">
</figure>
<br />

Os resultados até o momento são compatíveis com o que visualizamos na etapa dos gráficos, não é mesmo? Essa é uma das numerosas importâncias da estatística em nossas vidas: extrair valiosas informações de amostras de um universo de infinitas possibilidades, e esboçar possíveis considerações sobre elas.

O que pudemos extrair destas análises?

- O curso de BAEQ tem médias superiores nos Desenhos comparada com outros cursos, enquanto que BALF possui desempenho inferior;

- Removidos os dados de reprovados por frequência, BAEC supera BAEQ em Desenho II;

- A diferença entre as médias é significativa entre anos e semestres, anos, e em alguns casos, em semestres distintos, tanto em Desenho I como Desenho II. 

- Há uma tendência de redução geral do desempenho em Desenho II;

- Estudantes do sexo feminino tem reprovado em menor quantidade e percentual do que estudantes do sexo masculino;

- Uma quantidade significativa dos estudantes que reprovam por frequência em Desenho I e II acabam desistindo do curso, e uma parcela muito pequena acaba se formando ou permanecendo nos cursos;

- As reprovações são maiores no 1° semestre para Desenho I e no 2° para Desenho II. Faz sentido por Desenho I ser pré-requisito de Desenho II;

- O desempenho em Desenho II é superior que em Desenho I em geral, e a quantidade de reprovados por frequência e por nota em Desenho II é menor do que em Desenho II.

- Não há um padrão muito claro no desempenho se considerarmos apenas o ano/tempo como variável;

O que seria possível agregar para enriquecermos estes resultados?

- informações do docente que ministrou a disciplina, assim como suas características (mestrado/doutorado/substituto/graduação/...);

- demais informações dos estudantes, como forma de ingresso, notas no enem por área de estudo, se o estudante trabalha, etc;

- incluir a forma de avaliação e formato de atividades adotado na disciplina;

# Considerações Finais

Bom pessoal, a ideia foi apresentar um passo a passo detalhado sobre o processo de análise exploratória de dados utilizando o R. Além disso, incluímos análises estatísticas para verificar diferenças entre grupos de médias, como diferenças entre cursos, anos, semestres e outras variáveis.

Espero que vocês tenham gostado do post e que ele tenha auxiliado vocês de alguma forma. 

**Agradeço especialmente ao professor Dr. Alexandro Schafer por ter compartilhado este dataset comigo, possibilitando a realização destas análises.** 

Quaisquer dúvidas, podem deixar comentários logo abaixo :-)

Valeu !! Até o próximo post !! :-) (refêrencias logo abaixo).

<div class="skills">
    <hr class="hr-text" data-content="############">
</div>

# Referências

- [Conjunto de dados de alunos de Desenho Técnico](https://github.com/Lubrum/Data_Analysis-Technical-Drawing). Acesso em: 15 de maio de 2020.

- [Effect of variance ratio on ANOVA robustness: Might 1.5 be the limit?](https://doi.org/10.3758/s13428-017-0918-2). Acesso em: 16 de maio de 2020.

- [MultiVDA - Pairwise Vargha And Delaney's A And Cliff's Delta](https://www.rdocumentation.org/packages/rcompanion/versions/2.3.0/topics/multiVDA). Acesso em: 16 de maio de 2020.

- [Undestanding boxplots](https://towardsdatascience.com/understanding-boxplots-5e2df7bcbd51). Acesso em: 16 de maio de 2020.






