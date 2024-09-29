package validator

import (
	"github.com/GermanBogatov/user-service/internal/common/apperror"
	"github.com/GermanBogatov/user-service/internal/config"
	"github.com/GermanBogatov/user-service/internal/entity"
	"github.com/GermanBogatov/user-service/internal/handler/http/model"
	"strings"
)

// ValidateSignUpUser - валидация пользователя при регистрации
func ValidateSignUpUser(user model.SignUpRequest) error {
	if strings.TrimSpace(user.Name) == "" {
		return apperror.ErrEmptyName
	}
	if strings.TrimSpace(user.Surname) == "" {
		return apperror.ErrEmptySurname
	}
	if strings.TrimSpace(user.Email) == "" {
		return apperror.ErrEmptyEmail
	}
	if strings.TrimSpace(user.Password) == "" {
		return apperror.ErrEmptyPassword
	}

	if !strings.Contains(user.Email, "@") {
		return apperror.ErrInvalidEmailFormat
	}

	return nil
}

// ValidateUserUpdate - валидация пользователя при редактировании
func ValidateUserUpdate(user model.UserUpdate) error {
	if user.Name == nil && user.Surname == nil && user.Email == nil {
		return apperror.ErrAllFieldAreEmpty
	}

	if user.Name != nil && strings.TrimSpace(*user.Name) == "" {
		return apperror.ErrEmptyName
	}
	if user.Surname != nil && strings.TrimSpace(*user.Surname) == "" {
		return apperror.ErrEmptySurname
	}
	if user.Email != nil {
		if strings.TrimSpace(*user.Email) == "" {
			return apperror.ErrEmptyEmail
		}

		if !strings.Contains(*user.Email, "@") {
			return apperror.ErrInvalidEmailFormat
		}
	}

	return nil
}

// ValidateUserUpdatePrivate - валидация пользователя при приватном редактировании
func ValidateUserUpdatePrivate(user model.UserUpdatePrivate) error {
	if user.Name == nil && user.Surname == nil && user.Email == nil && user.Role == nil {
		return apperror.ErrAllFieldAreEmpty
	}

	if user.Role != nil {
		if entity.RoleType(*user.Role) != entity.RoleAdmin && entity.RoleType(*user.Role) != entity.RoleDeveloper &&
			entity.RoleType(*user.Role) != entity.RoleBackend && entity.RoleType(*user.Role) != entity.RoleFrontend &&
			entity.RoleType(*user.Role) != entity.RoleDesigner && entity.RoleType(*user.Role) != entity.RoleDevops &&
			entity.RoleType(*user.Role) != entity.RoleProjectManager {
			return apperror.ErrInvalidRoleType
		}
	}

	if user.Name != nil && strings.TrimSpace(*user.Name) == "" {
		return apperror.ErrEmptyName
	}
	if user.Surname != nil && strings.TrimSpace(*user.Surname) == "" {
		return apperror.ErrEmptySurname
	}
	if user.Email != nil {
		if strings.TrimSpace(*user.Email) == "" {
			return apperror.ErrEmptyEmail
		}

		if !strings.Contains(*user.Email, "@") {
			return apperror.ErrInvalidEmailFormat
		}
	}

	return nil

	return nil
}

// ValidateSignInUser - валидация пользователя при авторизации
func ValidateSignInUser(user model.SignInRequest) error {
	if strings.TrimSpace(user.Email) == "" {
		return apperror.ErrEmptyEmail
	}
	if !strings.Contains(user.Email, "@") {
		return apperror.ErrInvalidEmailFormat
	}

	if strings.TrimSpace(user.Password) == "" {
		return apperror.ErrEmptyPassword
	}

	return nil
}

// ValidateSort - валидация типа сортировки
func ValidateSort(sort string) error {
	switch sort {
	case config.SortAsc, config.SortDesc:
		return nil
	default:
		return apperror.ErrInvalidParamSort
	}
}

// ValidateOrder - валидация поля сортировки
func ValidateOrder(order string) error {
	switch order {
	case config.OrderEmail, config.OrderName, config.OrderSurname, config.OrderCreatedDate:
		return nil
	default:
		return apperror.ErrInvalidParamOrder
	}
}

// ValidateRole - валидация роли
func ValidateRole(role *string) error {
	if role == nil {
		return nil
	}

	switch *role {
	case string(entity.RoleDeveloper), string(entity.RoleAdmin), string(entity.RoleBackend), string(entity.RoleFrontend), string(entity.RoleDesigner), string(entity.RoleDevops), string(entity.RoleProjectManager):
		return nil
	default:
		return apperror.ErrInvalidParamRole
	}
}
