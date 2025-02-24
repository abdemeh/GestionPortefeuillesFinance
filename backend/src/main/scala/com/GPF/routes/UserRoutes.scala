package com.GPF.routes

import akka.http.scaladsl.model.StatusCodes
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import com.GPF.models.User
import spray.json._
import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport._

// Add this trait for JSON serialization/deserialization
trait UserJsonProtocol extends DefaultJsonProtocol {
  implicit val userFormat : RootJsonFormat[User] = jsonFormat2(User.apply)  // Assuming User has 2 fields (username, password)

  // Request models
  case class LoginRequest(username: String, password: String)
  case class RegisterRequest(username: String, password: String)

  // Response models h
  case class AuthResponse(token: String, message: String)

  implicit val loginRequestFormat : RootJsonFormat[LoginRequest] = jsonFormat2(LoginRequest)
  implicit val registerRequestFormat : RootJsonFormat[RegisterRequest] = jsonFormat2(RegisterRequest)
  implicit val authResponseFormat : RootJsonFormat[AuthResponse] = jsonFormat2(AuthResponse)
}

class UserRoutes extends UserJsonProtocol {

  // This would be connected to a real authentication system in production
  private def authenticateUser(username: String, password: String): Option[String] = {
    // Mock authentication - replace with real logic
    if (username == "test" && password == "test123") {
      Some("mock-jwt-token")
    } else {
      None
    }
  }

  private def registerUser(username: String, password: String): Boolean = {
    // Mock registration - replace with real logic
    true  // Registration successful
  }

  val routes: Route =
    pathPrefix("auth") {
      concat(
        path("login") {
          post {
            entity(as[LoginRequest]) { request =>
              authenticateUser(request.username, request.password) match {
                case Some(token) =>
                  complete(StatusCodes.OK, AuthResponse(token, "Login successful"))
                case None =>
                  complete(StatusCodes.Unauthorized, "Invalid credentials")
              }
            }
          }
        },
        path("register") {
          post {
            entity(as[RegisterRequest]) { request =>
              if (registerUser(request.username, request.password)) {
                complete(StatusCodes.Created, "User registered successfully")
              } else {
                complete(StatusCodes.BadRequest, "Registration failed")
              }
            }
          }
        }
      )
    }
}