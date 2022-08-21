package models

type Role struct {
  ID     uint   `json:"id" gorm:"primary_key"`
  Name  string `json:"name"`
	Users []*User `gorm:"many2many:user_roles;"`
}
