# Project Task Management API

## Описание

API для управления проектами и задачами, разработанный на Java с использованием Spring Boot. Этот проект предоставляет возможности для создания, получения, обновления и удаления проектов и задач. Также реализовано подключение к базе данных PostgreSQL, а для миграций используется Liquibase. API задокументировано с помощью Swagger (Springdoc OpenAPI).

## Стек технологий

- **Java 17**
- **Spring Boot 3.2.x**
    - Spring Data JPA
    - Spring Web
    - Spring Kafka
    - Springdoc OpenAPI (Swagger UI)
- **PostgreSQL** (База данных)
- **Liquibase** (Миграции базы данных)
- **Kafka** (Для обмена сообщениями)
- **Docker** (Для контейнеризации приложения и базы данных)

## Требования

- **Java 17**
- **Maven 3.8+**
- **Docker и Docker Compose** (для запуска базы данных и Kafka)

## Установка и запуск

### 1. Клонирование репозитория

```bash
git clone https://github.com/gork1y/projecttask.git
cd projecttask 
```

### 2. Сборка проекта
```bash
mvn clean install
```

### 3. Запуск с Docker
Проект включает конфигурацию Docker Compose, которая запускает PostgreSQL, Zookeeper, Kafka и само приложение.
```bash
docker-compose up --build
```

### 4. Доступ к API
После успешного запуска проекта, доступ к API будет осуществляться через:

- API: http://localhost:8080/api
- Swagger UI: http://localhost:8080/swagger-ui.html


###  API Endpoints
 
**Projects**
  - **POST** /api/projects: Создание нового проекта
  - **GET** /api/projects: Получение списка всех проектов
  - **GET** /api/projects/{id}: Получение проекта по ID
  - **PUT** /api/projects/{id}: Обновление проекта по ID
  - **DELETE** /api/projects/{id}: Удаление проекта по ID

**Tasks**
  - **POST** /api/tasks: Создание новой задачи
  - **GET** /api/tasks: Получение списка всех задач
  - **GET** /api/tasks/project/{projectId}: Получение задач по проекту
  - **GET** /api/tasks/{id}: Получение задачи по ID
  - **PUT** /api/tasks/{id}: Обновление задачи по ID
  - **DELETE** /api/tasks/{id}: Удаление задачи по ID

**Comments**
- **POST** /api/comments: Создание нового комментария
- **GET** /api/comments/task/{taskId}: Получение комментариев по ID задачи с поддержкой пагинации
- **GET** /api/comments/{id}: Получение комментария по его ID
- **PUT** /api/comments/{id}: Обновление комментария по его ID
- **DELETE** /api/comments/{id}: Удаление комментария по его ID

###   Контакты
  Для вопросов и предложений:

- Команда разработчиков: **Amogus Dev Team**
- Email: **gorkiy@list.ru**
- TG: **gorkiy7**

