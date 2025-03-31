# Key-Value Cache Service

## Overview

This project implements an **in-memory Key-Value Cache service** with the following operations:
- **PUT (key, value):** Inserts or updates a key-value pair.
- **GET (key):** Retrieves the value for a given key.

The service is packaged as a Docker image and listens on port `7171`. It is designed to handle high loads efficiently while adhering to memory constraints. The cache uses an **LRU (Least Recently Used)** eviction strategy to prevent memory overflow.

---

## Features

1. **API Endpoints**:
   - **PUT Operation**:
     - HTTP Method: `POST`
     - Endpoint: `/put`
     - Request Body: JSON object with `key` and `value` (max 256 characters each).
     - Response: Acknowledgment of success or error.
   - **GET Operation**:
     - HTTP Method: `GET`
     - Endpoint: `/get`
     - Query Parameter: `key`
     - Response: Returns the value for the given key or an error if the key is not found.

2. **Cache Eviction Strategy**:
   - Implements an **LRU eviction policy** to ensure optimal memory usage.
   - Automatically removes the least recently used keys when capacity is exceeded.

3. **Performance Optimizations**:
   - O(1) time complexity for both `PUT` and `GET` operations using a combination of a **HashMap** and a **Doubly Linked List**.
   - Designed to maintain low latency under heavy load.

4. **Resource Management**:
   - Operates within memory constraints of 2GB RAM (AWS t3.small).
   - Prevents Out of Memory (OOM) errors by evicting old keys when needed.

---

## Requirements

- Docker
- Node.js (for local development)
- AWS EC2 instance for deployment

---

## Project Structure

```
key-value-cache/
├── src/
│   ├── cache.js         # LRU Cache implementation
│   ├── routes.js        # API route handlers
│   └── server.js        # Express server setup
├── Dockerfile           # Docker configuration
├── package.json         # Node.js dependencies
├── README.md            # Documentation
```

---

## How to Build and Run

### 1. Clone the Repository
```bash
git clone https://github.com//key-value-cache.git
cd key-value-cache
```

### 2. Build the Docker Image
```bash
docker build -t key-value-cache .
```

### 3. Run the Docker Container
```bash
docker run -p 7171:7171 key-value-cache
```

The service will now be available at `http://localhost:7171`.

---

## Deployment on AWS EC2

### 1. Launch an EC2 Instance
- Use Amazon Linux 2 AMI.
- Instance type: `t3.small`.
- Open port `7171` in the security group.

### 2. Install Docker on EC2
```bash
sudo yum update -y
sudo yum install docker -y
sudo systemctl start docker
sudo systemctl enable docker
```

### 3. Pull and Run the Docker Image on EC2
```bash
docker pull /key-value-cache:latest
docker run -d -p 7171:7171 /key-value-cache:latest
```

The service will now be accessible via the public IP of your EC2 instance, e.g., `http://:7171`.

---

## API Usage

### PUT Operation

#### Request:
```bash
curl -X POST http://:7171/put \
-H "Content-Type: application/json" \
-d '{"key": "exampleKey", "value": "exampleValue"}'
```

#### Response (Success):
```json
{
    "status": "OK",
    "message": "Key inserted/updated successfully."
}
```

#### Response (Error):
```json
{
    "status": "ERROR",
    "message": "Error description"
}
```

---

### GET Operation

#### Request:
```bash
curl http://:7171/get?key=exampleKey
```

#### Response (Success):
```json
{
    "status": "OK",
    "key": "exampleKey",
    "value": "exampleValue"
}
```

#### Response (Key Not Found):
```json
{
    "status": "ERROR",
    "message": "Key not found."
}
```

---

## Design Choices and Optimizations

1. **LRU Cache Implementation**:
   - Used a combination of a HashMap and Doubly Linked List for O(1) operations.
   - Ensures efficient memory usage by evicting least recently used keys when capacity is exceeded.

2. **Scalability**:
   - Designed to handle high-frequency PUT and GET requests with minimal latency.
   - Tested under simulated load using tools like Locust.

3. **Input Validation**:
   - Enforced maximum length of 256 characters for both keys and values.
   - Ensures that invalid inputs are rejected gracefully.

4. **Dockerization**:
   - Packaged as a lightweight, portable Docker image for easy deployment across environments.

---

## Testing

### Local Testing with curl:
Use the provided curl commands to test the API endpoints locally or on your deployed instance.

### Load Testing:
Simulate high-frequency PUT and GET requests using tools like [Locust](https://locust.io/) or [Apache JMeter](https://jmeter.apache.org/).

---

## Notes

- Ensure that your service adheres to all functional and non-functional requirements specified in the assignment document.
- Test thoroughly to avoid Out of Memory issues during load testing.

Happy coding! 🎉