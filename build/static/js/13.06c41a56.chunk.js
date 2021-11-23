(this.webpackJsonppplatform=this.webpackJsonppplatform||[]).push([[13],{401:function(e,t,a){"use strict";a.d(t,"b",(function(){return i})),a.d(t,"a",(function(){return c}));var n=a(408),l=a.n(n);function i(e){for(var t="",a=null===e||void 0===e?void 0:e.toString().split("").reverse().join(""),n=0;n<a.length;n++)n%3===0&&(t+=a.substr(n,3)+".");return t.split("",t.length-1).reverse().join("")}function c(e){for(var t=[{divider:1e18,suffix:"E"},{divider:1e15,suffix:"P"},{divider:1e12,suffix:"T"},{divider:1e9,suffix:"G"},{divider:1e6,suffix:"M"},{divider:1e3,suffix:"k"}],a=0;a<t.length;a++)if(e>=t[a].divider)return(e/t[a].divider).toFixed(0).toString()+t[a].suffix;return e.toString()}l.a.register("locale","indonesia",{delimiters:{thousands:".",decimal:","},abbreviations:{thousand:"rb",million:"jt",billion:"M",trillion:"T"},ordinal:function(e){return 1===e?"er":"\xe8me"},currency:{symbol:"IDR"}}),l.a.locale("indonesia")},422:function(e,t,a){"use strict";t.a={draft:"Draft",pending:"For Review",rejected:"To Revise",approved:"Approved"}},799:function(e,t,a){"use strict";a.r(t);var n=a(14),l=a(92),i=a.n(l),c=a(119),r=a(2),o=a(11),s=a(0),d=a.n(s),m=a(385),u=a(390),v=a(392),f=a(393),p=a(394),g=a(395),E=a(219),b=a(384),y=a(634),x=a(378),h=a(387),j=a(388),N=a(370),D=a(396),M=a(383),C=a(807),O=a(805),k=a(493),w=a(28),A=a(86),S=a.n(A),I=a(18),R=a(16),Y=a(171),T=a(33),F=a.n(T),P=a(401),H=a(26),q=a(59),_=a(498),z=a(772),L=a(774),V=a.n(L),B=(a(775),a(24)),U=a(776),J=a(21),G=a(15),K=a(777);var W=a(791),Z=a.n(W),$=a(112),Q=a(407),X=a(422),ee=(t.default=function(){var e,t,a,l,C,O,k,A,T,L,W,le,ie,ce,re,oe,se,de,me,ue,ve,fe,pe,ge,Ee=Object($.b)(),be=Object(I.i)(),ye=Object(s.useRef)(),xe=Object(s.useRef)(),he=Object(s.useRef)(null),je=Object(Q.b)(),Ne=Object(o.a)(je,2),De=Ne[0],Me=Ne[1],Ce=Object(s.useState)(_.EditorState.createEmpty()),Oe=Object(o.a)(Ce,2),ke=Oe[0],we=Oe[1],Ae=Object(s.useState)({idActivity:"",comment:""}),Se=Object(o.a)(Ae,2),Ie=Se[0],Re=Se[1],Ye=Object(s.useState)({id:0,status:"",statusMessage:"",open:!1}),Te=Object(o.a)(Ye,2),Fe=Te[0],Pe=Te[1],He=Object(s.useState)({idProject:0,idActivity:0,status:"",date:"",link:"",open:!1}),qe=Object(o.a)(He,2),_e=qe[0],ze=qe[1],Le=Object(s.useState)({idProject:0,date:"",open:!1}),Ve=Object(o.a)(Le,2),Be=Ve[0],Ue=Ve[1],Je=Object(Y.b)((function(){return"v1/project/".concat(be.params.projectId,"/activity?&sort=").concat(De.sortActivity.value).concat(De.category?"&category=".concat(De.category.value):"").concat(De.searchActivity?"&search=".concat(De.searchActivity):"")})),Ge=Je.data,Ke=Je.error,We=Je.mutate,Ze=!Ge||Ke,$e=Object(s.useMemo)((function(){var e,t;return null!==(e=null===Ge||void 0===Ge||null===(t=Ge.data)||void 0===t?void 0:t.data)&&void 0!==e?e:[]}),[Ge]),Qe=Object(s.useMemo)((function(){var e,t,a,n;return(null!==(e=null===$e||void 0===$e||null===(t=$e.professional)||void 0===t?void 0:t.map((function(e){return{name:e.name,id:e.id,role:"professional"}})))&&void 0!==e?e:[]).concat([{name:null===$e||void 0===$e||null===(a=$e.client)||void 0===a?void 0:a.name,id:null===$e||void 0===$e||null===(n=$e.client)||void 0===n?void 0:n.id,role:"client"}])}),[$e]),Xe=Object(s.useMemo)((function(){var e,t;return null!==(e=null===$e||void 0===$e||null===(t=$e.activityDetails)||void 0===t?void 0:t.filter((function(e){return"deliverable"===e.category})).sort((function(e,t){return e.id-t.id})))&&void 0!==e?e:null}),[$e]),et=Object(w.a)({initialValues:{idActivity:0,category:"discussion",content:{},text:"",isDraft:"false",files:[]},onSubmit:function(e,t){var a=t.setSubmitting,n=(t.setErrors,t.setValues);a(!0);var l=new FormData;e.idActivity&&l.append("idActivity",e.idActivity),l.append("category",e.category),l.append("content",JSON.stringify(e.content)),l.append("text",e.text),l.append("isDraft",e.isDraft),e.files.length>0&&e.files.filter((function(e){return!e.id})).map((function(e,t){return l.append("file"+(t+1),e.file,e.file.name)})),e.idActivity?G.a.put("v1/project/".concat(be.params.projectId,"/activity"),l).then((function(e){J.a.success("Create activity successfully"),n({idActivity:0,category:"discussion",content:{},text:"",isDraft:"false",files:[]}),we(_.EditorState.createEmpty()),We()})).catch((function(e){J.a.error("Create activity failed.")})).finally((function(){a(!1)})):G.a.post("v1/project/".concat(be.params.projectId,"/activity"),l).then((function(e){J.a.success("Create activity successfully"),n({idActivity:0,category:"discussion",content:{},text:"",isDraft:"false",files:[]}),we(_.EditorState.createEmpty()),We()})).catch((function(e){J.a.error("Create activity failed, maybe your file capacity is full.")})).finally((function(){a(!1)}))}}),tt=et.values,at=et.setValues,nt=et.handleSubmit,lt=et.isSubmitting,it=Object(s.useCallback)((function(e){var t,a;"discussion"===e?at((function(t){return Object(r.a)(Object(r.a)({},t),{},{category:e})})):Xe.length>0?(at({idActivity:"draft"===Xe[Xe.length-1].status?Xe[Xe.length-1].id:0,category:e,content:{attendees:Qe,additionalAttendees:null===(t=Xe[Xe.length-1].content)||void 0===t?void 0:t.additionalAttendees,meeting:null===(a=Xe[Xe.length-1].content)||void 0===a?void 0:a.meeting},text:Xe[Xe.length-1].text,isDraft:"true",files:Xe[Xe.length-1].files}),we(_.EditorState.createWithContent(_.ContentState.createFromBlockArray(Object(_.convertFromHTML)(Xe[Xe.length-1].text))))):at((function(t){var a,n;return Object(r.a)(Object(r.a)({},t),{},{idActivity:0,category:e,content:{attendees:Qe,additionalAttendees:[],meeting:{date:F()(null===$e||void 0===$e||null===(a=$e.meetingDetails)||void 0===a?void 0:a.date).format("DD MMMM YYYY"),startTime:F()(null===$e||void 0===$e||null===(n=$e.meetingDetails)||void 0===n?void 0:n.date).format("HH:mm"),endTime:""}}})}))}),[at,Qe,Xe,$e]),ct=Object(s.useCallback)((function(e){at((function(t){return Object(r.a)(Object(r.a)({},t),{},{content:Object(r.a)(Object(r.a)({},t.content),{},{additionalAttendees:null!==e&&void 0!==e?e:[]})})}))}),[at]),rt=Object(s.useCallback)((function(e){var t=e.target.value;at((function(e){return Object(r.a)(Object(r.a)({},e),{},{content:Object(r.a)(Object(r.a)({},e.content),{},{meeting:Object(r.a)(Object(r.a)({},e.content.meeting),{},{endTime:t})})})}))}),[at]),ot=Object(s.useCallback)(function(){var e=Object(c.a)(i.a.mark((function e(t){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,at((function(e){return Object(r.a)(Object(r.a)({},e),{},{isDraft:t})}));case 2:nt();case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[at,nt]),st=Object(s.useCallback)((function(e,t,a){G.a.put("v1/project/".concat(be.params.projectId,"/activity-status"),{idActivity:e,status:t,statusMessage:a}).then((function(e){J.a.success("Verify Deliverable Successfully"),We()})).catch((function(e){J.a.error("Verify Deliverable Failed.")})).finally((function(){Pe({id:0,status:"",statusMessage:"",open:!1})}))}),[be.params.projectId,We]),dt=Object(s.useCallback)((function(e){e.preventDefault();var t=e.target.files;tt.files>=3?J.a.error("Maximum upload files exceeded."):at((function(e){return Object(r.a)(Object(r.a)({},e),{},{files:[].concat(Object(n.a)(e.files),[{preview:URL.createObjectURL(t[0]),file:t[0]}])})}))}),[at,tt]),mt=Object(s.useCallback)((function(e){at((function(t){return Object(r.a)(Object(r.a)({},t),{},{files:t.files.filter((function(t){return t.preview!==e}))})}))}),[at]),ut=Object(s.useCallback)((function(e){Me((function(t){return Object(r.a)(Object(r.a)({},t),{},{category:null!==e&&void 0!==e?e:""})}))}),[Me]),vt=Object(s.useCallback)((function(e){Me((function(t){return Object(r.a)(Object(r.a)({},t),{},{sortActivity:null!==e&&void 0!==e?e:""})}))}),[Me]),ft=Object(s.useCallback)((function(e){var t=e.target.value;Me((function(e){return Object(r.a)(Object(r.a)({},e),{},{searchActivity:t})}))}),[Me]),pt=Object(s.useState)(!1),gt=Object(o.a)(pt,2),Et=gt[0],bt=gt[1],yt=Object(s.useCallback)((function(e,t){bt(!0),Object(G.b)("v1/project/activity/".concat(t,"/pdf"),e+".pdf").then((function(){return bt(!1)}))}),[]),xt=Object(s.useState)(!1),ht=Object(o.a)(xt,2),jt=ht[0],Nt=ht[1],Dt=Object(s.useCallback)((function(){var e;$e.activeRequestMeetingId?Nt(!0):Ue({idProject:be.params.projectId,date:null===$e||void 0===$e||null===(e=$e.meetingDetails)||void 0===e?void 0:e.date,open:!0})}),[$e,be,Nt]);return console.log(Xe),d.a.createElement(m.a,null,d.a.createElement(u.a,{xs:"12"},d.a.createElement(R.b,{to:"/project/".concat(be.params.projectId),className:"font-xl font-weight-bold mb-4 text-dark"},$e.projectName)),d.a.createElement(u.a,{xs:"12",md:"4"},d.a.createElement(v.a,{className:"shadow-sm"},d.a.createElement(f.a,null,d.a.createElement(m.a,null,d.a.createElement(u.a,{xs:"12"},d.a.createElement("div",null,d.a.createElement("span",{className:"text-muted"},"Client")," ",null===$e||void 0===$e||null===(e=$e.client)||void 0===e?void 0:e.name),d.a.createElement("div",null,d.a.createElement("span",{className:"text-muted"},"Consultant")," ",(null===$e||void 0===$e||null===(t=$e.professional)||void 0===t?void 0:t.length)?null===$e||void 0===$e||null===(a=$e.professional[0])||void 0===a?void 0:a.name:""),d.a.createElement("div",null,d.a.createElement("span",{className:"text-muted"},"Contract value")," IDR ",Object(P.b)(null!==(l=null===$e||void 0===$e?void 0:$e.contractValue)&&void 0!==l?l:0)),d.a.createElement("div",null,d.a.createElement("span",{className:"text-muted"},"Starting Date")," ",F()(null===$e||void 0===$e?void 0:$e.stratingDate).format("DD MMMM YYYY")),d.a.createElement("div",null,d.a.createElement("span",{className:"text-muted"},"Closing Date")," ",F()(null===$e||void 0===$e?void 0:$e.closingDate).format("DD MMMM YYYY")))))),d.a.createElement(v.a,{className:"shadow-sm"},d.a.createElement(f.a,null,d.a.createElement(m.a,null,d.a.createElement(u.a,{xs:"12"},d.a.createElement("div",{className:"font-lg font-weight-bold mb-3"},"Meeting"),d.a.createElement("div",{className:"text-muted"},"Meeting Link ",d.a.createElement("a",{href:null!==(C=null===$e||void 0===$e||null===(O=$e.meetingDetails)||void 0===O?void 0:O.link)&&void 0!==C?C:"",target:"_blank",rel:"noopener noreferrer",className:"font-weight-bold ml-1"},"Click here")," "),d.a.createElement("div",{className:"mt-2"},d.a.createElement("div",{className:"text-muted mb-1"},"Meeting Date"),d.a.createElement(p.a,null,d.a.createElement(g.a,{addonType:"prepend",className:"w-100"},d.a.createElement(S.a,{required:!0,name:"startDate",selected:new Date(null!==(k=null===$e||void 0===$e||null===(A=$e.meetingDetails)||void 0===A?void 0:A.date)&&void 0!==k?k:F()()),dateFormat:"dd MMMM yyyy HH:mm",minDate:new Date,className:"form-control bg-white",showTimeInput:!0,disabled:!0,autoComplete:"off",onChangeRaw:function(e){return e.preventDefault()}}),d.a.createElement(E.a,null,d.a.createElement(H.a,{icon:"calendar-alt"})))))),d.a.createElement(u.a,{xs:"12",className:"d-flex justify-content-center mt-3"},d.a.createElement(b.a,{color:"pinion-primary",onClick:Dt},"Request Meeting Date")))))),d.a.createElement(u.a,{xs:"12",md:"8"},d.a.createElement(v.a,{className:"shadow-sm"},d.a.createElement(f.a,null,d.a.createElement(m.a,null,d.a.createElement(u.a,{xs:"12"},d.a.createElement("div",{className:"font-lg font-weight-bold mb-3"},"Key Milestone")),d.a.createElement(u.a,{xs:"12"},d.a.createElement(y.a,{bordered:!0,className:"text-center"},d.a.createElement("thead",null,d.a.createElement("tr",null,d.a.createElement("th",null,"Activities"),d.a.createElement("th",null,"Date"))),d.a.createElement("tbody",null,null===$e||void 0===$e||null===(T=$e.milestoneDetails)||void 0===T?void 0:T.map((function(e,t){return d.a.createElement("tr",{key:t},d.a.createElement("td",null,e.activities),d.a.createElement("td",null,F()(e.date).add(t,"days").format("DD MMMM YYYY")))}))))),d.a.createElement(u.a,{xs:"12",className:"d-flex justify-content-between align-items-center"},d.a.createElement(b.a,{color:"pinion-primary",className:"mr-2 text-light",id:"popover-file-list"},"Project Files"),d.a.createElement(ee,{data:null===$e||void 0===$e?void 0:$e.fileDetails}),d.a.createElement("div",null,d.a.createElement("div",{className:"mb-1 text-muted"},"Status of deliverable"),d.a.createElement("div",{className:"mb-3 text-center"},d.a.createElement(x.a,{color:"approved"===(null===Xe||void 0===Xe||null===(L=Xe.filter((function(e){return"draft"!==e.status})).pop())||void 0===L?void 0:L.status)?"success":"rejected"===(null===Xe||void 0===Xe||null===(W=Xe.filter((function(e){return"draft"!==e.status})).pop())||void 0===W?void 0:W.status)?"danger":"pending"===(null===Xe||void 0===Xe||null===(le=Xe.filter((function(e){return"draft"!==e.status})).pop())||void 0===le?void 0:le.status)?"warning":"secondary",className:"font-lg text-light text-uppercase",style:{cursor:"pointer"},onClick:function(){return ye.current.scrollIntoView({block:"center",behavior:"smooth"})}},null!==(ie=X.a[null===Xe||void 0===Xe||null===(ce=Xe.filter((function(e){return"draft"!==e.status})).pop())||void 0===ce?void 0:ce.status])&&void 0!==ie?ie:"Draft")))))))),d.a.createElement(u.a,{xs:"12"},d.a.createElement(v.a,{className:"shadow-sm"},d.a.createElement(f.a,null,d.a.createElement(m.a,null,d.a.createElement(u.a,{xs:"12",className:"mb-3"},d.a.createElement(b.a,{color:"".concat("discussion"===(null===tt||void 0===tt?void 0:tt.category)?"pinion-primary":"pinion-secondary"),className:"text-light mr-3",onClick:function(){return it("discussion")}},"Discussion"),"professional"===Ee.role&&["draft","rejected"].includes((null===Xe||void 0===Xe?void 0:Xe.length)>0?Xe[(null===Xe||void 0===Xe?void 0:Xe.length)-1].status:"draft")&&d.a.createElement(b.a,{color:"".concat("deliverable"===(null===tt||void 0===tt?void 0:tt.category)?"pinion-primary":"pinion-secondary"),className:"text-light",onClick:function(){return it("deliverable")}},"Deliverable")),"deliverable"===tt.category&&d.a.createElement(u.a,{xs:"12"},d.a.createElement(m.a,{className:"my-3"},d.a.createElement(u.a,{xs:"12",md:"4",lg:"3",className:"d-flex align-items-center"},d.a.createElement(h.a,null,"Meeting Date")),d.a.createElement(u.a,{xs:"12",md:"8",lg:"9",className:"d-flex align-items-center justify-content-between"},null===tt||void 0===tt||null===(re=tt.content)||void 0===re||null===(oe=re.meeting)||void 0===oe?void 0:oe.date)),d.a.createElement(m.a,{className:"my-3"},d.a.createElement(u.a,{xs:"12",md:"4",lg:"3",className:"d-flex align-items-center"},d.a.createElement(h.a,null,"Meeting Time")),d.a.createElement(u.a,{xs:"12",md:"8",lg:"9",className:"d-flex align-items-center justify-content-between"},d.a.createElement(p.a,null,d.a.createElement(g.a,{addonType:"prepend"},d.a.createElement(E.a,{className:"bg-transparent border-0 pl-0"},null===tt||void 0===tt||null===(se=tt.content)||void 0===se||null===(de=se.meeting)||void 0===de?void 0:de.startTime," -"),d.a.createElement(Z.a,{type:"text",mask:"99:99",value:null===tt||void 0===tt||null===(me=tt.content)||void 0===me||null===(ue=me.meeting)||void 0===ue?void 0:ue.endTime,onChange:rt,placeholder:"Example 08:00"},(function(e){return d.a.createElement(j.a,e)})))))),d.a.createElement(m.a,{className:"my-3"},d.a.createElement(u.a,{xs:"12",md:"4",lg:"3",className:"d-flex align-items-center"},d.a.createElement(h.a,null,"Attendees")),d.a.createElement(u.a,{xs:"12",md:"8",lg:"9",className:"d-flex"},null===tt||void 0===tt||null===(ve=tt.content)||void 0===ve||null===(fe=ve.attendees)||void 0===fe?void 0:fe.map((function(e,t){var a;return d.a.createElement("div",{key:t}," ",e.name,(null===tt||void 0===tt||null===(a=tt.content)||void 0===a?void 0:a.attendees.length)===t+1?"":", ")})))),d.a.createElement(m.a,{className:"my-3"},d.a.createElement(u.a,{xs:"12",md:"4",lg:"3",className:"d-flex align-items-center"},d.a.createElement(h.a,null,"Additional attendees")),d.a.createElement(u.a,{xs:"12",md:"8",lg:"9"},d.a.createElement(U.a,{isClearable:!0,isMulti:!0,placeholder:"Input attendees email...",value:null===tt||void 0===tt||null===(pe=tt.content)||void 0===pe?void 0:pe.additionalAttendees,isValidNewOption:function(e){return/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(e).toLowerCase())},onChange:ct,formatGroupLabel:function(e){return d.a.createElement("div",{style:{display:"flex",alignItems:"center"}},d.a.createElement("span",{style:{fontWeight:"bold",fontSize:"10px",letterSpacing:"1px"},className:"text-muted"},e.label))},noOptionsMessage:function(e){return d.a.createElement("span",null,"Input attendees email")},components:{DropdownIndicator:function(){return null},IndicatorSeparator:function(){return null}}})))),d.a.createElement(u.a,{xs:"12"},d.a.createElement(z.Editor,{editorState:ke,editorStyle:{height:"300px"},onEditorStateChange:function(e){return we(e)},onContentStateChange:function(e){return function(e){at((function(t){return Object(r.a)(Object(r.a)({},t),{},{text:V()(e)})}))}(e)}})),d.a.createElement(u.a,{xs:"12",className:"my-3"},null===tt||void 0===tt||null===(ge=tt.files)||void 0===ge?void 0:ge.map((function(e,t){var a,n,l;return d.a.createElement(s.Fragment,{key:t},d.a.createElement("div",{className:"rounded border border-dark d-inline p-1"},(null===e||void 0===e||null===(a=e.file)||void 0===a?void 0:a.name)&&d.a.createElement(H.a,{icon:"times",color:"#f86c6b",className:"mr-1",onClick:function(){return mt(e.preview)},style:{cursor:"pointer"}})," ",null!==(n=null===e||void 0===e||null===(l=e.file)||void 0===l?void 0:l.name)&&void 0!==n?n:e.fileName),d.a.createElement("div",{className:"mb-3"}))}))),d.a.createElement(u.a,{xs:"12"},d.a.createElement("input",{type:"file",ref:he,style:{display:"none"},onChange:function(e){return dt(e)}}),d.a.createElement(b.a,{color:"pinion-secondary",disabled:tt.files>=3,className:"text-light",onClick:function(){return he.current.click()}}," ",d.a.createElement(H.a,{icon:"upload"})," Attachment"),d.a.createElement(b.a,{color:"pinion-primary",className:"float-right",onClick:function(){return ot("false")},disabled:lt},lt?d.a.createElement(d.a.Fragment,null,d.a.createElement(N.a,{color:"light",size:"sm"})," Loading..."):"Post"),"deliverable"===tt.category&&d.a.createElement(b.a,{color:"secondary",className:"float-right mr-2 text-light",onClick:function(){return ot("true")},disabled:lt},lt?d.a.createElement(d.a.Fragment,null,d.a.createElement(N.a,{color:"light",size:"sm"})," Loading..."):"Draft")))))),d.a.createElement(u.a,{xs:"12"},d.a.createElement(m.a,null,d.a.createElement(u.a,{xs:"12",md:"3"},d.a.createElement("div",{className:"mb-1 text-muted"},"Category"),d.a.createElement("div",{className:"mb-3"},d.a.createElement(B.a,{options:[{value:"deliverable",label:"Deliverable"},{value:"discussion",label:"Discussion"},{value:"meeting_date",label:"Meeting Date"}],value:De.category,isClearable:!0,onChange:function(e){return ut(e)},components:{DropdownIndicator:function(){return null},IndicatorSeparator:function(){return null}}}))),d.a.createElement(u.a,{xs:"12",md:"3"},d.a.createElement("div",{className:"mb-1 text-muted"},"Date Sort"),d.a.createElement("div",{className:"mb-3"},d.a.createElement(B.a,{options:[{label:"Newest to Oldest",value:"createdAt_DESC"},{label:"Oldest to Newest",value:"createdAt_ASC"}],value:De.sortActivity,onChange:function(e){return vt(e)},components:{DropdownIndicator:function(){return null},IndicatorSeparator:function(){return null}}}))),d.a.createElement(u.a,{xs:"12",md:"3",className:"justify-content-end"},d.a.createElement("div",{className:"mb-1 text-muted"},"\xa0"),d.a.createElement("div",{className:"mb-3"},d.a.createElement(j.a,{type:"text",placeholder:"Search...",value:De.searchActivity,onChange:ft}))),d.a.createElement(u.a,{xs:"12"},Ze?d.a.createElement(v.a,{className:"shadow-sm"},d.a.createElement(f.a,{className:"position-relative"},d.a.createElement("div",{style:{position:"absolute",top:0,right:0,bottom:0,left:0,display:"flex",justifyContent:"center",alignItems:"center"}},d.a.createElement(N.a,{style:{width:48,height:48}})))):d.a.createElement("div",null,$e.activityDetails.length<=0&&d.a.createElement(v.a,{className:"shadow-sm"},d.a.createElement(f.a,{className:"position-relative"},d.a.createElement("div",{style:{width:"100%",height:"500px"},className:"d-flex align-items-center justify-content-center text-muted"}," No Activities "))),$e.activityDetails.filter((function(e){return"draft"!==e.status})).map((function(e,t){var a,n,l,i,c,r,o,p,g,E,y,j,D,M,C,O,k,w,A,S,I;return d.a.createElement(v.a,{className:"shadow-sm",key:t},"createdAt_DESC"===De.sortActivity.value&&Xe.length>0&&Xe[(null===Xe||void 0===Xe?void 0:Xe.length)-1].id===e.id&&d.a.createElement("div",{ref:ye}),"meeting_date"===e.category&&e.id===$e.activeRequestMeetingId&&d.a.createElement("div",{ref:xe}),d.a.createElement(f.a,{className:"position-relative"},d.a.createElement("div",{className:"position-absolute",style:{right:20}},d.a.createElement(x.a,{className:"font-lg text-uppercase text-light",color:"".concat("meeting_date"===e.category?"info":"discussion"===e.category?"warning":"pinion-primary")},e.category.replace("_"," "))),d.a.createElement("div",{className:"position-absolute",style:{top:55,right:20}},"deliverable"===e.category&&d.a.createElement(x.a,{color:"approved"===e.status?"success":"rejected"===e.status?"danger":"pending"===e.status?"warning":"secondary",className:"font-sm text-light text-uppercase"},null!==(a=X.a[e.status])&&void 0!==a?a:"Draft")),d.a.createElement("div",{className:"font-lg font-weight-bold mb-1"},null===e||void 0===e||null===(n=e.createdBy)||void 0===n?void 0:n.name),d.a.createElement("div",{className:"text-muted mb-3"},F.a.utc(e.createdAt).local().format("DD MMMM YYYY HH:mm")),"deliverable"===e.category&&d.a.createElement("div",null,d.a.createElement(m.a,{className:"my-1"},d.a.createElement(u.a,{xs:"12",md:"4",lg:"3",className:"d-flex align-items-center"},d.a.createElement(h.a,null,"Meeting Date")),d.a.createElement(u.a,{xs:"12",md:"8",lg:"9",className:"d-flex align-items-center justify-content-between"},null===e||void 0===e||null===(l=e.content)||void 0===l||null===(i=l.meeting)||void 0===i?void 0:i.date)),d.a.createElement(m.a,{className:"my-1"},d.a.createElement(u.a,{xs:"12",md:"4",lg:"3",className:"d-flex align-items-center"},d.a.createElement(h.a,null,"Meeting Time")),d.a.createElement(u.a,{xs:"12",md:"8",lg:"9",className:"d-flex align-items-center justify-content-between"},null===e||void 0===e||null===(c=e.content)||void 0===c||null===(r=c.meeting)||void 0===r?void 0:r.startTime," - ",""!==(null===e||void 0===e||null===(o=e.content)||void 0===o||null===(p=o.meeting)||void 0===p?void 0:p.endTime)?null===e||void 0===e||null===(g=e.content)||void 0===g||null===(E=g.meeting)||void 0===E?void 0:E.endTime:"Finish")),d.a.createElement(m.a,{className:"my-1"},d.a.createElement(u.a,{xs:"12",md:"4",lg:"3",className:"d-flex align-items-center"},d.a.createElement(h.a,null,"Attendees")),d.a.createElement(u.a,{xs:"12",md:"8",lg:"9",className:"d-flex"},null===e||void 0===e||null===(y=e.content)||void 0===y||null===(j=y.attendees)||void 0===j?void 0:j.map((function(t,a){var n;return d.a.createElement("div",{key:a}," ",t.name,d.a.createElement("span",{className:"text-capitalize"},"(",t.role,")"),(null===e||void 0===e||null===(n=e.content)||void 0===n?void 0:n.attendees.length)===a+1?"":",")})))),d.a.createElement(m.a,{className:"my-1"},d.a.createElement(u.a,{xs:"12",md:"4",lg:"3",className:"d-flex align-items-center"},d.a.createElement(h.a,null,"Additional attendees")),d.a.createElement(u.a,{xs:"12",md:"8",lg:"9"},null===e||void 0===e||null===(D=e.content)||void 0===D||null===(M=D.additionalAttendees)||void 0===M?void 0:M.map((function(e){return e.label}))))),d.a.createElement("div",{className:"mb-3 activity-text"},"meeting_date"===e.category?"Requested meeting date change to "+F.a.utc(e.content.date).local().format("DD MMMM YYYY HH:mm"):Object(K.a)(e.text)),d.a.createElement("div",{className:"mb-4"},null===e||void 0===e||null===(C=e.files)||void 0===C?void 0:C.map((function(e,t){return d.a.createElement(s.Fragment,{key:t},d.a.createElement("div",{className:"rounded border d-inline p-1"},d.a.createElement("a",{href:e.fileUrl,target:"_blank",rel:"noopener noreferrer",className:"text-dark",style:{textDecoration:"none"}},e.fileName)),d.a.createElement("div",{className:"mb-3"}))}))),"deliverable"===e.category&&d.a.createElement("div",{className:"mb-3 d-flex justify-content-end"},"pending"===e.status&&"professional"!==Ee.role&&d.a.createElement(d.a.Fragment,null,d.a.createElement(b.a,{color:"warning",onClick:function(){return Pe({id:e.id,status:"rejected",statusMessage:"",open:!0})}},"To Revise"),d.a.createElement(b.a,{color:"success",className:"mx-2",onClick:function(){return Pe({id:e.id,status:"approved",statusMessage:"",open:!0})}},"Approve")),"approved"===e.status&&d.a.createElement(b.a,{color:"secondary",disabled:Et,onClick:function(){return yt("deliverable",e.id)}},Et?d.a.createElement(d.a.Fragment,null,d.a.createElement(N.a,{color:"light",size:"sm"})," Loading..."):"Download")),"meeting_date"===e.category&&"pending"===e.status&&Ee.id!==e.createdBy.id&&d.a.createElement("div",{className:"mb-3 d-flex justify-content-end"},d.a.createElement(b.a,{color:"success",className:"mx-2",onClick:function(){var t,a;return ze({idProject:be.params.projectId,idActivity:e.id,status:"approved",date:e.content.date,link:null!==(t=null===$e||void 0===$e||null===(a=$e.meetingDetails)||void 0===a?void 0:a.link)&&void 0!==t?t:"",open:!0})}},"Approve"),d.a.createElement(b.a,{color:"danger",onClick:function(){var t,a;return ze({idProject:be.params.projectId,idActivity:e.id,status:"rejected",date:e.content.date,link:null!==(t=null===$e||void 0===$e||null===(a=$e.meetingDetails)||void 0===a?void 0:a.link)&&void 0!==t?t:"",open:!0})}},"Reject")),(null===(O=e.content)||void 0===O||null===(k=O.replies)||void 0===k?void 0:k.length)>0&&d.a.createElement("div",{className:"pl-5"},null===(w=e.content)||void 0===w||null===(A=w.replies)||void 0===A?void 0:A.map((function(e,t){return d.a.createElement(v.a,{className:"my-1",key:t},d.a.createElement(f.a,{className:"p-3"},d.a.createElement("div",{className:"font-lg font-weight-bold mb-1"},e.createdBy.name),d.a.createElement("div",{className:"text-muted mb-3"},F.a.utc(e.createdAt).local().format("DD MMMM YYYY HH:mm")),d.a.createElement("div",null,e.comment)))}))),d.a.createElement("div",{className:"".concat((null===(S=e.content)||void 0===S||null===(I=S.replies)||void 0===I?void 0:I.length)>0&&"pl-5")},d.a.createElement(q.a,{rows:"3",name:"comment",id:"comment",style:{borderRadius:"10px"},className:"form-control",placeholder:"Type your reply...",value:e.id===Ie.idActivity?Ie.comment:"",onChange:function(t){return Re({idActivity:e.id,comment:t.target.value})},onKeyPress:function(e){"Enter"===e.key&&(e.target.blur(),G.a.post("v1/project/".concat(be.params.projectId,"/activity-reply"),Ie).then((function(e){J.a.success("Reply Successfully"),Re({idActivity:"",comment:""}),We()})).catch((function(e){J.a.error("Reply Failed")})))}}))))}))),"createdAt_ASC"===De.sortActivity.value&&d.a.createElement("div",{ref:ye}),d.a.createElement(D.a,{isOpen:Fe.open,centered:!0,toggle:function(){return Pe({id:0,status:"",statusMessage:"",open:!1})}},d.a.createElement(M.a,{className:"p-5"},d.a.createElement(m.a,null,d.a.createElement(u.a,{xs:"12"},d.a.createElement("div",{className:"mb-2"},"approved"===Fe.status?"You are about to submit your deliverable for approval process.":"Are you sure you want to 'Revise' this deliverable")),d.a.createElement(u.a,{xs:"12",className:"d-flex justify-content-end mt-5"},d.a.createElement(b.a,{color:"secondary",className:"mr-2",onClick:function(){return Pe({id:0,status:"",statusMessage:"",open:!1})}},"Cancel"),d.a.createElement(b.a,{color:"primary",className:"text-capitalize",disabled:lt,onClick:function(){return st(Fe.id,Fe.status,Fe.statusMessage)}},Fe.status))))),d.a.createElement(ae,{modalMeetingDate:_e,onChangeModalMeetingDate:ze,mutate:We}),d.a.createElement(te,{modalMeetingRequest:Be,onChangeModalMeetingRequest:Ue,mutate:We}),d.a.createElement(ne,{modalAlertMeetingDate:jt,onChangeModalAlertMeetingDate:Nt,meetingDateRef:xe})))))},function(e){var t,a,n,l,i=e.data,c=Array(9).fill();return d.a.createElement(C.a,{trigger:"legacy",placement:"bottom",target:"popover-file-list",popperClassName:"popover-file-list"},d.a.createElement(O.a,null,d.a.createElement(m.a,{className:"p-2"},d.a.createElement(u.a,{xs:"8"},d.a.createElement("div",{className:"font-weight-bold"},"Project Files")),d.a.createElement(u.a,{xs:"4"},d.a.createElement(k.a,{className:"mb-2",value:(null!==(t=null===i||void 0===i||null===(a=i.fileList)||void 0===a?void 0:a.length)&&void 0!==t?t:0)/9*100},d.a.createElement("div",{className:"text-dark text-center"},"File ",null===i||void 0===i||null===(n=i.fileList)||void 0===n?void 0:n.length,"/9")),d.a.createElement(k.a,{color:"pinion-secondary",value:(null!==(l=null===i||void 0===i?void 0:i.totalSize)&&void 0!==l?l:0)/1e8*100},d.a.createElement("div",{className:"text-dark text-center"},"Capacity ",(null===i||void 0===i?void 0:i.totalSize)/1e6,"MB/100MB"))),d.a.createElement(u.a,{xs:"12",className:"my-3"},d.a.createElement(m.a,null,c.map((function(e,t){var a,n,l;return d.a.createElement(u.a,{xs:"12",key:t},d.a.createElement("a",{href:null!==(a=null===i||void 0===i||null===(n=i.fileList[t])||void 0===n?void 0:n.fileUrl)&&void 0!==a?a:"",target:"_blank",rel:"noopener noreferrer",className:"text-dark"},t+1,". ",null===i||void 0===i||null===(l=i.fileList[t])||void 0===l?void 0:l.fileName))})))),d.a.createElement(u.a,{xs:"12"},d.a.createElement("div",{className:"text-muted"},"Your project storage is limited at maximum 9 files or 100 MB")))))}),te=function(e){var t,a=e.modalMeetingRequest,n=e.onChangeModalMeetingRequest,l=e.mutate,i=Object(s.useState)(null),c=Object(o.a)(i,2),r=c[0],v=c[1],f=Object(s.useCallback)((function(e){G.a.post("v1/project/".concat(a.idProject,"/activity"),{category:"meeting_date",content:{date:F()(r)},text:"",isDraft:"false"}).then((function(e){J.a.success("Change Meeting Date Successfully."),n({idProject:0,date:new Date,open:!1}),l()})).catch((function(e){J.a.error("Change Meeting Date Failed.")}))}),[a,l,r,n]);return d.a.createElement(D.a,{isOpen:a.open,centered:!0,toggle:function(){return n({idProject:0,date:new Date,open:!1})}},d.a.createElement(M.a,{className:"p-5"},d.a.createElement(m.a,null,d.a.createElement(u.a,{xs:"12"},d.a.createElement("div",{className:"mb-2"},"Choose the meeting date you want.")),d.a.createElement(u.a,{xs:"12"},d.a.createElement("div",{className:"mb-2"},d.a.createElement(p.a,null,d.a.createElement(g.a,{addonType:"prepend",className:"w-100"},d.a.createElement(S.a,{required:!0,name:"startDate",selected:new Date(null!==r&&void 0!==r?r:null!==(t=null===a||void 0===a?void 0:a.date)&&void 0!==t?t:F()()),dateFormat:"dd MMMM yyyy HH:mm",minDate:new Date,className:"form-control bg-white",showTimeInput:!0,autoComplete:"off",onChange:function(e){v(e)},onChangeRaw:function(e){return e.preventDefault()}}),d.a.createElement(E.a,null,d.a.createElement(H.a,{icon:"calendar-alt"})))))),d.a.createElement(u.a,{xs:"12",className:"d-flex justify-content-end mt-5"},d.a.createElement(b.a,{color:"secondary",className:"mr-2",onClick:function(){return n({idProject:0,date:new Date,open:!1})}},"Cancel"),d.a.createElement(b.a,{color:"primary",className:"text-capitalize",onClick:function(){return f()}},"Request")))))},ae=function(e){var t=e.modalMeetingDate,a=e.onChangeModalMeetingDate,n=e.mutate,l=Object(s.useState)(null),i=Object(o.a)(l,2),c=i[0],r=i[1],v=Object(s.useCallback)((function(e){G.a.put("v1/project/".concat(t.idProject,"/activity-meeting"),{meetingDetails:{link:t.link,date:F()(null!==c&&void 0!==c?c:t.date)},status:t.status,idActivity:t.idActivity}).then((function(e){J.a.success("Change Meeting Date Successfully."),a({idProject:0,idActivity:0,status:"",date:"",link:"",open:!1}),n()})).catch((function(e){J.a.error("Change Meeting Date Failed.")}))}),[t,n,c,a]);return d.a.createElement(D.a,{isOpen:t.open,centered:!0,toggle:function(){return a({idProject:0,idActivity:0,status:"",date:"",link:"",open:!1})}},d.a.createElement(M.a,{className:"p-5"},d.a.createElement(m.a,null,d.a.createElement(u.a,{xs:"12"},d.a.createElement("div",{className:"mb-2"},"approved"===t.status?"Choose a meeting date that suits your discussion.":"Are you sure you want to 'Reject' this request?")),d.a.createElement(u.a,{xs:"12"},d.a.createElement("div",{className:"mb-2"},"approved"===t.status?d.a.createElement(p.a,null,d.a.createElement(g.a,{addonType:"prepend",className:"w-100"},d.a.createElement(S.a,{required:!0,name:"startDate",selected:new Date(null!==c&&void 0!==c?c:null===t||void 0===t?void 0:t.date),dateFormat:"dd MMMM yyyy HH:mm",minDate:new Date,className:"form-control bg-white",showTimeInput:!0,autoComplete:"off",onChange:function(e){r(e)},onChangeRaw:function(e){return e.preventDefault()}}),d.a.createElement(E.a,null,d.a.createElement(H.a,{icon:"calendar-alt"})))):null)),d.a.createElement(u.a,{xs:"12",className:"d-flex justify-content-end mt-5"},d.a.createElement(b.a,{color:"secondary",className:"mr-2",onClick:function(){return a({idProject:0,idActivity:0,status:"",date:"",link:"",open:!1})}},"Cancel"),d.a.createElement(b.a,{color:"primary",className:"text-capitalize",onClick:function(){return v()}},t.status)))))},ne=function(e){var t=e.modalAlertMeetingDate,a=e.onChangeModalAlertMeetingDate,n=e.meetingDateRef;return d.a.createElement(D.a,{size:"sm",centered:!0,isOpen:t,returnFocusAfterClose:!1,toggle:function(){a(!1),n.current.scrollIntoView({block:"center",behavior:"smooth"})}},d.a.createElement(M.a,{className:"p-4"},d.a.createElement(m.a,null,d.a.createElement(u.a,{xs:"12"},d.a.createElement("div",{className:"mb-3 text-center"},"There are still unconfirmed meeting date requests !")),d.a.createElement(u.a,{xs:"12",className:"d-flex justify-content-center"},d.a.createElement(b.a,{color:"secondary",onClick:function(){a(!1),n.current.scrollIntoView({block:"center",behavior:"smooth"})}},"Close")))))}}}]);
//# sourceMappingURL=13.06c41a56.chunk.js.map