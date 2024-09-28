package mapper

import (
	"github.com/GermanBogatov/user-service/internal/common/response"
	"github.com/GermanBogatov/user-service/internal/config"
	"github.com/GermanBogatov/user-service/internal/entity"
	"github.com/GermanBogatov/user-service/internal/handler/http/model"
)

func MapToEntityUser(user model.SignUpRequest) entity.User {
	return entity.User{
		Name:    user.Name,
		Surname: user.Surname,
		Email:   user.Email,
	}
}

func MapToEntityUserUpdate(user model.UserUpdate) entity.UserUpdate {
	return entity.UserUpdate{
		Name:    user.Name,
		Surname: user.Surname,
		Email:   user.Email,
	}
}

func MapToEntityFilter(limit, offset int, sort, order string) entity.Filter {
	return entity.Filter{
		Limit:  limit,
		Offset: offset,
		Sort:   sort,
		Order:  mapOrderType(order),
	}
}

func mapOrderType(order string) string {
	switch order {
	case config.OrderCreatedDate:
		return config.OrderCreatedDateDB
	default:
		return order
	}
}

func MapToUserWithJWTResponse(code int, user entity.User) response.ViewResponse {
	var (
		updatedDate *string
	)
	if user.UpdatedDate != nil {
		updateTime := user.UpdatedDate.Format(config.IsoTimeLayout)
		updatedDate = &updateTime
	}

	return response.ViewResponse{
		Code: code,
		Result: model.SignUpResponse{
			ID:          user.ID,
			Name:        user.Name,
			Surname:     user.Surname,
			Email:       user.Email,
			CreatedDate: user.CreatedDate.Format(config.IsoTimeLayout),
			UpdatedDate: updatedDate,
			JWT: model.JWT{
				Token:        user.JWT.Token,
				RefreshToken: user.JWT.RefreshToken,
			},
		},
	}
}

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

func MapToUserResponse(code int, user entity.User) response.ViewResponse {
	return response.ViewResponse{
		Code:   code,
		Result: mapUserToResponse(user),
	}
}

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
func MapToJWTResponse(code int, token, refreshToken string) response.ViewResponse {
	return response.ViewResponse{
		Code: code,
		Result: model.JWT{
			Token:        token,
			RefreshToken: refreshToken,
		},
	}
}
