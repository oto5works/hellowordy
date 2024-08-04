// Plugins
import store from "../store/index";
import router from "../router";
// button
import buttonOutline from "@/components/button/buttonOutline.vue"; //new
import buttonIcon from "@/components/button/buttonIcon.vue"; //new
import buttonTab from "@/components/button/buttonTab.vue"; //new
import buttonOption from "@/components/button/buttonOption.vue"; //new
import buttonChip from "@/components/button/buttonChip.vue"; //new

import card from "@/components/card/card.vue"; //new
import textField from "@/components/textField/textField.vue"; //new


// dialog
import modalDialog from "@/components/dialog/modalDialog.vue";
import fullDialog from "@/components/dialog/fullDialog.vue";
import bottomDialog from "@/components/dialog/bottomDialog.vue";

// icon

import icon from "@/components/icon/icon.vue";
import x from "@/components/icon/x";


import "@/styles/common.scss";
import "@/components/button/button.scss";
import "@/styles/flicking.scss";

store.dispatch("users/initAuthState");

export function registerPlugins(app) {
  app
    .use(store)
    .use(router)
    .component("buttonTab", buttonTab) //new
    .component("buttonOutline", buttonOutline) //new
    .component("buttonIcon", buttonIcon) //new
    .component("buttonOption", buttonOption) //new
    .component("buttonChip", buttonChip) //new

    
    .component("card", card) //new
    .component("textField", textField) //new

    
    
    
    .component("icon", icon)
    .component("x", x)

    
    .component("modalDialog", modalDialog)
    .component("fullDialog", fullDialog)
    .component("bottomDialog", bottomDialog);
}
