package services

import (
	"fmt"
	"go-server/models"

	"gorm.io/gorm"
)

type UserService interface {
	CreateUser(user string, email string, password string, roles []string) (*models.User, error)
}

type userHandler struct {
	DB *gorm.DB
}

func UserHandler(db *gorm.DB) UserService {
	return &userHandler{
		DB: db,
	}
}

func mapSlice[T any, M any](a []T, f func(T) M) []M {
	n := make([]M, len(a))
	for i, e := range a {
		n[i] = f(e)
	}
	return n
}

func (h userHandler) CreateUser(user string, email string, password string, roles []string) (*models.User, error) {
	newRoles := mapSlice(roles, func(role string) *models.Role {
		// roleModel := models.Role{Name: role}
		roleModel := models.Role{}
		h.DB.First(&roleModel, "name = ?", role)
		return &roleModel
	})
	fmt.Println(newRoles)
	book := models.User{Username: user, Email: email, Password: password, Roles: newRoles}
	// err := h.DB.Create(&book)

	// if ()

	if result := h.DB.Create(&book); result.Error != nil {
		return nil, result.Error
	}
	// check error please
	return &book, nil
}
