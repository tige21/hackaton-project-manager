package http

import (
	"encoding/json"
	"fmt"
	"github.com/GermanBogatov/user-service/internal/common/apperror"
	"github.com/GermanBogatov/user-service/internal/common/helpers"
	"github.com/GermanBogatov/user-service/internal/common/response"
	"github.com/GermanBogatov/user-service/internal/config"
	"github.com/GermanBogatov/user-service/internal/entity"
	"github.com/GermanBogatov/user-service/internal/handler/http/mapper"
	"github.com/GermanBogatov/user-service/internal/handler/http/model"
	"github.com/GermanBogatov/user-service/internal/handler/http/validator"
	"github.com/GermanBogatov/user-service/pkg/logging"
	"github.com/pkg/errors"
	"net/http"
)

func (h *Handler) PrivateUpdateUser(w http.ResponseWriter, r *http.Request) error {
	ctx := r.Context()

	userID, err := helpers.GetUuidFromPath(r, config.ParamID)
	if err != nil {
		return apperror.BadRequestError(errors.Wrap(err, "get uuid from path"))
	}

	selfUserID := ctx.Value(config.ParamID).(string)
	role := ctx.Value(config.ParamRole).(string)

	// только админу можно редактировать пользователей любых
	if entity.RoleType(role) != entity.RoleAdmin {
		return apperror.BadRequestError(fmt.Errorf("user [%s] does not have rights to update user [%s]", selfUserID, userID))
	}

	var userUpdate model.UserUpdatePrivate
	defer func() {
		err := r.Body.Close()
		if err != nil {
			logging.Error("error close request body")
		}
	}()

	if err := json.NewDecoder(r.Body).Decode(&userUpdate); err != nil {
		return apperror.BadRequestError(errors.Wrap(err, "json decode"))
	}

	err = validator.ValidateUserUpdatePrivate(userUpdate)
	if err != nil {
		return apperror.BadRequestError(errors.Wrap(err, "validate user"))
	}

	user := mapper.MapToEntityUserUpdatePrivate(userUpdate)
	user.ID = userID.String()

	result, err := h.userService.UpdatePrivateUserByID(ctx, user)
	if err != nil {
		return apperror.InternalServerError(err)
	}

	return response.RespondSuccess(w, mapper.MapToPrivateUserResponse(http.StatusOK, result))
}
