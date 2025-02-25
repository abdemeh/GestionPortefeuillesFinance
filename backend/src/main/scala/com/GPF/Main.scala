package GPF

import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.server.Directives._
import com.GPF.config.DatabaseConfig
import com.GPF.routes.UserRoutes
import com.GPF.Services.UserService
import scala.concurrent.{ExecutionContextExecutor, Future}
import scala.io.StdIn
import scala.util.{Failure, Success}

object Main extends App {
  // Set up the Actor system and ExecutionContext
  implicit val system: ActorSystem = ActorSystem("backend-system")
  implicit val executionContext: ExecutionContextExecutor = system.dispatcher

  // Initialize database and services
  val dbConfig = new DatabaseConfig()
  val userService = new UserService(dbConfig)

  // Start the HTTP server immediately
  //startHttpServer()

  // Initialize database asynchronously
  val initialization = for {
    _ <- dbConfig.initialize()
    _ <- userService.initialize()
  } yield ()

  initialization.onComplete {
    case Success(_) =>
      println("✅ Database initialized successfully")
      println("🔨 Starting HTTP Server")
    case Failure(ex) =>
      println(s"❌ Failed to initialize database: ${ex.getMessage}")
  }

  startHttpServer()


  def startHttpServer(): Unit = {
    val userRoutes = new UserRoutes(userService)

    val route =
      pathPrefix("api") {
        concat(
          path("hello") {
            get {
              complete("Hello, world!")
            }
          },
          userRoutes.routes
        )
      }

    val bindingFuture = Http().newServerAt("localhost", 8080).bind(route)

    println("🚀 Server online at http://localhost:8080/")
    println("🔐 Auth endpoints:")
    println("- POST http://localhost:8080/api/auth/login")
    println("- POST http://localhost:8080/api/auth/register")

    // Wait for termination
    StdIn.readLine()

    // Shutdown the server
    bindingFuture
      .flatMap(_.unbind())
      .onComplete(_ => system.terminate())
  }
}
