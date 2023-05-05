<template>
  <div v-if="isOpened" class="dialog-overlay">
    <div class="modal">
      <div class="body">
        <p>{{ title }}</p>
      </div>
      <div class="bottom">
        <button class="accept" @click="$emit('close')">Ок</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'AlertModal',
  props: {
    title: {
      type: String
    },
    isOpened: {
      required: true,
      type: Boolean
    }
  }
})
</script>
<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 11;
  background: rgba(255, 255, 255, 0.5);
}

.modal {
  min-width: 400px;
  background: #fff;
  padding: 20px;
  box-shadow: 0 0 10px;
  border-radius: 5px;
}

.modal .body {
  margin-bottom: 20px;
}

.modal .bottom {
  display: flex;
  justify-content: space-around;
}

.modal .bottom button {
  color: #fff;
  min-width: 90px;
  outline: none;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
}

.modal .bottom button.accept {
  background-color: var(--color-submit);
}
</style>