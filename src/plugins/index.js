// Plugins
import store from "../store/index";
import router from "../router";
// button
import buttonDefault from "@/components/button/buttonDefault.vue";
import buttonText from "@/components/button/buttonText.vue";
import buttonSwitch from "@/components/button/buttonSwitch.vue";
import buttonSelect from "@/components/button/buttonSelect.vue";
import buttonIcon from "@/components/button/buttonIcon.vue";
import buttonToggle from "@/components/button/buttonToggle.vue";
import buttonChip from "@/components/button/buttonChip.vue";
import buttonOutline from "@/components/button/buttonOutline.vue";
import buttonNav from "@/components/button/buttonNav.vue";
import buttonList from "@/components/button/buttonList.vue";
import buttonCard from "@/components/button/buttonCard.vue";
import buttonTap from "@/components/button/buttonTap.vue";


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
    .component("buttonDefault", buttonDefault)
    .component("buttonText", buttonText)
    .component("buttonSwitch", buttonSwitch)
    .component("buttonSelect", buttonSelect)
    .component("buttonIcon", buttonIcon)
    .component("buttonToggle", buttonToggle)
    .component("buttonChip", buttonChip)
    .component("buttonOutline", buttonOutline)
    .component("buttonNav", buttonNav)
    .component("buttonList", buttonList)
    .component("buttonCard", buttonCard)
    .component("buttonTap", buttonTap)

    
    
    .component("textField", textField)
    .component("icon", icon)
    .component("x", x)
    .component("card", card)

    
    .component("modalDialog", modalDialog)
    .component("fullDialog", fullDialog)
    .component("bottomDialog", bottomDialog);
}
