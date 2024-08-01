import{m as g}from"./vuex.e580fdf2.js";import{_ as f,t as V}from"./index.ed021e06.js";import{r as u,x as m,G as h,D as p,I as _,A as t,K as x,v as K,H as U,Q as y,S as B,B as s,R as P,y as I,z as b}from"./@vue.6d92c876.js";import"./axios.a2e7c818.js";import"./firebase.b6aa71ac.js";import"./@firebase.eb3d1888.js";import"./idb.13e98345.js";import"./tslib.3c1e63d7.js";import"./vue-router.cacd5158.js";import"./@egjs.49313d0a.js";import"./@cfcs.62ec6ef0.js";import"./@tiptap.58113168.js";import"./prosemirror-state.669ab027.js";import"./prosemirror-model.a115b74d.js";import"./orderedmap.20afc3da.js";import"./prosemirror-transform.3cf32640.js";import"./prosemirror-view.2d8901b7.js";import"./prosemirror-keymap.d8b22547.js";import"./w3c-keyname.a3821d5e.js";import"./prosemirror-commands.0a3dea2e.js";import"./prosemirror-schema-list.6d4dac38.js";import"./tippy.js.4b0d142c.js";import"./@popperjs.d3f73b18.js";import"./@google.3c047deb.js";const w={components:{tiptap:V},emits:["update:dialog","close"],props:{dialog:{type:Boolean},kanjiID:{type:String}},data(){return{kanji:"",jlpt:"",mean:"",goon:"",hoon:"",kun:"",comment:"",goonDetail:"",kunDetail:"",unicode:"",isEditMode:!1,isDuplicate:!1}},created(){this.loadKanji()},methods:{...g({createKanji:"kanjis/createKanji",updateKanjiByPayload:"kanjis/updateKanjiByPayload",returnKanjiByPayload:"kanjis/returnKanjiByPayload",checkDuplicateByPayload:"kanjis/checkDuplicateByPayload"}),async handleCreateKanji(){try{await this.createKanji({kanji:this.kanji,unicode:this.unicode,jlpt:this.jlpt,mean:this.mean,goon:this.goon,hoon:this.hoon,kun:this.kun,comment:this.comment,goonDetail:this.goonDetail,kunDetail:this.kunDetail}),this.resetForm(),this.updateDialog(!1)}catch(o){console.error("\uB2E8\uC5B4 \uC0DD\uC131 \uC911 \uC624\uB958 \uBC1C\uC0DD:",o),alert("\uB2E8\uC5B4 \uC0DD\uC131\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.")}},updateDialog(o){this.$emit("update:dialog",o)},async handleUpdateKanji(){const o={kanji:this.kanji,jlpt:this.jlpt,mean:this.mean,goon:this.goon,hoon:this.hoon,kun:this.kun,comment:this.comment,goonDetail:this.goonDetail,kunDetail:this.kunDetail,unicode:this.unicode},e=Object.entries(o).reduce((a,[k,i])=>(i&&(a[k]=i),a),{});try{await this.updateKanjiByPayload({kanjiID:this.kanjiID,payload:e}),this.closeForm()}catch(a){console.error("\uB2E8\uC5B4\uC7A5 \uC218\uC815 \uC911 \uC624\uB958 \uBC1C\uC0DD:",a),alert("\uB2E8\uC5B4\uC7A5 \uC218\uC815\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.")}},async loadKanji(){if(this.kanjiID){this.isEditMode=!0;const o=await this.returnKanjiByPayload(this.kanjiID);o?(this.kanji=o.kanji,this.jlpt=o.jlpt,this.mean=o.mean,this.goon=o.goon,this.hoon=o.hoon,this.kun=o.kun,this.comment=o.comment,this.goonDetail=o.goonDetail,this.kunDetail=o.kunDetail,this.unicode=o.id):alert("\uB2E8\uC5B4 \uBD88\uB7EC\uC624\uB294\uB370 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.")}},closeForm(){this.$emit("close")},async convertToUnicode(){if(this.unicode=this.kanji.split("").map(o=>o.charCodeAt(0).toString(16).padStart(4,"0")).join(""),this.unicode){const o=await this.checkDuplicateByPayload(this.unicode);this.isDuplicate=o}else this.isDuplicate=!1},resetForm(){this.kanji="",this.jlpt="",this.mean="",this.goon="",this.hoon="",this.kun="",this.comment="",this.goonDetail="",this.kunDetail="",this.unicode=""}}},l=o=>(I("data-v-e31d73ed"),o=o(),b(),o),S={key:0},T={class:"display_flex"},C={class:"kanji-wrap"},N={class:"kanji"},F={class:"info"},M={class:"display_flex"},E=l(()=>t("div",null,"jlpt: ",-1)),J=l(()=>t("option",{value:"1"},[t("span",null,"JLPT N1")],-1)),L=l(()=>t("option",{value:"2"},[t("span",null,"JLPT N2")],-1)),A=l(()=>t("option",{value:"3"},[t("span",null,"JLPT N3")],-1)),z=l(()=>t("option",{value:"4"},[t("span",null,"JLPT N4")],-1)),G=l(()=>t("option",{value:"5"},[t("span",null,"JLPT N5")],-1)),H=[J,L,A,z,G],O=l(()=>t("div",{class:"display_flex"},null,-1)),Q={class:"display_flex"},R=l(()=>t("div",null,"\uC758\uBBF8",-1)),q={class:"display_flex"},W=l(()=>t("div",null,"\uC74C\uB3C5",-1)),X={class:"display_flex"},Y=l(()=>t("div",null,"\uD6C8\uB3C5",-1)),Z=l(()=>t("div",{class:"line"},null,-1)),$={class:"content"},tt=l(()=>t("p",null,"\uD55C\uC790 \uC124\uBA85",-1)),et=l(()=>t("div",{class:"line"},null,-1)),ot={class:"content"},it=l(()=>t("p",null,"\uC74C\uB3C5 \uC0C1\uC138",-1)),nt=l(()=>t("div",{class:"line"},null,-1)),lt={class:"content"},st=l(()=>t("p",null,"\uD6C8\uB3C5 \uC0C1\uC138",-1));function at(o,e,a,k,i,d){const j=u("buttonIcon"),c=u("textField"),D=u("buttonSelect"),r=u("tiptap"),v=u("fullDialog");return m(),h(v,{title:i.isEditMode?"\uB2E8\uC5B4 \uC218\uC815":"\uB2E8\uC5B4 \uCD94\uAC00",dialog:a.dialog,"onUpdate:dialog":d.updateDialog},{header:p(()=>[i.isEditMode?(m(),h(j,{key:1,onClick:e[1]||(e[1]=n=>d.handleUpdateKanji())},{default:p(()=>[_("\uC218\uC815")]),_:1})):(m(),h(j,{key:0,onClick:e[0]||(e[0]=n=>d.handleCreateKanji())},{default:p(()=>[_("\uCD94\uAC00")]),_:1}))]),default:p(()=>[t("div",null,[t("button",{onClick:e[2]||(e[2]=n=>d.handleCreateKanji())},"\uCD94\uAC00"),_(" unicode = "+x(i.unicode)+" ",1),i.isDuplicate?(m(),K("div",S,"\uC911\uBCF5\uB418\uB294 \uAC12\uC774 \uC788\uC2B5\uB2C8\uB2E4.")):U("",!0),t("div",T,[t("div",C,[t("div",N,[y(t("input",{"onUpdate:modelValue":e[3]||(e[3]=n=>i.kanji=n),type:"text",onInput:e[4]||(e[4]=(...n)=>d.convertToUnicode&&d.convertToUnicode(...n))},null,544),[[B,i.kanji]])]),s(c,{label:"\uD6C8\uC74C",modelValue:i.hoon,"onUpdate:modelValue":e[5]||(e[5]=n=>i.hoon=n),type:"text"},null,8,["modelValue"])]),t("div",F,[t("div",M,[E,s(D,{class:"width_100 height_40 pa_20 gap_4 justify-content_space-between"},{default:p(()=>[y(t("select",{class:"width_100","onUpdate:modelValue":e[6]||(e[6]=n=>i.jlpt=n)},H,512),[[P,i.jlpt]])]),_:1})]),O,t("div",Q,[R,s(c,{label:"\uC758\uBBF8",modelValue:i.mean,"onUpdate:modelValue":e[7]||(e[7]=n=>i.mean=n),type:"text"},null,8,["modelValue"])]),t("div",q,[W,s(c,{label:"\uC74C\uB3C5",modelValue:i.goon,"onUpdate:modelValue":e[8]||(e[8]=n=>i.goon=n),type:"text"},null,8,["modelValue"])]),t("div",X,[Y,s(c,{label:"\uD6C8\uB3C5",modelValue:i.kun,"onUpdate:modelValue":e[9]||(e[9]=n=>i.kun=n),type:"text"},null,8,["modelValue"])])])]),Z,t("div",$,[tt,s(r,{modelValue:i.comment,"onUpdate:modelValue":e[10]||(e[10]=n=>i.comment=n)},null,8,["modelValue"]),et]),t("div",ot,[it,s(r,{modelValue:i.goonDetail,"onUpdate:modelValue":e[11]||(e[11]=n=>i.goonDetail=n)},null,8,["modelValue"]),nt]),t("div",lt,[st,s(r,{modelValue:i.kunDetail,"onUpdate:modelValue":e[12]||(e[12]=n=>i.kunDetail=n)},null,8,["modelValue"])])])]),_:1},8,["title","dialog","onUpdate:dialog"])}const St=f(w,[["render",at],["__scopeId","data-v-e31d73ed"]]);export{St as default};
