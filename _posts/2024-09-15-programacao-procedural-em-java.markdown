---
layout: post
title: Programação procedural em java
subtitle: Assunto não muito comentado no mundo Java que prejudica a manutenção e evolução de aplicações
date: 2024-09-15 12:15:00 -0300
categories: software
language: Git
author: luciano_brum
---

- [O que é programação procedural](#o-que-é-programação-procedural)
- [Programação em java](#programação-em-java)
- [Problemas da abordagem procedural](#problemas-da-abordagem-procedural)

## O que é programação procedural

Na programação procedural, o código é organizado em funções e procedimentos. Comumente ensinada nas universidades, a linguagem C exemplifica bem o uso desse paradigma.

Abaixo, um exemplo de código em Java considerado procedural.

```java
// Dados separados de comportamento
class Employee {
    String name;
    double salary;
}

public class ProceduralExample {

    public static void increaseSalary(Employee employee, double increaseAmount) {
        employee.salary += increaseAmount;
    }

    public static void displayEmployee(Employee employee) {
        System.out.println("Name: " + employee.name);
        System.out.println("Salary: " + employee.salary);
    }

    public static void main(String[] args) {
        Employee emp = new Employee();
        emp.name = "Alice";
        emp.salary = 5000;

        displayEmployee(emp);
        increaseSalary(emp, 500);
        displayEmployee(emp);
    }
}
```

Em aplicações reais, é comum encontrar métodos *static* com mais de 100 linhas de código, assim como as notórias *'God Classes'*.

## Programação em java

Abaixo um exemplo de como seria um código em Java no paradigma de orientação à objetos.

```java
class Employee {
    private String name;
    private double salary;

    public Employee(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }

    public void increaseSalary(double increaseAmount) {
        if (increaseAmount > 0) {
            this.salary += increaseAmount;
        } else {
            System.out.println("Invalid increase amount!");
        }
    }

    public void displayInfo() {
        System.out.println("Name: " + name);
        System.out.println("Salary: " + salary);
    }
}

public class ObjectOrientedExample {
    public static void main(String[] args) {
        Employee emp = new Employee("Alice", 5000);

        emp.displayInfo();
        emp.increaseSalary(500);
        emp.displayInfo();
    }
}
```

Vantagens da Programação Orientada a Objetos:

Encapsulamento: Com os atributos sendo privados, só podem ser acessados ou modificados pelos métodos da classe.

Regras de negócio centralizadas: A lógica de aumento de salário está encapsulada no método increaseSalary. Se regras de negócio mudarem (por exemplo, aplicar um limite para o aumento), só será necessário alterar esse método.

Facilidade de manutenção e extensão: Se for necessário adicionar novos métodos ou funcionalidades à classe, isso pode ser feito sem impactar outras partes do código.

# Problemas da abordagem procedural

## Modularidade e Organização

No exemplo procedural, os dados (name e salary) estão separados da lógica que os manipula, tornando o código menos modular. Na orientação a objetos, o comportamento está junto com os dados, o que facilita a manutenção.

## Encapsulamento

No exemplo orientado a objetos, o encapsulamento protege os dados de serem acessados ou modificados diretamente, forçando o uso de métodos apropriados. Isso melhora a segurança do código e facilita o controle sobre as operações realizadas.

## Reutilização e Extensibilidade

A orientação a objetos facilita a reutilização de código. Por exemplo, a classe Employee pode ser facilmente estendida para criar tipos de funcionários especializados (usando herança ou composição), sem precisar modificar o código existente.

Tais problemas não são tão perceptíveis quando estamos iniciando no desenvolvimento de software. Basta olharmos um código procedural em Java escrito 5 anos atrás por outra pessoa, ou até escrito por nós mesmos, que ficará evidente o problema de fazer manutenção de códigos procedurais em linguagens orientadas à objeto.

Como assim, ficará evidente? classes com dez mil linhas, métodos que fazem dezenas de coisas de formas diferentes, duplicação indevida de regras de negócio, dificuldade de entender o racional por trás das decisões (principalmente se for mal documentado), métodos que trabalham com interface, regras de negócio e banco ao mesmo tempo, métodos que alteram objetos de entrada e assim por diante. Vamos nos deparar, inclusive, com o  modelo de domínio anêmico (*anemic domain model*) e os scripts de transação (*transaction scripts*), citados pelo **Martin Fowler** neste [link](https://martinfowler.com/bliki/AnemicDomainModel.html) (de 2003!).

Vejam, para mim, não é problema utilizar código procedural em linguagem orientada à objetos. O problema é utilizar onde não deve ser utilizado. Se você precisa realizar algum tipo de operação em estrutura de dados, talvez seja interessante ter um método estático ou uma classe *'Utils'* para isso. Deve ser exceção, e não a regra.

Realizar correções e evolução de código procedural se tornam um desafio, um custo à empresa, um dano na experiência de desenvolvimento, uma demora na entrega ao cliente, coisas tais que poderiam ser evitadas.

Sei que, no mundo real, existem desafios que vão além da parte da criação do software em si, como gerência, prazos, contexto, comunicação, escopo, autonomia de decisões, e assim por diante. Nosso papel como desenvolvedores ou engenheiros não é meramente digitar código. É, mais do que outra coisa, resolver problemas. A forma como resolvemos um problema também pode se tornar um problema. Então não é apenas resolver um problema, mas tentar resolvê-lo da forma adequada em um tempo apropriado.

Código procedural em linguagens orientadas à objeto é um problema que afeta dezenas de milhares de soluções Java, convertendo-se em custos desnecessários prejudicando todo o ecossistema dessas linguagens.

Meus conselhos finais são: estude o paradigma de orientação à objetos e leia os artigos do Martin Fowler.

Sobre o paradigma procedural em Java era isso o que eu tinha para compartilhar.

Valeu pessoal e até o próximo post !
