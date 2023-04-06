<template>
  <div>
    <v-app-bar
      image="https://images.unsplash.com/photo-1549675584-91f19337af3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80"
      absolute
      height="400"
      flat
      class="align-end text-start text-white"
    >
      <template v-slot:image>
        <v-img
          class="pa-10 pl-15"
          lazy-src="https://images.unsplash.com/photo-1549675584-91f19337af3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=1"
          gradient="to top right, rgba(1,50,32,.8), rgba(0,255,0,.01)"
        >
        </v-img>
      </template>
      <div class="ml-15">
        <v-card
          class="text-caption text-center text-main mb-1"
          flat
          color="secondary"
          max-width="60"
        >
          Featured
        </v-card>
        <div class="text-h5 text-sm-h4 font-weight-bold">
          Title
        </div>
        <div class="text-body-2 text-sm-body-1">
          A URL shortener and a QR generator
        </div>
        <v-btn variant="elevated" color="primary" size="small" class="mt-3"
          >Read More</v-btn
        >
      </div>
    </v-app-bar>
    <v-container class="mt-5">
      <div class="text-h6 mb-4 text-secondary">Insight Topics</div>
      <v-row>
        <v-col v-for="(cat, i) in categories" :key="i" cols="2">
          <v-card to="#" class="text-center pa-2" elevation="9"
            ><div class="font-weight-medium">{{ cat }}</div></v-card
          ></v-col
        >
      </v-row>
      <div class="text-h6 mt-9 mb-2 text-secondary">All Articles</div>
      <v-row dense>
        <v-col v-for="card in cards" :key="card.title" cols="3">
          <v-card width="260" elevation="0" to="#" class="pb-3">
            <v-img :src="card.src" width="300" height="150">
              <v-card
                class="text-caption text-center text-main"
                flat
                color="secondary"
                max-width="60"
              >
                Featured
              </v-card>
            </v-img>
            <v-card color="primary" height="3" flat></v-card>
            <div class="text-h6 font-weight-medium mt-2 mb-n1">
              {{ card.title }}
            </div>
            <div class="text-caption">
              written by: 1,000 miles of wonder
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

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

const categories = ref([
  "Technology",
  "Management",
  "Archives",
  "Collection",
  "Reading",
  "Professionals"
]);
</script>

<style></style>
