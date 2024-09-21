---
layout: post
title: Memory leaks em Java
subtitle: Um problema frequente em aplicações Java, Memory Leaks são mais difíceis de identificar as causas. Neste artigo, abordo alguns exemplos de situações que já passei.
date: 2024-09-21 12:15:00 -0300
categories: software
language: Java
author: luciano_brum
---

- [O que são memory leaks](#o-que-são-memory-leaks)
- [Como memory leaks ocorrem](#como-memory-leaks-ocorrem)
- [Exemplos de memory leak](#exemplos-de-memory-leak)
- [Sinais de memory leak](#sinais-de-memory-leak)
- [Como prevenir memory leak](#como-prevenir-memory-leak)
- [Como encontrar a causa do memory leak](#como-encontrar-a-causa-do-memory-leak)

## O que são memory leaks

Se você já atua como programador, especialmente em linguagens como Java, C++ ou JavaScript, já deve ter ouvido falar de *memory leaks* (vazamentos de memória). Esses vazamentos podem se tornar um verdadeiro pesadelo para o desempenho de aplicações e sistemas de grande escala. O que são *memory leaks*, como eles ocorrem e como podemos preveni-los?

## Como memory leaks ocorrem?

Um *memory leak* ocorre quando um programa aloca memória para armazenar dados, mas nunca libera essa memória após o uso. Isso significa que o espaço ocupado na memória permanece inativo, não podendo ser utilizado por outras partes do programa ou pelo sistema. Ao longo do tempo, esses vazamentos podem resultar no esgotamento da memória disponível, causando lentidão, falhas e até mesmo o travamento completo de um sistema.

Mesmo em linguagens com *garbage collector*, como Java ou C#, os *memory leaks* podem ocorrer se o programador não gerenciar adequadamente a vida útil dos objetos. Aqui estão algumas causas comuns:

**Referências inúteis mantidas em coleções**: Um dos erros mais comuns é armazenar objetos em coleções (como listas, mapas ou conjuntos) e nunca removê-los, mesmo após eles não serem mais necessários.

**Eventos não cancelados**: Se você cria *listeners* ou *callbacks* que ficam observando eventos, mas esquece de removê-los quando eles não são mais necessários, pode deixar referências persistentes, causando um vazamento de memória.

**Uso incorreto de recursos externos**: Em linguagens como C ou C++, o programador deve manualmente alocar e desalocar memória. Não liberar corretamente essa memória resulta em vazamento.

**Singletons e objetos globais**: Objetos globais ou singletons mantêm referências ao longo de toda a execução do programa. Se esses objetos armazenarem referências a outros, esses dados podem nunca ser liberados.

## Exemplos de memory leak

```java
public class MemoryLeakExample {
    public static void main(String[] args) {
        JButton button = new JButton("Clique Aqui");
        JFrame frame = new JFrame();
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.add(button);
        frame.setSize(300, 200);
        frame.setVisible(true);

        // Adicionando um ActionListener ao botão
        button.addActionListener(e -> {
            System.out.println("Botão clicado!");
            // Este listener nunca é removido, criando um possível vazamento
        });
    }
}

```

```java
import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;

public class CacheMemoryLeakExample {
    public static void main(String[] args) {
        Cache<String, Object> cache = CacheBuilder.newBuilder().build();

        for (int i = 0; i < 1000000; i++) {
            // Adicionando elementos ao cache sem política de expiração
            cache.put("key" + i, new Object());
        }

        // Mesmo que não precisemos mais desses objetos, eles ainda estão no cache
    }
}
```

```java
import java.util.HashMap;

public class StaticMemoryLeakExample {
    private static final HashMap<Integer, String> map = new HashMap<>();

    public static void main(String[] args) {
        for (int i = 0; i < 1000000; i++) {
            map.put(i, "value" + i);
        }

        // O map é estático, então seus dados nunca serão removidos,
        // causando um vazamento de memória conforme o tempo passa
    }
}
```

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ThreadLeakExample {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(10);

        for (int i = 0; i < 1000; i++) {
            executor.submit(() -> {
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            });
        }

        // O executor nunca é fechado, o que mantém as threads em execução
        // Para fechar o executor: executor.shutdown();
    }
}
```

```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class JdbcMemoryLeakExample {

    private static final String DB_URL = "jdbc:mysql://localhost:3306/mydatabase";
    private static final String USER = "root";
    private static final String PASSWORD = "password";

    public static void main(String[] args) {
        for (int i = 0; i < 1000; i++) {
            memoryLeak();
        }
    }

    public static void memoryLeak() {
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;
        
        try {
            // Criando conexão com o banco de dados
            conn = DriverManager.getConnection(DB_URL, USER, PASSWORD);

            // Criando uma declaração
            stmt = conn.createStatement();

            // Executando uma consulta
            rs = stmt.executeQuery("SELECT * FROM my_table");

            // Iterando sobre o resultado
            while (rs.next()) {
                System.out.println(rs.getString("column1"));
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // Aqui temos um vazamento de memória porque as conexões não são fechadas corretamente
            // conn.close(); -> Conexão não está sendo fechada, o que pode causar um vazamento
            // stmt.close(); -> O Statement também deveria ser fechado
            // rs.close(); -> O ResultSet também deveria ser fechado
        }
    }
}
```

```java
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class HttpMemoryLeakExample {

    public static void main(String[] args) {
        for (int i = 0; i < 1000; i++) {
            makeHttpCall();
        }
    }

    public static void makeHttpCall() {
        HttpURLConnection connection = null;
        BufferedReader reader = null;

        try {
            URL url = new URL("https://jsonplaceholder.typicode.com/todos/1");
            connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");

            // Abrindo stream de resposta, mas não fechando (causa o vazamento)
            reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));

            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // O InputStream e o HttpURLConnection não são fechados corretamente, causando vazamento de recursos
            // reader.close(); // Deveria fechar o BufferedReader
            // connection.disconnect(); // Deveria desconectar a conexão
        }
    }
}
```

## Sinais de memory leak

Como identificar que sua aplicação está sofrendo com vazamentos de memória? Alguns sinais comuns incluem:

**Uso Contínuo e Crescente de Memória**: O uso de memória do sistema aumenta gradualmente, mesmo sem aumentar a carga de trabalho.

**Desempenho Lentamente Degradado**: Sua aplicação pode começar a apresentar lentidão conforme continua a executar.

**Falhas Ocorrem Após Longo Tempo de Execução**: O aplicativo funciona corretamente por horas ou dias, mas eventualmente trava ou falha devido à falta de memória.

## Como prevenir memory leak

**Gerenciar Bem as Referências**: Sempre que um objeto não for mais necessário, certifique-se de que ele seja liberado. Em linguagens com gerenciamento automático de memória, como Java, remover referências ajuda o garbage collector a identificar quais objetos podem ser desalocados.

**Remover Listeners Inúteis**: Se sua aplicação usa *listeners* ou *observers*, lembre-se de removê-los quando eles não forem mais necessários.

**Fechar Recursos Externos**: Ao trabalhar com arquivos, conexões de rede ou outros recursos externos, sempre feche-os após o uso. Em Java, por exemplo, você pode usar estruturas como *try-with-resources* para garantir que os recursos sejam liberados.

**Ferramentas de Monitoramento de Memória**: Use ferramentas de *profiling* e depuração para monitorar o uso de memória da aplicação. Em Java, o *VisualVM* e o *JProfiler* são ótimos exemplos de ferramentas que ajudam a identificar vazamentos.

**Teste de Estresse e Carga**: Execute testes de carga em sua aplicação para identificar possíveis vazamentos que só se manifestam após longos períodos de execução.

## Como encontrar a causa do memory leak

Mostrarei, no próximo artigo, com alguns exemplos, de como detectar *memory leaks* no VisualVM.

*Dica bônus: não é simples identificar um memory leak. Já me aconteceu do problema estar não no código da aplicação em si, mas em uma das dependências da aplicação. Por isso é sempre importante buscar entender em qual funcionalidade acontece, se é quando utiliza uma dependência específica, ou em horários do sistema que muitos usuários utilizam, ou quando grandes conjuntos de dados são processados em lote, e assim por diante. Com sorte, podemos encontrar em poucas buscas no Google/Stack Overflow/ChatGpt o problema, fazendo uma pesquisa com algo como 'jackson-core version 2.xx lib memory leak'.*

## Conclusão

*Memory leaks* são um problema silencioso, mas potencialmente devastador para qualquer aplicação. Eles podem surgir de forma sutil e afetar negativamente o desempenho, confiabilidade e escalabilidade do seu software. Ao adotar boas práticas de gerenciamento de memória e monitorar cuidadosamente a aplicação, é possível evitar que esses vazamentos prejudiquem a experiência dos usuários e a integridade do sistema.

Uma boa gestão de memória não só melhora o desempenho da aplicação como também contribui para uma experiência de usuário mais fluida e agradável.

Sobre *memory leaks* em Java era isso o que eu tinha para compartilhar.

Valeu pessoal e até o próximo post !
