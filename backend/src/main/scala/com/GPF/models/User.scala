package com.GPF.models

import java.util.UUID


case class User(
                 username : String,
                 email : String,
                 password : String,
                 phoneNumber : String,
                 FirstName : String,
                 LastName : String
               ){
  // Instance method that can use this.FirstName and this.LastName
  def generateUsername: String = {
    if(this.username.isEmpty()) {
      this.username
    }else{
      val cleanFirstName = this.FirstName.trim.toLowerCase.replaceAll("[^a-z0-9]", "")
      val cleanLastName = this.LastName.trim.toLowerCase.replaceAll("[^a-z0-9]", "")
      
      if (cleanFirstName.isEmpty && cleanLastName.isEmpty) {
        s"user_${UUID.randomUUID().toString.take(8)}"
      } else {
        val basePart = if (cleanFirstName.isEmpty) {
          cleanLastName
        } else if (cleanLastName.isEmpty) {
          cleanFirstName
        } else {
          s"${cleanFirstName.take(1)}$cleanLastName"
        }

        s"${basePart}_${UUID.randomUUID().toString.take(6)}"
      }
    }
  }
  
  // Create a copy of this user with a generated username
  def withGeneratedUsername: User = {
    this.copy(username = generateUsername)
  }
}