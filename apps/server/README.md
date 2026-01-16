# Gymter Server

A TypeScript server implementing hexagonal architecture with both tRPC and REST API support.

## Features

- **Hexagonal Architecture**: Clean separation of concerns with Domain, Application, Infrastructure, and Presentation layers
- **Dual API Support**: Both tRPC (type-safe RPC) and REST API endpoints
- **Fastify**: High-performance web framework
- **Prisma**: Type-safe database ORM with PostgreSQL
- **TypeScript**: Full type safety across the stack

## Getting Started

### Prerequisites

- Node.js >= 20
- PostgreSQL database
- pnpm (package manager)

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env

# Generate Prisma client (from database package)
pnpm --filter database db:generate

# Run database migrations
pnpm --filter database db:migrate
```

### Development

```bash
# Start development server
pnpm dev
```

The server will start on `http://localhost:3000`:
- tRPC endpoint: `http://localhost:3000/trpc`
- REST API endpoint: `http://localhost:3000/api`

## Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed documentation on the hexagonal architecture implementation.

### Quick Overview

```
src/core/
├── domain/          # Business entities & value objects (pure logic)
├── application/     # Use cases & port interfaces
├── infrastructure/  # Database adapters & external services
└── presentation/    # HTTP adapters (tRPC & REST)
```

## API Examples

### REST API

#### Create User
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "id": "user-123",
    "name": "John Doe",
    "email": "john@example.com",
    "emailVerified": false
  }'
```

#### Get User by Email
```bash
curl http://localhost:3000/api/users/email/john@example.com
```

#### Get User by ID
```bash
curl http://localhost:3000/api/users/user-123
```

### tRPC API

tRPC endpoints are type-safe and designed to be consumed by TypeScript clients:

```typescript
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import type { AppRouter } from './trpc'

const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
    }),
  ],
})

// Create user
const user = await client.user.create.mutate({
  id: 'user-123',
  name: 'John Doe',
  email: 'john@example.com'
})

// Get user by email
const foundUser = await client.user.getByEmail.query('john@example.com')

// Get user by ID
const userById = await client.user.getById.query('user-123')
```

## Project Structure

```
apps/server/
├── src/
│   ├── core/                      # Hexagonal architecture layers
│   │   ├── domain/               # Domain entities
│   │   │   ├── user/
│   │   │   │   └── user.entity.ts
│   │   │   └── shared/
│   │   │       ├── entity.ts
│   │   │       └── value-objects/
│   │   │           └── email.ts
│   │   │
│   │   ├── application/          # Use cases & ports
│   │   │   ├── user/
│   │   │   │   ├── dtos/
│   │   │   │   └── use-cases/
│   │   │   └── ports/
│   │   │       └── user-repository.port.ts
│   │   │
│   │   ├── infrastructure/       # Adapters implementation
│   │   │   ├── di/
│   │   │   │   └── container.ts
│   │   │   ├── persistence/
│   │   │   │   └── user-repository.prisma.ts
│   │   │   └── prisma/
│   │   │       └── prisma.service.ts
│   │   │
│   │   └── presentation/         # HTTP adapters
│   │       ├── trpc/
│   │       │   └── user.router.ts
│   │       └── rest/
│   │           └── user.routes.ts
│   │
│   ├── trpc/                     # tRPC configuration
│   │   ├── context.ts
│   │   ├── trpc.ts
│   │   └── routers/
│   │       └── index.ts
│   │
│   ├── fastify/                  # Fastify server setup
│   │   └── index.ts
│   │
│   ├── config/                   # Configuration
│   │   └── env.ts
│   │
│   └── server.ts                 # Entry point
│
├── ARCHITECTURE.md               # Architecture documentation
├── README.md                     # This file
└── package.json
```

## Adding New Features

To add a new entity (e.g., Exercise):

1. **Domain Layer**: Create entity
   ```typescript
   // src/core/domain/exercise/exercise.entity.ts
   export class Exercise extends Entity<number> { ... }
   ```

2. **Application Layer**: Create use cases and port
   ```typescript
   // src/core/application/ports/exercise-repository.port.ts
   export interface IExerciseRepository { ... }

   // src/core/application/exercise/use-cases/create-exercise.use-case.ts
   export class CreateExerciseUseCase { ... }
   ```

3. **Infrastructure Layer**: Implement repository
   ```typescript
   // src/core/infrastructure/persistence/exercise-repository.prisma.ts
   export class ExerciseRepositoryPrisma implements IExerciseRepository { ... }
   ```

4. **Presentation Layer**: Create adapters
   ```typescript
   // src/core/presentation/trpc/exercise.router.ts
   export const createExerciseTrpcRouter = (repo: IExerciseRepository) => { ... }

   // src/core/presentation/rest/exercise.routes.ts
   export const createExerciseRestRoutes = (repo: IExerciseRepository) => { ... }
   ```

5. **Register in DI Container**: Update container
   ```typescript
   // src/core/infrastructure/di/container.ts
   private _exerciseRepository: IExerciseRepository

   constructor() {
     this._exerciseRepository = new ExerciseRepositoryPrisma(this._prismaClient)
   }

   get exerciseRepository(): IExerciseRepository {
     return this._exerciseRepository
   }
   ```

6. **Register Routes**: Update routers and server

## Scripts

- `pnpm dev` - Start development server with hot reload
- `pnpm lint` - Run ESLint
- `pnpm prettier` - Format code with Prettier

## Testing

```bash
# Install dependencies
pnpm install

# Start server
pnpm dev

# In another terminal, test the APIs
curl http://localhost:3000/api/users/email/test@example.com
```

## Benefits of This Architecture

1. **Independent Business Logic**: Core domain logic has no framework dependencies
2. **Testability**: Each layer can be tested in isolation
3. **Flexibility**: Easy to swap implementations (database, APIs)
4. **Maintainability**: Clear separation of concerns
5. **Scalability**: Can support multiple interfaces (tRPC, REST, GraphQL, etc.)

## Learn More

- [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/)
- [tRPC Documentation](https://trpc.io/)
- [Fastify Documentation](https://fastify.dev/)
- [Prisma Documentation](https://www.prisma.io/docs)
