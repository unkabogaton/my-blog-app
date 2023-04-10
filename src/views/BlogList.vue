<template>
  <v-container>
    <div class="text-h4 font-weight-bold text-secondary">Manage Blogs</div>
    <v-card flat height="2" color="primary" class="mb-6"></v-card>
    <v-row>
      <v-col cols="9">
        <v-text-field
          prepend-inner-icon="mdi-magnify"
          density="compact"
          required
        ></v-text-field> </v-col
      ><v-col cols="3"
        ><v-btn variant="flat" color="primary" :to="{ name: 'Create' }">
          Publish Blog
        </v-btn></v-col
      >
    </v-row>

    <v-card v-for="card in cards" :key="card.title" class="my-2" elevation="1">
      <v-row dense>
        <v-col cols="2"><v-img height="50" :src="card.src"></v-img></v-col>
        <v-col cols="4"> {{ card.title }} </v-col>
        <v-col cols="4">Categiory Date</v-col>
        <v-col cols="2"> You </v-col>
      </v-row>
    </v-card>
  </v-container></template
>

<script setup>
import { ref } from "vue";

const cards = ref([
  {
    title: "Pre-fab homes",
    src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg"
  },
  {
    title: "Favorite road trips",
    src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg"
  },
  {
    title: "Best airlines",
    src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg"
  },
  {
    title: "Best airlines",
    src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg"
  }
]);
</script>

<style></style>
