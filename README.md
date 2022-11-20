# IRC
Projet d'une communication textuelle sur la console, en temps réel entre plusieurs utilisateurs codé en TypeScript à l'aide du module "Socket.io" présent dans Node.js.

# Implémentation de la base de données 
Lorsque la base de données est bien implémenté (utilisez le fichier 'myirc.sql'), vous devez modifier les informations de la base de données pour que le module mysql puisse se connecter à votre base de données. 
Pour cela, vous devez vous rendre sur le fichier 'index.ts' et modifier cette partie :

```Typescript
const BDconnect = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  port: 3306,
  database: 'myirc'
});
/*Fichier 'index.ts' (Ligne 6 à 12)*/
```
Votre base est désormais implémenté et vous pouvez passer à l'authentification.

# Authentification
Pour vous authentifier, vous devez respecter les flags de la même manière qu'une connection sur mysql :

- ts-node index.ts <nom de l'utilisateur> -p <mot de passe de l'utilsateur> 

Vous êtes désormais connecté ! Je vous souhaite un agréable test.
