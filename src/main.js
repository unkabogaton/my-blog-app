/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */
// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

import "@/firebase";
// Plugins
import { registerPlugins } from "@/plugins";

// use
const app = createApp(App);
registerPlugins(app);

app.mount("#app");
