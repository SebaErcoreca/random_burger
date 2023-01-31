import MessageModel from "../dao/models/message.model.js";

class MessageManager {

    async createMessage(data) {
        try {
            const newMessage = await MessageModel.create(data);
            return newMessage;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getMessages() {
        try {
            const messages = await MessageModel.find().lean();
            return messages;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

const messageManager = new MessageManager();
export default messageManager;