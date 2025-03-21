package com.GPF.routes

import akka.http.scaladsl.model.StatusCodes
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import com.GPF.models.User
import com.GPF.Services.UserService
import spray.json._
import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport._
import scala.concurrent.{ExecutionContext, Future}
import scala.util.{Failure, Success}
import com.GPF.Utils.CORSHandler

trait UserJsonProtocol extends DefaultJsonProtocol {
  // Request models
  case class LoginRequest(email: String, password: String)
  case class RegisterRequest(
                             username: String,
                             email: String,
                             password: String,
                             phoneNumber: String,
                             FirstName: String,
                             LastName: String
                            )

  // Response models
  case class AuthResponse(message: String, token: Option[String] = None, userId: Option[String] = None)
  case class ProfileResponse(message : String ,
                             userId:Option[String] = None ,
                              FirstName : Option[String] = None ,
                               LastName:Option[String] = None ,
                                phoneNumber:Option[String] = None ,
                                 email: Option[String] = None
                                 )

  // Explicitly specify types for all implicit values
  implicit val userFormat: RootJsonFormat[User] = jsonFormat6(User)
  implicit val loginRequestFormat: RootJsonFormat[LoginRequest] = jsonFormat2(LoginRequest)
  implicit val registerRequestFormat: RootJsonFormat[RegisterRequest] = jsonFormat6(RegisterRequest)
  implicit val authResponseFormat: RootJsonFormat[AuthResponse] = jsonFormat3(AuthResponse)
  implicit val profileResponseFormat: RootJsonFormat[ProfileResponse] = jsonFormat6(ProfileResponse)
}

class UserRoutes(userService: UserService)(implicit ec: ExecutionContext) extends UserJsonProtocol with CORSHandler {

  val routes: Route = withCORS(
    pathPrefix("auth") {
      concat(
        path("login") {
          post {
            entity(as[LoginRequest]) { request =>
              println(request)
              onComplete(userService.authenticateUser(request.email, request.password)) {
                case Success(Some(user)) =>  
                  val token = userService.generateToken(user.email)
                  complete(StatusCodes.OK, AuthResponse("Login successful", Some(token), Some(user.username)))
                case Success(None) =>
                  complete(StatusCodes.Unauthorized, AuthResponse("Invalid credentials"))
                case Failure(ex) =>
                  complete(StatusCodes.InternalServerError, AuthResponse(s"Authentication error: ${ex.getMessage}"))
              }
            }
          }
        },
        path("register") {
          post {
            entity(as[RegisterRequest]) { request =>
              val user = User(request.username, request.email, request.password, request.phoneNumber, request.FirstName, request.LastName)
              onComplete(userService.registerUser(user)) {
                case Success(true) =>
                  val token = userService.generateToken(user.email)
                  complete(StatusCodes.Created, AuthResponse("User registered successfully", Some(token), Some(user.username)))
                case Success(false) =>
                  complete(StatusCodes.Conflict, AuthResponse("User already exists"))
                case Failure(ex) =>
                  complete(StatusCodes.InternalServerError, AuthResponse(s"Registration error: ${ex.getMessage}"))
              }
            }
          }
        },
         path("profile" / Segment) { username => // New endpoint for fetching user profile
          get {
            onComplete(userService.findUserByUsername(username)) {
              case Success(Some(user)) =>
                complete(StatusCodes.OK, ProfileResponse("User profile retrieved successfully", Some(user.username) ,
                                                                                                Some(user.FirstName) ,
                                                                                                Some(user.LastName),
                                                                                                Some(user.phoneNumber),
                                                                                                Some(user.email) ))
              case Success(None) =>
                complete(StatusCodes.NotFound, ProfileResponse("User not found"))
              case Failure(ex) =>
                complete(StatusCodes.InternalServerError, ProfileResponse(s"Error retrieving user profile: ${ex.getMessage}"))
            }
          }
        }
      )
    }
  )
}
