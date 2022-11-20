import tchat_client from "./tchat_client";
/*utilisation de mysql*/
const mysql = require('mysql');

/*info de la base de données*/
const BDconnect = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  port: 3306,
  database: 'myirc'
});

if (process.argv[2] === '-u' && process.argv[4] === '-p') {
  BDconnect.connect();
  /*Vérification du login et mot de passe*/
  BDconnect.query('SELECT * FROM user WHERE user_name = ? AND password = ?',[process.argv[3], process.argv[5]], function(error : any, results : any){
    if (error) {
      console.error('Erreur lors de la connection ( ' + error + ' )');
      BDconnect.end();
    }else if(results.length != 0){
      tchat_client(process.argv[3]);
      BDconnect.end();
    }else{
      console.log('Identifiant incorrect');
      BDconnect.end();
    }
  });
}else if (process.argv[2] === '--register') {
  BDconnect.connect();
  BDconnect.query('INSERT INTO user (user_name, password) VALUES (?, ?)',[process.argv[3], process.argv[4]], function(error: any){
    if (error){
      console.log('Erreur au niveau de l\'inscription (' + error + ')');
      BDconnect.end();
    }else{
      console.log('vous êtes inscrit');
      BDconnect.end();
    }  
  });
}else{
  console.log("Mauvais/Aucun flag utilisé (suivre la méthode d\'authentification de mysql)");
}