package com.GPF.Services

import com.GPF.config.DatabaseConfig
import com.GPF.models.User
import org.mongodb.scala._
import org.mongodb.scala.model.Filters._
import org.mongodb.scala.model.IndexOptions
import org.mongodb.scala.model.Indexes._
import scala.concurrent.{ExecutionContext, Future}
import com.github.t3hnar.bcrypt._

class UserService(dbConfig: DatabaseConfig)(implicit ec: ExecutionContext) {
  private val usersCollection: MongoCollection[Document] = dbConfig.database.getCollection[Document](dbConfig.Collections.Users)

  // Initialize - create unique index on username
  def initialize(): Future[String] = {
    val indexOptions = IndexOptions().unique(true)
    usersCollection.createIndex(ascending("username"), indexOptions).toFuture()
  }

  // Convert between MongoDB Document and User case class
  private def documentToUser(doc: Document): User = {
    User(
      username = doc.getString("username"),
      email = doc.getString("email"),
      password = doc.getString("password"),
      phoneNumber = doc.getString("phoneNumber"),
      FirstName = doc.getString("FirstName"),
      LastName = doc.getString("LastName")
    )
  }

  // Find user by username
  def findUserByUsername(username: String): Future[Option[User]] = {
    usersCollection
      .find(equal("username", username))
      .first()
      .toFutureOption()
      .map(_.map(documentToUser))
  }

  // Find user by username
  def findUserByEmail(email: String): Future[Option[User]] = {
    usersCollection
      .find(equal("email", email))
      .first()
      .toFutureOption()
      .map(_.map(documentToUser))
  }

  // Register new user
  def registerUser(user: User): Future[Boolean] = {
    val generatedUsername = user.generateUsername
    // Hash the password before storing
    val document = Document(
      "username" -> generatedUsername ,
      "email" -> user.email,
      "FirstName"-> user.FirstName,
      "LastName"-> user.LastName,
      "phoneNumber"-> user.phoneNumber,
      "password" -> user.password.bcrypt
    )
println(s"Checking user email: ${user.email}")

  // Check if the email already exists
  findUserByEmail(user.email).flatMap {
    case Some(_) =>
      println("User with this email already exists!")
      Future.successful(false) // Email already exists
    case None =>
      usersCollection
        .insertOne(document)
        .toFuture()
        .map { _ =>
          println("User successfully registered.")
          true
        }
        .recover {
          case ex: MongoWriteException if ex.getError.getCode == 11000 =>
            println("MongoDB Duplicate Key Error: Check if email has a unique index")
            false
          case ex: Throwable =>
            println(s"Unexpected Error inserting user: ${ex.getMessage}")
            false
        }
  }
  }

  // Authenticate user
  def authenticateUser(email: String, password: String): Future[Boolean] = {
    findUserByEmail(email).map {
      case Some(user) => password.isBcryptedSafe(user.password).getOrElse(false)
      case None => false
    }
  }

  // Generate a simple token (in a real app, use JWT)
  def generateToken(username: String): String = {
    import java.util.{Date, UUID}
    import java.nio.charset.StandardCharsets
    import java.security.MessageDigest

    val now = new Date().getTime.toString
    val random = UUID.randomUUID().toString
    val tokenData = s"$username-$now-$random"

    // Simple hash
    val digest = MessageDigest.getInstance("SHA-256")
    val hash = digest.digest(tokenData.getBytes(StandardCharsets.UTF_8))
    hash.map("%02x".format(_)).mkString
  }
}