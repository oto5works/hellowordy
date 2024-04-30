
// Plugins
import store from '../store/index'
import router from '../router'
import btn from "@/components/btn.vue";
import textField from "@/components/textField.vue";
import icon from "@/components/icon/icon.vue";
import modalDialog from "@/components/modalDialog.vue";
import fullDialog from "@/components/fullDialog.vue";

import "@/styles/common.scss";


export function registerPlugins (app) {
  app
    .use(store)
    .use(router)
    .component("btn", btn)
    .component("textField", textField)
    .component("icon", icon)
    .component("modalDialog", modalDialog)
    .component("fullDialog", fullDialog)

    
}
