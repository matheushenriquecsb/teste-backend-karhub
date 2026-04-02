
---

## Arquitetura

* **Domain** → regras de negócio
* **Application** → casos de uso
* **Presentation** → camada HTTP (controllers e dtos)
* **Infrastructure** → banco de dados 

---

## Tecnologias

* Node.js
* NestJS
* TypeScript  
* TypeORM
* PostgreSQL
* Docker

---

## Como rodar o projeto

### 1. Clonar o repositório

```bash
git clone <repo-url>
cd parts-api
```

---

### 2. Subir o banco de dados com Docker

```bash
docker-compose up -d
```

---

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz e insira as variáveis de ambiente abaixo:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=parts_db
```

---

### 4. Instalar dependências

```bash
npm install
```

---

### 5. Rodar a aplicação

```bash
npm run start:dev
```

---

## Rodar testes

```bash
npm run test
```

---

## Exemplos de requisição (Endpoints)

---

### Criar peça

```http
POST http://localhost:3000/parts
```

```json
Body

{
  "name": "Filtro de Óleo X",
  "category": "engine",
  "currentStock": 15,
  "minimumStock": 20,
  "averageDailySales": 4,
  "leadTimeDays": 5,
  "unitCost": 18.5,
  "criticalityLevel": 3
}
```

---

### Listar peças

```http
GET http://localhost:3000/parts
```

---

### Buscar por categoria

```http
GET http://localhost:3000/parts?category=engine
```
---

### Atualizar peça

```http
PUT http://localhost:3000/parts/:id
```


```json
Body

{
  "name": "Filtro de Óleo X",
  "category": "engine",
  "currentStock": 15,
  "minimumStock": 20,
  "averageDailySales": 4,
  "leadTimeDays": 5,
  "unitCost": 18.5,
  "criticalityLevel": 3
}
``` 

---

### Remover peça

```http
DELETE http://localhost:3000/parts/:id
```

---

### Listar prioridades de reposição

```http
GET http://localhost:3000/restock/priorities
```

---
 