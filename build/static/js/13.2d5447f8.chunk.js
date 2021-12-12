(this.webpackJsonppplatform=this.webpackJsonppplatform||[]).push([[13],{401:function(e,t,a){"use strict";a.d(t,"b",(function(){return i})),a.d(t,"a",(function(){return c}));var n=a(408),l=a.n(n);function i(e){for(var t="",a=null===e||void 0===e?void 0:e.toString().split("").reverse().join(""),n=0;n<a.length;n++)n%3===0&&(t+=a.substr(n,3)+".");return t.split("",t.length-1).reverse().join("")}function c(e){for(var t=[{divider:1e18,suffix:"E"},{divider:1e15,suffix:"P"},{divider:1e12,suffix:"T"},{divider:1e9,suffix:"B"},{divider:1e6,suffix:"mio"},{divider:1e3,suffix:"k"}],a=0;a<t.length;a++)if(e>=t[a].divider)return(e/t[a].divider).toFixed(1).toString()+t[a].suffix;return e.toString()}l.a.register("locale","indonesia",{delimiters:{thousands:".",decimal:","},abbreviations:{thousand:"rb",million:"jt",billion:"M",trillion:"T"},ordinal:function(e){return 1===e?"er":"\xe8me"},currency:{symbol:"IDR"}}),l.a.locale("indonesia")},422:function(e,t,a){"use strict";t.a={draft:"Draft",pending:"For Review",rejected:"To Revise",approved:"Approved"}},799:function(e,t,a){"use strict";a.r(t);var n=a(14),l=a(92),i=a.n(l),c=a(119),r=a(2),o=a(11),s=a(0),d=a.n(s),m=a(385),u=a(390),v=a(392),f=a(393),p=a(394),g=a(395),E=a(219),b=a(384),y=a(634),h=a(378),x=a(387),j=a(388),N=a(370),D=a(396),C=a(383),M=a(807),O=a(805),k=a(493),w=a(28),A=a(86),S=a.n(A),Y=a(18),I=a(16),R=a(171),F=a(33),T=a.n(F),P=a(401),q=a(26),z=a(59),H=a(498),L=a(772),_=a(774),V=a.n(_),B=(a(775),a(24)),U=a(776),J=a(21),K=a(15),W=a(777);var Z=a(791),G=a.n(Z),$=a(112),Q=a(407),X=a(422),ee=(t.default=function(){var e,t,a,l,M,O,k,A,F,_,Z,le,ie,ce,re,oe,se,de,me,ue,ve=Object($.b)(),fe=Object(Y.i)(),pe=Object(Y.g)(),ge=Object(s.useRef)(),Ee=Object(s.useRef)(),be=Object(s.useRef)(null),ye=Object(Q.b)(),he=Object(o.a)(ye,2),xe=he[0],je=he[1],Ne=Object(s.useState)(H.EditorState.createEmpty()),De=Object(o.a)(Ne,2),Ce=De[0],Me=De[1],Oe=Object(s.useState)({idActivity:"",comment:""}),ke=Object(o.a)(Oe,2),we=ke[0],Ae=ke[1],Se=Object(s.useState)(!1),Ye=Object(o.a)(Se,2),Ie=Ye[0],Re=Ye[1],Fe=Object(s.useState)({id:0,status:"",statusMessage:"",open:!1}),Te=Object(o.a)(Fe,2),Pe=Te[0],qe=Te[1],ze=Object(s.useState)({idProject:0,idActivity:0,status:"",date:"",link:"",open:!1}),He=Object(o.a)(ze,2),Le=He[0],_e=He[1],Ve=Object(s.useState)({idProject:0,date:"",open:!1}),Be=Object(o.a)(Ve,2),Ue=Be[0],Je=Be[1],Ke=Object(R.b)((function(){return"v1/project/".concat(fe.params.projectId,"/activity?&sort=").concat(xe.sortActivity.value).concat(xe.category?"&category=".concat(xe.category.value):"").concat(xe.searchActivity?"&search=".concat(xe.searchActivity):"")})),We=Ke.data,Ze=Ke.error,Ge=Ke.mutate,$e=!We,Qe=Object(s.useMemo)((function(){var e,t;return null!==(e=null===We||void 0===We||null===(t=We.data)||void 0===t?void 0:t.data)&&void 0!==e?e:[]}),[We]);Ze&&pe.push("/");var Xe=Object(s.useMemo)((function(){var e,t,a,n;return(null!==(e=null===Qe||void 0===Qe||null===(t=Qe.professional)||void 0===t?void 0:t.map((function(e){return{name:e.name,id:e.id,role:"professional"}})))&&void 0!==e?e:[]).concat([{name:null===Qe||void 0===Qe||null===(a=Qe.client)||void 0===a?void 0:a.name,id:null===Qe||void 0===Qe||null===(n=Qe.client)||void 0===n?void 0:n.id,role:"client"}])}),[Qe]),et=Object(s.useMemo)((function(){var e,t;return null!==(e=null===Qe||void 0===Qe||null===(t=Qe.activityDetails)||void 0===t?void 0:t.filter((function(e){return"deliverable"===e.category})).sort((function(e,t){return e.id-t.id})))&&void 0!==e?e:null}),[Qe]),tt=Object(s.useMemo)((function(){var e;return null===et||void 0===et||null===(e=et.filter((function(e){return"draft"!==e.status})).pop())||void 0===e?void 0:e.status}),[et]),at=Object(w.a)({initialValues:{idActivity:0,category:"discussion",content:{},text:"",isDraft:"false",files:[]},onSubmit:function(e,t){var a=t.setSubmitting,n=(t.setErrors,t.setValues);a(!0);var l=new FormData;e.idActivity&&l.append("idActivity",e.idActivity),l.append("category",e.category),l.append("content",JSON.stringify(e.content)),l.append("text",e.text),l.append("isDraft",e.isDraft),e.files.length>0&&e.files.filter((function(e){return!e.id})).map((function(e,t){return l.append("file"+(t+1),e.file,e.file.name)})),e.idActivity?K.a.put("v1/project/".concat(fe.params.projectId,"/activity"),l).then((function(e){J.a.success("Create activity successfully"),n({idActivity:0,category:"discussion",content:{},text:"",isDraft:"false",files:[]}),Me(H.EditorState.createEmpty()),Ge()})).catch((function(e){J.a.error("Create activity failed.")})).finally((function(){a(!1),Re(!1)})):K.a.post("v1/project/".concat(fe.params.projectId,"/activity"),l).then((function(e){J.a.success("Create activity successfully"),n({idActivity:0,category:"discussion",content:{},text:"",isDraft:"false",files:[]}),Me(H.EditorState.createEmpty()),Ge()})).catch((function(e){J.a.error("Create activity failed, maybe your file capacity is full.")})).finally((function(){a(!1),Re(!1)}))}}),nt=at.values,lt=at.setValues,it=at.handleSubmit,ct=at.isSubmitting,rt=Object(s.useCallback)((function(e){var t,a;"discussion"===e?lt((function(t){return Object(r.a)(Object(r.a)({},t),{},{category:e})})):et.length>0?(lt({idActivity:"draft"===et[et.length-1].status?et[et.length-1].id:0,category:e,content:{attendees:Xe,additionalAttendees:null===(t=et[et.length-1].content)||void 0===t?void 0:t.additionalAttendees,meeting:null===(a=et[et.length-1].content)||void 0===a?void 0:a.meeting},text:et[et.length-1].text,isDraft:"true",files:et[et.length-1].files}),Me(H.EditorState.createWithContent(H.ContentState.createFromBlockArray(Object(H.convertFromHTML)(et[et.length-1].text))))):lt((function(t){var a,n;return Object(r.a)(Object(r.a)({},t),{},{idActivity:0,category:e,content:{attendees:Xe,additionalAttendees:[],meeting:{date:T()(null===Qe||void 0===Qe||null===(a=Qe.meetingDetails)||void 0===a?void 0:a.date).format("DD MMMM YYYY"),startTime:T()(null===Qe||void 0===Qe||null===(n=Qe.meetingDetails)||void 0===n?void 0:n.date).format("HH:mm"),endTime:""}}})}))}),[lt,Xe,et,Qe]),ot=Object(s.useCallback)((function(e){lt((function(t){return Object(r.a)(Object(r.a)({},t),{},{content:Object(r.a)(Object(r.a)({},t.content),{},{additionalAttendees:null!==e&&void 0!==e?e:[]})})}))}),[lt]),st=Object(s.useCallback)((function(e){var t=e.target.value;lt((function(e){return Object(r.a)(Object(r.a)({},e),{},{content:Object(r.a)(Object(r.a)({},e.content),{},{meeting:Object(r.a)(Object(r.a)({},e.content.meeting),{},{endTime:t})})})}))}),[lt]),dt=Object(s.useCallback)(function(){var e=Object(c.a)(i.a.mark((function e(t){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,lt((function(e){return Object(r.a)(Object(r.a)({},e),{},{isDraft:t})}));case 2:it();case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[lt,it]),mt=Object(s.useCallback)((function(e,t,a){K.a.put("v1/project/".concat(fe.params.projectId,"/activity-status"),{idActivity:e,status:t,statusMessage:a}).then((function(e){J.a.success("Verify Deliverable Successfully"),Ge()})).catch((function(e){J.a.error("Verify Deliverable Failed.")})).finally((function(){qe({id:0,status:"",statusMessage:"",open:!1})}))}),[fe.params.projectId,Ge]),ut=Object(s.useCallback)((function(e){e.preventDefault();var t=e.target.files;nt.files>=3?J.a.error("Maximum upload files exceeded."):lt((function(e){return Object(r.a)(Object(r.a)({},e),{},{files:[].concat(Object(n.a)(e.files),[{preview:URL.createObjectURL(t[0]),file:t[0]}])})}))}),[lt,nt]),vt=Object(s.useCallback)((function(e){lt((function(t){return Object(r.a)(Object(r.a)({},t),{},{files:t.files.filter((function(t){return t.preview!==e}))})}))}),[lt]),ft=Object(s.useCallback)((function(e){je((function(t){return Object(r.a)(Object(r.a)({},t),{},{category:null!==e&&void 0!==e?e:""})}))}),[je]),pt=Object(s.useCallback)((function(e){je((function(t){return Object(r.a)(Object(r.a)({},t),{},{sortActivity:null!==e&&void 0!==e?e:""})}))}),[je]),gt=Object(s.useCallback)((function(e){var t=e.target.value;je((function(e){return Object(r.a)(Object(r.a)({},e),{},{searchActivity:t})}))}),[je]),Et=Object(s.useState)(!1),bt=Object(o.a)(Et,2),yt=bt[0],ht=bt[1],xt=Object(s.useCallback)((function(e,t){ht(!0),Object(K.b)("v1/project/activity/".concat(t,"/pdf"),e+".pdf").then((function(){return ht(!1)}))}),[]),jt=Object(s.useState)(!1),Nt=Object(o.a)(jt,2),Dt=Nt[0],Ct=Nt[1],Mt=Object(s.useCallback)((function(){var e;"approved"!==tt&&(Qe.activeRequestMeetingId?Ct(!0):Je({idProject:fe.params.projectId,date:null===Qe||void 0===Qe||null===(e=Qe.meetingDetails)||void 0===e?void 0:e.date,open:!0}))}),[Qe,fe,Ct,tt]);return d.a.createElement(m.a,null,d.a.createElement(u.a,{xs:"12"},d.a.createElement(I.b,{to:"/project/".concat(fe.params.projectId),className:"font-xl font-weight-bold mb-4 text-dark"},Qe.projectName)),d.a.createElement(u.a,{xs:"12",md:"4"},d.a.createElement(v.a,{className:"shadow-sm"},d.a.createElement(f.a,null,d.a.createElement(m.a,null,d.a.createElement(u.a,{xs:"12"},d.a.createElement("div",null,d.a.createElement("span",{className:"text-muted"},"Client")," ",null===Qe||void 0===Qe||null===(e=Qe.client)||void 0===e?void 0:e.name),d.a.createElement("div",null,d.a.createElement("span",{className:"text-muted"},"Consultant")," ",(null===Qe||void 0===Qe||null===(t=Qe.professional)||void 0===t?void 0:t.length)?null===Qe||void 0===Qe||null===(a=Qe.professional[0])||void 0===a?void 0:a.name:""),d.a.createElement("div",null,d.a.createElement("span",{className:"text-muted"},"Contract value")," IDR ",Object(P.b)(null!==(l=null===Qe||void 0===Qe?void 0:Qe.contractValue)&&void 0!==l?l:0)),d.a.createElement("div",null,d.a.createElement("span",{className:"text-muted"},"Starting Date")," ",T()(null===Qe||void 0===Qe?void 0:Qe.stratingDate).format("DD MMMM YYYY")),d.a.createElement("div",null,d.a.createElement("span",{className:"text-muted"},"Closing Date")," ",T()(null===Qe||void 0===Qe?void 0:Qe.closingDate).format("DD MMMM YYYY")))))),d.a.createElement(v.a,{className:"shadow-sm"},d.a.createElement(f.a,null,d.a.createElement(m.a,null,d.a.createElement(u.a,{xs:"12"},d.a.createElement("div",{className:"font-lg font-weight-bold mb-3"},"Meeting"),d.a.createElement("div",{className:"text-muted"},"Meeting Link ",d.a.createElement("a",{href:null!==(M=null===Qe||void 0===Qe||null===(O=Qe.meetingDetails)||void 0===O?void 0:O.link)&&void 0!==M?M:"",target:"_blank",rel:"noopener noreferrer",className:"font-weight-bold ml-1"},"Click here")," "),d.a.createElement("div",{className:"mt-2"},d.a.createElement("div",{className:"text-muted mb-1"},"Meeting Date"),d.a.createElement(p.a,null,d.a.createElement(g.a,{addonType:"prepend",className:"w-100"},d.a.createElement(S.a,{required:!0,name:"startDate",selected:new Date(null!==(k=null===Qe||void 0===Qe||null===(A=Qe.meetingDetails)||void 0===A?void 0:A.date)&&void 0!==k?k:T()()),dateFormat:"dd MMMM yyyy HH:mm",minDate:new Date,className:"form-control bg-white",showTimeInput:!0,disabled:!0,autoComplete:"off",onChangeRaw:function(e){return e.preventDefault()}}),d.a.createElement(E.a,null,d.a.createElement(q.a,{icon:"calendar-alt"})))))),d.a.createElement(u.a,{xs:"12",className:"d-flex justify-content-center mt-3"},d.a.createElement(b.a,{color:"pinion-primary",onClick:Mt,disabled:"approved"===tt},"Request Meeting Date")))))),d.a.createElement(u.a,{xs:"12",md:"8"},d.a.createElement(v.a,{className:"shadow-sm"},d.a.createElement(f.a,null,d.a.createElement(m.a,null,d.a.createElement(u.a,{xs:"12"},d.a.createElement("div",{className:"font-lg font-weight-bold mb-3"},"Key Milestone")),d.a.createElement(u.a,{xs:"12"},d.a.createElement(y.a,{bordered:!0,className:"text-center"},d.a.createElement("thead",null,d.a.createElement("tr",null,d.a.createElement("th",null,"Activities"),d.a.createElement("th",null,"Date"))),d.a.createElement("tbody",null,null===Qe||void 0===Qe||null===(F=Qe.milestoneDetails)||void 0===F?void 0:F.map((function(e,t){return d.a.createElement("tr",{key:t},d.a.createElement("td",null,e.activities),d.a.createElement("td",null,T()(e.date).add(t,"days").format("DD MMMM YYYY")))}))))),d.a.createElement(u.a,{xs:"12",className:"d-flex justify-content-between align-items-center"},d.a.createElement(b.a,{color:"pinion-primary",className:"mr-2 text-light",id:"popover-file-list"},"Project Files"),d.a.createElement(ee,{data:null===Qe||void 0===Qe?void 0:Qe.fileDetails}),d.a.createElement("div",null,d.a.createElement("div",{className:"mb-1 text-muted"},"Status of deliverable"),d.a.createElement("div",{className:"mb-3 text-center"},d.a.createElement(h.a,{color:"approved"===tt?"success":"rejected"===tt?"danger":"pending"===tt?"warning":"secondary",className:"font-lg text-light text-uppercase",style:{cursor:"pointer"},onClick:function(){return ge.current.scrollIntoView({block:"center",behavior:"smooth"})}},null!==(_=X.a[tt])&&void 0!==_?_:"Draft")))))))),"approved"!==tt&&d.a.createElement(u.a,{xs:"12"},d.a.createElement(v.a,{className:"shadow-sm"},d.a.createElement(f.a,null,d.a.createElement(m.a,null,d.a.createElement(u.a,{xs:"12",className:"mb-3"},d.a.createElement(b.a,{color:"".concat("discussion"===(null===nt||void 0===nt?void 0:nt.category)?"pinion-primary":"light"),className:"mr-3",onClick:function(){return rt("discussion")},disabled:"approved"===tt},"Discussion"),"professional"===ve.role&&["draft","rejected"].includes((null===et||void 0===et?void 0:et.length)>0?et[(null===et||void 0===et?void 0:et.length)-1].status:"draft")&&d.a.createElement(b.a,{color:"".concat("deliverable"===(null===nt||void 0===nt?void 0:nt.category)?"pinion-primary":"light"),onClick:function(){return rt("deliverable")}},"Deliverable")),"deliverable"===nt.category&&d.a.createElement(u.a,{xs:"12"},d.a.createElement(m.a,{className:"my-3"},d.a.createElement(u.a,{xs:"12",md:"4",lg:"3",className:"d-flex align-items-center"},d.a.createElement(x.a,null,"Meeting Date")),d.a.createElement(u.a,{xs:"12",md:"8",lg:"9",className:"d-flex align-items-center justify-content-between"},null===nt||void 0===nt||null===(Z=nt.content)||void 0===Z||null===(le=Z.meeting)||void 0===le?void 0:le.date)),d.a.createElement(m.a,{className:"my-3"},d.a.createElement(u.a,{xs:"12",md:"4",lg:"3",className:"d-flex align-items-center"},d.a.createElement(x.a,null,"Meeting Time")),d.a.createElement(u.a,{xs:"12",md:"8",lg:"9",className:"d-flex align-items-center justify-content-between"},d.a.createElement(p.a,null,d.a.createElement(g.a,{addonType:"prepend"},d.a.createElement(E.a,{className:"bg-transparent border-0 pl-0"},null===nt||void 0===nt||null===(ie=nt.content)||void 0===ie||null===(ce=ie.meeting)||void 0===ce?void 0:ce.startTime," -"),d.a.createElement(G.a,{type:"text",mask:"99:99",value:null===nt||void 0===nt||null===(re=nt.content)||void 0===re||null===(oe=re.meeting)||void 0===oe?void 0:oe.endTime,onChange:st,placeholder:"Example 08:00"},(function(e){return d.a.createElement(j.a,e)})))))),d.a.createElement(m.a,{className:"my-3"},d.a.createElement(u.a,{xs:"12",md:"4",lg:"3",className:"d-flex align-items-center"},d.a.createElement(x.a,null,"Attendees")),d.a.createElement(u.a,{xs:"12",md:"8",lg:"9",className:"d-flex"},null===nt||void 0===nt||null===(se=nt.content)||void 0===se||null===(de=se.attendees)||void 0===de?void 0:de.map((function(e,t){var a;return d.a.createElement("div",{key:t}," ",e.name,(null===nt||void 0===nt||null===(a=nt.content)||void 0===a?void 0:a.attendees.length)===t+1?"":", ")})))),d.a.createElement(m.a,{className:"my-3"},d.a.createElement(u.a,{xs:"12",md:"4",lg:"3",className:"d-flex align-items-center"},d.a.createElement(x.a,null,"Additional attendees")),d.a.createElement(u.a,{xs:"12",md:"8",lg:"9"},d.a.createElement(U.a,{isClearable:!0,isMulti:!0,placeholder:"Input attendees email...",value:null===nt||void 0===nt||null===(me=nt.content)||void 0===me?void 0:me.additionalAttendees,isValidNewOption:function(e){return/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(e).toLowerCase())},onChange:ot,formatGroupLabel:function(e){return d.a.createElement("div",{style:{display:"flex",alignItems:"center"}},d.a.createElement("span",{style:{fontWeight:"bold",fontSize:"10px",letterSpacing:"1px"},className:"text-muted"},e.label))},noOptionsMessage:function(e){return d.a.createElement("span",null,"Input attendees email")},components:{DropdownIndicator:function(){return null},IndicatorSeparator:function(){return null}}})))),d.a.createElement(u.a,{xs:"12"},d.a.createElement(L.Editor,{editorState:Ce,editorStyle:{height:"300px"},onEditorStateChange:function(e){return Me(e)},onContentStateChange:function(e){return function(e){lt((function(t){return Object(r.a)(Object(r.a)({},t),{},{text:V()(e)})}))}(e)}})),d.a.createElement(u.a,{xs:"12",className:"my-3"},null===nt||void 0===nt||null===(ue=nt.files)||void 0===ue?void 0:ue.map((function(e,t){var a,n,l;return d.a.createElement(s.Fragment,{key:t},d.a.createElement("div",{className:"rounded border border-dark d-inline p-1"},(null===e||void 0===e||null===(a=e.file)||void 0===a?void 0:a.name)&&d.a.createElement(q.a,{icon:"times",color:"#f86c6b",className:"mr-1",onClick:function(){return vt(e.preview)},style:{cursor:"pointer"}})," ",null!==(n=null===e||void 0===e||null===(l=e.file)||void 0===l?void 0:l.name)&&void 0!==n?n:e.fileName),d.a.createElement("div",{className:"mb-3"}))}))),d.a.createElement(u.a,{xs:"12"},d.a.createElement("input",{type:"file",ref:be,style:{display:"none"},onChange:function(e){return ut(e)}}),d.a.createElement(b.a,{color:"pinion-secondary",disabled:nt.files>=3,className:"text-light",onClick:function(){return be.current.click()}}," ",d.a.createElement(q.a,{icon:"upload"})," Attachment"),d.a.createElement(b.a,{color:"pinion-primary",className:"float-right",onClick:function(){return Re(!0)},disabled:ct},ct?d.a.createElement(d.a.Fragment,null,d.a.createElement(N.a,{color:"light",size:"sm"})," Loading..."):"Post"),"deliverable"===nt.category&&d.a.createElement(b.a,{color:"secondary",className:"float-right mr-2 text-light",onClick:function(){return dt("true")},disabled:ct},ct?d.a.createElement(d.a.Fragment,null,d.a.createElement(N.a,{color:"light",size:"sm"})," Loading..."):"Draft")))))),d.a.createElement(u.a,{xs:"12"},d.a.createElement(m.a,null,d.a.createElement(u.a,{xs:"12",md:"3"},d.a.createElement("div",{className:"mb-1 text-muted"},"Category"),d.a.createElement("div",{className:"mb-3"},d.a.createElement(B.a,{options:[{value:"deliverable",label:"Deliverable"},{value:"discussion",label:"Discussion"},{value:"meeting_date",label:"Meeting Date"}],value:xe.category,isClearable:!0,onChange:function(e){return ft(e)},components:{DropdownIndicator:function(){return null},IndicatorSeparator:function(){return null}}}))),d.a.createElement(u.a,{xs:"12",md:"3"},d.a.createElement("div",{className:"mb-1 text-muted"},"Date Sort"),d.a.createElement("div",{className:"mb-3"},d.a.createElement(B.a,{options:[{label:"Newest to Oldest",value:"createdAt_DESC"},{label:"Oldest to Newest",value:"createdAt_ASC"}],value:xe.sortActivity,onChange:function(e){return pt(e)},components:{DropdownIndicator:function(){return null},IndicatorSeparator:function(){return null}}}))),d.a.createElement(u.a,{xs:"12",md:"3",className:"justify-content-end"},d.a.createElement("div",{className:"mb-1 text-muted"},"\xa0"),d.a.createElement("div",{className:"mb-3"},d.a.createElement(j.a,{type:"text",placeholder:"Search...",value:xe.searchActivity,onChange:gt}))),d.a.createElement(u.a,{xs:"12"},$e?d.a.createElement(v.a,{className:"shadow-sm"},d.a.createElement(f.a,{className:"position-relative"},d.a.createElement("div",{style:{position:"absolute",top:0,right:0,bottom:0,left:0,display:"flex",justifyContent:"center",alignItems:"center"}},d.a.createElement(N.a,{style:{width:48,height:48}})))):d.a.createElement("div",null,Qe.activityDetails.length<=0&&d.a.createElement(v.a,{className:"shadow-sm"},d.a.createElement(f.a,{className:"position-relative"},d.a.createElement("div",{style:{width:"100%",height:"500px"},className:"d-flex align-items-center justify-content-center text-muted"}," No Activities "))),Qe.activityDetails.filter((function(e){return"draft"!==e.status})).map((function(e,t){var a,n,l,i,c,r,o,p,g,E,y,j,D,C,M,O,k,w,A,S,Y;return d.a.createElement(v.a,{className:"shadow-sm",key:t},"createdAt_DESC"===xe.sortActivity.value&&et.length>0&&et[(null===et||void 0===et?void 0:et.length)-1].id===e.id&&d.a.createElement("div",{ref:ge}),"meeting_date"===e.category&&e.id===Qe.activeRequestMeetingId&&d.a.createElement("div",{ref:Ee}),d.a.createElement(f.a,{className:"position-relative"},d.a.createElement("div",{className:"position-absolute",style:{right:20}},d.a.createElement(h.a,{className:"font-lg text-uppercase text-light",color:"".concat("meeting_date"===e.category?"info":"discussion"===e.category?"warning":"pinion-primary")},e.category.replace("_"," "))),d.a.createElement("div",{className:"position-absolute",style:{top:55,right:20}},"deliverable"===e.category&&d.a.createElement(h.a,{color:"approved"===e.status?"success":"rejected"===e.status?"danger":"pending"===e.status?"warning":"secondary",className:"font-sm text-light text-uppercase"},null!==(a=X.a[e.status])&&void 0!==a?a:"Draft")),d.a.createElement("div",{className:"font-lg font-weight-bold mb-1"},null===e||void 0===e||null===(n=e.createdBy)||void 0===n?void 0:n.name),d.a.createElement("div",{className:"text-muted mb-3"},T.a.utc(e.createdAt).local().format("DD MMMM YYYY HH:mm")),"deliverable"===e.category&&d.a.createElement("div",null,d.a.createElement(m.a,{className:"my-1"},d.a.createElement(u.a,{xs:"12",md:"4",lg:"3",className:"d-flex align-items-center"},d.a.createElement(x.a,null,"Meeting Date")),d.a.createElement(u.a,{xs:"12",md:"8",lg:"9",className:"d-flex align-items-center justify-content-between"},null===e||void 0===e||null===(l=e.content)||void 0===l||null===(i=l.meeting)||void 0===i?void 0:i.date)),d.a.createElement(m.a,{className:"my-1"},d.a.createElement(u.a,{xs:"12",md:"4",lg:"3",className:"d-flex align-items-center"},d.a.createElement(x.a,null,"Meeting Time")),d.a.createElement(u.a,{xs:"12",md:"8",lg:"9",className:"d-flex align-items-center justify-content-between"},null===e||void 0===e||null===(c=e.content)||void 0===c||null===(r=c.meeting)||void 0===r?void 0:r.startTime," - ",""!==(null===e||void 0===e||null===(o=e.content)||void 0===o||null===(p=o.meeting)||void 0===p?void 0:p.endTime)?null===e||void 0===e||null===(g=e.content)||void 0===g||null===(E=g.meeting)||void 0===E?void 0:E.endTime:"Finish")),d.a.createElement(m.a,{className:"my-1"},d.a.createElement(u.a,{xs:"12",md:"4",lg:"3",className:"d-flex align-items-center"},d.a.createElement(x.a,null,"Attendees")),d.a.createElement(u.a,{xs:"12",md:"8",lg:"9",className:"d-flex"},null===e||void 0===e||null===(y=e.content)||void 0===y||null===(j=y.attendees)||void 0===j?void 0:j.map((function(t,a){var n;return d.a.createElement("div",{key:a}," ",t.name,d.a.createElement("span",{className:"text-capitalize"},"(",t.role,")"),(null===e||void 0===e||null===(n=e.content)||void 0===n?void 0:n.attendees.length)===a+1?"":",")})))),d.a.createElement(m.a,{className:"my-1"},d.a.createElement(u.a,{xs:"12",md:"4",lg:"3",className:"d-flex align-items-center"},d.a.createElement(x.a,null,"Additional attendees")),d.a.createElement(u.a,{xs:"12",md:"8",lg:"9"},null===e||void 0===e||null===(D=e.content)||void 0===D||null===(C=D.additionalAttendees)||void 0===C?void 0:C.map((function(e){return e.label}))))),d.a.createElement("div",{className:"mb-3 activity-text"},"meeting_date"===e.category?"Requested meeting date change to "+T.a.utc(e.content.date).local().format("DD MMMM YYYY HH:mm")+("rejected"===e.status?" is rejected":""):Object(W.a)(e.text)),d.a.createElement("div",{className:"mb-4"},null===e||void 0===e||null===(M=e.files)||void 0===M?void 0:M.map((function(e,t){return d.a.createElement(s.Fragment,{key:t},d.a.createElement("div",{className:"rounded border d-inline p-1"},d.a.createElement("a",{href:e.fileUrl,target:"_blank",rel:"noopener noreferrer",className:"text-dark",style:{textDecoration:"none"}},e.fileName)),d.a.createElement("div",{className:"mb-3"}))}))),"deliverable"===e.category&&d.a.createElement("div",{className:"mb-3 d-flex justify-content-end"},"pending"===e.status&&"professional"!==ve.role&&"approved"!==tt&&d.a.createElement(d.a.Fragment,null,d.a.createElement(b.a,{color:"warning",onClick:function(){return qe({id:e.id,status:"rejected",statusMessage:"",open:!0})}},"To Revise"),d.a.createElement(b.a,{color:"success",className:"mx-2",onClick:function(){return qe({id:e.id,status:"approved",statusMessage:"",open:!0})}},"Approve")),"approved"===e.status&&d.a.createElement(b.a,{color:"secondary",disabled:yt,onClick:function(){return xt("deliverable",e.id)}},yt?d.a.createElement(d.a.Fragment,null,d.a.createElement(N.a,{color:"light",size:"sm"})," Loading..."):"Download")),"meeting_date"===e.category&&"pending"===e.status&&ve.id!==e.createdBy.id&&"approved"!==tt&&d.a.createElement("div",{className:"mb-3 d-flex justify-content-end"},d.a.createElement(b.a,{color:"success",className:"mx-2",onClick:function(){var t,a;return _e({idProject:fe.params.projectId,idActivity:e.id,status:"approved",date:e.content.date,link:null!==(t=null===Qe||void 0===Qe||null===(a=Qe.meetingDetails)||void 0===a?void 0:a.link)&&void 0!==t?t:"",open:!0})}},"Approve"),d.a.createElement(b.a,{color:"danger",onClick:function(){var t,a;return _e({idProject:fe.params.projectId,idActivity:e.id,status:"rejected",date:e.content.date,link:null!==(t=null===Qe||void 0===Qe||null===(a=Qe.meetingDetails)||void 0===a?void 0:a.link)&&void 0!==t?t:"",open:!0})}},"Reject")),(null===(O=e.content)||void 0===O||null===(k=O.replies)||void 0===k?void 0:k.length)>0&&d.a.createElement("div",{className:"pl-5"},null===(w=e.content)||void 0===w||null===(A=w.replies)||void 0===A?void 0:A.map((function(e,t){return d.a.createElement(v.a,{className:"my-1",key:t},d.a.createElement(f.a,{className:"p-3"},d.a.createElement("div",{className:"font-lg font-weight-bold mb-1"},e.createdBy.name),d.a.createElement("div",{className:"text-muted mb-3"},T.a.utc(e.createdAt).local().format("DD MMMM YYYY HH:mm")),d.a.createElement("div",null,e.comment)))}))),"approved"!==tt&&d.a.createElement("div",{className:"".concat((null===(S=e.content)||void 0===S||null===(Y=S.replies)||void 0===Y?void 0:Y.length)>0&&"pl-5")},d.a.createElement(z.a,{rows:"3",name:"comment",id:"comment",style:{borderRadius:"10px"},className:"form-control",placeholder:"Type your reply...",value:e.id===we.idActivity?we.comment:"",onChange:function(t){return Ae({idActivity:e.id,comment:t.target.value})},onKeyPress:function(e){"Enter"===e.key&&(e.target.blur(),K.a.post("v1/project/".concat(fe.params.projectId,"/activity-reply"),we).then((function(e){J.a.success("Reply Successfully"),Ae({idActivity:"",comment:""}),Ge()})).catch((function(e){J.a.error("Reply Failed")})))}}))))}))),"createdAt_ASC"===xe.sortActivity.value&&d.a.createElement("div",{ref:ge}),d.a.createElement(D.a,{isOpen:Ie,centered:!0,toggle:function(){return Re(!Ie)}},d.a.createElement(C.a,{className:"p-5"},d.a.createElement(m.a,null,d.a.createElement(u.a,{xs:"12"},d.a.createElement("div",{className:"mb-2"},"You are about to submit the deliverable. Please be aware that this not a reversible process.")),d.a.createElement(u.a,{xs:"12",className:"d-flex justify-content-end mt-5"},d.a.createElement(b.a,{color:"secondary",className:"mr-2",onClick:function(){return Re(!Ie)}},"Cancel"),d.a.createElement(b.a,{color:"pinion-primary",className:"float-right",onClick:function(){return dt("false")},disabled:ct},ct?d.a.createElement(d.a.Fragment,null,d.a.createElement(N.a,{color:"light",size:"sm"})," Loading..."):"Confirm"))))),d.a.createElement(D.a,{isOpen:Pe.open,centered:!0,toggle:function(){return qe({id:0,status:"",statusMessage:"",open:!1})}},d.a.createElement(C.a,{className:"p-5"},d.a.createElement(m.a,null,d.a.createElement(u.a,{xs:"12"},d.a.createElement("div",{className:"mb-2"},"approved"===Pe.status?"You are about to submit the deliverable. Please be aware that this not a reversible process.":"You are about to reject a submission and request for a revision. Please leave your comments in the reply box.")),d.a.createElement(u.a,{xs:"12",className:"d-flex justify-content-end mt-5"},d.a.createElement(b.a,{color:"secondary",className:"mr-2",onClick:function(){return qe({id:0,status:"",statusMessage:"",open:!1})}},"Cancel"),d.a.createElement(b.a,{color:"primary",className:"text-capitalize",disabled:ct,onClick:function(){return mt(Pe.id,Pe.status,Pe.statusMessage)}},"approved"===Pe.status?"Confirm":"OK"))))),d.a.createElement(ae,{modalMeetingDate:Le,onChangeModalMeetingDate:_e,mutate:Ge}),d.a.createElement(te,{modalMeetingRequest:Ue,onChangeModalMeetingRequest:Je,mutate:Ge}),d.a.createElement(ne,{modalAlertMeetingDate:Dt,onChangeModalAlertMeetingDate:Ct,meetingDateRef:Ee})))))},function(e){var t,a,n,l,i=e.data,c=Array(9).fill();return d.a.createElement(M.a,{trigger:"legacy",placement:"bottom",target:"popover-file-list",popperClassName:"popover-file-list"},d.a.createElement(O.a,null,d.a.createElement(m.a,{className:"p-2"},d.a.createElement(u.a,{xs:"8"},d.a.createElement("div",{className:"font-weight-bold"},"Project Files")),d.a.createElement(u.a,{xs:"4"},d.a.createElement(k.a,{className:"mb-2",value:(null!==(t=null===i||void 0===i||null===(a=i.fileList)||void 0===a?void 0:a.length)&&void 0!==t?t:0)/9*100},d.a.createElement("div",{className:"text-dark text-center"},"File ",null===i||void 0===i||null===(n=i.fileList)||void 0===n?void 0:n.length,"/9")),d.a.createElement(k.a,{color:"pinion-secondary",value:(null!==(l=null===i||void 0===i?void 0:i.totalSize)&&void 0!==l?l:0)/1e8*100},d.a.createElement("div",{className:"text-dark text-center"},"Capacity ",(null===i||void 0===i?void 0:i.totalSize)/1e6,"MB/100MB"))),d.a.createElement(u.a,{xs:"12",className:"my-3"},d.a.createElement(m.a,null,c.map((function(e,t){var a,n,l;return d.a.createElement(u.a,{xs:"12",key:t},d.a.createElement("a",{href:null!==(a=null===i||void 0===i||null===(n=i.fileList[t])||void 0===n?void 0:n.fileUrl)&&void 0!==a?a:"",target:"_blank",rel:"noopener noreferrer",className:"text-dark"},t+1,". ",null===i||void 0===i||null===(l=i.fileList[t])||void 0===l?void 0:l.fileName))})))),d.a.createElement(u.a,{xs:"12"},d.a.createElement("div",{className:"text-muted"},"Your project storage is limited at maximum 9 files or 100 MB")))))}),te=function(e){var t,a=e.modalMeetingRequest,n=e.onChangeModalMeetingRequest,l=e.mutate,i=Object(s.useState)(null),c=Object(o.a)(i,2),r=c[0],v=c[1],f=Object(s.useCallback)((function(e){K.a.post("v1/project/".concat(a.idProject,"/activity"),{category:"meeting_date",content:{date:T()(r)},text:"",isDraft:"false"}).then((function(e){J.a.success("Change Meeting Date Successfully."),n({idProject:0,date:new Date,open:!1}),l()})).catch((function(e){J.a.error("Change Meeting Date Failed.")}))}),[a,l,r,n]);return d.a.createElement(D.a,{isOpen:a.open,centered:!0,toggle:function(){return n({idProject:0,date:new Date,open:!1})}},d.a.createElement(C.a,{className:"p-5"},d.a.createElement(m.a,null,d.a.createElement(u.a,{xs:"12"},d.a.createElement("div",{className:"mb-2"},"Choose the meeting date you want.")),d.a.createElement(u.a,{xs:"12"},d.a.createElement("div",{className:"mb-2"},d.a.createElement(p.a,null,d.a.createElement(g.a,{addonType:"prepend",className:"w-100"},d.a.createElement(S.a,{required:!0,name:"startDate",selected:new Date(null!==r&&void 0!==r?r:null!==(t=null===a||void 0===a?void 0:a.date)&&void 0!==t?t:T()()),dateFormat:"dd MMMM yyyy HH:mm",minDate:new Date,className:"form-control bg-white",showTimeInput:!0,autoComplete:"off",onChange:function(e){v(e)},onChangeRaw:function(e){return e.preventDefault()}}),d.a.createElement(E.a,null,d.a.createElement(q.a,{icon:"calendar-alt"})))))),d.a.createElement(u.a,{xs:"12",className:"d-flex justify-content-end mt-5"},d.a.createElement(b.a,{color:"secondary",className:"mr-2",onClick:function(){return n({idProject:0,date:new Date,open:!1})}},"Cancel"),d.a.createElement(b.a,{color:"primary",className:"text-capitalize",onClick:function(){return f()}},"Request")))))},ae=function(e){var t=e.modalMeetingDate,a=e.onChangeModalMeetingDate,n=e.mutate,l=Object(s.useCallback)((function(e){K.a.put("v1/project/".concat(t.idProject,"/activity-meeting"),{meetingDetails:{link:t.link,date:T()(t.date)},status:t.status,idActivity:t.idActivity}).then((function(e){J.a.success("Change Meeting Date Successfully."),a({idProject:0,idActivity:0,status:"",date:"",link:"",open:!1}),n()})).catch((function(e){J.a.error("Change Meeting Date Failed.")}))}),[t,n,a]);return d.a.createElement(D.a,{isOpen:t.open,centered:!0,toggle:function(){return a({idProject:0,idActivity:0,status:"",date:"",link:"",open:!1})}},d.a.createElement(C.a,{className:"p-5"},d.a.createElement(m.a,null,d.a.createElement(u.a,{xs:"12"},d.a.createElement("div",{className:"mb-2"},"approved"===t.status?"You are about to submit the deliverable. Please be aware that this not a reversible process.":"Are you sure you want to decline the request?")),d.a.createElement(u.a,{xs:"12"},d.a.createElement("div",{className:"mb-2"},"approved"===t.status?d.a.createElement(p.a,null,d.a.createElement(g.a,{addonType:"prepend",className:"w-100"},d.a.createElement(S.a,{required:!0,name:"startDate",selected:new Date(null===t||void 0===t?void 0:t.date),dateFormat:"dd MMMM yyyy HH:mm",minDate:new Date,className:"form-control bg-white",showTimeInput:!0,autoComplete:"off",disabled:!0,onChangeRaw:function(e){return e.preventDefault()}}),d.a.createElement(E.a,null,d.a.createElement(q.a,{icon:"calendar-alt"})))):null)),d.a.createElement(u.a,{xs:"12",className:"d-flex justify-content-end mt-5"},"approved"===t.status?d.a.createElement(d.a.Fragment,null,d.a.createElement(b.a,{color:"secondary",className:"mr-2",onClick:function(){return a({idProject:0,idActivity:0,status:"",date:"",link:"",open:!1})}},"Cancel"),d.a.createElement(b.a,{color:"primary",className:"text-capitalize",onClick:function(){return l()}},"Confirm")):d.a.createElement(d.a.Fragment,null,d.a.createElement(b.a,{color:"secondary",className:"mr-2",onClick:function(){return a({idProject:0,idActivity:0,status:"",date:"",link:"",open:!1})}},"No"),d.a.createElement(b.a,{color:"primary",className:"text-capitalize",onClick:function(){return l()}},"Yes"))))))},ne=function(e){var t=e.modalAlertMeetingDate,a=e.onChangeModalAlertMeetingDate,n=e.meetingDateRef;return d.a.createElement(D.a,{size:"sm",centered:!0,isOpen:t,returnFocusAfterClose:!1,toggle:function(){a(!1),n.current.scrollIntoView({block:"center",behavior:"smooth"})}},d.a.createElement(C.a,{className:"p-4"},d.a.createElement(m.a,null,d.a.createElement(u.a,{xs:"12"},d.a.createElement("div",{className:"mb-3 text-center"},"There are still unconfirmed meeting date requests !")),d.a.createElement(u.a,{xs:"12",className:"d-flex justify-content-center"},d.a.createElement(b.a,{color:"secondary",onClick:function(){a(!1),n.current.scrollIntoView({block:"center",behavior:"smooth"})}},"Close")))))}}}]);
//# sourceMappingURL=13.2d5447f8.chunk.js.map