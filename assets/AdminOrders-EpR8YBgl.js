import{a as p,S as m}from"./sweetalert2.all-FS2xVMHR.js";import{_ as v,o as l,c as n,d as e,t as o,e as M,F as _,i as O,D as w,H as x,m as P,a as C,r as b,b as g,n as S}from"./index-NnlbEwpK.js";import{s as k}from"./sweetMessageStore-aReIbNgC.js";import{m as E,D as V}from"./DelModal-t7KZNUSy.js";import{P as A}from"./PaginationComponent-u_9Ef_7Q.js";import"./bootstrap.esm-UN3Qh_Ru.js";const U={props:{order:Object},data(){return{modal:null,tempOrder:{}}},emits:["update-paid"],mixins:[E],watch:{order(){this.tempOrder=this.order}}},I={class:"modal fade",id:"productModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true",ref:"modal"},L={class:"modal-dialog modal-xl",role:"document"},T={class:"modal-content border-0"},R=e("div",{class:"modal-header bg-dark text-white"},[e("h5",{class:"modal-title",id:"exampleModalLabel"},[e("span",null,"訂單細節")]),e("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),B={class:"modal-body"},H={class:"row"},N={class:"col-md-4"},j=e("h3",null,"用戶資料",-1),q={class:"table"},F={key:0},z=e("th",{style:{width:"100px"}},"姓名",-1),J=e("th",null,"Email",-1),Y=e("th",null,"電話",-1),G=e("th",null,"地址",-1),K=e("h3",null,"用戶留言",-1),Q={class:"fw-bold"},W={class:"col-md-8"},X=e("h3",null,"訂單細節",-1),Z={class:"table"},ee=e("th",{style:{width:"100px"}},"訂單編號",-1),te=e("th",null,"下單時間",-1),se=e("th",null,"付款時間",-1),oe={key:0},le={key:1},ne=e("th",null,"付款狀態",-1),re={key:0,class:"text-success"},de={key:1,class:"text-muted"},ae=e("th",null,"總金額",-1),ie=e("h3",null,"選購商品",-1),ce={class:"table"},ue=e("thead",null,[e("tr")],-1),_e={class:"text-end"},he={class:"d-flex justify-content-end"},pe={class:"form-check"},me={class:"form-check-label",for:"flexCheckDefault"},be={key:0},ge={key:1},fe={class:"modal-footer"},ye=e("button",{type:"button",class:"btn btn-outline-secondary","data-bs-dismiss":"modal"}," 取消 ",-1);function Me(s,d,c,h,t,u){return l(),n("div",I,[e("div",L,[e("div",T,[R,e("div",B,[e("div",H,[e("div",N,[j,e("table",q,[t.tempOrder.user?(l(),n("tbody",F,[e("tr",null,[z,e("td",null,o(t.tempOrder.user.name),1)]),e("tr",null,[J,e("td",null,o(t.tempOrder.user.email),1)]),e("tr",null,[Y,e("td",null,o(t.tempOrder.user.tel),1)]),e("tr",null,[G,e("td",null,o(t.tempOrder.user.address),1)])])):M("",!0)]),K,e("p",Q,o(t.tempOrder.message),1)]),e("div",W,[X,e("table",Z,[e("tbody",null,[e("tr",null,[ee,e("td",null,o(t.tempOrder.id),1)]),e("tr",null,[te,e("td",null,o(s.$filters.date(t.tempOrder.create_at)),1)]),e("tr",null,[se,e("td",null,[t.tempOrder.paid_date?(l(),n("span",oe,o(s.$filters.date(t.tempOrder.paid_date)),1)):(l(),n("span",le,"時間不正確"))])]),e("tr",null,[ne,e("td",null,[t.tempOrder.is_paid?(l(),n("strong",re,"已付款")):(l(),n("span",de,"尚未付款"))])]),e("tr",null,[ae,e("td",null,o(s.$filters.currency(t.tempOrder.total)),1)])])]),ie,e("table",ce,[ue,e("tbody",null,[(l(!0),n(_,null,O(t.tempOrder.products,a=>(l(),n("tr",{key:a.id},[e("th",null,o(a.product.title),1),e("td",null,o(a.qty)+" / "+o(a.product.unit),1),e("td",_e,o(s.$filters.currency(a.final_total)),1)]))),128))])]),e("div",he,[e("div",pe,[w(e("input",{class:"form-check-input",type:"checkbox",value:"",id:"flexCheckDefault","onUpdate:modelValue":d[0]||(d[0]=a=>t.tempOrder.is_paid=a)},null,512),[[x,t.tempOrder.is_paid]]),e("label",me,[t.tempOrder.is_paid?(l(),n("span",be,"已付款")):(l(),n("span",ge,"未付款"))])])])])])]),e("div",fe,[ye,e("button",{type:"button",class:"btn btn-primary",onClick:d[1]||(d[1]=a=>s.$emit("update-paid",t.tempOrder))}," 修改付款狀態 ")])])])],512)}const Oe=v(U,[["render",Me]]);var ke={VITE_URL:"https://ec-course-api.hexschool.io/v2",VITE_PATH:"ming777",BASE_URL:"/YoJapan/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:f,VITE_PATH:y}=ke,ve={data(){return{currentOrder:{},orders:{},pagination:{},currentPage:1}},methods:{...P(k,["setSweetMessageSuccess","setSweetMessageError"]),getAllOrder(s=1){this.currentPage=s,p.get(`${f}/api/${y}/admin/orders?page=${this.currentPage}`).then(d=>{const{orders:c,pagination:h}=d.data;this.orders=c,this.pagination=h}).catch(d=>{this.setSweetMessageError(d.response.data.message),m.fire(this.sweetMessage)})},updatePaid(s){const d={is_paid:s.is_paid};p.put(`${f}/api/${y}/admin/order/${s.id}`,{data:d}).then(c=>{this.getAllOrder(this.currentPage),this.$refs.orderModal.hideModal(),this.toastMessage.fire({icon:"success",title:c.data.message})}).catch(c=>{this.setSweetMessageError(c.response.data.message),m.fire(this.sweetMessage)})},delOrder(){p.delete(`${f}/api/${y}/admin/order/${this.currentOrder.id}`).then(s=>{this.getAllOrder(this.currentPage),this.$refs.orderDelModal.hideModal(),this.toastMessage.fire({icon:"success",title:s.data.message})}).catch(s=>{this.setSweetMessageError(s.response.data.message),m.fire(this.sweetMessage)})},openModal(s){this.currentOrder={...s},this.$refs.orderModal.openModal()},openDelModal(s){this.currentOrder={...s},this.$refs.orderDelModal.openModal()}},mounted(){this.getAllOrder()},computed:{...C(k,["sweetMessage","toastMessage"])},components:{OrderModal:Oe,DelModal:V,Pagination:A}},we=e("h3",{class:"mt-4"},"訂單列表",-1),xe={class:"bg-white mt-16 p-3"},$e={class:"table table-striped mb-0"},De=e("thead",null,[e("tr",null,[e("th",null,"購買時間"),e("th",null,"Email"),e("th",null,"購買款項"),e("th",null,"應付金額"),e("th",null,"是否付款"),e("th",null,"編輯")])],-1),Pe=["textContent"],Ce={class:"list-unstyled"},Se={class:"text-right"},Ee={class:"form-check form-switch"},Ve=["id","onUpdate:modelValue","onChange"],Ae=["for"],Ue={key:0},Ie={key:1},Le={class:"btn-group"},Te=["onClick"],Re=["onClick"];function Be(s,d,c,h,t,u){const a=b("OrderModal"),$=b("DelModal"),D=b("Pagination");return l(),n(_,null,[we,e("div",xe,[e("table",$e,[De,e("tbody",null,[(l(!0),n(_,null,O(t.orders,r=>(l(),n(_,{key:r.id},[t.orders.length?(l(),n("tr",{key:0,class:S({"text-secondary":!r.is_paid})},[e("td",null,o(s.$filters.date(r.create_at)),1),e("td",null,[r.user?(l(),n("span",{key:0,textContent:o(r.user.email)},null,8,Pe)):M("",!0)]),e("td",null,[e("ul",Ce,[(l(!0),n(_,null,O(r.products,i=>(l(),n("li",{key:i.id},o(i.product.title)+" 數量："+o(i.qty)+" "+o(i.product.unit),1))),128))])]),e("td",Se,o(r.total),1),e("td",null,[e("div",Ee,[w(e("input",{class:"form-check-input",type:"checkbox",id:`paidSwitch${r.id}`,"onUpdate:modelValue":i=>r.is_paid=i,onChange:i=>u.updatePaid(r)},null,40,Ve),[[x,r.is_paid]]),e("label",{class:"form-check-label",for:`paidSwitch${r.id}`},[r.is_paid?(l(),n("span",Ue,"已付款")):(l(),n("span",Ie,"未付款"))],8,Ae)])]),e("td",null,[e("div",Le,[e("button",{class:"btn btn-outline-primary btn-sm",type:"button",onClick:i=>u.openModal(r)}," 檢視 ",8,Te),e("button",{class:"btn btn-outline-danger btn-sm",type:"button",onClick:i=>u.openDelModal(r)}," 刪除 ",8,Re)])])],2)):M("",!0)],64))),128))])])]),g(a,{order:t.currentOrder,ref:"orderModal",onUpdatePaid:u.updatePaid},null,8,["order","onUpdatePaid"]),g($,{item:t.currentOrder,ref:"orderDelModal",onDelItem:u.delOrder},null,8,["item","onDelItem"]),g(D,{pages:t.pagination,onChangePage:u.getAllOrder},null,8,["pages","onChangePage"])],64)}const Je=v(ve,[["render",Be]]);export{Je as default};
