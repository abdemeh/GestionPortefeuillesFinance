package com.GPF.routes

import akka.http.scaladsl.model.StatusCodes
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import spray.json._
import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport._
import scala.concurrent.ExecutionContext
import scala.util.{Failure, Success}
import com.GPF.Utils.CORSHandler
import com.GPF.Services.CryptoService
import com.GPF.Services.{CoinGeckoPriceResponse, CoinGeckoOHLCResponse, CoinGeckoCoinDetails, Image}

trait CryptoJsonProtocol extends DefaultJsonProtocol {
  implicit val priceResponseFormat: RootJsonFormat[CoinGeckoPriceResponse] = jsonFormat2(CoinGeckoPriceResponse)
  implicit val ohlcResponseFormat: RootJsonFormat[CoinGeckoOHLCResponse] = jsonFormat2(CoinGeckoOHLCResponse)
  implicit val imageFormat: RootJsonFormat[Image] = jsonFormat1(Image)
  implicit val coinDetailsFormat: RootJsonFormat[CoinGeckoCoinDetails] = jsonFormat3(CoinGeckoCoinDetails)
}


// Combined JSON protocols and routes in one file
class CryptoRoutes(cryptoService: CryptoService)(implicit ec: ExecutionContext) extends CORSHandler  with CryptoJsonProtocol {

  // JSON formats for case classes
  

  // Routes
  val routes: Route = withCORS(
    pathPrefix("crypto") {
      concat(
        path("price" / Segment) { cryptoId =>
          get {
            onComplete(cryptoService.getCryptoPrice(cryptoId)) {
              case Success(price) => complete(StatusCodes.OK, price)
              case Failure(ex) =>
                complete(StatusCodes.InternalServerError, s"An error occurred: ${ex.getMessage}")
            }
          }
        },
        path("ohlc" / Segment) { cryptoId =>
          get {
            onComplete(cryptoService.getCryptoOHLC(cryptoId)) {
              case Success(ohlc) => complete(StatusCodes.OK, ohlc)
              case Failure(ex) =>
                complete(StatusCodes.InternalServerError, s"An error occurred: ${ex.getMessage}")
            }
          }
        },
        path("details" / Segment) { cryptoId =>
          get {
            onComplete(cryptoService.getCryptoDetails(cryptoId)) {
              case Success(details) => complete(StatusCodes.OK, details)
              case Failure(ex) =>
                complete(StatusCodes.InternalServerError, s"An error occurred: ${ex.getMessage}")
            }
          }
        }
      )
    }
  )

  // Case classes for CoinGecko API responses
  //case class CoinGeckoPriceResponse(usd: Double, usd_24h_change: Double)
  //case class CoinGeckoOHLCResponse(x: Long, y: List[Double])
  //case class CoinGeckoCoinDetails(name: String, symbol: String, image: Image)
  //case class Image(large: String)
}