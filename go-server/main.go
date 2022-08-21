package main

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"go-server/controllers"
	"go-server/models"
	"go-server/services"
)

func main() {
	r := gin.Default()

	models.ConnectDatabase()

	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"data": "hello world"})
	})

	userService := services.UserHandler(models.DB)
	authController := controllers.AuthHandler(userService)

	r.POST("/api/auth/signup", authController.Signup)

	r.Run(":3000")
}
