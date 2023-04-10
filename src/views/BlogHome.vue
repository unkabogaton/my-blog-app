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
      <v-chip-group selected-class="primary" v-model="filter" class="mb-2">
        <v-chip>Latest</v-chip>
        <v-chip>Oldest</v-chip>
        <v-chip>Alpabhetical</v-chip></v-chip-group
      >
      <v-row dense>
        <v-col v-for="blog in blogs" :key="blog.id" cols="3">
          <v-card width="260" elevation="0" to="#" class="pb-3">
            <v-img :src="blog.photoLink" width="300" height="150">
              <v-chip variant="flat" color="secondary" label>
                {{ blog.categories[0] }}
              </v-chip>
            </v-img>
            <div class="text-h6 font-weight-medium my-2 title-post">
              {{ blog.title }}
            </div>
            <div class="text-caption">
              <v-chip
                v-for="(author, i) in blog.author"
                :key="i"
                class="mr-2"
                size="x-small"
              >
                <span> {{ author.surname }}</span>
                <template v-slot:prepend>
                  <v-avatar color="primary" start>{{
                    author.initials
                  }}</v-avatar></template
                >
              </v-chip>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useCollection } from "vuefire";

const blogs = useCollection(collection(db, "blogs"));

const categories = ref([
  "Technology",
  "Management",
  "Archives",
  "Collection",
  "Reading",
  "Professionals"
]);

const filter = ref("");

onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, "blogs"));
  querySnapshot.forEach(doc => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
});
</script>

<style>
.title-post {
  line-height: 1.1em !important;
}
</style>
