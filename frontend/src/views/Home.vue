<template>
  <div class="container">
    <button @click="getRandomQuote" class="submit-btn">Показать рандомную цитату</button>
  </div>
  <Loader :loading="loading" />
  <alert-modal
  @close="alertModalState = false"
  :title="randomQuoteText"
  :isOpened="alertModalState"></alert-modal>
  <dialog-modal
  @accept="quoteIndexSet.clear(), dialogState = false"
  @close="dialogState = false"
  title="Цитаты закончились. Сделать повтор по новому кругу?"
  :isOpened="dialogState"
  ></dialog-modal>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Loader from '@/components/Loader.vue';
import QuoteDataService from "@/services/QuoteDataService";
import type ResponseData from "@/types/ResponseData";
import type Quote from "@/types/Quote";
import AlertModal from "@/components/AlertModal.vue";
import DialogModal from '@/components/DialogModal.vue'
export default defineComponent({
  name: 'Home',
  components: {
    'alert-modal': AlertModal,
    'dialog-modal': DialogModal,
    "Loader": Loader
  },
  data() {
    return {
      alertModalState: false,
      dialogState: false,
      quoteIndexSet: new Set(),
      loading: false,
      randomQuoteText: '',
      quotes: [] as Quote[]
    }
  },
  mounted() {
    this.retrieveQuotes()
  },  
  methods: {
    getRandomInt(min: number, max: number): number {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getRandomQuote(): void {
      if (this.quoteIndexSet.size == this.quotes.length) {
        this.dialogState = true
        return
      }
      let randomIndex = this.getRandomInt(0, this.quotes.length - 1)
      if (this.quoteIndexSet.has(randomIndex)) {
        while(this.quoteIndexSet.has(randomIndex)) {
          randomIndex = this.getRandomInt(0, this.quotes.length - 1)
        }
      }
      this.quoteIndexSet.add(randomIndex)
      this.randomQuoteText = this.quotes[randomIndex].text
      this.alertModalState = true
    },
    retrieveQuotes(): void {
      this.loading = true
      QuoteDataService.getAll()
      .then((quotesResponse: ResponseData): void => {
        this.quotes = quotesResponse.data
      })
      .catch((err: Error): void => {
        console.log(err);
      })
      .finally((): void => {
        this.loading = false
      })
    }
  }
})
</script>