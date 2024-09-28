package config

import "os"

var (
	SystemName = os.Getenv("USER_SERVICE_SYSTEM_NAME")
	ServiceEnv = os.Getenv("USER_SERVICE_SERVICE_ENV")
	LogLevel   = os.Getenv("USER_SERVICE_LOG_LEVEL")
)

const (
	PasswordSalt  = "sad342mslfd23412sdfsdf1234hgf"
	JWTSecret     = "62RJhmkQJu9IEdaX6SZWnGnCJovTzoTq"
	IsoTimeLayout = "2006-01-02T15:04:05Z" // Формат ISO 8601

	ParamID     = "id"
	ParamRole   = "role"
	ParamOffset = "offset"
	ParamLimit  = "limit"
	ParamSort   = "sort"
	ParamOrder  = "order"

	OrderName          = "name"
	OrderSurname       = "surname"
	OrderEmail         = "email"
	OrderCreatedDate   = "createdDate"
	OrderCreatedDateDB = "created_date"
	SortDesc           = "desc"
	SortAsc            = "asc"
)
