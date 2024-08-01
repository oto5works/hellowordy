import{m as l}from"./vuex.e580fdf2.js";import{a as f}from"./ankiIDKanji.4e472585.js";import{_}from"./index.ed021e06.js";import{r,x as a,G as u,D as h,A as s,v as e,B as j}from"./@vue.6d92c876.js";import"./axios.a2e7c818.js";import"./firebase.b6aa71ac.js";import"./@firebase.eb3d1888.js";import"./idb.13e98345.js";import"./tslib.3c1e63d7.js";import"./vue-router.cacd5158.js";import"./@egjs.49313d0a.js";import"./@cfcs.62ec6ef0.js";import"./@tiptap.58113168.js";import"./prosemirror-state.669ab027.js";import"./prosemirror-model.a115b74d.js";import"./orderedmap.20afc3da.js";import"./prosemirror-transform.3cf32640.js";import"./prosemirror-view.2d8901b7.js";import"./prosemirror-keymap.d8b22547.js";import"./w3c-keyname.a3821d5e.js";import"./prosemirror-commands.0a3dea2e.js";import"./prosemirror-schema-list.6d4dac38.js";import"./tippy.js.4b0d142c.js";import"./@popperjs.d3f73b18.js";import"./@google.3c047deb.js";const k={components:{ankiIDKanjiCard:f},props:{kanji:{type:String,required:!0},dialog:{type:Boolean,required:!0}},data(){return{kanjiInfo:null}},watch:{kanji:{immediate:!0,handler(o){o&&this.fetchKanjiInfo(o)}}},methods:{...l({returnKanjiByPayload:"kanjis/returnKanjiByPayload"}),async fetchKanjiInfo(o){const i=o.charCodeAt(0).toString(16);try{const t=await this.returnKanjiByPayload(i);t?(t.kanji=o,this.kanjiInfo=t):this.kanjiInfo=null}catch(t){console.error(`Error fetching info for ${o}:`,t),this.kanjiInfo=null}},updateDialog(){this.$emit("update:dialog",!1)}}},g={class:"content"},y={key:0},I={key:1},B=s("p",null,"\uD55C\uC790 \uC815\uBCF4\uB97C \uAC00\uC838\uC62C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",-1),D=[B];function K(o,d,i,t,n,c){const m=r("ankiIDKanjiCard"),p=r("modalDialog");return a(),u(p,{title:i.kanji,dialog:i.dialog,"onUpdate:dialog":c.updateDialog},{default:h(()=>[s("div",g,[n.kanjiInfo?(a(),e("div",y,[j(m,{info:n.kanjiInfo},null,8,["info"])])):(a(),e("div",I,D))])]),_:1},8,["title","dialog","onUpdate:dialog"])}const W=_(k,[["render",K]]);export{W as default};
