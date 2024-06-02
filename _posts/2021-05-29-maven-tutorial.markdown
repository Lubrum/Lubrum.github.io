---
layout: post
title: Um tutorial completo sobre o Maven e o gerenciamento de dependências
subtitle: Explico em detalhes sobre como o Maven funciona e os fundamentos do gerenciamento de dependências com a linguagem Java.
date: 2021-08-02 01:22:00 -0300
categories: dependency management
language: Maven, Java
author: luciano_brum
---

- [Resumo](#resumo)
- [O que é gerenciamento de dependências](#o-que-é-gerenciamento-de-dependências)
- [Gerenciadores de dependências](#gerenciadores-de-dependências)
- [Apache Maven](#apache-maven)
- [Utilizando o Maven com o Eclipse](#utilizando-o-maven-com-o-eclipse)
- [Criação do projeto de exemplo](#criação-do-projeto-de-exemplo)
- [Arquivo pom.xml](#arquivo-pomxml)
- [Ciclo de vida do build com Maven](#ciclo-de-vida-do-build-com-maven)
- [Versionamento de dependências](#versionamento-de-dependências)
- [Tipos de dependências](#tipos-de-dependências)
- [Escopos de dependências](#escopos-de-dependências)
- [Executando o Maven via linha de comando](#executando-o-maven-via-linha-de-comando)
- [Executando o Maven via Eclipse](#executando-o-maven-via-eclipse)
<br>

# Resumo

E aí pessoal, beleza? 

A ideia deste post é compartilhar com vocês sobre como o Maven funciona e qual os conceitos por trás do gerenciamento de dependências. 

Os pré-requisitos para acompanhar este tutorial são:

- o conhecimento básico de inglês para leitura;

- ter uma versão do Java instalado;

- ter uma IDE para programação em Java com o Maven embutido (como o Eclipse, que já vem com uma versão do Maven) ou com o Maven instalado separadamente.

# O que é gerenciamento de dependências

Ao programar em Java (e em outras linguagens de backend), é muito comum precisarmos de funcionalidades especiais para testes automatizados, frameworks para web, funcionalidades para tratamento de tipos específicos de dados (XML, JSON, csv, etc), ou ainda, algoritmos específicos para um determinado problema. 

Se você é um programador com mais experiência, você mesmo pode criar essas funcionalidades. É um excelente exercício para o aprendizado, porém, na vida real, trabalhamos com prazos (*deadlines*) que muitas vezes inviabilizam essa prática, por ter um alto custo (de tempo para implementação, testes, validação, etc). Então, se não temos tempo suficiente para resolver estes problemas, o que fazer? 

Em vez de reinventar a roda, é possível utilizar o que já existe para economizarmos tempo (e por consequência, dinheiro). Muitos dos problemas que fazem parte do dia a dia de programadores, hoje, possuem soluções em código aberto (*open source*) disponibilizadas no **Github** para toda a comunidade. Essas soluções podem ser integradas e utilizadas em nossos projetos, e nesse caso, acabam se tornando uma dependência do projeto. A partir deste momento, as novas funcionalidades podem ser utilizadas no nosso projeto de modo que não seja necessário implementar toda a lógica necessária para resolver o problema. 

###### * É importante analisar as licenças destes projetos de código aberto e verificar o que é ou não permitido com relação ao uso comercial e não-comercial do software/dependência. 

Por exemplo, em Java, se precisarmos manipular dados no formato JSON, em vez de escrevermos toda a lógica para manipular esses dados e mapea-los para variáveis e objetos, podemos utilizar a biblioteca (*lib* ou *library*) [jackson](https://mvnrepository.com/artifact/com.fasterxml.jackson.core/jackson-core), que vai tornar a tarefa muito mais simples com muito menos esforço, utilizando um código testado por outros desenvolvedores em muitos projetos reais.

###### * Isso não quer dizer que todas as soluções de código aberto sejam amplamente utilizadas e testadas. Na verdade, uma parte ínfima delas que é amplamente usada, por isso, pesquise antes de sair utilizando dependências de forma irresponsável. 

Ainda, surgirão situações em que uma solução comum é necessária para vários projetos de uma organização, mas são problemas muito específicos e estratégicos que não podem estar disponibilizados em [plataformas de código aberto, como o Github](https://github.com/). 

Nesses casos, é possível que a própria organização crie a solução e a salve em um repositório interno e fechado para que os próprios colaboradores possam utilizar essas soluções como dependências nos projetos internos da empresa. São dependências que não são de código aberto.

A ideia por trás do gerenciamento de dependências é a de termos o controle sobre as dependências em nossos projetos, sejam essas dependências internas (da própria organização) ou externas (feitas por terceiros ou pela comunidade, em código aberto), para que o desenvolvedor possa focar mais na solução dos problemas específicos do negócio e menos nas dependências em si.

# Gerenciadores de dependências

Com o objetivo de simplificar e automatizar tarefas de gerenciamento de dependências, ao longo dos anos surgiram diversas ferramentas para resolver específicamente este problema. Abaixo, é descrita uma lista de ferramentas para gerenciamento de dependências para diversas linguagens de desenvolvimento:

- [NPM](https://docs.npmjs.com/about-npm-versions): aplicações web e **JavaScript**;
- [Yarn](https://yarnpkg.com/getting-started/install): aplicações web e **JavaScript**;
- [Composer](https://getcomposer.org/doc/01-basic-usage.md): aplicações **PHP**;
- [Maven](https://maven.apache.org/index.html): aplicações **Java e Kotlin**;
- [Gradle](https://docs.gradle.org/current/userguide/getting_started.html): aplicações **Java, Groovy, Kotlin, Android, Scala e JavaScript**;
- [NuGet](https://docs.microsoft.com/en-us/nuget/what-is-nuget): aplicações **.NET**;
- [Pip](https://pip.pypa.io/en/stable/quickstart/): aplicações **Python**;
- [Rubygem](https://guides.rubygems.org/rubygems-basics/): aplicações **Ruby**;
- [Mix](https://hexdocs.pm/mix/1.12/Mix.html): aplicações **Elixir**;
- [Hex](https://hex.pm/docs/usage): aplicações **Erlang**;
- [Cargo](https://doc.rust-lang.org/cargo/getting-started/installation.html): aplicações **Rust**;

Neste post, vou escrever em detalhes sobre como funciona o gerenciamento de dependências com o **Maven**. 

###### * No futuro pretendo fazer com mesmo com o Gradle ;).

# Apache Maven

O Maven é o gerenciador de dependências para desenvolvimento com Java (e também para Kotlin). A primeira versão estável foi liberada em julho de 2004. No momento de escrita deste artigo, o Maven está na versão 3.8.1, com o total de 1,435,611 pacotes publicados em 2020.

[No site do Maven](https://maven.apache.org/plugins/maven-resources-plugin/index.html), é possível ler a documentação completa sobre o Maven e seus respectivos plugins, muito utilizados para auxiliar no processo de automação do processo de *build* dos projetos. 

[No repositório central do Maven](https://mvnrepository.com/) podem ser encontradas as dependências que podem ser importadas nos nossos projetos. Eu utilizo muito esse site quando estou atualizando dependências antigas de projetos legados.

# Utilizando o Maven com o Eclipse

Para mostrar como utilizar o Maven, será utilizada a *IDE Eclipse* para a criação de um projeto de exemplo.

O objetivo é mostrar como funciona o gerenciamento de dependências com o Maven. Para quem utiliza outra IDE (como o *IntelliJ* ou o *VS Code*), não tem problema nenhum, pois o mais importante é a parte sobre como utilizar o Maven, que independe da IDE. Para os que desejarem acompanhar o tutorial com o Eclipse, [recomendo uma breve leitura na documentação](https://help.eclipse.org/2021-03/index.jsp) caso existam dúvidas. 

# Criação do projeto de exemplo

Vamos seguir o passo a passo para criar um projeto de exemplo com o Maven como gerenciador de dependências.

1- Clicar em *File -> new -> Other*...

<img class="img_content" src="{{ site.baseurl }}/assets/img/post11/figure1.png" alt="Imagem do Eclipse com o menu 'File -> Other' aberto.">

2- Selecionar *Maven* -> *Maven Project* e clicar em *Next*.

<img class="img_content" src="{{ site.baseurl }}/assets/img/post11/figure2.png" alt="Imagem do Eclipse com a seleção do projeto do tipo Maven.">

3- Desmarcar a opção "*Create a simple project*" e marque a opção "*Use default workspace location*" se desejar usar o diretório padrão do eclipse como base do projeto. Caso contrário, logo abaixo, você pode escolher manualmente o diretório do projeto. Após isso, clicar em *Next*.

<img class="img_content" src="{{ site.baseurl }}/assets/img/post11/figure3.png" alt="Imagem do Eclipse com a opção 'Use default workspace location' marcada e a opção 'Create a simple project' desmarcada.">

4- No campo *Filter*, digite *org.apache.maven.archetypes* e selecione o *Artifact Id **maven-archetype-quickstart***. Esse 'archetype' é o esqueleto de uma aplicação de exemplo com o Maven. Clique em *Next*.

<img class="img_content" src="{{ site.baseurl }}/assets/img/post11/figure4.png" alt="Imagem do Eclipse com a seleção do archetype Maven aberta, com a opção Artifact Id maven-archetype-quickstart selecionada">

5- Preencher os seguintes campos:

a) Group Id: é o identificador do projeto. O padrão de nomenclatura utilizado é **com.EMPRESA.PROJETO** OU **br.com.EMPRESA.PROJETO**, que geralmente é a hierarquia de diretórios do projeto. Aqui vou colocar **com.luciano.app**.

b) Artifact Id: é o identificador do projeto em si. Nomes compostos são geralmente separados por traços. Vou colocar **example-app**.

c) Version: é a versão inicial do projeto. Eu não gosto de usar o versionamento com palavras misturadas com números, mas a título de exemplo vamos usar o padrão oferecido pela IDE, a versão **0.0.1-SNAPSHOT**. Feito isso, clicar em **Finish** para criar o projeto.

<img class="img_content" src="{{ site.baseurl }}/assets/img/post11/figure5.png" alt="Imagem do Eclipse com os campos groupId, artifactId e version preenchidos.">

Ao abrir o arquivo pom.xml, teremos a visualização abaixo.

<img class="img_content" src="{{ site.baseurl }}/assets/img/post11/figure6.png" alt="Imagem do Eclipse com o arquivo pom.xml gerado aberto.">

- O código fonte e de testes que desenvolvemos em nossos projetos ficam na pasta *src*;

- As bibliotecas da versão do Java que estamos utilizando ficam em *JRE System Library[JavaSE-1.7]* (no meu caso, o Java 7); 

- As dependências do nosso projeto ficam em *Maven Dependencies* e os arquivos resultantes do build do projeto ficam em *target*; 

- Em *src*, ainda temos os subdiretórios main/java (onde fica o código fonte do projeto) e test/java (onde fica o código de testes automatizados).

# Arquivo pom.xml <a name="arquivo-pomxml"></a>

Gerenciamos as dependências e o processo de build do Maven pelo comando executado e pelo pom.xml. Vejamos abaixo cada uma das tags no projeto de exemplo.

**xml**: versão do xml utilizado e a codificação utilizada para o documento. Não é obrigatória, mas é recomendado o seu uso para que o parser saiba o encoding correto do documento.  

```xml
<?xml version="1.0" encoding="UTF-8"?>
```

**project**: Todas tags que representam nosso projeto vão no interior da tag *project*. As propriedades são opcionais.

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
```

**modelVersion**: indica que o descritor do projeto é compatível com as versões 2 e 3 do Maven. É uma tag obrigatória. 

```xml
<modelVersion>4.0.0</modelVersion>
```

###### * Para verificar a versão do Maven embutida no Eclipse: **Window -> Preferences -> Maven -> Installations**. Na imagem abaixo, temos a versão 3.6.3. 

<img class="img_content" src="{{ site.baseurl }}/assets/img/post11/figure7.png" alt="Imagem do Eclipse com a janela mostrando a versão do Maven embutida.">

###### * Para verificar a versão do Maven instalada por outros meios, abra o prompt de comando e digite **mvn -version**. No meu caso, tenho a versão 3.8.1 instalada.

**groupId, artifactId e version**: São as tags que definimos anteriormente ao criarmos o projeto. *GroupId* é a hierarquia de diretórios, *artifactId* é o ID do projeto em si e *version* é a versão do artefato.

```xml
<groupId>com.luciano.app</groupId>
<artifactId>example-app</artifactId>
<version>0.0.1-SNAPSHOT</version>
```

**name**: é a tag que representa o nome oficial do projeto e *url* é a url para acessar o site do projeto, caso exista. Como não temos um site, vou remover a tag *url*.

```xml
<name>example-app</name>
<!-- FIXME change it to the project's website -->
<url>http://www.example.com</url>
```

**properties**: são propriedades que serão utilizadas pelo próprio arquivo de dependências em um dos processos do ciclo de vida do Maven. Mais adiante vou explicar o que é este ciclo de vida. 

```xml
<properties>
  <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
  <maven.compiler.source>1.7</maven.compiler.source>
  <maven.compiler.target>1.7</maven.compiler.target>
</properties>
```

O projeto de exemplo veio com três propriedades:

**project.build.sourceEncoding**: define que o padrão de codificação dos arquivos do projeto é o UTF-8. Para mais detalhes sobre codificação, acesse [aqui](https://pt.wikipedia.org/wiki/Codifica%C3%A7%C3%A3o_de_caracteres).

```xml
<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
```

**maven.compiler.source e maven.compiler.target**: são argumentos para o compilador do Java, para o código fonte (*source*) e para o código gerado após o build (*target*). Podemos, a partir da versão 3.6 do maven-compiler-plugin e da versão 9 do JDK (Java), usar a tag **maven.compiler.release** com o mesmo efeito.

```xml
<maven.compiler.source>1.7</maven.compiler.source>
<maven.compiler.target>1.7</maven.compiler.target>

<!-- ou -->

<maven.compiler.release>1.7</maven.compiler.release>
```

###### * Dica: até a versão 8 do java, colocamos o prefixo '1.' antes da versão. Assim: 1.7 (versão 7), 1.8 (versão 8). A partir da versão 9, o número da versão não tem esse prefixo.

No meu caso, vou substituir pela versão do Java que eu utilizo com mais frequência, a versão 11. 

###### * Para fazer isso você precisa dessa versão do JDK (Java Development Kit) instalada no computador.
 
Para concretizar a mudança na IDE, clique em cima da pasta raíz do projeto -> Maven -> Update Project. Apenas clique em *Ok*. Para verificar se deu certo, verifique se o nome do diretório *JRE System Library[JavaSE-1.7]* mudou para *JRE System Library[JavaSE-11]*.

**dependencies**: todos os artefatos que usamos como dependências em nosso projeto devem ser colocados dentro dessa tag.

```xml
<dependencies>
  <dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.11</version>
    <scope>test</scope>
  </dependency>
</dependencies>
```

Para cada dependência, teremos uma tag *dependency* e dentro dela, informamos obrigatoriamente os seguintes identificadores da dependência: *groupId*, *artifactId* e *version*. O significado já foi apresentado [aqui](#criação-do-projeto-de-exemplo). 

**scope**: serve para limitar a **transitividade** da dependência e determinar o momento de incluir a mesma no *classpath*. 

No exemplo acima, *junit* é uma conhecida biblioteca no mundo Java para a criação de testes automatizados, como testes unitários. Ela só é utilizada durante os testes, não sendo necessária em outros momentos do ciclo de vida do projeto. Ao definir o *scope* como *test*, dizemos que a dependência só é requerida na fase de testes (fases *test-compile* e *test*) do Maven. 

###### * Veremos os outros possíveis valores dessa tag na sequência deste tutorial.

Caso queiramos adicionar outras dependências, basta adicioná-las seguindo o mesmo formato, conforme abaixo:

```xml
<dependencies>
  <dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.11</version>
    <scope>test</scope>
  </dependency>

  <dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-api</artifactId>
    <version>2.14.1</version>
  </dependency>

  <dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-core</artifactId>
    <version>2.14.1</version>
  </dependency>
</dependencies>
```

No caso, adicionamos o [log4j](https://logging.apache.org/log4j/2.x/index.html), uma biblioteca que permite criarmos logs para nossa aplicação de forma simples e prática. 

Uma pecualiaridade desse caso é que precisamos de duas dependências para usar essas funcionalidades. 

Nesses casos, há uma outra forma mais segura de se fazer essa declaração: utilizando [BOMs (Bill Of Materials)](https://howtodoinjava.com/maven/maven-bom-bill-of-materials-dependency/). 

Basicamente, o BOM garante que as versões de dependências diretas e transitivas de artefatos sejam as mesmas. Ainda, isso permite que não seja necessário declarar a tag *version* dos artefatos envolvidos nas *dependencies*. 

###### * Exemplo de dependência transitiva: a dependência A depende de B e B depende de C, portanto A depende de ambas B e C. C é uma dependência transitiva para A, pois A não requer C diretamente, mas B sim, e B é requerida por A.

Abaixo um exemplo de como usar o BOM com o log4j:

```xml
<dependencyManagement>
  <dependencies>
    <dependency>
      <groupId>org.apache.logging.log4j</groupId>
      <artifactId>log4j-bom</artifactId>
      <version>2.14.1</version>
      <scope>import</scope>
      <type>pom</type>
    </dependency>
  </dependencies>
</dependencyManagement>

<dependencies>
  <dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.11</version>
    <scope>test</scope>
  </dependency>

  <dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-api</artifactId>
  </dependency>

  <dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-core</artifactId>
  </dependency>
</dependencies>
```

Declaramos a BOM do log4j na tag *dependencyManagement*. Agora os artefatos log4j-api e log4j-core não precisam mais definir a versão em *version*, pois já foram definidos no BOM (como versão 2.14.1). 

Caso seja necessário atualizar no futuro a versão dessa dependência, basta atualizar o campo *version* do BOM em vez de atualizar cada *version* individualmente. 

###### * Cabe ressaltar que cada projeto é responsável pelo fornecimento do BOM, portanto nem todos os projetos tem essa funcionalidade/facilidade.

**build**: inclui os plugins que utilizamos no build do projeto. Segue o exemplo abaixo, gerado pela IDE.

```xml
<build>
  <pluginManagement>
    <plugins>
      <plugin>
        <artifactId>maven-clean-plugin</artifactId>
        <version>3.1.0</version>
      </plugin>

      <plugin>
        <artifactId>maven-resources-plugin</artifactId>
        <version>3.0.2</version>
      </plugin>

      <plugin>
        <artifactId>maven-compiler-plugin</artifactId>
        <version>3.8.0</version>
      </plugin>

      <plugin>
        <artifactId>maven-surefire-plugin</artifactId>
        <version>2.22.1</version>
      </plugin>

      <plugin>
        <artifactId>maven-jar-plugin</artifactId>
        <version>3.0.2</version>
      </plugin>

      <plugin>
        <artifactId>maven-install-plugin</artifactId>
        <version>2.5.2</version>
      </plugin>

      <plugin>
        <artifactId>maven-deploy-plugin</artifactId>
        <version>2.8.2</version>
      </plugin>

      <plugin>
        <artifactId>maven-site-plugin</artifactId>
        <version>3.7.1</version>
      </plugin>

      <plugin>
        <artifactId>maven-project-info-reports-plugin</artifactId>
        <version>3.0.0</version>
      </plugin>
    </plugins>
  </pluginManagement>
</build>
```

No xml acima temos os principais plugins, geralmente utilizados em projetos Java da vida real com o Maven (*não tive ainda a oportunidade de ver na prática o maven-site-plugin e o maven-project-info-reports-plugin, mas basicamente servem para gerar uma documentação do projeto em formato de site*). 

Antes de falar sobre os plugins, precisamos entender como funciona o ciclo de vida (*Lifecycle*) do build com o Maven.

# Ciclo de vida do build com Maven

Temos três *Lifecycles* no Maven:

- clean
- default
- site

Vou abordar aqui o *default* que é o que envolve mais fases do *build*.

Os *Lifecycles* são compostos por fases executadas em uma determinada ordem. O *default* é composto pelas seguintes fases (nessa ordem):

- **validate**:	verifica se o projeto está correto e possui as informações mínimas necessárias;

- **initialize**: inicializa o estado do build (seta propriedades ou cria diretórios);

- **generate-sources**:	gera código fonte para inclusão na compilação;

- **process-sources**: processa o código fonte (por exemplo, para filtrar valores);

- **generate-resources**: gera recursos para inclusão no pacote;

- **process-resources**: copia e processa os recursos para o diretório destino para o empacotamento (*packaging*);

- **compile**: compila o código fonte do projeto;

- **process-classes**:	pós processamento dos arquivos gerados pela compilação (por exemplo, melhoria do bytecode das classes Java);

- **generate-test-sources**: gera código fonte de teste para inclusão na compilação dos testes;

- **process-test-sources**:	processa o código fonte dos testes (por exemplo, para filtrar valores);

- **generate-test-resources**: cria recursos para os testes;

- **process-test-resources**: copia e processa os recursos para o diretório destino dos testes;

- **test-compile**: compila o código fonte dos testes para o diretório destino dos testes;

- **process-test-classes**:	pós processamento dos arquivos de teste gerados pela compilação (por exemplo, melhoria do bytecode das classes Java);

- **test**:	execução de testes com um framework de testes unitários. Tais testes não requerem que o código seja empacotado *packaged* ou implantado (*deployed*);

- **prepare-package**: executa operações necessárias para preparação do pacote. Resulta em uma versão não empacotada e processada do pacote;

- **package**: empacotamento do código fonte compilado em um formato distribuível, como o JAR;

- **pre-integration-test**:	executa ações requeridas antes da execução dos testes de integração (como montar um ambiente por exemplo);

- **integration-test**:	processa e implanta o pacote em um ambiente onde os testes de integração podem ser executados (se necessário);

- **post-integration-test**: executa ações requeridas após a execução dos testes de integração (como limpar o ambiente onde foram executados os testes, por exemplo);

- **verify**: execução de verificações se o pacote é válido e atinge os critérios de qualidade;

- **install**: instalação do pacote no repositório local para ser utilizado por outras dependências locais;

- **deploy**: feito em um ambiente de integração (*integration*) ou liberação (*release*), realiza a cópia do pacote final para o repositório remoto para compartilhamento com outros desenvolvedores e projetos.

A execução dessas fases depende também do modo de empacotamento **packaging** definido no pom.xml. Exemplos práticos, com mais detalhes, serão dados mais adiante.

Para o gerenciamento de cada fase do *lyfecycle*, os plugins do Maven nos auxiliam nesse processo.

**O [clean plugin](https://maven.apache.org/plugins/maven-clean-plugin/)** é utilizado para limpar o ambiente de um build executado anteriormente. Podemos customizar o processo, como quais diretórios excluir ou não.

```xml
<artifactId>maven-clean-plugin</artifactId>
```

**O [resources plugin](https://maven.apache.org/plugins/maven-resources-plugin/)** é utilizado para mover recursos do código fonte e de testes para diretórios específicos, entre outras tarefas relativas aos recursos do projeto.


```xml
<artifactId>maven-resources-plugin</artifactId>
```

**O [compiler plugin](https://maven.apache.org/plugins/maven-compiler-plugin/)** é utilizado no processo de compilação do código fonte e de testes. Podemos customizar os parâmetros da compilação, usar uma versão específica da JDK, entre outros.

```xml
<artifactId>maven-compiler-plugin</artifactId>
```

**O [surefire plugin](https://maven.apache.org/plugins/maven-surefire-plugin/)** é utilizado para a execução dos testes unitários do projeto. Podemos customizar os parâmetros da execução dos testes, como por exemplo, definir o framework de testes a ser utilizado.

```xml
<artifactId>maven-surefire-plugin</artifactId>
```

**O [jar plugin](https://maven.apache.org/plugins/maven-jar-plugin/)** é utilizado no processo de geração de jars nos processos de empacotamento do código. Podemos customizar os arquivos que serão empacotados, entre outras funcionalidades.

```xml
<artifactId>maven-jar-plugin</artifactId>
```

**O [install plugin](https://maven.apache.org/plugins/maven-install-plugin/)** é utilizado na fase *install* para instalar o projeto no repositório local do usuário, para que o projeto possa ser utilizado como dependência em outros projetos localmente. O repositório local costuma ser em **(~/.m2/repository)** mas a localização pode ser alterada no arquivo **(~/.m2/settings.xml)**, modificando o conteúdo na tag **localRepository**.

```xml
<artifactId>maven-install-plugin</artifactId>
```

O **[deploy plugin](https://maven.apache.org/plugins/maven-deploy-plugin/)** é utilizado na fase *deploy* para instalar o projeto no repositório remoto onde o projeto ficará disponível para outros projetos e desenvolvedores.

```xml
<artifactId>maven-deploy-plugin</artifactId>
```

# Versionamento de dependências

Uma prática comum adotada é a de declarar as versões das dependências do projeto na tag **properties**. No projeto de exemplo, ficaria assim. 

```xml
<properties>

  <!-- plugins versioning -->
  <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
  <maven.compiler.release>11</maven.compiler.release>
  <maven.clean.plugin.version>3.1.0</maven.clean.plugin.version>
  <maven.resources.plugin.version>3.0.2</maven.resources.plugin.version>
  <maven.compiler.plugin.version>3.8.0</maven.compiler.plugin.version>
  <maven.surefire.plugin.version>2.22.1</maven.surefire.plugin.version>
  <maven.jar.plugin.version>3.0.2</maven.jar.plugin.version>
  <maven.install.plugin.version>2.5.2</maven.install.plugin.version>
  <maven.deploy.plugin.version>2.8.2</maven.deploy.plugin.version>

  <!-- dependencies versioning -->
  <log4j.bom.version>2.14.1</log4j.bom.version>
  <junit.version>4.11</junit.version>

</properties>

<dependencyManagement>
  <dependencies>
    <dependency>
      <groupId>org.apache.logging.log4j</groupId>
      <artifactId>log4j-bom</artifactId>
      <version>${log4j.bom.version}</version>
      <scope>import</scope>
      <type>pom</type>
    </dependency>
  </dependencies>
</dependencyManagement>

<dependencies>
  <dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>${junit.version}</version>
    <scope>test</scope>
    </dependency>
  <dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-api</artifactId>
  </dependency>
  <dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-core</artifactId>
  </dependency>
</dependencies>

<build>
  <pluginManagement>
    <plugins>
      <plugin>
        <artifactId>maven-clean-plugin</artifactId>
        <version>${maven.clean.plugin.version}</version>
      </plugin>
      <plugin>
        <artifactId>maven-resources-plugin</artifactId>
        <version>${maven.resources.plugin.version}</version>
      </plugin>
      <plugin>
        <artifactId>maven-compiler-plugin</artifactId>
        <version>${maven.compiler.plugin.version}</version>
      </plugin>
      <plugin>
        <artifactId>maven-surefire-plugin</artifactId>
        <version>${maven.surefire.plugin.version}</version>
      </plugin>
      <plugin>
        <artifactId>maven-jar-plugin</artifactId>
        <version>${maven.jar.plugin.version}</version>
      </plugin>
      <plugin>
        <artifactId>maven-install-plugin</artifactId>
        <version>${maven.install.plugin.version}</version>
      </plugin>
      <plugin>
        <artifactId>maven-deploy-plugin</artifactId>
        <version>${maven.deploy.plugin.version}</version>
      </plugin>
    </plugins>
  </pluginManagement>
</build>
```

Para o junit, por exemplo, criamos a tag **junit.version** com valor 4.11. Ao definirmos a versão nas dependências, colocamos ${junit.version}. 

Ao executar o build do projeto, ${junit.version} será substituído pelo valor 4.11. 

Acredito que essa forma é mais adequada, pois as versões de todas dependências ficam centralizadas em um só lugar, não sendo necessário mais lidar com a lista de dependências, com menos riscos de erros ao atualizar versões.

# Tipos de dependências

As mais comuns são **pom** e **jar** (*default*). Elas são definidas na tag **type** em dependências presentes em **dependencyManagement**. O tipo *jar* é o padrão, que nos informa que a dependência do projeto é um jar (geralmente representa a extensão da dependência mas nem sempre é o caso). 

O caso *pom* é especial e será tratado na parte dos escopos de dependências. Ainda temos os tipos **war** e **ear**, comuns em sistemas legados com JBoss e versões antigas do Java. 

# Escopos de dependências

O **scope** das dependências pode ser:

- **Direto**: quando são definidas no arquivo pom.xml em **dependencies**;

- **Transitivo**: quando dependem de nossas dependências diretas (Exemplo: A depende de B que depende de C. B está declarada no projeto A e C está declarada no projeto B. Portanto, C é uma dependência transitiva para A);

Temos seis escopos no Maven: 

- **Compile**: Este é o escopo padrão, usado se nenhum for especificado. As dependências ficam disponíveis em todos os *classpaths* de um projeto. Além disso, essas dependências são propagadas para projetos dependentes.

###### * classpath: caminho completo das classes que são dependências diretas do projeto. [Fonte: em parte, traduzido do site oficial do Maven](https://maven.apache.org/guides/introduction/introduction-to-dependency-mechanism.html#dependency-scope)

- **Provided**: Indica que o JDK ou um contêiner forneça a dependência no tempo de execução (*runtime*). Por exemplo, ao construir um aplicativo web para o Java Enterprise Edition (JEE), as dependências da API Servlet e APIs Java EE seriam setadas com o escopo **provided** porque o contêiner web fornece essas classes. Uma dependência com este escopo é adicionada ao *classpath* usado para compilação e testes, mas não ao *classpath* do tempo de execução. Não é transitivo.

- **Runtime**: indica que a dependência não é necessária para compilação, mas sim para execução. O Maven inclui uma dependência com esse escopo no tempo de execução e nos caminhos de classe de teste, mas não no caminho de classe de compilação.

- **Test**: indica que a dependência está disponível apenas para as fases de compilação e testes. Este escopo não é transitivo. Normalmente, é usado para bibliotecas de teste, como JUnit e Mockito. Também é usado para bibliotecas como *Apache Commons IO*, se essas bibliotecas forem usadas em testes de unidade (src/test/java) mas não no código principal (src/main/java).

- **System**: semelhante ao **provided**, exceto que é preciso fornecer o JAR que o contém explicitamente, especificado na declaração da dependência (através da tag *systemPath*). O artefato está sempre disponível e não é consultado em um repositório. Não é recomendado seu uso por questões de portabilidade (exemplo: você garante que o caminho da dependência será o mesmo nos servidores ou nas máquinas/*containers* de todos os devs?).

- **Import**: é compatível apenas com dependências do tipo (**type**) **pom** na tag **dependencyManagement**. Indica que a dependência deve ser substituída pela lista efetiva de dependências no **dependencyManagement** do POM especificado. Uma vez que foram substituídas, as dependências com o escopo *import* não participarão na limitação da transitividade de uma dependência.

O caso do *import* é mais complicado, portanto vou exemplificar com [o exemplo do site oficial do Maven](https://maven.apache.org/guides/introduction/introduction-to-dependency-mechanism.html#dependency-management).

Vamos supor que temos os seguintes projetos.

Projeto X:

```xml
<project>
 <modelVersion>4.0.0</modelVersion>
 <groupId>maven</groupId>
 <artifactId>X</artifactId>
 <packaging>pom</packaging>
 <name>X</name>
 <version>1.0</version>
 
 <dependencyManagement>
   <dependencies>
     <dependency>
       <groupId>test</groupId>
       <artifactId>a</artifactId>
       <version>1.1</version>
     </dependency>
     <dependency>
       <groupId>test</groupId>
       <artifactId>b</artifactId>
       <version>1.0</version>
       <scope>compile</scope>
     </dependency>
   </dependencies>
 </dependencyManagement>
</project>
```

Projeto Y:


```xml
<project>
 <modelVersion>4.0.0</modelVersion>
 <groupId>maven</groupId>
 <artifactId>Y</artifactId>
 <packaging>pom</packaging>
 <name>Y</name>
 <version>1.0</version>
 
 <dependencyManagement>
   <dependencies>
     <dependency>
       <groupId>test</groupId>
       <artifactId>a</artifactId>
       <version>1.2</version>
     </dependency>
     <dependency>
       <groupId>test</groupId>
       <artifactId>c</artifactId>
       <version>1.0</version>
       <scope>compile</scope>
     </dependency>
   </dependencies>
 </dependencyManagement>
</project>
```

Projeto Z:

```xml
<project>
  <modelVersion>4.0.0</modelVersion>
  <groupId>maven</groupId>
  <artifactId>Z</artifactId>
  <packaging>pom</packaging>
  <name>Z</name>
  <version>1.0</version>
 
  <dependencyManagement>
    <dependencies>
      <dependency>
        <groupId>maven</groupId>
        <artifactId>X</artifactId>
        <version>1.0</version>
        <type>pom</type>
        <scope>import</scope>
      </dependency>
      <dependency>
        <groupId>maven</groupId>
        <artifactId>Y</artifactId>
        <version>1.0</version>
        <type>pom</type>
        <scope>import</scope>
      </dependency>
    </dependencies>
  </dependencyManagement>
</project>
```

O projeto Z importa as dependências de X e Y, porém ambas tem o artefato *a* com versões diferentes. 

Será importado o artefato mais próximo na hierarquia do projeto pai. 

Porém, neste caso, ambos estão no mesmo nível, então será importado o de X com a versão 1.1, pois foi declarado no pom de Z antes do artefato Y.

Ainda, Z não possui uma dependência direta do artefato *a*, pois se tivesse, essa que seria utilizada.

Outro exemplo:

Projeto A:

```xml
<project>
 <modelVersion>4.0.0</modelVersion>
 <groupId>maven</groupId>
 <artifactId>A</artifactId>
 <packaging>pom</packaging>
 <name>A</name>
 <version>1.0</version>
 <dependencyManagement>
   <dependencies>
     <dependency>
       <groupId>test</groupId>
       <artifactId>a</artifactId>
       <version>1.2</version>
     </dependency>
     <dependency>
       <groupId>test</groupId>
       <artifactId>b</artifactId>
       <version>1.0</version>
       <scope>compile</scope>
     </dependency>
     <dependency>
       <groupId>test</groupId>
       <artifactId>c</artifactId>
       <version>1.0</version>
       <scope>compile</scope>
     </dependency>
     <dependency>
       <groupId>test</groupId>
       <artifactId>d</artifactId>
       <version>1.2</version>
     </dependency>
   </dependencies>
 </dependencyManagement>
</project>
```

Projeto B:

```xml
<project>
  <modelVersion>4.0.0</modelVersion>
  <groupId>maven</groupId>
  <artifactId>B</artifactId>
  <packaging>pom</packaging>
  <name>B</name>
  <version>1.0</version>
 
  <dependencyManagement>
    <dependencies>
      <dependency>
        <groupId>maven</groupId>
        <artifactId>A</artifactId>
        <version>1.0</version>
        <type>pom</type>
        <scope>import</scope>
      </dependency>
      <dependency>
        <groupId>test</groupId>
        <artifactId>d</artifactId>
        <version>1.0</version>
      </dependency>
    </dependencies>
  </dependencyManagement>
 
  <dependencies>
    <dependency>
      <groupId>test</groupId>
      <artifactId>a</artifactId>
      <version>1.0</version>
      <scope>runtime</scope>
    </dependency>
    <dependency>
      <groupId>test</groupId>
      <artifactId>c</artifactId>
      <scope>runtime</scope>
    </dependency>
  </dependencies>
</project>
```

Neste exemplo, o projeto B possui o projeto A e suas dependências como dependência, exceto os artefatos **d** e **a** de A, pois os mesmos estão sendo declarados no projeto B. Todos artefatos (a, b, c, d) são da versão 1.0.

# Utilizando o Maven

Para demonstrar o uso do Maven, vamos fazer isso de duas formas: utilizando a linha de comando no terminal (CLI - *Command Line Interface*) e a própria IDE Eclipse.

## Executando o Maven via linha de comando

Para executar o Maven através da linha de comando, é possível utilizar o terminal do Ubuntu (Ctrl + T) ou a aba Terminal do próprio Eclipse. 

Para abrir o terminal no Eclipse: clicar em Window -> Show View -> Other, e selecionar Terminal, conforme as imagens abaixo.

<img class="img_content" src="{{ site.baseurl }}/assets/img/post11/figure8.png" alt="Imagem do Eclipse com o menu 'Window -> Show View -> Other...' aberto.">

<img class="img_content" src="{{ site.baseurl }}/assets/img/post11/figure9.png" alt="Imagem do Eclipse com a janela de seleção de menus com foco na opção Terminal.">

Logo após, clicar no ícone destacado no círculo amarelo, selecionar 'Local Terminal' e clicar em Ok.

<img class="img_content" src="{{ site.baseurl }}/assets/img/post11/figure10.png" alt="Imagem das janelas inferiores do Eclipse com foco no botão de abertura de janela de Terminal.">

<img class="img_content" src="{{ site.baseurl }}/assets/img/post11/figure11.png" alt="Imagem do Eclipse com o menu de abertura de Terminal com a opção 'Terminal Local' selecionada em 'Choose Terminal' e 'UTF-8' em 'Encoding'">

Agora, é preciso ir ao terminal e digitar o *path* (local) do projeto. Para isso, basta utilizar o comando **cd** e logo após, o path completo de onde está localizado o projeto.

Exemplo: 

```bash
cd /home/usuario_x/projetos/example_project
```

###### * Caso tenha dúvidas sobre comandos básicos de bash/shell no Linux, [recomendo a leitura deste artigo da Hostinger, em português](https://www.hostinger.com.br/tutoriais/comandos-linux).

Agora vamos executar algumas fases do ciclo de vida do Maven. Digite o comando abaixo no terminal:

```bash
mvn clean
```

O comando acima executa a fase 'clean' do ciclo de vida do Maven. Abaixo, a saída exibida no terminal.

```java
[INFO] Scanning for projects...
[INFO] 
[INFO] ------------------< com.luciano.app:example-project >-------------------
[INFO] Building example-project 0.0.1-SNAPSHOT
[INFO] --------------------------------[ jar ]---------------------------------
[INFO] 
[INFO] --- maven-clean-plugin:3.1.0:clean (default-clean) @ example-project ---
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  0.312 s
[INFO] Finished at: 2021-07-11T23:01:02-03:00
[INFO] ------------------------------------------------------------------------
```

A mensagem acima informa que o **clean** funcionou conforme o esperado, ou seja, excluiu todo o conteúdo do diretório *target*, na raíz do projeto. O conteúdo desse diretório é o resultado do processamento de builds executados anteriormente.

Agora, o comando 'compile':

```bash
mvn compile
```

Resultado:

```java
[INFO] Scanning for projects...
[INFO] 
[INFO] ------------------< com.luciano.app:example-project >-------------------
[INFO] Building example-project 0.0.1-SNAPSHOT
[INFO] --------------------------------[ jar ]---------------------------------
[INFO] 
[INFO] --- maven-resources-plugin:3.0.2:resources (default-resources) @ example-project ---
[INFO] Using 'UTF-8' encoding to copy filtered resources.
[INFO] skip non existing resourceDirectory /home/lu/Lubrum/example-project/src/main/resources
[INFO] 
[INFO] --- maven-compiler-plugin:3.8.0:compile (default-compile) @ example-project ---
[INFO] Changes detected - recompiling the module!
[INFO] Compiling 1 source file to /home/lu/Lubrum/example-project/target/classes
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  4.252 s
[INFO] Finished at: 2021-07-11T23:08:05-03:00
[INFO] ------------------------------------------------------------------------
```

O resultado acima informa que o *compile* executou com sucesso, ou seja, o código fonte foi compilado com sucesso. Neste processo, o *Maven* executou as fases *process-resources* e *compile*. Como não existem recursos em nosso projeto de exemplo, o *Maven* exibiu as mensagens abaixo:

```java
[INFO] --- maven-resources-plugin:3.0.2:resources (default-resources) @ example-project ---
[INFO] Using 'UTF-8' encoding to copy filtered resources.
[INFO] skip non existing resourceDirectory /home/lu/Lubrum/example-project/src/main/resources
```

Por padrão, as fases executadas em um projeto dependem do modo de empacotamento (**packaging**) definido no pom.xml. Se nenhum modo for definido, é utilizado o modo *jar*. 

Para o *jar*, temos por padrão as seguintes fases, nessa ordem: 

- process-resources, compile, process-test-resources, test-compile, test, package, install e deploy;

Foi definido como objetivo a fase *compile*, portanto as fases anteriores e a escolhida (*process-resources* e *compile*) foram executadas.

Agora vamos executar o comando para limpar o diretório *target* e empacotar nosso código.

```bash
mvn clean package
```

```java
[INFO] Scanning for projects...
[INFO] 
[INFO] ------------------< com.luciano.app:example-project >-------------------
[INFO] Building example-project 0.0.1-SNAPSHOT
[INFO] --------------------------------[ jar ]---------------------------------
[INFO] 
[INFO] --- maven-clean-plugin:3.1.0:clean (default-clean) @ example-project ---
[INFO] Deleting /home/lu/Lubrum/example-project/target
[INFO] 
[INFO] --- maven-resources-plugin:3.0.2:resources (default-resources) @ example-project ---
[INFO] Using 'UTF-8' encoding to copy filtered resources.
[INFO] skip non existing resourceDirectory /home/lu/Lubrum/example-project/src/main/resources
[INFO] 
[INFO] --- maven-compiler-plugin:3.8.0:compile (default-compile) @ example-project ---
[INFO] Changes detected - recompiling the module!
[INFO] Compiling 1 source file to /home/lu/Lubrum/example-project/target/classes
[INFO] 
[INFO] --- maven-resources-plugin:3.0.2:testResources (default-testResources) @ example-project ---
[INFO] Using 'UTF-8' encoding to copy filtered resources.
[INFO] skip non existing resourceDirectory /home/lu/Lubrum/example-project/src/test/resources
[INFO] 
[INFO] --- maven-compiler-plugin:3.8.0:testCompile (default-testCompile) @ example-project ---
[INFO] Changes detected - recompiling the module!
[INFO] Compiling 1 source file to /home/lu/Lubrum/example-project/target/test-classes
[INFO] 
[INFO] --- maven-surefire-plugin:2.22.1:test (default-test) @ example-project ---
[INFO] 
[INFO] -------------------------------------------------------
[INFO]  T E S T S
[INFO] -------------------------------------------------------
[INFO] Running com.luciano.app.example_project.AppTest
[INFO] Tests run: 1, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.028 s - in com.luciano.app.example_project.AppTest
[INFO] 
[INFO] Results:
[INFO] 
[INFO] Tests run: 1, Failures: 0, Errors: 0, Skipped: 0
[INFO] 
[INFO] 
[INFO] --- maven-jar-plugin:3.0.2:jar (default-jar) @ example-project ---
[INFO] Building jar: /home/lu/Lubrum/example-project/target/example-project-0.0.1-SNAPSHOT.jar
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  2.800 s
[INFO] Finished at: 2021-07-11T23:57:20-03:00
[INFO] ------------------------------------------------------------------------
```

As seguintes fases foram executadas: clean, process-resources, compile, process-test-resources, test-compile, test e package. 

Perceba que a fase *clean* não faz parte do processo de build *default* para o modo *jar*, mas como incluímos no comando, ele foi primeiramente executado, e logo após, a fase *package*. Podemos executar uma sequência de várias fases do *lifecycle* especificando argumentos e definindo objetivos (*goals*), se assim desejarmos.

Na fase *compile* foram compilados os códigos fontes em /src/main/java e na fase *testCompile* foram compilados os códigos de testes em /src/test/java. Ainda, após a compilação do código de testes, foram executados os testes em si, na fase **test**. 

Não vou entrar no mérito da lógica e funcionamento dos testes unitários com o JUnit, por si só é um assunto para um livro inteiro. Quem sabe um dia eu escreva algo por aqui? :-)

Por fim, foi feito o empacotamento do código resultante do processo de **build** no formato .jar na pasta **target**. Lá deve conter um arquivo com o nome **example-project-0.0.1-SNAPSHOT.jar**. 

Se abrirmos o conteúdo do jar, veremos que ele possui dois diretórios:

- **com**: possui todo o código compilado pelo Maven, seguindo a estrutura original de diretórios do projeto;

- **META-INF**: possui o arquivo MANIFEST.MF com informações do build/projeto e o diretório **Maven** com os arquivos pom.xml (o mesmo que criamos) e pom.properties (com detalhes do projeto empacotado).

Ok, agora vamos proceder para a instalação do projeto no nosso repositório local:

```bash
mvn install
```

```java
.
.
. 
(mesmas mensagens apresentadas anteriormente até a fase package)
.
.
.
[INFO] --- maven-install-plugin:2.5.2:install (default-install) @ example-project ---
[INFO] Installing /home/lu/Lubrum/example-project/target/example-project-0.0.1-SNAPSHOT.jar to /home/lu/.m2/repository/com/luciano/app/example-project/0.0.1-SNAPSHOT/example-project-0.0.1-SNAPSHOT.jar
[INFO] Installing /home/lu/Lubrum/example-project/pom.xml to /home/lu/.m2/repository/com/luciano/app/example-project/0.0.1-SNAPSHOT/example-project-0.0.1-SNAPSHOT.pom
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  4.008 s
[INFO] Finished at: 2021-07-12T00:15:51-03:00
[INFO] ------------------------------------------------------------------------
```

Após a mensagem de sucesso, podemos verificar no diretório apresentado acima o conteúdo dessa instalação do Maven (em /home/lu/.m2...).

###### * Conforme mencionado anteriormente no tutorial, o diretório **(~/.m2/repository)** geralmente é o padrão de instalação de dependências no ambiente local.

Temos quatro arquivos: o .jar gerado na fase *package*, o arquivo .pom (uma cópia do pom.xml), o *maven-metadata-local* (arquivo com metadados do projeto, gerenciado pelo Maven) e um _remote.repositories (arquivo também gerenciado pelo Maven, que serve para se saber de onde foram geradas as dependências).

Ok, nosso projeto está instalado no ambiente local. O que isso significa?

Significa que podemos importar este projeto como dependência em outros projetos locais que forem desenvolvidos. Para isso, basta declararmos no novo projeto o seguinte (no pom.xml, na tag *dependencies*):

```xml
<dependencies>
  .
  .
  .
  outras dependências
  .
  .
  .
  <dependency>
    <groupId>com.luciano.app</groupId>
    <artifactId>example-app</artifactId>
    <version>0.0.1-SNAPSHOT</version>
  </dependency>
</dependencies>
```

Com isso, importamos as funcionalidades do **example-app** neste hipetético novo projeto !

Para exemplificar o deploy do projeto, vou utilizar como gerenciador de repositórios local o **Archiva**. Na prática, é possível instalar o *Archiva* em um servidor e instruir o *Maven* para fazer o deploy neste servidor (que pode ser em ambiente local, ou remoto na nuvem com serviços providos pela AWS, Google Cloud, Azure, etc). 

Para instalar o archiva:

- baixe o arquivo tar.gz do [site do archiva](https://archiva.apache.org/download.cgi);
- extraia o conteúdo do pacote em um diretório de sua preferência;
- na pasta **bin**, execute o comando **./archiva start**;
- verifique no navegador o archiva em http://localhost:8080;
- crie um usuário e senha para o acesso ao archiva;

Podemos utilizar o próprio repositório que o archiva já oferece para instalar nossos artefatos. Nesse caso, o repositório internal (você pode verificar quais repositórios existem no archiva no menu à esquerda, em *repositories*).

Feito tudo isso, agora precisamos modificar nosso arquivo pom.xml do projeto e o settings.xml do Maven, geralmente localizado em /home/usuario/.m2.

Vamos adicionar o seguinte no pom.xml:


```xml
	<repositories>
		<repository>
			<id>archiva.internal</id>
			<name>repositorio interno local</name>
			<url>http://localhost:8080/repository/internal/</url>
		</repository>
	</repositories>

	<distributionManagement>
		<repository>
			<id>archiva.internal</id>
			<name>repositorio interno local</name>
			<url>http://localhost:8080/repository/internal/</url>
		</repository>
	</distributionManagement>
```

A tag *repositories* indica ao Maven o local de onde os artefatos devem ser importados para satisfazer as dependências do projeto. Por padrão, o Maven tenta resolver as dependências através do repositório central do Maven. 

A tag *distributionManagement* indica ao maven os repositórios para onde devem ser enviados os artefatos construídos na fase de *deploy* do Maven. 

Neste exemplo, adicionei o mesmo repositório em ambos, o **archiva.internal**, para que o nosso projeto possa baixar dependências que não estão no repositório central do Maven. E também para que na fase *deploy* o nosso projeto seja enviado para o nosso repositório privado do archiva.

Agora vamos adicionar o seguinte trecho no arquivo *settings.xml* no diretório .m2:


```xml
<settings>
  <servers>
    <server>
      <id>archiva.internal</id>
      <username>MEU_USUARIO_DO_ARCHIVA</username>
      <password>MINHA_SENHA_DO_ARCHIVA</password>
    </server>
  </servers>
</settings>
```

Com essas tags, estamos informando ao Maven que o repositório **archiva.internal** possui o nome de usuário e senha definidos neste arquivo. Em outras palavras, para enviar arquivos ao archiva é necessária essa autenticação.

Por fim, para testar se o deploy vai funcionar, basta executarmos abaixo o comando:

```bash
mvn deploy
```

```java
[INFO] Scanning for projects...
[INFO] 
[INFO] ------------------< com.luciano.app:example-project >-------------------
[INFO] Building example-project 0.0.1-SNAPSHOT
[INFO] --------------------------------[ jar ]---------------------------------
[INFO] 
[INFO] --- maven-resources-plugin:3.0.2:resources (default-resources) @ example-project ---
[INFO] Using 'UTF-8' encoding to copy filtered resources.
[INFO] skip non existing resourceDirectory /home/lu/Lubrum/example-project/src/main/resources
[INFO] 
[INFO] --- maven-compiler-plugin:3.8.0:compile (default-compile) @ example-project ---
[INFO] Nothing to compile - all classes are up to date
[INFO] 
[INFO] --- maven-resources-plugin:3.0.2:testResources (default-testResources) @ example-project ---
[INFO] Using 'UTF-8' encoding to copy filtered resources.
[INFO] skip non existing resourceDirectory /home/lu/Lubrum/example-project/src/test/resources
[INFO] 
[INFO] --- maven-compiler-plugin:3.8.0:testCompile (default-testCompile) @ example-project ---
[INFO] Nothing to compile - all classes are up to date
[INFO] 
[INFO] --- maven-surefire-plugin:2.22.1:test (default-test) @ example-project ---
[INFO] 
[INFO] -------------------------------------------------------
[INFO]  T E S T S
[INFO] -------------------------------------------------------
[INFO] Running com.luciano.app.example_project.AppTest
[INFO] Tests run: 1, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.078 s - in com.luciano.app.example_project.AppTest
[INFO] 
[INFO] Results:
[INFO] 
[INFO] Tests run: 1, Failures: 0, Errors: 0, Skipped: 0
[INFO] 
[INFO] 
[INFO] --- maven-jar-plugin:3.0.2:jar (default-jar) @ example-project ---
[INFO] 
[INFO] --- maven-install-plugin:2.5.2:install (default-install) @ example-project ---
[INFO] Installing /home/lu/Lubrum/example-project/target/example-project-0.0.1-SNAPSHOT.jar to /home/lu/.m2/repository/com/luciano/app/example-project/0.0.1-SNAPSHOT/example-project-0.0.1-SNAPSHOT.jar
[INFO] Installing /home/lu/Lubrum/example-project/pom.xml to /home/lu/.m2/repository/com/luciano/app/example-project/0.0.1-SNAPSHOT/example-project-0.0.1-SNAPSHOT.pom
[INFO] 
[INFO] --- maven-deploy-plugin:2.8.2:deploy (default-deploy) @ example-project ---
[INFO] Downloading from archiva.local: http://localhost:8080/repository/internal/com/luciano/app/example-project/0.0.1-SNAPSHOT/maven-metadata.xml
[INFO] Downloaded from archiva.local: http://localhost:8080/repository/internal/com/luciano/app/example-project/0.0.1-SNAPSHOT/maven-metadata.xml (367 B at 1.1 kB/s)
[INFO] Uploading to archiva.local: http://localhost:8080/repository/internal/com/luciano/app/example-project/0.0.1-SNAPSHOT/example-project-0.0.1-20210725.224704-2.jar
[INFO] Uploaded to archiva.local: http://localhost:8080/repository/internal/com/luciano/app/example-project/0.0.1-SNAPSHOT/example-project-0.0.1-20210725.224704-2.jar (3.0 kB at 16 kB/s)
[INFO] Uploading to archiva.local: http://localhost:8080/repository/internal/com/luciano/app/example-project/0.0.1-SNAPSHOT/example-project-0.0.1-20210725.224704-2.pom
[INFO] Uploaded to archiva.local: http://localhost:8080/repository/internal/com/luciano/app/example-project/0.0.1-SNAPSHOT/example-project-0.0.1-20210725.224704-2.pom (3.4 kB at 76 kB/s)
[INFO] Downloading from archiva.local: http://localhost:8080/repository/internal/com/luciano/app/example-project/maven-metadata.xml
[INFO] Downloaded from archiva.local: http://localhost:8080/repository/internal/com/luciano/app/example-project/maven-metadata.xml (327 B at 20 kB/s)
[INFO] Uploading to archiva.local: http://localhost:8080/repository/internal/com/luciano/app/example-project/0.0.1-SNAPSHOT/maven-metadata.xml
[INFO] Uploaded to archiva.local: http://localhost:8080/repository/internal/com/luciano/app/example-project/0.0.1-SNAPSHOT/maven-metadata.xml (780 B at 78 kB/s)
[INFO] Uploading to archiva.local: http://localhost:8080/repository/internal/com/luciano/app/example-project/maven-metadata.xml
[INFO] Uploaded to archiva.local: http://localhost:8080/repository/internal/com/luciano/app/example-project/maven-metadata.xml (326 B at 20 kB/s)
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  6.047 s
[INFO] Finished at: 2021-07-25T19:47:05-03:00
[INFO] ------------------------------------------------------------------------
```

Podemos verificar nas mensagens que o Maven executou as fases anteriores ao **deploy**, e logo após, executou a fase **deploy**. 

Para verificar se o arquivo foi para o repositório archiva, [abrir este link](http://localhost:8080/repository/internal).

<img class="img_content" src="{{ site.baseurl }}/assets/img/post11/figure12.png" alt="Imagem do Archiva na url do repositório 'internal'.">

Ao navegar em /com/luciano/app, vemos que temos a pasta relativa à versão do projeto (**0.0.1-SNAPSHOT**). 

<img class="img_content" src="{{ site.baseurl }}/assets/img/post11/figure13.png" alt="Archiva na pasta do projeto que foi feito o processo de deploy pelo Maven.">

Ao entrar nessa pasta, temos o arquivo .jar com o nosso projeto em si com os códigos compilados, o pom.xml que informa as dependências do projeto e o arquivo maven-metadata.xml com metadados úteis para este processo de gerenciamento dos artefatos pelo Maven.

<img class="img_content" src="{{ site.baseurl }}/assets/img/post11/figure14.png" alt="Archiva na pasta do projeto que foi feito o processo de deploy pelo Maven.">

## Executando o Maven via Eclipse

Em vez de utilizar comandos no terminal, é possível utilizar a própria IDE para executar os comandos do Maven. No caso do Eclipse, os passos são os seguintes:

- clicar no menu superior em Run -> Run Configurations:

<img class="img_content" src="{{ site.baseurl }}/assets/img/post11/figure15.png" alt="Menu superior Run do Eclipse, com a opção Run Configurations destacada.">

- selecionar a opção Maven Build, clicar com o botão direito e escolher a opção **New Configuration**:  

<img class="img_content" src="{{ site.baseurl }}/assets/img/post11/figure16.png" alt="Opção Maven Build com a opção 'New Configuration' destacada.">

- na aba **Main**, preencher o nome da configuração no campo **name**, definir o caminho do diretório do projeto em **Base Directory** (clicando em Workspace é possível buscar esse diretório) e no campo **Goals** definir a instrução do Maven desejada. No exemplo abaixo, foi definido o comando **clean**, relativo à fase *clean* do ciclo de vida do Maven.

<img class="img_content" src="{{ site.baseurl }}/assets/img/post11/figure17.png" alt="Aba 'Main' da criação de configuração Maven, com destaque para os campos 'name', 'Base Directory' e 'Goals'.">

- adicionalmente, podemos também definir com qual versão do Java queremos executar o processo de compilação pelo Maven, na aba **JRE** conforme abaixo. Neste exemplo, foi definido que o Java 11 deve ser utilizado, em vez do Java 8.

<img class="img_content" src="{{ site.baseurl }}/assets/img/post11/figure18.png" alt="Aba 'JRE' da criação de configuração Maven, com destaque para o campo 'Alternate JRE' com a opção do Java 11 selecionada.">

Ao concluir as configurações, basta clicar no botão run para executar a tarefa do Maven. 

Outra alternativa para executar o comando do Maven que foi construído é clicar no botão Run, conforme abaixo:

<img class="img_content" src="{{ site.baseurl }}/assets/img/post11/figure19.png" alt="Botão de execução do comando Maven na IDE do Eclipse destacado.">

# Considerações Finais 

Espero que este tutorial tenha auxiliado de alguma forma no aprendizado do Maven e do gerenciamento de dependências.

Se você deseja apoiar o meu trabalho de escrita sobre os mais diversos assuntos de tecnologia, compartilhe meus artigos em suas redes sociais. O objetivo é o de contribuir com o compartilhamento de experiências práticas em desenvolvimento de software e sobre tecnologia com a comunidade.

Valeu pessoal e até o próximo post !! 