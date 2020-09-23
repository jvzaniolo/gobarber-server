# Recuperação de Senha

**RF**

* [x] O usuário deve poder recuperar sua senha informando um email
* [ ] O usuário deve receber um email com instruções de recuperação de senha
* [ ] O usuário deve poder alterar sua senha

**RNF**

- Utilizar `MailTrap` para testar envios em ambiente de desenvolvimento
- Utilizar `Amazon SES` para envios de email em produção
- O envio de emails deve acontecer em segundo plano (background job)

**RN**

- O link enviado por email deve expirar em 2h
- O usuário precisa confirmar a nova senha para alterar a senha antiga


# Atualização do Perfil

**RF**

* [ ] O usuário deve poder atualizar seu nome, email e senha

**RN**

- O usuário não pode alterar seu email por um email já cadastrado
- O usuário deve informar a senha antiga ao atualizar a senha
- O usuário deve confirmar a nova senha para atualizar a senha antiga

# Painel do Prestador

**RF**

* [ ] O usuário deve poder listar seus agendamentos de um dia específico
* [ ] O prestador deve receber uma notificação sempre que houver um novo agendamento
* [ ] O prestador deve poder realizar as notificações não lidas

**RNF**

- Os agendamentos do dia devem ser armazenados em cache
- As notificações devem ser armazenadas no `MongoDB`
- As notificações devem ser enviadas em tempo-real utilizando `Socket.io`

**RN**

- A notificação deve ter status de `lida` ou `não lida` para controle

# Agendamento de Serviços

**RF**

* [ ] O usuário deve poder listar todos os barbeiros cadastrados
* [ ] O usuário deve poder listar os dias disponíveis de um funcionário específico
* [ ] O usuário deve poder listar os horários disponíveis de um funcionário específico
* [ ] O usuário deve poder agendar um horário com um barbeiro

**RNF**

- A listagem de prestadores deve ser armazenada em cache

**RN**

- Cada agendamento deve durar 1h
- Os agendamentos devem acontecer entre 8h até 18h ( primeiro: 8h, último: 19h )
- O usuário não pode agendar um horário que já foi marcado
- O usuário não pode agendar um horário no passado
- O usuário não pode agendar um horário consigo mesmo
