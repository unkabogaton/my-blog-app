<template>
  <v-container>
    <div class="text-h4 font-weight-bold text-secondary">Search Blogs</div>
    <v-card flat height="2" color="primary" class="mb-6"></v-card>
    <v-row>
      <v-col cols="10">
        <v-text-field
          prepend-inner-icon="mdi-magnify"
          density="compact"
          autofocus
          v-model.trim="search"
          @keyup.enter="searchBlog"
        ></v-text-field> </v-col
      ><v-col cols="2"
        ><v-btn variant="flat" color="secondary" @click="searchBlog">
          Search
        </v-btn></v-col
      >
    </v-row>
    <div class="text-center mt-10" v-if="loading == true">
      <v-progress-circular
        indeterminate
        color="primary"
        :size="90"
        :width="10"
      ></v-progress-circular>
    </div>
    <div v-else-if="blogs.length == 0" class="mt-10 text-center text-h5">
      No blogs matched
    </div>
    <div v-else>
      <v-card
        v-for="blog in blogs"
        :key="blog.id"
        class="my-2 px-4"
        elevation="2"
        :to="{ name: 'View', params: { id: blog.id } }"
      >
        <v-row align="center" justify="center">
          <v-col cols="2"
            ><v-img height="50" :src="blog.photoLink"></v-img
          ></v-col>
          <v-col cols="4" class="my-3">
            <v-chip
              variant="flat"
              color="secondary"
              size="x-small"
              v-for="(category, i) in blog.categories"
              :key="i"
              label
              class="mr-1"
            >
              {{ category }}
            </v-chip>
            <div class="text-subtitle font-weight-bold">
              {{ blog.title }}
            </div>
          </v-col>
          <v-col cols="2">
            <div class="font-weight-medium text-caption">
              <span class="font-weight-light">Created: </span>
              {{ new Date(blog.dateCreated).toString().split(" GMT")[0] }}
            </div>
            <div
              class="font-weight-medium text-caption"
              v-if="blog.dateUpdated"
            >
              <span class="font-weight-light">Updated: </span
              >{{ new Date(blog.dateUpdated).toString().split(" GMT")[0] }}
            </div>
          </v-col>
          <v-col cols="4" class="text-caption">
            BY:
            <v-chip
              v-for="(author, i) in blog.author"
              :key="i"
              class="ma-1"
              size="small"
            >
              <span> {{ author.firstname }} {{ author.surname }}</span>
              <template v-slot:prepend>
                <v-avatar color="primary" start>{{
                  author.initials
                }}</v-avatar></template
              >
            </v-chip></v-col
          >
        </v-row>
      </v-card>
    </div>
    <div class="text-center mb-15">
      <v-btn
        v-if="hasMore && !loading"
        @click="loadMore"
        color="primary"
        size="small"
        >Load More</v-btn
      >
      <div v-if="paginationLoading">
        <v-progress-circular
          indeterminate
          color="primary"
          :size="40"
          :width="8"
        ></v-progress-circular>
      </div>
    </div>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { db } from "@/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  startAt,
  endAt,
  limit,
  startAfter
} from "firebase/firestore";

const search = ref("");
const loading = ref(false);
const blogs = ref([]);
const lastVisible = ref(null);
const hasMore = ref(true);
const paginationLoading = ref(false);

onMounted(async () => {
  fetchBlog();
});

async function fetchBlog() {
  loading.value = true;
  const q = query(
    collection(db, "blogs"),
    orderBy("dateCreated", "desc"),
    limit(15)
  );
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    hasMore.value = false;
    loading.value = false;
    return;
  }
  lastVisible.value = querySnapshot.docs[querySnapshot.docs.length - 1];
  blogs.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  if (querySnapshot.docs.length < 15) {
    hasMore.value = false;
  }
  loading.value = false;
}

async function searchBlog() {
  if (search.value == "") return;
  loading.value = true;
  const blogQuery = search.value.toLowerCase();
  const q = query(
    collection(db, "blogs"),
    orderBy("titleLowcase"),
    startAt(blogQuery),
    endAt(blogQuery + "\uf8ff"),
    limit(20)
  );
  const querySnapshot = await getDocs(q);
  blogs.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  const arrayQuery = search.value.split(" ");
  const secondQuery = query(
    collection(db, "blogs"),
    where("searchKeywords", "array-contains-any", arrayQuery),
    limit(10)
  );
  const secondQuerySnapshot = await getDocs(secondQuery);
  const newBlogs = secondQuerySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  blogs.value = [
    ...blogs.value.filter(blog =>
      newBlogs.every(newBlog => newBlog.id !== blog.id)
    ),
    ...newBlogs
  ];
  loading.value = false;
}

async function loadMore() {
  paginationLoading.value = true;
  if (!lastVisible.value) return;
  const q = query(
    collection(db, "blogs"),
    orderBy("dateCreated", "desc"),
    startAfter(lastVisible.value),
    limit(15)
  );
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    hasMore.value = false;
    paginationLoading.value = false;
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
  paginationLoading.value = false;
}
</script>

<style></style>
