<template>
  <div class="container">
    <h1 class="headline">Создание жанра</h1>
    <form action="" @submit.prevent="createGenre">
      <div class="input-container">
        <label for="genre">
          Название жанра
        </label>
        <input
        required
        type="text"
        id="genre"
        v-model="genre.name"
        placeholder="Введите название жанра">
      </div>
      <button :disabled="loading" class="submit-btn" type="submit">Создать</button>
    </form>
    <Loader :loading="loading"/>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Loader from '@/components/Loader.vue';
import GenreDataService from "@/services/GenreDataService";
import type Genre from "@/types/Genre";
import type ResponseData from "@/types/ResponseData";
export default defineComponent({
  name: 'GenreCreate',
  components: { Loader },
  data() {
    return {
      genre: {} as Genre,
      loading: false
    }
  },
  methods: {
    createGenre() {
      this.loading = true
      GenreDataService.create(this.genre)
      .then((res: ResponseData) => {
        this.loading = false
        this.$router.push('/genres')
      })
      .catch((err: Error) => {
        console.log(err);
      })
      .finally(() => {
        this.loading = false
      })
    }
  }
})
</script>