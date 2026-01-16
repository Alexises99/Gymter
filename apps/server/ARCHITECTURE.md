# Hexagonal Architecture (Ports and Adapters)

This server implements a hexagonal architecture pattern to separate business logic from technical implementation details.

## Project Structure

```
src/
├── core/                           # Core business logic
│   ├── domain/                     # Domain layer (entities, value objects)
│   │   ├── user/
│   │   │   └── user.entity.ts
│   │   └── shared/
│   │       ├── entity.ts
│   │       └── value-objects/
│   │           └── email.ts
│   │
│   ├── application/                # Application layer (use cases, ports)
│   │   ├── user/
│   │   │   ├── dtos/
│   │   │   │   ├── create-user.dto.ts
│   │   │   │   └── user-response.dto.ts
│   │   │   └── use-cases/
│   │   │       ├── create-user.use-case.ts
│   │   │       ├── get-user-by-email.use-case.ts
│   │   │       └── get-user-by-id.use-case.ts
│   │   └── ports/
│   │       └── user-repository.port.ts
│   │
│   ├── infrastructure/             # Infrastructure layer (adapters)
│   │   ├── di/
│   │   │   └── container.ts
│   │   ├── persistence/
│   │   │   └── user-repository.prisma.ts
│   │   └── prisma/
│   │       └── prisma.service.ts
│   │
│   └── presentation/               # Presentation layer (HTTP adapters)
│       ├── trpc/
│       │   └── user.router.ts
│       └── rest/
│           └── user.routes.ts
│
├── trpc/                           # tRPC configuration
│   ├── context.ts
│   ├── trpc.ts
│   ├── index.ts
│   └── routers/
│       └── index.ts
│
├── fastify/                        # Fastify server setup
│   └── index.ts
│
└── server.ts                       # Entry point
```

## Architecture Layers

### 1. Domain Layer (Core Business Logic)
**Location**: `src/core/domain/`

- **Entities**: Core business objects with identity (e.g., User)
- **Value Objects**: Immutable objects without identity (e.g., Email)
- **Business Rules**: Pure business logic, no external dependencies
- **Principles**:
  - No dependencies on external frameworks or libraries
  - Contains only pure TypeScript/JavaScript
  - Domain logic is completely isolated

**Example**: [user.entity.ts](src/core/domain/user/user.entity.ts)

### 2. Application Layer (Use Cases)
**Location**: `src/core/application/`

- **Use Cases**: Application-specific business rules and workflows
- **Ports (Interfaces)**: Abstract contracts for external dependencies
- **DTOs**: Data Transfer Objects for input/output
- **Principles**:
  - Orchestrates domain entities
  - Depends only on domain layer and port interfaces
  - Independent of technical implementation

**Example**: [create-user.use-case.ts](src/core/application/user/use-cases/create-user.use-case.ts)

### 3. Infrastructure Layer (Adapters)
**Location**: `src/core/infrastructure/`

- **Repository Implementations**: Database access (Prisma)
- **External Services**: Third-party integrations
- **Dependency Injection**: Container for managing dependencies
- **Principles**:
  - Implements port interfaces from application layer
  - Contains all technical details
  - Can be easily replaced or mocked

**Example**: [user-repository.prisma.ts](src/core/infrastructure/persistence/user-repository.prisma.ts)

### 4. Presentation Layer (HTTP Adapters)
**Location**: `src/core/presentation/`

- **tRPC Routers**: Type-safe RPC endpoints
- **REST Routes**: Traditional REST API endpoints
- **Principles**:
  - Both adapters use the same use cases
  - No business logic in routes
  - Only handle HTTP concerns (request/response)

**Examples**:
- [user.router.ts](src/core/presentation/trpc/user.router.ts) (tRPC)
- [user.routes.ts](src/core/presentation/rest/user.routes.ts) (REST)

## Benefits of This Architecture

1. **Testability**: Business logic can be tested without HTTP or database
2. **Maintainability**: Clear separation of concerns
3. **Flexibility**: Easy to swap implementations (e.g., change database)
4. **Independence**: Core business logic doesn't depend on frameworks
5. **Multiple Interfaces**: Same logic exposed via tRPC and REST

## API Endpoints

### tRPC Endpoints
Base URL: `http://localhost:3000/trpc`

- `user.create` - Create a new user
- `user.getByEmail` - Get user by email
- `user.getById` - Get user by ID

### REST Endpoints
Base URL: `http://localhost:3000/api`

- `POST /users` - Create a new user
- `GET /users/email/:email` - Get user by email
- `GET /users/:id` - Get user by ID

## Adding New Features

To add a new domain entity (e.g., Exercise):

1. **Domain**: Create entity in `src/core/domain/exercise/`
2. **Application**:
   - Create port interface in `src/core/application/ports/`
   - Create use cases in `src/core/application/exercise/use-cases/`
3. **Infrastructure**:
   - Create repository implementation in `src/core/infrastructure/persistence/`
   - Register in DI container
4. **Presentation**:
   - Create tRPC router in `src/core/presentation/trpc/`
   - Create REST routes in `src/core/presentation/rest/`
   - Register both in server setup

## Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# The server will start on http://localhost:3000
# - tRPC: http://localhost:3000/trpc
# - REST API: http://localhost:3000/api
```

## Testing Examples

### Using REST API

```bash
# Create user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "id": "user-123",
    "name": "John Doe",
    "email": "john@example.com"
  }'

# Get user by email
curl http://localhost:3000/api/users/email/john@example.com

# Get user by ID
curl http://localhost:3000/api/users/user-123
```

### Using tRPC

tRPC endpoints are type-safe and should be called from the frontend using the tRPC client.
