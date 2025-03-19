package com.GPF.models

import play.api.libs.json.{Json,OFormat}
//import org.mongodb.scala.bson.BSONObjectID
import java.time.LocalDateTime

case class Portfolio(
  //_id: Option[BSONObjectID] = Some(BSONObjectID.generate()),
  userId: String, // Stocker l'ID utilisateur en tant que String (UUID ou ObjectId)
  assets: Map[String, Double], // Clé : nom de l'actif, Valeur : quantité
  totalValue: Double,
  Balance : Double,
  createdAt: String,
  updatedAt: String
)

// JSON Formats pour Play JSON et MongoDB
object Portfolio {
  implicit val portfolioFormat: OFormat[Portfolio] = Json.format[Portfolio]
}
