<template>
  <div>
    <!-- Display AICom chat button -->
    <div
      class="btn-watch-video"
      @click="toggleModal(true)"
      style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #4b6cb7, #182848); color: white; font-size: 18px; font-weight: bold; border-radius: 8px; cursor: pointer; text-align: center; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); transition: transform 0.2s;"
    >
      See It in Action
    </div>

    <!-- Modal for Assistant Form -->
    <div
      v-if="modalVisible"
      class="assistant-form-modal"
      style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center; z-index: 1000;"
    >
      <div
        class="assistant-form"
        style="max-width: 600px; width: 100%; margin: 0 20px; padding: 20px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15); position: relative;"
      >
        <button
          style="position: absolute; top: 10px; right: 10px; background: none; border: none; font-size: 24px; color: #333; cursor: pointer;"
          @click="toggleModal(false)"
        >
          &times;
        </button>

        <form @submit.prevent="createAssistant">
          <div class="form-group" style="margin-bottom: 1.5rem;">
            <label
              for="firstMessage"
              style="font-weight: bold; display: block; margin-bottom: 0.5rem;"
            >
              First Message
            </label>
            <input
              type="text"
              id="firstMessage"
              v-model="firstMessage"
              style="width: calc(100% + 20px); margin-left: -10px; padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-size: 16px; box-sizing: border-box;"
              placeholder="Enter first message"
            />
          </div>

          <div class="form-group" style="margin-bottom: 1.5rem;">
            <label
              for="content"
              style="font-weight: bold; display: block; margin-bottom: 0.5rem;"
            >
              Content
            </label>
            <input
              type="text"
              id="content"
              v-model="content"
              style="width: calc(100% + 20px); margin-left: -10px; padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-size: 16px; box-sizing: border-box;"
              placeholder="Enter content"
            />
          </div>

          <div class="form-group" style="margin-bottom: 1.5rem;">
            <label
              for="system"
              style="font-weight: bold; display: block; margin-bottom: 0.5rem;"
            >
              System Message
            </label>
            <input
              type="text"
              id="system"
              v-model="systemMessage"
              style="width: calc(100% + 20px); margin-left: -10px; padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-size: 16px; box-sizing: border-box;"
              placeholder="Enter system message"
            />
          </div>

          <button
            type="submit"
            style="padding: 12px 24px; background: #4b6cb7; color: white; font-size: 18px; font-weight: bold; border-radius: 8px; cursor: pointer; transition: background 0.3s;"
          >
            Create Assistant
          </button>
        </form>
      </div>
    </div>

    <!-- AICom action -->
    <div>
      <button @click="sendMessage" style="padding: 10px 20px; background-color: #4CAF50; color: white;">Send Message</button>
      <p>Server Response: {{ serverMessage }}</p>
    </div>
  </div>
</template>

<script>
import { io } from "socket.io-client";
import axios from "axios"; // Import axios

export default {
  data() {
    return {
      modalVisible: false,
      firstMessage: '',  // Added first message
      content: '',  // Added content parameter
      systemMessage: '',  // Added system message
      socket: null,  // Socket.IO instance
      serverMessage: "", // To store server response
      hoverButton: false,
      currentAIInstance: null,  // Store AICom instance
    };
  },
  mounted() {
    // Initialize Socket.IO connection
    this.socket = io("https://prod.islandaiforge.us", {
      auth: { userId: this.getUserId() },
      transports: ['websocket'],
    });

    // Handle successful connection
    this.socket.on('connect', () => {
      console.log('Connected to server, socket ID:', this.socket.id);
      this.socket.send('Hello from Vue client!');
    });

    // Handle incoming messages
    this.socket.on('message', (data) => {
      console.log('Message from server:', data);
      this.serverMessage = data;  // Update server message in Vue component
    });

    // Listen for updates from the server
    this.socket.on('update', (data) => {
      console.log('Update from server:', data);

      // Get the assistantId from the server data
      const assistantId = data.assistantId || data;

      // Check if we have a current AI instance and if it needs to be updated
      if (this.currentAIInstance && this.currentAIInstance.update) {
        this.currentAIInstance.update({ assistant: assistantId });
        console.log('AICom updated with assistant ID:', assistantId);
      }

      // Call the aicom method with the new assistantId from the server
      this.aicom({ key: '038aa2f8-1b8f-40a2-9c4f-c5260fdd253c', assistantId })
        .then(() => {
          console.log(`AICom initialized with assistantId: ${assistantId}`);
        })
        .catch((error) => {
          console.error('Error initializing AICom:', error);
        });
    });

    // Handle connection errors
    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });

    // Handle disconnection
    this.socket.on('disconnect', () => {
      console.log('Disconnected from server.');
    });

    // Initialize AICom when component is mounted
    this.aicom({ key: '038aa2f8-1b8f-40a2-9c4f-c5260fdd253c', assistant: '93914af8-6adb-43ce-8b25-c38aa7e4fa33' });
  },
  methods: {
    toggleModal(visible) {
      this.modalVisible = visible;
    },
    async createAssistant() {
      try {
        // Make the HTTP request to create the assistant with the three parameters
        const response = await axios.post("https://prod.islandaiforge.us/create-assistant-try/", {
          firstMessage: this.firstMessage,
          content: this.content,  // Pass the new content parameter
          system: this.systemMessage,  // Pass the system message
        });
        console.log("Assistant created successfully:", response.data);
      } catch (error) {
        console.error("Error creating assistant:", error);
      }
    },
    async aicom({ key, assistantId, config = {} }) {
      return new Promise((resolve, reject) => {
        let secretInstance = null;
        const script = document.createElement("script");
        script.src = `https://prod.islandaiforge.us/aicomvi.js?assistantId=${assistantId}`;
        script.defer = true;
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
          try {
            secretInstance = window.hiddenAI.run({ apiKey: key, assistantId, config });
            this.currentAIInstance = secretInstance;
            resolve(secretInstance);
          } catch (error) {
            reject('Error initializing AICom: ' + error.message);
          }
        };

        script.onerror = () => reject('Failed to load AICom script.');
      });
    },
    sendMessage() {
      this.socket.emit('message', 'Hello from Vue client!');
    },
    getUserId() {
      let userId = localStorage.getItem('userId');
      if (!userId) {
        userId = this.generateUniqueId();
        localStorage.setItem('userId', userId);
      }
      return userId;
    },
    generateUniqueId() {
      const array = new Uint32Array(4);
      window.crypto.getRandomValues(array);
      return array.join('-');
    },
  },
  beforeUnmount() {
    if (this.socket) {
      this.socket.disconnect();
    }
  },
};
</script>

<style scoped>
/* Add your styles here hh*/
</style>
