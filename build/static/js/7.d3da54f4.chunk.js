(this.webpackJsonppplatform=this.webpackJsonppplatform||[]).push([[7],{348:function(e,a,t){"use strict";t.d(a,"a",(function(){return i}));var n=t(12),l=t(0),r=t.n(l),c=t(484),s=t(485),o=t(486);function i(e,a,t,c){var s=Object(l.useState)(a),o=Object(n.a)(s,2),i=o[0],u=o[1];Object(l.useEffect)((function(){return c(i)}),[i,c]);var d=Object(l.useCallback)((function(){u((function(e){return e===t-1?e:e+1}))}),[t]),E=Object(l.useCallback)((function(){u((function(e){return 0===e?e:e-1}))}),[]),p=Object(l.useCallback)((function(e){u(e)}),[]),f=Object(l.useMemo)((function(){return function(e){return r.a.createElement(m,{handleFirst:function(){return p(0)},handleLast:function(){return p(t-1)},handleNext:d,handlePrev:E,handleGoto:p,currentPage:i,count:t})}}),[p,d,E,i,t]);return{currentPage:i,next:d,prev:E,goto:p,totalPage:t,PaginationComponent:f}}var m=function(e){var a=e.handleFirst,t=e.handleLast,n=e.handleNext,l=e.handlePrev,i=e.handleGoto,m=e.count,u=e.currentPage;return r.a.createElement(c.a,{className:"pagination-hub d-flex justify-content-center"},a&&r.a.createElement(s.a,{disabled:!(u-1>=0)},r.a.createElement(o.a,{first:!0,onClick:a,disabled:0===u})),l&&r.a.createElement(s.a,{disabled:!(u-1>=0)},r.a.createElement(o.a,{previous:!0,onClick:l,disabled:0===u})),u-3>=0&&r.a.createElement(s.a,{disabled:!0},r.a.createElement(o.a,{className:"text-dark"},"...")),u-2>=0&&r.a.createElement(s.a,{className:"d-none d-md-block"},r.a.createElement(o.a,{onClick:function(){return i(u-2)}},u-1)),u-1>=0&&r.a.createElement(s.a,null,r.a.createElement(o.a,{onClick:function(){return i(u-1)}},u)),r.a.createElement(s.a,{active:!0,disabled:!0},r.a.createElement(o.a,{onClick:function(){return i(u)}},u+1)),u+1<m&&r.a.createElement(s.a,null,r.a.createElement(o.a,{onClick:function(){return i(u+1)}},u+2)),u+2<m&&r.a.createElement(s.a,{className:"d-none d-md-block"},r.a.createElement(o.a,{onClick:function(){return i(u+2)}},u+3)),u+3<m&&r.a.createElement(s.a,{disabled:!0},r.a.createElement(o.a,{className:"text-dark"},"...")),r.a.createElement(s.a,{disabled:!(u+1<m)},r.a.createElement(o.a,{next:!0,onClick:n,disabled:u===m-1})),r.a.createElement(s.a,{disabled:!(u+1<m)},r.a.createElement(o.a,{last:!0,onClick:t,disabled:u===m-1})))}},349:function(e,a,t){"use strict";a.a=[{label:"PHP",value:"1"},{label:"Phyton",value:"2"},{label:"Javascript",value:"3"},{label:"Flutter",value:"4"},{label:"Golang",value:"5"},{label:"Laravel",value:"6"},{label:"React JS",value:"7"},{label:"Node JS",value:"8"},{label:"React Native",value:"9"}]},367:function(e,a,t){"use strict";var n=t(2),l=t(12),r=t(0),c=t.n(r),s=t(18),o=t(341);a.a=function(){var e=Object(o.b)(),a=Object(l.a)(e,2),t=a[0],r=a[1];return c.a.createElement(c.a.Fragment,null,c.a.createElement("small",{className:"font-weight-bold mb-2 text-center"},"Skill Match"),c.a.createElement("div",{className:"px-3"}),c.a.createElement(s.a,{isSearchable:!1,options:[{label:"Lowest to Highest",value:"lowest"},{label:"Highest to Lowest",value:"highest"}],onChange:function(e){return function(e){r((function(a){return Object(n.a)(Object(n.a)({},a),{},{sortSkill:e})}))}(e)},components:{DropdownIndicator:function(){return null},IndicatorSeparator:function(){return null}},value:t.sortSkill}))}},368:function(e,a,t){"use strict";t.d(a,"a",(function(){return r}));var n=t(387),l=t.n(n);function r(e){for(var a="",t=e.toString().split("").reverse().join(""),n=0;n<t.length;n++)n%3===0&&(a+=t.substr(n,3)+".");return"IDR "+a.split("",a.length-1).reverse().join("")}l.a.register("locale","indonesia",{delimiters:{thousands:".",decimal:","},abbreviations:{thousand:"rb",million:"jt",billion:"M",trillion:"T"},ordinal:function(e){return 1===e?"er":"\xe8me"},currency:{symbol:"IDR"}}),l.a.locale("indonesia")},369:function(e,a,t){"use strict";a.a=["success","danger","warning","secondary","info","primary","light","dark"]},492:function(e,a,t){"use strict";t.r(a);var n=t(13),l=t(2),r=t(12),c=t(0),s=t.n(c),o=t(326),i=t(331),m=t(335),u=t(336),d=t(320),E=t(339),p=t(324),f=t(325),b=t(6),v=t(9),g=t(1),x=t.n(g),h=t(5),N=t.n(h),k=t(3),j={tag:k.o,className:x.a.string,cssModule:x.a.object},y=function(e){var a=e.className,t=e.cssModule,n=e.tag,l=Object(v.a)(e,["className","cssModule","tag"]),r=Object(k.k)(N()(a,"card-footer"),t);return s.a.createElement(n,Object(b.a)({},l,{className:r}))};y.propTypes=j,y.defaultProps={tag:"div"};var C=y,S=t(340),O=t(27),w=t(8),M=t(349),D=[{id:1,professionalName:"Leonard",experience:1,cost:5e6,education:{degree:"master",field:"Engineering"},sector:{id:"sector_1",name:"Sector 1"},skills:["php","phyton","javascript","flutter","golang","reactnative"],skillsMatch:70},{id:2,professionalName:"Taro",experience:1,cost:2e6,education:{degree:"master",field:"Engineering"},sector:{id:"sector_3",name:"Sector 3"},skills:["php","phyton","javascript","reactjs","nodejs","reactnative"],skillsMatch:68},{id:3,professionalName:"Toronto",experience:1,cost:7e6,education:{degree:"master",field:"Construction Management"},sector:{id:"sector_2",name:"Sector 2"},skills:["php","phyton","javascript","flutter","golang","laravel"],skillsMatch:55},{id:4,professionalName:"Jeki",experience:1,cost:8e6,education:{degree:"bachelor",field:"Construction Management"},sector:{id:"sector_2",name:"Sector 2"},skills:["nodejs","reactnative"],skillsMatch:40},{id:5,professionalName:"Japoy",experience:1,cost:7e6,education:{degree:"master",field:"Finance"},sector:{id:"sector_2",name:"Sector 2"},skills:["nodejs","reactnative"],skillsMatch:20},{id:6,professionalName:"Deth",experience:1,cost:95e5,education:{degree:"master",field:"Finance"},sector:{id:"sector_2",name:"Sector 2"},skills:["nodejs","reactnative"],skillsMatch:34},{id:7,professionalName:"Zack",experience:1,cost:95e5,education:{degree:"bachelor",field:"Engineering"},sector:{id:"sector_2",name:"Sector 2"},skills:["nodejs","reactnative"],skillsMatch:35},{id:8,professionalName:"Joe",experience:1,cost:35e5,education:{degree:"bachelor",field:"Medical"},sector:{id:"sector_2",name:"Sector 2"},skills:["nodejs","reactnative"],skillsMatch:34},{id:9,professionalName:"Zai ",experience:1,cost:35e5,education:{degree:"master",field:"Engineering"},sector:{id:"sector_2",name:"Sector 2"},skills:["nodejs","reactnative"],skillsMatch:43},{id:10,professionalName:"Anna ",experience:1,cost:5e6,education:{degree:"bachelor",field:"Law"},sector:{id:"sector_2",name:"Sector 2"},skills:["nodejs","reactnative"],skillsMatch:33}],H=t(369),P=Object(c.createContext)(),L=Object(c.createContext)();function Y(e){var a=Object(c.useState)({pagination:0,skills:[],sectors:[],exp:[],degree:[],education:[],sortExp:{label:"Shortest to Longest",value:"shortest"},sortCost:{label:"Lowest to Highest",value:"lowest"},sortSkillsMatch:{label:"Lowest to Highest",value:"lowest"}}),t=Object(r.a)(a,2),n=t[0],l=t[1];return s.a.createElement(L.Provider,{value:l},s.a.createElement(P.Provider,{value:n},e.children))}var _=function(){return[Object(c.useContext)(P),Object(c.useContext)(L)]},F=t(18);var I=function(){var e=_(),a=Object(r.a)(e,2),t=a[0],n=a[1];return s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:"font-weight-bold mb-2 text-center"},"Skills Requirements"),s.a.createElement("div",{className:"px-3"},s.a.createElement(F.a,{closeMenuOnSelect:!1,options:[{label:"PHP",value:"1"},{label:"Phyton",value:"2"},{label:"Javascript",value:"3"},{label:"Flutter",value:"4"},{label:"Golang",value:"5"},{label:"Laravel",value:"6"},{label:"React JS",value:"7"},{label:"Node JS",value:"8"},{label:"React Native",value:"9"}],isClearable:!0,isMulti:!0,placeholder:"Choose some skills...",onChange:function(e){return function(e){n((function(a){return Object(l.a)(Object(l.a)({},a),{},{skills:null!==e&&void 0!==e?e:[]})}))}(e)},components:{DropdownIndicator:function(){return null},IndicatorSeparator:function(){return null}},value:t.skills})))};var J=function(){var e=_(),a=Object(r.a)(e,2),t=a[0],n=a[1];return s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:"font-weight-bold mb-2 text-center"},"Sector"),s.a.createElement("div",{className:"px-3"},s.a.createElement(F.a,{closeMenuOnSelect:!1,options:[{label:"Sector 1",value:"sector_1"},{label:"Sector 2",value:"sector_2"},{label:"Sector 3",value:"sector_3"},{label:"Sector 4",value:"sector_4"},{label:"Sector 5",value:"sector_5"},{label:"Sector 6",value:"sector_6"}],isClearable:!0,isMulti:!0,placeholder:"Choose some sectors...",onChange:function(e){return function(e){n((function(a){return Object(l.a)(Object(l.a)({},a),{},{sectors:null!==e&&void 0!==e?e:[]})}))}(e)},components:{DropdownIndicator:function(){return null},IndicatorSeparator:function(){return null}},value:t.sectors})))},R=t(337),T=t(338),A=t(195);var z=function(){var e=_(),a=Object(r.a)(e,2),t=a[0],n=a[1],o=Object(c.useCallback)((function(e){var a=e.target,t=a.value,r=a.checked;n((function(e){return Object(l.a)(Object(l.a)({},e),{},{exp:r?t:""})}))}),[n]);return s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:"font-weight-bold mb-2 text-center"},"Years of experience"),s.a.createElement("div",{className:"px-3"},s.a.createElement(R.a,null,s.a.createElement(T.a,{addonType:"prepend"},s.a.createElement(A.a,{className:"bg-transparent border-0 px-0"},s.a.createElement(S.a,{type:"checkbox",id:"less3",value:"less3",checked:"less3"===t.exp,onChange:o}))),s.a.createElement("div",{className:"d-flex bg-transparent p-1 align-items-center"},"Less than 3 years")),s.a.createElement(R.a,null,s.a.createElement(T.a,{addonType:"prepend"},s.a.createElement(A.a,{className:"bg-transparent border-0 px-0"},s.a.createElement(S.a,{type:"checkbox",id:"3of5",value:"3of5",checked:"3of5"===t.exp,onChange:o}))),s.a.createElement("div",{className:"d-flex bg-transparent p-1 align-items-center"},"3-5 years")),s.a.createElement(R.a,null,s.a.createElement(T.a,{addonType:"prepend"},s.a.createElement(A.a,{className:"bg-transparent border-0 px-0"},s.a.createElement(S.a,{type:"checkbox",id:"6of10",value:"6of10",checked:"6of10"===t.exp,onChange:o}))),s.a.createElement("div",{className:"d-flex bg-transparent p-1 align-items-center"},"6-10 years")),s.a.createElement(R.a,null,s.a.createElement(T.a,{addonType:"prepend"},s.a.createElement(A.a,{className:"bg-transparent border-0 px-0"},s.a.createElement(S.a,{type:"checkbox",id:"10of20",value:"10of20",checked:"10of20"===t.exp,onChange:o}))),s.a.createElement("div",{className:"d-flex bg-transparent p-1 align-items-center"},"10-20 years")),s.a.createElement(R.a,null,s.a.createElement(T.a,{addonType:"prepend"},s.a.createElement(A.a,{className:"bg-transparent border-0 px-0"},s.a.createElement(S.a,{type:"checkbox",id:"more20",value:"more20",checked:"more20"===t.exp,onChange:o}))),s.a.createElement("div",{className:"d-flex bg-transparent p-1 align-items-center"},"More than 20 years"))))};var G=function(){var e=_(),a=Object(r.a)(e,2),t=a[0],n=a[1];return s.a.createElement(s.a.Fragment,null,s.a.createElement("small",{className:"font-weight-bold mb-2 text-center"},"Years of experience"),s.a.createElement("div",{className:"px-3"}),s.a.createElement(F.a,{isSearchable:!1,options:[{label:"Shortest to Longest",value:"shortest"},{label:"Longest to Shortest",value:"longest"}],onChange:function(e){return function(e){n((function(a){return Object(l.a)(Object(l.a)({},a),{},{sortExp:e})}))}(e)},components:{DropdownIndicator:function(){return null},IndicatorSeparator:function(){return null}},value:t.sortExp}))},V=t(110);var Z=function(){var e=_(),a=Object(r.a)(e,2),t=a[0],n=a[1];return s.a.createElement(s.a.Fragment,null,s.a.createElement("small",{className:"font-weight-bold mb-2 text-center"},"Cost"),s.a.createElement("div",{className:"px-3"}),s.a.createElement(F.a,{isSearchable:!1,options:[{label:"Lowest to Highest",value:"lowest"},{label:"Highest to Lowest",value:"highest"}],onChange:function(e){return function(e){n((function(a){return Object(l.a)(Object(l.a)({},a),{},{sortCost:e})}))}(e)},components:{DropdownIndicator:function(){return null},IndicatorSeparator:function(){return null}},value:t.sortExp}))},q=t(367);var B=function(){var e=_(),a=Object(r.a)(e,2)[1];return s.a.createElement(f.a,{color:"danger",onClick:function(){a((function(e){return Object(l.a)(Object(l.a)({},e),{},{skills:[],sectors:[],exp:[],degree:[],education:[]})}))}},"Reset Filter")},K=t(368),Q=t(41),U=t(348),W=t(14),X=(a.default=function(e){e.data;var a,t=Object(c.useState)(!1),n=Object(r.a)(t,2),l=n[0],b=n[1],v=Object(O.a)({initialValues:{cost:0},validationSchema:function(){return w.d().shape({cost:w.c().min(1,"Min value 1.").label("Duration")})},onSubmit:function(e,a){var t=a.setSubmitting;a.setErrors;t(!0)}}),g=(v.values,v.touched),x=v.errors,h=(v.setValues,v.handleSubmit);return s.a.createElement(Y,null,s.a.createElement(o.a,null,s.a.createElement(i.a,{xs:"12",md:"6"},s.a.createElement(m.a,{className:"shadow-sm"},s.a.createElement(u.a,null,s.a.createElement(o.a,null,s.a.createElement(i.a,{xs:"12"},s.a.createElement("div",{className:"font-xl font-weight-bold"},"Project Name")),s.a.createElement(i.a,{xs:"9"},s.a.createElement("div",null,s.a.createElement("span",{className:"text-muted"},"Completion Date")," DD MMMM YYYY"),s.a.createElement("div",null,s.a.createElement("span",{className:"text-muted"},"Closing On")," DD MMMM YYYY"),s.a.createElement("div",null,s.a.createElement("span",{className:"text-muted"},"Sector")," Sector A"),s.a.createElement("div",null,s.a.createElement("span",{className:"text-muted"},"Duration")," 12 Hours"),s.a.createElement("div",null,s.a.createElement("span",{className:"text-muted"},"Years of experience")," 1 Years"),s.a.createElement("div",null,s.a.createElement("span",{className:"text-muted"},"Degree")," Bachelor Degree"),s.a.createElement("div",null,s.a.createElement("span",{className:"text-muted"},"Field")," Mechanical Engineering")),s.a.createElement(i.a,{xs:"3"},M.a.map((function(e,a){return s.a.createElement(d.a,{key:a,color:H.a[a],className:"w-100 text-uppercase font-sm my-1 text-light"},e.label)}))))))),s.a.createElement(i.a,{xs:"12",md:"6"},s.a.createElement(m.a,{className:"shadow-sm"},s.a.createElement(u.a,null,s.a.createElement(o.a,null,s.a.createElement(i.a,{xs:"12"},s.a.createElement("div",{className:"font-xl font-weight-bold"},"Statistics")),s.a.createElement(i.a,{xs:"12",className:"d-flex my-1 justify-content-center"},s.a.createElement(o.a,{className:"text-center"},s.a.createElement(i.a,{xs:"12",md:"4"},s.a.createElement("div",{className:"d-flex justify-content-center",style:{fontSize:"50pt"}},"10"),s.a.createElement("p",{style:{whiteSpace:"nowrap"}},"Number of applicant")),s.a.createElement(i.a,{xs:"12",md:"4"},s.a.createElement("div",{className:"d-flex justify-content-center",style:{fontSize:"50pt"}},"500k"),s.a.createElement("p",{style:{whiteSpace:"nowrap"}},"Average Cost")),s.a.createElement(i.a,{xs:"12",md:"4"},s.a.createElement("div",{className:"d-flex justify-content-center",style:{fontSize:"50pt"}},"50%"),s.a.createElement("p",{style:{whiteSpace:"nowrap"}},"Avarage Skills Match")))))))),s.a.createElement(i.a,{xs:"12"},s.a.createElement(X,{onClickAward:function(e){return b(e)}})),s.a.createElement(E.a,{isOpen:l,centered:!0,toggle:function(){return b(!l)}},s.a.createElement(p.a,{className:"p-5"},s.a.createElement(o.a,null,s.a.createElement(i.a,{xs:"12",className:"mb-5"},s.a.createElement("div",{className:"mb-2"},s.a.createElement("div",{className:"text-muted"},"Sector"),s.a.createElement("div",null,"Sector A")),s.a.createElement("div",{className:"mb-2"},s.a.createElement("div",{className:"text-muted"},"Duration"),s.a.createElement("div",null,"12 Hours")),s.a.createElement("div",{className:"mb-2"},s.a.createElement("div",{className:"text-muted"},"Completion Date"),s.a.createElement("div",null,"DD MMMM YYYY")),s.a.createElement("div",{className:"mb-2"},s.a.createElement("div",{className:"text-muted"},"Submited Cost"),s.a.createElement("div",null,Object(K.a)(null!==(a=null===l||void 0===l?void 0:l.cost)&&void 0!==a?a:0),g.cost&&x.cost&&s.a.createElement("small",{className:"text-danger"},x.cost)))),s.a.createElement(i.a,{xs:"12",className:"d-flex justify-content-end"},s.a.createElement(f.a,{color:"secondary",className:"mr-2",onClick:function(){return b(!l)}},"Cancel"),s.a.createElement(f.a,{color:"primary",onClick:h},"Apply")))))))},function(e){var a=e.onClickAward,t=_(),E=Object(r.a)(t,2),p=E[0],b=E[1],v=Object(c.useState)([]),g=Object(r.a)(v,2),x=g[0],h=g[1],N=Object(c.useMemo)((function(){var e=D;return p&&(e=e.filter((function(e){if(!p.skills.length>0)return!0;for(var a=!1,t=0;t<p.skills.length;t++)if(!0===e.skills.includes(p.skills[t].value)){a=!0;break}return a})).filter((function(e){if(!p.sectors.length>0)return!0;for(var a=!1,t=0;t<p.sectors.length;t++)if(!0===e.sector.id.includes(p.sectors[t].value)){a=!0;break}return a}))),e}),[p]),k=Object(c.useCallback)((function(e){b((function(a){return Object(l.a)(Object(l.a)({},a),{},{pagination:e})}))}),[b]),j=Object(U.a)(N,5,p.pagination,k),y=j.data,O=j.PaginationComponent,w=Object(c.useCallback)((function(e,a){var t=e.target,l=(t.value,t.checked);h(l?function(e){return[].concat(Object(n.a)(e),[{id:a.id,professionalName:a.professionalName,skillsMatch:a.skillsMatch,cost:a.cost,yearExperience:a.experience}])}:function(e){return e.filter((function(e){return e.id!==a.id}))})}),[]),M=Object(c.useCallback)((function(e){h((function(a){return a.filter((function(a){return a.id!==e.id}))}))}),[]),P=Object(c.useCallback)((function(e){h([])}),[]);return s.a.createElement(o.a,{className:"mt-md-3 mt-lg-n2"},s.a.createElement(i.a,{xs:"12",lg:"3"},s.a.createElement(m.a,{className:"shadow-sm"},s.a.createElement(u.a,null,s.a.createElement(o.a,null,s.a.createElement(i.a,{xs:"12",className:"my-2"},s.a.createElement("h5",{className:"font-weight-bold mb-4 text-center"},"FILTER")),s.a.createElement(i.a,{xs:"12",className:"my-2"},s.a.createElement(I,null)),s.a.createElement(i.a,{xs:"12",className:"my-2"},s.a.createElement(J,null)),s.a.createElement(i.a,{xs:"12",className:"my-2"},s.a.createElement(z,null)),s.a.createElement(i.a,{xs:"12",className:"my-2"},s.a.createElement(B,null)))))),s.a.createElement(i.a,{xs:"12",lg:"9"},x.length>0&&s.a.createElement($,{data:x,onClear:M}),s.a.createElement(o.a,{className:"mb-4"},s.a.createElement(i.a,{xs:"3"},s.a.createElement(G,null)),s.a.createElement(i.a,{xs:"3"},s.a.createElement(Z,null)),s.a.createElement(i.a,{xs:"3"},s.a.createElement(q.a,null)),s.a.createElement(i.a,{xs:"3",className:"d-flex align-items-center"},s.a.createElement(f.a,{color:"danger",onClick:P},"Remove all ticked"))),s.a.createElement(o.a,{className:"mb-2"},y.map((function(e,t){return s.a.createElement(i.a,{xs:"12",key:t},s.a.createElement(m.a,{className:"shadow-sm"},s.a.createElement(u.a,null,s.a.createElement(o.a,null,s.a.createElement(i.a,{xs:"9"},s.a.createElement(o.a,null,s.a.createElement(i.a,{xs:"4",className:"d-flex justify-content-center align-items-center"},s.a.createElement(V.a,{text:e.professionalName,size:90})),s.a.createElement(i.a,{xs:"8"},s.a.createElement(o.a,null,s.a.createElement(i.a,{xs:"12"},s.a.createElement(W.b,{to:"/professional/".concat(e.id)},s.a.createElement("h4",null,e.professionalName))),s.a.createElement(i.a,{xs:"12"},s.a.createElement("p",null,e.education.field," in ",e.education.degree)),s.a.createElement(i.a,{xs:"12"},s.a.createElement("p",null,e.experience," year experience")),s.a.createElement(i.a,{xs:"12"},s.a.createElement("p",null,e.sector.name)))))),s.a.createElement(i.a,{xs:"3"},e.skills.map((function(e,a){return s.a.createElement(d.a,{key:a,color:H.a[a],className:"w-100 text-uppercase mx-1 font-sm text-light"},e)}))))),s.a.createElement(C,{style:{backgroundColor:"#fde2c1"}},s.a.createElement(o.a,null,s.a.createElement(i.a,{xs:"4",className:"d-flex align-items-center"},Object(K.a)(e.cost)),s.a.createElement(i.a,{xs:"4",className:"d-flex align-items-center"},"Skills Match ",e.skillsMatch,"%"),s.a.createElement(i.a,{xs:"4",className:"d-flex justify-content-end"},s.a.createElement("div",{className:"d-flex align-items-center"},s.a.createElement(S.a,{type:"checkbox",id:e.id,value:e.id,checked:x.find((function(a){return a.id===e.id})),disabled:3===x.length&&!x.find((function(a){return a.id===e.id})),onChange:function(a){return w(a,e)}}),s.a.createElement("div",{className:"d-flex bg-transparent p-1 align-items-center"},"Compare")),s.a.createElement(f.a,{color:"primary",size:"sm",className:"ml-2",onClick:function(){return a(e)}},"Award"))))))})),s.a.createElement(i.a,{xs:"12"},s.a.createElement(O,null)))))}),$=function(e){var a=e.data,t=e.onClear;return s.a.createElement(o.a,{className:"mb-4"},s.a.createElement(i.a,{xs:"12"},s.a.createElement(o.a,{className:"text-center px-3"},s.a.createElement(i.a,{xs:"3",className:"p-0"},s.a.createElement("div",{className:"border font-weight-bold",style:{backgroundColor:"#fde2c1",lineHeight:"25pt"}},"Comparing"),s.a.createElement("div",{style:{lineHeight:"25pt"},className:"border font-weight-bold"},"Skill Match"),s.a.createElement("div",{style:{lineHeight:"25pt"},className:"border font-weight-bold"},"Cost"),s.a.createElement("div",{style:{lineHeight:"25pt"},className:"border font-weight-bold"},"Years of experience")),a.map((function(e,a){return s.a.createElement(i.a,{xs:"3",className:"p-0",key:a},s.a.createElement("div",{className:"border font-weight-bold position-relative",style:{backgroundColor:"#fde2c1",lineHeight:"25pt"}},e.professionalName,s.a.createElement(f.a,{size:"sm",className:"position-absolute",color:"danger",style:{top:"2px",right:"4px"},onClick:function(){return t(e)}},s.a.createElement(Q.a,{icon:"times",size:"sm"}))),s.a.createElement("div",{style:{lineHeight:"25pt"},className:"border"},e.skillsMatch,"%"),s.a.createElement("div",{style:{lineHeight:"25pt"},className:"border"},Object(K.a)(e.cost)),s.a.createElement("div",{style:{lineHeight:"25pt"},className:"border"},e.yearExperience))})))))}}}]);
//# sourceMappingURL=7.d3da54f4.chunk.js.map