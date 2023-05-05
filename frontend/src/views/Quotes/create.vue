<template>
  <div class="container">
    <h1 class="headline">Создание цитаты</h1>
    <form action="" @submit.prevent="createQuote">
      <div class="input-container">
        <label for="text">Цитата</label>
        <textarea id="text"
        required
        v-model="quote.text"
        placeholder="Введите цитату"
        rows="10"></textarea>
      </div>
      <div class="input-container">
        <label>Автор</label>
        <v-select
        :disabled="loading"
        placeholder="Выберите автора"
        v-model="quote.author"
        :options="authors"
        label="name"></v-select>
      </div>
      <div class="input-container">
        <label>Жанры</label>
        <v-select
        :disabled="loading"
        placeholder="Выберите один или несколько жанров"
        multiple
        v-model="quote.genres"
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
import QuoteDataService from "@/services/QuoteDataService";
import GenreDataService from "@/services/GenreDataService";
import AuthorDataService from "@/services/AuthorDataService";
import type Author from "@/types/Author";
import type Quote from "@/types/Quote";
import type Genre from "@/types/Genre";
import type ResponseData from "@/types/ResponseData";
export default defineComponent({
  name: 'QuoteCreate',
  components: { Loader },
  data() {
    return {
      quote: {} as Quote,
      genres: [] as Genre[],
      authors: [] as Author[],
      loading: false
    }
  },
  mounted() {
    this.retrieveData()
  },
  methods: {
    createQuote(){
      this.loading = true
      QuoteDataService.create(this.quote)
      .then((res: ResponseData) => {
        this.loading = false
        this.$router.push({ path: '/quotes' })
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        this.loading = false
      })
    },
    retrieveData() {
      this.loading = true
      Promise.all([this.retrieveAuthors(),this.retrieveGenres()])
      .then(([authorsResponse, genresResponse]) => {
        this.authors = authorsResponse.data
        this.genres = genresResponse.data
      })
      .catch((err:Error) => {
        console.log(err);
      })
      .finally(() => {
        this.loading = false
      })
    },
    retrieveAuthors(): Promise<any> {
      return AuthorDataService.getAll()
    },
    retrieveGenres(): Promise<any> {
      return GenreDataService.getAll()
    }
  }
})
</script>

