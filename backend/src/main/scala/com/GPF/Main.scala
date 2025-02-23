package com.GPF

import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.server.Directives._
import scala.concurrent.ExecutionContextExecutor
import scala.io.StdIn

object Main extends App {

  // Set up the Actor system and Materializer
  implicit val system: ActorSystem = ActorSystem("backend-system")
  implicit val executionContext: ExecutionContextExecutor = system.dispatcher

  // Define the route (GET request handler)
  val route =
    path("hello") {
      get {
        complete("Hello, world!")
      }
    }

  // Start the HTTP server
  val bindingFuture = Http().newServerAt("localhost", 8080).bind(route)

  println("Server online at http://localhost:8080/")

  // Wait for termination
  StdIn.readLine()

  // Shutdown the server when done
  bindingFuture
    .flatMap(_.unbind())
    .onComplete(_ => system.terminate())
}
