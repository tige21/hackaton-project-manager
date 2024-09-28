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

type UserUpdate struct {
	ID      string
	Name    *string
	Surname *string
	Email   *string
}

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

type JWT struct {
	Token        string
	RefreshToken string
}
