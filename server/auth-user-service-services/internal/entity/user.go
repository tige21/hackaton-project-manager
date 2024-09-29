package entity

import (
	"github.com/google/uuid"
	"time"
)

type RoleType string

const (
	RoleDeveloper      RoleType = "developer"
	RoleAdmin          RoleType = "admin"
	RoleBackend        RoleType = "backend"
	RoleFrontend       RoleType = "frontend"
	RoleDesigner       RoleType = "designer"
	RoleDevops         RoleType = "devops"
	RoleProjectManager RoleType = "project-manager"
)

// User - модель пользователя
type User struct {
	ID          string
	Name        string
	Surname     string
	Email       string
	Password    string
	Role        RoleType
	JWT         JWT
	CreatedDate time.Time
	UpdatedDate *time.Time
}

// UserUpdateBase - базовая модель пользователя для редактирования
type UserUpdateBase struct {
	ID      string
	Name    *string
	Surname *string
	Email   *string
}

// UserUpdate - модель обновления пользователя
type UserUpdate struct {
	UserUpdateBase
	Password *string
}

// UserUpdatePrivate - модель приватного обновления пользователя
type UserUpdatePrivate struct {
	UserUpdateBase
	Role *RoleType
}

// Filter - модель фильтра
type Filter struct {
	Limit  int
	Offset int
	Sort   string
	Order  string
	Role   *RoleType
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
