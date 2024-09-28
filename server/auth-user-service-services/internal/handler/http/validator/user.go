package validator

import (
	"github.com/GermanBogatov/user-service/internal/common/apperror"
	"github.com/GermanBogatov/user-service/internal/config"
	"github.com/GermanBogatov/user-service/internal/handler/http/model"
	"strings"
)

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

func ValidateSort(sort string) error {
	switch sort {
	case config.SortAsc, config.SortDesc:
		return nil
	default:
		return apperror.ErrInvalidSort
	}
}

func ValidateOrder(order string) error {
	switch order {
	case config.OrderEmail, config.OrderName, config.OrderSurname, config.OrderCreatedDate:
		return nil
	default:
		return apperror.ErrInvalidOrder
	}
}
