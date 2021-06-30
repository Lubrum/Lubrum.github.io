---
layout: post
title: Um tutorial completo sobre o Maven e o gerenciamento de dependências
subtitle: Explico em detalhes sobre como o Maven funciona e os fundamentos básicos por trás do gerenciamento de dependências com exemplos com a linguagem Java.
date: 2021-05-28 20:40:00 -0300
categories: dependency management
language: Maven, Java
author: luciano_brum
---

# Resumo

E aí pessoal, beleza? 

A ideia deste post é compartilhar com vocês sobre como o Maven funciona e qual os conceitos por trás do gerenciamento de dependências. Os pré-requisitos para acompanhar este tutorial é conhecimento básico de inglês para leitura (é o idioma da IDE e é utilizado no aprendizado e uso de tecnologias), ter uma versão do Java instalado e ter uma IDE para programação em Java com o Maven embutido (como o Eclipse, que já vem com uma versão do Maven) ou com o Maven instalado separadamente.

# O que é gerenciamento de dependências?

Ao programar em Java (e em outras linguagens de backend), é muito comum precisarmos de funcionalidades especiais para testes automatizados, frameworks para web, funcionalidades para tratamento de tipos específicos de dados (XML, JSON, csv, etc), ou ainda, algoritmos específicos para um determinado problema. Se você é um programador com mais experiência, você mesmo pode criar essas funcionalidades. É um excelente exercício para o aprendizado, porém, na vida real, trabalhamos com prazos (*deadlines*) que muitas vezes inviabilizam essa prática, por ter um alto custo (de tempo para implementação, testes, validação, etc). Então, se não temos tempo suficiente para resolver estes problemas, o que fazer? 

Em vez de reinventar a roda, é possível utilizar o que já existe para economizarmos tempo (e por consequência, dinheiro). Muitos dos problemas que fazem parte do dia a dia de programadores, hoje, possuem soluções em código aberto (*open source*) disponibilizadas no **Github** para toda a comunidade. Essas soluções podem ser integradas e utilizadas em nossos projetos, e nesse caso, acabam se tornando uma dependência do projeto. A partir deste momento, as novas funcionalidades podem ser utilizadas no nosso projeto de modo que não seja necessário implementar toda a lógica necessária para resolver o problema. 

Por exemplo, em Java, se precisarmos manipular dados no formato JSON, em vez de escrevermos toda a lógica para manipular esses dados e mapea-los para variáveis e objetos, podemos utilizar a biblioteca (*lib* ou *library*) [jackson](https://mvnrepository.com/artifact/com.fasterxml.jackson.core/jackson-core), que vai tornar a tarefa muito mais simples com muito menos esforço, utilizando um código testado por outros desenvolvedores em muitos projetos reais.

###### Isso não quer dizer que todas as soluções de código aberto sejam amplamente utilizadas e testadas. Na verdade, uma parte ínfima delas que é amplamente usada, por isso, pesquise antes de sair utilizando dependências de forma irresponsável. 

Ainda, surgirão situações em que uma solução comum é necessária para vários projetos de uma organização, mas são problemas muito específicos e estratégicos que não podem estar disponibilizados em [plataformas de código aberto, como o Github](https://github.com/). Nesses casos, é possível que a própria organização crie a solução e a salve em um repositório interno e fechado para que os próprios colaboradores possam utilizar essas soluções como dependências nos projetos internos da empresa. São dependências que não são de código aberto.

A ideia por trás do gerenciamento de dependências é a de termos o controle sobre as dependências em nossos projetos, sejam essas dependências internas (da própria organização) ou externas (feitas pela comunidade, em código aberto), para que o desenvolvedor possa focar mais na solução dos problemas específicos do negócio e menos nas dependências em si.

# Gerenciadores de dependências

Com o objetivo de simplificar e automatizar tarefas de gerenciamento de dependências, ao longo dos anos surgiram diversas ferramentas para resolver específicamente este problema. Abaixo, uma lista de ferramentas para gerenciamento de dependências para diversas linguagens de desenvolvimento:

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

###### No futuro pretendo fazer com mesmo com o Gradle ;).

# Apache Maven

O Maven é o gerenciador de dependências para desenvolvimento com Java (e também para Kotlin). A primeira versão estável foi liberada em julho de 2004. No momento de escrita deste artigo, o Maven está na versão 3.8.1, com o total de 1,435,611 pacotes publicados em 2020.

[No site do Maven](https://maven.apache.org/plugins/maven-resources-plugin/index.html), é possível ler a documentação completa sobre o Maven e seus respectivos plugins, muito utilizados para auxiliar no processo de automação do processo de *build* dos projetos. Já [no repositório central do Maven](https://mvnrepository.com/) podem ser encontradas as dependências que podem ser importadas nos nossos projetos. Eu utilizo muito esse site quando estou atualizando dependências antigas de projetos legados.

# Utilizando o Maven com o Eclipse

Para mostrar como utilizar o Maven, vou utilizar a *IDE Eclipse* para criar um projeto de exemplo com o objetivo de mostrar como funciona o gerenciamento de dependências com o Maven. Para quem utiliza outra IDE (como o *IntelliJ* ou o *VS Code*), não tem problema nenhum, pois o mais importante é a parte sobre como utilizamos o Maven, que independe da IDE. Para os que desejarem acompanhar o tutorial com o Eclipse, [recomendo uma breve leitura na documentação](https://help.eclipse.org/2021-03/index.jsp) caso existam dúvidas. 

# Criação do projeto de exemplo

Vamos seguir o passo a passo para criar um projeto de exemplo com o Maven como gerenciador de dependências.

1- Clicar em *File -> new -> Other*...

2- Selecionar *Maven* -> *Maven Project* e clicar em *Next*

3- Desmarcar a opção "*Create a simple project*" e marque a opção "*Use default workspace location*" se desejar usar o diretório padrão do eclipse como base do projeto. Caso contrário, logo abaixo, você pode escolher manualmente o diretório do projeto. Após isso, clicar em *Next*

4- No campo *Filter*, digite *org.apache.maven.archetypes* e selecione o *Artifact Id **maven-archetype-quickstart***. Esse 'archetype' é o esqueleto de uma aplicação de exemplo com o Maven. Clique em *Next*

5- Preencher os seguintes campos:
a) Group Id: é o identificador do projeto. O padrão de nomenclatura utilizado é **com.NOME_DA_EMPRESA.NOME_DO_PROJETO** OU **br.com.NOME_DA_EMPRESA.NOME_DO_PROJETO**, que geralmente é a hierarquia de diretórios do projeto. Aqui vou colocar **com.luciano.app**.
b) Artifact Id: é o identificador do projeto em si. Nomes compostos são geralmente separados por traços. Vou colocar **example-app**.
c) Version: é a versão inicial do projeto. Eu particularmente não gosto de usar o versionamento com palavras misturadas com números, mas a título de exemplo vamos usar o padrão oferecido pela IDE, a versão **0.0.1-SNAPSHOT**. Feito isso, clicar em **Finish** para criar o projeto.

Ao abrir o arquivo pom.xml, teremos a visualização abaixo.

O código fonte e de testes que desenvolvemos em nossos projetos ficam na pasta *src*, as bibliotecas da versão do Java que estamos utilizando ficam em *JRE System Library[JavaSE-1.7]* (no meu caso, o Java 7), as dependências do nosso projeto ficam em *Maven Dependencies* e os arquivos resultantes do build do projeto ficam em *target*. Em *src*, anda temos os subdiretórios main/java (onde fica o código fonte do projeto) e test/java (onde fica o código de testes automatizados).


# Arquivo pom.xml

Gerenciamos as dependências e o processo de build do Maven pelo comando executado e pelo pom.xml. Vejamos abaixo cada uma das tags no projeto de exemplo.

```xml
<?xml version="1.0" encoding="UTF-8"?>
```
Versão do xml utilizado e a codificação utilizada para o documento. Não é obrigatória, mas é recomendado o seu uso para que o parser saiba o encoding correto do documento.

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
```
Todas tags que representam nosso projeto vão no interior da tag *<project>*. As propriedades são opcionais.

```xml
<modelVersion>4.0.0</modelVersion>
```
Indica que o descritor do projeto é compatível com as versões 2 e 3 do Maven. É uma tag obrigatória. 

Para verificar a versão do Maven embutida no Eclipse: **Window -> Preferences -> Maven -> Installations**. Na imagem abaixo, temos a versão 3.6.3. 

Para verificar a versão do Maven instalada por outros meios, abra o prompt de comando e digite *mvn -version*. No exemplo, temos a versão 3.8.1.

```xml
<groupId>com.luciano.app</groupId>
<artifactId>example-project</artifactId>
<version>0.0.1-SNAPSHOT</version>
```

São as tags que definimos anteriormente ao criarmos o projeto. *GroupId* é a hierarquia de diretórios, *artifactId* é o ID do projeto em si e *version* é a versão do artefato.

```xml
<name>example-project</name>
<!-- FIXME change it to the project's website -->
<url>http://www.example.com</url>
```

*name* é a tag que representa o nome oficial do projeto e *url* é a url para acessar o site do projeto, caso exista. Como não temos um site, vou remover a tag *url*.

```xml
<properties>
  <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
  <maven.compiler.source>1.7</maven.compiler.source>
  <maven.compiler.target>1.7</maven.compiler.target>
</properties>
```

*properties* são propriedades que serão utilizadas pelo próprio arquivo de dependências em um dos processos do ciclo de vida do Maven. Mais adiante vou explicar o que é este ciclo de vida. Neste caso, o projeto de exemplo veio com três propriedades:

```xml
<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
```

Essa propriedade define que o padrão de codificação dos arquivos do projeto é o UTF-8. Para mais detalhes sobre codificação, acesse [aqui](), [aqui]() ou [aqui]().

```xml
<maven.compiler.source>1.7</maven.compiler.source>
<maven.compiler.target>1.7</maven.compiler.target>
```

São argumentos para o compilador do Java, para o código fonte (*source*) e para o código gerado após o build (*target*). Podemos, a partir da versão 3.6 do maven-compiler-plugin e da versão 9 do JDK (Java), usar a notação abaixo com o mesmo efeito.

```xml
<maven.compiler.release>1.7</maven.compiler.release>
```

###### Dica: até a versão 8 do java, colocamos o prefixo '1.' antes da versão. Assim: 1.7 (versão 7), 1.8 (versão 8). A partir da versão 9, o número da versão não tem esse prefixo.

No meu caso, vou substituir pela versão do Java que eu utilizo com mais frequência, a versão 11. 
###### Para fazer isso você precisa dessa versão do JDK (Java Development Kit) instalada no computador.

```xml
<maven.compiler.release>11</maven.compiler.release>
```
 
Para concretizar a mudança na IDE, clique em cima da pasta raíz do projeto -> Maven -> Update Project. Apenas clique em *Ok*. Para verificar se deu certo, verifique se o nome do diretório *JRE System Library[JavaSE-1.7]* mudou para *JRE System Library[JavaSE-11]*.

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

Todos os artefatos que usamos como dependências em nosso projeto devem ser colocados dentro da tag *dependencies*.

Para cada dependência, teremos uma tag *dependency* e dentro dela, informamos obrigatoriamente os seguintes identificadores da dependência: *groupId*, *artifactId* e *version*. O significado já foi apresentado [aqui](#criação-do-projeto-de-exemplo). A tag *scope* serve para limitar a **transitividade** da dependência e determinar o momento de incluir a mesma no *classpath*. No exemplo acima, *junit* é uma conhecida biblioteca no mundo Java para a criação de testes automatizados, como testes unitários. Ela só é utilizada durante os testes, não sendo necessária em outros momentos do ciclo de vida do projeto. Ao definir o *scope* como *test*, dizemos que a dependência só é requerida na fase de testes (fases *test-compile* e *test*) do Maven. 

###### Veremos os outros possíveis valores dessa tag na sequência deste tutorial.

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

No caso, adicionamos o [log4j](https://logging.apache.org/log4j/2.x/index.html), uma biblioteca que permite criarmos logs para nossa aplicação de forma simples e prática. Uma pecualiaridade desse caso é que precisamos de duas dependências para usar essas funcionalidades. Nesses casos, há uma outra forma mais segura de se fazer essa declaração: utilizando [BOMs (Bill Of Materials)](https://howtodoinjava.com/maven/maven-bom-bill-of-materials-dependency/). Basicamente, o BOM garante que as versões de dependências diretas e transitivas de artefatos sejam as mesmas. Ainda, isso permite que não seja necessário declarar a tag *version* dos artefatos envolvidos nas *dependencies*. 
###### Dependências transitivas são aquelas em que 

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

Declaramos a BOM do log4j na tag *dependencyManagement* e na tag *dependencies* os artefatos log4j-api e log4j-core não precisam do *version* mais, pois foram definidos no BOM como versão 2.14.1. Caso seja necessário atualizar no futuro a versão dessa dependência, basta atualizar o campo *version* do BOM em vez de atualizar cada *version*. 

###### Cabe ressaltar que cada projeto é responsável pelo fornecimento do BOM, portanto nem todos os projetos tem essa funcionalidade/facilidade.

```xml
<build>
    ...
</build>
```

A tag *build* inclui os plugins que utilizamos no build do projeto. Estes plugins ficam dentro da tag *plugins*, que fica dentro da tag *pluginManagement*, que fica dentro da tag *build*. Meio louco mas é assim mesmo. Segue o exemplo abaixo, gerado pela IDE.

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

No xml acima temos os principais plugins, que são geralmente utilizados em projetos Java da vida real com o Maven (*não tive ainda a oportunidade de ver na prática o maven-site-plugin e o maven-project-info-reports-plugin, mas basicamente servem para gerar uma documentação do projeto em formato de site*). Antes de falar sobre os plugins, precisamos entender como funciona o ciclo de vida (*Lifecycle*) do build com o Maven.

# Ciclo de vida do build com Maven

Temos três (*Lifecycles*) básicos no Maven:

- clean
- default
- site

Vou abordar aqui o *default* que é o que envolve mais fases do *build*.

Os *Lifecycles* são compostos por fases executadas em uma determinada ordem. Cada fase possui sua especificidade. O ciclo de vida *default* é composto pelas seguintes fases (nessa ordem):

- validate:	verifica se o projeto está correto e possui as informações mínimas necessárias
- initialize: inicializa o estado do build (seta propriedades ou cria diretórios)
- generate-sources:	gera código fonte para inclusão na compilação
- process-sources: processa o código fonte (por exemplo, para filtrar valores)
- generate-resources: gera recursos para inclusão no pacote
- process-resources: copia e processa os recursos para o diretório destino para o empacotamento (*packaging*)
- compile: compila o código fonte do projeto
- process-classes:	pós processamento dos arquivos gerados pela compilação (por exemplo, melhoria do bytecode das classes Java).
- generate-test-sources: gera código fonte de teste para inclusão na compilação dos testes
- process-test-sources:	processa o código fonte dos testes (por exemplo, para filtrar valores)
- generate-test-resources: cria recursos para os testes
- process-test-resources: copia e processa os recursos para o diretório destino dos testes
- test-compile: compila o código fonte dos testes para o diretório destino dos testes
- process-test-classes:	pós processamento dos arquivos de teste gerados pela compilação (por exemplo, melhoria do bytecode das classes Java)
- test:	execução de testes com um framework de testes unitários. Tais testes não requerem que o código seja empacotado *packaged* ou implantado (*deployed*)
- prepare-package: executa operações necessárias para preparação do pacote. Resulta em uma versão não empacotada e processada do pacote
- package: empacotamento do código fonte compilado em um formato distribuível, como o JAR
- pre-integration-test:	executa ações requeridas antes da execução dos testes de integração (como montar um ambiente por exemplo)
- integration-test:	processa e implanta o pacote em um ambiente onde os testes de integração podem ser executados (se necessário) 
- post-integration-test: executa ações requeridas após a execução dos testes de integração (como limpar o ambiente onde foram executados os testes, por exemplo)
- verify: execução de verificações se o pacote é válido e atinge os critérios de qualidade
- install: instalação do pacote no repositório local para ser utilizado por outras dependências locais
- deploy: feito em um ambiente de integração (*integration*) ou liberação (*release*), realiza a cópia do pacote final para o repositório remoto para compartilhamento com outros desenvolvedores e projetos

Conforme visto acima, cada fase do ciclo de vida possui sua especificidade. Para isso, os plugins do Maven nos auxiliam nesse processo.

```xml
<artifactId>maven-clean-plugin</artifactId>
```

O [clean plugin](https://maven.apache.org/plugins/maven-clean-plugin/) é utilizado para limpar o ambiente de uma execução anterior de um processo de build. Podemos customizar o processo, como quais diretórios excluir ou não.


```xml
<artifactId>maven-resources-plugin</artifactId>
```

O [resources plugin](https://maven.apache.org/plugins/maven-resources-plugin/) é utilizado para mover recursos do código fonte e de testes para diretórios específicos, entre outras tarefas relativas aos recursos do projeto.

```xml
<artifactId>maven-compiler-plugin</artifactId>
```

O [compiler plugin](https://maven.apache.org/plugins/maven-compiler-plugin/) é utilizado no processo de compilação do código fonte e de testes. Podemos customizar os parâmetros da compilação, usar uma versão específica da JDK, entre outros.

```xml
<artifactId>maven-surefire-plugin</artifactId>
```

O [surefire plugin](https://maven.apache.org/plugins/maven-surefire-plugin/) é utilizado para a execução dos testes unitários do projeto. Podemos customizar os parâmetros da execução dos testes, como por exemplo, definir o framework de testes a ser utilizado.


```xml
<artifactId>maven-jar-plugin</artifactId>
```

O [jar plugin](https://maven.apache.org/plugins/maven-jar-plugin/) é utilizado no processo de geração de jars nos processos de empacotamento do código. Podemos customizar os arquivos que serão empacotados, entre outras funcionalidades.


```xml
<artifactId>maven-install-plugin</artifactId>
```

O [install plugin](https://maven.apache.org/plugins/maven-install-plugin/) é utilizado na fase *install* para instalar o projeto no repositório local do usuário, para que o projeto possa ser utilizado como dependência em outros projetos localmente. O repositório local costuma ser em **(~/.m2/repository)** mas a localização pode ser alterada no arquivo **(~/.m2/settings.xml)** usando a tag  **<localRepository>**.


```xml
<artifactId>maven-deploy-plugin</artifactId>
```

O [deploy plugin](https://maven.apache.org/plugins/maven-deploy-plugin/) é utilizado na fase *deploy* para instalar o projeto no repositório remoto onde o projeto ficará disponível para outros projetos e desenvolvedores.

# Versionamento de dependências

Uma prática comum adotada é a de declarar as versões das dependências do projeto na tag *<properties>*. Então no caso do projeto de exemplo, ficaria assim. 

```xml
<properties>
  <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
  <maven.compiler.release>11</maven.compiler.release>
  <log4j.bom.version>2.14.1</log4j.bom.version>
  <junit.version>4.11</junit.version>
  <maven.clean.plugin.version>3.1.0</maven.clean.plugin.version>
  <maven.resources.plugin.version>3.0.2</maven.resources.plugin.version>
  <maven.compiler.plugin.version>3.8.0</maven.compiler.plugin.version>
  <maven.surefire.plugin.version>2.22.1</maven.surefire.plugin.version>
  <maven.jar.plugin.version>3.0.2</maven.jar.plugin.version>
  <maven.install.plugin.version>2.5.2</maven.install.plugin.version>
  <maven.deploy.plugin.version>2.8.2</maven.deploy.plugin.version>
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

Para o junit, por exemplo, criamos a tag *<junit.version>4.11</junit.version>* e ao definirmos a versão nas dependências, colocamos ${junit.version}. Ao executar o build do projeto, ${junit.version} será substituído pelo valor 4.11. Acredito que tal forma é mais adequada, pois as versões de todas dependências ficam centralizadas em um só lugar, não sendo necessário mais lidar com a lista de dependências, com menos riscos de erros ao atualizar versões.

# Tipos de dependências (tag type)

As mais comuns são **pom** e **jar** (*default*). Elas são definidas na tag *<type>* em dependências presentes em *<dependencyManagement>*. O tipo *jar* é o padrão, que nos informa que a dependência do projeto é um jar (geralmente representa a extensão da dependência mas nem sempre é o caso). O caso *pom* é especial e será tratado na parte dos escopos de dependências. Ainda temos os tipos **war** e **ear**, comuns em sistemas legados com JBoss e versões antigas do Java. 

# Escopos de dependências (tag scope)

As dependências podem ser:

- **Diretas**: quando são definidas no arquivo pom.xml na seção **<dependencies/>**;
- **Transitivas**: quando são dependências que são dependências de nossas dependências diretas (Exemplo: A depende de B que depende de C, portanto C é uma dependência transitiva para A);

Temos seis escopos no Maven: 

- **Compile**: Este é o escopo padrão, usado se nenhum for especificado. As dependências ficam disponíveis em todos os *classpaths* de um projeto. Além disso, essas dependências são propagadas para projetos dependentes.
- **Provided**: Indica que o JDK ou um contêiner forneça a dependência no tempo de execução (*runtime*). Por exemplo, ao construir um aplicativo web para o Java Enterprise Edition (JEE), as dependências da API Servlet e APIs Java EE seriam setadas com o escopo **provided** porque o contêiner web fornece essas classes. Uma dependência com este escopo é adicionada ao *classpath* usado para compilação e testes, mas não ao *classpath* do tempo de execução. Não é transitivo.
- **Runtime**: indica que a dependência não é necessária para compilação, mas sim para execução. O Maven inclui uma dependência com esse escopo no tempo de execução e nos caminhos de classe de teste, mas não no caminho de classe de compilação.
- **Test**: indica que a dependência está disponível apenas para as fases de compilação e testes. Este escopo não é transitivo. Normalmente, é usado para bibliotecas de teste, como JUnit e Mockito. Também é usado para bibliotecas sem teste, como Apache Commons IO, se essas bibliotecas forem usadas em testes de unidade (src / test / java), mas não no código principal (src/main/java).
- **System**: semelhante ao **provided**, exceto que é preciso fornecer o JAR que o contém explicitamente, especificado na declaração da dependência (através da tag *systemPath*). O artefato está sempre disponível e não é consultado em um repositório. Não é recomendado seu uso por questões de portabilidade (exemplo: você garante que o caminho da dependência será o mesmo nos servidores ou nas máquinas/*containers* de todos os devs?)
- **Import**: é compatível apenas com dependências do tipo **pom** (<type>pom</type>) na seção **<dependencyManagement>**. Indica que a dependência deve ser substituída pela lista efetiva de dependências na seção **<dependencyManagement>** do POM especificado. Uma vez que foram substituídas, as dependências com o escopo *import* não participarão na limitação da transitividade de uma dependência.

###### classpath: caminho completo das classes que são dependências diretas do projeto
###### [Fonte: em parte, traduzido do site oficial do Maven](https://maven.apache.org/guides/introduction/introduction-to-dependency-mechanism.html#dependency-scope)

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

O projeto Z importa as dependências de X e Y, porém ambas tem o artefato *a* com versões diferentes. Será importado o artefato mais próximo na hierarquia do projeto pai. Porém, neste caso, ambos estão no mesmo nível, então será importado o de X com a versão 1.1, pois foi declarado no pom de Z antes do artefato Y. Ainda, Z não possui uma dependência direta do artefato *a*, pois se tivesse, essa que seria utilizada.

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

# Referências que me ajudaram

# Considerações Finais 

Espero que este relato tenha auxiliado você de alguma forma na sua jornada e carreira no aprendizado do Maven. 

Se você deseja apoiar o meu trabalho de escrita sobre os mais diversos assuntos de tecnologia, compartilhe meus artigos em suas redes sociais. O objetivo é o de contribuir com o compartilhamento de experiências práticas em desenvolvimento de software e sobre tecnologia com a comunidade brasileira.

Valeu !! Até o próximo post !! 