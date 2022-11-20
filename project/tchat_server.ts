import { Server } from "socket.io"
import  User  from "./user"
  /* Création du serveur */
  const io = new Server(3000);
  console.log('Démarage du serveur sur le port 3000\n');

  /* repertoire des rooms */
  let rooms: string[] = ["main"] ;
  let users: User[] = []; 
  
  /*Détection d'une connection d'un socket (envoi le message ci-dessous dans ce cas)*/
  io.on("connection",(socket) => { 
    socket.broadcast.emit('Un utilisateur s\'est connecté\n');
    
    /*la room par défaut*/
    socket.on("default_room", (user_name) => {
      /*enregistrement de la rooom et de l'utilisateur par le serveur*/
      let newUser: User = {name: user_name, current_room: "main", socket_id: socket.id}; 
      users.push(newUser);
      /*Rejoins la room 'main'*/
      socket.join("main");
      socket.to("main").emit("display_message", user_name + " a rejoint la room 'main'");
    });
    
    /*changer de room (créer si elle n'existe pas)*/
    socket.on("join_room", (room, user_name) => {
      if(rooms.indexOf(room) != -1){
        socket.join(room);
        for (let i = 0; i < users.length; i++){
          if(users[i].name === user_name){
            socket.leave(users[i].current_room);
            socket.to(users[i].current_room).emit("display_message_quit", user_name + " a quitté la room ");
            users[i].current_room = room;
          }
        }
        socket.to(room).emit("display_message", user_name + " a rejoint la room '" + room + "'\n");
      }else{
        rooms.push(room)
        socket.join(room);
        for (let i = 0; i < users.length; i++){
          if(users[i].name === user_name){
            socket.to(users[i].current_room).emit("display_message_quit", user_name + " a quitté la room \n");
            socket.leave(users[i].current_room);
            users[i].current_room = room;
          }
        }
        socket.to(room).emit("display_message", user_name + " a rejoint la room '" + room + "'\n");
      }
    });

    /*Envoi d'un message privé*/
    socket.on("private_message", (user_name, dest_name , message) => {
      for (let i = 0; i < users.length; i++){
        if(users[i].name === dest_name){
          socket.to(users[i].socket_id).emit("display_private_message", user_name, message);
        }
      }
    });

    /*Réception des messages*/
    socket.on("message", (arg, user_name) => {
      /*Renvoi du message pour les autres utilisateurs*/
      for (let i = 0; i < users.length; i++){
        if(users[i].name === user_name){
          socket.to(users[i].current_room).emit("display_message", arg);
        }
      }
    });

    /*Liste toutes les rooms disponibles*/
    socket.on("check_rooms", () => {
        socket.emit('display_room', rooms);
    });

    /*Liste tout les utilisateurs connectés*/
    socket.on("check_users", () => {
      socket.emit('display_users',users);
    });

    /*Deconnexion*/
    socket.on("disconnect", () =>{
      for (let i = 0; i < users.length; i++){
        if(users[i].socket_id === socket.id){
         users.splice(i,1);
        }
      }
    });
    
});
  

