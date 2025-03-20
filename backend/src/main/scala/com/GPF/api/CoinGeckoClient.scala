package com.finance.api

import akka.actor.typed.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.model._
import akka.http.scaladsl.model.headers.RawHeader
import spray.json.DefaultJsonProtocol._
import spray.json._
import scala.concurrent.Future
import scala.concurrent.duration._

class CoinGeckoClient(implicit system: ActorSystem[_]) {
  import system.executionContext

  private val baseUrl = "https://api.coingecko.com/api/v3"
  private val apiKey = "CG-vUDgwZ1NPfRjKWNE3Q9EQU8a"

  // Récupère le prix actuel d'une cryptomonnaie
  def fetchPrice(cryptoId: String): Future[Double] = {
    val url = s"$baseUrl/simple/price?ids=$cryptoId&vs_currencies=usd"
    val request = HttpRequest(
      uri = url,
      headers = List(RawHeader("x-cg-api-key", apiKey))
    )

    Http().singleRequest(request)
      .flatMap(_.entity.toStrict(5.seconds))
      .map(_.data.utf8String.parseJson.asJsObject)
      .map(_.fields(cryptoId).asJsObject.fields("usd").convertTo[Double])
  }

  // Récupère l'historique des prix d'une cryptomonnaie sur un nombre de jours donné
  def fetchPriceHistory(cryptoId: String, days: Int): Future[List[(String, Double)]] = {
    val url = s"$baseUrl/coins/$cryptoId/market_chart?vs_currency=usd&days=$days&interval=daily"
    val request = HttpRequest(
      uri = url,
      headers = List(RawHeader("x-cg-api-key", apiKey))
    )

    Http().singleRequest(request)
      .flatMap(_.entity.toStrict(5.seconds))
      .map(_.data.utf8String.parseJson.asJsObject)
      .map(_.fields("prices").convertTo[List[List[Double]]])
      .map(_.map { case List(timestamp, price) =>
        val date = new java.text.SimpleDateFormat("yyyy-MM-dd")
          .format(new java.util.Date(timestamp.toLong))
        (date, price)
      })
  }

  // Récupère les prix actuels de plusieurs cryptomonnaies
  def fetchMultiplePrices(cryptoIds: List[String]): Future[Map[String, Double]] = {
    val ids = cryptoIds.mkString(",")
    val url = s"$baseUrl/simple/price?ids=$ids&vs_currencies=usd"
    val request = HttpRequest(
      uri = url,
      headers = List(RawHeader("x-cg-api-key", apiKey))
    )

    Http().singleRequest(request)
      .flatMap(_.entity.toStrict(5.seconds))
      .map(_.data.utf8String.parseJson.asJsObject)
      .map(_.fields.map {
        case (cryptoId, data) =>
          cryptoId -> data.asJsObject.fields("usd").convertTo[Double]
      })
  }

  // Récupère l'historique des prix (sur un nombre de jours donné) pour plusieurs cryptomonnaies
  def fetchPriceHistories(cryptoIds: List[String], days: Int): Future[Map[String, List[(String, Double)]]] = {
    val futures = cryptoIds.map { cryptoId =>
      fetchPriceHistory(cryptoId, days).map(history => cryptoId -> history)
    }
    Future.sequence(futures).map(_.toMap)
  }
}
