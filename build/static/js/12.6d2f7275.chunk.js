(this.webpackJsonppplatform=this.webpackJsonppplatform||[]).push([[12],{402:function(e,t,a){"use strict";a.d(t,"b",(function(){return r})),a.d(t,"a",(function(){return c}));var n=a(409),l=a.n(n);function r(e){for(var t="",a=null===e||void 0===e?void 0:e.toString().split("").reverse().join(""),n=0;n<a.length;n++)n%3===0&&(t+=a.substr(n,3)+".");return t.split("",t.length-1).reverse().join("")}function c(e){for(var t=[{divider:1e18,suffix:"E"},{divider:1e15,suffix:"P"},{divider:1e12,suffix:"T"},{divider:1e9,suffix:"G"},{divider:1e6,suffix:"M"},{divider:1e3,suffix:"k"}],a=0;a<t.length;a++)if(e>=t[a].divider)return(e/t[a].divider).toString()+t[a].suffix;return e.toString()}l.a.register("locale","indonesia",{delimiters:{thousands:".",decimal:","},abbreviations:{thousand:"rb",million:"jt",billion:"M",trillion:"T"},ordinal:function(e){return 1===e?"er":"\xe8me"},currency:{symbol:"IDR"}}),l.a.locale("indonesia")},420:function(e,t,a){"use strict";a.d(t,"a",(function(){return s}));var n=a(11),l=a(0),r=a.n(l),c=a(634),i=a(635),o=a(636);function s(e,t,a,c){var i=Object(l.useState)(t),o=Object(n.a)(i,2),s=o[0],u=o[1];Object(l.useEffect)((function(){return c(s)}),[s,c]);var d=Object(l.useCallback)((function(){u((function(e){return e===a-1?e:e+1}))}),[a]),f=Object(l.useCallback)((function(){u((function(e){return 0===e?e:e-1}))}),[]),E=Object(l.useCallback)((function(e){u(e)}),[]),b=Object(l.useMemo)((function(){return function(e){return r.a.createElement(m,{handleFirst:function(){return E(0)},handleLast:function(){return E(a-1)},handleNext:d,handlePrev:f,handleGoto:E,currentPage:s,count:a})}}),[E,d,f,s,a]);return{currentPage:s,next:d,prev:f,goto:E,totalPage:a,PaginationComponent:b}}var m=function(e){var t=e.handleFirst,a=e.handleLast,n=e.handleNext,l=e.handlePrev,s=e.handleGoto,m=e.count,u=e.currentPage;return r.a.createElement(c.a,{className:"pagination-hub d-flex justify-content-center"},t&&r.a.createElement(i.a,{disabled:!(u-1>=0)},r.a.createElement(o.a,{first:!0,onClick:t,disabled:0===u})),l&&r.a.createElement(i.a,{disabled:!(u-1>=0)},r.a.createElement(o.a,{previous:!0,onClick:l,disabled:0===u})),u-3>=0&&r.a.createElement(i.a,{disabled:!0},r.a.createElement(o.a,{className:"text-dark"},"...")),u-2>=0&&r.a.createElement(i.a,{className:"d-none d-md-block"},r.a.createElement(o.a,{onClick:function(){return s(u-2)}},u-1)),u-1>=0&&r.a.createElement(i.a,null,r.a.createElement(o.a,{onClick:function(){return s(u-1)}},u)),r.a.createElement(i.a,{active:!0,disabled:!0},r.a.createElement(o.a,{onClick:function(){return s(u)}},u+1)),u+1<m&&r.a.createElement(i.a,null,r.a.createElement(o.a,{onClick:function(){return s(u+1)}},u+2)),u+2<m&&r.a.createElement(i.a,{className:"d-none d-md-block"},r.a.createElement(o.a,{onClick:function(){return s(u+2)}},u+3)),u+3<m&&r.a.createElement(i.a,{disabled:!0},r.a.createElement(o.a,{className:"text-dark"},"...")),r.a.createElement(i.a,{disabled:!(u+1<m)},r.a.createElement(o.a,{next:!0,onClick:n,disabled:u===m-1})),r.a.createElement(i.a,{disabled:!(u+1<m)},r.a.createElement(o.a,{last:!0,onClick:a,disabled:u===m-1})))}},421:function(e,t,a){"use strict";t.a=["success","danger","warning","secondary","info","primary","dark"]},455:function(e,t,a){"use strict";var n=a(2),l=a(11),r=a(0),c=a.n(r),i=a(24),o=a(403);t.a=function(){var e=Object(o.b)(),t=Object(l.a)(e,2),a=t[0],r=t[1];return c.a.createElement(c.a.Fragment,null,c.a.createElement("small",{className:"font-weight-bold mb-2 text-center"},"Skill Match"),c.a.createElement("div",{className:"px-3"}),c.a.createElement(i.a,{isSearchable:!1,options:[{label:"Lowest to Highest",value:"lowest"},{label:"Highest to Lowest",value:"highest"}],onChange:function(e){return function(e){r((function(t){return Object(n.a)(Object(n.a)({},t),{},{sortSkill:e})}))}(e)},components:{DropdownIndicator:function(){return null},IndicatorSeparator:function(){return null}},value:a.sortSkill}))}},792:function(e,t,a){"use strict";a.r(t);var n=a(14),l=a(2),r=a(11),c=a(0),i=a.n(c),o=a(368),s=a(383),m=a(388),u=a(390),d=a(391),f=a(376),E=a(394),b=a(381),p=a(382),v=a(801),x=a(395),g=a(27),h=a(9),j=a(421),N=Object(c.createContext)(),C=Object(c.createContext)();function O(e){var t=Object(c.useState)({limit:10,page:0,skills:[],sectors:[],exp:"",degree:[],education:[],fee:{min:0,max:0},disableFee:!1,sortExp:{label:"Highest to Lowest",value:"yearOfExperience_DESC"},sortCost:{label:"Lowest to Highest",value:"submittedCost_ASC"},sortSkillsMatch:{label:"Lowest to Highest",value:"lowest"}}),a=Object(r.a)(t,2),n=a[0],l=a[1];return i.a.createElement(C.Provider,{value:l},i.a.createElement(N.Provider,{value:n},e.children))}var y=function(){return[Object(c.useContext)(N),Object(c.useContext)(C)]},k=a(24),S=a(82);var w=function(){var e=y(),t=Object(r.a)(e,2),a=t[0],n=t[1],o=Object(S.a)().data,s=Object(c.useMemo)((function(){return o.map((function(e){return{label:e.name,value:e.id}}))}),[o]);return i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:"font-weight-bold mb-2 text-center"},"Skills Requirements"),i.a.createElement("div",{className:"px-3"},i.a.createElement(k.a,{closeMenuOnSelect:!1,options:s,isClearable:!0,isMulti:!0,onChange:function(e){return function(e){n((function(t){return Object(l.a)(Object(l.a)({},t),{},{skills:null!==e&&void 0!==e?e:[]})}))}(e)},components:{DropdownIndicator:function(){return null},IndicatorSeparator:function(){return null}},value:a.skills})))},M=a(52);var I=function(){var e=y(),t=Object(r.a)(e,2),a=t[0],n=t[1],o=Object(M.a)().data,s=Object(c.useMemo)((function(){return o.map((function(e){return{label:e.name,value:e.id}}))}),[o]);return i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:"font-weight-bold mb-2 text-center"},"Sector"),i.a.createElement("div",{className:"px-3"},i.a.createElement(k.a,{closeMenuOnSelect:!1,options:s,isClearable:!0,isMulti:!0,onChange:function(e){return function(e){n((function(t){return Object(l.a)(Object(l.a)({},t),{},{sectors:null!==e&&void 0!==e?e:[]})}))}(e)},components:{DropdownIndicator:function(){return null},IndicatorSeparator:function(){return null}},value:a.sectors})))},D=a(392),F=a(393),H=a(217);var Y=function(){var e=y(),t=Object(r.a)(e,2),a=t[0],n=t[1],o=Object(c.useCallback)((function(e){var t=e.target,a=t.value,r=t.checked;n((function(e){return Object(l.a)(Object(l.a)({},e),{},{exp:r?a:""})}))}),[n]);return i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:"font-weight-bold mb-2 text-center"},"Years of experience"),i.a.createElement("div",{className:"px-3"},i.a.createElement(D.a,null,i.a.createElement(F.a,{addonType:"prepend"},i.a.createElement(H.a,{className:"bg-transparent border-0 px-0"},i.a.createElement(x.a,{type:"checkbox",id:"<3",value:"<3",checked:"<3"===a.exp,onChange:o}))),i.a.createElement("div",{className:"d-flex bg-transparent p-1 align-items-center"},"Less than 3 years")),i.a.createElement(D.a,null,i.a.createElement(F.a,{addonType:"prepend"},i.a.createElement(H.a,{className:"bg-transparent border-0 px-0"},i.a.createElement(x.a,{type:"checkbox",id:"3-6",value:"3-6",checked:"3-6"===a.exp,onChange:o}))),i.a.createElement("div",{className:"d-flex bg-transparent p-1 align-items-center"},"3-6 years")),i.a.createElement(D.a,null,i.a.createElement(F.a,{addonType:"prepend"},i.a.createElement(H.a,{className:"bg-transparent border-0 px-0"},i.a.createElement(x.a,{type:"checkbox",id:"6-10",value:"6-10",checked:"6-10"===a.exp,onChange:o}))),i.a.createElement("div",{className:"d-flex bg-transparent p-1 align-items-center"},"6-10 years")),i.a.createElement(D.a,null,i.a.createElement(F.a,{addonType:"prepend"},i.a.createElement(H.a,{className:"bg-transparent border-0 px-0"},i.a.createElement(x.a,{type:"checkbox",id:"10-20",value:"10-20",checked:"10-20"===a.exp,onChange:o}))),i.a.createElement("div",{className:"d-flex bg-transparent p-1 align-items-center"},"10-20 years")),i.a.createElement(D.a,null,i.a.createElement(F.a,{addonType:"prepend"},i.a.createElement(H.a,{className:"bg-transparent border-0 px-0"},i.a.createElement(x.a,{type:"checkbox",id:">20",value:">20",checked:">20"===a.exp,onChange:o}))),i.a.createElement("div",{className:"d-flex bg-transparent p-1 align-items-center"},"More than 20 years"))))};var P=function(){var e=y(),t=Object(r.a)(e,2),a=t[0],n=t[1];return i.a.createElement(i.a.Fragment,null,i.a.createElement("small",{className:"font-weight-bold mb-2 text-center"},"Years of experience"),i.a.createElement("div",{className:"px-3"}),i.a.createElement(k.a,{isSearchable:!1,options:[{label:"Lowest to Highest",value:"yearOfExperience_ASC"},{label:"Highest to Lowest",value:"yearOfExperience_DESC"}],onChange:function(e){return function(e){n((function(t){return Object(l.a)(Object(l.a)({},t),{},{sortExp:e})}))}(e)},components:{DropdownIndicator:function(){return null},IndicatorSeparator:function(){return null}},value:a.sortExp}))},A=a(116);var L=function(){var e=y(),t=Object(r.a)(e,2),a=t[0],n=t[1];return i.a.createElement(i.a.Fragment,null,i.a.createElement("small",{className:"font-weight-bold mb-2 text-center"},"Cost"),i.a.createElement("div",{className:"px-3"}),i.a.createElement(k.a,{isSearchable:!1,options:[{label:"Lowest to Highest",value:"submittedCost_ASC"},{label:"Highest to Lowest",value:"submittedCost_DESC"}],onChange:function(e){return function(e){n((function(t){return Object(l.a)(Object(l.a)({},t),{},{sortCost:e})}))}(e)},components:{DropdownIndicator:function(){return null},IndicatorSeparator:function(){return null}},value:a.sortCost}))},_=a(455),z=a(402),R=a(26),T=a(420),V=a(18),G=a(15),q=a(171),J=a(37),B=a.n(J),K=a(17),Q=a(21),U=a(174);var W=function(){var e=y(),t=Object(r.a)(e,2),a=t[0],n=t[1],o=Object(U.a)().data,s=Object(c.useMemo)((function(){return o.map((function(e){return{label:e.name,value:e.id}}))}),[o]);return i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:"font-weight-bold mb-2 text-center"},"Education"),i.a.createElement("div",{className:"px-3"},i.a.createElement(k.a,{closeMenuOnSelect:!1,options:s,isClearable:!0,isMulti:!0,onChange:function(e){return function(e){n((function(t){return Object(l.a)(Object(l.a)({},t),{},{degree:null!==e&&void 0!==e?e:[]})}))}(e)},components:{DropdownIndicator:function(){return null},IndicatorSeparator:function(){return null}},value:a.degree})))},X=a(175);var Z=function(){var e=y(),t=Object(r.a)(e,2),a=t[0],n=t[1],o=Object(X.a)().data,s=Object(c.useMemo)((function(){return o.map((function(e){return{label:e.name,value:e.id}}))}),[o]);return i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:"font-weight-bold mb-2 text-center"},"Education Field"),i.a.createElement("div",{className:"px-3"},i.a.createElement(k.a,{closeMenuOnSelect:!1,options:s,isClearable:!0,isMulti:!0,onChange:function(e){return function(e){n((function(t){return Object(l.a)(Object(l.a)({},t),{},{education:null!==e&&void 0!==e?e:[]})}))}(e)},components:{DropdownIndicator:function(){return null},IndicatorSeparator:function(){return null}},value:a.education})))},$=a(659),ee=a.n($);a(675);var te=function(e){var t=e.min,a=e.max,n=y(),o=Object(r.a)(n,2),s=o[0],m=o[1],u=Object(c.useState)({min:t,max:a}),d=Object(r.a)(u,2),f=d[0],E=d[1];return Object(c.useEffect)((function(){E({min:t,max:a})}),[E,t,a]),i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:"font-weight-bold mb-4 text-center"},"Proposed Service Fees"),i.a.createElement("div",{className:"px-3 mb-4"},i.a.createElement(ee.a,{maxValue:a,minValue:t,value:f,onChange:function(e){E(e)},onChangeComplete:function(e){m((function(t){return Object(l.a)(Object(l.a)({},t),{},{fee:e})}))}})),i.a.createElement("div",{className:"px-1 d-flex"},i.a.createElement(x.a,{type:"checkbox",checked:s.disableFee,onChange:function(e){var t=e.target.checked;m((function(e){return Object(l.a)(Object(l.a)({},e),{},{disableFee:t})}))},id:"dueDateCheckbox"})," Remove proposal above estimated contract value"))},ae=(t.default=function(){var e,t,a,n,v,x,N,C=Object(V.g)(),y=Object(V.i)(),k=Object(c.useState)(!1),S=Object(r.a)(k,2),w=S[0],M=S[1],I=Object(q.b)((function(){return"v1/project/".concat(y.params.projectId,"/selection")})),D=I.data,F=I.error,H=I.mutate,Y=!D||F,P=Object(c.useMemo)((function(){var e,t;return null!==(e=null===D||void 0===D||null===(t=D.data)||void 0===t?void 0:t.data)&&void 0!==e?e:[]}),[D]),A=Object(g.a)({initialValues:{professionalIds:null===w||void 0===w?void 0:w.id},validationSchema:function(){return h.d().shape({cost:h.c().min(1,"Min value 1.").label("Duration")})},onSubmit:function(e,t){var a=t.setSubmitting;t.setErrors;a(!0),K.a.post("v1/project/".concat(y.params.projectId,"/submit"),{professionalIds:[e.professionalIds]}).then((function(){Q.a.success("Successfully submitted"),H()})).catch((function(){Q.a.error("Failed to submit")})).finally((function(){a(!1),M(!1)}))}}),L=A.setValues,_=A.handleSubmit,R=A.isSubmitting;return Y?(F&&C.push("/"),i.a.createElement("div",{style:{position:"absolute",top:0,right:0,bottom:0,left:0,display:"flex",justifyContent:"center",alignItems:"center"}},i.a.createElement(o.a,{style:{width:48,height:48}}))):i.a.createElement(O,null,i.a.createElement(s.a,null,i.a.createElement(m.a,{xs:"12",md:"6"},i.a.createElement(u.a,{className:"shadow-sm"},i.a.createElement(d.a,null,i.a.createElement(s.a,null,i.a.createElement(m.a,{xs:"12",className:"d-flex justify-content-between mb-3"},i.a.createElement("div",{className:"font-xl font-weight-bold"},P.name)),i.a.createElement(m.a,{xs:"7"},i.a.createElement("div",null,i.a.createElement("span",{className:"text-muted"},"Completion Date")," ",B()(P.completeDate).format("DD MMMM YYYY")),i.a.createElement("div",null,i.a.createElement("span",{className:"text-muted"},"Closing Date")," ",B()(P.closingDate).format("DD MMMM YYYY")),i.a.createElement("div",null,i.a.createElement("span",{className:"text-muted"},"Sector")," ",P.sector),i.a.createElement("div",null,i.a.createElement("span",{className:"text-muted"},"Duration")," ",P.duration," hours"),i.a.createElement("div",null,i.a.createElement("span",{className:"text-muted"},"Years of experience")," ",P.minYearExp," Years")),i.a.createElement(m.a,{xs:"5"},null===P||void 0===P||null===(e=P.projectRequirementSkill)||void 0===e?void 0:e.map((function(e,t){return i.a.createElement(f.a,{key:t,color:j.a[t],className:"w-100 text-uppercase font-sm my-1 text-light"},e.name)}))))))),i.a.createElement(m.a,{xs:"12",md:"6"},i.a.createElement(u.a,{className:"shadow-sm"},i.a.createElement(d.a,null,i.a.createElement(s.a,null,i.a.createElement(m.a,{xs:"12"},i.a.createElement("div",{className:"font-xl font-weight-bold"},"Statistics")),i.a.createElement(m.a,{xs:"12",className:"d-flex my-1 justify-content-center"},i.a.createElement(s.a,{className:"text-center"},i.a.createElement(m.a,{xs:"12",md:"4"},i.a.createElement("div",{className:"d-flex justify-content-center",style:{fontSize:"40pt"}},null!==(t=P.numberOfAplicants)&&void 0!==t?t:0),i.a.createElement("p",{style:{whiteSpace:"nowrap"}},"Number of applicant")),i.a.createElement(m.a,{xs:"12",md:"4"},i.a.createElement("div",{className:"d-flex justify-content-center",style:{fontSize:"40pt"}},Object(z.a)(null!==(a=null===P||void 0===P?void 0:P.averageSubmittedCost)&&void 0!==a?a:0)),i.a.createElement("p",{style:{whiteSpace:"nowrap"}},"Average Cost")),i.a.createElement(m.a,{xs:"12",md:"4"},i.a.createElement("div",{className:"d-flex justify-content-center",style:{fontSize:"40pt"}},null!==(n=null===P||void 0===P||null===(v=P.averageSkillMatch)||void 0===v?void 0:v.toFixed(2))&&void 0!==n?n:0,"%"),i.a.createElement("p",{style:{whiteSpace:"nowrap"}},"Avarage Skills Match")))))))),i.a.createElement(m.a,{xs:"12"},i.a.createElement(ae,{onClickAward:function(e){M(e),L((function(t){return Object(l.a)(Object(l.a)({},t),{},{professionalIds:e.idProfessional})}))},project:P})),i.a.createElement(E.a,{isOpen:w,centered:!0,toggle:function(){return M(!w)}},i.a.createElement(b.a,{className:"p-5"},i.a.createElement(s.a,null,i.a.createElement(m.a,{xs:"12",className:"mb-5"},i.a.createElement("div",{className:"mb-2"},i.a.createElement("div",{className:"text-muted"},"Sector"),i.a.createElement("div",null,null===w||void 0===w||null===(x=w.sectors)||void 0===x?void 0:x.map((function(e,t){return"".concat(e.name).concat(w.sectors.length===t+1?"":","," ")})))),i.a.createElement("div",{className:"mb-2"},i.a.createElement("div",{className:"text-muted"},"Duration"),i.a.createElement("div",null,P.duration," Hours")),i.a.createElement("div",{className:"mb-2"},i.a.createElement("div",{className:"text-muted"},"Completion Date"),i.a.createElement("div",null,B()(P.completeDate).format("DD MMMM YYYY"))),i.a.createElement("div",{className:"mb-2"},i.a.createElement("div",{className:"text-muted"},"Submited Cost"),i.a.createElement("div",null,"IDR ",Object(z.b)(null!==(N=w.submittedCost)&&void 0!==N?N:0)))),i.a.createElement(m.a,{xs:"12",className:"d-flex justify-content-end"},i.a.createElement(p.a,{color:"secondary",className:"mr-2",onClick:function(){return M(!w)}},"Cancel"),i.a.createElement(p.a,{color:"primary",disabled:R,onClick:_},R?i.a.createElement(i.a.Fragment,null,i.a.createElement(o.a,{color:"light",size:"sm"})," Loading..."):"Apply")))))))},function(e){var t,a,E,b=e.onClickAward,g=e.project,h=Object(V.i)(),N=y(),C=Object(r.a)(N,2),O=C[0],k=C[1],S=Object(c.useState)([]),M=Object(r.a)(S,2),D=M[0],F=M[1],H=Object(q.b)((function(){return"v1/professional?"+(O.limit?"limit=".concat(O.limit):"")+(O.project?"&projectId=".concat(O.project.value):"")+(O.exp?"&yearOfExperience=".concat(O.exp):"")+(O.skills.length>0?"&skillIds=".concat(O.skills.map((function(e){return e.value})).toString()):"")+(O.sectors.length>0?"&sectorIds=".concat(O.sectors.map((function(e){return e.value})).toString()):"")+(O.degree.length>0?"&educationIds=".concat(O.degree.map((function(e){return e.value})).toString()):"")+(O.education.length>0?"&educationFieldIds=".concat(O.education.map((function(e){return e.value})).toString()):"")+(O.fee.min?"&minSubmittedCost=".concat(O.fee.min):"&minSubmittedCost=".concat(g.minimumContractValue))+(O.fee.max&&!O.disableFee?"&maxSubmittedCost=".concat(O.fee.max):"&maxSubmittedCost=".concat(g.estimatedContractValue))+"&sort=".concat(O.sortExp.value,",").concat(O.sortCost.value)+"&page=".concat(O.page+1,"&projectId=").concat(h.params.projectId,"&fromSelection=true")}),{refreshInterval:18e5}),R=H.data,J=H.error,B=!R||J,K=Object(c.useMemo)((function(){var e,t;return null!==(e=null===R||void 0===R||null===(t=R.data)||void 0===t?void 0:t.data)&&void 0!==e?e:[]}),[R]),Q=Object(c.useCallback)((function(e){k((function(t){return Object(l.a)(Object(l.a)({},t),{},{pagination:e})}))}),[k]),U=Object(T.a)(null===K||void 0===K||null===(t=K.pageSummary)||void 0===t?void 0:t.total,O.page,null===K||void 0===K||null===(a=K.pageSummary)||void 0===a?void 0:a.totalPages,Q).PaginationComponent,X=Object(c.useCallback)((function(e,t){var a=e.target.checked;F(a?function(e){return[].concat(Object(n.a)(e),[{id:t.id,idProfessional:t.idProfessional,professionalName:t.firstName,skillMatched:t.skillMatched.toFixed(2),submittedCost:t.submittedCost,yearOfExperience:t.yearOfExperience}])}:function(e){return e.filter((function(e){return e.id!==t.id}))})}),[]),$=Object(c.useCallback)((function(e){F((function(t){return t.filter((function(t){return t.id!==e.id}))}))}),[]),ee=Object(c.useCallback)((function(e){F([])}),[]);return i.a.createElement(s.a,{className:"mt-md-3 mt-lg-n2"},i.a.createElement(m.a,{xs:"12",lg:"3"},i.a.createElement(u.a,{className:"shadow-sm"},i.a.createElement(d.a,null,i.a.createElement(s.a,null,i.a.createElement(m.a,{xs:"12",className:"my-2"},i.a.createElement("h5",{className:"font-weight-bold mb-4 text-center"},"FILTER")),i.a.createElement(m.a,{xs:"12",className:"my-2"},i.a.createElement(w,null)),i.a.createElement(m.a,{xs:"12",className:"my-2"},i.a.createElement(I,null)),i.a.createElement(m.a,{xs:"12",className:"my-2"},i.a.createElement(Y,null)),i.a.createElement(m.a,{xs:"12",className:"my-2"},i.a.createElement(W,null)),i.a.createElement(m.a,{xs:"12",className:"my-2"},i.a.createElement(Z,null)),i.a.createElement(m.a,{xs:"12",className:"my-2"},i.a.createElement(te,{min:g.minimumContractValue,max:g.estimatedContractValue})))))),i.a.createElement(m.a,{xs:"12",lg:"9"},D.length>0&&i.a.createElement(ne,{data:D,project:g,onClear:$,onClickAward:b}),i.a.createElement(s.a,{className:"mb-4"},i.a.createElement(m.a,{xs:"3"},i.a.createElement(P,null)),i.a.createElement(m.a,{xs:"3"},i.a.createElement(L,null)),i.a.createElement(m.a,{xs:"3"},i.a.createElement(_.a,null)),i.a.createElement(m.a,{xs:"3",className:"d-flex align-items-center"},D.length>0&&i.a.createElement(p.a,{color:"danger",onClick:ee},"Remove all ticked"))),i.a.createElement(s.a,{className:"mb-2"},B?i.a.createElement("div",{style:{position:"absolute",top:0,right:0,bottom:0,left:0,display:"flex",justifyContent:"center",alignItems:"center"}},i.a.createElement(o.a,{style:{width:48,height:48}})):null===K||void 0===K||null===(E=K.records)||void 0===E?void 0:E.map((function(e,t){return i.a.createElement(m.a,{xs:"12",key:t},i.a.createElement(u.a,{className:"shadow-sm"},i.a.createElement(d.a,null,i.a.createElement(s.a,null,i.a.createElement(m.a,{xs:"7"},i.a.createElement(s.a,null,i.a.createElement(m.a,{xs:"4",className:"d-flex justify-content-center align-items-center"},i.a.createElement(A.a,{text:e.firstName,size:90})),i.a.createElement(m.a,{xs:"8"},i.a.createElement(s.a,null,i.a.createElement(m.a,{xs:"12"},i.a.createElement(G.b,{to:"/professional/".concat(e.id)},i.a.createElement("h4",null,e.firstName," ",e.lastName))),i.a.createElement(m.a,{xs:"12"},i.a.createElement("p",null,e.degree," in ",e.educationField)),i.a.createElement(m.a,{xs:"12"},i.a.createElement("p",null,e.yearOfExperience," year experience")),i.a.createElement(m.a,{xs:"12"},i.a.createElement("span",{className:"text-muted"},"Sector"),i.a.createElement("br",null),e.sectors.map((function(t,a){return"".concat(t.name).concat(e.sectors.length===a+1?"":","," ")}))))))),i.a.createElement(m.a,{xs:"5"},e.skills.map((function(e,t){return i.a.createElement(f.a,{key:t,color:j.a[t],className:"w-100 text-uppercase mx-1 font-sm text-light"},e.name)}))))),i.a.createElement(v.a,{style:{backgroundColor:"#fde2c1"}},i.a.createElement(s.a,null,i.a.createElement(m.a,{xs:"4",className:"d-flex align-items-center font-weight-bold"},"IDR ",Object(z.b)(e.submittedCost)),i.a.createElement(m.a,{xs:"4",className:"d-flex align-items-center font-weight-bold"},"Skills Match ",e.skillMatched.toFixed(2),"%"),i.a.createElement(m.a,{xs:"4",className:"d-flex justify-content-end"},i.a.createElement("div",{className:"d-flex align-items-center"},i.a.createElement(x.a,{type:"checkbox",id:e.id,value:e.id,checked:D.find((function(t){return t.id===e.id})),disabled:3===D.length&&!D.find((function(t){return t.id===e.id})),onChange:function(t){return X(t,e)}}),i.a.createElement("div",{className:"d-flex bg-transparent p-1 align-items-center"},"Compare")),i.a.createElement(p.a,{color:"primary",size:"sm",className:"ml-2",disabled:["tnc_review","on_going","close"].includes(g.status),onClick:function(){return b(e)}},"Award"))))))})),i.a.createElement(m.a,{xs:"12"},i.a.createElement(U,null)))))}),ne=function(e){var t=e.data,a=e.project,n=e.onClear,l=e.onClickAward;return i.a.createElement(s.a,{className:"mb-4"},i.a.createElement(m.a,{xs:"12"},i.a.createElement(s.a,{className:"text-center px-3"},i.a.createElement(m.a,{xs:"3",className:"p-0"},i.a.createElement("div",{className:"border font-weight-bold",style:{backgroundColor:"#fde2c1",lineHeight:"25pt"}},"Comparing"),i.a.createElement("div",{style:{lineHeight:"25pt"},className:"border font-weight-bold"},"Skill Match"),i.a.createElement("div",{style:{lineHeight:"25pt"},className:"border font-weight-bold"},"Cost"),i.a.createElement("div",{style:{lineHeight:"25pt"},className:"border font-weight-bold"},"Years of experience"),i.a.createElement("div",{style:{lineHeight:"25pt"},className:"border font-weight-bold"},"Action")),t.map((function(e,t){return i.a.createElement(m.a,{xs:"3",className:"p-0",key:t},i.a.createElement("div",{className:"border font-weight-bold position-relative",style:{backgroundColor:"#fde2c1",lineHeight:"25pt"}},e.professionalName,i.a.createElement(p.a,{size:"sm",className:"position-absolute",color:"danger",style:{top:"2px",right:"4px"},onClick:function(){return n(e)}},i.a.createElement(R.a,{icon:"times",size:"sm"}))),i.a.createElement("div",{style:{lineHeight:"25pt"},className:"border"},e.skillMatched,"%"),i.a.createElement("div",{style:{lineHeight:"25pt"},className:"border"},"IDR ",Object(z.b)(e.submittedCost)),i.a.createElement("div",{style:{lineHeight:"25pt"},className:"border"},e.yearOfExperience),i.a.createElement("div",{style:{lineHeight:"25pt"},className:"border"},i.a.createElement(p.a,{color:"primary",size:"sm",disabled:["tnc_review","on_going","close"].includes(a.status),className:"ml-2",onClick:function(){return l(e)}},"Award")))})))))}}}]);
//# sourceMappingURL=12.6d2f7275.chunk.js.map