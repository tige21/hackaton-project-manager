package http

import (
	"encoding/json"
	"fmt"
	"github.com/GermanBogatov/user-service/internal/common/apperror"
	"github.com/GermanBogatov/user-service/internal/common/helpers"
	"github.com/GermanBogatov/user-service/internal/common/response"
	"github.com/GermanBogatov/user-service/internal/config"
	"github.com/GermanBogatov/user-service/internal/handler/http/mapper"
	"github.com/GermanBogatov/user-service/internal/handler/http/model"
	"github.com/GermanBogatov/user-service/internal/handler/http/validator"
	"github.com/GermanBogatov/user-service/pkg/logging"
	"github.com/pkg/errors"
	"net/http"
)

// GetUsers - хэндлер получения пользователей
func (h *Handler) GetUsers(w http.ResponseWriter, r *http.Request) error {
	ctx := r.Context()

	offset, limit, err := helpers.GetLimitAndOffset(r, config.ParamOffset, config.ParamLimit)
	if err != nil {
		return apperror.BadRequestError(err)
	}

	sort := helpers.GetStringWithDefaultFromQuery(r, config.ParamSort, config.SortDesc)
	order := helpers.GetStringWithDefaultFromQuery(r, config.ParamOrder, config.OrderCreatedDate)

	err = validator.ValidateSort(sort)
	if err != nil {
		return apperror.BadRequestError(err)
	}

	err = validator.ValidateOrder(order)
	if err != nil {
		return apperror.BadRequestError(err)
	}

	filter := mapper.MapToEntityFilter(limit, offset, sort, order)
	users, err := h.userService.GetUsers(ctx, filter)
	if err != nil {
		return apperror.InternalServerError(err)
	}

	return response.RespondSuccess(w, mapper.MapToUsersResponse(http.StatusOK, users))
}

// GetUserByID - хэндлер получения пользователя по идентификатору
func (h *Handler) GetUserByID(w http.ResponseWriter, r *http.Request) error {
	ctx := r.Context()

	userID, err := helpers.GetUuidFromPath(r, config.ParamID)
	if err != nil {
		return apperror.BadRequestError(errors.Wrap(err, "get uuid from path"))
	}

	user, err := h.userService.GetUserByID(ctx, userID.String())
	if err != nil {
		return apperror.InternalServerError(err)
	}

	return response.RespondSuccess(w, mapper.MapToUserResponse(http.StatusOK, user))
}

// DeleteUserByID - хэндлер удаления пользователя по идентификатору
func (h *Handler) DeleteUserByID(w http.ResponseWriter, r *http.Request) error {
	ctx := r.Context()

	userID, err := helpers.GetUuidFromPath(r, config.ParamID)
	if err != nil {
		return apperror.BadRequestError(errors.Wrap(err, "get uuid from path"))
	}

	selfUserID := ctx.Value(config.ParamID).(string)

	// пользователь может удалить только сам себя
	if selfUserID != userID.String() {
		return apperror.BadRequestError(fmt.Errorf("user [%s] does not have rights to delete user [%s]", selfUserID, userID))
	}

	err = h.userService.DeleteUserByID(ctx, userID.String())
	if err != nil {
		return apperror.InternalServerError(err)
	}
	return response.RespondSuccess(w, response.ViewResponse{Code: http.StatusOK})
}

// UpdateUserByID - хэндлер обновления пользователя по идентификатору
func (h *Handler) UpdateUserByID(w http.ResponseWriter, r *http.Request) error {
	ctx := r.Context()

	userID, err := helpers.GetUuidFromPath(r, config.ParamID)
	if err != nil {
		return apperror.BadRequestError(errors.Wrap(err, "get uuid from path"))
	}

	selfUserID := ctx.Value(config.ParamID).(string)

	// пользователь может удалить только сам себя
	if selfUserID != userID.String() {
		return apperror.BadRequestError(fmt.Errorf("user [%s] does not have rights to update user [%s]", selfUserID, userID))
	}

	var userUpdate model.UserUpdate
	defer func() {
		err := r.Body.Close()
		if err != nil {
			logging.Error("error close request body")
		}
	}()

	if err := json.NewDecoder(r.Body).Decode(&userUpdate); err != nil {
		return apperror.BadRequestError(errors.Wrap(err, "json decode"))
	}

	err = validator.ValidateUserUpdate(userUpdate)
	if err != nil {
		return apperror.BadRequestError(errors.Wrap(err, "validate user"))
	}

	user := mapper.MapToEntityUserUpdate(userUpdate)
	user.ID = selfUserID

	result, err := h.userService.UpdateUserID(ctx, user)
	if err != nil {
		return apperror.InternalServerError(err)
	}

	return response.RespondSuccess(w, mapper.MapToUserResponse(http.StatusOK, result))
}
