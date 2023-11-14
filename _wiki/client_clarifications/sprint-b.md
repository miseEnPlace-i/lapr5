# Client Clarifications

This document is a collection of clarifications for the first sprint. The doubts are synthesized for easier reading.

---

## [Question 1](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=25544)

### US130 - Como administrador do sistema pretendo fazer upload do mapa do campus considerando edifícios e ligações interiores entre os mesmos para ser utilizado pelos robots

> Esta informação é suposto ser carregada onde? Os edificios devem ter alguma localização no mapa?

### Answer

"trata-se de um lapso na tabela. esse requisito não deve ser considerado, mas sim o requisito 1120"

## [Question 2](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=25545)

### US535 - Como utilizador pretendo um menu que me permita aceder às funcionalidades de cada módulo

> O que é pretendido que aconteça?

### Answer

"a aplicação web a desenvolver deve ter um menu de opções que permitir aceder às várias funcionaldiades identificadas nos requisitos, ex:

gestão de campus

- adicionar edificio
- adicionar piso
- ...

gestão de frota

- adicionar robot
- ...

gestão e planeamento de tarefas

- obter percurso entre edificios
- ...
- análise de complexidade

Visualização 3D

- visualização interactiva
- animação de percurso
- ...

Administração de sistemas

- MBCO
- Estratégia de recuperaçãod e dados
- ...

Informação

- acerca de nós
- Relatório RGPD
- Politica de privacidade
- ..."

## [Question 3](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=25692)

### US1120 - Como administrador do sistema pretendo fazer upload do mapa do campus considerando edifícios e ligações interiores entre os mesmos para ser utilizado pelos robots

> Que permissões os utilizadores registados no sistema devem ter para esta pasta?

### Answer

"Há liberdade para escolheram as permissões a atribuir na pasta pública. Recomendo contudo que seja apenas de leitura (excluindo os administradores) para poder no futuro incluir documentos (instruções, etc.) que se tornem necessárias."

## [Question 4](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=25657)

### US300

> Hi, one elevator in one building involved some different floors or the concept of elevator is the space that occupe in a floor. I mean, should the atribute floor_ID be an array string because many floors belong to an elevator?

### Answer

"Please note that the question is phrased in a way that a typical customer would not understand it as it points towards technical questions and not requirements.

From a requirements perspective, an elevator serves several floors of a building. typically it will serve all floors of the building but that might not be the case for all elevators."

## [Question 5](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=25821)

### US640

> Could you clarify the user story 640: ''As the system administrator I want the deployment of one of the RFP modules on a DEI VM to be systematic, validating in a scheduled manner with the test plan. '' (Como administrador do sistemaquero que o deployment de um dos módulos do RFP numa VM do DEI sejasistemático, validando de forma agendada com o plano de testes)

> Should I write request for proposal of one of the ‘modules’of RoboDroneGo project or some of our virtual machine? What is the meaning module?

### Answer

"You should implement a way of automatically deploying one of the RFP modules on a DEI VM (to which you have access, regardless of whether it is VCenter3 or the DEI private cloud), taking into account the remaining part of the US: should the deployment take place every day or only when there are changes to the module? Was the deployment successful?
By "module" you should understand as any other component of LAPR5, connected to ALGAV, ARQSI, SGRAI."

## [Question 6](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=25575)

### US800/810

> Neste contexto, pretende-se que o sistema esteja operacional o máximo de tempo possível.

> Sendo assim, é aceite algum período de indisponibidade? Se sim, de quanto tempo? O sistema deverá apresentar funcionalidades parciais durante este período?

> Além disso, existe algum máximo de tempo que o sistema, após interromper/paralisar os serviços, deverá voltar a recuperar os dados?

### Answer

"Como descrito na US800 "quero que seja definido o MBCO (Minimum Business Continuity Objective) a propor aos stakeholders" o que implica que terá que definir as funcionalidades que lhe parecem mais importantes que sejam mantidas em caso de desastre.
As cópias de segurança (US810) são necessárias e podem implicar a inoperacionalidade da solução. A estratégia implementada nas cópias têm implicação no RPO e no WRT, pelo que terá de definir a mais apropriada.
Sim, é aceite algum tempo de indisponibilidade mas que terá de ser justificado e, claro, o menor possível."

## [Question 7](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=25575)

### US800/810

> Pode indicar-nos qual a escala horária estabelecida para efeitos de utilização do sistema? É espectável que, para efeitos de backup, haja uma breve interrupção do serviço, no entanto, poderemos recorrer a qualquer período do dia para este efeito.

> Neste sentido, gostávamos de saber qual a altura mais favorável do dia para esta breve interrupção.

### Answer

"Atendendo aos termos e exemplo do RFP, quer o robisep quer o droneisep podem executar tarefas que não pressupõem ocupação humana (vigilância, limpeza, por exemplo). Já outras tarefas (buscar/entregar um item, por exemplo) pressupõem ocupação humana.
Deverá definir face ao tempo estimado de indisponibilidade do sistema a melhor altura para a breve interrupção face às funções planeadas para os dispositivos.
Em suma, é aceitável uma breve interrupção de serviço mas a altura da indisponibilidade deverá ser proposta por quem responde ao RFP."

## [Question 8](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=25881)

### US650

> Relativamente à US650, onde refere que pretende que apenas os clientes da rede interna do DEI (cabo ou VPN) acedam, tem já alguma gama de IP's pré-definida, ou devemos extrapolar?

### Answer

"Sempre que nos ligamos à rede interna do DEI (cabo ou VPN) obtemos um endereço atribuído dinamicamente por DHCP. A gama de endereços IP são todos esses.
Duvido que tenha noção da gama completa, pelo que recomendo que para prova de conceito possa alterar o(s) endereço(s) a partir de um ficheiro de texto."

## [Question 9](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=25889)

### 1120 - Carregar mapa de piso

> Sendo que este requisito corresponde a us 230 do sprintA, as observações de cada um dos requisitos não são correspondentes:

- us230 : PATCH

- us1120 : PUT/PATCH

> Deste modo, agradecia que esclarece-se esta discordância entre os dois requisitos

### Answer

N/A

## [Question 10](https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=25892)

### US1110

> No desenho da ui para a edição de um piso eu gostaria de saber se o cliente preferia selecionar o piso que pretende editar a partir de uma tabela com todos os edifícios criados na base de dados ou se preferia introduzir o numero do piso e o código do edifício a que o piso pertence para encontrar o piso que pretende editar e assim modificar os seus atributos.

---

_LAST UPDATE: 11/11/2023 13:45H_