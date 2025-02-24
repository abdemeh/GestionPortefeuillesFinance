package com.GPF

import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.server.Directives._
import com.GPF.routes.UserRoutes

import scala.concurrent.ExecutionContextExecutor
import scala.io.StdIn

object Main extends App {

  // Set up the Actor system and Materializer
  implicit val system: ActorSystem = ActorSystem("backend-system")
  implicit val executionContext: ExecutionContextExecutor = system.dispatcher

  // UserRoutes
  val userRoutes = new UserRoutes()


  // Define the route (GET request handler)
  // Combine all routes
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

  // Start the HTTP server
  val bindingFuture = Http().newServerAt("localhost", 8080).bind(route)

  println("Server online at http://localhost:8080/")
  println("Auth endpoints:")
  println("- POST http://localhost:8080/api/auth/login")
  println("- POST http://localhost:8080/api/auth/register")

  // Wait for termination
  StdIn.readLine()

  // Shutdown the server when done
  bindingFuture
    .flatMap(_.unbind())
    .onComplete(_ => system.terminate())
}