(this.webpackJsonppplatform=this.webpackJsonppplatform||[]).push([[23],{792:function(e,t,a){"use strict";a.r(t);var l=a(11),n=a(0),c=a.n(n),r=a(368),m=a(383),s=a(388),o=a(390),i=a(391),d=a(382),u=a(394),E=a(381),v=a(376),p=a(37),f=a.n(p),N=a(24),x=a(171),b=a.n(x),h=a(18),g=a(170),y=a(21),j=a(16),w=a(113),k=["success","danger","warning","secondary","info","primary","light","dark"];var S=function(e){var t,a=e.professional,r=e.matchRoute,v=Object(n.useState)(!1),p=Object(l.a)(v,2),f=p[0],x=p[1],h=Object(n.useState)(null),k=Object(l.a)(h,2),S=k[0],M=k[1],C=Object(g.b)((function(){return"v1/project/client"}),{refreshInterval:0}),Y=C.data,I=C.error,O=!Y||I,D=Object(n.useMemo)((function(){var e,t;return null!==(e=null===Y||void 0===Y||null===(t=Y.data)||void 0===t?void 0:t.data.map((function(e){return{label:e.name,value:e.id}})))&&void 0!==e?e:[]}),[Y]),P=Object(n.useCallback)((function(e){e.target.src=b.a,e.target.onerror=null}),[]);return c.a.createElement(o.a,{className:"shadow-sm"},c.a.createElement(i.a,null,c.a.createElement(m.a,null,c.a.createElement(s.a,{xs:"12",md:"6",className:"d-flex align-items-center"},a.avatar?c.a.createElement("img",{src:a.avatar.replace("http://127.0.0.1:5000","https://bepinion.com"),alt:"profile",width:180,height:180,style:{objectFit:"cover"},onError:function(e){return P(e)},className:"rounded-circle shadow-sm mb-3"}):c.a.createElement(w.a,{text:"".concat(a.firstName," ").concat(a.lastName),role:"p",size:180}),c.a.createElement("div",{className:"ml-3"},c.a.createElement("div",{className:"font-2xl font-weight-bold mb-2"},a.firstName," ",a.lastName),c.a.createElement("div",{className:"mb-2"},a.yearOfExperience," year of experience"))),c.a.createElement(s.a,{xs:"12",md:"6"},c.a.createElement(m.a,null,c.a.createElement(s.a,{xs:"12"},c.a.createElement(d.a,{color:"primary",className:"float-right",onClick:function(){return x(!f)}},"Invite")),c.a.createElement(s.a,{xs:"12"},c.a.createElement("div",{className:"font-lg font-weight-bold mb-2"},"About me"),c.a.createElement("div",{className:"text-muted"},null!==(t=a.about)&&void 0!==t?t:"Nothing about me"))))),c.a.createElement(u.a,{isOpen:f,centered:!0,toggle:function(){return x(!f)}},c.a.createElement(E.a,{className:"p-5"},c.a.createElement(m.a,null,c.a.createElement(s.a,{xs:"12"},c.a.createElement("div",{className:"mb-2"},"Choose a project to inviting professional!")),c.a.createElement(s.a,{xs:"12",className:"mb-3"},c.a.createElement(N.a,{options:D,isDisabled:O,onChange:function(e){return function(e){M(null!==e&&void 0!==e?e:"")}(e)},components:{DropdownIndicator:function(){return null},IndicatorSeparator:function(){return null}},value:S})),c.a.createElement(s.a,{xs:"12",className:"d-flex justify-content-end"},c.a.createElement(d.a,{color:"secondary",className:"mr-2",onClick:function(){return x(!f)}},"Cancel"),c.a.createElement(d.a,{color:"primary",className:"text-capitalize",onClick:function(){j.a.post("v1/professional/".concat(r.params.professionalId,"/invite"),{idProject:S.value}).then((function(e){y.a.success("Invite Successfully")})).catch((function(e){y.a.error("Invite Failed")})).finally((function(){return x(!f)}))}},"Invite")))))))},M=function(e){var t,a,l,n,r=e.professional;return c.a.createElement(o.a,null,c.a.createElement(i.a,null,c.a.createElement(m.a,null,c.a.createElement(s.a,{xs:"12"},c.a.createElement("div",{className:"font-lg font-weight-bold mb-2"},"SKILLS AND STATISTICS")),c.a.createElement(s.a,{xs:"12",md:"6",className:"d-flex justify-content-center align-items-center p-3"},c.a.createElement(o.a,{style:{width:"200px",height:"200px"}},c.a.createElement(i.a,{className:"d-flex justify-content-center align-items-center"},c.a.createElement("div",{className:"text-muted text-center"},"This feature to be released soon")))),c.a.createElement(s.a,{xs:"12",md:"6"},c.a.createElement("div",{className:"mb-2"},c.a.createElement("div",{className:"text-muted"},"Skills"),c.a.createElement("div",null,null===r||void 0===r||null===(t=r.skills)||void 0===t?void 0:t.map((function(e,t){return c.a.createElement(v.a,{key:t,color:k[t],className:"text-uppercase m-1 font-sm text-light",style:{whiteSpace:"normal"}},e.name)})))),c.a.createElement("div",{className:"mb-2"},c.a.createElement("div",{className:"text-muted"},"Sectors"),c.a.createElement("div",null,null===r||void 0===r||null===(a=r.sectors)||void 0===a?void 0:a.map((function(e,t){return c.a.createElement(v.a,{key:t,color:k[t],className:"text-uppercase m-1 font-sm text-light",style:{whiteSpace:"normal"}},e.name)}))))),c.a.createElement(s.a,{xs:"12",md:"6",className:"text-center mt-3"},c.a.createElement("div",{className:"d-flex justify-content-center",style:{fontSize:"50pt"}},c.a.createElement(v.a,{color:"secondary",className:"d-flex justify-content-center",style:{width:80,height:80}},null===r||void 0===r||null===(l=r.projectDetails)||void 0===l?void 0:l.closedProject)),c.a.createElement("p",{style:{whiteSpace:"nowrap"}},"Project Completed")),c.a.createElement(s.a,{xs:"12",md:"6",className:"text-center mt-3"},c.a.createElement("div",{className:"d-flex justify-content-center",style:{fontSize:"50pt"}},c.a.createElement(v.a,{color:"secondary",className:"d-flex justify-content-center",style:{width:80,height:80}},null===r||void 0===r||null===(n=r.projectDetails)||void 0===n?void 0:n.activeProject)),c.a.createElement("p",{style:{whiteSpace:"nowrap"}},"Active Projects")))))},C=function(e){var t,a=e.professional;return c.a.createElement(o.a,{className:"shadow-sm"},c.a.createElement(i.a,null,c.a.createElement(m.a,null,c.a.createElement(s.a,{xs:"12"},c.a.createElement("div",{className:"font-lg font-weight-bold mb-2"},"WORK EXPERIENCE")),null===a||void 0===a||null===(t=a.workExperience)||void 0===t?void 0:t.map((function(e,t){var a;return c.a.createElement(s.a,{xs:"12",key:t},c.a.createElement(o.a,null,c.a.createElement(i.a,null,c.a.createElement("div",{className:"position-relative"},c.a.createElement("div",{className:"mb-2"},c.a.createElement("div",{className:"text-muted"},"Job"),c.a.createElement("div",{className:"font-weight-bold"},e.jobTitle)),c.a.createElement("div",{className:"mb-2"},c.a.createElement("div",{className:"text-muted"},"Company Name"),c.a.createElement("div",null,e.companyName)),c.a.createElement("div",{className:"mb-2"},c.a.createElement("div",{className:"text-muted"},"Sectors"),c.a.createElement("div",null,e.sector)),c.a.createElement("div",{className:"mb-2"},c.a.createElement("div",{className:"text-muted"},"Skills"),c.a.createElement("div",null,null===e||void 0===e||null===(a=e.skills)||void 0===a?void 0:a.map((function(e,t){return c.a.createElement(v.a,{key:t,color:k[t],className:"text-uppercase mx-1 font-sm text-light"},e.name)})))),c.a.createElement("div",{className:"position-absolute",style:{right:"0px",top:"0px"}},f()(e.startDate).format("MMMM YYYY")," - ",f()(e.endDate).format("MMMM YYYY"))))))})))))},Y=function(e){var t,a=e.professional;return c.a.createElement(o.a,{className:"shadow-sm"},c.a.createElement(i.a,null,c.a.createElement(m.a,null,c.a.createElement(s.a,{xs:"12"},c.a.createElement("div",{className:"font-lg font-weight-bold mb-2"},"EDUCATION")),null===a||void 0===a||null===(t=a.educations)||void 0===t?void 0:t.map((function(e,t){return c.a.createElement(s.a,{xs:"12",key:t},c.a.createElement(o.a,null,c.a.createElement(i.a,null,c.a.createElement("div",{className:"position-relative"},c.a.createElement("div",{className:"font-weight-bold"},e.educationDegree),c.a.createElement("div",null,e.educationField),c.a.createElement("div",null,e.school),c.a.createElement("div",{className:"position-absolute",style:{right:"0px",top:"0px"}},e.graduationYear)))))})))))},I=function(e){var t,a=e.professional;return c.a.createElement(o.a,{className:"shadow-sm"},c.a.createElement(i.a,null,c.a.createElement(m.a,null,c.a.createElement(s.a,{xs:"12"},c.a.createElement("div",{className:"font-lg font-weight-bold mb-2"},"PROJECT EXPERIENCE")),null===a||void 0===a||null===(t=a.projectExperience)||void 0===t?void 0:t.map((function(e,t){var a;return c.a.createElement(s.a,{xs:"12",key:t},c.a.createElement(o.a,null,c.a.createElement(i.a,null,c.a.createElement("div",{className:"position-relative"},c.a.createElement("div",{className:"mb-2"},c.a.createElement("div",{className:"text-muted"},"Project Name"),c.a.createElement("div",null,e.projectName)),c.a.createElement("div",{className:"mb-2"},c.a.createElement("div",{className:"text-muted"},"Project Role"),c.a.createElement("div",null,e.projectRole)),c.a.createElement("div",{className:"mb-2"},c.a.createElement("div",{className:"text-muted"},"Client Name"),c.a.createElement("div",null,e.clientName)),c.a.createElement("div",{className:"mb-2"},c.a.createElement("div",{className:"text-muted"},"Project Sector"),c.a.createElement("div",null,e.sector)),c.a.createElement("div",{className:"mb-2"},c.a.createElement("div",{className:"text-muted"},"Skills"),c.a.createElement("div",null,null===e||void 0===e||null===(a=e.skills)||void 0===a?void 0:a.map((function(e,t){return c.a.createElement(v.a,{key:t,color:k[t],className:"text-uppercase mx-1 font-sm text-light"},e.name)})))),c.a.createElement("div",{className:"position-absolute",style:{right:"0px",top:"0px"}},c.a.createElement("div",null,f()(e.startDate).format("MMMM YYYY")," - ",f()(e.endDate).format("MMMM YYYY")),c.a.createElement("div",null,"Contract Value Range"))))))})))))};t.default=function(){var e=Object(h.i)(),t=Object(g.b)((function(){return"v1/professional/".concat(e.params.professionalId)})),a=t.data,l=t.error,o=!a||l,i=Object(n.useMemo)((function(){var e,t;return null!==(e=null===a||void 0===a||null===(t=a.data)||void 0===t?void 0:t.data)&&void 0!==e?e:[]}),[a]);return o?c.a.createElement("div",{style:{position:"absolute",top:0,right:0,bottom:0,left:0,background:"rgba(255,255,255, 0.5)",display:"flex",justifyContent:"center",alignItems:"center"}},c.a.createElement(r.a,{style:{width:48,height:48}})):c.a.createElement(m.a,{className:"mt-md-3 mt-lg-n2"},c.a.createElement(s.a,{xs:"12"},c.a.createElement(m.a,null,c.a.createElement(s.a,{xs:"12"},c.a.createElement(S,{professional:i,matchRoute:e})),c.a.createElement(s.a,{xs:"12",md:"6"},c.a.createElement(M,{professional:i}),c.a.createElement(C,{professional:i}),c.a.createElement(Y,{professional:i})),c.a.createElement(s.a,{xs:"12",md:"6"},c.a.createElement(I,{professional:i})))))}}}]);
//# sourceMappingURL=23.a12272e4.chunk.js.map