import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.model.HttpRequest
import akka.http.scaladsl.unmarshalling.Unmarshal
import akka.stream.Materializer
import scala.concurrent.{ExecutionContextExecutor, Future}

object CoinGeckoTest extends App {
  implicit val system: ActorSystem = ActorSystem("coin-gecko-system")
  implicit val materializer: Materializer = Materializer(system)
  implicit val ec: ExecutionContextExecutor = system.dispatcher

  // URL de l'API CoinGecko pour obtenir le prix actuel du Bitcoin en USD
  val coinGeckoUrl = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"

  // Envoi de la requête HTTP
  val responseFuture: Future[String] = for {
    response <- Http().singleRequest(HttpRequest(uri = coinGeckoUrl))
    entity <- Unmarshal(response.entity).to[String]
  } yield entity

  // Affichage du résultat
  responseFuture.onComplete { result =>
    println(s"Réponse de CoinGecko : $result")
    system.terminate()
  }
}

