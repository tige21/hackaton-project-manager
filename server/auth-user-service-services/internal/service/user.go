package service

import (
	"context"
	"github.com/GermanBogatov/user-service/internal/common/apperror"
	"github.com/GermanBogatov/user-service/internal/config"
	"github.com/GermanBogatov/user-service/internal/entity"
	"github.com/GermanBogatov/user-service/internal/repository/postgres"
)

var _ IUser = &User{}

type IUser interface {
	CreateUser(ctx context.Context, user entity.User) error
	GetUserByID(ctx context.Context, id string) (entity.User, error)
	GetUsers(ctx context.Context, filter entity.Filter) ([]entity.User, error)
	GetUserByEmailAndPassword(ctx context.Context, email, password string) (entity.User, error)
	DeleteUserByID(ctx context.Context, id string) error
	UpdateUserByID(ctx context.Context, userUpdate entity.UserUpdate) (entity.User, error)
	UpdatePrivateUserByID(ctx context.Context, userUpdate entity.UserUpdatePrivate) (entity.User, error)
	UpdateCompetencyByUserID(ctx context.Context, userID string, competencyUpdate entity.CompetencyUpdate) (int, error)
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

// UpdateUserByID - обновление пользователя
func (u *User) UpdateUserByID(ctx context.Context, userUpdate entity.UserUpdate) (entity.User, error) {
	return u.userRepo.UpdateUserByID(ctx, userUpdate)
}

// GetUsers - получение списка пользователей
func (u *User) GetUsers(ctx context.Context, filter entity.Filter) ([]entity.User, error) {
	return u.userRepo.GetUsers(ctx, filter)
}

// UpdatePrivateUserByID - приватное обновление пользователя
func (u *User) UpdatePrivateUserByID(ctx context.Context, userUpdate entity.UserUpdatePrivate) (entity.User, error) {
	return u.userRepo.UpdatePrivateUserByID(ctx, userUpdate)
}

// UpdateCompetencyByUserID - обновление компетенций
func (u *User) UpdateCompetencyByUserID(ctx context.Context, userID string, competencyUpdate entity.CompetencyUpdate) (int, error) {
	actualCompetencyLevel, err := u.userRepo.GetCompetencyLevelByUserID(ctx, userID)
	if err != nil {
		return 0, err
	}

	competencyLevel := 0
	switch competencyUpdate.Type {
	case config.CompetencyDecrease:
		competencyLevel = actualCompetencyLevel - int(competencyUpdate.Point)
		if competencyLevel < 0 {
			return 0, apperror.ErrCompetencyPointIsLessThenLowLimit
		}
	case config.CompetencyIncrease:
		competencyLevel = actualCompetencyLevel + int(competencyUpdate.Point)
		if competencyLevel > 100 {
			return 0, apperror.ErrCompetencyPointIsHigherThenMaxLimit
		}
	default:
		return 0, apperror.ErrInvalidCompetencyType
	}

	return u.userRepo.UpdateCompetencyLevelByUserID(ctx, userID, competencyLevel)
}
