import{_ as l,d,m as _,r as p,o as r,c as a,a as t,e as m,w as u,t as e,F as h,i as b,h as f}from"./index-b-z5iHEr.js";import{a as c}from"./articlesStore-Qb41w5HK.js";import"./sweetalert2.all-wd8RXnWT.js";import"./sweetMessageStore-_1gVmo5O.js";const g={data(){return{}},methods:{...d(c,["getArticle"])},mounted(){const{id:s}=this.$route.params;this.getArticle(s)},computed:{..._(c,["currentArticle"])}},A={class:"pb-lg-12 pb-md-10 pb-8"},v=["src"],x={class:"articleWrap container position-absolute top-60 start-50 transform bg-white"},y={class:"px-8 py-6"},$={class:"mb-8","aria-label":"breadcrumb"},k={class:"breadcrumb"},w={class:"breadcrumb-item"},L={class:"breadcrumb-item active","aria-current":"page"},S={class:"fs-11 mb-5"},B={class:"fw-bold me-1"},N={class:"d-flex gap-3 my-4"},T=["innerHTML"];function U(s,V,C,F,H,M){const i=p("RouterLink");return r(),a("main",A,[t("img",{src:this.currentArticle.imageUrl,class:"position-relative w-100",style:{height:"400px"},alt:"this.currentArticle.title"},null,8,v),t("div",x,[t("div",y,[t("nav",$,[t("ol",k,[t("li",w,[m(i,{to:"/articles"},{default:u(()=>[f("最新文章")]),_:1})]),t("li",L,e(this.currentArticle.title),1)])]),t("h2",S,e(this.currentArticle.title),1),t("span",B,e(this.currentArticle.author),1),t("span",null,"| "+e(s.$filters.dateUS(this.currentArticle.create_at)),1),t("div",N,[(r(!0),a(h,null,b(this.currentArticle.tag,(o,n)=>(r(),a("span",{key:n,class:"text-gray"},"# "+e(o),1))),128))]),t("div",{class:"",innerHTML:s.currentArticle.content},null,8,T)])])])}const W=l(g,[["render",U],["__scopeId","data-v-1f65aba5"]]);export{W as default};
