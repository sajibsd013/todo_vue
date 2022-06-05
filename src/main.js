// createApp(App).mount('#app')
import { dom, library } from "@fortawesome/fontawesome-svg-core";
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { createApp } from 'vue';
import App from './App.vue';



library.add(fas);
library.add(far);
dom.watch();

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");


