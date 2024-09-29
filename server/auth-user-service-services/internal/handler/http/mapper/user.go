package mapper

import (
	"github.com/GermanBogatov/user-service/internal/common/response"
	"github.com/GermanBogatov/user-service/internal/config"
	"github.com/GermanBogatov/user-service/internal/entity"
	"github.com/GermanBogatov/user-service/internal/handler/http/model"
)

// MapToEntityUser - маппинг в модель пользователя
func MapToEntityUser(user model.SignUpRequest) entity.User {
	return entity.User{
		Name:    user.Name,
		Surname: user.Surname,
		Email:   user.Email,
	}
}

// MapToEntityUserUpdate - маппинг в модель редактирования пользователя
func MapToEntityUserUpdate(user model.UserUpdate) entity.UserUpdate {
	return entity.UserUpdate{
		Name:    user.Name,
		Surname: user.Surname,
		Email:   user.Email,
	}
}

// MapToEntityUserUpdatePrivate - маппинг в модель приватного редактирования пользователя
func MapToEntityUserUpdatePrivate(user model.UserUpdatePrivate) entity.UserUpdatePrivate {

	u := entity.UserUpdatePrivate{}
	u.UserUpdate.Name = user.Name
	u.UserUpdate.Surname = user.Surname
	u.UserUpdate.Email = user.Email

	if user.Role != nil {
		role := entity.RoleType(*user.Role)
		u.Role = &role
		return u
	}

	return u
}

// MapToEntityFilter - маппинг в модель фильтра
func MapToEntityFilter(limit, offset int, sort, order string) entity.Filter {
	return entity.Filter{
		Limit:  limit,
		Offset: offset,
		Sort:   sort,
		Order:  mapOrderType(order),
	}
}

// mapOrderType - маппинг поля сортировки
func mapOrderType(order string) string {
	switch order {
	case config.OrderCreatedDate:
		return config.OrderCreatedDateDB
	default:
		return order
	}
}

// MapToUserWithJWTResponse - маппинг пользователя с jwt в ответ
func MapToUserWithJWTResponse(code int, user entity.User) response.ViewResponse {
	return response.ViewResponse{
		Code: code,
		Result: model.SignUpResponse{
			UserResponse: mapUserToResponse(user),
			JWT: model.JWT{
				Token:        user.JWT.Token,
				RefreshToken: user.JWT.RefreshToken,
			},
		},
	}
}

// mapPrivateUserToResponse - маппинг приватного пользователя в модель ответ
func mapPrivateUserToResponse(user entity.User) model.UserPrivateResponse {
	var (
		updatedDate *string
	)

	if user.UpdatedDate != nil {
		updateTime := user.UpdatedDate.Format(config.IsoTimeLayout)
		updatedDate = &updateTime
	}

	u := model.UserResponse{
		ID:          user.ID,
		Name:        user.Name,
		Surname:     user.Surname,
		Email:       user.Email,
		CreatedDate: user.CreatedDate.Format(config.IsoTimeLayout),
		UpdatedDate: updatedDate,
	}

	return model.UserPrivateResponse{
		UserResponse: u,
		Role:         string(user.Role),
	}
}

// mapUserToResponse - маппинг пользователя в модель ответ
func mapUserToResponse(user entity.User) model.UserResponse {
	var (
		updatedDate *string
	)

	if user.UpdatedDate != nil {
		updateTime := user.UpdatedDate.Format(config.IsoTimeLayout)
		updatedDate = &updateTime
	}

	return model.UserResponse{
		ID:          user.ID,
		Name:        user.Name,
		Surname:     user.Surname,
		Email:       user.Email,
		CreatedDate: user.CreatedDate.Format(config.IsoTimeLayout),
		UpdatedDate: updatedDate,
	}
}

// MapToUserResponse - маппинг пользователя в модель ответ
func MapToUserResponse(code int, user entity.User) response.ViewResponse {
	return response.ViewResponse{
		Code:   code,
		Result: mapUserToResponse(user),
	}
}

// MapToPrivateUserResponse - маппинг приватного пользователя в модель ответ
func MapToPrivateUserResponse(code int, user entity.User) response.ViewResponse {
	return response.ViewResponse{
		Code:   code,
		Result: mapPrivateUserToResponse(user),
	}
}

// MapToUsersResponse - маппинг пользователей в модель ответ
func MapToUsersResponse(code int, users []entity.User) response.ViewResponse {
	result := make([]model.UserResponse, 0, len(users))
	for _, user := range users {
		result = append(result, mapUserToResponse(user))
	}
	return response.ViewResponse{
		Code:   code,
		Result: result,
	}
}

// MapToJWTResponse - маппинг токена в модель с jwt
func MapToJWTResponse(code int, token, refreshToken string) response.ViewResponse {
	return response.ViewResponse{
		Code: code,
		Result: model.JWT{
			Token:        token,
			RefreshToken: refreshToken,
		},
	}
}
