import{C as x}from"./bootstrap.esm-UN3Qh_Ru.js";import{m as v,_ as m,r as n,o as c,c as r,a as t,b as f,w as a,d as w,e,t as k,f as C,p as S,g as I,F as y,h as p}from"./index-b-z5iHEr.js";import{a as L}from"./adminStore-CR7SCr0f.js";import{c as b}from"./cartStore-AIeG0QZR.js";import"./sweetalert2.all-wd8RXnWT.js";import"./sweetMessageStore-_1gVmo5O.js";const T={methods:{},mounted(){},computed:{...v(L,["status"])}},F=t("hr",null,null,-1),R={class:"container"},B={class:"text-center p-2"},V=t("p",{class:"d-inline me-2"},"本網站僅供個人作品使用，不做任何商業使用",-1),E=t("i",{class:"bi bi-person-fill-gear"},null,-1),N=t("i",{class:"bi bi-person-fill-gear"},null,-1);function j(s,l,u,h,d,i){const o=n("RouterLink");return c(),r("footer",null,[F,t("div",R,[t("div",B,[V,s.status?(c(),f(o,{key:0,to:"/admin/products",class:"text-black fs-8"},{default:a(()=>[E]),_:1})):(c(),f(o,{key:1,to:"/login",class:"text-black fs-8"},{default:a(()=>[N]),_:1}))])])])}const z=m(T,[["render",j]]),A={data(){return{isShow:!1}},methods:{...w(b,["getCart"]),scrollToTop(){window.scrollTo({top:0,behavior:"smooth"})},handleScroll(){document.documentElement.scrollTop>20?this.isShow=!0:this.isShow=!1}},mounted(){this.getCart(),window.addEventListener("scroll",this.handleScroll)},unmounted(){window.removeEventListener("scroll",this.handleScroll)},computed:{...v(b,["cartCount"])}},D=s=>(S("data-v-00b3190e"),s=s(),I(),s),J={class:"zIndex position-fixed end-2 bottom-4 text-center"},U={class:"position-relative bi bi-cart-fill text-black fs-4 fs-md-3"},Y={class:"position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary fs-8 fs-md-6"},q=D(()=>t("i",{class:"bi bi-chevron-compact-up fs-4 fs-md-3"},null,-1)),G=[q];function H(s,l,u,h,d,i){const o=n("RouterLink");return c(),r("div",J,[e(o,{to:"/cart",class:"fixedItem shadow bg-white pt-2 mb-3"},{default:a(()=>[t("i",U,[t("span",Y,k(s.cartCount),1)])]),_:1}),d.isShow?(c(),r("div",{key:0,class:"fixedItem shadow bg-white pt-2",onClick:l[0]||(l[0]=(..._)=>i.scrollToTop&&i.scrollToTop(..._))},G)):C("",!0)])}const K=m(A,[["render",H],["__scopeId","data-v-00b3190e"]]),M="/YoJapan/images/yojapan-logo.svg",O={data(){return{navCollapse:null}},methods:{},mounted(){this.navCollapse=new x(this.$refs.navbarItem,{toggle:!1})},components:{FooterComponent:z,FixedItems:K}},P={class:"sticky-top navbar navbar-expand-md shadow-sm",style:{"background-color":"#f8f8f8"}},Q={class:"container"},W=t("img",{class:"me-2",src:M,style:{width:"40px",height:"40px"},alt:"logo"},null,-1),X=t("h1",{class:"fs-3"},"遊日本",-1),Z=t("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarButton","aria-controls":"navbarButton","aria-expanded":"false"},[t("span",{class:"navbar-toggler-icon"})],-1),tt={class:"collapse navbar-collapse",id:"navbarButton",ref:"navbarItem"},ot={class:"navbar-nav text-center ms-auto"},st={class:"nav-item"},et={class:"nav-item"},at={class:"nav-item"};function nt(s,l,u,h,d,i){const o=n("RouterLink"),_=n("RouterView"),g=n("FixedItems"),$=n("FooterComponent");return c(),r(y,null,[t("nav",P,[t("div",Q,[e(o,{to:"/",class:"navbar-brand d-flex align-items-center"},{default:a(()=>[W,X]),_:1}),Z,t("div",tt,[t("ul",ot,[t("li",st,[e(o,{to:"/products",class:"nav-link fs-5"},{default:a(()=>[p(" 推薦行程 ")]),_:1})]),t("li",et,[e(o,{to:"/articles",class:"nav-link fs-5"},{default:a(()=>[p(" 最新文章 ")]),_:1})]),t("li",at,[e(o,{to:"/about",class:"nav-link fs-5"},{default:a(()=>[p(" 關於我們 ")]),_:1})])])],512)])]),e(_),e(g),e($)],64)}const pt=m(O,[["render",nt]]);export{pt as default};
