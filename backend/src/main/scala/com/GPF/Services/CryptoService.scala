package com.GPF.Services

import sttp.client3._
import sttp.client3.circe._
import io.circe.generic.auto._
import scala.concurrent.{ExecutionContext, Future}

// Case classes for CoinGecko API responses
case class CoinGeckoPriceResponse(usd: Double, usd_24h_change: Double)
case class CoinGeckoOHLCResponse(x: Long, y: List[Double])
case class CoinGeckoCoinDetails(name: String, symbol: String, image: Image)
case class Image(large: String)

class CryptoService(implicit ec: ExecutionContext) {
  private val backend = HttpURLConnectionBackend()

  // Fetch cryptocurrency price
  def getCryptoPrice(cryptoId: String): Future[CoinGeckoPriceResponse] = {
    val request = basicRequest
      .get(uri"https://api.coingecko.com/api/v3/simple/price?ids=$cryptoId&vs_currencies=usd&include_24hr_change=true")
      .response(asJson[Map[String, CoinGeckoPriceResponse]])

    Future {
      val response = request.send(backend)
      response.body.toOption.flatMap(_.get(cryptoId)).getOrElse(throw new RuntimeException("Failed to fetch price"))
    }
  }

  // Fetch OHLC (Open, High, Low, Close) data
  def getCryptoOHLC(cryptoId: String): Future[List[CoinGeckoOHLCResponse]] = {
    val request = basicRequest
      .get(uri"https://api.coingecko.com/api/v3/coins/$cryptoId/ohlc?vs_currency=usd&days=30")
      .response(asJson[List[List[Double]]])

    Future {
      val response = request.send(backend)
      response.body.toOption.map(_.map { item =>
        CoinGeckoOHLCResponse(item(0).toLong, item.slice(1, 5))
      }).getOrElse(throw new RuntimeException("Failed to fetch OHLC data"))
    }
  }

  // Fetch cryptocurrency details
  def getCryptoDetails(cryptoId: String): Future[CoinGeckoCoinDetails] = {
    val request = basicRequest
      .get(uri"https://api.coingecko.com/api/v3/coins/$cryptoId")
      .response(asJson[CoinGeckoCoinDetails])

    Future {
      val response = request.send(backend)
      response.body.toOption.getOrElse(throw new RuntimeException("Failed to fetch coin details"))
    }
  }
}