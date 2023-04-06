<template>
  <v-app-bar image="" color="secondary" absolute height="400" flat class="">
  </v-app-bar>
  <v-container style="min-height: 60vh">
    <v-row
      ><v-col cols="10" class="pr-4"
        ><v-chip class="text-caption text-main mb-1" color="secondary" label>
          Category
        </v-chip>
        <div class="text-body-2 mt-2">
          <span>Published: </span><span>| Updated:</span>
        </div>
        <div class="text-h3 my-2">Title</div>
        <div class="text-h5 mb-2">subtitle</div>
        <span class="text-caption">Written by: </span>
        <div class="text-body-1 mt-7">Content</div></v-col
      ><v-col cols="2">
        <div class="text-h6 text-main">Categories</div>
        <div
          class="text-subtitle-2 text-secondary mt-1"
          v-for="cat in categories"
          :key="cat"
        >
          {{ cat }}
        </div>
        <div class="text-h6 text-main mt-5">Recent Post</div>
      </v-col></v-row
    >
  </v-container>
</template>

<script setup>
import { readonly } from "vue";
const categories = readonly([
  "Technology",
  "Management",
  "Archives",
  "Collection",
  "Reading",
  "Professionals"
]);
</script>

<style></style>
