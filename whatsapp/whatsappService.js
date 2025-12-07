import makeWASocket, { useMultiFileAuthState, DisconnectReason } from "@whiskeysockets/baileys";
import qrcode from "qrcode-terminal";

class WhatsAppService {
  constructor() {
    this.sock = null;
    this.isConnected = false;
  }

  async initialize() {
    const { state, saveCreds } = await useMultiFileAuthState("./auth_info");

    this.sock = makeWASocket({
      auth: state,
      printQRInTerminal: true, // shows QR in terminal
    });

    // Show QR code when needed
    this.sock.ev.on("connection.update", (update) => {
      const { connection, qr } = update;

      if (qr) {
        console.log("Scan this QR to log in:");
        qrcode.generate(qr, { small: true });
      }

      if (connection === "open") {
        this.isConnected = true;
        console.log("WhatsApp connected!");
      }

      if (connection === "close") {
        this.isConnected = false;
        console.log("WhatsApp connection closed");

        const shouldReconnect =
          update.lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;

        if (shouldReconnect) {
          this.initialize();
        }
      }
    });

    // Save credentials if updated
    this.sock.ev.on("creds.update", saveCreds);
  }

  async sendMessage(number, message) {
    if (!this.isConnected) {
      console.log("WhatsApp not connected yet.");
      return;
    }

    const jid = number + "@s.whatsapp.net"; // convert number to WhatsApp format

    await this.sock.sendMessage(jid, { text: message });

    console.log("Message sent to", number);
  }
}

const whatsappService = new WhatsAppService();
export default whatsappService;
