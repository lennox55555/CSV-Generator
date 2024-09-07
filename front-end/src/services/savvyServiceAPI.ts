import { addDoc, collection, doc, getDocs, getFirestore, orderBy, query } from "firebase/firestore";
import UserServiceAPI from "./userServiceAPI"
import { db } from "../firebase/firebase-init";


class SavvyServiceAPI {
    private static instance: SavvyServiceAPI;

    private constructor() { }

    public static getInstance(): SavvyServiceAPI {

        if (!SavvyServiceAPI.instance) {
            SavvyServiceAPI.instance = new SavvyServiceAPI();
        }

        return SavvyServiceAPI.instance;
    }

    public async saveMessage(userId: string, message: string, sentByUser: boolean) {

        try {
            const userMessageRef = collection(doc(db, 'users', userId), 'messages');
            const messageDoc = await addDoc(userMessageRef, {
                text: message,
                user: sentByUser,
                timestamp: new Date(),
            });
            console.log('Message saved:', messageDoc.id)
        } catch (error) {
            console.error("Error saving message:", error);
            throw error;
        }
    }

    public async getMessages(userId: string) {

        try {
            const userMessagesRef = collection(doc(db, "users", userId), "messages");
            const q = query(userMessagesRef, orderBy("timestamp"));
            const querySnapshot = await getDocs(q);

            const messages = querySnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    text: data.text || '', 
                    user: data.user || false,
                };
            });

            return messages;
        } catch (error) {
            console.error("Error getting messages:", error);
            throw error;
        }

<<<<<<< Updated upstream
=======
    public initializeWebSocket(onMessageReceived: (data: any) => void, userQuery: string): void {
        const wsUrl = 'wss://9f2wyu1469.execute-api.us-east-1.amazonaws.com/production/';
        const queries = [userQuery]; // The specific query to send
        this.webSocket = new WebSocket(wsUrl);

        this.webSocket.onopen = () => {
            console.log('WebSocket connection established');
            this.sendQueries(queries);
        };

        this.webSocket.onmessage = (event: MessageEvent) => {
            console.log(event.data);
            this.handleMessage(event.data, onMessageReceived);
        };

        this.webSocket.onerror = (event: Event) => {
            console.error('WebSocket error observed:', event);
        };

        this.webSocket.onclose = (event: CloseEvent) => {
            console.log('WebSocket connection closed:', event);
        };
    }

    private sendQueries(queries: string[]): void {
        if (this.webSocket && this.webSocket.readyState === WebSocket.OPEN) {
            const message = { action: "sendQueries", columnNames: queries };
            this.webSocket.send(JSON.stringify(message));
            console.log('Queries sent to the server:', queries);
        } else {
            console.error('WebSocket is not open. Cannot send queries.');
        }
    }

    private handleMessage(data: string, onMessageReceived: (data: any) => void): void {

        console.log(data)

        this.objec += data;

        let openBrackets = 0;
        let closeBrackets = 0;

        for (const char of this.objec) {
            if (char === '{') openBrackets++;
            if (char === '}') closeBrackets++;
        }

        if (openBrackets > 0 && openBrackets === closeBrackets) {
            try {
                const fullObject = JSON.parse(this.objec);
                onMessageReceived(fullObject); // Pass the full object to the callback
                this.objec = ""; // Reset the accumulated string
            } catch (error) {
                console.error('Error processing the complete message:', error);
                this.objec = "";
            }
        }
>>>>>>> Stashed changes
    }
}

export default SavvyServiceAPI;