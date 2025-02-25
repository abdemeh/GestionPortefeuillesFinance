name := "GPF-backend"

version := "0.1"

scalaVersion := "2.13.16"

libraryDependencies ++= Seq(
  "com.typesafe.akka" %% "akka-http" % "10.2.9",
  "com.typesafe.akka" %% "akka-http-spray-json" % "10.2.9",
  "com.typesafe.akka" %% "akka-actor-typed" % "2.6.19",
  "com.typesafe.akka" %% "akka-stream" % "2.6.19",
  "org.mongodb.scala" %% "mongo-scala-driver" % "4.4.0",
  "com.github.t3hnar" %% "scala-bcrypt" % "4.3.0"   // For password hashing


)
