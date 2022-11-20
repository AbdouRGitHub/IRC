import { io } from "socket.io-client";
const readline = require('readline');

export default function tchat_client(user_name: string){
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  const socket = io('ws://localhost:3000');
  console.log("\x1b[32m",'Bienvenue sur le tchat << MyIRC_project >>\n',"\x1b[37m");

  console.log("\tVous pouvez désormez envoyer des messages\n\n\t\t========= MENU =========");
  console.log("\x1b[35m");
  console.log("\n\tPour afficher les rooms:\n--get_rooms");
  console.log("\n\tPour afficher les utilisateurs connectés:\n--get_users");
  console.log("\n\tPour créer/rejoindre une room:\n--join <nom_room>");
  console.log("\n\tPour envoyer un message privé:\n--mp <nom_destinataire> <message>");
  console.log("\x1b[37m");
  console.log("\t\t========================");

  
  socket.on("connect", () => {
    socket.emit("default_room", user_name);
    rl.on('line',(reponse: any) => {
      let cli_line: string = reponse.split(' ');
      if (cli_line[0] === '--join'){
        socket.emit("join_room", cli_line[1], user_name);
      }else if (cli_line[0] === '--get_rooms'){
        socket.emit("check_rooms");
      }else if(cli_line[0] === '--mp'){
        socket.emit("private_message", user_name, cli_line[1], cli_line[2]);
      }else if(cli_line[0] === '--get_users'){
        socket.emit("check_users");
      }else {
        socket.emit("message", user_name + ' : ' + reponse, user_name);
      }
    });
    
    /*Réception des messages*/
    socket.on("display_message", (arg) => {
      console.log("\x1b[33m" + arg + "\x1b[37m");
    });

    /*Réception des messages*/
    socket.on("display_private_message", (user_name, arg) => {
      console.log("\x1b[34m" + user_name +' : ' + arg + "\x1b[37m");
    });

    /*Réception des messages où l'utilisateur quitte une room*/
    socket.on("display_message_quit", (arg) => {
      console.log("\x1b[31m" + arg + "\x1b[37m");
    });

    /*Affichage des rooms disponibles*/
    socket.on('display_room', (arg) => {
      console.log('==========');
      for (let i = 0; i < arg.length; i++) {
        console.log ('= ' + arg[i] + ' =');
      }
      console.log('==========');
    });

    /*Afficher les utilisateurs*/
    socket.on('display_users', (arg) => {
      console.log('==========');
      for (let i = 0; i < arg.length; i++) {
        console.log ('= ' + arg[i].name + ' =');
      }
      console.log('==========');
    });
  });
}