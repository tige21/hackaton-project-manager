# Этап 1: Сборка приложения
FROM maven:3.8.6-eclipse-temurin-17 AS build

# Установка рабочей директории
WORKDIR /app

# Копирование файлов pom.xml и скачивание зависимостей
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Копирование исходного кода
COPY src ./src

# Сборка приложения
RUN mvn clean package -DskipTests

# Этап 2: Запуск приложения
FROM openjdk:17-jdk

# Установка рабочей директории
WORKDIR /app

# Копирование jar файла из предыдущего этапа
COPY --from=build /app/target/projecttask-0.0.1-SNAPSHOT.jar app.jar
COPY --from=build /app/target/classes /app/classes

# Определение переменных окружения для подключения к PostgreSQL и Kafka
ENV SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/projecttaskdb
ENV SPRING_DATASOURCE_USERNAME=amogus
ENV SPRING_DATASOURCE_PASSWORD=amogus
ENV SPRING_KAFKA_BOOTSTRAP_SERVERS=kafka:9092

# Открытие порта приложения
EXPOSE 8080

# Запуск приложения
ENTRYPOINT ["java","-jar","app.jar"]
