// Plugins
import store from "../store/index";
import router from "../router";
// button
import buttonDefault from "@/components/button/buttonDefault.vue";
import buttonText from "@/components/button/buttonText.vue";

// dialog
import modalDialog from "@/components/dialog/modalDialog.vue";
import fullDialog from "@/components/dialog/fullDialog.vue";
import bottomDialog from "@/components/dialog/bottomDialog.vue";


import textField from "@/components/textField.vue";
import icon from "@/components/icon/icon.vue";

import "@/styles/common.scss";
import "@/components/button/button.scss";

store.dispatch("users/initAuthState");

export function registerPlugins(app) {
  app
    .use(store)
    .use(router)
    .component("buttonDefault", buttonDefault)
    .component("buttonText", buttonText)
    .component("textField", textField)
    .component("icon", icon)
    .component("modalDialog", modalDialog)
    .component("fullDialog", fullDialog)
    .component("bottomDialog", bottomDialog);
}
