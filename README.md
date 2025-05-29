# TaskMaster - Microservices Project

A microservices-based task management system built with Node.js, MongoDB, and Kubernetes.

## Architecture

The system consists of the following microservices:
- **Orchestrator Service**: Central service that routes requests to appropriate services
- **Authentication Service**: Handles user authentication and JWT token generation
- **User Service**: Manages user accounts and profiles
- **Task Service**: Handles task creation, updates, and management

## Prerequisites

- Docker
- Docker Compose
- Minikube
- kubectl
- Node.js (v14 or higher)
- npm

## Setup Instructions

1. **Start Minikube**:
   ```bash
   minikube start
   ```

2. **Build Docker Images**:
   ```bash
   # Build auth service
   docker build -t auth-service:latest ./auth-service

   # Build user service
   docker build -t user-service:latest ./user-service

   # Build task service
   docker build -t task-service:latest ./task-service

   # Build orchestrator
   docker build -t orchestrator:latest ./orchestrator
   ```

3. **Load Images into Minikube**:
   ```bash
   minikube image load auth-service:latest
   minikube image load user-service:latest
   minikube image load task-service:latest
   minikube image load orchestrator:latest
   ```

4. **Apply Kubernetes Configurations**:
   ```bash
   kubectl apply -f k8s/mongodb-deployment.yaml
   kubectl apply -f k8s/secrets.yaml
   kubectl apply -f k8s/auth-service-deployment.yaml
   kubectl apply -f k8s/user-service-deployment.yaml
   kubectl apply -f k8s/task-service-deployment.yaml
   kubectl apply -f k8s/orchestrator-deployment.yaml
   ```

5. **Get Orchestrator Service URL**:
   ```bash
   minikube service orchestrator --url
   ```

## Testing the Application

1. **Create a User**:
   ```bash
   curl -X POST http://<orchestrator-url>/users \
     -H "Content-Type: application/json" \
     -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
   ```

2. **Login**:
   ```bash
   curl -X POST http://<orchestrator-url>/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123"}'
   ```

3. **Create a Task** (replace <token> with the JWT token from login):
   ```bash
   curl -X POST http://<orchestrator-url>/tasks \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer <token>" \
     -d '{"title":"Test Task","description":"This is a test task","dueDate":"2024-12-31"}'
   ```

4. **List Tasks**:
   ```bash
   curl -X GET http://<orchestrator-url>/tasks \
     -H "Authorization: Bearer <token>"
   ```

## Development

To run the services locally using Docker Compose:

```bash
docker-compose up --build
```

## API Documentation

### Authentication Service
- POST /auth/login - Authenticate user and get JWT token

### User Service
- POST /users - Create new user
- GET /users - List all users
- GET /users/:id - Get user by ID
- PUT /users/:id - Update user
- DELETE /users/:id - Delete user

### Task Service
- POST /tasks - Create new task
- GET /tasks - List user's tasks
- GET /tasks/:id - Get task by ID
- PUT /tasks/:id - Update task
- DELETE /tasks/:id - Delete task

## Monitoring

To view logs for a specific service:
```bash
kubectl logs -f deployment/<service-name>
```

To view service status:
```bash
kubectl get pods
kubectl get services
``` 