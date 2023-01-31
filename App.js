import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import './src/config/db.js'
import router from './src/routers/index.router.js'
import { create } from 'express-handlebars';
import { Server } from 'socket.io';
import webSocketService from './src/services/websocket.services.js';
import {paginationUrl} from './src/utils/helpers.js';

const hbs = create({
    helpers: {
        paginationUrl,
    }
});

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('src/public'));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', 'src/views');

app.use(router);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`🚀 Server started on http://localhost:${PORT}`)
})
server.on('error', (err) => console.log(err));

const io = new Server(server);
webSocketService.websocketInit(io);