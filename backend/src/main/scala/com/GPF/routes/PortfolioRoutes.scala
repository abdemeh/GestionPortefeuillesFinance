package com.GPF.routes

import akka.http.scaladsl.model.StatusCodes
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import com.GPF.models.Portfolio
import com.GPF.services.PortfolioService
import spray.json._
import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport._
import scala.concurrent.{ExecutionContext, Future}
import scala.util.{Failure, Success}

trait PortfolioJsonProtocol extends DefaultJsonProtocol {
  implicit val portfolioFormat: RootJsonFormat[Portfolio] = jsonFormat6(Portfolio)
}

class PortfolioRoutes(portfolioService: PortfolioService)(implicit ec: ExecutionContext) extends PortfolioJsonProtocol {

  val routes: Route = pathPrefix("portfolio") {
    concat(
      // Create portfolio
      path("create") {
        post {
          entity(as[Portfolio]) { portfolio =>
            onComplete(portfolioService.createPortfolio(portfolio)) {
              case Success(true)  => complete(StatusCodes.Created, "Portfolio created successfully")
              case Success(false) => complete(StatusCodes.InternalServerError, "Portfolio creation failed")
              case Failure(ex)    => complete(StatusCodes.InternalServerError, s"Error: ${ex.getMessage}")
            }
          }
        }
      },
      
      // Retrieve portfolio by userId
      path("get" / Segment) { userId =>
        get {
          onComplete(portfolioService.getPortfolioByUserId(userId)) {
            case Success(Some(portfolio)) => complete(StatusCodes.OK, portfolio.toJson)
            case Success(None)            => complete(StatusCodes.NotFound, "Portfolio not found")
            case Failure(ex)              => complete(StatusCodes.InternalServerError, s"Error: ${ex.getMessage}")
          }
        }
      },
      
      // Update portfolio
      path("update" / Segment) { userId =>
        put {
          entity(as[Portfolio]) { portfolio =>
            onComplete(portfolioService.updatePortfolio(userId, portfolio)) {
              case Success(true)  => complete(StatusCodes.OK, "Portfolio updated successfully")
              case Success(false) => complete(StatusCodes.NotFound, "Portfolio not found")
              case Failure(ex)    => complete(StatusCodes.InternalServerError, s"Error: ${ex.getMessage}")
            }
          }
        }
      },
      
      // Delete portfolio
      path("delete" / Segment) { userId =>
        delete {
          onComplete(portfolioService.deletePortfolio(userId)) {
            case Success(true)  => complete(StatusCodes.OK, "Portfolio deleted successfully")
            case Success(false) => complete(StatusCodes.NotFound, "Portfolio not found")
            case Failure(ex)    => complete(StatusCodes.InternalServerError, s"Error: ${ex.getMessage}")
          }
        }
      }
    )
  }
}
