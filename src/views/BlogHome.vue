<template>
  <div>
    <v-app-bar
      v-for="blog in featured"
      :key="blog.id"
      :image="blog.photoLink"
      absolute
      height="400"
      flat
      class="align-end text-start text-white"
    >
      <template v-slot:image>
        <v-img
          class="pa-10 pl-15"
          :lazy-src="blog.photoLink"
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
        <div
          class="text-h5 text-sm-h4 font-weight-bold"
          style="max-width: 600px"
        >
          {{ blog.title }}
        </div>
        <v-btn variant="elevated" color="primary" size="small" class="mt-3"
          >Read More</v-btn
        >
      </div>
    </v-app-bar>
    <v-container class="mt-5" style="min-height: 140vh">
      <div class="text-h6 mb-4 text-secondary">Insight Topics</div>
      <v-row>
        <v-col v-for="(cat, i) in categories" :key="i" cols="2">
          <v-card to="#" class="text-center pa-2" elevation="9"
            ><div class="font-weight-medium">{{ cat }}</div></v-card
          ></v-col
        >
      </v-row>
      <div class="text-h6 mt-9 mb-2 text-secondary">All Articles</div>
      <v-chip-group
        selected-class="text-primary"
        filter
        v-model="selection"
        class="mb-2"
        mandatory
      >
        <v-chip v-for="(fil, i) in filters" :key="i" :value="fil">{{
          fil.text
        }}</v-chip>
      </v-chip-group>
      <v-row dense>
        <v-col v-for="blog in blogs" :key="blog.id" cols="3">
          <v-card
            max-width="260"
            elevation="0"
            :to="{ name: 'View', params: { id: blog.id } }"
            class="pb-3 mb-5"
          >
            <v-img :src="blog.photoLink" width="300" height="150">
              <v-chip variant="flat" color="secondary" label size="small">
                {{ blog.categories[0] }}
              </v-chip>
            </v-img>
            <div class="text-body-1 font-weight-medium mt-2 mb-1 title-post">
              {{ blog.title }}
            </div>
            <div class="text-caption text-grey mb-2">
              {{ convetDate(blog.dateCreated) }}
            </div>
            <div class="text-caption">
              by:
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
      <div class="text-center my-15" v-if="loading == true">
        <v-progress-circular
          indeterminate
          color="primary"
          :size="90"
          :width="10"
        ></v-progress-circular>
      </div>
      <div class="text-center mb-15">
        <v-btn
          v-if="hasMore && !loading"
          @click="loadMore"
          color="primary"
          size="small"
          >Load More</v-btn
        >
      </div>
    </v-container>
  </div>
</template>

<script setup>
import { ref, watchEffect, onMounted } from "vue";
import { db } from "@/firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter
} from "firebase/firestore";
// import { useCollection } from "vuefire";

// const blogs = useCollection(collection(db, "blogs"));

const categories = ref([
  "Technology",
  "Management",
  "Archives",
  "Collection",
  "Reading",
  "Professionals"
]);
const selection = ref({
  text: "Alphabetical",
  field: "title",
  sortType: "asc"
});
const filters = ref([
  { text: "Alphabetical", field: "title", sortType: "asc" },
  { text: "Latest", field: "dateCreated", sortType: "desc" },
  { text: "Oldest", field: "dateCreated", sortType: "asc" }
]);
const blogs = ref([]);
const loading = ref(false);
const lastVisible = ref(null);
const hasMore = ref(true);
const featured = ref([]);

watchEffect(async () => {
  lastVisible.value = null;
  hasMore.value = true;
  loading.value = true;
  blogs.value = [];
  const q = query(
    collection(db, "blogs"),
    orderBy(selection.value.field, selection.value.sortType),
    limit(12)
  );
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    hasMore.value = false;
    loading.value = false;
    return;
  }
  lastVisible.value = querySnapshot.docs[querySnapshot.docs.length - 1];
  console.log(lastVisible.value);
  blogs.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  if (querySnapshot.docs.length < 12) {
    hasMore.value = false;
  }
  loading.value = false;
});

async function loadMore() {
  loading.value = true;
  if (!lastVisible.value) return;
  const q = query(
    collection(db, "blogs"),
    orderBy(selection.value.field, selection.value.sortType),
    startAfter(lastVisible.value),
    limit(12)
  );
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    hasMore.value = false;
    loading.value = false;
    return;
  }
  lastVisible.value = querySnapshot.docs[querySnapshot.docs.length - 1];
  console.log(querySnapshot.docs.length);
  blogs.value = [
    ...blogs.value,
    ...querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  ];
  if (querySnapshot.docs.length < 12) {
    hasMore.value = false;
  }
  loading.value = false;
}

onMounted(async () => {
  const q = query(
    collection(db, "blogs"),
    orderBy("dateCreated", "desc"),
    limit(1)
  );
  const querySnapshot = await getDocs(q);
  featured.value = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
});

function convetDate(unix) {
  const date = new Date(unix);
  return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
}

// async function sortBlog() {}
</script>

<style>
.title-post {
  line-height: 1.1em !important;
}
</style>
