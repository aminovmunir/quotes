<template>
  <div class="container">
    <h1 class="headline">Создание автора</h1>
    <form action="" @submit.prevent="createAuthor">
      <div class="input-container">
        <label for="author">
          Автор
        </label>
        <input
        pattern="[a-zA-Z А-Яа-я]+$"
        title="Имя не должно содержать числа или спецсимволы"
        required
        type="text"
        id="author"
        v-model="author.name"
        placeholder="Введите имя/псевдоним автора">
      </div>
      <div class="input-container">
        <label>Жанры автора</label>
        <v-select
        :disabled="loading"
        placeholder="Выберите один или несколько жанров"
        multiple
        v-model="author.genres"
        :options="genres"
        label="name"></v-select>
      </div>
      <button :disabled="loading" class="submit-btn" type="submit">Создать</button>
    </form>
    <Loader :loading="loading"/>
  </div>
</template>
<script lang="ts">
import Loader from '@/components/Loader.vue'
import { defineComponent } from "vue";
import AuthorDataService from "@/services/AuthorDataService";
import GenreDataService from "@/services/GenreDataService";
import type Author from "@/types/Author";
import type Genre from "@/types/Genre";
import type ResponseData from "@/types/ResponseData";
export default defineComponent({
  name: 'QuoteCreate',
  components: { Loader },
  data() {
    return {
      author: {} as Author,
      genres: [] as Genre[],
      loading: false
    }
  },
  mounted() {
    this.retrieveGenres()
  },
  methods: {
    createAuthor(){
      this.loading = true
      AuthorDataService.create(this.author)
      .then((res: ResponseData) => {
        this.loading = false
        this.$router.push('/authors')
      })
      .catch((err: Error) => {
        console.log(err);
      })
      .finally(() => {
        this.loading = false
      })
    },
    retrieveGenres() {
      this.loading = true
      GenreDataService.getAll()
      .then((res: ResponseData) => {
        this.genres = res.data
      })
      .finally(() => {
        this.loading = false
      })
    }
  }
})
</script>

