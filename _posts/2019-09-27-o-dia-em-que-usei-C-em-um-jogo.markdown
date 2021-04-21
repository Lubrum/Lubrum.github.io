---
layout: post
title: O dia que utilizei a linguagem C em um jogo online
subtitle: Quando eu jogava Tibia, tinha a necessidade de estimar, pelo menos, algumas informações sobre as hunts que eu fazia, para saber se eu estava obtendo lucro nas mesmas. Então decidi utilizar o que eu havia aprendido na graduação - a linguagem C.
date: 2019-09-27 08:00:00 -0300
categories: análise de dados
language: C
author: luciano_brum
---

<h1> Resumo </h1>

Saudações pessoal. 

Vou compartilhar com vocês algo inusitado que encontrei em meu HD externo enquanto eliminava e organizava meus arquivos dos tempos de faculdade, entre 2011 e 2015.

Durante a graduação, no tempo livre que eu tinha *(que era escasso, já que eu tinha que viajar 2 horas e meia por dia para o campus em outra cidade)*, eu jogava **Tibia** (*"você pode sair do tibia mas o tibia nunca sai de você... rsrs"*).



<h1> Sobre o Jogo </h1>

**Tibia** é um jogo 2D desenvolvido pela **CipSoft** no estilo **MMORPG** (*Massively Multiplayer Online Role-Playing Games*), em que tem-se muitos jogadores online que interagem entre si ou com o ambiente do jogo em tempo-real. O jogo foi criado em 1997, na Alemanha, na linguagem C++.

O jogo se resume em criar um personagem de uma das **quatro vocações** (*knight, paladin, sorcerer ou druid*) e explorar o que o jogo oferece. Entenda **explorar** como **o objetivo indivual de cada jogador** para o Tibia, além do **tipo de servidor** onde o personagem foi criado (que pode ser PVP, non-PVP e Hardcore PVP). Em outras palavras, você pode jogar **Tibia** para colecionar itens raros, upar níveis, matar jogadores, dominar servidores ou aparecer em algum rank específico do jogo.



<h1> Algo que me perturbava... </h1>

Eu sempre joguei o **Tibia** com o objetivo de upar níveis e acessar novos desafios e lugares no jogo. Só que para isso, eu precisava **upar níveis**, e para fazer isso de forma eficiente, é necessário ter **dinheiro no jogo**. E para ter **dinheiro**, você precisa ir em lugares (ou cavs) que os monstros que você derrota carreguem **itens valiosos**. Eis então que percebi algo que faltava no jogo na época:



- **Como eu vou saber se, durante a minha caçada (hunt) de uma hora, eu obtive lucro ou prejuízo**?  



Ao derrotar os monstros, você pode coletar os **itens** que ele derruba (dropa), porém, não havia mecanismo simples no jogo que permitisse que soubessemos os valores dos itens no próprio jogo. Pior que isso, para saber se a hunt foi lucro ou prejuízo, era necessário sempre **somar o preço individual** de cada item e fazer uma **estimativa** do loot obtido. Porém esse processo era **oneroso** e **desgastante**.



<h1> Então surgiu uma ideia... </h1>

A Figura abaixo mostra uma foto do jogo atualmente, porém apenas com as funcionalidades (*features*) do jogo na época (2014~2015).

<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post5/figure1.png)" >
	<img class="img_content" src="{{ site.baseurl }}/assets/img/post5/figure1.png" alt="Print do jogo online Tibia.">
</figure>

No centro da tela temos o personagem e o ambiente do jogo, na tela do lado direito temos funções e botões para configurações e manipulação de itens na mochila do personagem e na tela abaixo temos o **chat do jogo**. 

O chat tem uma aba chamada **Server Log** que contém registros do que o personagem fez na sessão atual (porém este Log é limitado). 

Uma função interessante, porém que nunca havia me despertado a atenção, é que sempre foi possível salvar este Log em um arquivo texto na própria máquina. Mas eu não entendia por que eu precisaria disso. 

Até que lembrei das minhas aulas em linguagem C...



<h1> A Solução </h1>

Então eu criei um **código simples em linguagem C** para, por exemplo, estimar o **heal (cura) médio do meu personagem** em uma hunt específica que eu havia feito. Na época era impossível saber essa informação no próprio jogo. 

A Figura abaixo mostra o conteúdo de um Server Log da época que eu jogava.

<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post5/figure2.png)" >
	<img class="img_content" src="{{ site.baseurl }}/assets/img/post5/figure2.png" alt="Print do server log de uma hunt do tibia.">
</figure>

E abaixo, uma solução simples para estimar a cura média do personagem em uma hunt.

```
#include<stdio.h>
#include<stdlib.h>
#include<string.h>
int main(){
	FILE *file = fopen("serverlog.txt", "r");
	if( file == NULL ){
    		printf("Nao foi possivel abrir o arquivo!");
	}
	int heal_vector[10000];
	int j, heal, count = 0;
	float total_heals = 0.0, average;
	char name[20];
	while( fscanf( file, "%s", name ) != EOF ){
		if( !strcmp( name, "yourself" ) ){
			fscanf( file,"%*s %d", &heal );
			printf("%d \n", heal);
			heal_vector[count] = heal;
			count++;
		}
	}
	for( j = 0; j < count; j++ ){
		total_heals += heal_vector[j];
	}
	average = total_heals / count;
	printf("\n\nMedia de heal: %.2f hitpoints.", average);
	return 0;
}
```

Claro que este programa calcula algo muito básico, mas seria trivial pensar em uma solução para o cálculo do valor dos itens que caíram dos monstros na hunt. 

Bastaria identificar a palavra inicial **Loot** por linha do Server Log, criar uma base de dados com o valor dos itens da hunt, identificar o nome de cada item dropado e converter para o valor em dinheiro do jogo.

Tempos depois eu descobri que já existiam ferramentas online como o [Tibia Stats](http://www.tibia-stats.com/index.php?akcja=1) que, ao você copiar e colar o texto do Server Log, ela lhe trazia todas as informações e estatísticas que o jogo falhava em fornecer. A Figura abaixo apresenta a ferramenta em operação.

<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post5/figure3.png)" >
	<img class="img_content" src="{{ site.baseurl }}/assets/img/post5/figure3.png" alt="Print do Tibia Stats na ferramenta count loot.">
</figure>



<h1> Hunting Session Analyzer </h1>

Em 2017, o jogo implementou os recursos de análise (*analytics*) em tempo real no proprio ambiente do jogo, chamado de **Hunt Session Analyzer**.

Com este recurso, é possível saber agora se a hunt é lucrativa, se você está tomando muitos danos, ou gastando muitos recursos na hunt, entre diversas outras estatísticas. A Figura abaixo mostra o Analyzer durante uma hunt (na 1° e 3° coluna da foto do jogo).

<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post5/figure4.png)" >
	<img class="img_content" src="{{ site.baseurl }}/assets/img/post5/figure4.png" alt="Print do Tibia Stats na ferramenta count loot.">
</figure>



<h1> Considerações Finais </h1>

Bom pessoal, então era isso. 

Queria trazer pra vocês essa solução boba que desenvolvi na época da graduação, mas que na época acabou me despertando muito mais interesse em computação, programação e algoritmos em geral, pois pensei e vi essas tecnologias na prática resolvendo um problema extremamente específico que eu tive. 

Eu não teria nem ideia de como resolver se não fossem os conceitos de computação e programação que eu aprendi na universidade. 

Obrigado e até o próximo post !! 

<div class="skills">
    <hr class="hr-text" data-content="############">
</div>

<h1> Referências Bibliográficas </h1>

[TIBIA. Latest News. Acesso em: 27 set. 2019.](https://www.tibia.com/news/?subtopic=latestnews)

[TIBIA STATS. News. Acesso em: 27 set. 2019.](http://www.tibia-stats.com/)