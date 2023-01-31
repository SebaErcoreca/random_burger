import dotenv from 'dotenv';
dotenv.config();
import messageManager from './chat.db.services.js';

class WebSocketService {
    websocketInit(io) {
        this.io = io;
        this.io.on('connection', async (socket) => {
            console.log(`Nueva conexión desde el id: ${socket.id}`);

            socket.emit('welcome',{
                welcome: 'Bienvenido al servidor', 
                messages: await messageManager.getMessages()
            });
        
            socket.on('disconnect', (socket) => {
                console.log(`Cierre de conexión`);
            })

            socket.on('newMessage', async (data) => {
                try {
                    const newMessage = await messageManager.createMessage(data);
                    this.io.sockets.emit('message', newMessage);
                } catch (error) {
                    console.log(error);
                }
            })

            socket.on('newUser', (data) => {
                socket.broadcast.emit('newUser', data);
            })

        })
    }
}

const webSocketService = new WebSocketService();

export default webSocketService;

