(this.webpackJsonppplatform=this.webpackJsonppplatform||[]).push([[2],{401:function(e,t,a){"use strict";a.d(t,"b",(function(){return r})),a.d(t,"a",(function(){return c}));var n=a(411),l=a.n(n);function r(e){for(var t="",a=null===e||void 0===e?void 0:e.toString().split("").reverse().join(""),n=0;n<a.length;n++)n%3===0&&(t+=a.substr(n,3)+".");return t.split("",t.length-1).reverse().join("")}function c(e){for(var t=[{divider:1e18,suffix:"E"},{divider:1e15,suffix:"P"},{divider:1e12,suffix:"T"},{divider:1e9,suffix:"G"},{divider:1e6,suffix:"M"},{divider:1e3,suffix:"k"}],a=0;a<t.length;a++)if(e>=t[a].divider)return(e/t[a].divider).toString()+t[a].suffix;return e.toString()}l.a.register("locale","indonesia",{delimiters:{thousands:".",decimal:","},abbreviations:{thousand:"rb",million:"jt",billion:"M",trillion:"T"},ordinal:function(e){return 1===e?"er":"\xe8me"},currency:{symbol:"IDR"}}),l.a.locale("indonesia")},422:function(e,t,a){"use strict";t.a={draft:"Draft",pending:"For Review",rejected:"To Revise",approved:"Approved"}},457:function(e,t,a){"use strict";t.a={open:"Open",expired:"Expired",under_review:"Under Review",tnc_review:"T&C Review",on_going:"Ongoing",close:"Closed",void:"Void",deliverable_approved:"Approved"}},654:function(e,t,a){"use strict";a.r(t);var n=a(14),l=a(11),r=a(0),c=a.n(r),s=a(538),o=a(370),i=a(385),m=a(390),d=a(392),u=a(393),p=a(384),E=a(394),v=a(395),f=a(219),g=a(397),b=a(632),h=a(396),x=a(383),N=a(378),y=a(799),j=(a(494),a(388),a(33)),w=a.n(j),k=a(471),S=a(16),C=a(112),O=a(171),D=a(21),_=a(15),P=a(401),A=a(422),R=a(457),T=Object(s.b)(w.a);var L=function(e){var t=e.data,a=e.mutate,s=Object(r.useState)(null),o=Object(l.a)(s,2),N=o[0],y=o[1],j=Object(r.useState)([]),k=Object(l.a)(j,2),C=k[0],O=k[1],P=Object(r.useCallback)((function(e){var t=e.target,a=t.value,l=t.checked;O(l?function(e){return[].concat(Object(n.a)(e),[a])}:function(e){return e.filter((function(e){return e!==a}))})}),[O]),T=Object(r.useMemo)((function(){var e=C.length>0?null===t||void 0===t?void 0:t.filter((function(e){return C.includes(e.projectStatus)})):t;return null!==e&&void 0!==e?e:[]}),[t,C]);return c.a.createElement(d.a,{className:"shadow-sm"},c.a.createElement(u.a,null,c.a.createElement(i.a,{className:"px-lg-3"},c.a.createElement(m.a,{xs:"12",className:"my-1 text-center"},c.a.createElement("h4",null,"Project Status")),c.a.createElement(m.a,{xs:"6",md:"4",lg:"1",className:"p-0"},c.a.createElement(E.a,null,c.a.createElement(v.a,{addonType:"prepend"},c.a.createElement(f.a,{className:"bg-transparent border-0 px-0"},c.a.createElement(g.a,{type:"checkbox",id:"open",value:"open",checked:C.includes("open"),onChange:P}))),c.a.createElement("div",{className:"d-flex bg-transparent p-1 align-items-center"},"Open"))),c.a.createElement(m.a,{xs:"6",md:"4",lg:"2",className:"p-0"},c.a.createElement(E.a,null,c.a.createElement(v.a,{addonType:"prepend"},c.a.createElement(f.a,{className:"bg-transparent border-0 px-0"},c.a.createElement(g.a,{type:"checkbox",id:"under_review",value:"under_review",checked:C.includes("under_review"),onChange:P}))),c.a.createElement("div",{className:"d-flex bg-transparent p-1 align-items-center"},"Under Review"))),c.a.createElement(m.a,{xs:"6",md:"4",lg:"2",className:"p-0"},c.a.createElement(E.a,null,c.a.createElement(v.a,{addonType:"prepend"},c.a.createElement(f.a,{className:"bg-transparent border-0 px-0"},c.a.createElement(g.a,{type:"checkbox",id:"expired",value:"expired",checked:C.includes("expired"),onChange:P}))),c.a.createElement("div",{className:"d-flex bg-transparent p-1 align-items-center"},"Expired"))),c.a.createElement(m.a,{xs:"6",md:"4",lg:"2",className:"p-0"},c.a.createElement(E.a,null,c.a.createElement(v.a,{addonType:"prepend"},c.a.createElement(f.a,{className:"bg-transparent border-0 px-0"},c.a.createElement(g.a,{type:"checkbox",id:"tnc_review",value:"tnc_review",checked:C.includes("tnc_review"),onChange:P}))),c.a.createElement("div",{className:"d-flex bg-transparent p-1 align-items-center"},"T&C Review"))),c.a.createElement(m.a,{xs:"6",md:"4",lg:"2",className:"p-0"},c.a.createElement(E.a,null,c.a.createElement(v.a,{addonType:"prepend"},c.a.createElement(f.a,{className:"bg-transparent border-0 px-0"},c.a.createElement(g.a,{type:"checkbox",id:"on_going",value:"on_going",checked:C.includes("on_going"),onChange:P}))),c.a.createElement("div",{className:"d-flex bg-transparent p-1 align-items-center"},"On going"))),c.a.createElement(m.a,{xs:"6",md:"4",lg:"2",className:"p-0"},c.a.createElement(E.a,null,c.a.createElement(v.a,{addonType:"prepend"},c.a.createElement(f.a,{className:"bg-transparent border-0 px-0"},c.a.createElement(g.a,{type:"checkbox",id:"deliverable_approved",value:"deliverable_approved",checked:C.includes("deliverable_approved"),onChange:P}))),c.a.createElement("div",{className:"d-flex bg-transparent p-1 align-items-center"},"Approved"))),c.a.createElement(m.a,{xs:"6",md:"4",lg:"1",className:"p-0"},c.a.createElement(E.a,null,c.a.createElement(v.a,{addonType:"prepend"},c.a.createElement(f.a,{className:"bg-transparent border-0 px-0"},c.a.createElement(g.a,{type:"checkbox",id:"close",value:"close",checked:C.includes("close"),onChange:P}))),c.a.createElement("div",{className:"d-flex bg-transparent p-1 align-items-center"},"Closed"))),c.a.createElement(m.a,{xs:"12",className:"my-3"},c.a.createElement(b.a,{hover:!0,responsive:!0,className:"text-center"},c.a.createElement("thead",null,c.a.createElement("tr",null,c.a.createElement("th",{className:"text-left"},"Project Name"),c.a.createElement("th",null,"Professional Name"),c.a.createElement("th",null,"Completion Date"),c.a.createElement("th",null,"Deliverable Status"),c.a.createElement("th",null,"Project Status"))),c.a.createElement("tbody",null,T.length>0?T.map((function(e,t){var a,n,l;return c.a.createElement("tr",{key:t},c.a.createElement("td",{className:"text-left"},c.a.createElement(S.b,{to:"".concat("on_going"===e.projectStatus?"/project/".concat(e.idProject,"/wall"):"close"===e.projectStatus?"/rate/".concat(e.idProject):"/project/".concat(e.idProject,"/professionals"))},e.projectName)),c.a.createElement("td",null,(null===e||void 0===e||null===(a=e.professionalList)||void 0===a?void 0:a.length)>0&&["on_going","close","tnc_review","deliverable_approved"].includes(e.projectStatus)?c.a.createElement(S.b,{to:"/professional/".concat(e.professionalList[0].idProfessionalUserMeta)},e.professionalList[0].firstName," ",e.professionalList[0].lastName):"-"),c.a.createElement("td",null,w()(null!==(n=null===e||void 0===e?void 0:e.completeDate)&&void 0!==n?n:"").format("DD-MM-YYYY")),c.a.createElement("td",{className:"text-uppercase"},null!==(l=A.a[null===e||void 0===e?void 0:e.activityStatus])&&void 0!==l?l:"-"),c.a.createElement("td",{className:"text-uppercase"},R.a[null===e||void 0===e?void 0:e.projectStatus],"expired"===e.projectStatus?c.a.createElement(p.a,{color:"pinion-primary",size:"sm",block:!0,className:"text-white mt-2",onClick:function(){return y(e.idProject)}},"Reopen"):null))})):c.a.createElement("tr",null,c.a.createElement("td",{colspan:"5",className:"text-center text-muted"},"No Data")))))),c.a.createElement(h.a,{isOpen:N,centered:!0,toggle:function(){return y(!N)}},c.a.createElement(x.a,{className:"p-5"},c.a.createElement(i.a,null,c.a.createElement(m.a,{xs:"12"},c.a.createElement("div",{className:"mb-2"},"Are you sure you want to reopen this project?")),c.a.createElement(m.a,{xs:"12",className:"d-flex justify-content-end"},c.a.createElement(p.a,{color:"secondary",className:"mr-2",onClick:function(){return y(!N)}},"Cancel"),c.a.createElement(p.a,{color:"primary",className:"text-capitalize",onClick:function(){_.a.put("v1/project/".concat(N,"/reopen"),{isReopen:!0}).then((function(e){D.a.success("Reopen Successfully"),a()})).catch((function(e){D.a.error("Reopen Failed")})).finally((function(){return y(!N)}))}},"Reopen")))))))},M=function(e){var t=e.data;return c.a.createElement(d.a,{className:"shadow-sm mt-3"},c.a.createElement(u.a,null,c.a.createElement(i.a,null,c.a.createElement(m.a,{xs:"12",className:"my-1 text-center"},c.a.createElement("h4",null,"Project Statistics")),c.a.createElement(m.a,{xs:"12",className:"d-flex my-1 justify-content-center text-center"},c.a.createElement(i.a,null,c.a.createElement(m.a,{xs:"12",md:"4"},c.a.createElement("p",{style:{whiteSpace:"nowrap"}},"Number of projects in tender"),c.a.createElement("div",{className:"d-flex justify-content-center",style:{fontSize:"50pt"}},c.a.createElement(N.a,{color:"secondary",className:"d-flex justify-content-center",style:{width:80,height:80}},t.posted))),c.a.createElement(m.a,{xs:"12",md:"4"},c.a.createElement("p",{style:{whiteSpace:"nowrap"}},"Number of active projects"),c.a.createElement("div",{className:"d-flex justify-content-center",style:{fontSize:"50pt"}},c.a.createElement(N.a,{color:"secondary",className:"d-flex justify-content-center",style:{width:80,height:80}},t.onGoing))),c.a.createElement(m.a,{xs:"12",md:"4"},c.a.createElement("p",{style:{whiteSpace:"nowrap"}},"Number of completed projects"),c.a.createElement("div",{className:"d-flex justify-content-center",style:{fontSize:"50pt"}},c.a.createElement(N.a,{color:"secondary",className:"d-flex justify-content-center",style:{width:80,height:80}},t.close))))))))},z=function(e){var t,a,n=e.events,p=Object(r.useState)(null),E=Object(l.a)(p,2),v=E[0],f=E[1],g=function(e){f(e)};return c.a.createElement(d.a,{className:"shadow-sm mt-3 text-center"},c.a.createElement(u.a,{style:{height:"60vh"}},c.a.createElement(i.a,null,c.a.createElement(m.a,{xs:"12"},c.a.createElement("h4",{className:"mb-4"},"My Calendar"),n?c.a.createElement(s.a,{popup:!0,localizer:T,defaultDate:new Date,messages:{previous:c.a.createElement("i",{className:"fa fa-angle-left"}),next:c.a.createElement("i",{className:"fa fa-angle-right"})},components:{event:function(e){return c.a.createElement("div",null,c.a.createElement("div",{id:"".concat(e.title.replace(" ",""),"-").concat(e.event.project.id),style:{color:"#3174ad"}},"Gas"),c.a.createElement(y.a,{placement:"bottom",target:"".concat(e.title.replace(" ",""),"-").concat(e.event.project.id)},e.title))}},defaultView:"month",views:["month","agenda"],events:n,style:{height:"50vh"},onSelectEvent:function(e){return g(e)}}):c.a.createElement("div",{style:{position:"absolute",top:0,right:0,bottom:0,left:0,background:"rgba(255,255,255, 0.5)",display:"flex",justifyContent:"center",alignItems:"center"}},c.a.createElement(o.a,{style:{width:48,height:48}}))),c.a.createElement(h.a,{centered:!0,size:"sm",isOpen:!!v,toggle:function(){return g(null)}},c.a.createElement(x.a,{className:"p-4 text-center"},c.a.createElement(i.a,null,c.a.createElement(m.a,{xs:"12",className:"d-flex justify-content-end"},c.a.createElement("button",{type:"button",className:"close","aria-label":"Close",onClick:function(){return g(null)}},c.a.createElement("span",{"aria-hidden":"true"},"\xd7"))),c.a.createElement(m.a,{xs:"12",className:"mb-2"},c.a.createElement("div",{className:"text-muted"},"Activity"),c.a.createElement("div",{className:"font-weight-bold"},null===v||void 0===v?void 0:v.title)),c.a.createElement(m.a,{xs:"12",className:"mb-2"},c.a.createElement("div",{className:"text-muted"},"Date"),c.a.createElement("div",{className:"font-weight-bold"},w()(null===v||void 0===v?void 0:v.start).format("DD MMMM YYYY"))),c.a.createElement(m.a,{xs:"12"},c.a.createElement("div",{className:"text-muted"},"Project"),c.a.createElement(S.b,{to:"/project/".concat(null===v||void 0===v||null===(t=v.project)||void 0===t?void 0:t.id,"/wall"),className:"font-weight-bold"},null===v||void 0===v||null===(a=v.project)||void 0===a?void 0:a.name))))))))},Y=function(e){var t=e.data,a=["rgba(255, 99, 132, 0.7)","rgba(54, 162, 235, 0.7)","rgba(255, 206, 86, 0.7)","rgba(75, 192, 192, 0.7)","rgba(153, 102, 255, 0.7)","rgba(255, 159, 64, 0.7)"],n={labels:t.skillList.map((function(e){var t=e.name.split(" ");return t[0].substr(0,3)+". "+(t.length>1?t[1].substr(0,5):"")+". "+(t.length>2?t[2].substr(0,6):"")})),datasets:[{label:"Skills",data:t.skillList.map((function(e){return e.value})),backgroundColor:t.skillList.map((function(e,n){return a[n%t.skillList.length]})),borderWidth:1}]},l={labels:t.sectorList.map((function(e){var t=e.name.split(" ");return t[0].substr(0,3)+". "+(t.length>1?t[1].substr(0,5):"")+". "+(t.length>2?t[2].substr(0,6):"")})),datasets:[{label:"Sectors",data:t.sectorList.map((function(e){return e.value})),backgroundColor:t.sectorList.map((function(e,n){return a[n%t.sectorList.length]})),borderWidth:1}]};return c.a.createElement(d.a,{className:"shadow-sm mt-3 text-center"},c.a.createElement(u.a,{style:{minHeight:"60vh"}},c.a.createElement(i.a,null,c.a.createElement(m.a,{xs:"12"},c.a.createElement("h4",{className:"mb-4"},"Trends")),c.a.createElement(m.a,{xs:"12"},c.a.createElement(i.a,null,c.a.createElement(m.a,{xs:"12",className:"px-0"},c.a.createElement("h6",null,"Average Time per Project"),c.a.createElement("div",{style:{fontSize:"30pt"}},t.totalDurationCloseProject?parseInt(t.totalDuration/t.totalDurationCloseProject).toFixed(2):0," hrs"),c.a.createElement("small",{className:"text-muted"},"Total ",t.totalDuration," hours")),c.a.createElement(m.a,{xs:"12",md:"12",className:"mt-2"},c.a.createElement("div",null,"Skills"),c.a.createElement("div",null,c.a.createElement(k.a,{data:n,options:{maintainAspectRatio:!1,legend:!1,tooltips:{mode:"label"},responsive:!0,responsiveAnimationDuration:2e3,hover:{intersect:!0,mode:"point"},onHover:function(e,t){e.target.style.cursor=t[0]?"pointer":"default"}},height:200,width:700}))),c.a.createElement(m.a,{xs:"12",md:"12",className:"mt-2"},c.a.createElement("div",null,"Sectors"),c.a.createElement("div",null,c.a.createElement(k.a,{data:l,options:{maintainAspectRatio:!1,legend:!1,tooltips:{mode:"label"},responsive:!0,responsiveAnimationDuration:2e3,hover:{intersect:!0,mode:"point"},onHover:function(e,t){e.target.style.cursor=t[0]?"pointer":"default"}},height:200}))))))))},I=function(e){var t,a,n,l=e.data;return c.a.createElement(d.a,{className:"shadow-sm mt-3 text-center"},c.a.createElement(u.a,null,c.a.createElement(i.a,null,c.a.createElement(m.a,{xs:"12"},c.a.createElement("h3",{className:"mb-4"},"Finance")),c.a.createElement(m.a,{xs:"12",lg:"4"},c.a.createElement("small",null,"Total AP"),c.a.createElement("div",{style:{fontSize:"30pt",fontWeight:"bold"}},Object(P.a)(null!==(t=null===l||void 0===l?void 0:l.totalAR)&&void 0!==t?t:0))),c.a.createElement(m.a,{xs:"12",lg:"4"},c.a.createElement("small",null,"Average AP per project"),c.a.createElement("div",{style:{fontSize:"30pt",fontWeight:"bold"}},Object(P.a)(null!==(a=null===l||void 0===l?void 0:l.averageAR)&&void 0!==a?a:0))),c.a.createElement(m.a,{xs:"12",lg:"4"},c.a.createElement("small",null,"Estimated AP based on Tender"),c.a.createElement("div",{style:{fontSize:"30pt",fontWeight:"bold"}},Object(P.a)(null!==(n=null===l||void 0===l?void 0:l.estimateAR)&&void 0!==n?n:0))))))};t.default=function(){var e,t,a=Object(C.b)(),n=Object(O.b)((function(){return"v1/user/me/dashboard"})),l=n.data,s=n.error,E=n.mutate,v=!l||s,f=Object(r.useMemo)((function(){var e,t;return null!==(e=null===l||void 0===l||null===(t=l.data)||void 0===t?void 0:t.data)&&void 0!==e?e:[]}),[l]);return v||!a.name?c.a.createElement("div",{style:{position:"absolute",top:0,right:0,bottom:0,left:0,background:"rgba(255,255,255, 0.5)",display:"flex",justifyContent:"center",alignItems:"center"}},c.a.createElement(o.a,{style:{width:48,height:48}})):c.a.createElement(i.a,{className:"mt-md-3 mt-lg-n2"},c.a.createElement(m.a,{xs:"12"},c.a.createElement(d.a,{className:"shadow-sm"},c.a.createElement(u.a,null,c.a.createElement(i.a,null,c.a.createElement(m.a,{xs:"12",className:"d-flex justify-content-between"},c.a.createElement("h2",{className:"font-weight-bold mb-4"},a.name," ",c.a.createElement("small",{className:"text-muted"},null===(e=a.registrantInformation)||void 0===e?void 0:e.firstName," ",null===(t=a.registrantInformation)||void 0===t?void 0:t.lastName)),c.a.createElement("div",null,c.a.createElement(S.b,{to:"/project/create"},c.a.createElement(p.a,{color:"pinion-primary"},"Create Project")))),c.a.createElement(m.a,{xs:"12"},c.a.createElement(L,{data:null===f||void 0===f?void 0:f.projectList,mutate:E})),c.a.createElement(m.a,{xs:"12"},c.a.createElement(M,{data:null===f||void 0===f?void 0:f.projectStatistics})),c.a.createElement(m.a,{xs:"12",lg:"5"},c.a.createElement(z,{events:null===f||void 0===f?void 0:f.calenderDetails})),c.a.createElement(m.a,{xs:"12",lg:"7"},c.a.createElement(Y,{data:null===f||void 0===f?void 0:f.trendDetails})),c.a.createElement(m.a,{xs:"12"},c.a.createElement(I,{data:null===f||void 0===f?void 0:f.financeStatistics})))))))}}}]);
//# sourceMappingURL=2.fac9435a.chunk.js.map