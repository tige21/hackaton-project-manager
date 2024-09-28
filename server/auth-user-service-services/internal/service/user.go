package service

import (
	"context"
	"github.com/GermanBogatov/user-service/internal/entity"
	"github.com/GermanBogatov/user-service/internal/repository/postgres"
)

var _ IUser = &User{}

type IUser interface {
	CreateUser(ctx context.Context, user entity.User) error
	GetUserByID(ctx context.Context, id string) (entity.User, error)
	GetUserByEmailAndPassword(ctx context.Context, email, password string) (entity.User, error)
	DeleteUserByID(ctx context.Context, id string) error
	UpdateUserID(ctx context.Context, userUpdate entity.UserUpdate) (entity.User, error)
}

type User struct {
	userRepo postgres.IUser
}

func NewUser(client postgres.IUser) IUser {
	return &User{
		userRepo: client,
	}
}

// CreateUser - создание пользователя
func (u *User) CreateUser(ctx context.Context, user entity.User) error {
	return u.userRepo.CreateUser(ctx, user)
}

// GetUserByID - получение пользователя по идентификатору
func (u *User) GetUserByID(ctx context.Context, id string) (entity.User, error) {
	user, err := u.userRepo.GetUserByID(ctx, id)
	if err != nil {
		return entity.User{}, err
	}

	return user, nil
}

// DeleteUserByID - удаление пользователя по идентификатору
func (u *User) DeleteUserByID(ctx context.Context, id string) error {
	err := u.userRepo.DeleteUserByID(ctx, id)
	if err != nil {
		return err
	}

	return nil
}

// GetUserByEmailAndPassword - получение пользователя по майлу и паролю
func (u *User) GetUserByEmailAndPassword(ctx context.Context, email, password string) (entity.User, error) {
	user, err := u.userRepo.GetUserByEmailAndPassword(ctx, email, password)
	if err != nil {
		return entity.User{}, err
	}

	return user, nil
}

func (u *User) UpdateUserID(ctx context.Context, userUpdate entity.UserUpdate) (entity.User, error) {
	return u.userRepo.UpdateUserID(ctx, userUpdate)
}
