---
layout: post
title: Comunicação entre o frontend no Netlify (HTTPS) e backend na AWS EC2 (HTTP)
subtitle: É apresentado um exemplo de comunicação de um serviço no Netlify (por padrão em HTTPS) e um na Amazon EC2 (free tier).
date: 2023-02-13 00:10:00 -0300
categories: software
language: Java, Spring Boot, Netlify, AWS, EC2, Ubuntu, React
author: luciano_brum
---

- [Resumo](#resumo)
- [Descrição do problema](#descrição-do-problema)
- [Solução](#solução)
<br>

# Resumo

A ideia deste post é compartilhar com vocês sobre como eu habilitei a comunicação de um serviço no Netlify hospedado em um domínio com HTTPS, por meio de uma API (com axios, mas poderia ser outra forma), com um serviço (backend) na AWS EC2 em um domínio com HTTP.

# Descrição do problema

O [Netlify começou a utilizar por padrão o HTTPS nos seus sites desde 2018](https://www.netlify.com/blog/2018/07/02/all-new-sites-on-netlify-are-https-by-default/). Isso implica que os serviços implantados no Netlify só podem também acessar domínios HTTPS. O problema surge quando você precisa acessar algum recurso que não tem HTTPS, por exemplo, uma API em um serviço implantando no EC2 da Amazon que não tem um domínio pessoal cadastrado. 

Uma saída que pensei foi a de usar o *Cerbot* (que por baixo usa o *letsencrypt*) para gerar um certificado HTTPS para o domínio público disponibilizado pela Amazon ao criar a instância do EC2 (*free tier*). Não funcionou, pois o *letsencrypt* não gera certificados para domínios temporários como os disponibilizados pela Amazon na criação do EC2. O domínio pode mudar e passar a ser utilizado por outra pessoa. Só funcionaria se o domínio fosse de fato, meu, e não da Amazon. 

A outra alternativa que encontrei [foi essa](https://github.com/netlify/cli/issues/158#issuecomment-540140129). A ideia é a de utilizar um recurso do Netlify de *proxy* de chamadas à serviços externos que vai permitir a chamada de serviços em HTTP. O lado negativo é que perdemos a segurança do HTTPS, portanto, não é recomendado utilizar essa solução em produção, principalmente se envolver dados sensíveis. No nosso caso, como só desejamos colocar uma demonstração de um projeto de portfólio em ambiente de produção, não vejo muito perigo nessa abordagem. 

Isso tudo poderia ser evitado se tivéssemos um domínio registrado. Bastaria ter esse registro cadastrado no Route53 da Amazon e gerar o certificado HTTPS com o letsencrypt. Recomendo essa alternativa como primeira opção por ser mais simples e segura (porém acarreta no custo de criar um domínio, custo esse que nem sempre uma pessoa criando um portfólio terá disponível). 

# Solução

Vamos supor que há uma instância EC2 com o seguinte endereço DNS público:

```
*ec2-99-999-999-999.sa-east-1.compute.amazonaws.com*
```

Nesta instância tem um serviço backend em execução. Nas configurações dos grupos de segurança (*security groups*) o acesso de entrada (*input rules*) é liberado na porta 80. 

O serviço frontend, que está hospedado no Netlify, tem a seguinte chamada de API:

```javascript
export function fetchProducts() {
    return axios(`http://ec2-99-999-999-999.sa-east-1.compute.amazonaws.com/products`)
}
```

A chamada não vai funcionar pelas razões mencionadas anteriormente. O frontend hospedado no Netlify é HTTPS por padrão, só pode consultar recursos também em HTTPS. Para viabilizar acessar um recurso HTTP, vamos utilizar o recurso de proxy do Netlify chamado *_redirects*.

Então, modificaremos as chamadas de API à recursos HTTP conforme abaixo:

```javascript
export function fetchProducts() {
    return axios(`/products`)
}
```

No **publish directory** (diretório de publicação dos artefatos no Netlify - pode ser modificado nas configurações do Netlify em *Site Settings -> Build & Deploy -> Continuous Deployment -> Build Settings -> Publish Directory*), criamos o arquivo **_redirects** e colocamos o seguinte conteúdo:

```
/products http://ec2-99-999-999-999.sa-east-1.compute.amazonaws.com/products 200!
```

O que vai acontecer é o seguinte: quando ocorrer a chamada a API /products, a chamada será redirecionada de acordo com o mapeamento no arquivo **_redirects**, a partir dos servidores CDN do Netlify. Não é como se estivessemos chamando diretamente a API.

Um exemplo real onde essa estratégia foi aplicada é [neste projeto](https://sds2-delivery-food.netlify.app/orders). Ao abrir este link, haverá uma chamada a uma API /products, que é um backend hospedado em um ambiente com HTTP. Esse backend retorna os dados para o Netlify, e o mesmo retorna para o browser. Esse processo de redirecionamento não é transparente (ao abrir a aba *network* após um *inspect* no Google Chrome, não aparecerá a URL do serviço backend, e sim a chamada da API /products com o endereço do próprio site hospedado no Netlify).

Existe ainda uma outra forma de fazer esse processo que é utilizando um arquivo de configuração do Netlify (netlify.toml), onde é possível especificar como o Netlify deve fazer o build e deploy do site. Para saber tudo que é possível fazer com o netlify.toml, [acesse este link da documentação oficial](https://docs.netlify.com/configure-builds/file-based-configuration/).

Detalhe importante: para esse mecanismo de redirect funcionar em ambiente local é necessário executar o projeto com o comando **netlify dev**, e não com o convencional **react-scripts start**. Essa lógica de proxy é específica do Netlify, o **netlify cli** permite [reproduzir funcionalidades do ambiente de produção do Netlify em ambiente local](https://docs.netlify.com/cli/get-started/#run-a-local-development-environment).

# Considerações Finais 

Espero que este tutorial tenha auxiliado de alguma forma no entendimento da comunicação entre serviços no Netlify e na AWS.

Se você deseja apoiar o meu trabalho de escrita sobre os mais diversos assuntos de tecnologia, compartilhe meus artigos em suas redes sociais. O objetivo é o de contribuir com o compartilhamento de experiências práticas em desenvolvimento de software e sobre tecnologia com a comunidade.

Valeu pessoal e até o próximo post !! 
