package apperror

import "github.com/pkg/errors"

var (
	ErrRefreshTokenNotFound = errors.New("refresh token not found")
	ErrUserNotFound         = errors.New("user not found")
	ErrUserIsExistWithEmail = errors.New("user with this email exists")
	ErrMalformedToken       = errors.New("malformed token")
	ErrInvalidSigningMethod = errors.New("invalid signing method")
	ErrTokenIsInspired      = errors.New("token has been inspired")
	ErrEmptyName            = errors.New("field 'name' is empty")
	ErrEmptySurname         = errors.New("field 'surname' is empty")
	ErrEmptyEmail           = errors.New("field 'email' is empty")
	ErrInvalidEmailFormat   = errors.New("invalid email format")
	ErrEmptyPassword        = errors.New("field 'password' is empty")
	ErrAllFieldAreEmpty     = errors.New("all fields are empty")
	ErrInvalidParamSort     = errors.New("invalid param 'sort'")
	ErrInvalidParamOrder    = errors.New("invalid param 'order'")
	ErrInvalidParamRole     = errors.New("invalid param 'role'")
	ErrInvalidRoleType      = errors.New("invalid role type")
	ErrRedisNil             = errors.New("не найдена запись в редисе")
)

const (
	ErrType500 = "INTERNAL_SERVER_ERROR"
	ErrType400 = "INVALID_CONTENT_FIELD"
	ErrType404 = "NOT_FOUND"
	ErrType401 = "UNAUTHORIZED"
	ErrType409 = "CONFLICT"
)
