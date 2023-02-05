import dotenv from 'dotenv';
dotenv.config();
import messageManager from './chat.db.services.js';

class WebSocketService {
    websocketInit(io) {
        this.io = io;
        this.io.on('connection', async (socket) => {
            console.log(`New connection id: ${socket.id}`);

            socket.emit('welcome',{
                welcome: 'Welcome to the server', 
                messages: await messageManager.getMessages()
            });
        
            socket.on('disconnect', (socket) => {
                console.log(`Connection ended`);
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