package model

// SignUpRequest - модель для регистрации пользователя
type SignUpRequest struct {
	Name    string `json:"name"`
	Surname string `json:"surname"`
	SignInRequest
}

// SignInRequest - модель для авторизации пользователя
type SignInRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// SignUpResponse - модель ответа после регистрации
type SignUpResponse struct {
	UserResponse
	JWT JWT `json:"jwt"`
}

// UserUpdate - модель при редактировании пользователя
type UserUpdate struct {
	ID      string  `json:"id"`
	Name    *string `json:"name"`
	Surname *string `json:"surname"`
	Email   *string `json:"email"`
}

// UserResponse - модель пользователя
type UserResponse struct {
	ID          string  `json:"id"`
	Name        string  `json:"name"`
	Surname     string  `json:"surname"`
	Email       string  `json:"email"`
	CreatedDate string  `json:"createdDate"`
	UpdatedDate *string `json:"updatedDate"`
}

// JWT - модель для токена с рефрешом
type JWT struct {
	Token        string `json:"token"`
	RefreshToken string `json:"refreshToken"`
}
