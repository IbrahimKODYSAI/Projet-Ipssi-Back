# Projet-Ipssi-Back

BIGOODEAL est une boutique e-commerce administrable fullstack, réalisée coté client sous react.js et coté back sous node.js.

Le front du site est réalisé en REACT JS pour une fluidité optimale et pour construire des
interfaces utilisateur dynamique, hautement personnalisables et interactives,
REACT-Redux pour un système de centralisation des données et des actions, pour avoir
un state globale pour tout le site. REACT-Router, REACT-responsive-carousel pour le
carousel de la page d’accueil. Axios pour les requêtes vers le back, Stripe pour le système de paiement.

Le back est réalisé en Node JS avec Express, la base de donnée est en MongoDb,
Mongoose pour la gestion de la base donnée.
Nodemailer pour le système de notification, Mongoose pour la gestion des
bases, Bcrypt pour les mots de passe. JsonWebToken pour l’authentification.

Durant ce projet mon objectif était de créer un site web
plaisant pour l’utilisateur que ce soit au niveau de la navigation avec un aspect esthétique,
moderne, léger et très dynamique ou par le contenu et les options que propose le site.
Connexion /inscription , espace personnel , possibilité de commenter les produits , les
achetés, suivre ses commandes, avoir un historique de ses commandes.
Le but était aussi de faire un site internet sécurisé ou les utilisateurs n’auront pas peur
de taper des donnés sensibles comme les cartes de crédit lors d’achats de produits et ou les connexion
seraient sécurisées.

Présentation des fonctionnalités principales du site

● Page d’accueil : accès directe aux produits avec plusieurs sections, un carrousel mettant
en images les offres ou soldes à l’affiche du site, la possibilité d'ajouter des produits dans sa
liste de favoris présent dans l’espace utilisateur (réservé seulement aux utilisateurs)
Possibilité de trier les produits grâce à un menu de navigation qui permettra aux visiteurs de
d’afficher tous les produits spécifique à la catégorie du produit.
Une barre de recherche standard pour effectuer des recherches globales par rapport aux
produits du site qui mène directement à la page du produit.

● Recherche de produit par category, filtre depuis la barre de recherche

● Page Produit: une page par produit avec les infos détaillées (photo, description, nom, titre
etc), possibilité de poster des commentaires dans une section réservée à cet effet, les
commentaires des utilisateurs auront la photo et le pseudo des utilisateurs l’ayant posté,
possibilité de noter le produits, un produit avec un compteur d'évaluations qui témoignera de
sa popularité auprès des utilisateurs.

● Page d’inscription et de connexion : les visiteurs pourront avoir la possibilité de s'inscrire
définir un pseudo pour avoir accès aux fonctionnalités réservées aux utilisateurs connectés
tels que l'achat des produits.

● Compte Personnel : compte perso pour l’utilisateur connecté avec différents onglets, un
onglet avec toutes les informations personnelles, espace Avatar pour télécharger une photo
de profil qui apparaît dans les commentaires postés, un espace réservé aux commandes
passés par l’utilisateur. Un espace gestion réservé aux utilisateurs avec le grade ADMIN
pour la création, la publication, la mise à jour et la suppression de produit, l’admin aura aussi
accès a toute les données du site tels que le chiffre d’affaires réalisé, le nombre de
commande passés, les utilisateurs inscrits.

● Page Contact : Possibilité de contacter les administrateurs du site par le biais d’une page
contact pour signaler des bugs, émettre des demandes ou pour des questions de business.
Les utilisateurs
Bien que le site soit accessible à tout le monde, les fonctionnalités principales du site seront
quant à elles destinées aux utilisateurs inscrits et connectés, les différents types d’utilisateur
auront des droits qui déterminent ce qu’ils peuvent faire ou non.

● Les Visiteurs -
Les visiteurs non connectés pourront consulter tous les produits de la boutique, ils pourront
effectuer des recherches, mais ne pourront pas commenter ces produits et n’auront pas
d’espace utilisateur, seul le panier, la page contact, la page d’accueil et les pages des
produits leur seront accessibles. Ils pourront ajouter des produits au panier mais devront
s'inscrire ou se connecter pour pouvoir les acheter.

● Les Utilisateurs inscrit -
Les utilisateurs inscrits et connectés sur le site auront accès à un espace personnel avec
toutes leurs infos ils auront la possibilité de mettre un avatar en le téléchargeant depuis leur
ordinateur. Ils pourront passer des commandes afin d’acheter des produits Les utilisateurs
avec le grade Admin auront accès à une interface de gestion de contenu qui permettra de
créer les produits avec toutes les spécifications et par la suite pouvoir supprimer ou modifier
ces produits.
