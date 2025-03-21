package com.GPF.Services

import com.GPF.config.DatabaseConfig
import com.GPF.models.Portfolio
//import org.mongodb.scala._
//import org.mongodb.scala.bson._
import org.mongodb.scala.{MongoClient, MongoCollection, MongoDatabase}
import org.mongodb.scala.bson.collection.immutable.Document
import org.mongodb.scala.bson.{BsonDateTime, BsonDouble, BsonDocument}
import org.mongodb.scala.model.Filters
import org.mongodb.scala.model.Filters._
import org.mongodb.scala.model.IndexOptions
import org.mongodb.scala.model.Indexes._
import org.mongodb.scala.model.Updates._
import scala.concurrent.{ExecutionContext, Future}
import  java.time.{LocalDateTime , Instant ,ZoneOffset}
import play.api.libs.json._

class PortfolioService(dbConfig: DatabaseConfig)(implicit ec: ExecutionContext) {
  private val portfolioCollection: MongoCollection[Document] = dbConfig.database.getCollection[Document](dbConfig.Collections.Portfolios)

  // Initialize - create unique index on userId
  def initialize(): Future[String] = {
    val indexOptions = IndexOptions()
    portfolioCollection.createIndex(ascending("userId"), indexOptions).toFuture()
  }

  // Convert between MongoDB Document and Portfolio case class
  
  def documentToPortfolio(doc: Document): Portfolio = {
  Portfolio(
    userId = doc.getString("userId"),
    //assets = Json.parse(doc.getString("assets")).as[Map[String,Double]],
    assets = Json.parse(doc.get("assets").get.asDocument().toJson()).as[Map[String, Double]],
    totalValue = doc.getDouble("totalValue"),
    Balance = doc.getDouble("Balance"),
    createdAt = doc.getString("createdAt"),
    updatedAt = doc.getString("updatedAt")
    
  )
  }

  // Create a portfolio
  def createPortfolio(portfolio: Portfolio): Future[Boolean] = {
    val document = Document(
  "userId" -> portfolio.userId,
  //"assets" -> (Json.toJson(portfolio.assets)).toString(),
  "assets" -> BsonDocument(Json.toJson(portfolio.assets).toString()),
  "totalValue" -> portfolio.totalValue,
  "Balance" -> portfolio.Balance,
  "createdAt" -> portfolio.createdAt,
  "updatedAt" -> portfolio.updatedAt
)
    portfolioCollection.insertOne(document).toFuture().map(_ => true).recover { case _ => false }
  }

  /* // Retrieve portfolio by userId
  def getPortfolioByUserId(userId: String): Future[Option[Portfolio]] = {
    println("getPortfolioByUserId" + userId)
    portfolioCollection.find(equal("userId", userId)).first().toFutureOption().map(_.map(documentToPortfolio))
  } */

  def getPortfolioByUserId(userId: String): Future[Option[Portfolio]] = {
  println(s"Fetching portfolio for userId: $userId")
  
  // Debug: Print the query being executed
  val query = equal("userId", userId)
  println(s"Executing query: $query")

  portfolioCollection
    .find(query)
    .first()
    .toFutureOption()
    .map { documentOption =>
      //println(s"Query result: $documentOption")
      documentOption.map(documentToPortfolio)
    }
    .recover {
      case ex: Exception =>
        println(s"Error fetching portfolio: ${ex.getMessage}")
        None
    }
}

  // Update portfolio
  def updatePortfolio(userId: String, portfolio: Portfolio): Future[Boolean] = {
    val update = combine(
      set("assets", portfolio.assets),
      set("totalValue", portfolio.totalValue),
      set("Balance", portfolio.Balance),
      set("updatedAt", portfolio.updatedAt.toString)
    )
    portfolioCollection.updateOne(equal("userId", userId), update).toFuture().map(_.wasAcknowledged())
  }

  // Delete portfolio
  def deletePortfolio(userId: String): Future[Boolean] = {
    portfolioCollection.deleteOne(equal("userId", userId)).toFuture().map(_.wasAcknowledged())
  }
}
