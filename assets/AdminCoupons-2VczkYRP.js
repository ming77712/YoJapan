import{a as b,S as C}from"./sweetalert2.all-BP0Kp5-G.js";import{_ as w,o as a,c as i,a as e,D as c,E as r,G as $,t as h,m as S,g as E,r as g,F as M,h as P,b as f}from"./index-7nF7zO-F.js";import{s as v}from"./sweetMessageStore-rRz5Jm6g.js";import{m as V,D as A}from"./DelModal-Cen8wbv8.js";import{P as N}from"./PaginationComponent-HcR7VPmN.js";import"./bootstrap.esm-UN3Qh_Ru.js";const T={props:{coupon:Object,isNew:Boolean},data(){return{tempCoupon:{},due_date:""}},emits:["update-coupon"],mixins:[V],watch:{coupon(){this.tempCoupon=this.coupon;const s=new Date(this.tempCoupon.due_date*1e3).toISOString().split("T");[this.due_date]=s},due_date(){this.tempCoupon.due_date=Math.floor(new Date(this.due_date)/1e3)}}},U={class:"modal fade",id:"couponModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true",ref:"modal"},I={class:"modal-dialog",role:"document"},L={class:"modal-content"},B={class:"modal-header"},R={class:"modal-title",id:"exampleModalLabel"},O={key:0},F={key:1},H=e("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"},null,-1),j={class:"modal-body"},G={class:"mb-3"},J=e("label",{for:"title"},"標題",-1),Y={class:"mb-3"},q=e("label",{for:"coupon_code"},"優惠碼",-1),z={class:"mb-3"},K=e("label",{for:"due_date"},"到期日",-1),Q={class:"mb-3"},W=e("label",{for:"price"},"折扣百分比",-1),X={class:"mb-3"},Z={class:"form-check"},ee=e("label",{class:"form-check-label",for:"is_enabled"}," 是否啟用 ",-1),te={class:"modal-footer"},oe=e("button",{type:"button",class:"btn btn-secondary","data-bs-dismiss":"modal"}," 關閉 ",-1);function se(s,t,l,p,o,d){return a(),i("div",U,[e("div",I,[e("div",L,[e("div",B,[e("h5",R,[l.isNew?(a(),i("span",O,"新增優惠卷")):(a(),i("span",F,"編輯優惠卷"))]),H]),e("div",j,[e("div",G,[J,c(e("input",{type:"text",class:"form-control",id:"title","onUpdate:modelValue":t[0]||(t[0]=n=>o.tempCoupon.title=n),placeholder:"請輸入標題"},null,512),[[r,o.tempCoupon.title]])]),e("div",Y,[q,c(e("input",{type:"text",class:"form-control",id:"coupon_code","onUpdate:modelValue":t[1]||(t[1]=n=>o.tempCoupon.code=n),placeholder:"請輸入優惠碼"},null,512),[[r,o.tempCoupon.code]])]),e("div",z,[K,c(e("input",{type:"date",class:"form-control",id:"due_date","onUpdate:modelValue":t[2]||(t[2]=n=>o.due_date=n)},null,512),[[r,o.due_date]])]),e("div",Q,[W,c(e("input",{type:"number",class:"form-control",id:"price",min:"0","onUpdate:modelValue":t[3]||(t[3]=n=>o.tempCoupon.percent=n),placeholder:"請輸入折扣百分比"},null,512),[[r,o.tempCoupon.percent,void 0,{number:!0}]])]),e("div",X,[e("div",Z,[c(e("input",{class:"form-check-input",type:"checkbox","true-value":1,"false-value":0,"onUpdate:modelValue":t[4]||(t[4]=n=>o.tempCoupon.is_enabled=n),id:"is_enabled"},null,512),[[$,o.tempCoupon.is_enabled]]),ee])])]),e("div",te,[oe,e("button",{type:"button",class:"btn btn-primary",onClick:t[5]||(t[5]=n=>s.$emit("update-coupon",o.tempCoupon))},h(l.isNew?"新增優惠卷":"更新優惠券"),1)])])])],512)}const ne=w(T,[["render",se]]);var le={VITE_URL:"https://ec-course-api.hexschool.io/v2",VITE_PATH:"ming777",BASE_URL:"/YoJapan/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:m,VITE_PATH:_}=le,ae={data(){return{currentCoupon:{title:"",is_enabled:0,percent:100,code:""},coupons:{},isNew:!1,pagination:{},currentPage:1}},methods:{...S(v,["setSweetMessageSuccess","setSweetMessageError"]),openCouponModal(s,t){this.isNew=s,this.isNew?this.currentCoupon={due_date:new Date().getTime()/1e3}:this.currentCoupon={...t},this.$refs.couponModal.openModal()},openDelCouponModal(s){this.currentCoupon={...s},this.$refs.delModal.openModal()},getAllCoupon(s=1){this.currentPage=s,b.get(`${m}/api/${_}/admin/coupons?page=${s}`).then(t=>{const{coupons:l,pagination:p}=t.data;this.coupons=l,this.pagination=p}).catch(t=>{this.setSweetMessageError(t.response.data.message),C.fire(this.sweetMessage)})},updateCoupon(s){let t=`${m}/api/${_}/admin/coupon`,l="post",p=s;this.isNew||(t=`${m}/api/${_}/admin/coupon/${this.currentCoupon.id}`,l="put",p=this.currentCoupon),b[l](t,{data:p}).then(o=>{this.toastMessage.fire({icon:"success",title:o.data.message}),this.getAllCoupon(this.currentPage),this.$refs.couponModal.hideModal()}).catch(o=>{this.setSweetMessageError(o.response.data.message),C.fire(this.sweetMessage)})},delCoupon(){b.delete(`${m}/api/${_}/admin/coupon/${this.currentCoupon.id}`).then(s=>{this.toastMessage.fire({icon:"success",title:s.data.message}),this.$refs.delModal.hideModal(),this.getAllCoupon(this.currentPage)}).catch(s=>{this.setSweetMessageError(s.response.data.message),C.fire(this.sweetMessage)})}},mounted(){this.getAllCoupon()},computed:{...E(v,["sweetMessage","toastMessage"])},components:{CouponModal:ne,DelModal:A,Pagination:N}},ie=e("h3",{class:"mt-4"},"優惠券管理",-1),de={class:"text-end mt-4"},ue={class:"bg-white mt-4 p-3"},pe={class:"table table-striped mb-0"},ce=e("thead",null,[e("tr",null,[e("th",null,"名稱"),e("th",null,"折扣百分比"),e("th",null,"到期日"),e("th",null,"是否啟用"),e("th",null,"編輯")])],-1),re={key:0,class:"text-success"},me={key:1,class:"text-muted"},_e={class:"btn-group"},he=["onClick"],be=["onClick"];function Ce(s,t,l,p,o,d){const n=g("CouponModal"),y=g("DelModal"),k=g("Pagination");return a(),i(M,null,[ie,e("div",null,[e("div",de,[e("button",{class:"btn btn-primary",type:"button",onClick:t[0]||(t[0]=u=>d.openCouponModal(!0))}," 建立新的優惠券 ")]),e("div",ue,[e("table",pe,[ce,e("tbody",null,[(a(!0),i(M,null,P(o.coupons,(u,x)=>(a(),i("tr",{key:x},[e("td",null,h(u.title),1),e("td",null,h(u.percent)+"%",1),e("td",null,h(s.$filters.date(u.due_date)),1),e("td",null,[u.is_enabled===1?(a(),i("span",re,"啟用")):(a(),i("span",me,"未啟用"))]),e("td",null,[e("div",_e,[e("button",{type:"button",class:"btn btn-outline-primary btn-sm",onClick:D=>d.openCouponModal(!1,u)}," 編輯 ",8,he),e("button",{type:"button",class:"btn btn-outline-danger btn-sm",onClick:D=>d.openDelCouponModal(u)}," 刪除 ",8,be)])])]))),128))])])]),f(n,{coupon:o.currentCoupon,"is-new":o.isNew,ref:"couponModal",onUpdateCoupon:d.updateCoupon},null,8,["coupon","is-new","onUpdateCoupon"]),f(y,{item:o.currentCoupon,ref:"delModal",onDelItem:d.delCoupon},null,8,["item","onDelItem"]),f(k,{pages:o.pagination,onChangePage:d.getAllCoupon},null,8,["pages","onChangePage"])])],64)}const ke=w(ae,[["render",Ce]]);export{ke as default};
