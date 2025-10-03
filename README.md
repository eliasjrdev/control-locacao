# ATUALIZAÇÃO

Para resolver este desafio eu precisaria usar uma ferramenta adequada de back-end para construir as APIS que trariam os dados do meu banco para o fron-tend, uma ferramenta adequada para fazer o front-end e obviamente uma banco de dados. Por conta de uma maior facilidade que já tenho com JavaScript escolhi o NextJs que já me ofereceria tanto o React quanto o Node.js numa mesma ferramenta. E para o banco de dados, utlizei o ORM Prisma que é ideal para JS. Também utilei o TailwindCss para fazer estilizações básicas. 

# Estrutura Principal
![Logo do projeto](public/Captura%20de%20Tela%20(247).png)




---------------------------------------------------------------------------------------

# Avaliação Estagio

## Título – Sistema de Locação de Filmes ou Jogos
### Problema:
Uma locadora precisa de um sistema para controlar o cadastro de clientes, catálogo de filmes/jogos e o processo de locação.
Requisitos Funcionais:

### CRUD Completo para:

Clientes: Nome, CPF, telefone, e-mail.
Itens (Filmes/Jogos): Título, categoria (ação, comédia, RPG, etc.), ano de lançamento, classificação etária, quantidade de cópias totais na locadora.
Locações: Cliente, item, data da locação, data prevista de devolução, status (Alugada, Devolvida, Atrasada).

### Regras de Validação:

Um cliente só pode ter até 3 locações ativas ao mesmo tempo.

A data prevista de devolução deve ser no máximo 7 dias após a retirada.

Não é possível alugar um item sem cópias disponíveis.

### Mensagens de Feedback:

"O cliente [Nome] já possui 3 locações ativas."

"O item [Título] não possui cópias disponíveis."

"Locação registrada com sucesso para [Nome]."

## Banco de dados: 
Utilizar um banco de dados para implementar o seguinte diagrama de entidade e relacionamentos:
