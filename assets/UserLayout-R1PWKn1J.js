import{C as x}from"./bootstrap.esm-UN3Qh_Ru.js";import{m as v,_ as p,r as l,o as n,c as r,a as t,b as h,w as a,d as w,p as C,e as S,f as y,g as e,F as I,t as f,h as _,n as T}from"./index-w-5thZpV.js";import{a as F}from"./adminStore-RAYkIpl6.js";import{c as b}from"./cartStore-eHio4B1I.js";import"./sweetalert2.all-ricpBL6M.js";import"./sweetMessageStore-rxkTSbxj.js";const B={methods:{},mounted(){},computed:{...v(F,["status"])}},L=t("hr",null,null,-1),R={class:"container"},V={class:"text-center p-2"},E=t("p",{class:"d-inline me-2"},"本網站僅供個人作品使用，不做任何商業使用",-1),N=t("i",{class:"bi bi-person-fill-gear"},null,-1),j=t("i",{class:"bi bi-person-fill-gear"},null,-1);function z(s,c,m,u,d,i){const o=l("RouterLink");return n(),r("footer",null,[L,t("div",R,[t("div",V,[E,s.status?(n(),h(o,{key:0,to:"/admin/products",class:"text-black fs-8"},{default:a(()=>[N]),_:1})):(n(),h(o,{key:1,to:"/login",class:"text-black fs-8"},{default:a(()=>[j]),_:1}))])])])}const A=p(B,[["render",z]]),D={data(){return{isShow:!1}},methods:{scrollToTop(){window.scrollTo({top:0,behavior:"smooth"})},handleScroll(){document.documentElement.scrollTop>20?this.isShow=!0:this.isShow=!1}},mounted(){window.addEventListener("scroll",this.handleScroll)},unmounted(){window.removeEventListener("scroll",this.handleScroll)}},J=s=>(C("data-v-6ae9753b"),s=s(),S(),s),M={class:"zIndex position-fixed end-2 bottom-4 text-center"},U=J(()=>t("i",{class:"bi bi-chevron-compact-up fs-4 fs-md-3"},null,-1)),Y=[U];function q(s,c,m,u,d,i){return n(),r("div",M,[d.isShow?(n(),r("div",{key:0,class:"fixedItem shadow bg-white pt-2",onClick:c[0]||(c[0]=(...o)=>i.scrollToTop&&i.scrollToTop(...o))},Y)):w("",!0)])}const G=p(D,[["render",q],["__scopeId","data-v-6ae9753b"]]),H="/YoJapan/images/yojapan-logo.svg",K={data(){return{navCollapse:null}},methods:{...y(b,["getCart"])},mounted(){this.getCart(),this.navCollapse=new x(this.$refs.navbarItem,{toggle:!1})},computed:{...v(b,["cartCount"])},components:{FooterComponent:A,FixedItems:G}},O={class:"sticky-top navbar navbar-expand-md shadow-sm",style:{"background-color":"#f8f8f8"}},P={class:"container d-flex justify-content-between align-items-center"},Q=t("img",{class:"me-2",src:H,style:{width:"40px",height:"40px"},alt:"logo"},null,-1),W=t("h1",{class:"fs-3"},"遊日本",-1),X={class:"d-flex align-items-center"},Z=t("button",{class:"navbar-toggler me-3",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarButton","aria-controls":"navbarButton","aria-expanded":"false"},[t("span",{class:"navbar-toggler-icon"})],-1),tt={class:"cartIconMobile position-relative bi bi-cart-fill text-black"},ot={class:"position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary fs-8"},st={class:"collapse navbar-collapse",id:"navbarButton",ref:"navbarItem"},et={class:"navbar-nav text-center ms-auto"},at={class:"nav-item"},nt={class:"nav-item"},lt={class:"nav-item"},ct={class:"nav-item"},it={class:"position-relative bi bi-cart-fill"};function rt(s,c,m,u,d,i){const o=l("RouterLink"),g=l("RouterView"),k=l("FixedItems"),$=l("FooterComponent");return n(),r(I,null,[t("nav",O,[t("div",P,[e(o,{to:"/",class:"navbar-brand d-flex align-items-center"},{default:a(()=>[Q,W]),_:1}),t("div",X,[Z,e(o,{to:"/cart",class:"d-block d-md-none me-3"},{default:a(()=>[t("i",tt,[t("span",ot,f(s.cartCount),1)])]),_:1})]),t("div",st,[t("ul",et,[t("li",at,[e(o,{to:"/products",class:"nav-link"},{default:a(()=>[_(" 推薦行程 ")]),_:1})]),t("li",nt,[e(o,{to:"/articles",class:"nav-link"},{default:a(()=>[_(" 最新文章 ")]),_:1})]),t("li",lt,[e(o,{to:"/about",class:"nav-link"},{default:a(()=>[_(" 關於我們 ")]),_:1})]),t("li",ct,[e(o,{to:"/cart",class:"d-none d-md-block nav-link"},{default:a(()=>[t("i",it,[t("span",{class:T(["position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary",s.cartCount===0?"d-none":"d-block"])},f(s.cartCount),3)])]),_:1})])])],512)])]),e(g),e(k),e($)],64)}const ft=p(K,[["render",rt]]);export{ft as default};
