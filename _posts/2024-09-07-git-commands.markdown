---
layout: post
title: Git no meu dia a dia
subtitle: Fluxo de trabalho com o Git e seus comandos essenciais
date: 2024-09-07 12:15:00 -0300
categories: software
language: Git
author: luciano_brum
---

- [Comandos Git](#comandos-git)
- [Minhas estatísticas de uso do git](#minhas-estatísticas-de-uso-do-git)
- [Cenários de uso](#cenários-de-uso)
- [Considerações Finais](#considerações-finais)

## Comandos Git

A ideia deste post é mostrar os comandos que eu mais utilizo no dia a dia com desenvolvimento java nos últimos cinco anos. Assumo aqui que o leitor tenha um conhecimento básico de Git e de versionamento de código.

## Minhas estatísticas de uso do git

Segue abaixo as minhas estatísticas de uso do comando git:

```bash
history | grep ' git ' | awk '{CMD[$2" "$3]++} END {for (a in CMD) print CMD[a], a}' | sort -nr

443 git status
355 git add
318 git push
302 git commit
77 git pull
44 git branch
43 git checkout
40 git clone
16 git stash
13 git restore
12 git config
```

## Cenários de uso

### git status

Mostra o estado do repositório, o que está modificado, adicionado, ou ainda precisa ser comitado.

Geralmente eu utilizo esse comando para relembrar os arquivos que alterei. Acontece quando faz muito tempo que estou trabalhando na mudança ou quando estou com muitas abas de arquivos abertas na IDE ou quando fechei algumas sem lembrar quais.

<br>

### git add

Adiciona arquivos modificados ou novos à área de preparação (*stage*) para o próximo *commit*.

Geralmente eu utilizo o comando conforme abaixo:

> git add .

Ele adiciona todos os arquivos na área *stage* com o símbolo ponto. Porém, com frequência, trabalhei em projetos que não tem o arquivo .gitignore no repositório. Por outro lado, preciso dele no ambiente local para não comitar determinados arquivos.

Daí, eu utilizo o comando assim:

> git add arquivo_alterado.java

Quando são muitos arquivos, podemos usar regex:

> git add *.java

O comando acima coloca na área *stage* todos arquivos modificados que terminam em '.java'.

<br>

### git push

Envia os *commits* locais para um repositório remoto.

Geralmente, eu uso o comando assim mesmo. Existem outras formas, mas essa é simples e direta.

<br>

### git commit

Cria um *commit* com as mudanças na área de *stage*, com uma mensagem descritiva. Segue exemplo abaixo:

```bash
git commit -m "FIX correção de bug NPE em classe"
```

A mensagem acima 'FIX correção de bug NPE em classe' é a que vai aparecer na sua ferramenta de controle de versão (VCS) quando você listar os *commits* daquele projeto naquela *branch*. É um espaço que temos que deve ser usado para deixar claro para outros membros da equipe o que feito. Pode ser que 5 ou 10 anos no futuro alguém deseje entender o racional daquela decisão, não o código em si.

<br>

### git pull

Atualiza o repositório local com as últimas mudanças do repositório remoto.

Este comando uso com frequência para não acabar executando um código do projeto que está *deprecated*/desatualizado. Sempre antes de iniciar uma nova *branch*, uso esse comando para ter no meu repositório local as *branches* principais atualizadas com o repositório remoto. Isso ajuda a evitar problemas futuros com conflitos nos momentos de *merge* ou códigos que estavam em produção e magicamente sumiram.

<br>

### git branch

Lista, cria ou exclui *branches*.

Uso mais este comando para saber quais *branches* estão no meu repositório local e quais não estão (quando comparo ao remoto).

<br>

### git checkout

Alterna entre *branches* ou restaura arquivos.

Eu utilizo quase sempre este comando para mudar para uma nova *branch*. Lembrando que, se ela existe no repositório remoto, podem existir alterações remotas para serem atualizadas, daí a importância do 'git pull' mencionado anteriormente.

Em algumas situações bem específicas, eu precisei comparar o estado do projeto em um *commit* específico. Isso também é possível com o comando *checkout* conforme exemplo abaixo:

```bash
git checkout abc1234
```

Isso muda o estado do repositório para o *commit* abc1234. Se você fizer mudanças aqui, elas ficarão isoladas desse *commit*, a menos que você crie uma nova *branch* para mantê-las.

<br>

### git clone

Clona um repositório remoto para a máquina local.

```bash
git clone https://github.com/user/repo.git
```

Uso ele mais para projetos pessoais e para baixar projetos *open-source* para minha máquina.

<br>

### git stash

Armazena mudanças temporariamente sem fazer um *commit*.

É muito útil em cenários em que você precisa salvar temporariamente suas alterações não comitadas para poder trabalhar em outro *branch* e depois restaurá-las.

Você está desenvolvendo uma nova funcionalidade, fez várias modificações nos arquivos, mas não quer comitar ainda. De repente, surge um bug urgente que você precisa corrigir em outra *branch*. Nesse caso, você pode "guardar" suas mudanças temporariamente.

```bash
git stash push -m "Mudanças para funcionalidade X"
```

Isso salva todas as suas alterações não comitadas no *stash* com a mensagem "Mudanças para funcionalidade X", permitindo que você troque de *branch* sem perder essas modificações.

Para ver mudanças temporárias guardadas no *stash*:

```bash
git stash list

stash@{0}: On main: Mudanças para funcionalidade X
stash@{1}: WIP on main: Mudanças para correção de bug Y
```

Para restaurar as mudanças na sua *branch* atual, o comando é o abaixo:

```bash
git stash pop
```

Isso aplica o *stash* mais recente ao seu diretório de trabalho, restaurando suas modificações, e remove o *stash* da pilha.

Para aplicar um *stash* específico, utiliza-se a sintaxe abaixo:

```bash
git stash pop stash@{1}
```

Isso aplica o *stash* da posição 1, conforme o exemplo anterior apresentado.

<br>

### git restore

Restaura o conteúdo de arquivos para o último estado do *commit*.

Uso com frequência o comando acima quando utilizo o 'git add .' mas não quero que o '.gitignore', por exemplo, ou arquivos de IDE, sejam comitados junto ao repositório. O comando 'git restore' pode remover da área *stage* e desfaz as mudanças desses arquivos.

Por exemplo, para remover o .gitignore da área *stage*:

```bash
git restore --staged .gitignore
```

Isso remove o arquivo da área *stage*, mas não desfaz as mudanças. Para desfazer quaisquer mudanças e retornar ao último estado do *commit*.

```bash
git restore .gitignore
```

Observação: não funciona com arquivos novos criados localmente que não existe no repositório remoto.

Para remover arquivos novos e que não existem no repositório remoto, existe o comando clean:

```bash
git clean
```

É uma boa prática usar o comando clean com o '-n', pois ele vai mostrar os arquivos novos que vão ser removidos, antes de realmente remover.

```bash
git clean -n
```

Para remover não só arquivos, mas também pastas, usa-se o clean com -fd.

```bash
git clean -fd
```

<br>

### git config

```bash
git config --global user.name "Seu Nome"
```

Configura variáveis de ambiente do Git, como nome de usuário e email.

Utilizei esse comando quando iniciei desenvolvimento em máquinas novas após formatação ou quando precisei fazer alguma modificação específica em um cenário de uma máquina com várias contas do git.

O --global indica que é a configuração git que será utilizada por padrão em todos repositórios. Por outro lado, é possível configurar essas variáveis para cada repositório, localmente. Nesse caso, a configuração que valerá é a local, não a global.

Para ver as configurações globais do git na máquina (caso tenham sido anteriormente definidas):

> git config --global --list

Para ver as configurações locais definidas em um repositório:

> git config --list

<br>

## Considerações Finais

Sobre os comandos git que eu mais utilizo era isso que eu tinha para compartilhar.

Se você deseja apoiar o meu trabalho de escrita sobre os mais diversos assuntos de tecnologia, compartilhe meus artigos em suas redes sociais.

O objetivo é o de contribuir com o compartilhamento de experiências práticas em desenvolvimento de software e sobre tecnologia com a comunidade.

Valeu pessoal e até o próximo post !
