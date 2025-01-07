<template>
    <div class="assistant-form">
      <form @submit.prevent="createAssistant">
        <div class="form-group">
          <label for="systemMessage">System Message</label>
          <input
            type="text"
            id="systemMessage"
            v-model="systemMessage"
            class="form-control"
            placeholder="Enter system message"
          />
        </div>
  
        <div class="form-group">
          <label for="instructions">Instructions</label>
          <textarea
            id="instructions"
            v-model="instructions"
            class="form-control"
            placeholder="Enter instructions"
          ></textarea>
        </div>
  
        <button type="submit" class="btn btn-primary" :disabled="loading">
          {{ loading ? 'Creating...' : 'Create Assistant' }}
        </button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        systemMessage: '',
        instructions: '',
        loading: false,
      };
    },
    methods: {
      async createAssistant() {
        if (!this.systemMessage || !this.instructions) {
          alert('Please fill in both fields!');
          return;
        }
  
        const payload = {
          firstMessage: 'Hello, this is your assistant!',
          content: this.instructions,
          system: this.systemMessage,
        };
  
        this.loading = true;
        try {
          const response = await fetch(
            'https://prod.islandaiforge.us/create-assistant-try/',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload),
            }
          );
  
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
  
          const responseData = await response.json();
          console.log('Assistant created successfully:', responseData);
          alert('Assistant created successfully!');
  
          this.systemMessage = '';
          this.instructions = '';
        } catch (error) {
          console.error('Error creating assistant:', error);
          alert('Failed to create assistant. Please try again.');
        } finally {
          this.loading = false;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .assistant-form {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  label {
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
  }
  
  input.form-control,
  textarea.form-control {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  textarea.form-control {
    height: 120px;
  }
  
  button.btn {
    display: inline-block;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
  }
  
  button.btn:hover {
    background-color: #0056b3;
  }
  
  button.btn:disabled {
    background-color: #c6c6c6;
    cursor: not-allowed;
  }
  </style>
  