import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.model.HttpRequest
import akka.http.scaladsl.unmarshalling.Unmarshal
import akka.stream.Materializer
import scala.concurrent.{ExecutionContextExecutor, Future}

object AlphaVantageTest extends App {
  implicit val system: ActorSystem = ActorSystem("alpha-vantage-system")
  implicit val materializer: Materializer = Materializer(system)
  implicit val ec: ExecutionContextExecutor = system.dispatcher

  // Remplacez par votre clé API Alpha Vantage
  val apiKey = "1LXG7VJFWMP0DQF1"
  val symbol = "MSFT" // symbole de Microsoft
  // Exemple d'appel à l'API pour récupérer la série temporelle journalière
  val alphaVantageUrl = s"https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=$symbol&apikey=$apiKey"

  val responseFuture: Future[String] = for {
    response <- Http().singleRequest(HttpRequest(uri = alphaVantageUrl))
    entity   <- Unmarshal(response.entity).to[String]
  } yield entity

  responseFuture.onComplete { result =>
    println(s"Réponse d'Alpha Vantage pour $symbol : $result")
    system.terminate()
  }
}
