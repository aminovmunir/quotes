<template>
  <div class="filter-container">
    <div class="filter-item">
      <input type="search" v-model="searchQuery" placeholder="Поиск">
    </div>
    <div class="filter-item">
      <v-select
      :disabled="loading"
      placeholder="Выберите жанр"
      v-model="filterGenre"
      :options="genres"
      label="name"
      :reduce="(genre: Genre) => genre.id"></v-select>
    </div>
    <div class="filter-item">
      <v-select
      :disabled="loading"
      placeholder="Выберите автора"
      v-model="filterAuthor"
      :options="authors"
      label="name"
      :reduce="(author: Author) => author.id"></v-select>
    </div>
  </div>
  <div class="create-action-container">
    <router-link to="/quote/create">
      <button class="submit-btn">Создать цитату</button>
    </router-link>
  </div>
  <EasyDataTable
    :headers="headers"
    :items="filteredQuotes"
    :loading="loading"
    empty-message="Нет данных"
    rows-per-page-message="Записей на одну страницу"
    rows-of-page-separator-message="из"
  >
  <template #item-genres="item">
    <span v-for="(genre, index) in (item.genres as Array<Genre>)" :key="'quote-' + item.id + 'genre-' + genre.id">
      {{ genre.name }}<span v-if="index + 1 !== item.genres.length">, </span>
    </span>
  </template>
  <template #item-author="item">
    {{ item.author.name }}
  </template>
  <template #item-actions="item">
    <div class="action-wrapper">
      <router-link :to="`/quotes/${item.id}`">
        <edit-icon />
      </router-link>
      <delete-icon @click="selectedId = item.id, dialogState = true" />
    </div>
  </template>
  </EasyDataTable>
  <dialog-modal
    @accept="deleteQuote(selectedId)"
    @close="dialogState = false"
    :isOpened="dialogState"
    title="Вы уверены что хотите изменить цитату?"/>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import deleteIcon from '@/components/icons/deleteIcon.vue'
import editIcon from '@/components/icons/editIcon.vue'
import AuthorDataService from "@/services/AuthorDataService";
import GenreDataService from "@/services/GenreDataService";
import QuoteDataService from "@/services/QuoteDataService";
import type ResponseData from "@/types/ResponseData";
import type Author from "@/types/Author";
import type Quote from "@/types/Quote";
import type Genre from "@/types/Genre";
import DialogModal from '@/components/DialogModal.vue'

export default defineComponent({
  name: "Quotes",
  components: {
    'edit-icon': editIcon,
    'delete-icon': deleteIcon,
    'dialog-modal': DialogModal,
  },
  data() {
    return {
      authors: [] as Author[],
      dialogState: false,
      filterAuthor: null,
      filterGenre: null,
      genres: [] as Genre[],
      headers:[
        { text: "ID", value: "id" },
        { text: "Текст", value: "text" },
        { text: "Автор", value: "author" },
        { text: "Жанры", value: "genres" },
        { text: "Дата создания", value: "created_at", sortable: true },
        { text: "Дата обновления", value: "updated_at", sortable: true },
        { text: "Действия", value: "actions" },
      ],
      loading: false,
      orderBy: null,
      selectedId: null,
      searchQuery: '',
      quotes: [] as Quote[]
    }
  },
  mounted() {
    this.getAllData()
  },
  methods: {
    deleteQuote(id: number | null): void {
      this.dialogState = false
      this.selectedId = null
      QuoteDataService.delete(id)
      .then((res: ResponseData) => {
        this.getAllData()
      })
      .catch((err: Error) => {
        console.log(err);
      })
    },
    getAllData(): void {
      this.loading = true
      Promise.all([this.retrieveAuthors(), this.retrieveGenres(), this.retrieveQuotes()])
      .then(([authorResposne, genresResponse, quotesResponse]) => {
        this.authors = authorResposne.data
        this.genres = genresResponse.data
        this.quotes = quotesResponse.data
      })
      .catch((err: Error): void => {
        console.log(err);
      })
      .finally((): void => {
        this.loading = false
      })
    },
    retrieveAuthors(): Promise<any> {
      return AuthorDataService.getAll()
    },
    retrieveGenres(): Promise<any> {
      return GenreDataService.getAll()
    },
    retrieveQuotes(): Promise<any> {
      return QuoteDataService.getAll()
    }
    
  },
  computed: {
    // реализовал фильтр на фронте потому что на json-server более сложно.
    filteredQuotes(): Array<Quote> {
      // search by quote text or author name
      let result: Quote[] = this.quotes
      if (this.searchQuery) {
        result = result.filter((quote: Quote): boolean => {
          return quote.text.toLowerCase().includes(this.searchQuery.toLowerCase()) || quote.author.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        })
      }
      //filter by genres
      if (this.filterGenre) {
        result = result.filter((quote: Quote): boolean => {
          return quote.genres.find((genre: Genre) => genre.id === this.filterGenre) ? true : false
        })
      }
      // filter by author
      if (this.filterAuthor) {
        result = result.filter((quote: Quote): boolean => {
          return quote.author.id === this.filterAuthor
        })
      }
      return result
    }
  }
})
</script>
<style scoped>
.filter-container {
  padding: 10px;
  display: flex;
}

.filter-item {
  margin-right: 15px;
  max-width: 300px;
  width: 100%;
  height: 100%;
}

.filter-item:last-child{
  margin-right: 0;
}
</style>
