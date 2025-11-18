# 🌃 Protocolos da Mente Sintética

<div align="center">

![Java](https://img.shields.io/badge/Java-17+-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2.0-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/badge/GitHub-luizfxdev-181717?style=for-the-badge&logo=github)](https://github.com/luizfxdev/protocolos-mente-sintetica)

*Sistema de simulação de Inteligências Artificiais demonstrando Herança, Polimorfismo e Sealed Classes do Java 17+*

[Demo](#-demo) • [Instalação](#-instalação) • [Uso](#-como-usar) • [Tecnologias](#-tecnologias) • [Arquitetura](#-arquitetura)

</div>

---

## 📋 Índice

- [Sobre o Desafio](#-sobre-o-desafio)
- [Aplicação em Projetos Reais](#-aplicação-em-projetos-reais)
- [Função Principal](#-função-principal-do-desafio)
- [Lógica de Solução](#-lógica-de-solução-técnica)
- [Tecnologias](#-tecnologias)
- [Instalação](#-instalação)
- [Como Usar](#-como-usar)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Arquitetura](#-arquitetura)
- [Sealed Classes](#-sealed-classes)
- [Licença](#-licença)

---

## 🎯 Sobre o Desafio

### **Protocolos da Mente Sintética**

Nas profundezas neon de Neo-Tóquio, inteligências artificiais surgem sob diferentes "protocolos". Algumas são protegidas por arquitetos (IA selada), enquanto outras correm livre graças a hackers (IA não selada). Você deverá modelar, instanciar e simular essas entidades usando **Herança**, **Polimorfismo** e os modificadores `sealed` e `non-sealed` do Java moderno.

### **Especificações**

* **Classe Base Sealed**: Criar uma classe abstrata `sealed` chamada `ArtificialIntelligence`, permitindo apenas subclasses selecionadas.

* **Especializações**:
   * `OfficialAI` (sealed): estendida apenas por tipos oficiais (`SecurityAI`, `AdministrativeAI`).
   * `HackedAI` (non-sealed): pode ser livremente estendida (`ArtisticAI`, `MusicalAI`, etc.).

* **Polimorfismo**: Todas as subclasses sobrescrevem o método `performNetworkAction()`, cada uma com um comportamento único.

* **Simulação**: No método principal, instanciar dinamicamente as IAs a partir de uma entrada personalizada e executar `performNetworkAction()` em todas.

### **Exemplo de Entrada**

A entrada será uma lista de tipos separados por vírgula, cada elemento representando uma IA a ser criada:

```
security, administrative, musical, hacked
```

**Descrição da entrada**:
* Cada tipo define uma IA a ser instanciada.
* Tipos válidos: `security`, `administrative`, `musical`, `hacked`.
* O sistema deve instanciar a classe correta conforme o tipo informado.

### **Exemplo de Saída Esperada**

Para a entrada acima, o sistema deve produzir:

```
[OFICIAL] AI_1 → Patrulhando firewalls...
[OFICIAL] AI_2 → Otimizando processos do sistema...
[ARTISTIC] AI_3 → Criando batidas digitais!
[HACKED] AI_4 → Infiltrando sistemas...
```

---

## 💼 Aplicação em Projetos Reais

Este projeto demonstra padrões e conceitos aplicáveis em sistemas corporativos reais:

### **1. Sistemas de Permissões e Controle de Acesso**
- Hierarquia selada para definir tipos de usuários (Admin, User, Guest)
- Controle rígido sobre quem pode estender funcionalidades
- Prevenção de extensões não autorizadas em runtime

### **2. Plugins e Sistemas Extensíveis**
- `non-sealed` permite que terceiros criem plugins customizados
- `sealed` protege o core do sistema de modificações indevidas
- Pattern Strategy aplicado com type-safety garantido em tempo de compilação

### **3. Domain-Driven Design (DDD)**
- Agregados e entidades com hierarquia controlada
- Value Objects que não devem ser estendidos
- Bounded Contexts com fronteiras bem definidas

### **4. Sistemas de Workflow e Automação**
- Definição de tipos de tarefas/processos permitidos
- Extensibilidade controlada para processos customizados
- Type-safety em pipelines de processamento

### **5. APIs REST com Type-Safety**
- DTOs com hierarquia de tipos bem definida
- Serialização/desserialização com garantias de tipo
- Validação em tempo de compilação

---

## 🔑 Função Principal do Desafio

A **função central** que resolve o desafio está no **AIService.java**:

```java
@Service
public class AIService {
    
    public AIResponse processAISimulation(AIRequest request) {
        List<String[]> aiInput = request.parseInput();
        List<ArtificialIntelligence> ais = new ArrayList<>();
        List<String> actions = new ArrayList<>();
        
        int counter = 1;
        for (String[] data : aiInput) {
            String type = data[1].toLowerCase();
            String name = "AI_" + counter++;
            ArtificialIntelligence ai = createAI(type, name);
            
            if (ai != null) {
                ais.add(ai);
                actions.add(ai.performNetworkAction());
            }
        }
        
        String finalOutput = String.join("\n", actions);
        return new AIResponse(actions, finalOutput, ais.size());
    }
    
    private ArtificialIntelligence createAI(String type, String name) {
        return switch (type) {
            case "security" -> new SecurityAI(name);
            case "administrative" -> new AdministrativeAI(name);
            case "musical" -> new MusicalAI(name);
            case "hacked" -> new HackedAI(name);
            default -> null;
        };
    }
}
```

### **Por que esta função é crucial?**

1. **Factory Pattern**: O método `createAI()` implementa o padrão Factory, encapsulando a lógica de criação
2. **Polimorfismo**: Utiliza a classe base `ArtificialIntelligence` para tratar todas as IAs uniformemente
3. **Type Safety**: Switch expressions do Java 17+ garantem tratamento exaustivo de casos
4. **Single Responsibility**: Separação clara entre parsing, criação e execução
5. **Open/Closed Principle**: Fácil adicionar novos tipos sem modificar código existente

---

## 🧠 Lógica de Solução Técnica

### **1. Arquitetura de Classes com Sealed Types**

```java
public abstract sealed class ArtificialIntelligence 
    permits OfficialAI, HackedAI {
    
    protected String name;
    public abstract String performNetworkAction();
}
```

**Conceitos aplicados**:
- **Sealed Classes (Java 17+)**: Restringe quais classes podem estender a hierarquia
- **Abstract Method**: Define contrato obrigatório para todas as implementações
- **Encapsulation**: Atributo `name` protegido, acessível apenas por subclasses

### **2. Hierarquia Controlada**

```java
// Sealed: Apenas SecurityAI e AdministrativeAI podem estender
public abstract sealed class OfficialAI extends ArtificialIntelligence 
    permits SecurityAI, AdministrativeAI {
    
    protected String getOfficialStatus() {
        return "[OFICIAL] ";
    }
}

// Non-Sealed: Qualquer classe pode estender (extensibilidade)
public non-sealed class HackedAI extends ArtificialIntelligence {
    @Override
    public String performNetworkAction() {
        return "[HACKED] " + name + " → Infiltrando sistemas...";
    }
}
```

**Benefícios técnicos**:
- **Compile-time Safety**: Erros de hierarquia detectados em compilação
- **Exhaustive Pattern Matching**: Compilador garante cobertura de todos os casos
- **API Design**: Controle explícito sobre pontos de extensão
- **Maintenance**: Hierarquia documentada no próprio código

### **3. Factory Pattern com Switch Expressions**

```java
private ArtificialIntelligence createAI(String type, String name) {
    return switch (type) {
        case "security" -> new SecurityAI(name);
        case "administrative" -> new AdministrativeAI(name);
        case "musical" -> new MusicalAI(name);
        case "hacked" -> new HackedAI(name);
        default -> null;
    };
}
```

**Características**:
- **Switch Expressions**: Retorno direto sem breaks
- **Type Inference**: Compilador infere o tipo de retorno comum
- **Null Safety**: Retorno explícito de `null` para casos inválidos
- **Readability**: Código declarativo e conciso

### **4. Service Layer com Separation of Concerns**

```java
public AIResponse processAISimulation(AIRequest request) {
    // 1. Parsing: Transforma input string em estrutura de dados
    List<String[]> aiInput = request.parseInput();
    
    // 2. Creation: Instancia objetos via Factory
    List<ArtificialIntelligence> ais = new ArrayList<>();
    
    // 3. Execution: Executa polimorficamente
    List<String> actions = new ArrayList<>();
    for (String[] data : aiInput) {
        ArtificialIntelligence ai = createAI(type, name);
        if (ai != null) {
            ais.add(ai);
            actions.add(ai.performNetworkAction());
        }
    }
    
    // 4. Aggregation: Monta resposta
    return new AIResponse(actions, finalOutput, ais.size());
}
```

**Princípios SOLID aplicados**:
- **SRP**: Cada método tem uma responsabilidade única
- **OCP**: Extensível sem modificação (adicionar novos tipos)
- **LSP**: Subtipos substituíveis pela classe base
- **ISP**: Interfaces específicas (DTOs dedicados)
- **DIP**: Dependência de abstrações (`ArtificialIntelligence`)

### **5. DTO Pattern para API REST**

```java
public class AIRequest {
    private String input;
    
    public List<String[]> parseInput() {
        return Arrays.stream(input.split(","))
            .map(String::trim)
            .filter(s -> !s.isEmpty())
            .map(type -> new String[]{type, type})
            .toList();
    }
}
```

**Técnicas utilizadas**:
- **Streams API**: Pipeline funcional para transformação
- **Immutability**: `toList()` retorna lista imutável
- **Defensive Programming**: Validação de entrada vazia
- **Data Transformation**: Conversão de formato para processamento

### **6. Frontend com TypeScript e React**

```typescript
const handleSimulate = async () => {
    setLoading(true);
    try {
        const response = await aiService.simulateAI(input);
        setResult(response);
    } catch (err) {
        setError('Erro ao processar simulação');
    } finally {
        setLoading(false);
    }
};
```

**Patterns implementados**:
- **Async/Await**: Código assíncrono legível
- **Error Handling**: Try-catch para tratamento robusto
- **State Management**: React hooks para controle de estado
- **Service Layer**: Abstração da comunicação HTTP

---

## 🛠️ Tecnologias

### **Backend**
- **Java 17+** - Sealed Classes, Pattern Matching, Records
- **Spring Boot 3.2.0** - Framework REST API
- **Maven** - Gerenciamento de dependências
- **Lombok** - Redução de boilerplate

### **Frontend**
- **React 18** - Biblioteca UI
- **TypeScript 5.2** - Type-safety
- **Vite 5.0** - Build tool ultra-rápida
- **Tailwind CSS 3.4** - Utility-first CSS
- **Axios** - HTTP client

### **DevOps**
- **CORS Configuration** - Cross-origin habilitado
- **Hot Reload** - Desenvolvimento ágil
- **Proxy Vite** - Comunicação backend/frontend

---

## 📦 Instalação

### **Pré-requisitos**

```bash
# Java JDK 17 ou superior
java -version

# Node.js 18+ e npm
node -v
npm -v

# Maven (opcional, projeto tem wrapper)
mvn -v
```

### **Clone o Repositório**

```bash
git clone https://github.com/luizfxdev/protocolos-mente-sintetica.git
cd protocolos-mente-sintetica
```

### **Instalação Automatizada**

Execute o script na raiz do projeto:

```bash
# Linux/Mac
chmod +x start.sh
./start.sh

# Windows
start.bat
```

### **Instalação Manual**

#### **Backend**

```bash
cd backend
./mvnw clean install
./mvnw spring-boot:run
```

#### **Frontend** (em outro terminal)

```bash
cd frontend
npm install
npm run dev
```

---

## 🎮 Como Usar

1. **Inicie o Backend** (porta 8080)
2. **Inicie o Frontend** (porta 5173)
3. **Acesse**: http://localhost:5173
4. **Insira os tipos de IA** separados por vírgula:
   - `security` - IA de Segurança (Oficial)
   - `administrative` - IA Administrativa (Oficial)
   - `musical` - IA Musical (Artística/Hacked)
   - `hacked` - IA Hackeada (Livre)
5. **Clique em CALCULAR** para processar
6. **Visualize os resultados** da simulação

### **Exemplo de Entrada**

```
security, administrative, musical, hacked
```

### **Saída Gerada**

```
[OFICIAL] AI_1 → Patrulhando firewalls...
[OFICIAL] AI_2 → Otimizando processos do sistema...
[ARTISTIC] AI_3 → Criando batidas digitais!
[HACKED] AI_4 → Infiltrando sistemas...
```

---

## 📁 Estrutura do Projeto

```
protocolos-mente-sintetica/
│
├── backend/                          # Spring Boot Application
│   ├── src/main/java/com/neotokyo/ai/
│   │   ├── model/                   # Sealed Classes Hierarchy
│   │   │   ├── ArtificialIntelligence.java
│   │   │   ├── OfficialAI.java
│   │   │   ├── SecurityAI.java
│   │   │   ├── AdministrativeAI.java
│   │   │   ├── HackedAI.java
│   │   │   └── MusicalAI.java
│   │   ├── service/                 # Business Logic
│   │   │   └── AIService.java
│   │   ├── controller/              # REST Endpoints
│   │   │   └── AIController.java
│   │   ├── dto/                     # Data Transfer Objects
│   │   │   ├── AIRequest.java
│   │   │   └── AIResponse.java
│   │   └── AiApplication.java       # Main Application
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
│
├── frontend/                         # React + Vite + TypeScript
│   ├── src/
│   │   ├── components/
│   │   │   ├── AISimulator.tsx     # Main Component
│   │   │   ├── AudioControl.tsx    # Audio Player
│   │   │   └── VideoBackground.tsx # Video BG
│   │   ├── services/
│   │   │   └── aiService.ts        # API Client
│   │   ├── types/
│   │   │   └── ai.types.ts         # TypeScript Types
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── public/assets/
│   │   ├── background.mp4
│   │   └── theme.mp3
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
│
├── start.sh                          # Linux/Mac Startup Script
├── start.bat                         # Windows Startup Script
└── README.md
```

---

## 🏗️ Arquitetura

### **Padrões de Design Implementados**

1. **Factory Pattern** - Criação de IAs
2. **Strategy Pattern** - Comportamentos polimórficos
3. **DTO Pattern** - Transferência de dados
4. **Service Layer** - Lógica de negócio
5. **Repository Pattern** - Acesso a dados (preparado para expansão)

### **Princípios SOLID**

- ✅ **Single Responsibility** - Cada classe tem uma responsabilidade
- ✅ **Open/Closed** - Extensível sem modificação
- ✅ **Liskov Substitution** - Subtipos são substituíveis
- ✅ **Interface Segregation** - Interfaces específicas
- ✅ **Dependency Inversion** - Dependência de abstrações

---

## 🔐 Sealed Classes

```
sealed ArtificialIntelligence
  ├── sealed OfficialAI
  │     ├── final SecurityAI
  │     └── final AdministrativeAI
  └── non-sealed HackedAI
        └── final MusicalAI (extensível a qualquer subclasse)
```

### **Vantagens**

- ✅ **Type Safety** em compile-time
- ✅ **Pattern Matching** exaustivo
- ✅ **API Design** explícito
- ✅ **Documentação** no código
- ✅ **Prevenção** de extensões indevidas

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

**Luiz Felipe de Oliveira**

- GitHub: [@luizfxdev](https://github.com/luizfxdev)
- Linkedin: [in/luizfxdev](https://www.linkedin.com/in/luizfxdev)
- Portfólio: [luizfxdev.com.br](https://luizfxdev.com.br)

---

<div align="center">

### ⭐ Se este projeto foi útil, deixe uma estrela!

**Made with 💙 in Neo-Tokyo**

</div>
