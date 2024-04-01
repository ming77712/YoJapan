import{S as h,a as I}from"./sweetalert2.all-KUWp0BWM.js";import{_ as B,f as b,m as g,r as i,o as d,c,a as e,g as a,w as v,F as y,i as x,t as m,h as u,n as p,D as M,E as U}from"./index-qf6BObBk.js";import{c as w}from"./cartStore-kQQVgB_h.js";import{s as V}from"./sweetMessageStore-bMsU_DH6.js";import{P as q}from"./ProgressBar-cfcVM8WH.js";var T={VITE_URL:"https://ec-course-api.hexschool.io/v2",VITE_PATH:"ming777",BASE_URL:"/YoJapan/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:P,VITE_PATH:R}=T,j={data(){return{form:{user:{email:"",name:"",tel:"",address:""},message:""}}},methods:{...b(w,["getCart","changeQty","removeCartAllItem","removeCartItem"]),...b(V,["setSweetMessageSuccess","setSweetMessageError"]),createOrder(){if(this.carts.carts.length===0)this.setSweetMessageError("購物車是空的 無法送出訂單"),h.fire(this.sweetMessage);else{const l=this.form;I.post(`${P}/api/${R}/order`,{data:l}).then(s=>{this.$refs.form.resetForm(),this.form.message="",this.getCart(),this.$router.push(`/order/${s.data.orderId}`)}).catch(s=>{this.setSweetMessageError(s.response.data.message),h.fire(this.sweetMessage)})}}},mounted(){this.getCart()},computed:{...g(w,["carts","cartCount"]),...g(V,["sweetMessage"])},components:{ProgressBar:q}},A={class:"container mt-12"},D={class:"row justify-content-center"},F={class:"col-md-6 mb-8 mb-md-0"},L=e("h3",{class:"text-center fs-4"},"購物車",-1),O=e("hr",null,null,-1),N={key:0,class:"d-flex flex-column justify-content-center align-items-center"},$=e("h3",{class:"mb-8"},"購物車現在是空的~ 快去挑選喜愛的行程吧",-1),H={class:"row mb-4"},Q={class:"col-md-5"},z=["src"],J={class:"col-md-7"},Y={class:"d-flex justify-content-between align-items-center"},G={class:"fs-5 mt-5 mb-6"},K=["onClick"],W=e("i",{class:"bi bi-x"},null,-1),X=[W],Z={class:"d-flex justify-content-between align-items-center"},ee={class:"input-group input-group-sm w-40 mb-3"},se=["value","onChange"],te=["value"],oe={class:"d-flex flex-column justify-content-center"},ae=e("hr",null,null,-1),le={class:"d-flex justify-content-between"},ne=["disabled"],re={class:"fs-4"},ie={class:"col-md-6"},de=e("h3",{class:"text-center fs-4"},"訂購人資訊",-1),ce=e("hr",null,null,-1),me={class:""},ue={class:"mb-2"},_e=e("label",{for:"email",class:"form-label"},[e("span",{class:"text-danger"},"*"),u(" Email")],-1),fe={class:"mb-2"},pe=e("label",{for:"name",class:"form-label"},[e("span",{class:"text-danger"},"*"),u(" 收件人姓名")],-1),he={class:"mb-2"},be=e("label",{for:"tel",class:"form-label"},[e("span",{class:"text-danger"},"*"),u(" 收件人電話")],-1),ge={class:"mb-2"},ve=e("label",{for:"address",class:"form-label"},[e("span",{class:"text-danger"},"*"),u(" 收件人地址")],-1),ye={class:"mb-2"},xe=e("label",{for:"message",class:"form-label"},"留言",-1),we={class:"text-end"},Ve=["disabled"];function Ce(l,s,Ee,Se,n,C){const E=i("ProgressBar"),S=i("RouterLink"),_=i("v-field"),f=i("error-message"),k=i("v-form");return d(),c("main",null,[e("div",A,[a(E,{progress:0}),e("div",D,[e("div",F,[L,O,l.cartCount===0?(d(),c("div",N,[$,a(S,{to:"/products",type:"button",class:"btn btn-primary"},{default:v(()=>[u(" 推薦行程 ")]),_:1})])):(d(!0),c(y,{key:1},x(l.carts.carts,(t,o)=>(d(),c("ul",{key:o},[e("li",H,[e("div",Q,[e("img",{src:t.product.imageUrl,class:"w-100",style:{height:"150px"},alt:"product.product.title"},null,8,z)]),e("div",J,[e("div",Y,[e("h2",G,m(t.product.title),1),e("button",{type:"button",class:"btn btn-outline-danger btn-sm",onClick:r=>l.removeCartItem(t.id)},X,8,K)]),e("div",Z,[e("div",ee,[e("select",{class:"form-select",name:"qty",id:"qty",value:t.qty,onChange:r=>l.changeQty(t.id,t.product_id,r)},[(d(),c(y,null,x(20,r=>e("option",{value:r,key:r,class:"form-control"},m(r),9,te)),64))],40,se)]),e("div",oe,[e("span",null,"價格：$ "+m(parseInt(t.product.price).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g,",")),1),e("span",null,"小計：$ "+m(parseInt(t.product.price*t.qty).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g,",")),1)])])])])]))),128)),ae,e("div",le,[e("button",{class:"btn btn-sm btn-outline-danger",type:"button",disabled:l.cartCount===0,onClick:s[0]||(s[0]=t=>l.removeCartAllItem())}," 清空購物車 ",8,ne),e("span",re,"總計：$ "+m(parseInt(l.carts.final_total).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g,",")),1)])]),e("div",ie,[de,ce,e("div",me,[a(k,{ref:"form",class:"",onSubmit:C.createOrder},{default:v(({errors:t})=>[e("div",ue,[_e,a(_,{id:"email",name:"Email",type:"email",class:p(["form-control",{"is-invalid":t.Email}]),rules:"email|required",modelValue:n.form.user.email,"onUpdate:modelValue":s[1]||(s[1]=o=>n.form.user.email=o),placeholder:"請輸入 Email"},null,8,["modelValue","class"]),a(f,{name:"Email",class:"invalid-feedback"})]),e("div",fe,[pe,a(_,{id:"name",name:"姓名",type:"text",class:p(["form-control",{"is-invalid":t.姓名}]),rules:"required",modelValue:n.form.user.name,"onUpdate:modelValue":s[2]||(s[2]=o=>n.form.user.name=o),placeholder:"請輸入姓名"},null,8,["modelValue","class"]),a(f,{name:"姓名",class:"invalid-feedback"})]),e("div",he,[be,a(_,{id:"tel",name:"電話",type:"tel",class:p(["form-control",{"is-invalid":t.電話}]),rules:"required|min:8|max:10",modelValue:n.form.user.tel,"onUpdate:modelValue":s[3]||(s[3]=o=>n.form.user.tel=o),placeholder:"請輸入電話"},null,8,["modelValue","class"]),a(f,{name:"電話",class:"invalid-feedback"})]),e("div",ge,[ve,a(_,{id:"address",name:"地址",type:"text",class:p(["form-control",{"is-invalid":t.地址}]),rules:"required",modelValue:n.form.user.address,"onUpdate:modelValue":s[4]||(s[4]=o=>n.form.user.address=o),placeholder:"請輸入地址"},null,8,["modelValue","class"]),a(f,{name:"地址",class:"invalid-feedback"})]),e("div",ye,[xe,M(e("textarea",{name:"",id:"message",class:"form-control","onUpdate:modelValue":s[5]||(s[5]=o=>n.form.message=o),cols:"30",rows:"10"},null,512),[[U,n.form.message]])]),e("div",we,[e("button",{type:"submit",class:"btn btn-primary border-2 rounded-3 text-white fw-600 px-5 py-3",disabled:l.cartCount===0},"送出訂單",8,Ve)])]),_:1},8,["onSubmit"])])])])])])}const qe=B(j,[["render",Ce]]);export{qe as default};