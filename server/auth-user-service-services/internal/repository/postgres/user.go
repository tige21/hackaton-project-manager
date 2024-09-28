package postgres

import (
	"context"
	"fmt"
	"github.com/GermanBogatov/user-service/internal/common/apperror"
	"github.com/GermanBogatov/user-service/internal/entity"
	"github.com/GermanBogatov/user-service/pkg/postgresql"
	"github.com/jackc/pgerrcode"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgconn"
	"github.com/pkg/errors"
	"strings"
	"time"
)

var _ IUser = &User{}

type IUser interface {
	CreateUser(ctx context.Context, user entity.User) error
	GetUserByID(ctx context.Context, id string) (entity.User, error)
	GetUserByEmailAndPassword(ctx context.Context, email, password string) (entity.User, error)
	DeleteUserByID(ctx context.Context, id string) error
	UpdateUserID(ctx context.Context, userUpdate entity.UserUpdate) (entity.User, error)
	GetUsers(ctx context.Context, filter entity.Filter) ([]entity.User, error)
}

type User struct {
	client postgresql.Client
}

func NewUser(client postgresql.Client) IUser {
	return &User{
		client: client,
	}
}

// CreateUser - создание пользователя
func (u *User) CreateUser(ctx context.Context, user entity.User) error {
	q := `
	INSERT INTO users 
    	(id,name,surname,email,password,role,created_date) 
    VALUES 
		($1,$2,$3,$4,$5,$6,$7);
		`

	_, err := u.client.Exec(ctx, q, user.ID, user.Name, user.Surname, user.Email, user.Password, user.Role, user.CreatedDate)
	if err != nil {
		var pgErr *pgconn.PgError
		if errors.As(err, &pgErr) {
			if pgErr.Code == pgerrcode.UniqueViolation {
				return apperror.ErrUserIsExistWithEmail
			}
			return err
		}
	}
	return nil
}

// GetUserByEmailAndPassword - получение пользователя по емайл и паролю
func (u *User) GetUserByEmailAndPassword(ctx context.Context, email, password string) (entity.User, error) {
	q := `
		SELECT id,name,surname,email,password,role,created_date,updated_date 
		FROM users
		WHERE email=$1 AND password=$2;	
		`

	var user entity.User
	err := u.client.QueryRow(ctx, q, email, password).Scan(&user.ID, &user.Name, &user.Surname, &user.Email, &user.Password, &user.Role, &user.CreatedDate, &user.UpdatedDate)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return entity.User{}, apperror.ErrUserNotFound
		}
		return entity.User{}, err
	}

	return user, nil
}

// GetUserByID - получение пользователя по идентификатору
func (u *User) GetUserByID(ctx context.Context, id string) (entity.User, error) {
	q := `
		SELECT id,name,surname,email,password,role,created_date,updated_date 
		FROM users
		WHERE id=$1;	
		`

	var user entity.User
	err := u.client.QueryRow(ctx, q, id).Scan(&user.ID, &user.Name, &user.Surname, &user.Email, &user.Password, &user.Role, &user.CreatedDate, &user.UpdatedDate)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return entity.User{}, apperror.ErrUserNotFound
		}
		return entity.User{}, err
	}

	return user, nil
}

func (u *User) DeleteUserByID(ctx context.Context, id string) error {
	q := `
	DELETE FROM users 
    WHERE id=$1;`

	_, err := u.client.Exec(ctx, q, id)
	if err != nil {
		return err
	}

	return nil
}

// UpdateUserID - редактирование пользователя
func (u *User) UpdateUserID(ctx context.Context, userUpdate entity.UserUpdate) (entity.User, error) {
	query, args := prepareQueryUpdate(userUpdate)
	var user entity.User
	err := u.client.QueryRow(ctx, query, args...).Scan(&user.ID, &user.Name, &user.Surname, &user.Email, &user.Password, &user.Role, &user.CreatedDate, &user.UpdatedDate)
	if err != nil {
		return entity.User{}, err
	}

	return user, nil
}

// prepareQueryUpdate - подготовка запроса для обновления пользователя
func prepareQueryUpdate(user entity.UserUpdate) (string, []interface{}) {
	setValues := make([]string, 0)
	args := make([]interface{}, 0)
	argId := 1
	if user.Name != nil {
		setValues = append(setValues, fmt.Sprintf("name=$%d", argId))
		args = append(args, *user.Name)
		argId++
	}

	if user.Surname != nil {
		setValues = append(setValues, fmt.Sprintf("surname=$%d", argId))
		args = append(args, *user.Surname)
		argId++
	}

	if user.Email != nil {
		setValues = append(setValues, fmt.Sprintf("email=$%d", argId))
		args = append(args, *user.Email)
		argId++
	}

	setValues = append(setValues, fmt.Sprintf("updated_date=$%d", argId))
	args = append(args, time.Now().UTC())
	argId++

	setQuery := strings.Join(setValues, ", ")
	args = append(args, user.ID)

	query := fmt.Sprintf("UPDATE %s SET %s WHERE id=$%v RETURNING id,name,surname,email,password,role,created_date,updated_date;", "users", setQuery, argId)
	return query, args
}

func (u *User) GetUsers(ctx context.Context, filter entity.Filter) ([]entity.User, error) {
	q := fmt.Sprintf(`
			SELECT id,name,surname,email,password,role,created_date,updated_date
			FROM users
			ORDER BY %s %s
			OFFSET %v LIMIT %v;`, filter.Order, filter.Sort, filter.Offset, filter.Limit)

	rows, err := u.client.Query(ctx, q)
	if err != nil {
		return nil, err
	}

	defer rows.Close()
	users := make([]entity.User, 0, filter.Limit)
	for rows.Next() {
		var user entity.User
		errScan := rows.Scan(&user.ID, &user.Name, &user.Surname, &user.Email, &user.Password, &user.Role, &user.CreatedDate, &user.UpdatedDate)
		if errScan != nil {
			return nil, err
		}
		users = append(users, user)
	}

	return users, nil
}
