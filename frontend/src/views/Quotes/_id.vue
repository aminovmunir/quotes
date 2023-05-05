<template>
  <div class="container">
    <h1 class="headline">Изменение цитаты</h1>
    <form action="" @submit.prevent="dialogState = true">
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
      <button :disabled="loading" class="submit-btn" type="submit">Изменить</button>
    </form>
    <loader :loading="loading"/>
    <dialog-modal
    @accept="editQuote"
    @close="dialogState = false"
    :isOpened="dialogState"
    title="Вы уверены что хотите изменить цитату?"/>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import type Author from "@/types/Author";
import type Quote from "@/types/Quote";
import type Genre from "@/types/Genre";
import type ResponseData from "@/types/ResponseData";
import AuthorDataService from "@/services/AuthorDataService";
import QuoteDataService from "@/services/QuoteDataService";
import GenreDataService from "@/services/GenreDataService";
import DialogModal from '@/components/DialogModal.vue'
import Loader from '@/components/Loader.vue'

export default defineComponent({
  components: { 
    DialogModal,
    Loader
  },
  data() {
    return {
      authors: [] as Author[],
      dialogState: false,
      genres: [] as Genre[],
      loading: false,
      quote: {} as Quote,
    }
  },
  mounted() {
    this.retrieveData()
  },
  methods: {
    editQuote() {
      const id: string | any = this.$route.params.id
      this.loading = true
      QuoteDataService.update(id, this.quote)
      .then((res: ResponseData) => {
        this.loading = false
        this.$router.push('/quotes')
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        this.loading = false
      })
    },
    getQuoteById(): Promise<any> {
      const id: string | any = this.$route.params.id
      return QuoteDataService.get(id)
    },
    retrieveData() {
      this.loading = true
      Promise.all([this.retrieveAuthors(),this.retrieveGenres(), this.getQuoteById()])
      .then(([authorsResponse, genresResponse, quoteResponse]) => {
        this.authors = authorsResponse.data
        this.genres = genresResponse.data
        this.quote = quoteResponse.data
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
  },

})
</script>