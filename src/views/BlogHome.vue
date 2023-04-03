<template>
  <div style="min-height: 120vh">
    <!-- <v-img
      src="https://images.unsplash.com/photo-1577985051167-0d49eec21977?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2689&q=80"
    ></v-img> -->
    <v-row dense>
      <v-col v-for="card in cards" :key="card.title" cols="3">
        <v-card class="mx-auto" width="244" elevation="0">
          <v-img
            :src="card.src"
            max-width="244"
            height="140"
            style="object-fit: cover"
          ></v-img>
          <v-card-title>
            {{ card.title }}
          </v-card-title>
          <v-card-subtitle>
            1,000 miles of wonder
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref } from "vue";

const cards = ref([
  {
    title: "Pre-fab homes",
    src: "https://cdn.vuetifyjs.com/images/cards/house.jpg"
  },
  {
    title: "Favorite road trips",
    src: "https://cdn.vuetifyjs.com/images/cards/road.jpg"
  },
  {
    title: "Best airlines",
    src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg"
  }
]);
</script>

<style></style>
