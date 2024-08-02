// Plugins
import store from "../store/index";
import router from "../router";
// button
import buttonOutline from "@/components/button/buttonOutline.vue";


// dialog
import modalDialog from "@/components/dialog/modalDialog.vue";
import fullDialog from "@/components/dialog/fullDialog.vue";
import bottomDialog from "@/components/dialog/bottomDialog.vue";

// icon

import textField from "@/components/textField.vue";
import icon from "@/components/icon/icon.vue";
import x from "@/components/icon/x";

import card from "@/components/card/card";

import "@/styles/common.scss";
import "@/components/button/button.scss";
import "@/styles/flicking.scss";

store.dispatch("users/initAuthState");

export function registerPlugins(app) {
  app
    .use(store)
    .use(router)
    .component("buttonOutline", buttonOutline)

    
    
    
    .component("textField", textField)
    .component("icon", icon)
    .component("x", x)
    .component("card", card)

    
    .component("modalDialog", modalDialog)
    .component("fullDialog", fullDialog)
    .component("bottomDialog", bottomDialog);
}
