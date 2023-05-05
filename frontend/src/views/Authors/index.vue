<template>
  <div class="create-action-container">
    <router-link to="/author/create">
      <button class="submit-btn">Создать автора</button>
    </router-link>
  </div>
  <EasyDataTable
    :headers="headers"
    :items="authors"
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
  </EasyDataTable>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AuthorDataService from "@/services/AuthorDataService";
import type ResponseData from "@/types/ResponseData";
import type Author from "@/types/Author";
import type Genre from "@/types/Genre";

export default defineComponent({
  name: "Authors",
  data() {
    return {
      headers:[
        { text: "ID", value: "id" },
        { text: "Имя", value: "name" },
        { text: "Жанры", value: "genres" },
      ],
      loading: false,
      authors: [] as Author[]
    }
  },
  mounted() {
    this.retrieveAuthors()
  },
  methods: {
    retrieveAuthors() {
      this.loading = true
      AuthorDataService.getAll()
        .then((response: ResponseData) => {
          this.authors = response.data
        })
        .catch((e: Error) => {
          console.log(e);
        })
        .finally(() => {
          this.loading = false
        })
    },
  }
})

</script>