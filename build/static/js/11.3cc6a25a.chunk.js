(this.webpackJsonppplatform=this.webpackJsonppplatform||[]).push([[11],{406:function(e,a,t){"use strict";t.d(a,"b",(function(){return l})),t.d(a,"a",(function(){return c}));var n=t(410),r=t.n(n);function l(e){for(var a="",t=e.toString().split("").reverse().join(""),n=0;n<t.length;n++)n%3===0&&(a+=t.substr(n,3)+".");return a.split("",a.length-1).reverse().join("")}function c(e){for(var a=[{divider:1e18,suffix:"E"},{divider:1e15,suffix:"P"},{divider:1e12,suffix:"T"},{divider:1e9,suffix:"G"},{divider:1e6,suffix:"M"},{divider:1e3,suffix:"k"}],t=0;t<a.length;t++)if(e>=a[t].divider)return(e/a[t].divider).toString()+a[t].suffix;return e.toString()}r.a.register("locale","indonesia",{delimiters:{thousands:".",decimal:","},abbreviations:{thousand:"rb",million:"jt",billion:"M",trillion:"T"},ordinal:function(e){return 1===e?"er":"\xe8me"},currency:{symbol:"IDR"}}),r.a.locale("indonesia")},421:function(e,a,t){"use strict";t.d(a,"a",(function(){return i}));var n=t(11),r=t(0),l=t.n(r),c=t(635),o=t(636),s=t(637);function i(e,a,t,c){var o=Object(r.useState)(a),s=Object(n.a)(o,2),i=s[0],u=s[1];Object(r.useEffect)((function(){return c(i)}),[i,c]);var d=Object(r.useCallback)((function(){u((function(e){return e===t-1?e:e+1}))}),[t]),b=Object(r.useCallback)((function(){u((function(e){return 0===e?e:e-1}))}),[]),p=Object(r.useCallback)((function(e){u(e)}),[]),E=Object(r.useMemo)((function(){return function(e){return l.a.createElement(m,{handleFirst:function(){return p(0)},handleLast:function(){return p(t-1)},handleNext:d,handlePrev:b,handleGoto:p,currentPage:i,count:t})}}),[p,d,b,i,t]);return{currentPage:i,next:d,prev:b,goto:p,totalPage:t,PaginationComponent:E}}var m=function(e){var a=e.handleFirst,t=e.handleLast,n=e.handleNext,r=e.handlePrev,i=e.handleGoto,m=e.count,u=e.currentPage;return l.a.createElement(c.a,{className:"pagination-hub d-flex justify-content-center"},a&&l.a.createElement(o.a,{disabled:!(u-1>=0)},l.a.createElement(s.a,{first:!0,onClick:a,disabled:0===u})),r&&l.a.createElement(o.a,{disabled:!(u-1>=0)},l.a.createElement(s.a,{previous:!0,onClick:r,disabled:0===u})),u-3>=0&&l.a.createElement(o.a,{disabled:!0},l.a.createElement(s.a,{className:"text-dark"},"...")),u-2>=0&&l.a.createElement(o.a,{className:"d-none d-md-block"},l.a.createElement(s.a,{onClick:function(){return i(u-2)}},u-1)),u-1>=0&&l.a.createElement(o.a,null,l.a.createElement(s.a,{onClick:function(){return i(u-1)}},u)),l.a.createElement(o.a,{active:!0,disabled:!0},l.a.createElement(s.a,{onClick:function(){return i(u)}},u+1)),u+1<m&&l.a.createElement(o.a,null,l.a.createElement(s.a,{onClick:function(){return i(u+1)}},u+2)),u+2<m&&l.a.createElement(o.a,{className:"d-none d-md-block"},l.a.createElement(s.a,{onClick:function(){return i(u+2)}},u+3)),u+3<m&&l.a.createElement(o.a,{disabled:!0},l.a.createElement(s.a,{className:"text-dark"},"...")),l.a.createElement(o.a,{disabled:!(u+1<m)},l.a.createElement(s.a,{next:!0,onClick:n,disabled:u===m-1})),l.a.createElement(o.a,{disabled:!(u+1<m)},l.a.createElement(s.a,{last:!0,onClick:t,disabled:u===m-1})))}},422:function(e,a,t){"use strict";a.a=["success","danger","warning","secondary","info","primary","dark"]},456:function(e,a,t){"use strict";var n=t(2),r=t(11),l=t(0),c=t.n(l),o=t(24),s=t(403);a.a=function(){var e=Object(s.b)(),a=Object(r.a)(e,2),t=a[0],l=a[1];return c.a.createElement(c.a.Fragment,null,c.a.createElement("small",{className:"font-weight-bold mb-2 text-center"},"Skill Match"),c.a.createElement("div",{className:"px-3"}),c.a.createElement(o.a,{isSearchable:!1,options:[{label:"Lowest to Highest",value:"lowest"},{label:"Highest to Lowest",value:"highest"}],onChange:function(e){return function(e){l((function(a){return Object(n.a)(Object(n.a)({},a),{},{sortSkill:e})}))}(e)},components:{DropdownIndicator:function(){return null},IndicatorSeparator:function(){return null}},value:t.sortSkill}))}},485:function(e,a,t){"use strict";var n=t(6),r=t(81),l=t(9),c=t(0),o=t.n(c),s=t(1),i=t.n(s),m=t(5),u=t.n(m),d=t(3);function b(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);a&&(n=n.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,n)}return t}function p(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?b(Object(t),!0).forEach((function(a){Object(r.a)(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):b(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}var E={children:i.a.node,bar:i.a.bool,multi:i.a.bool,tag:d.q,value:i.a.oneOfType([i.a.string,i.a.number]),min:i.a.oneOfType([i.a.string,i.a.number]),max:i.a.oneOfType([i.a.string,i.a.number]),animated:i.a.bool,striped:i.a.bool,color:i.a.string,className:i.a.string,barClassName:i.a.string,cssModule:i.a.object,style:i.a.object,barStyle:i.a.object,barAriaValueText:i.a.string,barAriaLabelledBy:i.a.string},f=function(e){var a=e.children,t=e.className,r=e.barClassName,c=e.cssModule,s=e.value,i=e.min,m=e.max,b=e.animated,E=e.striped,f=e.color,v=e.bar,g=e.multi,h=e.tag,x=e.style,O=e.barStyle,j=e.barAriaValueText,y=e.barAriaLabelledBy,N=Object(l.a)(e,["children","className","barClassName","cssModule","value","min","max","animated","striped","color","bar","multi","tag","style","barStyle","barAriaValueText","barAriaLabelledBy"]),k=Object(d.s)(s)/Object(d.s)(m)*100,w=Object(d.m)(u()(t,"progress"),c),C={className:Object(d.m)(u()("progress-bar",v&&t||r,b?"progress-bar-animated":null,f?"bg-"+f:null,E||b?"progress-bar-striped":null),c),style:p(p(p({},v?x:{}),O),{},{width:k+"%"}),role:"progressbar","aria-valuenow":s,"aria-valuemin":i,"aria-valuemax":m,"aria-valuetext":j,"aria-labelledby":y,children:a};return v?o.a.createElement(h,Object(n.a)({},N,C)):o.a.createElement(h,Object(n.a)({},N,{style:x,className:w}),g?a:o.a.createElement("div",C))};f.propTypes=E,f.defaultProps={tag:"div",value:0,min:0,max:100,style:{},barStyle:{}},a.a=f},794:function(e,a,t){"use strict";t.r(a);var n=t(2),r=t(11),l=t(0),c=t.n(l),o=t(383),s=t(388),i=t(391),m=t(392),u=t(369),d=t(485),b=t(377),p=t(34),E=t.n(p),f=t(403),v=t(393),g=t(394),h=t(218),x=t(396);var O=function(){var e=Object(f.b)(),a=Object(r.a)(e,2),t=a[0],o=a[1],s=Object(l.useCallback)((function(e){var a=e.target,t=a.value,r=a.checked;o((function(e){return Object(n.a)(Object(n.a)({},e),{},{date:r?t:""})}))}),[o]);return c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:"font-weight-bold mb-2 text-center"},"Completion Date"),c.a.createElement("div",{className:"px-3"},c.a.createElement(v.a,null,c.a.createElement(g.a,{addonType:"prepend"},c.a.createElement(h.a,{className:"bg-transparent border-0 px-0"},c.a.createElement(x.a,{type:"checkbox",id:"this-week",value:"this-week",checked:"this-week"===t.date,onChange:s}))),c.a.createElement("div",{className:"d-flex bg-transparent p-1 align-items-center"},"This Week")),c.a.createElement(v.a,null,c.a.createElement(g.a,{addonType:"prepend"},c.a.createElement(h.a,{className:"bg-transparent border-0 px-0"},c.a.createElement(x.a,{type:"checkbox",id:"next-week",value:"next-week",checked:"next-week"===t.date,onChange:s}))),c.a.createElement("div",{className:"d-flex bg-transparent p-1 align-items-center"},"Next Week")),c.a.createElement(v.a,null,c.a.createElement(g.a,{addonType:"prepend"},c.a.createElement(h.a,{className:"bg-transparent border-0 px-0"},c.a.createElement(x.a,{type:"checkbox",id:"this-month",value:"this-month",checked:"this-month"===t.date,onChange:s}))),c.a.createElement("div",{className:"d-flex bg-transparent p-1 align-items-center"},"This month")),c.a.createElement(v.a,null,c.a.createElement(g.a,{addonType:"prepend"},c.a.createElement(h.a,{className:"bg-transparent border-0 px-0"},c.a.createElement(x.a,{type:"checkbox",id:"next-month",value:"next-month",checked:"next-month"===t.date,onChange:s}))),c.a.createElement("div",{className:"d-flex bg-transparent p-1 align-items-center"},"Next month"))))};var j=function(){var e=Object(f.b)(),a=Object(r.a)(e,2),t=a[0],o=a[1],s=Object(l.useCallback)((function(e){var a=e.target,t=a.value,r=a.checked;o((function(e){return Object(n.a)(Object(n.a)({},e),{},{exp:r?t:""})}))}),[o]);return c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:"font-weight-bold mb-2 text-center"},"Years of experience"),c.a.createElement("div",{className:"px-3"},c.a.createElement(v.a,null,c.a.createElement(g.a,{addonType:"prepend"},c.a.createElement(h.a,{className:"bg-transparent border-0 px-0"},c.a.createElement(x.a,{type:"checkbox",id:"<3",value:"<3",checked:"<3"===t.exp,onChange:s}))),c.a.createElement("div",{className:"d-flex bg-transparent p-1 align-items-center"},"Less than 3 years")),c.a.createElement(v.a,null,c.a.createElement(g.a,{addonType:"prepend"},c.a.createElement(h.a,{className:"bg-transparent border-0 px-0"},c.a.createElement(x.a,{type:"checkbox",id:"3-6",value:"3-6",checked:"3-6"===t.exp,onChange:s}))),c.a.createElement("div",{className:"d-flex bg-transparent p-1 align-items-center"},"3-6 years")),c.a.createElement(v.a,null,c.a.createElement(g.a,{addonType:"prepend"},c.a.createElement(h.a,{className:"bg-transparent border-0 px-0"},c.a.createElement(x.a,{type:"checkbox",id:"6-10",value:"6-10",checked:"6-10"===t.exp,onChange:s}))),c.a.createElement("div",{className:"d-flex bg-transparent p-1 align-items-center"},"6-10 years")),c.a.createElement(v.a,null,c.a.createElement(g.a,{addonType:"prepend"},c.a.createElement(h.a,{className:"bg-transparent border-0 px-0"},c.a.createElement(x.a,{type:"checkbox",id:"10-20",value:"10-20",checked:"10-20"===t.exp,onChange:s}))),c.a.createElement("div",{className:"d-flex bg-transparent p-1 align-items-center"},"10-20 years")),c.a.createElement(v.a,null,c.a.createElement(g.a,{addonType:"prepend"},c.a.createElement(h.a,{className:"bg-transparent border-0 px-0"},c.a.createElement(x.a,{type:"checkbox",id:">20",value:">20",checked:">20"===t.exp,onChange:s}))),c.a.createElement("div",{className:"d-flex bg-transparent p-1 align-items-center"},"More than 20 years"))))},y=t(24),N=t(48);var k=function(){var e=Object(f.b)(),a=Object(r.a)(e,2),t=a[0],o=a[1],s=Object(N.a)().data,i=Object(l.useMemo)((function(){return s.map((function(e){return{label:e.name,value:e.id}}))}),[s]);return c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:"font-weight-bold mb-2 text-center"},"Sector"),c.a.createElement("div",{className:"px-3"},c.a.createElement(y.a,{closeMenuOnSelect:!1,options:i,isClearable:!0,isMulti:!0,placeholder:"Choose some sectors...",onChange:function(e){return function(e){o((function(a){return Object(n.a)(Object(n.a)({},a),{},{sectors:null!==e&&void 0!==e?e:[]})}))}(e)},components:{DropdownIndicator:function(){return null},IndicatorSeparator:function(){return null}},value:t.sectors})))},w=t(80);var C=function(){var e=Object(f.b)(),a=Object(r.a)(e,2),t=a[0],o=a[1],s=Object(w.a)().data,i=Object(l.useMemo)((function(){return s.map((function(e){return{label:e.name,value:e.id}}))}),[s]);return c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:"font-weight-bold mb-2 text-center"},"Skills Requirements"),c.a.createElement("div",{className:"px-3"},c.a.createElement(y.a,{closeMenuOnSelect:!1,options:i,isClearable:!0,isMulti:!0,placeholder:"Choose some skills...",onChange:function(e){return function(e){o((function(a){return Object(n.a)(Object(n.a)({},a),{},{skills:null!==e&&void 0!==e?e:[]})}))}(e)},components:{DropdownIndicator:function(){return null},IndicatorSeparator:function(){return null}},value:t.skills})))};var S=function(){var e=Object(f.b)(),a=Object(r.a)(e,2),t=a[0],l=a[1];return c.a.createElement(c.a.Fragment,null,c.a.createElement("small",{className:"font-weight-bold mb-2 text-center"},"Closing Date"),c.a.createElement("div",{className:"px-3"}),c.a.createElement(y.a,{isSearchable:!1,options:[{label:"Newest to Oldest",value:"newest"},{label:"Oldest to Newest",value:"oldest"}],onChange:function(e){return function(e){l((function(a){return Object(n.a)(Object(n.a)({},a),{},{sortClosing:e})}))}(e)},components:{DropdownIndicator:function(){return null},IndicatorSeparator:function(){return null}},value:t.sortClosing}))};var D=function(){var e=Object(f.b)(),a=Object(r.a)(e,2),t=a[0],l=a[1];return c.a.createElement(c.a.Fragment,null,c.a.createElement("small",{className:"font-weight-bold mb-2 text-center"},"Duration"),c.a.createElement("div",{className:"px-3"}),c.a.createElement(y.a,{isSearchable:!1,options:[{label:"Shortest to Longest",value:"shortest"},{label:"Longest to Shortest",value:"longest"}],onChange:function(e){return function(e){l((function(a){return Object(n.a)(Object(n.a)({},a),{},{sortDuration:e})}))}(e)},components:{DropdownIndicator:function(){return null},IndicatorSeparator:function(){return null}},value:t.sortDuration}))};var M=function(){var e=Object(f.b)(),a=Object(r.a)(e,2),t=a[0],l=a[1];return c.a.createElement(c.a.Fragment,null,c.a.createElement("small",{className:"font-weight-bold mb-2 text-center"},"Budgetary"),c.a.createElement("div",{className:"px-3"}),c.a.createElement(y.a,{isSearchable:!1,options:[{label:"Lowest to Highest",value:"lowest"},{label:"Highest to Lowest",value:"highest"}],onChange:function(e){return function(e){l((function(a){return Object(n.a)(Object(n.a)({},a),{},{sortBudgetary:e})}))}(e)},components:{DropdownIndicator:function(){return null},IndicatorSeparator:function(){return null}},value:t.sortBudgetary}))},T=t(456),I=t(406),P=t(13),L=t(168),F=t(421),A=t(422);a.default=function(){var e,a,t,p,v=Object(f.b)(),g=Object(r.a)(v,2),h=g[0],x=g[1],y=Object(L.b)((function(){return"v1/project?".concat(h.limit?"limit=".concat(h.limit):"").concat(h.date?"&completeDate=".concat(h.date):"").concat(h.exp?"&yearOfExperience=".concat(h.exp):"").concat(h.skills.length>0?"&skillIds=".concat(h.skills.map((function(e){return e.value})).toString()):"").concat(h.sectors.length>0?"&sectorIds=".concat(h.sectors.map((function(e){return e.value})).toString()):"","&page=".concat(h.page+1))}),{refreshInterval:18e5}),N=y.data,w=y.error,B=!N||w,R=Object(l.useMemo)((function(){var e,a;return null!==(e=null===N||void 0===N||null===(a=N.data)||void 0===a?void 0:a.data)&&void 0!==e?e:[]}),[N]),V=Object(l.useCallback)((function(e){x((function(a){return Object(n.a)(Object(n.a)({},a),{},{page:e})}))}),[x]),Y=Object(F.a)(null===R||void 0===R||null===(e=R.pageSummary)||void 0===e?void 0:e.total,h.page,null===R||void 0===R||null===(a=R.pageSummary)||void 0===a?void 0:a.totalPages,V).PaginationComponent;return c.a.createElement(o.a,{className:"mt-md-3 mt-lg-n2"},c.a.createElement(s.a,{xs:"12",lg:"3"},c.a.createElement(i.a,{className:"shadow-sm"},c.a.createElement(m.a,null,c.a.createElement(o.a,null,c.a.createElement(s.a,{xs:"12",className:"my-2"},c.a.createElement("h5",{className:"font-weight-bold mb-4 text-center"},"FILTER")),c.a.createElement(s.a,{xs:"12",className:"my-2"},c.a.createElement(k,null)),c.a.createElement(s.a,{xs:"12",className:"my-2"},c.a.createElement(O,null)),c.a.createElement(s.a,{xs:"12",className:"my-2"},c.a.createElement(j,null)),c.a.createElement(s.a,{xs:"12",className:"my-2"},c.a.createElement(C,null)))))),c.a.createElement(s.a,{xs:"12",lg:"9"},c.a.createElement(o.a,{className:"mb-4"},c.a.createElement(s.a,{xs:"3"},c.a.createElement(S,null)),c.a.createElement(s.a,{xs:"3"},c.a.createElement(D,null)),c.a.createElement(s.a,{xs:"3"},c.a.createElement(M,null)),c.a.createElement(s.a,{xs:"3"},c.a.createElement(T.a,null))),c.a.createElement(o.a,{className:"mb-2"},c.a.createElement(s.a,{xs:"12"},B?c.a.createElement("div",{style:{position:"absolute",top:0,right:0,bottom:0,left:0,display:"flex",justifyContent:"center",alignItems:"center"}},c.a.createElement(u.a,{style:{width:48,height:48}})):(null===R||void 0===R?void 0:R.records.length)>0?null===R||void 0===R||null===(t=R.records)||void 0===t?void 0:t.map((function(e,a){var t;return c.a.createElement(i.a,{key:a,className:"shadow-sm"},c.a.createElement(m.a,null,c.a.createElement(o.a,null,c.a.createElement(s.a,{xs:"9"},c.a.createElement(o.a,null,c.a.createElement(s.a,{xs:"12"},c.a.createElement(P.b,{to:"/project/".concat(e.id),className:"text-dark"},c.a.createElement("h4",null,e.name))),c.a.createElement(s.a,{xs:"12",className:"d-flex justify-content-between"},c.a.createElement(P.b,{to:"/client/".concat(e.projectOwnerId+1),className:"text-dark"},c.a.createElement("p",null,e.projectOwnerName))),c.a.createElement(s.a,{xs:"6"},c.a.createElement("span",{className:"text-muted"},"Completion Date"),c.a.createElement("p",null," ",E()(e.completeDate).format("DD MMMM YYYY"))),c.a.createElement(s.a,{xs:"6"},c.a.createElement("span",{className:"text-muted"},"Duration"),c.a.createElement("p",null,e.duration," hours")),c.a.createElement(s.a,{xs:"6"},c.a.createElement("span",{className:"text-muted"},"Sector"),c.a.createElement("p",null,e.sectors.map((function(a,t){return"".concat(a.sector.name).concat(e.sectors.length===t+1?"":","," ")})))),c.a.createElement(s.a,{xs:"6"},c.a.createElement("span",{className:"text-muted"},"Estimated Contract Value"),c.a.createElement("p",null,"IDR ",Object(I.b)(e.estimatedContractValue))),c.a.createElement(s.a,{xs:"12"},c.a.createElement(d.a,{striped:!0,className:"position-relative",value:e.skillMatched,style:{height:"2rem"}},c.a.createElement("div",{className:"position-absolute w-100 font-sm font-weight-bold text-dark text-center"}," ",null===e||void 0===e||null===(t=e.skillMatched)||void 0===t?void 0:t.toFixed(2),"% skills matched"))))),c.a.createElement(s.a,{xs:"3"},e.projectRequirementSkill.map((function(e,a){return c.a.createElement(b.a,{key:a,color:A.a[a],className:"w-100 text-uppercase font-sm my-1 text-light"},e.name)}))))))})):c.a.createElement("div",{className:"text-center text-muted p-5 mt-5"},"No Projects")),c.a.createElement(s.a,{xs:"12"},(null===R||void 0===R||null===(p=R.records)||void 0===p?void 0:p.length)>0&&c.a.createElement(Y,null)))))}}}]);
//# sourceMappingURL=11.3cc6a25a.chunk.js.map