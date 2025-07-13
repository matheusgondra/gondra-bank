# Regras de Negócio

## Tipos de Contas
- **Conta Corrente**:
  - Usada para movimentações diárias, como depósitos, saques e transferências.
  - Não pode ser usada para compra de ativos.
- **Conta Investimento**:
  - Exclusiva para operações de compra e venda de ativos.
  - Não permite depósitos ou saques diretos, apenas transferências internas da Conta Corrente.

### Regras Gerais para Contas

1. **Separação de Saldos**:
   - O saldo da **Conta Corrente** e da **Conta Investimento** é gerenciado de forma independente.
   - Não é possível usar diretamente o saldo de uma conta para operações da outra sem realizar uma transferência interna.

2. **Validação na Transferência Entre Contas**:
   - Antes de realizar uma transferência entre contas (exemplo: Conta Corrente → Conta Investimento), o sistema deve verificar:
     - **Saldo Suficiente**: A conta de origem deve ter saldo suficiente para cobrir o valor da transferência.
     - **Valor Válido**: O valor da transferência deve ser maior que zero.
     - **Pendências**: No caso de transferências da Conta Investimento para a Conta Corrente, o sistema deve verificar se não há operações pendentes de compra ou venda de ativos.

3. **Custos de Transferência**:
   - **Transferências Internas (mesmo usuário)**:
     - Não há custos para transferências entre a Conta Corrente e a Conta Investimento do mesmo usuário.
   - **Transferências Externas (entre usuários)**:
     - Haverá uma taxa **taxa em percentual de 0,5%** do valor transferido para transferências entre contas de diferentes usuários. Essa taxa deve ser debitada da conta de origem.

4. **Registro de Movimentações**:
   - Todas as transferências devem ser registradas no histórico de movimentações de ambas as contas envolvidas.
   - O registro deve incluir:
     - Data e hora da transferência.
     - Valor transferido.
     - Conta de origem e conta de destino.
     - Tipo de transferência (interna ou externa).

5. **Processo de Transferência**:
   - **Passo 1**: O usuário seleciona o tipo de transferência:
     - Entre contas do próprio usuário (Conta Corrente ↔ Conta Investimento).
     - Para outro usuário (Conta Corrente → Conta Corrente).
   - **Passo 2**: O sistema solicita o valor da transferência e, no caso de transferências externas, o número da conta de destino.
   - **Passo 3**: O sistema realiza as validações necessárias (saldo, valor, pendências, existência da conta de destino).
   - **Passo 4**: Se todas as validações forem aprovadas:
     - O saldo é debitado da conta de origem.
     - O saldo é creditado na conta de destino.
     - A movimentação é registrada no histórico.
   - **Passo 5**: O sistema exibe uma mensagem de sucesso ou erro ao usuário.

---

## Transferências

### Transferências Entre Contas do Próprio Usuário
- **Objetivo**: Permitir que o usuário transfira valores entre sua Conta Corrente e Conta Investimento.
- **Regras**:
  - A transferência da **Conta Corrente** para a **Conta Investimento** só pode ser realizada se houver saldo suficiente na Conta Corrente.
  - A transferência da **Conta Investimento** para a **Conta Corrente** só pode ser realizada se:
    - Não houver operações pendentes de compra ou venda de ativos.
    - O saldo transferido não ultrapassar o saldo disponível na Conta Investimento.
  - Todas as transferências devem ser registradas no histórico de movimentações de ambas as contas.
- **Validações**:
  - Garantir que o valor transferido seja maior que zero.
  - Exibir mensagem de erro caso o saldo seja insuficiente.

---

### Transferências Entre Contas de Diferentes Usuários
- **Objetivo**: Permitir que o usuário transfira valores da sua Conta Corrente para a Conta Corrente de outro usuário.
- **Regras**:
  - Somente a **Conta Corrente** pode ser usada para transferências entre usuários.
  - A transferência só pode ser realizada se houver saldo suficiente na Conta Corrente do remetente.
  - O sistema deve validar a existência da conta de destino antes de realizar a transferência.
  - Todas as transferências devem ser registradas no histórico de movimentações de ambas as contas (remetente e destinatário).
- **Validações**:
  - Garantir que o valor transferido seja maior que zero.
  - Exibir mensagem de erro caso:
    - O saldo seja insuficiente.
    - A conta de destino não exista.
  - Exibir mensagem de sucesso após a conclusão da transferência.

---

## Operações de Compra e Venda de Ativos
- **Ativos Disponíveis para Negociação**:
  - **Ações**: Empresas fictícias com valores que flutuam dinamicamente.
  - **CDB e Tesouro Direto**: Com rentabilidade fixa (pré ou pós-fixada).
- **Regras para Compra de Ativos**:
  - O cliente deve ter saldo suficiente na Conta Investimento.
  - A compra está sujeita a:
    - **Taxa de corretagem**: Percentual fixo de 1% para ações.
- **Regras para Venda de Ativos**:
  - O valor da venda é sempre creditado na Conta Investimento.
  - O lucro ou rendimento da operação está sujeito à tributação conforme o tipo de ativo:
    - **Renda Variável (Ações)**:
      - Incide **Imposto de Renda de 15%** sobre o rendimento obtido na operação (diferença entre o valor de venda/resgate e o valor investido).
    - **Renda Fixa (CDB e Tesouro Direto)**:
      - Incide **Imposto de Renda de 22%** sobre o rendimento obtido na operação (diferença entre o valor de venda/resgate e o valor investido).
  - O sistema deve calcular e reter automaticamente o imposto devido no momento da venda ou resgate.
  - O valor líquido, já descontado o imposto, é registrado no histórico de movimentações e disponibilizado para novas operações.

---

## Simulador de Mercado
- O sistema deve simular o mercado financeiro com:
  - **Ações fictícias**: Valores flutuam ao longo do tempo com base em um algoritmo de variação (exemplo: aleatoriedade com limites).
  - **CDB e Tesouro Direto**: Rentabilidade fixa, com possibilidade de simular cenários de inflação para pós-fixados.
- Funcionalidades do simulador:
  - Visualizar o histórico de preços de ações.
  - Exibir a rentabilidade acumulada de CDB/Tesouro Direto.

---

## Relatórios
- O sistema deve permitir a geração de relatórios financeiros, incluindo:
  - **Relatório de Imposto de Renda**: Detalhando lucros e impostos pagos no ano.
  - **Extrato de Conta Corrente e Conta Investimento**: Com todas as movimentações realizadas.
  - **Resumo de Investimentos**: Mostrando a rentabilidade acumulada por ativo.

---

# Funcionalidades Extras (Opcional)

## Simulador de Mercado
- O simulador de mercado é uma funcionalidade extra, não obrigatória, mas considerada um grande diferencial para o projeto.
- O sistema pode simular o mercado financeiro com:
  - **Ações fictícias**: Valores flutuam ao longo do tempo com base em um algoritmo de variação (exemplo: aleatoriedade com limites).
  - **CDB e Tesouro Direto**: Rentabilidade fixa, com possibilidade de simular cenários de inflação para pós-fixados.
- Funcionalidades sugeridas para o simulador:
  - Visualizar o histórico de preços de ações.
  - Exibir a rentabilidade acumulada de CDB/Tesouro Direto.

## Funcionalidades Extras (Opcional)

As funcionalidades abaixo são opcionais, mas podem agregar grande valor ao projeto e serão consideradas diferenciais na avaliação:

### Notificações
- O sistema pode implementar um módulo de notificações para:
  - **Alertar o cliente sobre vencimento de CDB/Tesouro Direto**: Enviar avisos quando um investimento estiver próximo do vencimento, permitindo ao usuário se planejar para resgates ou reinvestimentos.
  - **Informar alterações significativas no preço de ações**: Notificar o usuário caso haja variações expressivas (ex: acima de 5% em um dia) no preço das ações em sua carteira, ajudando na tomada de decisão.

### Simulação de Mercado e Cenários

- O sistema deve implementar um **mercado de ativos simulado**, onde os valores das ações disponíveis no seed sofrem alterações dinâmicas e aleatórias ao longo do tempo.
- **Regras de variação dos preços das ações**:
  - Os preços das ações devem ser atualizados automaticamente a cada 5 minutos.
  - A cada atualização, o valor de cada ação deve variar de forma aleatória, podendo aumentar ou diminuir, seguindo a seguinte distribuição de probabilidade:
    - **40% dos casos**: variação entre **0,10% e 2%** (para cima ou para baixo).
    - **30% dos casos**: variação entre **2% e 3%** (para cima ou para baixo).
    - **20% dos casos**: variação entre **3% e 4%** (para cima ou para baixo).
    - **10% dos casos**: variação entre **4% e 5%** (para cima ou para baixo).
  - A direção da variação (alta ou baixa) deve ser sorteada de forma independente para cada ativo.
  - O sistema deve garantir que o valor das ações nunca seja negativo.
- **Funcionalidades da simulação**:
  - Permitir que o usuário visualize a evolução dos preços das ações em tempo real ou em intervalos definidos.
  - Oferecer uma ferramenta para simular investimentos futuros, permitindo ao usuário escolher ativos, valores e prazos para visualizar projeções de rentabilidade com base em diferentes cenários de mercado (ex: taxas de juros, inflação ou variação de preços).
  - Possibilitar a comparação entre diferentes estratégias de investimento, como renda fixa e variável, auxiliando o usuário na tomada de decisão.
- A simulação de mercado deve impactar diretamente as operações de compra e venda de ativos, exigindo que o sistema trate corretamente as variações de preço e os registros de movimentação.

### Gamificação
- O sistema pode incluir elementos de gamificação para aumentar o engajamento dos usuários, como:
  - **Badges ou conquistas**: Conceder distintivos por ações específicas, como realizar o primeiro investimento, atingir determinado lucro percentual, completar um número de operações, entre outros.
  - **Ranking ou desafios**: Criar rankings entre usuários ou propor desafios semanais/mensais para incentivar o uso contínuo da plataforma.

> **Observação:** A implementação dessas funcionalidades extras não são obrigatórias, mas será considerada um diferencial importante na avaliação do projeto.

---

## Regras para as Telas de Conta

Os participantes devem implementar as seguintes telas no frontend, considerando os dados de **usuários** e **ações** fornecidos na pasta `seeds`:

### 1. Tela de Login
- **Objetivo**: Permitir que o usuário acesse sua conta.
- **Elementos obrigatórios**:
  - Campo para **e-mail** ou **CPF**.
  - Campo para **senha**.
  - Botão de **login**.
  - Link para **recuperação de senha** (opcional).
- **Validações**:
  - Exibir mensagens de erro para campos obrigatórios não preenchidos.
  - Validar se o e-mail/CPF e senha correspondem a um usuário existente no seed.

---

### 2. Tela de Dashboard
- **Objetivo**: Exibir um resumo das contas do usuário.
- **Elementos obrigatórios**:
  - Saldo da **Conta Corrente** e **Conta Investimento**.
  - Botões para:
    - **Depositar** (redireciona para a tela de depósito).
    - **Sacar** (redireciona para a tela de saque).
    - **Transferir** (redireciona para a tela de transferência).
    - **Investir** (redireciona para a tela de compra de ativos).
  - Gráfico ou tabela com o **histórico de movimentações** (últimos 5 registros).
- **Validações**:
  - Garantir que os dados exibidos correspondam ao usuário logado.

---

### 3. Tela de Depósito
- **Objetivo**: Permitir que o usuário realize depósitos na Conta Corrente.
- **Elementos obrigatórios**:
  - Campo para inserir o **valor do depósito**.
  - Botão de **confirmar**.
  - Exibição do saldo atual da Conta Corrente.
- **Validações**:
  - O valor do depósito deve ser maior que zero.
  - Exibir mensagem de sucesso ou erro após a operação.

---

### 4. Tela de Saque
- **Objetivo**: Permitir que o usuário realize saques da Conta Corrente.
- **Elementos obrigatórios**:
  - Campo para inserir o **valor do saque**.
  - Botão de **confirmar**.
  - Exibição do saldo atual da Conta Corrente.
- **Validações**:
  - O valor do saque não pode exceder o saldo disponível.
  - Exibir mensagem de sucesso ou erro após a operação.

---

### 5. Tela de Transferência
- **Objetivo**: Permitir transferências entre contas do próprio usuário ou para contas de outros usuários.
- **Elementos obrigatórios**:
  - Campo para inserir o **valor da transferência**.
  - Campo para selecionar o **tipo de transferência**:
    - Entre contas do próprio usuário (Conta Corrente ↔ Conta Investimento).
    - Para outro usuário (Conta Corrente → Conta Corrente).
  - Campo para inserir o **número da conta de destino** (apenas para transferências entre usuários).
  - Botão de **confirmar**.
  - Exibição dos saldos das contas envolvidas.
- **Validações**:
  - O valor da transferência não pode exceder o saldo da conta de origem.
  - Exibir mensagem de erro caso a conta de destino não exista (para transferências entre usuários).
  - Exibir mensagem de sucesso ou erro após a operação.

---

### 6. Tela de Compra de Ativos
- **Objetivo**: Permitir que o usuário compre ativos utilizando o saldo da Conta Investimento.
- **Elementos obrigatórios**:
  - Lista de **ativos disponíveis** (dados do seed).
  - Campo para inserir o **quantitativo de ativos** a ser comprado.
  - Botão de **confirmar compra**.
  - Exibição do saldo atual da Conta Investimento.
- **Validações**:
  - O valor total da compra não pode exceder o saldo disponível.
  - Exibir mensagem de sucesso ou erro após a operação.

---

### 7. Tela de Relatórios
- **Objetivo**: Exibir relatórios financeiros detalhados.
- **Elementos obrigatórios**:
  - Botões para gerar:
    - **Relatório de Imposto de Renda**.
    - **Extrato de Conta Corrente**.
    - **Resumo de Investimentos**.
  - Exibição de gráficos ou tabelas com os dados gerados.
- **Validações**:
  - Garantir que os relatórios sejam gerados com base nos dados do usuário logado.

---

### Considerações Gerais
- **Design Responsivo**: As telas devem ser responsivas e funcionar bem em dispositivos móveis e desktops.
- **Consistência Visual**: Utilize um design consistente para botões, fontes e cores.
- **Mensagens de Erro/Sucesso**: Sempre exiba mensagens claras para o usuário após cada ação.
- **Dados do Seed**: Certifique-se de que as telas utilizem os dados fornecidos na pasta `seeds` para simular as operações.

Essas regras garantem que os participantes tenham um guia claro para implementar as telas, cobrindo tanto o backend quanto o frontend.## Regras para as Telas de Conta

Os participantes devem implementar as seguintes telas no frontend, considerando os dados de **usuários** e **ações** fornecidos na pasta `seeds`:

### 1. Tela de Login
- **Objetivo**: Permitir que o usuário acesse sua conta.
- **Elementos obrigatórios**:
  - Campo para **e-mail** ou **CPF**.
  - Campo para **senha**.
  - Botão de **login**.
  - Link para **recuperação de senha** (opcional).
- **Validações**:
  - Exibir mensagens de erro para campos obrigatórios não preenchidos.
  - Validar se o e-mail/CPF e senha correspondem a um usuário existente no seed.

---

### 2. Tela de Dashboard
- **Objetivo**: Exibir um resumo das contas do usuário.
- **Elementos obrigatórios**:
  - Saldo da **Conta Corrente** e **Conta Investimento**.
  - Botões para:
    - **Depositar** (redireciona para a tela de depósito).
    - **Sacar** (redireciona para a tela de saque).
    - **Transferir** (redireciona para a tela de transferência).
    - **Investir** (redireciona para a tela de compra de ativos).
  - Gráfico ou tabela com o **histórico de movimentações** (últimos 5 registros).
- **Validações**:
  - Garantir que os dados exibidos correspondam ao usuário logado.

---

### 3. Tela de Depósito
- **Objetivo**: Permitir que o usuário realize depósitos na Conta Corrente.
- **Elementos obrigatórios**:
  - Campo para inserir o **valor do depósito**.
  - Botão de **confirmar**.
  - Exibição do saldo atual da Conta Corrente.
- **Validações**:
  - O valor do depósito deve ser maior que zero.
  - Exibir mensagem de sucesso ou erro após a operação.

---

### 4. Tela de Saque
- **Objetivo**: Permitir que o usuário realize saques da Conta Corrente.
- **Elementos obrigatórios**:
  - Campo para inserir o **valor do saque**.
  - Botão de **confirmar**.
  - Exibição do saldo atual da Conta Corrente.
- **Validações**:
  - O valor do saque não pode exceder o saldo disponível.
  - Exibir mensagem de sucesso ou erro após a operação.

---

### 5. Tela de Transferência
- **Objetivo**: Permitir transferências entre contas do mesmo usuário.
- **Elementos obrigatórios**:
  - Campo para inserir o **valor da transferência**.
  - Botão de **confirmar**.
  - Exibição dos saldos das contas (Conta Corrente e Conta Investimento).
- **Validações**:
  - O valor da transferência não pode exceder o saldo da conta de origem.
  - Exibir mensagem de sucesso ou erro após a operação.

---

### 6. Tela de Compra de Ativos
- **Objetivo**: Permitir que o usuário compre ativos utilizando o saldo da Conta Investimento.
- **Elementos obrigatórios**:
  - Lista de **ativos disponíveis** (dados do seed).
  - Campo para inserir o **quantitativo de ativos** a ser comprado.
  - Botão de **confirmar compra**.
  - Exibição do saldo atual da Conta Investimento.
- **Validações**:
  - O valor total da compra não pode exceder o saldo disponível.
  - Exibir mensagem de sucesso ou erro após a operação.

---

### 7. Tela de Relatórios
- **Objetivo**: Exibir relatórios financeiros detalhados.
- **Elementos obrigatórios**:
  - Botões para gerar:
    - **Relatório de Imposto de Renda**.
    - **Extrato de Conta Corrente**.
    - **Resumo de Investimentos**.
  - Exibição de gráficos ou tabelas com os dados gerados.
- **Validações**:
  - Garantir que os relatórios sejam gerados com base nos dados do usuário logado.

---

### Considerações Gerais
- **Design Responsivo**: As telas devem ser responsivas e funcionar bem em dispositivos móveis e desktops.
- **Consistência Visual**: Utilize um design consistente para botões, fontes e cores.
- **Mensagens de Erro/Sucesso**: Sempre exiba mensagens claras para o usuário após cada ação.
- **Dados do Seed**: Certifique-se de que as telas utilizem os dados fornecidos na pasta `seeds` para simular as operações.

Essas regras garantem que os participantes tenham um guia claro para implementar as telas, cobrindo tanto o backend quanto o frontend.