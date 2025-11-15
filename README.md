# SkillfyBank Microservices Platform

A containerized microservices-based core banking platform demonstrating DevOps practices with Docker, Docker Swarm, Kubernetes, and Istio.

## Project Structure
skillfybank-microservices/
├── account-service/ # Node.js - Account management
├── transaction-service/ # Node.js - Transaction processing
├── notification-service/ # Node.js - Notification service
├── k8s/ # Kubernetes manifests
│ ├── account-service/
│ ├── transaction-service/
│ ├── notification-service/
│ ├── configmap.yaml
│ ├── secret.yaml
│ └── pv-account.yaml
├── docker-compose.yml # Docker Compose configuration
├── docker-stack.yml # Docker Swarm stack
└── README.md


## Services

### Account Service (Node.js)
- Port: 3000
- Endpoints: `/health`, `/accounts`, `/accounts/:id`
- Manages customer accounts and balances

### Transaction Service (Node.js) 
- Port: 8080
- Endpoints: `/health`, `/transactions`, `/transactions/:id`
- Handles financial transactions between accounts

### Notification Service (Node.js)
- Port: 5000
- Endpoints: `/health`, `/notifications`, `/notifications/simulate`
- Sends notifications to customers

## Assignment Progress

### ✅ Part 1: Docker Containerization - COMPLETED
- Multi-stage Docker builds for optimized images
- Docker networking for inter-service communication
- Port mapping for external access
- Images pushed to DockerHub: `uttamkamar/account-service`, `uttamkamar/transaction-service`, `uttamkamar/notification-service`

### ✅ Part 2: Docker Swarm Orchestration - CONCEPTS DEMONSTRATED
- Docker Swarm initialized and configured
- Overlay network created for service communication
- Stack files created for service deployment
- *Note: Multi-replica deployment limited by local resource constraints*

### ✅ Part 3: Kubernetes Deployment - COMPLETED
- Kubernetes cluster setup with Docker Desktop
- ConfigMaps and Secrets for configuration management
- Persistent Volume for Account Service data
- Horizontal Pod Autoscaler for Transaction Service
- Service types:
  - Account Service: NodePort (port 30001)
  - Transaction Service: ClusterIP (internal)
  - Notification Service: LoadBalancer
- All services running with health checks and resource limits


## Quick Start

### Docker Compose
\`\`\`bash
docker-compose up -d
\`\`\`

### Kubernetes
\`\`\`bash
# Apply all Kubernetes manifests
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/secret.yaml
kubectl apply -f k8s/pv-account.yaml
kubectl apply -f k8s/account-service/deployment.yaml
kubectl apply -f k8s/transaction-service/deployment.yaml
kubectl apply -f k8s/notification-service/deployment.yaml
\`\`\`

## Access Services

- Account Service: http://localhost:30001/health
- Notification Service: http://localhost:5000/health (after port-forward)
- Transaction Service: Internal only (ClusterIP)

## Technologies Used

- Docker, Docker Swarm, Kubernetes
- Node.js, Express.js
- Istio (for service mesh)
- Horizontal Pod Autoscaler
- Persistent Volumes
- ConfigMaps and Secrets
"@ | Out-File -FilePath "README.md" -Encoding utf8