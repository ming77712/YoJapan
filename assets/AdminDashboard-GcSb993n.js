import{a as v}from"./sweetalert2.all-sBgHJ5B_.js";import{_,r as d,o as r,c as u,a as s,g as o,w as n,h as a,p as $,e as k,f as x,m as g,j as w,b as S,d as N,F as V}from"./index-7GBEASIJ.js";import{a as l}from"./adminStore-oh9YqQQ0.js";const B={},i=e=>($("data-v-ef9a2625"),e=e(),k(),e),C={class:"sideBar d-flex flex-column justify-content-between navbar-dark bg-dark h-100 p-8"},I={class:"navbar-nav"},L={class:"d-flex flex-column gap-6 mt-9"},R=i(()=>s("i",{class:"bi bi-suitcase me-2"},null,-1)),j=i(()=>s("i",{class:"bi bi-list-ul me-2"},null,-1)),y=i(()=>s("i",{class:"bi bi-ticket-detailed me-2"},null,-1)),A=i(()=>s("i",{class:"bi bi-vector-pen me-2"},null,-1));function F(e,c,m,p,f,h){const t=d("RouterLink");return r(),u("nav",C,[s("div",I,[o(t,{to:"/",class:"navbar-brand fs-3"},{default:n(()=>[a("遊日本")]),_:1}),s("div",L,[o(t,{to:"/admin/products",class:"nav-link fs-5"},{default:n(()=>[R,a("行程管理")]),_:1}),o(t,{to:"/admin/orders",class:"nav-link fs-5"},{default:n(()=>[j,a("訂單列表")]),_:1}),o(t,{to:"/admin/coupons",class:"nav-link fs-5"},{default:n(()=>[y,a("優惠券管理")]),_:1}),o(t,{to:"/admin/article",class:"nav-link fs-5"},{default:n(()=>[A,a("貼文管理")]),_:1})])])])}const T=_(B,[["render",F],["__scopeId","data-v-ef9a2625"]]),z={methods:{...x(l,["checkLogin","logout"])},mounted(){const e=document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,"$1");v.defaults.headers.common.Authorization=e,this.checkLogin(this.$router.push)},computed:{...g(l,["status"])},components:{NavSidebar:T}},D={class:"ms-74"},E={class:"d-flex justify-content-end bg-white p-3"},M=s("i",{class:"bi bi-box-arrow-right me-2"},null,-1),q={class:"container-fluid"};function G(e,c,m,p,f,h){const t=d("NavSidebar"),b=d("RouterView");return r(),u(V,null,[o(t),s("div",D,[s("div",E,[s("a",{href:"#",class:"fs-5",onClick:c[0]||(c[0]=w(H=>e.logout(this.$router.push),["prevent"]))},[M,a("登出")])]),s("div",q,[e.status?(r(),S(b,{key:0})):N("",!0)])])],64)}const P=_(z,[["render",G]]);export{P as default};