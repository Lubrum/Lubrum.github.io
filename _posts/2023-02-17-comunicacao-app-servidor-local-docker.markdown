---
layout: post
title: Comunicação de um aplicativo com um serviço em execução no Docker (sem e com Nginx)
subtitle: Neste artigo forneço uma dica rápida de como permitir a comunicação de um aplicativo com um serviço containerizado com Docker na mesma rede em ambiente local. Também é apresentado um exemplo com HTTPS com o openssl.
date: 2023-02-19 19:15:00 -0300
categories: software
language: Docker, Docker-compose, Nginx, Openssl, Android
author: luciano_brum
---

- [Resumo](#resumo)
- [Descrição do problema](#descrição-do-problema)
- [Solução](#solução)
<br>

# Resumo

A ideia deste post é mostrar como habilitar a comunicação de um aplicativo feito com React Native (executando localmente com a ajuda do expo) com um serviço backend containerizado com Docker. O serviço é uma aplicação feita com Spring Boot em Java, mas a dica é válida para um serviço em qualquer linguagem.  
  
<br/>

> *Este setup é apenas para ambientes de desenvolvimento. Não use esse tutorial como exemplo para implantação em ambientes de produção.*


# Descrição do problema

Antes de containerizar a aplicação Spring Boot no Docker, o aplicativo acessava as APIs normalmente através do IP da máquina (pode ser obtido com o comando <span style = "color: #ff8080">ifconfig</span>  ou nas configurações de rede do SO) e a porta da aplicação Spring (por exemplo - 192.168.0.9:8000). Isso só funcionava porque ambos serviços estavam na mesma rede.

O problema surgiu quando o serviço do Spring Boot foi containerizado. Não fazia mais sentido utilizar o IP da máquina + porta da aplicação, pois agora essa comunicação depende de como o Docker e sua rede foram configurados e se há proxy reverso no caminho (como Nginx, HAProxy, etc). Vamos ver na sequência ambos os cenários.

# Solução

Vamos supor que nossa aplicação Spring (chamada neste exemplo de 'my_image/my_app') executa na porta 8002 e que temos o seguinte arquivo docker-compose.yml para subir o serviço:

```yml
version: '3.8'

services:
  app:
    image: 'my_image/my_app:latest'
    container_name: app
    ports:
      - "8001:8002"
```

O parâmetro <span style = "color: #ff8080">ports</span> no docker compose é um mapeamento entre uma porta no host e uma porta no container. A porta 8002 (da aplicação Spring containerizada) está mapeada na porta 8001 do host. Então para acessar esse serviço localmente, basta digitar no browser:

```bash
http://localhost:8001
```

Para acessar esse serviço a partir de um app executando na rede local, basta modificar o 'localhost' pelo endereço IP da máquina que está hospedando o Docker. 

No Ubuntu, você pode usar os comandos <span style = "color: #ff8080">ip a</span> ou <span style = "color: #ff8080">ifconfig</span> 
para descobrir o IP privado (podem aparecer vários, basta tentar cada um deles), ou também ir em *Settings* -> *Wi-fi* -> *Settings* (da rede local) -> *Details* -> *IPV4 Address*, e obter o IP. No meu caso, é 192.168.100.17. Então, para acessar a API através do aplicativo, seria assim:

```bash
http://192.168.100.17:8001
```

Outro cenário possível é o de existir um proxy reverso (Nginx) em um container no host. Segue abaixo um arquivo de configuração de exemplo do Nginx:

```conf
upstream my_app {
        server app:8002;
        keepalive 16;
}

server {
        listen 80;

        server_name localhost;
        location / {
                proxy_cache_use_stale error timeout updating http_500 http_502 http_503 http_504;
                proxy_cache_background_update on;
                proxy_cache_lock on;

                proxy_pass              http://my_app/;
                proxy_set_header        X-Real-IP $remote_addr;
                proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header        Host $host;
                proxy_set_header        Connection "";
                proxy_http_version      1.1;
                proxy_read_timeout      600;

                add_header X-Cache-Status $upstream_cache_status;
        }
}
```

E o respectivo docker-compose.yml, que agora inclui o Nginx:

```yml
version: '3.8'

services:
  nginx:
    image: nginx:1.23.3-alpine-slim@sha256:60a7532e3b954c902cb651aa29a2c757c495e11c264368fdf77b139985b923c6
    restart: always
    ports:
      - "80:80"
      - "443:443"
    hostname: nginx
    volumes:
      - ./nginx/conf.d:/etc/nginx/conf.d
    depends_on:
      - app

  app:
    image: 'my_image/my_app:latest'
    restart: always
    hostname: app
    ports:
      - "8001:8002"
```

Para acessar o serviço *app*, será necessário passar pelo Nginx. Para acessar o Nginx, basta usar localhost:80 (ou IP_DO_HOST:80). 

As configurações do Nginx apresentadas anteriormente farão um redirecionamento de chamadas do localhost:80 (ou do IP_DO_HOST:80) para o Nginx, que na sequência direciona a chamada para o **app:8002**. 8002 é a porta do serviço Spring Boot e o **app** é o hostname do container, que se traduz no IP do mesmo. Não é a porta 8001, pois essa é a porta que está mapeada no Host para acessar o serviço Spring Boot.

Então, de acordo com o exemplo acima, para acessar o serviço backend através do aplicativo rodando no emulador do Android, basta usar o IP da máquina + porta 80 nas chamadas de API no código do app.

<br />

___

<br />

Podemos ir além e testar as chamadas de API com o Nginx e com HTTPS (e redirecionar chamadas HTTP para HTTPS). Uma forma de fazer esse teste é com o <span style = "color: #ff8080">openssl</span>.

Os comandos abaixo geram o certificado necessário e copiam para o diretório que vamos usar como volume no container do Nginx. Uma boa referência sobre o assunto é [essa resposta do Stackoverflow](https://stackoverflow.com/a/57684211/5649810).

```bash
>openssl.cnf cat <<-EOF
[ req ]
default_bits        = 2048
default_keyfile     = localhost.key
default_md          = sha256
default_days        = 825
encrypt_key         = no
distinguished_name  = subject
req_extensions      = req_ext
x509_extensions     = x509_ext
string_mask         = utf8only
prompt              = no

[ subject ]
countryName         = BR
stateOrProvinceName = SC
localityName        = Florianopolis
organizationName    = LucianoBrum
OU                  = Engineering

commonName          = localhost
emailAddress        = lucianobrum18@gmail.com

[ x509_ext ]
subjectKeyIdentifier    = hash
authorityKeyIdentifier  = keyid:always,issuer

basicConstraints        = critical, CA:TRUE
keyUsage                = critical, digitalSignature, keyEncipherment, cRLSign, keyCertSign
subjectAltName          = DNS:localhost,IP:10.0.2.2
extendedKeyUsage        = serverAuth
extendedKeyUsage        = TLS Web Server Authentication

[ req_ext ]
subjectKeyIdentifier    = hash
basicConstraints        = CA:FALSE
keyUsage                = digitalSignature, keyEncipherment
subjectAltName          = DNS:localhost,IP:10.0.2.2
nsComment               = "OpenSSL Generated Certificate"
EOF

openssl req -config openssl.cnf -new -x509 -days 825 -out localhost.crt -verbose
sudo cp localhost.key /etc/ssl/private/localhost.key
sudo cp localhost.crt /etc/ssl/certs/localhost.crt
```

Observe os parâmetros essenciais para este exemplo:

default_keyfile     = localhost.key

commonName          = localhost

subjectAltName      = DNS:localhost,IP:10.0.2.2

Utilizamos aqui, além do localhost, o IP 10.0.2.2 porque é o [IP que o emulador do Android utiliza para se comunicar com o localhost da máquina HOST](https://developer.android.com/studio/run/emulator-networking?hl=pt-br).

Para testar o serviço no Browser, vamos precisar importar o certificado de autoridade. Cada browser tem um fluxo diferente para fazer isso.

Os passos no Google Chrome são os seguintes.

1- menu de opções do Chrome (três pontinhos no canto superior direito)

2- Settings (Configurações)

3- Privacy and Security (Privacidade e Segurança - menu esquerdo)

4- Security (Segurança - no grupo Privacy and Security)

5- Manage certificates (Gerenciar certificados)

6- Authorities (Autoridades - selecionar a aba)

7- Import (Importar)

8- Buscar o certificado gerado anteriormente, o localhost.crt, e dar ok

Adicionamos os volumes */etc/ssl/certs:/etc/ssl/certs* e */etc/ssl/private:/etc/ssl/private* no docker-compose.yml para que o container do Nginx possa acessar os certificados gerados. 

```yml
version: '3.8'

services:
  nginx:
    image: nginx:1.23.3-alpine-slim@sha256:60a7532e3b954c902cb651aa29a2c757c495e11c264368fdf77b139985b923c6
    restart: always
    ports:
      - "80:80"
      - "443:443"
    hostname: nginx
    volumes:
      - /etc/nginx/conf.d:/etc/nginx/conf.d
      - /etc/ssl/certs:/etc/ssl/certs
      - /etc/ssl/private:/etc/ssl/private
    depends_on:
      - app

  app:
    image: 'my_image/my_app:latest'
    restart: always
    hostname: app
    ports:
      - "8001:8002"
```

Por fim, vamos modificar o arquivo de configurações do Nginx conforme abaixo:

```conf
upstream my_app {
        server app:8002;
        keepalive 16;
}

server {
        listen 80 default_server;
        server_name _;
        return 307 https://$host$request_uri;
}

server {
        listen 443 ssl;
        server_name localhost;
        ssl_protocols TLSv1.2 TLSv1.1 TLSv1;
        ssl_ciphers HIGH:!aNULL:!MD5;

        ssl_certificate /etc/ssl/certs/localhost.crt;
        ssl_certificate_key /etc/ssl/private/localhost.key;

        location / {
                proxy_cache_use_stale error timeout updating http_500 http_502 http_503 http_504;
                proxy_cache_background_update on;
                proxy_cache_lock on;

                proxy_pass              http://my_app/;
                proxy_set_header        X-Real-IP $remote_addr;
                proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header        Host $host;
                proxy_set_header        Connection "";
                proxy_http_version      1.1;
                proxy_read_timeout      600;

                add_header X-Cache-Status $upstream_cache_status;
        }
}
```

Foi adicionado o *path* dos certificados que geramos anteriormente para o 'localhost' para habilitar o acesso local por HTTPS. Ainda habilitamos um redirecionamento de chamadas HTTP para HTTPS no localhost. O ip:porta para acessar o serviço Spring é app:8002 em vez de app:8001, pois estamos acessando o container a partir da porta do serviço (8002) e não da porta mapeada no Host (8001).

Agora é só testar no browser: https://localhost. Deverá aparecer ao lado da URL a imagem do cadeado fechado mostrando que o site possui um certificado e tem uma conexão confiável.

Para testar no emulador do Android, vamos precisar fazer quatro ações.

1- adicionar o certificado localhost.crt no projeto do aplicativo em teste. 

Para isso, abrir o projeto (Android) e adicionar o seguinte conteúdo em <span style = "color: #ff8080">./app/src/main/res/xml/network-security-config.xml</span>

```xml
<network-security-config xmlns:tools="http://schemas.android.com/tools"
	xmlns:android="http://schemas.android.com/apk/res/android">
	<base-config>
		<trust-anchors>
			<certificates src="@raw/localhost" />
		</trust-anchors>
	</base-config>
</network-security-config>
```

2- adicionar o arquivo localhost.crt no diretório <span style = "color: #ff8080">./app/src/main/res/raw</span>. 

Se não existir esse diretório, criar o mesmo.

3- verificar se o arquivo em <span style = "color: #ff8080">./app/src/main/AndroidManifest.xml</span> possui o trecho abaixo. Se não tiver, adicione-o. Ele habilita as configurações de segurança de rede através do arquivo <span style = "color: #ff8080">network_security_config.xml</span>.

```xml
...
<application android:networkSecurityConfig="@xml/network_security_config">
...
```

4- ajustar as urls das APIs no aplicativo de forma que elas usem agora o IP:porta https://10.0.2.2:80.

Ao executar o aplicativo no emulador, deverá ser possível acessar recursos com urls em HTTPS com um serviço executando localmente em um container.

Esse teste também pode ser feito com um Nginx executando no Host em vez de em um container. Poucas mudanças seriam necessárias...

# Considerações Finais 

Não entrei no mérito de boas práticas (com Docker, Nginx, openssl, etc) ou explicar o que cada coisa faz. Acredito que já existam bons tutoriais sobre isso. A ideia deste artigo foi a de apresentar dicas relacionadas a ambientes que envolvam várias coisas diferentes, que exigem um certo nível de conhecimento das ferramentas e dos conceitos por trás de tudo isso.

Se você deseja apoiar o meu trabalho de escrita sobre os mais diversos assuntos de tecnologia, compartilhe meus artigos em suas redes sociais. O objetivo é o de contribuir com o compartilhamento de experiências práticas em desenvolvimento de software e sobre tecnologia com a comunidade.

Valeu pessoal e até o próximo post !! 

# Referências

- [How to create an HTTPS certificate for localhost domains](https://gist.github.com/cecilemuller/9492b848eb8fe46d462abeb26656c4f8)

- [Adding self trusted SSL certificate for localhost on Ubuntu(NGINX)](https://medium.com/internshala-tech/adding-self-trusted-ssl-certificate-for-localhost-on-ubuntu-nginx-c66d70b22e4b)

- [Connecting mobile apps to backends for development with SSL](https://medium.com/@noumaan/ssl-app-dev-a2923d5113c6)

- [Configurar a rede do Android Emulator](https://developer.android.com/studio/run/emulator-networking?hl=pt-br)

- [One self-signed cert to rule them all? Chrome, Android, and iOS](https://stackoverflow.com/questions/57565665/one-self-signed-cert-to-rule-them-all-chrome-android-and-ios)


