package com.GPF.config

import org.mongodb.scala._
import org.mongodb.scala.model.IndexOptions
import org.mongodb.scala.model.Indexes.ascending
import scala.concurrent.{ExecutionContext, Future}

class DatabaseConfig(implicit ec: ExecutionContext) {
  // MongoDB connection parameters
  private val host = "localhost"
  private val port = 27017
  private val databaseName = "GPF_app"
  private val connectionString = s"mongodb://$host:$port"

  // Create client and database
  val client: MongoClient = MongoClient(connectionString)
  val database: MongoDatabase = client.getDatabase(databaseName)

  // Collection names
  object Collections {
    val Users = "users"
    val Portfolios = "portfolios"
  }


  def initialize(): Future[Unit] = {
  checkConnection().flatMap {
    case true =>
      println(s"✅ Connected to MongoDB at $connectionString")
      resetDatabase().flatMap { _ =>
        println("✅ Database deleted and recreated. Reinitializing collections...")
        ensureCollection(Collections.Users).map { _ =>
          println("✅ Database initialized successfully")
        }
      }
    case false =>
      Future.failed(new Exception("❌ Unable to connect to MongoDB"))
  }
}

  
  // New: Reset the database (delete collections if they exist)
  private def resetDatabase(): Future[Unit] = {
  client.getDatabase("admin").runCommand(Document("dropDatabase" -> 1)).toFuture().map { _ =>
    println("⚠️ Database dropped successfully")
  }.recover {
    case ex: Throwable => println(s"⚠️ Error dropping database: ${ex.getMessage}")
  }.flatMap { _ =>
    // Reconnect to MongoDB (this automatically creates the database again)
    Future {
      database.listCollectionNames() // This triggers recreation
      println("✅ Database recreated")
    }
  }
}

  // Check if MongoDB is running and reachable
  private def checkConnection(): Future[Boolean] = {
    client.listDatabaseNames().toFuture().map(_ => true).recover { case _ => false }
  }

  // Ensure a collection exists, otherwise create it and add a unique index
  private def ensureCollection(name: String): Future[Unit] = {
    database.listCollectionNames().toFuture().flatMap { existingCollections =>
      if (!existingCollections.contains(name)) {
        println(s"⚠️ Collection '$name' not found. Creating it...")
        database.createCollection(name).toFuture().flatMap { _ =>
          println(s"✅ Collection '$name' created successfully")
          addUniqueIndex(database.getCollection(name)) // ✅ Ensure index is created *after* collection
        }
      } else {
        println(s"✅ Collection '$name' already exists")
        addUniqueIndex(database.getCollection(name))
      }
    }
  }

  // Delete all collections before reinitializing
  private def deleteCollections(): Future[Unit] = {
    database.listCollectionNames().toFuture().flatMap { collectionNames =>
      Future.sequence(collectionNames.map { name =>
        println(s"⚠️ Dropping collection: $name...")
        database.getCollection(name).drop().toFuture()
      }).map(_ => println("✅ All collections dropped successfully"))
    }
  }

  // Add a unique index on email to prevent duplicate users
  private def addUniqueIndex(collection: MongoCollection[Document]): Future[Unit] = {
    val indexOptions = IndexOptions().unique(true)
    collection.createIndex(ascending("email"), indexOptions).toFuture().map { _ =>
      println(s"✅ Unique index on 'email' created")
    }.recover {
      case ex: Throwable => println(s"⚠️ Error creating unique index on 'email': ${ex.getMessage}")
    }
  }
}
