package entity

import (
	"github.com/google/uuid"
	"time"
)

type RoleType string

const (
	RoleDeveloper RoleType = "developer"
	RoleAdmin     RoleType = "admin"
)

// User - модель пользователя
type User struct {
	ID          string
	Name        string
	Surname     string
	Email       string
	Password    string
	Role        RoleType
	CreatedDate time.Time
	UpdatedDate *time.Time
	JWT         JWT
}

// UserUpdate - модель обновления пользователя
type UserUpdate struct {
	ID      string
	Name    *string
	Surname *string
	Email   *string
}

// UserUpdatePrivate - модель приватного обновления пользователя
type UserUpdatePrivate struct {
	UserUpdate
	Role *RoleType
}

// Filter - модель фильтра
type Filter struct {
	Limit  int
	Offset int
	Sort   string
	Order  string
}

func (u *User) GenerateID() {
	u.ID = uuid.New().String()
}

func (u *User) GenerateCreatedDate() {
	u.CreatedDate = time.Now().UTC()
}

func (u *User) AddRoleDeveloper() {
	u.Role = RoleDeveloper
}

func (u *User) AddRoleAdmin() {
	u.Role = RoleAdmin
}

func (u *User) SetPasswordHash(hash string) {
	u.Password = hash
}

func (u *User) SetJWT(token, refreshToken string) {
	u.JWT = JWT{
		Token:        token,
		RefreshToken: refreshToken,
	}
}

// JWT - модель токена с рефрешом
type JWT struct {
	Token        string
	RefreshToken string
}
