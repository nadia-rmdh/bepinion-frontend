(this.webpackJsonppplatform=this.webpackJsonppplatform||[]).push([[11],{349:function(e,a,t){"use strict";a.a=[{label:"PHP",value:"1"},{label:"Phyton",value:"2"},{label:"Javascript",value:"3"},{label:"Flutter",value:"4"},{label:"Golang",value:"5"},{label:"Laravel",value:"6"},{label:"React JS",value:"7"},{label:"Node JS",value:"8"},{label:"React Native",value:"9"}]},495:function(e,a,t){"use strict";t.r(a);var n=t(2),l=t(12),r=t(0),c=t.n(r),i=t(326),s=t(331),o=t(325),m=t(339),u=t(324),d=t(335),p=t(336),b=t(328),g=t(329),E=t(337),f=t(338),x=t(195),y=t(340),N=t(27),j=t(8),v=t(18),D=t(68),h=[{label:"S1/Bachelor",value:"S1/Bachelor"},{label:"S2/Master",value:"S2/Master"},{label:"S3/Doctorate",value:"S3/Doctorate"},{label:"D3/Diploma",value:"D3/Diploma"}],O=t(349),C=["Economic and Business","Law","Medical","Engineering","Architecture","Liberal Arts","Literature and Culture","Agricultire","Education","Political Science","Aplied Science","Hospitality and Tourism","Psychology","Others"],k=t(162),w=(a.default=function(e){e.data;var a=Object(r.useState)(!1),t=Object(l.a)(a,2),n=t[0],d=t[1],p=Object(N.a)({initialValues:{projectName:"",projectOwnerVisibility:!0,sector:"",description:"",duration:0,budget:0,budgetVisibility:!0,completionDate:"",closingDate:"",skills:[],yearExperience:0,degree:"",education:""},validationSchema:function(){return j.d().shape({projectName:j.g().required().label("Business Name"),projectOwnerVisibility:j.b().oneOf([!0],"You must choose one for display name or not"),sector:j.g().required().label("Sector"),description:j.g().required().label("Description"),duration:j.c().min(1,"Min value 1.").label("Duration"),budget:j.c().min(1,"Min value 1.").label("budget"),budgetVisibility:j.b().oneOf([!0],"You must choose one for display budget or not"),completionDate:j.g().required().label("Completion Date"),closingDate:j.g().required().label("Tender Closing Date"),skills:j.a().min(1).max(5).label("Skills"),yearExperience:j.c().min(1,"Min value 1.").label("Minimum years of experience"),degree:j.g().required().label("Degree"),education:j.g().required().label("Field of study")})},onSubmit:function(e,a){var t=a.setSubmitting;a.setErrors;t(!0)}}),b=p.values,g=p.touched,E=p.errors,f=p.setValues,x=p.handleSubmit;return c.a.createElement("div",null,c.a.createElement(i.a,null,c.a.createElement(s.a,{xs:"12"},c.a.createElement(w,{projectInformationData:b,setProjectInformationData:f,touched:g,errors:E})),c.a.createElement(s.a,{xs:"12"},c.a.createElement(S,{projectRequirementsData:b,setProjectRequirementsData:f,touched:g,errors:E})),c.a.createElement(s.a,{xs:"12",className:"d-flex justify-content-end"},c.a.createElement(o.a,{color:"secondary",className:"mr-2"},"Cancel"),c.a.createElement(o.a,{color:"primary",onClick:function(){return d(!n)}},"Create"))),c.a.createElement(m.a,{isOpen:n,centered:!0,toggle:function(){return d(!n)}},c.a.createElement(u.a,{className:"p-5"},c.a.createElement(i.a,null,c.a.createElement(s.a,{xs:"12",className:"mb-5"},"Are you sure with your registration data?"),c.a.createElement(s.a,{xs:"12",className:"d-flex justify-content-end"},c.a.createElement(o.a,{color:"secondary",className:"mr-2",toggle:function(){return d(!n)}},"Cancel"),c.a.createElement(o.a,{color:"primary",onClick:x},"Create"))))))},function(e){var a=e.projectInformationData,t=e.setProjectInformationData,l=e.touched,o=e.errors,m=Object(r.useCallback)((function(e){var a=e.target.value;t((function(e){return Object(n.a)(Object(n.a)({},e),{},{projectName:a})}))}),[t]),u=Object(r.useCallback)((function(e){var a=e.target,l=a.value,r=a.checked;t((function(e){return Object(n.a)(Object(n.a)({},e),{},{projectOwnerVisibility:r?l:""})}))}),[t]),N=Object(r.useCallback)((function(e){t((function(a){return Object(n.a)(Object(n.a)({},a),{},{sector:e})}))}),[t]),j=Object(r.useCallback)((function(e){var a=e.target.value;t((function(e){return Object(n.a)(Object(n.a)({},e),{},{description:a})}))}),[t]),h=Object(r.useCallback)((function(e){var a=e.target.value;t((function(e){return Object(n.a)(Object(n.a)({},e),{},{duration:a})}))}),[t]),O=Object(r.useCallback)((function(e){var a=e.target.value;t((function(e){return Object(n.a)(Object(n.a)({},e),{},{budget:a})}))}),[t]),C=Object(r.useCallback)((function(e){var a=e.target.value;t((function(e){return Object(n.a)(Object(n.a)({},e),{},{budgetVisibility:a})}))}),[t]),w=Object(r.useCallback)((function(e){t((function(a){return Object(n.a)(Object(n.a)({},a),{},{completionDate:e})}))}),[t]),S=Object(r.useCallback)((function(e){t((function(a){return Object(n.a)(Object(n.a)({},a),{},{closingDate:e})}))}),[t]);return c.a.createElement(d.a,{className:"shadow-sm"},c.a.createElement(p.a,null,c.a.createElement(i.a,{className:"px-5"},c.a.createElement(s.a,{xs:"12",className:"mb-3"},c.a.createElement("div",{className:"font-xl font-weight-bold"},"REGISTRANT INFORMATION")),c.a.createElement(s.a,{xs:"12"},c.a.createElement(i.a,{className:"my-3"},c.a.createElement(s.a,{xs:"12",md:"4",lg:"3",className:"d-flex align-items-center"},c.a.createElement(b.a,{for:"projectName"},"Project Name")),c.a.createElement(s.a,{xs:"12",md:"8",lg:"9"},c.a.createElement(g.a,{type:"text",name:"projectName",id:"projectName",value:a.projectName,onChange:function(e){return m(e)},placeholder:"Business Entity Field..."}),l.projectName&&o.projectName&&c.a.createElement("small",{className:"text-danger"},o.projectName))),c.a.createElement(i.a,{className:"my-3"},c.a.createElement(s.a,{xs:"12",md:"4",lg:"3",className:"d-flex align-items-center"},c.a.createElement(b.a,{for:"projectOwnerVisibility"},"Project Owner Visibility")),c.a.createElement(s.a,{xs:"12",md:"8",lg:"9"},c.a.createElement("div",{className:"d-flex"},c.a.createElement(E.a,null,c.a.createElement(f.a,{addonType:"prepend"},c.a.createElement(x.a,{className:"bg-transparent border-0 px-0"},c.a.createElement(y.a,{type:"radio",id:"displayed",value:"displayed",checked:"displayed"===a.projectOwnerVisibility,onChange:function(e){return u(e)}}))),c.a.createElement(b.a,{for:"displayed",className:"d-flex bg-transparent p-1 m-0 align-items-center"},"Displayed")),c.a.createElement(E.a,null,c.a.createElement(f.a,{addonType:"prepend"},c.a.createElement(x.a,{className:"bg-transparent border-0 px-0"},c.a.createElement(y.a,{type:"radio",id:"undisclosed",value:"undisclosed",checked:"undisclosed"===a.projectOwnerVisibility,onChange:function(e){return u(e)}}))),c.a.createElement(b.a,{for:"undisclosed",className:"d-flex bg-transparent p-1 m-0 align-items-center"},"Undisclosed"))),l.projectOwnerVisibility&&o.projectOwnerVisibility&&c.a.createElement("small",{className:"text-danger"},o.projectOwnerVisibility))),c.a.createElement(i.a,{className:"my-3"},c.a.createElement(s.a,{xs:"12",md:"4",lg:"3",className:"d-flex align-items-center"},c.a.createElement(b.a,{for:"sector"},"Sector")),c.a.createElement(s.a,{xs:"12",md:"8",lg:"9"},c.a.createElement(v.a,{options:[{label:"Sector 1",value:"Sector 1"},{label:"Sector 2",value:"Sector 2"},{label:"Sector 3",value:"Sector 3"},{label:"Sector 4",value:"Sector 4"}],placeholder:"Choose a socter...",value:a.sector,onChange:function(e){return N(e)},components:{DropdownIndicator:function(){return null},IndicatorSeparator:function(){return null}}}),l.sector&&o.sector&&c.a.createElement("small",{className:"text-danger"},o.sector))),c.a.createElement(i.a,{className:"my-3"},c.a.createElement(s.a,{xs:"12",md:"4",lg:"3",className:"d-flex align-items-center"},c.a.createElement(b.a,{for:"description"},"Description")),c.a.createElement(s.a,{xs:"12",md:"8",lg:"9"},c.a.createElement(D.a,{minRows:3,name:"description",id:"description",className:"form-control",placeholder:"Description Field...",value:a.description,onChange:function(e){return j(e)}}),l.description&&o.description&&c.a.createElement("small",{className:"text-danger"},o.description))),c.a.createElement(i.a,{className:"my-3"},c.a.createElement(s.a,{xs:"12",md:"4",lg:"3",className:"d-flex align-items-center"},c.a.createElement(b.a,{for:"duration"},"Duration")),c.a.createElement(s.a,{xs:"12",md:"8",lg:"9"},c.a.createElement(g.a,{type:"number",name:"duration",id:"duration",value:a.duration,onChange:function(e){return h(e)},placeholder:"Duration Field..."}),l.duration&&o.duration&&c.a.createElement("small",{className:"text-danger"},o.duration))),c.a.createElement(i.a,{className:"my-3"},c.a.createElement(s.a,{xs:"12",md:"4",lg:"3",className:"d-flex align-items-center"},c.a.createElement(b.a,{for:"budget"},"Budget")),c.a.createElement(s.a,{xs:"12",md:"8",lg:"9"},c.a.createElement(g.a,{type:"number",name:"budget",id:"budget",value:a.budget,onChange:function(e){return O(e)},placeholder:"Budget Field..."}),l.budget&&o.budget&&c.a.createElement("small",{className:"text-danger"},o.budget))),c.a.createElement(i.a,{className:"my-3"},c.a.createElement(s.a,{xs:"12",md:"4",lg:"3",className:"d-flex align-items-center"},c.a.createElement(b.a,{for:"budgetVisibility"},"Budget Visibility")),c.a.createElement(s.a,{xs:"12",md:"8",lg:"9"},c.a.createElement("div",{className:"d-flex"},c.a.createElement(E.a,null,c.a.createElement(f.a,{addonType:"prepend"},c.a.createElement(x.a,{className:"bg-transparent border-0 px-0"},c.a.createElement(y.a,{type:"radio",id:"displayed",value:"displayed",checked:"displayed"===a.budgetVisibility,onChange:function(e){return C(e)}}))),c.a.createElement(b.a,{for:"displayed",className:"d-flex bg-transparent p-1 m-0 align-items-center"},"Displayed")),c.a.createElement(E.a,null,c.a.createElement(f.a,{addonType:"prepend"},c.a.createElement(x.a,{className:"bg-transparent border-0 px-0"},c.a.createElement(y.a,{type:"radio",id:"undisclosed",value:"undisclosed",checked:"undisclosed"===a.budgetVisibility,onChange:function(e){return C(e)}}))),c.a.createElement(b.a,{for:"undisclosed",className:"d-flex bg-transparent p-1 m-0 align-items-center"},"Undisclosed"))),l.budgetVisibility&&o.budgetVisibility&&c.a.createElement("small",{className:"text-danger"},o.budgetVisibility))),c.a.createElement(i.a,{className:"my-3"},c.a.createElement(s.a,{xs:"12",md:"4",lg:"3",className:"d-flex align-items-center"},c.a.createElement(b.a,{for:"completionDate"},"Completion Date")),c.a.createElement(s.a,{xs:"12",md:"8",lg:"9"},c.a.createElement(k.a,{initialSettings:{singleDatePicker:!0,showDropdowns:!0,startDate:new Date,maxDate:new Date,autoApply:!0},onApply:function(e,a){return w(a.startDate)}},c.a.createElement("div",{id:"reportrange",style:{background:"#fff",cursor:"pointer",padding:"5px 10px",border:"1px solid #ccc",width:"100%"}},c.a.createElement("i",{className:"fa fa-calendar mr-2"}),c.a.createElement("span",null,a.completionDate?a.completionDate.format("DD/MM/YYYY"):"DD/MMMM/YYYY")," ",c.a.createElement("i",{className:"fa fa-caret-down float-right"}))))),c.a.createElement(i.a,{className:"my-3"},c.a.createElement(s.a,{xs:"12",md:"4",lg:"3",className:"d-flex align-items-center"},c.a.createElement(b.a,{for:"closingDate"},"Tender Closing Date")),c.a.createElement(s.a,{xs:"12",md:"8",lg:"9"},c.a.createElement(k.a,{initialSettings:{singleDatePicker:!0,showDropdowns:!0,startDate:new Date,maxDate:new Date,autoApply:!0},onApply:function(e,a){return S(a.startDate)}},c.a.createElement("div",{id:"reportrange",style:{background:"#fff",cursor:"pointer",padding:"5px 10px",border:"1px solid #ccc",width:"100%"}},c.a.createElement("i",{className:"fa fa-calendar mr-2"}),c.a.createElement("span",null,a.closingDate?a.closingDate.format("DD/MM/YYYY"):"DD/MMMM/YYYY")," ",c.a.createElement("i",{className:"fa fa-caret-down float-right"})))))))))}),S=function(e){var a=e.projectRequirementsData,t=e.setProjectRequirementsData,l=e.touched,o=e.errors,m=Object(r.useCallback)((function(e){t((function(a){return Object(n.a)(Object(n.a)({},a),{},{skills:null!==e&&void 0!==e?e:[]})}))}),[t]),u=Object(r.useCallback)((function(e){t((function(a){return Object(n.a)(Object(n.a)({},a),{},{sector:null!==e&&void 0!==e?e:[]})}))}),[t]),E=Object(r.useCallback)((function(e){var a=e.target.value;t((function(e){return Object(n.a)(Object(n.a)({},e),{},{yearExperience:a})}))}),[t]),f=Object(r.useCallback)((function(e){t((function(a){return Object(n.a)(Object(n.a)({},a),{},{education:null!==e&&void 0!==e?e:[]})}))}),[t]);return c.a.createElement(d.a,{className:"shadow-sm"},c.a.createElement(p.a,null,c.a.createElement(i.a,{className:"px-5"},c.a.createElement(s.a,{xs:"12",className:"mb-3"},c.a.createElement("div",{className:"font-xl font-weight-bold"},"REGISTRANT INFORMATION")),c.a.createElement(s.a,{xs:"12"},c.a.createElement(i.a,{className:"my-3"},c.a.createElement(s.a,{xs:"12",md:"4",lg:"3",className:"d-flex align-items-center"},c.a.createElement(b.a,{for:"skills"},"Skiils")),c.a.createElement(s.a,{xs:"12",md:"8",lg:"9"},c.a.createElement(v.a,{options:O.a,placeholder:"Choose a socter...",value:a.skills,onChange:function(e){return m(e)},components:{DropdownIndicator:function(){return null},IndicatorSeparator:function(){return null}}}),l.skills&&o.skills&&c.a.createElement("small",{className:"text-danger"},o.skills))),c.a.createElement(i.a,{className:"my-3"},c.a.createElement(s.a,{xs:"12",md:"4",lg:"3",className:"d-flex align-items-center"},c.a.createElement(b.a,{for:"yearExperience"},"Minimum years of experience")),c.a.createElement(s.a,{xs:"12",md:"8",lg:"9"},c.a.createElement(g.a,{type:"number",name:"yearExperience",id:"yearExperience",value:a.yearExperience,onChange:function(e){return E(e)},placeholder:"Budget Field..."}),l.yearExperience&&o.yearExperience&&c.a.createElement("small",{className:"text-danger"},o.yearExperience))),c.a.createElement(i.a,{className:"my-3"},c.a.createElement(s.a,{xs:"12",md:"4",lg:"3",className:"d-flex align-items-center"},c.a.createElement(b.a,{for:"degree"},"Degree")),c.a.createElement(s.a,{xs:"12",md:"8",lg:"9"},c.a.createElement(v.a,{options:h,placeholder:"Choose a socter...",value:a.degree,onChange:function(e){return u(e)},components:{DropdownIndicator:function(){return null},IndicatorSeparator:function(){return null}}}),l.degree&&o.degree&&c.a.createElement("small",{className:"text-danger"},o.degree))),c.a.createElement(i.a,{className:"my-3"},c.a.createElement(s.a,{xs:"12",md:"4",lg:"3",className:"d-flex align-items-center"},c.a.createElement(b.a,{for:"education"},"Field of study")),c.a.createElement(s.a,{xs:"12",md:"8",lg:"9"},c.a.createElement(v.a,{options:C,placeholder:"Choose a socter...",value:a.education,onChange:function(e){return f(e)},components:{DropdownIndicator:function(){return null},IndicatorSeparator:function(){return null}}}),l.education&&o.education&&c.a.createElement("small",{className:"text-danger"},o.education)))))))}}}]);
//# sourceMappingURL=11.160e272b.chunk.js.map