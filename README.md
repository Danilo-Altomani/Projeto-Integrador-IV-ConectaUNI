# ConectaUNI - Backend (Spring Boot)

## Perfis
- `dev` (padrão): banco H2 em memória, SMTP desabilitado (logs), usado para apresentação/teses.
- `prod`: configura MySQL e SMTP reais. Ajuste `src/main/resources/application-prod.properties`.

## Rodando
- Java 17+, Maven 3.8+
- Rodar em dev (padrão): `mvn spring-boot:run`
- Rodar em prod: `mvn spring-boot:run -Dspring-boot.run.profiles=prod`

## Endpoints principais
- `POST /auth/register` body: `{ email, password, fullName, role }`
- `POST /auth/login` body: `{ email, password }`
- `GET/POST/PUT/DELETE /events`
- `POST /invites/create?eventId=...&email=...` header `X-Base-Url` opcional
- `GET /invites/{token}`
- `POST /invites/{token}/rsvp?status=SIM|NAO|TALVEZ`
- `GET /events/{id}/cost-per-person`
- `GET /calendar/{eventId}/ics`

## Observações
- Por requisito do RNF002 usa SHA-256 + salt para senhas (recomenda-se BCrypt em produção).
- Em `dev` o banco é H2 e será criado automaticamente.


## MySQL (produção)
Para usar MySQL em produção:

1. Crie o banco e execute `db/schema.sql` (ou deixe o Spring executar `src/main/resources/schema.sql`).
2. Configure `src/main/resources/application-prod.properties` com as credenciais.
3. Rode: `mvn spring-boot:run -Dspring-boot.run.profiles=prod`

O projeto inclui `src/main/resources/schema.sql` e `db/schema.sql`.
