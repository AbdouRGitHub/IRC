/*créer une interface user pour contenir les informations sur l'utilisateur et le réutiliser facilement*/

export default interface User{
    name: string;
    current_room: string,
    socket_id: string;
}