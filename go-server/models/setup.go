package models

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	dsn := "host=localhost user=root password=root dbname=root2 port=5432 sslmode=disable"
	database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("Failed to connect to database!")
	}

	database.AutoMigrate(&User{})
	database.AutoMigrate(&Role{})

	database.Create(&Role{ID: 1, Name: "admin"})
	database.Create(&Role{ID: 2, Name: "moderator"})
	database.Create(&Role{ID: 3, Name: "user"})

	DB = database
}
