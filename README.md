# IRC
Projet d'une communication textuelle sur la console, en temps réel entre plusieurs utilisateurs codé en TypeScript à l'aide du module "Socket.io" présent dans Node.js.

# Authentification 
L'authentification se fait en suivant celui de système tel que mysql. Il faut avoir préalablement créer la base de données et la table concerné (fichier disponible dans le repository). Pour pouvoir se connecter, vous devez utiliser les flag -u (pour user/utilisateur) et -p (password/mot de passe). Il est utiliser de la manière suivante : 

- ts-node index.ts -u <nom de l'utilisateur dans la base de donénes> -p <mot de passe de l'utilsateur dans la base de données>.
