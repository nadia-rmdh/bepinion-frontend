(this.webpackJsonppplatform=this.webpackJsonppplatform||[]).push([[4],{621:function(e,t,a){"use strict";a.r(t);var l=a(12),n=a(0),r=a.n(n),c=a(524),s=a(362),m=a(376),o=a(381),i=a(385),d=a(386),u=a(375),E=a(387),p=a(388),b=a(214),g=a(390),f=a(619),h=a(389),x=a(374),v=a(370),y=a(620),N=(a(379),a(33)),j=a.n(N),S=a(459),k=a(20),w=a(108),C=a(168),D=a(31),P=a(22),A=Object(c.b)(j.a);var M=function(e){var t=e.data,a=e.mutate,c=Object(n.useState)(null),s=Object(l.a)(c,2),v=s[0],y=s[1];return r.a.createElement(i.a,{className:"shadow-sm"},r.a.createElement(d.a,null,r.a.createElement(m.a,null,r.a.createElement(o.a,{xs:"12",className:"my-1 text-center"},r.a.createElement("h4",null,"Project Status")),r.a.createElement(o.a,{xs:"12",className:"d-flex my-1"},r.a.createElement(E.a,null,r.a.createElement(p.a,{addonType:"prepend"},r.a.createElement(b.a,{className:"bg-transparent border-0 px-0"},r.a.createElement(g.a,{type:"checkbox",id:"dueDateCheckbox"}))),r.a.createElement("div",{className:"d-flex bg-transparent p-1 align-items-center"},"Open")),r.a.createElement(E.a,null,r.a.createElement(p.a,{addonType:"prepend"},r.a.createElement(b.a,{className:"bg-transparent border-0 px-0"},r.a.createElement(g.a,{type:"checkbox",id:"dueDateCheckbox"}))),r.a.createElement("div",{className:"d-flex bg-transparent p-1 align-items-center"},"Under Review")),r.a.createElement(E.a,null,r.a.createElement(p.a,{addonType:"prepend"},r.a.createElement(b.a,{className:"bg-transparent border-0 px-0"},r.a.createElement(g.a,{type:"checkbox",id:"dueDateCheckbox"}))),r.a.createElement("div",{className:"d-flex bg-transparent p-1 align-items-center"},"Expired")),r.a.createElement(E.a,null,r.a.createElement(p.a,{addonType:"prepend"},r.a.createElement(b.a,{className:"bg-transparent border-0 px-0"},r.a.createElement(g.a,{type:"checkbox",id:"dueDateCheckbox"}))),r.a.createElement("div",{className:"d-flex bg-transparent p-1 align-items-center"},"On going")),r.a.createElement(E.a,null,r.a.createElement(p.a,{addonType:"prepend"},r.a.createElement(b.a,{className:"bg-transparent border-0 px-0"},r.a.createElement(g.a,{type:"checkbox",id:"dueDateCheckbox"}))),r.a.createElement("div",{className:"d-flex bg-transparent p-1 align-items-center"},"Complete"))),r.a.createElement(o.a,{xs:"12",className:"my-1"},r.a.createElement(f.a,{hover:!0,className:"text-center"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Project Name"),r.a.createElement("th",null,"Professional Name"),r.a.createElement("th",null,"Closing Date"),r.a.createElement("th",null,"Completion Date"),r.a.createElement("th",null,"Status"))),r.a.createElement("tbody",null,null===t||void 0===t?void 0:t.map((function(e,t){var a,l;return r.a.createElement("tr",{key:t},r.a.createElement("td",null,r.a.createElement(k.b,{to:"".concat("on_going"===e.projectStatus?"/project/".concat(e.idProject,"/wall"):"close"===e.projectStatus?"/rate/".concat(e.idProject):"/project/".concat(e.idProject,"/professionals"))},e.projectName)),r.a.createElement("td",null,(null===e||void 0===e||null===(a=e.professionalList)||void 0===a?void 0:a.length)>0?r.a.createElement(k.b,{to:"/professional/".concat(e.professionalList[0].idProfessionalUserMeta)},e.professionalList[0].firstName," ",e.professionalList[0].lastName):"-"),r.a.createElement("td",null,j()(null!==(l=null===e||void 0===e?void 0:e.completeDate)&&void 0!==l?l:"").format("DD-MM-YYYY")),r.a.createElement("td",null,j()(e.completeDate).format("DD-MM-YYYY")),r.a.createElement("td",{className:"text-uppercase"},e.projectStatus.replace("_"," "),"expired"===e.projectStatus?r.a.createElement(u.a,{color:"pinion-primary",size:"sm",block:!0,className:"text-white mt-2",onClick:function(){return y(e.idProject)}},"Reopen"):null))})))))),r.a.createElement(h.a,{isOpen:v,centered:!0,toggle:function(){return y(!v)}},r.a.createElement(x.a,{className:"p-5"},r.a.createElement(m.a,null,r.a.createElement(o.a,{xs:"12"},r.a.createElement("div",{className:"mb-2"},"Are you sure you want to reopen this project?")),r.a.createElement(o.a,{xs:"12",className:"d-flex justify-content-end"},r.a.createElement(u.a,{color:"secondary",className:"mr-2",onClick:function(){return y(!v)}},"Cancel"),r.a.createElement(u.a,{color:"primary",className:"text-capitalize",onClick:function(){P.a.put("v1/project/".concat(v,"/reopen"),{isReopen:!0}).then((function(e){D.a.success("Reopen Successfully"),a()})).catch((function(e){D.a.error("Reopen Failed")})).finally((function(){return y(!v)}))}},"Reopen")))))))},R=function(e){var t=e.data;return r.a.createElement(i.a,{className:"shadow-sm mt-3"},r.a.createElement(d.a,null,r.a.createElement(m.a,null,r.a.createElement(o.a,{xs:"12",className:"my-1 text-center"},r.a.createElement("h4",null,"Project Statistics")),r.a.createElement(o.a,{xs:"12",className:"d-flex my-1 justify-content-center"},r.a.createElement(m.a,null,r.a.createElement(o.a,{xs:"12",md:"4"},r.a.createElement("p",{style:{whiteSpace:"nowrap"}},"Number of projects in tender"),r.a.createElement("div",{className:"d-flex justify-content-center",style:{fontSize:"50pt"}},r.a.createElement(v.a,{color:"secondary",className:"d-flex justify-content-center",style:{width:80,height:80}},t.posted))),r.a.createElement(o.a,{xs:"12",md:"4"},r.a.createElement("p",{style:{whiteSpace:"nowrap"}},"Number of active projects"),r.a.createElement("div",{className:"d-flex justify-content-center",style:{fontSize:"50pt"}},r.a.createElement(v.a,{color:"secondary",className:"d-flex justify-content-center",style:{width:80,height:80}},t.onGoing))),r.a.createElement(o.a,{xs:"12",md:"4"},r.a.createElement("p",{style:{whiteSpace:"nowrap"}},"Number of completed projects"),r.a.createElement("div",{className:"d-flex justify-content-center",style:{fontSize:"50pt"}},r.a.createElement(v.a,{color:"secondary",className:"d-flex justify-content-center",style:{width:80,height:80}},t.close))))))))},z=function(e){var t=e.events;return r.a.createElement(i.a,{className:"shadow-sm mt-3 text-center"},r.a.createElement(d.a,{style:{height:"60vh"}},r.a.createElement(m.a,null,r.a.createElement(o.a,{xs:"12"},r.a.createElement("h4",{className:"mb-4"},"My Calendar"),r.a.createElement(c.a,{popup:!0,localizer:A,defaultDate:new Date,messages:{previous:r.a.createElement("i",{className:"fa fa-angle-left"}),next:r.a.createElement("i",{className:"fa fa-angle-right"})},defaultView:"month",views:["month","agenda"],events:t,style:{height:"50vh"}})))))},T=function(){return r.a.createElement(i.a,{className:"shadow-sm mt-3 text-center"},r.a.createElement(d.a,{style:{height:"60vh"}},r.a.createElement(m.a,null,r.a.createElement(o.a,{xs:"12"},r.a.createElement("h4",{className:"mb-4"},"Trends")),r.a.createElement(o.a,{xs:"12"},r.a.createElement(m.a,null,r.a.createElement(o.a,{xs:"4",className:"px-0 h-100px"},r.a.createElement("h6",null,"My load this week"),r.a.createElement("div",{className:"mt-4 px-4"},r.a.createElement(y.a,{color:"#555",value:60},r.a.createElement("b",{style:{color:"#555"}},60,"%")))),r.a.createElement(o.a,{xs:"4",className:"px-0"},r.a.createElement("h6",null,"Average Time per Project"),r.a.createElement("div",{style:{fontSize:"30pt"}},"2 hrs"),r.a.createElement("small",{className:"text-muted"},"Total 10 hours")),r.a.createElement(o.a,{xs:"4",className:"px-0"},r.a.createElement("h6",null,"Bid Success Rate"),r.a.createElement("div",{style:{fontSize:"30pt"}},"20%"),r.a.createElement("small",{className:"text-muted"},"5/25 projects")),r.a.createElement(o.a,{xs:"6",className:"mt-5"},r.a.createElement("div",null,"Skills"),r.a.createElement("div",null,r.a.createElement(S.a,{data:{labels:["Skill 1","Skill 2","Skill 3","Skill 4","Skill 5","Skill 6"],datasets:[{label:"Skills",data:[12,19,3,5,2,3],backgroundColor:["rgba(255, 99, 132, 0.7)","rgba(54, 162, 235, 0.7)","rgba(255, 206, 86, 0.7)","rgba(75, 192, 192, 0.7)","rgba(153, 102, 255, 0.7)","rgba(255, 159, 64, 0.7)"],borderColor:["rgba(255, 99, 132, 1)","rgba(54, 162, 235, 1)","rgba(255, 206, 86, 1)","rgba(75, 192, 192, 1)","rgba(153, 102, 255, 1)","rgba(255, 159, 64, 1)"],borderWidth:1}]},options:{maintainAspectRatio:!1,legend:!1,tooltips:{mode:"label"},responsive:!0,responsiveAnimationDuration:2e3,hover:{intersect:!0,mode:"point"},onHover:function(e,t){e.target.style.cursor=t[0]?"pointer":"default"}},height:250}))),r.a.createElement(o.a,{xs:"6",className:"mt-5"},r.a.createElement("div",null,"Sectors"),r.a.createElement("div",null,r.a.createElement(S.a,{data:{labels:["Sector 1","Sector 2","Sector 3","Sector 4","Sector 5","Sector 6"],datasets:[{label:"Sectors",data:[12,19,3,5,2,3],backgroundColor:["rgba(255, 99, 132, 0.7)","rgba(54, 162, 235, 0.7)","rgba(255, 206, 86, 0.7)","rgba(75, 192, 192, 0.7)","rgba(153, 102, 255, 0.7)","rgba(255, 159, 64, 0.7)"],borderColor:["rgba(255, 99, 132, 1)","rgba(54, 162, 235, 1)","rgba(255, 206, 86, 1)","rgba(75, 192, 192, 1)","rgba(153, 102, 255, 1)","rgba(255, 159, 64, 1)"],borderWidth:1}]},options:{maintainAspectRatio:!1,legend:!1,tooltips:{mode:"label"},responsive:!0,responsiveAnimationDuration:2e3,hover:{intersect:!0,mode:"point"},onHover:function(e,t){e.target.style.cursor=t[0]?"pointer":"default"}},height:250}))))))))},O=function(e){var t=e.data;return r.a.createElement(i.a,{className:"shadow-sm mt-3 text-center"},r.a.createElement(d.a,null,r.a.createElement(m.a,null,r.a.createElement(o.a,{xs:"12"},r.a.createElement("h3",{className:"mb-4"},"Finance")),r.a.createElement(o.a,{xs:"12",lg:"4"},r.a.createElement("small",null,"Total AP"),r.a.createElement("div",{style:{fontSize:"30pt",fontWeight:"bold"}},t.totalAR)),r.a.createElement(o.a,{xs:"12",lg:"4"},r.a.createElement("small",null,"Average AP per project"),r.a.createElement("div",{style:{fontSize:"30pt",fontWeight:"bold"}},t.averageAR)),r.a.createElement(o.a,{xs:"12",lg:"4"},r.a.createElement("small",null,"Estimated AP based on Tender"),r.a.createElement("div",{style:{fontSize:"30pt",fontWeight:"bold"}},t.estimateAR)))))};t.default=function(){var e,t,a=Object(w.b)(),l=Object(C.b)((function(){return"v1/user/me/dashboard"})),c=l.data,E=l.error,p=l.mutate,b=!c||E,g=Object(n.useMemo)((function(){var e,t;return null!==(e=null===c||void 0===c||null===(t=c.data)||void 0===t?void 0:t.data)&&void 0!==e?e:[]}),[c]);return b?r.a.createElement("div",{style:{position:"absolute",top:0,right:0,bottom:0,left:0,background:"rgba(255,255,255, 0.5)",display:"flex",justifyContent:"center",alignItems:"center"}},r.a.createElement(s.a,{style:{width:48,height:48}})):r.a.createElement(m.a,{className:"mt-md-3 mt-lg-n2"},r.a.createElement(o.a,{xs:"12"},r.a.createElement(i.a,{className:"shadow-sm"},r.a.createElement(d.a,null,r.a.createElement(m.a,null,r.a.createElement(o.a,{xs:"12",className:"d-flex justify-content-between"},r.a.createElement("h2",{className:"font-weight-bold mb-4"},a.name," ",r.a.createElement("small",{className:"text-muted"},null===(e=a.registrantInformation)||void 0===e?void 0:e.firstName," ",null===(t=a.registrantInformation)||void 0===t?void 0:t.lastName)),r.a.createElement("div",null,r.a.createElement(k.b,{to:"/project/create"},r.a.createElement(u.a,{color:"primary"},"Create Project")))),r.a.createElement(o.a,{xs:"12"},r.a.createElement(M,{data:null===g||void 0===g?void 0:g.projectList,mutate:p})),r.a.createElement(o.a,{xs:"12"},r.a.createElement(R,{data:null===g||void 0===g?void 0:g.projectStatistics})),r.a.createElement(o.a,{xs:"12",lg:"5"},r.a.createElement(z,{events:[{title:"Meeting 1",start:"2021-08-08 08:00:00",end:"2021-08-08 12:00:00"},{title:"Meeting 2",start:"2021-08-12 08:00:00",end:"2021-08-12 12:00:00"},{title:"Meeting 3",start:"2021-08-16 08:00:00",end:"2021-08-16 12:00:00"},{title:"Meeting 4",start:"2021-08-20 08:00:00",end:"2021-08-20 12:00:00"}]})),r.a.createElement(o.a,{xs:"12",lg:"7"},r.a.createElement(T,null)),r.a.createElement(o.a,{xs:"12"},r.a.createElement(O,{data:null===g||void 0===g?void 0:g.financeStatistics})))))))}}}]);
//# sourceMappingURL=4.9328c77a.chunk.js.map