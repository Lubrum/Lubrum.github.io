---
layout: post
title: Tutorial de instalação do Ubuntu 20.04.1 LTS do Zero
subtitle: Neste post serão demonstrados os passos necessários para você instalar e utilizar o Ubuntu como Sistema Operacional principal da sua máquina
date: 2020-09-28 22:11:00 -0300
categories: linux
language: Ubuntu
author: luciano_brum
---

<h1> Resumo </h1>

E aí pessoal, beleza? 

Vamos supor que você chegou no primeiro dia de trabalho na sua empresa e seu líder/chefe solicitou uma máquina configurada com o Linux. A máquina já possui o Windows instalado em uma partição em um disco SSD e possui um disco HD. 

O nosso objetivo é configurar a máquina com um dual boot (ou seja, possibilitando a escolha do Sistema Operacional na inicialização do sistema), sendo que o Ubuntu deve ser instalado no disco HD.

Utilizaremos neste tutorial a versão 20.04.1 LTS do Ubuntu, a mais atualizada versão LTS (*Long Term Support*) disponível.

<h1> Passo a passo </h1>

- [Download do Ubuntu](#download-do-ubuntu);

- [Criação de um pen-drive bootável](#criação-de-um-pen-drive-bootável);

- [Instalação do Ubuntu](#instalação-do-ubuntu);

# Download do Ubuntu

O download do Ubuntu pode ser feito neste [link](https://ubuntu.com/download/desktop). Basta clicar em Download na versão Ubuntu 20.04.1 LTS. Cabe destacar que as versões LTS (*Long-Term Support*) do Ubuntu possuem um tempo extendido de suporte se comparada com outras versões (a versão 18.04.3 LTS tem suporte até Abril de 2023, a 19.10 até Julho de 2020 e a 20.04.1 até Abril de 2025). Salve o arquivo no formato .iso no diretório de sua preferência.

# Criação de um pen-drive bootável

[Agora será necessário o download do Rufus](https://rufus.ie/pt_BR.html). Rufus é um software *open-source* que permite criar dispositivos bootaveis. Ou seja, permite que você inicialize um Sistema Operacional através de algum dispositivo. É necessário um pen-drive com no mínimo 4 Gigabytes de espaço de armazenamento.

Com o download realizado, execute-o. 

<br />
<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post10/figure1.png)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post10/figure1.png" alt="Software Rufus.">
</figure>
<br />

Em **Dispositivo**, selecione o pen-drive inserido no computador.

Em **Seleção de Boot**, selecione o arquivo no formato .iso que contém a imagem do Ubuntu (é o arquivo do download anterior).

Em **Esquema de partição** mantenha a opção MBR e **Sistema de destino** mantenha a opção BIOS ou UEFI.

Em **Nome do volume** você pode dar um nome ao mesmo.

Em **Sistema de arquivos** mantenha a opção FAT32. **Tamanho do cluster** mantenha em 4096 bytes.

Após estes passos, basta clicar em iniciar. E pronto ! Agora é possível inicializar a máquina a partir do pen-drive, que agora é bootável com o Ubuntu.

# Instalação do Ubuntu

Antes de começar, recomendo que seja feito um backup. Ou seja, salvar todos os dados e programas importantes em um HD externo ou na nuvem (Google Drive, Dropbox, Amazon, etc). Felizmente nunca aconteceu comigo, mas já vi pessoas escolherem a partição errada no processo de formatação e acabaram apagando o próprio Sistema Operacional existente (muitas vezes, Windows), perdendo o acesso aos antigos dados e programas.

Temos duas alternativas:

- Criar as partições necessárias no próprio Windows;
- Criar as partições necessárias no processo de instalação do Ubuntu;

Este tutorial seguirá com a segunda alternativa, mas se alguém tiver interesse na primeira, indico os seguintes tutoriais:

- [Instalar Ubuntu e Windows em Dual Boot (português)](https://www.todoespacoonline.com/w/2015/05/instalar-ubuntu-e-windows-em-dual-boot-guia-definitivo/);

- [Lcomlinux. Instalação Ubuntu 18.04 e Windows 10 Dual Boot UEFI (português)](https://lcomlinux.wordpress.com/2018/08/20/instalacao-ubuntu-18-04-e-windows-10-dual-boot-uefi/);

- [TecMint - How to Install Ubuntu Alongside With Windows 10 or 8 in Dual-Boot (inglês)](https://www.tecmint.com/install-ubuntu-alongside-with-windows-dual-boot/);


Conecte o pendrive no computador e reinicie a máquina. Antes da máquina inicializar, é necessário garantir que o computador encontre o pen-drive bootável para iniciar a instalação do Ubuntu. Para isso, acesse o menu do boot.

Para acessar o menu de boot ou o setup da BIOS, pressione a tecla que aparecer na primeira tela de boot. Essa tecla muda de fabricante para fabricante, pode ser f2, f8, f10, f12, etc. No caso da minha máquina, Dell, a tecla é f2.

<br />
<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post10/figure2.jpeg)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post10/figure2.jpeg" alt="Tela exibida após pressionar f2.">
</figure>
<br />

A tela acima é exibida no meu caso. O próximo passo é encontrar o menu com as opções de sequência de boot. No meu caso, é a opção destacada em vermelho.

<br />
<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post10/figure3.jpeg)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post10/figure3.jpeg" alt="Ordem das opções de boot.">
</figure>
<br />

Temos a sequência de boot na parte superior e as opções de adicionar ou remover opções de boot na parte destacada inferior. No meu caso, a ordem do boot estava Ubuntu -> Windows -> UEFI ... (Pen-drive). No caso de vocês, se vocês não possuem instalação prévia do Ubuntu, irão aparecer apenas as opções Windows e UEFI (pen-drive). 

Se a opção UEFI não aparecer, verifique se ela está presente no menu *Boot List Option*, em *view*. Se a opção de UEFI não aparecer, é possível que tenha ocorrido algum problema na geração do pen-drive bootável, então recomendo refazer o passo **Criação de um pen-drive "bootável"**.

O que é preciso fazer? alterar a ordem do boot de forma que o UEFI seja a primeira opção. Basta utilizar as setas para mudar a ordem. Feito isso, basta pressionar *Exit* e salvar as modificações. O computador vai reiniciar, só que em vez de iniciar no Windows, vai inicializar no Pen-drive.

<br />
<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post10/figure4.jpeg)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post10/figure4.jpeg" alt="Idioma.">
</figure>
<br />

Idioma de instalação: Português.

<br />
<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post10/figure5.jpeg)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post10/figure5.jpeg" alt="Layout do Teclado.">
</figure>
<br />

Layout do teclado: Português.

<br />
<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post10/figure6.png)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post10/figure6.png" alt="Conexão de rede.">
</figure>
<br />

Se você desejar realizar atualizações durante a instalação, conecte-se na sua rede. Caso contrário, apenas não se conectar nesse momento.

<br />
<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post10/figure7.jpeg)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post10/figure7.jpeg" alt="Atualizações durante a instalação.">
</figure>
<br />

Instalação normal, incluindo softwares básicos.

Eu prefiro instalar software de terceiros, pra evitar algum problema com falta de drivers, mas caso desejar, você pode desabilitar essa opção.

<br />
<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post10/figure8.png)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post10/figure8.png" alt="Tipo de instalação.">
</figure>
<br />

Selecionar opção avançada. 
<p style = "color: #ff1111"> Pelo amor de Deus, não marque Apagar disco... </p>

<br />
<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post10/figure9.png)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post10/figure9.png" alt="Detalhes das partições do sistema.">
</figure>
<br />

Inicialmente será criada a partição principal (root). Selecione o "espaço livre" e clique no "+". Nas configurações da partição, selecione as opções abaixo e clique em aplicar:

Tamanho = pelo menos 20000 MB

Tipo da nova partição = Primary

Localização para a nova partição = Início deste espaço

Usar como = Sistema de arquivos EXT4

Ponto de Montagem = /

Agora será criada a partição de swap. Essa partição é utilizada quando o computador vai para a hibernação ou quando a memória RAM fica cheia (em resumo). Selecione o "espaço livre" restante e clique no "+". Nas configurações da partição, selecione as opções abaixo e clique em aplicar. *Uma regra empírica para o tamanho do swap é a de utilizar um valor entre a RAM da sua máquina e o dobro da RAM*.

Tamanho = 16000 MB 

Tipo da nova partição = Primary

Localização para a nova partição = Início deste espaço

Usar como = Sistema de arquivos EXT4

Ponto de Montagem = /home

Agora será criada a partição *home*. Selecione o "espaço livre" restante e clique no "+". Nas configurações da partição, selecione as opções abaixo e clique em aplicar:

Tamanho = **Todo tamanho restante**

Tipo da nova partição = Primary

Localização para a nova partição = Início deste espaço

Usar como = Sistema de arquivos EXT4

Ponto de Montagem = /home

<br />
<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post10/figure10.png)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post10/figure10.png" alt="Detalhes das partições do sistema.">
</figure>
<br />

Clique no botão "Instalar Agora" para aplicar as mudanças nos discos e iniciar a instalação. Ao aparecer uma mensagem de alerta, clique em "Continuar". 

<br />
<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post10/figure11.jpeg)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post10/figure11.jpeg" alt="Fuso Horário.">
</figure>
<br />

Selecione o fuso horário e clique em "Continuar".

<br />
<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post10/figure12.jpeg)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post10/figure12.jpeg" alt="Credenciais para a máquina.">
</figure>
<br />

Defina um nome para o usuário, para a máquina, e login e senha (se desejar). Após clicar em "Continuar", a instalação vai executar automaticamente.

Ao reiniciar a máquina, deverá aparecer o menu do Grub por dez segundos, onde você poderá escolher o Windows ou Ubuntu para inicializar. Por padrão, o Ubuntu é selecionado após os dez segundos.

<br />
<figure class='zoom' style="background: url({{ site.baseurl }}/assets/img/post10/figure13.png)" onmousemove="zoom(event)" ontouchmove="zoom(event)">
  <img class="img_content" src="{{ site.baseurl }}/assets/img/post10/figure13.png" alt="Credenciais para a máquina.">
</figure>
<br />

Utilize as credenciais que você inseriu no processo de instalação para logar no Ubuntu e pronto ! Agora você possui uma máquina com dois Sistemas Operacionais, um em cada disco.

<h1> Considerações Finais </h1>

Espero que este tutorial tenha auxiliado você na instalação do Ubuntu 20.04.1 LTS na sua máquina. 

Se você deseja apoiar o meu trabalho de escrita sobre os mais diversos assuntos de tecnologia, compartilhe meus artigos em suas redes sociais. O objetivo é o de contribuir com o compartilhamento de experiências práticas em desenvolvimento de software e sobre tecnologia com a comunidade brasileira (em PT-BR).

Valeu !! Até o próximo post !! 

<h1> Referências Bibliográficas </h1>

- [Instalar Ubuntu e Windows em Dual Boot. Acesso em: 07 jul. 2020.](https://www.todoespacoonline.com/w/2015/05/instalar-ubuntu-e-windows-em-dual-boot-guia-definitivo/);

- [Lcomlinux. Instalação Ubuntu 18.04 e Windows 10 Dual Boot UEFI Acesso em: 07 jul. 2020.](https://lcomlinux.wordpress.com/2018/08/20/instalacao-ubuntu-18-04-e-windows-10-dual-boot-uefi/)

- [TecMint. How to Install Ubuntu Alongside With Windows 10 or 8 in Dual-Boot. Acesso em: 07 jul. 2020.](https://www.tecmint.com/install-ubuntu-alongside-with-windows-dual-boot/)
