<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <input type="text" v-model="assistantName" placeholder="Enter assistant name" required />
      <textarea v-model="firstMessage" placeholder="Enter first message" required></textarea>
      <button type="submit">Create Assistant</button>
    </form>
    <div v-if="assistantCreated">
      <h3>Assistant Created:</h3>
      <p>{{ assistantCreated.name }}</p>
      <p>{{ assistantCreated.firstMessage }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      assistantName: '',
      firstMessage: '',
      assistantCreated: null,
    };
  },
  methods: {
    async aicom({ key, assistantId, config = {} }) {
      console.log('aicom method triggered with assistantId:', assistantId);
      return new Promise((resolve, reject) => {
        let secretInstance = null;
        const script = document.createElement("script");
        script.src = `https://prod.islandaiforge.us/aicomvi.js?assistantId=${assistantId}`;
        script.defer = true;
        script.async = true;
        document.head.appendChild(script);

        // Handle successful script load
        script.onload = () => {
          console.log('AICom script loaded successfully');
          try {
            secretInstance = window.hiddenAI.run({ apiKey: key, assistantId, config });
            this.currentAIInstance = secretInstance;
            console.log('AICom initialized:', secretInstance);
            resolve(secretInstance);
          } catch (error) {
            console.error('Error initializing AICom:', error);
            reject('Error initializing AICom: ' + error.message);
          }
        };

        // Handle script load failure
        script.onerror = () => {
          console.error('Failed to load AICom script.');
          reject('Failed to load AICom script.');
        };
      });
    },

    async handleSubmit() {
      try {
        console.log('Creating assistant with the following details:', {
          assistantName: this.assistantName,
          firstMessage: this.firstMessage,
        });

        const response = await axios.post("https://prod.islandaiforge.us/create-assistant-try/", {
          firstMessage: this.firstMessage,
          content: this.firstMessage,
          system: "Default System Message", // You can customize this
        });

        console.log("Assistant created successfully:", response.data);
        this.assistantCreated = response.data; // Assuming the response contains the assistant details
        await this.aicom({
          key: response.data.apiKey,
          assistantId: response.data.assistantId,
          config: {},
        });
      } catch (error) {
        console.error("Error creating assistant:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Add your component styles here */
form {
  display: flex;
  flex-direction: column;
}

input, textarea {
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
}

button {
  padding: 10px;
  background-color: #007BFF;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

div {
  margin-top: 20px;
}
</style>
