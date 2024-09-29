# Project Task Management API

## ��������

API ��� ���������� ��������� � ��������, ������������� �� Java � �������������� Spring Boot. ���� ������ ������������� ����������� ��� ��������, ���������, ���������� � �������� �������� � �����. ����� ����������� ����������� � ���� ������ PostgreSQL, � ��� �������� ������������ Liquibase. API ����������������� � ������� Swagger (Springdoc OpenAPI).

## ���� ����������

- **Java 17**
- **Spring Boot 3.2.x**
    - Spring Data JPA
    - Spring Web
    - Spring Kafka
    - Springdoc OpenAPI (Swagger UI)
- **PostgreSQL** (���� ������)
- **Liquibase** (�������� ���� ������)
- **Kafka** (��� ������ �����������)
- **Docker** (��� ��������������� ���������� � ���� ������)

## ����������

- **Java 17**
- **Maven 3.8+**
- **Docker � Docker Compose** (��� ������� ���� ������ � Kafka)

## ��������� � ������

### 1. ������������ �����������

```bash
git clone https://github.com/gork1y/projecttask.git
cd projecttask 
```

### 2. ������ �������
```bash
mvn clean install
```

### 3. ������ � Docker
������ �������� ������������ Docker Compose, ������� ��������� PostgreSQL, Zookeeper, Kafka � ���� ����������.
```bash
docker-compose up --build
```

### 4. ������ � API
����� ��������� ������� �������, ������ � API ����� �������������� �����:

- API: http://localhost:8080/api
- Swagger UI: http://localhost:8080/swagger-ui.html


###  API Endpoints
 
**Projects**
  - **POST** /api/projects: �������� ������ �������
  - **GET** /api/projects: ��������� ������ ���� ��������
  - **GET** /api/projects/{id}: ��������� ������� �� ID
  - **PUT** /api/projects/{id}: ���������� ������� �� ID
  - **DELETE** /api/projects/{id}: �������� ������� �� ID

**Tasks**
  - **POST** /api/tasks: �������� ����� ������
  - **GET** /api/tasks: ��������� ������ ���� �����
  - **GET** /api/tasks/project/{projectId}: ��������� ����� �� �������
  - **GET** /api/tasks/{id}: ��������� ������ �� ID
  - **PUT** /api/tasks/{id}: ���������� ������ �� ID
  - **DELETE** /api/tasks/{id}: �������� ������ �� ID

**Comments**
- **POST** /api/comments: �������� ������ �����������
- **GET** /api/comments/task/{taskId}: ��������� ������������ �� ID ������ � ���������� ���������
- **GET** /api/comments/{id}: ��������� ����������� �� ��� ID
- **PUT** /api/comments/{id}: ���������� ����������� �� ��� ID
- **DELETE** /api/comments/{id}: �������� ����������� �� ��� ID

###   ��������
  ��� �������� � �����������:

- ������� �������������: **Amogus Dev Team**
- Email: **gorkiy@list.ru**
- TG: **gorkiy7**

