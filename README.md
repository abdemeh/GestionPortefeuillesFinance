# GPF - Gestion de Portefeuilles Financiers

## 📌 Introduction
GPF (Gestion de Portefeuilles Financiers) est une application permettant aux utilisateurs de gérer leurs portefeuilles financiers de manière sécurisée et efficace. Ce projet comprend un backend en **Scala** avec **MongoDB** et un frontend basé sur des technologies modernes.

## 🏗️ Architecture du Projet
- **Backend :** Développé en **Scala** avec le framework **Akka HTTP** et utilisant **MongoDB** comme base de données.
- **Frontend :** Développé avec **React.js** et **TailwindCSS** pour une interface utilisateur moderne et réactive.
- **Base de données :** MongoDB stocke les utilisateurs et leurs données financières.

## 🚀 Fonctionnalités principales
✅ Gestion des utilisateurs (inscription, connexion, authentification sécurisée)  
✅ Gestion des portefeuilles financiers (ajout, mise à jour, suppression)  
✅ Sécurité renforcée avec des **index uniques** pour éviter les doublons  
✅ API REST performante avec gestion des erreurs  
✅ Interface utilisateur réactive et moderne  

## 📂 Structure du Projet
```
GPF
│── backend/                      # Serveur backend en Scala
│   ├── src/main/scala/com/GPF/   # Code source Scala
│   ├── src/main/resources/       # Configuration
│   ├── build.sbt                 # Dépendances Scala
│   └── README.md                  # Infos backend
│
│── frontend/                     # Application frontend React
│   ├── src/                      # Code source React
│   ├── public/                   # Fichiers statiques
│   ├── package.json              # Dépendances frontend
│   └── README.md                 # Infos frontend
│
└── README.md                     # Documentation principale
```

## 🛠️ Installation et Configuration
### 1️⃣ Prérequis
- **Node.js** (pour le frontend)
- **Scala & SBT** (pour le backend)
- **MongoDB** (base de données)

### 2️⃣ Installation du Backend
```sh
cd backend
sbt compile
sbt run
```

### 3️⃣ Installation du Frontend (To be added later)
```sh
cd frontend
npm install
npm start
```

## 🔍 Gestion de la Base de Données
### Réinitialisation de la Base de Données
Le backend recrée les collections et ajoute des **index uniques** à chaque démarrage.

## 🛡️ Sécurité
- **Index unique** sur les emails et noms d'utilisateur
- **Gestion des erreurs MongoDB** pour éviter les conflits
- **Authentification sécurisée** avec JWT (JSON Web Token)

## 📧 Contact
Contribiteur_1 : **Mohamed Limam LIMAM**  
Email : [mohamedlimamuia@gmail.com](mailto:mohamedlimamua@gmail.com)  
LinkedIn : [www.linkedin.com/in/mohamedlimam](https://www.linkedin.com/in/mohamedlimam)

Contribiteur_2 : **Abdellatif EL MAHDAOUI**  
Email : [abdellatif.elmahdaoui@gmail.com](mailto:abdellatif.elmahdaoui@gmail.com)  
LinkedIn : [www.linkedin.com/in/elmahdaoui](https://www.linkedin.com/in/elmahdaoui)

---
🚀 **GPF - Gérez vos finances avec confiance !**
