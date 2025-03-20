import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.model._
import akka.stream.Materializer
import spray.json._

import scala.concurrent.{ExecutionContextExecutor, Future}
import scala.util.{Failure, Success}

// Définition des classes pour mapper les données JSON
case class Asset(
                  id: String,
                  name: String,
                  symbol: String,
                  market_cap: Option[BigDecimal],
                  price_change_percentage_24h: Option[Double]
                )

case class Company(
                    symbol: String,
                    name: String,
                    market_cap: Option[BigDecimal],
                    price_change_percentage_24h: Option[Double]
                  )

case class Resource(
                     name: String,
                     market_cap: Option[BigDecimal]
                   )

// Spray JSON pour convertir entre JSON et Scala
object AssetJsonProtocol extends DefaultJsonProtocol {
  implicit val assetFormat: RootJsonFormat[Asset] = jsonFormat5(Asset)
  // Utilisation de ListFormat pour Seq[Asset]
  implicit val assetSeqFormat: RootJsonFormat[Seq[Asset]] = new RootJsonFormat[Seq[Asset]] {
    def write(assets: Seq[Asset]): JsValue = JsArray(assets.map(assetFormat.write).toVector)

    def read(value: JsValue): Seq[Asset] = value match {
      case JsArray(elements) => elements.map(_.convertTo[Asset])
      case _ => throw new DeserializationException("Expected JsArray")
    }
  }
}

object CompanyJsonProtocol extends DefaultJsonProtocol {
  implicit val companyFormat: RootJsonFormat[Company] = jsonFormat4(Company)
}

object ResourceJsonProtocol extends DefaultJsonProtocol {
  implicit val resourceFormat: RootJsonFormat[Resource] = jsonFormat2(Resource)
}

object AssetFetcherV2 extends App {
  import AssetJsonProtocol._
  import CompanyJsonProtocol._
  import ResourceJsonProtocol._

  implicit val system: ActorSystem = ActorSystem()
  implicit val materializer: Materializer = Materializer(system)
  implicit val executionContext: ExecutionContextExecutor = system.dispatcher

  val coingeckoApiUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=250&page=1"
  val alphavantageApiUrl = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol="

  // Fonction pour récupérer les données JSON depuis CoinGecko (cryptos)
  def fetchAssets(): Future[Seq[Asset]] = {
    Http().singleRequest(HttpRequest(uri = coingeckoApiUrl)).flatMap { response =>
      response.entity.dataBytes.runFold("")(_ + _.utf8String).map { data =>
        data.parseJson.convertTo[Seq[Asset]] // Conversion JSON -> Seq[Asset]
      }
    }
  }

  // Fonction pour récupérer les données des sociétés depuis Alpha Vantage
  // Fonction pour récupérer les données des sociétés depuis Alpha Vantage
  def fetchCompanyData(symbol: String): Future[Option[Company]] = {
    val url = s"$alphavantageApiUrl$symbol&apikey=1LXG7VJFWMP0DQF1"
    Http().singleRequest(HttpRequest(uri = url)).flatMap { response =>
      response.entity.dataBytes.runFold("")(_ + _.utf8String).map { data =>
        // Parse le JSON et renvoie l'objet Company si la réponse est valide
        val parsedData = data.parseJson.asJsObject
        parsedData.fields.get("Global Quote").flatMap { quote =>
          val symbol = quote.asJsObject.fields.get("01. symbol").collect { case JsString(s) => s }.getOrElse("")
          val marketCap = quote.asJsObject.fields.get("05. price").collect { case JsString(m) => BigDecimal(m) }

          val performance = quote.asJsObject.fields.get("10. change percent") match {
            case Some(jsValue: JsString) =>
              jsValue.value.replace("%", "").toDoubleOption // Convertir en Double après avoir retiré le "%"
            case Some(_) =>
              None // Si ce n'est pas un JsString, on retourne None
            case None =>
              None // Si la clé "ChangePercent" n'existe pas
          }

          // Création de l'objet Company avec les données récupérées
          Some(Company(symbol, symbol, marketCap, performance))
        }
      }
    }
  }


  // Fonction pour récupérer la meilleure ressource naturelle (via Alpha Vantage ou autre source API)
  def fetchResource(): Future[Option[Resource]] = {
    // Exemple fictif de récupération de ressource naturelle. Remplacer par une vraie source API si nécessaire.
    Future.successful(Some(Resource("Oil", Some(BigDecimal("20000000000"))))) // Exemple
  }

  // Filtrage des top 4 cryptos par capitalisation boursière
  def getTopCryptos(assets: Seq[Asset]): Seq[Asset] = {
    assets.sortBy(_.market_cap.getOrElse(BigDecimal(0)))(Ordering[BigDecimal].reverse).take(4)
  }

  // Filtrage des 5 meilleures sociétés par capitalisation boursière
  def getTopCompanies(companies: Seq[Company]): Seq[Company] = {
    companies.sortBy(_.market_cap.getOrElse(BigDecimal(0)))(Ordering[BigDecimal].reverse).take(5)
  }

  // Filtrage des meilleurs performeurs (top 2) et pires performeurs (bottom 2)
  def getTopPerformers(assets: Seq[Asset]): Seq[Asset] = {
    assets.sortBy(_.price_change_percentage_24h.getOrElse(0.0))(Ordering[Double].reverse).take(2)
  }

  def getWorstPerformers(assets: Seq[Asset]): Seq[Asset] = {
    assets.sortBy(_.price_change_percentage_24h.getOrElse(0.0)).take(2)
  }

  // Filtrage des sociétés les plus performantes et les moins performantes
  def getTopCompaniesPerformers(companies: Seq[Company]): Seq[Company] = {
    companies.sortBy(_.price_change_percentage_24h.getOrElse(0.0))(Ordering[Double].reverse).take(2)
  }

  def getWorstCompaniesPerformers(companies: Seq[Company]): Seq[Company] = {
    companies.sortBy(_.price_change_percentage_24h.getOrElse(0.0)).take(2)
  }

  // Appel principal pour récupérer les données et afficher les résultats
  for {
    assets <- fetchAssets()
    topCryptos = getTopCryptos(assets)
    topCryptosPerformers = getTopPerformers(topCryptos)
    worstCryptosPerformers = getWorstPerformers(topCryptos)

    companyData <- Future.sequence(Seq("TSLA", "MSFT", "AAPL", "GOOGL", "AMZN").map(fetchCompanyData)) // Symboles pour Tesla, Microsoft, etc.
    topCompanies = getTopCompanies(companyData.flatten)
    topCompaniesPerformers = getTopCompaniesPerformers(topCompanies)
    worstCompaniesPerformers = getWorstCompaniesPerformers(topCompanies)

    resource <- fetchResource()
  } yield {
    println("=== 4 cryptos avec la plus grande capitalisation boursière ===")
    topCryptos.foreach { asset =>
      println(s"${asset.name} (${asset.symbol}): Market Cap = ${asset.market_cap.getOrElse(0)}")
    }

    println("\n=== Top 2 cryptos les plus performants sur 24h ===")
    topCryptosPerformers.foreach { asset =>
      println(s"${asset.name} (${asset.symbol}): Performance = ${asset.price_change_percentage_24h.getOrElse(0.0)}%")
    }

    println("\n=== Bottom 2 cryptos les moins performants sur 24h ===")
    worstCryptosPerformers.foreach { asset =>
      println(s"${asset.name} (${asset.symbol}): Performance = ${asset.price_change_percentage_24h.getOrElse(0.0)}%")
    }

    println("\n=== 5 sociétés les plus grandes par capitalisation boursière ===")
    topCompanies.foreach { company =>
      println(s"${company.name} (${company.symbol}): Market Cap = ${company.market_cap.getOrElse(0)}")
    }

    println("\n=== Top 2 sociétés les plus performantes sur 24h ===")
    topCompaniesPerformers.foreach { company =>
      println(s"${company.name} (${company.symbol}): Performance = ${company.price_change_percentage_24h.getOrElse(0.0)}%")
    }

    println("\n=== Bottom 2 sociétés les moins performantes sur 24h ===")
    worstCompaniesPerformers.foreach { company =>
      println(s"${company.name} (${company.symbol}): Performance = ${company.price_change_percentage_24h.getOrElse(0.0)}%")
    }

    println("\n=== Meilleure ressource naturelle ===")
    resource.foreach { res =>
      println(s"${res.name}: Market Cap = ${res.market_cap.getOrElse(0)}")
    }

    // Terminer le système d'acteurs
    system.terminate()
  }

  // Gestion des erreurs
  fetchAssets().onComplete {
    case Success(_) => // Rien de plus à faire
    case Failure(exception) =>
      println(s"Erreur lors de la récupération des données : ${exception.getMessage}")
      system.terminate()
  }
}
