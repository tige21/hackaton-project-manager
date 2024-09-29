# User-service
Сервис API работы с пользователями, а также для регистрации, авторизации

* Golang 1.22
* Postgres
* [Goose](https://github.com/pressly/goose)
* Redis
* Prometheus

## Документация API
* [Swagger.yml](docs%2Fswagger.yml)

## Конфигурация
* Файл с описанием значений переменных окружения [configs/example.env](configs%2Fexample.env).
* Файл с описанием значения переменных окружения для запуска docker-compose [configs/example.docker.env](configs%2Fexample.docker.env).

## Запуск приложения

### Запуск в docker контейнере

```
docker build  -t user_tag_api -f Dockerfile .
docker run -p 8080:8080 user_tag_api
```

### Запуск docker-compose со всеми зависимостями
```
export GITLAB_LOGIN=""
export GITLAB_TOKEN=""
make compose-up
```

### Локальный запуск приложения

```shell
go run cmd/application/main.go --configPath=configs/example.env
```

## Работа с SQL-миграциями

### Создание файла миграции
```
goose -dir migrations create {FILENAME} sql
```

### Запуск миграций
```shell
goose -dir migrations/psqlmigrations postgres "postgresql://amogus:amogus@127.0.0.1:5431/postgres?sslmode=disable" up
```

### Откат миграций
```shell
goose -dir migrations/psqlmigrations postgres "postgresql://amogus:amogus@127.0.0.1:5431/postgres?sslmode=disable" down
```