package controllers

import (
	"net/http"
	"os"

	"go-server/services"

	"github.com/gin-gonic/gin"
)

type AuthController interface {
	Signup(ctx *gin.Context)
}

type authHandler struct {
	userService services.UserService
	secretKey   string
	issure      string
}

func getSecretKey() string {
	secret := os.Getenv("SECRET")
	if secret == "" {
		secret = "secret"
	}
	return secret
}

func AuthHandler(userService services.UserService) AuthController {
	return &authHandler{
		userService: userService,
		secretKey:   getSecretKey(),
		issure:      "test",
	}
}

type SignupInput struct {
	Username string   `json:"username" binding:"required"`
	Email    string   `json:"email" binding:"required"`
	Password string   `json:"password" binding:"required"`
	Roles    []string `json:"roles" binding:"required"`
}

func (h *authHandler) Signup(c *gin.Context) {
	var input SignupInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := h.userService.CreateUser(input.Username, input.Email, input.Password, input.Roles)

	if err != nil {
		c.AbortWithError(500, err)
	}
	c.JSON(http.StatusOK, gin.H{"data": user})
}
