(this.webpackJsonppplatform=this.webpackJsonppplatform||[]).push([[11],{402:function(e,t,a){"use strict";a.d(t,"b",(function(){return l})),a.d(t,"a",(function(){return c}));var n=a(409),r=a.n(n);function l(e){for(var t="",a=null===e||void 0===e?void 0:e.toString().split("").reverse().join(""),n=0;n<a.length;n++)n%3===0&&(t+=a.substr(n,3)+".");return t.split("",t.length-1).reverse().join("")}function c(e){for(var t=[{divider:1e18,suffix:"E"},{divider:1e15,suffix:"P"},{divider:1e12,suffix:"T"},{divider:1e9,suffix:"G"},{divider:1e6,suffix:"M"},{divider:1e3,suffix:"k"}],a=0;a<t.length;a++)if(e>=t[a].divider)return(e/t[a].divider).toString()+t[a].suffix;return e.toString()}r.a.register("locale","indonesia",{delimiters:{thousands:".",decimal:","},abbreviations:{thousand:"rb",million:"jt",billion:"M",trillion:"T"},ordinal:function(e){return 1===e?"er":"\xe8me"},currency:{symbol:"IDR"}}),r.a.locale("indonesia")},421:function(e,t,a){"use strict";a.d(t,"a",(function(){return i}));var n=a(11),r=a(0),l=a.n(r),c=a(635),o=a(636),s=a(637);function i(e,t,a,c){var o=Object(r.useState)(t),s=Object(n.a)(o,2),i=s[0],m=s[1];Object(r.useEffect)((function(){return c(i)}),[i,c]);var d=Object(r.useCallback)((function(){m((function(e){return e===a-1?e:e+1}))}),[a]),b=Object(r.useCallback)((function(){m((function(e){return 0===e?e:e-1}))}),[]),p=Object(r.useCallback)((function(e){m(e)}),[]),E=Object(r.useMemo)((function(){return function(e){return l.a.createElement(u,{handleFirst:function(){return p(0)},handleLast:function(){return p(a-1)},handleNext:d,handlePrev:b,handleGoto:p,currentPage:i,count:a})}}),[p,d,b,i,a]);return{currentPage:i,next:d,prev:b,goto:p,totalPage:a,PaginationComponent:E}}var u=function(e){var t=e.handleFirst,a=e.handleLast,n=e.handleNext,r=e.handlePrev,i=e.handleGoto,u=e.count,m=e.currentPage;return l.a.createElement(c.a,{className:"pagination-hub d-flex justify-content-center"},t&&l.a.createElement(o.a,{disabled:!(m-1>=0)},l.a.createElement(s.a,{first:!0,onClick:t,disabled:0===m})),r&&l.a.createElement(o.a,{disabled:!(m-1>=0)},l.a.createElement(s.a,{previous:!0,onClick:r,disabled:0===m})),m-3>=0&&l.a.createElement(o.a,{disabled:!0},l.a.createElement(s.a,{className:"text-dark"},"...")),m-2>=0&&l.a.createElement(o.a,{className:"d-none d-md-block"},l.a.createElement(s.a,{onClick:function(){return i(m-2)}},m-1)),m-1>=0&&l.a.createElement(o.a,null,l.a.createElement(s.a,{onClick:function(){return i(m-1)}},m)),l.a.createElement(o.a,{active:!0,disabled:!0},l.a.createElement(s.a,{onClick:function(){return i(m)}},m+1)),m+1<u&&l.a.createElement(o.a,null,l.a.createElement(s.a,{onClick:function(){return i(m+1)}},m+2)),m+2<u&&l.a.createElement(o.a,{className:"d-none d-md-block"},l.a.createElement(s.a,{onClick:function(){return i(m+2)}},m+3)),m+3<u&&l.a.createElement(o.a,{disabled:!0},l.a.createElement(s.a,{className:"text-dark"},"...")),l.a.createElement(o.a,{disabled:!(m+1<u)},l.a.createElement(s.a,{next:!0,onClick:n,disabled:m===u-1})),l.a.createElement(o.a,{disabled:!(m+1<u)},l.a.createElement(s.a,{last:!0,onClick:a,disabled:m===u-1})))}},422:function(e,t,a){"use strict";t.a=["success","danger","warning","secondary","info","primary","dark"]},456:function(e,t,a){"use strict";var n=a(2),r=a(11),l=a(0),c=a.n(l),o=a(24),s=a(403);t.a=function(){var e=Object(s.b)(),t=Object(r.a)(e,2),a=t[0],l=t[1];return c.a.createElement(c.a.Fragment,null,c.a.createElement("small",{className:"font-weight-bold mb-2 text-center"},"Skill Match"),c.a.createElement("div",{className:"px-3"}),c.a.createElement(o.a,{isSearchable:!1,options:[{label:"Highest skill to Lowest skill",value:"matchedSkills_DESC"},{label:"Lowest skill to Highest skill",value:"matchedSkills_ASC"}],onChange:function(e){return function(e){l((function(t){return Object(n.a)(Object(n.a)({},t),{},{sortClosing:null,sortDuration:null,sortBudgetary:null,sortSkill:e})}))}(e)},components:{DropdownIndicator:function(){return null},IndicatorSeparator:function(){return null}},value:a.sortSkill}))}},485:function(e,t,a){"use strict";var n=a(4),r=a(83),l=a(8),c=a(0),o=a.n(c),s=a(1),i=a.n(s),u=a(6),m=a.n(u),d=a(3);function b(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function p(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?b(Object(a),!0).forEach((function(t){Object(r.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):b(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var E={children:i.a.node,bar:i.a.bool,multi:i.a.bool,tag:d.q,value:i.a.oneOfType([i.a.string,i.a.number]),min:i.a.oneOfType([i.a.string,i.a.number]),max:i.a.oneOfType([i.a.string,i.a.number]),animated:i.a.bool,striped:i.a.bool,color:i.a.string,className:i.a.string,barClassName:i.a.string,cssModule:i.a.object,style:i.a.object,barStyle:i.a.object,barAriaValueText:i.a.string,barAriaLabelledBy:i.a.string},f=function(e){var t=e.children,a=e.className,r=e.barClassName,c=e.cssModule,s=e.value,i=e.min,u=e.max,b=e.animated,E=e.striped,f=e.color,g=e.bar,v=e.multi,h=e.tag,x=e.style,O=e.barStyle,j=e.barAriaValueText,y=e.barAriaLabelledBy,k=Object(l.a)(e,["children","className","barClassName","cssModule","value","min","max","animated","striped","color","bar","multi","tag","style","barStyle","barAriaValueText","barAriaLabelledBy"]),N=Object(d.s)(s)/Object(d.s)(u)*100,C=Object(d.m)(m()(a,"progress"),c),S={className:Object(d.m)(m()("progress-bar",g&&a||r,b?"progress-bar-animated":null,f?"bg-"+f:null,E||b?"progress-bar-striped":null),c),style:p(p(p({},g?x:{}),O),{},{width:N+"%"}),role:"progressbar","aria-valuenow":s,"aria-valuemin":i,"aria-valuemax":u,"aria-valuetext":j,"aria-labelledby":y,children:t};return g?o.a.createElement(h,Object(n.a)({},k,S)):o.a.createElement(h,Object(n.a)({},k,{style:x,className:C}),v?t:o.a.createElement("div",S))};f.propTypes=E,f.defaultProps={tag:"div",value:0,min:0,max:100,style:{},barStyle:{}},t.a=f},794:function(e,t,a){"use strict";a.r(t);var n=a(2),r=a(11),l=a(0),c=a.n(l),o=a(383),s=a(388),i=a(390),u=a(391),m=a(368),d=a(485),b=a(376),p=a(37),E=a.n(p),f=a(403),g=a(392),v=a(393),h=a(217),x=a(395);var O=function(){var e=Object(f.b)(),t=Object(r.a)(e,2),a=t[0],o=t[1],s=Object(l.useCallback)((function(e){var t=e.target,a=t.value,r=t.checked;o((function(e){return Object(n.a)(Object(n.a)({},e),{},{date:r?a:""})}))}),[o]);return c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:"font-weight-bold mb-2 text-center"},"Completion Date"),c.a.createElement("div",{className:"px-3"},c.a.createElement(g.a,null,c.a.createElement(v.a,{addonType:"prepend"},c.a.createElement(h.a,{className:"bg-transparent border-0 px-0"},c.a.createElement(x.a,{type:"checkbox",id:"this-week",value:"this-week",checked:"this-week"===a.date,onChange:s}))),c.a.createElement("div",{className:"d-flex bg-transparent p-1 align-items-center"},"This Week")),c.a.createElement(g.a,null,c.a.createElement(v.a,{addonType:"prepend"},c.a.createElement(h.a,{className:"bg-transparent border-0 px-0"},c.a.createElement(x.a,{type:"checkbox",id:"next-week",value:"next-week",checked:"next-week"===a.date,onChange:s}))),c.a.createElement("div",{className:"d-flex bg-transparent p-1 align-items-center"},"Next Week")),c.a.createElement(g.a,null,c.a.createElement(v.a,{addonType:"prepend"},c.a.createElement(h.a,{className:"bg-transparent border-0 px-0"},c.a.createElement(x.a,{type:"checkbox",id:"this-month",value:"this-month",checked:"this-month"===a.date,onChange:s}))),c.a.createElement("div",{className:"d-flex bg-transparent p-1 align-items-center"},"This month")),c.a.createElement(g.a,null,c.a.createElement(v.a,{addonType:"prepend"},c.a.createElement(h.a,{className:"bg-transparent border-0 px-0"},c.a.createElement(x.a,{type:"checkbox",id:"next-month",value:"next-month",checked:"next-month"===a.date,onChange:s}))),c.a.createElement("div",{className:"d-flex bg-transparent p-1 align-items-center"},"Next month"))))};var j=function(){var e=Object(f.b)(),t=Object(r.a)(e,2),a=t[0],o=t[1],s=Object(l.useCallback)((function(e){var t=e.target,a=t.value,r=t.checked;o((function(e){return Object(n.a)(Object(n.a)({},e),{},{exp:r?a:""})}))}),[o]);return c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:"font-weight-bold mb-2 text-center"},"Years of experience"),c.a.createElement("div",{className:"px-3"},c.a.createElement(g.a,null,c.a.createElement(v.a,{addonType:"prepend"},c.a.createElement(h.a,{className:"bg-transparent border-0 px-0"},c.a.createElement(x.a,{type:"checkbox",id:"<3",value:"<3",checked:"<3"===a.exp,onChange:s}))),c.a.createElement("div",{className:"d-flex bg-transparent p-1 align-items-center"},"Less than 3 years")),c.a.createElement(g.a,null,c.a.createElement(v.a,{addonType:"prepend"},c.a.createElement(h.a,{className:"bg-transparent border-0 px-0"},c.a.createElement(x.a,{type:"checkbox",id:"3-5",value:"3-5",checked:"3-5"===a.exp,onChange:s}))),c.a.createElement("div",{className:"d-flex bg-transparent p-1 align-items-center"},"3-5 years")),c.a.createElement(g.a,null,c.a.createElement(v.a,{addonType:"prepend"},c.a.createElement(h.a,{className:"bg-transparent border-0 px-0"},c.a.createElement(x.a,{type:"checkbox",id:"6-10",value:"6-10",checked:"6-10"===a.exp,onChange:s}))),c.a.createElement("div",{className:"d-flex bg-transparent p-1 align-items-center"},"6-10 years")),c.a.createElement(g.a,null,c.a.createElement(v.a,{addonType:"prepend"},c.a.createElement(h.a,{className:"bg-transparent border-0 px-0"},c.a.createElement(x.a,{type:"checkbox",id:"10-20",value:"10-20",checked:"10-20"===a.exp,onChange:s}))),c.a.createElement("div",{className:"d-flex bg-transparent p-1 align-items-center"},"10-20 years")),c.a.createElement(g.a,null,c.a.createElement(v.a,{addonType:"prepend"},c.a.createElement(h.a,{className:"bg-transparent border-0 px-0"},c.a.createElement(x.a,{type:"checkbox",id:">20",value:">20",checked:">20"===a.exp,onChange:s}))),c.a.createElement("div",{className:"d-flex bg-transparent p-1 align-items-center"},"More than 20 years"))))},y=a(24),k=a(52);var N=function(){var e=Object(f.b)(),t=Object(r.a)(e,2),a=t[0],o=t[1],s=Object(k.a)().data,i=Object(l.useMemo)((function(){return s.map((function(e){return{label:e.name,value:e.id}}))}),[s]);return c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:"font-weight-bold mb-2 text-center"},"Sector"),c.a.createElement("div",{className:"px-3"},c.a.createElement(y.a,{closeMenuOnSelect:!1,options:i,isClearable:!0,isMulti:!0,onChange:function(e){return function(e){o((function(t){return Object(n.a)(Object(n.a)({},t),{},{sectors:null!==e&&void 0!==e?e:[]})}))}(e)},components:{DropdownIndicator:function(){return null},IndicatorSeparator:function(){return null}},value:a.sectors})))},C=a(82);var S=function(){var e=Object(f.b)(),t=Object(r.a)(e,2),a=t[0],o=t[1],s=Object(C.a)().data,i=Object(l.useMemo)((function(){return s.map((function(e){return{label:e.name,value:e.id}}))}),[s]);return c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:"font-weight-bold mb-2 text-center"},"Skills Requirements"),c.a.createElement("div",{className:"px-3"},c.a.createElement(y.a,{closeMenuOnSelect:!1,options:i,isClearable:!0,isMulti:!0,onChange:function(e){return function(e){o((function(t){return Object(n.a)(Object(n.a)({},t),{},{skills:null!==e&&void 0!==e?e:[]})}))}(e)},components:{DropdownIndicator:function(){return null},IndicatorSeparator:function(){return null}},value:a.skills})))};var w=function(){var e=Object(f.b)(),t=Object(r.a)(e,2),a=t[0],l=t[1];return c.a.createElement(c.a.Fragment,null,c.a.createElement("small",{className:"font-weight-bold mb-2 text-center"},"Closing Date"),c.a.createElement("div",{className:"px-3"}),c.a.createElement(y.a,{isSearchable:!1,options:[{label:"Oldest to Newest",value:"closingDate_DESC"},{label:"Newest to Oldest",value:"closingDate_ASC"}],onChange:function(e){return function(e){l((function(t){return Object(n.a)(Object(n.a)({},t),{},{sortSkill:null,sortDuration:null,sortBudgetary:null,sortClosing:e})}))}(e)},components:{DropdownIndicator:function(){return null},IndicatorSeparator:function(){return null}},value:a.sortClosing}))};var D=function(){var e=Object(f.b)(),t=Object(r.a)(e,2),a=t[0],l=t[1];return c.a.createElement(c.a.Fragment,null,c.a.createElement("small",{className:"font-weight-bold mb-2 text-center"},"Meeting Duration"),c.a.createElement("div",{className:"px-3"}),c.a.createElement(y.a,{isSearchable:!1,options:[{label:"Longest to Shortest",value:"duration_DESC"},{label:"Shortest to Longest",value:"duration_ASC"}],onChange:function(e){return function(e){l((function(t){return Object(n.a)(Object(n.a)({},t),{},{sortClosing:null,sortSkill:null,sortBudgetary:null,sortDuration:e})}))}(e)},components:{DropdownIndicator:function(){return null},IndicatorSeparator:function(){return null}},value:a.sortDuration}))};var M=function(){var e=Object(f.b)(),t=Object(r.a)(e,2),a=t[0],l=t[1];return c.a.createElement(c.a.Fragment,null,c.a.createElement("small",{className:"font-weight-bold mb-2 text-center"},"Budgetary"),c.a.createElement("div",{className:"px-3"}),c.a.createElement(y.a,{isSearchable:!1,options:[{label:"Highest to Lowest",value:"budget_DESC"},{label:"Lowest to Highest",value:"budget_ASC"}],onChange:function(e){return function(e){l((function(t){return Object(n.a)(Object(n.a)({},t),{},{sortClosing:null,sortDuration:null,sortSkill:null,sortBudgetary:e})}))}(e)},components:{DropdownIndicator:function(){return null},IndicatorSeparator:function(){return null}},value:a.sortBudgetary}))},I=a(456),T=a(402),P=a(16),L=a(171),F=a(421),B=a(422);t.default=function(){var e,t,a,p,g=Object(f.b)(),v=Object(r.a)(g,2),h=v[0],x=v[1],y=Object(L.b)((function(){return"v1/project?"+(h.limit?"limit=".concat(h.limit):"")+(h.date?"&completeDate=".concat(h.date):"")+(h.exp?"&yearOfExperience=".concat(h.exp):"")+(h.skills.length>0?"&skillIds=".concat(h.skills.map((function(e){return e.value})).toString()):"")+(h.sectors.length>0?"&sectorIds=".concat(h.sectors.map((function(e){return e.value})).toString()):"")+"&sort=".concat(h.sortSkill?h.sortSkill.value:"").concat(h.sortDuration?h.sortDuration.value:"").concat(h.sortBudgetary?h.sortBudgetary.value:"").concat(h.sortClosing?h.sortClosing.value:"")+"&page=".concat(h.page+1)}),{refreshInterval:18e5}),k=y.data,C=y.error,A=!k||C,_=Object(l.useMemo)((function(){var e,t;return null!==(e=null===k||void 0===k||null===(t=k.data)||void 0===t?void 0:t.data)&&void 0!==e?e:[]}),[k]),V=Object(l.useCallback)((function(e){x((function(t){return Object(n.a)(Object(n.a)({},t),{},{page:e})}))}),[x]),R=Object(F.a)(null===_||void 0===_||null===(e=_.pageSummary)||void 0===e?void 0:e.total,h.page,null===_||void 0===_||null===(t=_.pageSummary)||void 0===t?void 0:t.totalPages,V).PaginationComponent;return c.a.createElement(o.a,{className:"mt-md-3 mt-lg-n2"},c.a.createElement(s.a,{xs:"12",lg:"3"},c.a.createElement(i.a,{className:"shadow-sm"},c.a.createElement(u.a,null,c.a.createElement(o.a,null,c.a.createElement(s.a,{xs:"12",className:"my-2"},c.a.createElement("h5",{className:"font-weight-bold mb-4 text-center"},"FILTER")),c.a.createElement(s.a,{xs:"12",className:"my-2"},c.a.createElement(N,null)),c.a.createElement(s.a,{xs:"12",className:"my-2"},c.a.createElement(O,null)),c.a.createElement(s.a,{xs:"12",className:"my-2"},c.a.createElement(j,null)),c.a.createElement(s.a,{xs:"12",className:"my-2"},c.a.createElement(S,null)))))),c.a.createElement(s.a,{xs:"12",lg:"9"},c.a.createElement(o.a,{className:"mb-4"},c.a.createElement(s.a,{xs:"6",md:"3"},c.a.createElement(w,null)),c.a.createElement(s.a,{xs:"6",md:"3"},c.a.createElement(D,null)),c.a.createElement(s.a,{xs:"6",md:"3"},c.a.createElement(M,null)),c.a.createElement(s.a,{xs:"6",md:"3"},c.a.createElement(I.a,null))),c.a.createElement(o.a,{className:"mb-2"},c.a.createElement(s.a,{xs:"12"},A?c.a.createElement("div",{style:{position:"absolute",top:0,right:0,bottom:0,left:0,display:"flex",justifyContent:"center",alignItems:"center"}},c.a.createElement(m.a,{style:{width:48,height:48}})):(null===_||void 0===_?void 0:_.records.length)>0?null===_||void 0===_||null===(a=_.records)||void 0===a?void 0:a.map((function(e,t){var a,n;return c.a.createElement(i.a,{key:t,className:"shadow-sm"},c.a.createElement(u.a,null,c.a.createElement(o.a,null,c.a.createElement(s.a,{xs:"12",lg:"9"},c.a.createElement(o.a,null,c.a.createElement(s.a,{xs:"12"},c.a.createElement(P.b,{to:"/project/".concat(e.id),className:"text-dark"},c.a.createElement("h4",null,e.name))),c.a.createElement(s.a,{xs:"12",className:"d-flex justify-content-between"},c.a.createElement(P.b,{to:"/client/".concat(e.projectOwnerId),className:"text-dark"},c.a.createElement("p",null,e.projectOwnerName))),c.a.createElement(s.a,{xs:"6"},c.a.createElement("span",{className:"text-muted"},"Completion Date"),c.a.createElement("p",null," ",E()(e.completeDate).format("DD MMMM YYYY"))),c.a.createElement(s.a,{xs:"6"},c.a.createElement("span",{className:"text-muted"},"Meeting Duration"),c.a.createElement("p",null,e.duration," hours")),c.a.createElement(s.a,{xs:"6"},c.a.createElement("span",{className:"text-muted"},"Sector"),c.a.createElement("p",null,e.sectors.map((function(t,a){return"".concat(t.sector.name).concat(e.sectors.length===a+1?"":","," ")})))),c.a.createElement(s.a,{xs:"6"},c.a.createElement("span",{className:"text-muted"},"Estimated Contract Value"),c.a.createElement("p",null,Number.isInteger(null===e||void 0===e?void 0:e.estimatedContractValue)?"IDR ".concat(Object(T.b)(null!==(a=null===e||void 0===e?void 0:e.estimatedContractValue)&&void 0!==a?a:0)):null===e||void 0===e?void 0:e.estimatedContractValue)),c.a.createElement(s.a,{xs:"12"},c.a.createElement(d.a,{striped:!0,className:"position-relative",value:e.skillMatched,style:{height:"2rem"}},c.a.createElement("div",{className:"position-absolute w-100 font-sm font-weight-bold text-dark text-center"}," ",null===e||void 0===e||null===(n=e.skillMatched)||void 0===n?void 0:n.toFixed(2),"% skills matched"))))),c.a.createElement(s.a,{xs:"12",lg:"3",className:"mt-3 mt-lg-0"},e.projectRequirementSkill.map((function(e,t){return c.a.createElement(b.a,{key:t,color:B.a[t],className:"w-100 text-uppercase font-sm my-1 text-light",style:{whiteSpace:"unset"}},e.name)}))))))})):c.a.createElement("div",{className:"text-center text-muted p-5 mt-5"},"No Projects")),c.a.createElement(s.a,{xs:"12"},(null===_||void 0===_||null===(p=_.records)||void 0===p?void 0:p.length)>0&&c.a.createElement(R,null)))))}}}]);
//# sourceMappingURL=11.9045fc65.chunk.js.map