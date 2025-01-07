import { createApp, defineCustomElement } from 'vue';
import CreateAssistant from './components/CreateAssistant.vue';

// Convert the Vue component into a custom element
const CreateAssistantElement = defineCustomElement(CreateAssistant);

// Register the custom element with the browser
customElements.define('create-assistant', CreateAssistantElement);

// If you need to create a Vue app, you can still do that for non-web-component logic
createApp(CreateAssistant).mount('#app');
