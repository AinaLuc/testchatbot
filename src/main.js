import { createApp, defineCustomElement } from 'vue';
import CreateAssistant from './components/CreateAssistant.vue';

// Convert the Vue component into a custom element
const CreateAssistantElement = defineCustomElement(CreateAssistant);

// Register the custom element
customElements.define('create-assistant', CreateAssistantElement);

// Optionally, conditionally create a Vue app if an app root is present
if (document.getElementById('app')) {
  createApp(CreateAssistant).mount('#app'); // Mount the app to #app if it exists
}

// Disable Vue logs in production
if (process.env.NODE_ENV === 'production') {
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
}
