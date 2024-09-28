package http

import (
	"fmt"
	"github.com/GermanBogatov/user-service/internal/common/apperror"
	"github.com/GermanBogatov/user-service/internal/common/helpers"
	"github.com/GermanBogatov/user-service/internal/common/response"
	"github.com/GermanBogatov/user-service/internal/config"
	"github.com/GermanBogatov/user-service/internal/handler/http/mapper"
	"github.com/pkg/errors"
	"net/http"
)

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
