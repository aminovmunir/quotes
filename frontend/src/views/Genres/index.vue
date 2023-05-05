<template>
  <div class="create-action-container">
    <router-link to="/genre/create">
      <button class="submit-btn">Создать жанр</button>
    </router-link>
  </div>
  <EasyDataTable
    :headers="headers"
    :items="genres"
    :loading="loading"
    empty-message="Нет данных"
    rows-per-page-message="Записей на одну страницу"
    rows-of-page-separator-message="из"
  ></EasyDataTable>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GenreDataService from "@/services/GenreDataService";
import type ResponseData from "@/types/ResponseData";
import type Genre from "@/types/Genre";

export default defineComponent({
  name: "Genres",
  data() {
    return {
      headers:[
        { text: "ID", value: "id" },
        { text: "Название", value: "name" },
      ],
      loading: false,
      genres: [] as Genre[]
    }
  },
  mounted() {
    this.retrieveQuotes()
  },
  methods: {
    retrieveQuotes() {
      this.loading = true
      GenreDataService.getAll()
        .then((response: ResponseData) => {
          this.genres = response.data
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