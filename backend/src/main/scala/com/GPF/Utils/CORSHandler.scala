package com.GPF.Utils 



import akka.http.scaladsl.model.HttpMethods._
import akka.http.scaladsl.model.headers._
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route

trait CORSHandler {
  private val corsResponseHeaders = List(
    `Access-Control-Allow-Origin`.*,
    `Access-Control-Allow-Credentials`(true),
    `Access-Control-Allow-Headers`("Content-Type", "Authorization"),
    `Access-Control-Allow-Methods`(OPTIONS, POST, GET, PUT, DELETE)
  )

  def corsHandler(route: Route): Route = {
    respondWithHeaders(
      `Access-Control-Allow-Origin`.*,
      `Access-Control-Allow-Credentials`(true),
      `Access-Control-Allow-Headers`("Content-Type", "Authorization"),
      `Access-Control-Allow-Methods`(OPTIONS, POST, GET, PUT, DELETE)
    ) {
      route
    }
  }

  def preflightRequestHandler: Route = options {
    complete("OK")
  }

  def withCORS(route: Route): Route = corsHandler {
    preflightRequestHandler ~ route
  }
}