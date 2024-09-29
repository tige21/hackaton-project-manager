package http

import (
	"encoding/json"
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

// UpdateCompetency - хэндлер обновления компетенций по идентификатору
func (h *Handler) UpdateCompetency(w http.ResponseWriter, r *http.Request) error {
	ctx := r.Context()

	userID, err := helpers.GetUuidFromPath(r, config.ParamID)
	if err != nil {
		return apperror.BadRequestError(errors.Wrap(err, "get uuid from path"))
	}

	var competencyUpdate model.UpdateCompetency
	defer func() {
		err := r.Body.Close()
		if err != nil {
			logging.Error("error close request body")
		}
	}()

	if err := json.NewDecoder(r.Body).Decode(&competencyUpdate); err != nil {
		return apperror.BadRequestError(errors.Wrap(err, "json decode"))
	}

	err = validator.ValidateCompetencyUpdate(competencyUpdate)
	if err != nil {
		return apperror.BadRequestError(errors.Wrap(err, "validate user"))
	}

	competency := mapper.MapToEntityCompetencyUpdate(competencyUpdate)

	competencyLevel, err := h.userService.UpdateCompetencyByUserID(ctx, userID.String(), competency)
	if err != nil {
		return apperror.InternalServerError(err)
	}

	return response.RespondSuccess(w, mapper.MapToCompetencyResponse(http.StatusOK, competencyLevel))
}
