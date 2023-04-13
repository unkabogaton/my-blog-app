<template>
  <div class="text-center mt-10" v-if="loading == true">
    <v-progress-circular
      indeterminate
      color="primary"
      :size="90"
      :width="10"
    ></v-progress-circular>
  </div>
  <div v-else>
    <v-app-bar
      :image="blog.photoLink"
      color="secondary"
      absolute
      height="400"
      flat
      class=""
    >
    </v-app-bar>
    <v-container style="min-height: 60vh">
      <v-row
        ><v-col cols="10" class="pr-10 pb-15">
          <div class="my-5">
            <v-chip
              variant="flat"
              color="secondary"
              v-for="(category, i) in blog.categories"
              :key="i"
              label
              class="mr-1"
            >
              {{ category }}
            </v-chip>
          </div>
          <div class="mb-6">
            <div class="text-h3 my-2">{{ blog.title }}</div>
            <div class="text-h5 mb-2">{{ blog.subtitle }}</div>
          </div>
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
          </v-chip>
          <v-divider class="mt-6 mb-2"></v-divider>
          <div class="text-body-2 mt-2 font-weight-light">
            <span
              >Posted:
              {{ new Date(blog.dateCreated).toString().split(" GMT")[0] }}</span
            ><span v-if="blog.dateUpdated">
              | Updated:
              {{ new Date(blog.dateUpdated).toString().split(" GMT")[0] }}</span
            >
          </div>
          <div class="text-body-1 mt-7 text-justify" v-html="blog.content"></div
        ></v-col>
        <!-- <v-col cols="2">
          <div class="text-h6 text-main">Categories</div>
          <div
            class="text-subtitle-2 text-secondary mt-1"
            v-for="cat in categories"
            :key="cat"
          >
            {{ cat }}
          </div>
          <div class="text-h6 text-main mt-5">Recent Posts</div>
        </v-col> -->
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useRoute } from "vue-router";

const route = useRoute();

// const categories = readonly([
//   "Technology",
//   "Management",
//   "Archives",
//   "Collection",
//   "Reading",
//   "Professionals"
// ]);
const blog = ref("");
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  const docRef = doc(db, "blogs", route.params.id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    blog.value = docSnap.data();
  } else {
    console.log("No such document!");
  }
  loading.value = false;
});
</script>

<style></style>
