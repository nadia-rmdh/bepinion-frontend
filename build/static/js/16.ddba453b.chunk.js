(this.webpackJsonppplatform=this.webpackJsonppplatform||[]).push([[16],{401:function(e,t,a){"use strict";a.d(t,"b",(function(){return i})),a.d(t,"a",(function(){return m}));var l=a(0),n=a.n(l),r=a(408),c=a.n(r);function i(e){for(var t="",a=null===e||void 0===e?void 0:e.toString().split("").reverse().join(""),l=0;l<a.length;l++)l%3===0&&(t+=a.substr(l,3)+".");return t.split("",t.length-1).reverse().join("")}function m(e){for(var t=[{divider:1e18,suffix:"E"},{divider:1e15,suffix:"P"},{divider:1e12,suffix:"T"},{divider:1e9,suffix:"B"},{divider:1e6,suffix:"mio"},{divider:1e3,suffix:"k"}],a=0;a<t.length;a++)if(e>=t[a].divider)return n.a.createElement("div",{className:"d-flex justify-content-center align-items-baseline"},"k"===t[a].suffix?(e/t[a].divider).toFixed(0).toString():(e/t[a].divider).toFixed(1).toString(),n.a.createElement("span",{style:{fontSize:20}},t[a].suffix));return e.toString()}c.a.register("locale","indonesia",{delimiters:{thousands:".",decimal:","},abbreviations:{thousand:"rb",million:"jt",billion:"M",trillion:"T"},ordinal:function(e){return 1===e?"er":"\xe8me"},currency:{symbol:"IDR"}}),c.a.locale("indonesia")},661:function(e,t,a){"use strict";a.r(t);var l=a(2),n=a(11),r=a(0),c=a.n(r),i=a(370),m=a(392),s=a(393),o=a(385),d=a(390),u=a(384),v=a(378),E=a(396),p=a(383),f=a(394),b=a(395),g=a(219),N=a(28),x=a(9),h=a(18),j=a(171),y=a(33),M=a.n(y),D=a(15),C=a(21),O=a(458),S=a(112),Y=a(401),k=a(172);t.default=function(e){e.data;var t,a,l,E,p=Object(h.g)(),f=Object(S.b)(),b=Object(r.useState)(!1),g=Object(n.a)(b,2),N=g[0],x=g[1],y=Object(h.i)(),D=Object(j.b)((function(){return"v1/project/".concat(y.params.projectId)})),C=D.data,O=D.error,V=D.mutate,A=!C||O,I=Object(r.useMemo)((function(){var e,t;return null!==(e=null===C||void 0===C||null===(t=C.data)||void 0===t?void 0:t.data)&&void 0!==e?e:[]}),[C]);return A?(I.status&&"open"!==I.status&&p.push("/"),c.a.createElement("div",{style:{position:"absolute",top:0,right:0,bottom:0,left:0,background:"rgba(255,255,255, 0.5)",display:"flex",justifyContent:"center",alignItems:"center"}},c.a.createElement(i.a,{style:{width:48,height:48}}))):c.a.createElement(m.a,null,c.a.createElement(s.a,null,c.a.createElement(o.a,null,c.a.createElement(d.a,{xs:"12",className:"d-flex justify-content-between mb-3"},c.a.createElement("div",null,c.a.createElement("div",{className:"font-lg font-weight-bold"},I.name),c.a.createElement("div",{className:"text-muted"},I.projectOwnerName),c.a.createElement("div",null,c.a.createElement("span",{className:"text-muted"},"Posted")," ",M()(I.createdAt).format("DD MMMM YYYY")),c.a.createElement("div",null,c.a.createElement("span",{className:"text-muted"},"Closing On")," ",M()(I.closingDate).format("DD MMMM YYYY"))),"professional"===f.role&&c.a.createElement("div",null,c.a.createElement("div",{className:"float-right"},I.isApplied?c.a.createElement(u.a,{color:"primary",disabled:!0},"Applied"):c.a.createElement(u.a,{color:"primary",disabled:"open"!==I.status,onClick:function(){return x(!N)}},"Apply")),c.a.createElement("br",null),"open"===I.status?c.a.createElement("div",{className:"mt-5 font-sm font-weight-bold text-danger"},"Closing in ",M()(I.closingDate).fromNow(!0)):c.a.createElement("div",{className:"mt-5 font-sm font-weight-bold text-danger"},"Closed"))),c.a.createElement(d.a,{xs:"12"},c.a.createElement(o.a,null,c.a.createElement(d.a,{xs:"12",lg:"9"},c.a.createElement("div",{className:"font-lg font-weight-bold mb-2"},"Project Details"),c.a.createElement(o.a,null,c.a.createElement(d.a,{xs:"12",md:"6"},c.a.createElement("div",{className:"mb-2"},c.a.createElement("div",{className:"text-muted"},"Description"),c.a.createElement("div",{style:{whiteSpace:"pre-line"}},null!==(t=I.description)&&void 0!==t?t:"")),c.a.createElement("div",{className:"mb-2"},c.a.createElement("div",{className:"text-muted"},"Supporting Materials"),c.a.createElement("div",{style:{whiteSpace:"pre-line"}},null!==(a=I.prerequisite)&&void 0!==a?a:"-"))),c.a.createElement(d.a,{xs:"12",md:"6"},c.a.createElement("div",{className:"mb-2"},c.a.createElement("div",{className:"text-muted"},"Meeting Date"),c.a.createElement("div",null,M()(I.meetingDetails.date).format("DD MMMM YYYY"))),c.a.createElement("div",{className:"mb-2"},c.a.createElement("div",{className:"text-muted"},"Sector"),c.a.createElement("div",null,I.sectors.map((function(e,t){return"".concat(e.sector.name).concat(I.sectors.length===t+1?"":","," ")})))),c.a.createElement("div",{className:"mb-2"},c.a.createElement("div",{className:"text-muted"},"Meeting Duration"),c.a.createElement("div",null,I.duration," Hours")),c.a.createElement("div",{className:"mb-2"},c.a.createElement("div",{className:"text-muted"},"Minimum Contract Value"),c.a.createElement("div",null,Number.isInteger(null===I||void 0===I?void 0:I.minimumContractValue)?"IDR ".concat(Object(Y.b)(null!==(l=null===I||void 0===I?void 0:I.minimumContractValue)&&void 0!==l?l:0)):null===I||void 0===I?void 0:I.minimumContractValue)),c.a.createElement("div",{className:"mb-2"},c.a.createElement("div",{className:"text-muted"},"Estimated Contract Value"),c.a.createElement("div",null,Number.isInteger(null===I||void 0===I?void 0:I.estimatedContractValue)?"IDR ".concat(Object(Y.b)(null!==(E=null===I||void 0===I?void 0:I.estimatedContractValue)&&void 0!==E?E:0)):null===I||void 0===I?void 0:I.estimatedContractValue))))),c.a.createElement(d.a,{xs:"12",lg:"3"},c.a.createElement("div",{className:"font-lg font-weight-bold mb-2"},"Requirements"),c.a.createElement("div",{className:"mb-2"},c.a.createElement("div",{className:"text-muted"},"Skills"),I.projectRequirementSkill.map((function(e,t){return c.a.createElement(v.a,{key:t,style:{backgroundColor:k.a[e.skill.category]},className:"w-100 text-uppercase font-sm my-1 text-light"},e.skill.name)}))),c.a.createElement("div",{className:"mb-2"},c.a.createElement("div",{className:"text-muted"},"Minimum years of experience"),c.a.createElement("div",null,null===I||void 0===I?void 0:I.minYearExp," years")),c.a.createElement("div",{className:"mb-2"},c.a.createElement("div",null,"Bachelor Degree in Mechanical Engineering")))))),c.a.createElement(w,{modalApply:N,setModalApply:x,project:I,mutate:V,matchRoute:y,authUser:f})))};var w=function(e){var t,a=e.modalApply,i=e.setModalApply,m=e.project,s=e.mutate,v=e.matchRoute,h=e.authUser,j=Object(r.useState)(!1),y=Object(n.a)(j,2),S=y[0],k=y[1],w=Object(N.a)({initialValues:{cost:0},validationSchema:function(){return x.e().shape({cost:x.d().min(null===h||void 0===h?void 0:h.smcv,"Min value "+(null===h||void 0===h?void 0:h.smcv)).label("Duration")})},onSubmit:function(e,t){var l=t.setSubmitting;t.setErrors;l(!0),D.a.post("v1/project/".concat(v.params.projectId,"/apply"),{submittedCost:parseInt(e.cost)}).then((function(e){C.a.success("Project successfully applied."),s(),k(!S),i(!a)})).catch((function(e){C.a.error("Apply project failed."),k(!S)})).finally((function(){l(!1)}))}}),V=w.values,A=w.touched,I=w.errors,R=w.setValues,P=w.handleSubmit;return c.a.createElement(c.a.Fragment,null,c.a.createElement(E.a,{isOpen:a,centered:!0,toggle:function(){return i(!a)}},c.a.createElement(p.a,{className:"p-5"},c.a.createElement(o.a,null,c.a.createElement(d.a,{xs:"12",className:"mb-5"},c.a.createElement("div",{className:"mb-2"},c.a.createElement("div",{className:"text-muted"},"Project name"),c.a.createElement("div",null,m.name)),c.a.createElement("div",{className:"mb-2"},c.a.createElement("div",{className:"text-muted"},"Duration"),c.a.createElement("div",null,m.duration," Hours")),c.a.createElement("div",{className:"mb-2"},c.a.createElement("div",{className:"text-muted"},"Completion date"),c.a.createElement("div",null,M()(m.completeDate).format("DD MMMM YYYY"))),c.a.createElement("div",{className:"mb-2"},c.a.createElement("div",{className:"text-muted"},"Proposed service fee"),c.a.createElement(f.a,null,c.a.createElement(b.a,{addonType:"prepend"},c.a.createElement(g.a,null,"IDR")),c.a.createElement(O.a,{placeholder:"Min. value 500.000",decimalsLimit:2,maxLength:"9",groupSeparator:".",decimalSeparator:",",value:V.cost,onValueChange:function(e){R(e>1e8?function(e){return Object(l.a)(Object(l.a)({},e),{},{cost:1e8})}:function(t){return Object(l.a)(Object(l.a)({},t),{},{cost:e})})},className:"form-control ".concat(A.cost&&I.cost&&"border border-danger")})),c.a.createElement("small",{className:"text-muted"},"*Minimum proposed service fee should be Rp ",Object(Y.b)(null!==(t=null===h||void 0===h?void 0:h.smcv)&&void 0!==t?t:0)))),c.a.createElement(d.a,{xs:"12",className:"mb-3"},c.a.createElement("small",{className:"text-muted"},"*Platform fee 5% and WHT would be deducted from project value")),c.a.createElement(d.a,{xs:"12",className:"d-flex justify-content-end"},c.a.createElement(u.a,{color:"secondary",className:"mr-2",onClick:function(){return i(!a)}},"Cancel"),c.a.createElement(u.a,{color:"primary",disabled:V.cost<(null===h||void 0===h?void 0:h.smcv),onClick:function(){return k(!S)}},"Apply"))))),c.a.createElement(E.a,{isOpen:S,centered:!0,toggle:function(){return k(!S)}},c.a.createElement(p.a,{className:"p-5"},c.a.createElement(o.a,null,c.a.createElement(d.a,{xs:"12",className:"mb-4"},c.a.createElement("div",{className:"font-weight-bold"},"By clicking submit, you confirm that all the information provided is true and correct.")),c.a.createElement(d.a,{xs:"12",className:"d-flex justify-content-end"},c.a.createElement(u.a,{color:"secondary",className:"mr-2",onClick:function(){return k(!S)}},"No"),c.a.createElement(u.a,{color:"primary",onClick:P},"Yes"))))))}}}]);
//# sourceMappingURL=16.ddba453b.chunk.js.map