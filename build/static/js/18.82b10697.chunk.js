(this.webpackJsonppplatform=this.webpackJsonppplatform||[]).push([[18],{487:function(e,a,t){"use strict";t.r(a);var n=t(2),r=t(12),l=t(0),c=t.n(l),i=t(326),s=t(331),o=t(325),m=t(339),d=t(324),u=t(335),p=t(336),g=t(328),b=t(329),E=t(337),f=t(338),x=t(195),y=t(340),j=t(27),N=t(8),D=t(18),O=t(68),v=t(162),h=t(28),C=t(21),k=t(182),w=t(183),V=t(44),M=t(74);var S=function(e){var a=e.projectInformationData,t=e.setProjectInformationData,r=e.touched,o=e.errors,m=Object(V.a)().data,d=Object(l.useMemo)((function(){return m.map((function(e){return{label:e.name,value:e.id}}))}),[m]),j=Object(l.useCallback)((function(e){var a=e.target.value;t((function(e){return Object(n.a)(Object(n.a)({},e),{},{projectName:a})}))}),[t]),N=Object(l.useCallback)((function(e){var a=e.target,r=a.value,l=a.checked;t((function(e){return Object(n.a)(Object(n.a)({},e),{},{projectOwnerVisibility:l?r:""})}))}),[t]),h=Object(l.useCallback)((function(e){t((function(a){return Object(n.a)(Object(n.a)({},a),{},{sector:e})}))}),[t]),C=Object(l.useCallback)((function(e){var a=e.target.value;t((function(e){return Object(n.a)(Object(n.a)({},e),{},{description:a})}))}),[t]),k=Object(l.useCallback)((function(e){var a=e.target.value;t((function(e){return Object(n.a)(Object(n.a)({},e),{},{duration:a})}))}),[t]),w=Object(l.useCallback)((function(e){var a=e.target.value;t((function(e){return Object(n.a)(Object(n.a)({},e),{},{budget:a})}))}),[t]),M=Object(l.useCallback)((function(e){var a=e.target.value;t((function(e){return Object(n.a)(Object(n.a)({},e),{},{budgetVisibility:a})}))}),[t]),S=Object(l.useCallback)((function(e){t((function(a){return Object(n.a)(Object(n.a)({},a),{},{completionDate:e})}))}),[t]),Y=Object(l.useCallback)((function(e){t((function(a){return Object(n.a)(Object(n.a)({},a),{},{closingDate:e})}))}),[t]);return c.a.createElement(u.a,{className:"shadow-sm"},c.a.createElement(p.a,null,c.a.createElement(i.a,{className:"px-5"},c.a.createElement(s.a,{xs:"12",className:"mb-3"},c.a.createElement("div",{className:"font-xl font-weight-bold"},"PROJECT INFORMATION")),c.a.createElement(s.a,{xs:"12"},c.a.createElement(i.a,{className:"my-3"},c.a.createElement(s.a,{xs:"12",md:"4",lg:"3",className:"d-flex align-items-center"},c.a.createElement(g.a,{for:"projectName"},"Project Name")),c.a.createElement(s.a,{xs:"12",md:"8",lg:"9"},c.a.createElement(b.a,{type:"text",name:"projectName",id:"projectName",value:a.projectName,onChange:function(e){return j(e)},placeholder:"Business Entity Field..."}),r.projectName&&o.projectName&&c.a.createElement("small",{className:"text-danger"},o.projectName))),c.a.createElement(i.a,{className:"my-3"},c.a.createElement(s.a,{xs:"12",md:"4",lg:"3",className:"d-flex align-items-center"},c.a.createElement(g.a,{for:"projectOwnerVisibility"},"Project Owner Visibility")),c.a.createElement(s.a,{xs:"12",md:"8",lg:"9"},c.a.createElement("div",{className:"d-flex"},c.a.createElement(E.a,null,c.a.createElement(f.a,{addonType:"prepend"},c.a.createElement(x.a,{className:"bg-transparent border-0 px-0"},c.a.createElement(y.a,{type:"radio",id:"displayed",value:"displayed",checked:"displayed"===a.projectOwnerVisibility,onChange:function(e){return N(e)}}))),c.a.createElement(g.a,{for:"displayed",className:"d-flex bg-transparent p-1 m-0 align-items-center"},"Displayed")),c.a.createElement(E.a,null,c.a.createElement(f.a,{addonType:"prepend"},c.a.createElement(x.a,{className:"bg-transparent border-0 px-0"},c.a.createElement(y.a,{type:"radio",id:"undisclosed",value:"undisclosed",checked:"undisclosed"===a.projectOwnerVisibility,onChange:function(e){return N(e)}}))),c.a.createElement(g.a,{for:"undisclosed",className:"d-flex bg-transparent p-1 m-0 align-items-center"},"Undisclosed"))),r.projectOwnerVisibility&&o.projectOwnerVisibility&&c.a.createElement("small",{className:"text-danger"},o.projectOwnerVisibility))),c.a.createElement(i.a,{className:"my-3"},c.a.createElement(s.a,{xs:"12",md:"4",lg:"3",className:"d-flex align-items-center"},c.a.createElement(g.a,{for:"sector"},"Sector")),c.a.createElement(s.a,{xs:"12",md:"8",lg:"9"},c.a.createElement(D.a,{options:d,placeholder:"Choose a sector...",value:a.sector,onChange:function(e){return h(e)},components:{DropdownIndicator:function(){return null},IndicatorSeparator:function(){return null}}}),r.sector&&o.sector&&c.a.createElement("small",{className:"text-danger"},o.sector))),c.a.createElement(i.a,{className:"my-3"},c.a.createElement(s.a,{xs:"12",md:"4",lg:"3",className:"d-flex align-items-center"},c.a.createElement(g.a,{for:"description"},"Description")),c.a.createElement(s.a,{xs:"12",md:"8",lg:"9"},c.a.createElement(O.a,{minRows:3,name:"description",id:"description",className:"form-control",placeholder:"Description Field...",value:a.description,onChange:function(e){return C(e)}}),r.description&&o.description&&c.a.createElement("small",{className:"text-danger"},o.description))),c.a.createElement(i.a,{className:"my-3"},c.a.createElement(s.a,{xs:"12",md:"4",lg:"3",className:"d-flex align-items-center"},c.a.createElement(g.a,{for:"duration"},"Duration")),c.a.createElement(s.a,{xs:"12",md:"8",lg:"9"},c.a.createElement(b.a,{type:"number",name:"duration",id:"duration",value:a.duration,onChange:function(e){return k(e)},placeholder:"Duration Field..."}),r.duration&&o.duration&&c.a.createElement("small",{className:"text-danger"},o.duration))),c.a.createElement(i.a,{className:"my-3"},c.a.createElement(s.a,{xs:"12",md:"4",lg:"3",className:"d-flex align-items-center"},c.a.createElement(g.a,{for:"budget"},"Budget")),c.a.createElement(s.a,{xs:"12",md:"8",lg:"9"},c.a.createElement(b.a,{type:"number",name:"budget",id:"budget",value:a.budget,onChange:function(e){return w(e)},placeholder:"Budget Field..."}),r.budget&&o.budget&&c.a.createElement("small",{className:"text-danger"},o.budget))),c.a.createElement(i.a,{className:"my-3"},c.a.createElement(s.a,{xs:"12",md:"4",lg:"3",className:"d-flex align-items-center"},c.a.createElement(g.a,{for:"budgetVisibility"},"Budget Visibility")),c.a.createElement(s.a,{xs:"12",md:"8",lg:"9"},c.a.createElement("div",{className:"d-flex"},c.a.createElement(E.a,null,c.a.createElement(f.a,{addonType:"prepend"},c.a.createElement(x.a,{className:"bg-transparent border-0 px-0"},c.a.createElement(y.a,{type:"radio",id:"displayedbudget",value:"displayed",checked:"displayed"===a.budgetVisibility,onChange:function(e){return M(e)}}))),c.a.createElement(g.a,{for:"displayedbudget",className:"d-flex bg-transparent p-1 m-0 align-items-center"},"Displayed")),c.a.createElement(E.a,null,c.a.createElement(f.a,{addonType:"prepend"},c.a.createElement(x.a,{className:"bg-transparent border-0 px-0"},c.a.createElement(y.a,{type:"radio",id:"undisclosedbudget",value:"undisclosed",checked:"undisclosed"===a.budgetVisibility,onChange:function(e){return M(e)}}))),c.a.createElement(g.a,{for:"undisclosedbudget",className:"d-flex bg-transparent p-1 m-0 align-items-center"},"Undisclosed"))),r.budgetVisibility&&o.budgetVisibility&&c.a.createElement("small",{className:"text-danger"},o.budgetVisibility))),c.a.createElement(i.a,{className:"my-3"},c.a.createElement(s.a,{xs:"12",md:"4",lg:"3",className:"d-flex align-items-center"},c.a.createElement(g.a,{for:"completionDate"},"Completion Date")),c.a.createElement(s.a,{xs:"12",md:"8",lg:"9"},c.a.createElement(v.a,{initialSettings:{singleDatePicker:!0,showDropdowns:!0,startDate:new Date,minDate:new Date,autoApply:!0},onApply:function(e,a){return S(a.startDate)}},c.a.createElement("div",{id:"reportrange",style:{background:"#fff",cursor:"pointer",padding:"5px 10px",border:"1px solid #ccc",width:"100%"}},c.a.createElement("i",{className:"fa fa-calendar mr-2"}),c.a.createElement("span",null,a.completionDate?a.completionDate.format("DD/MM/YYYY"):"DD/MMMM/YYYY")," ",c.a.createElement("i",{className:"fa fa-caret-down float-right"}))),r.completionDate&&o.completionDate&&c.a.createElement("small",{className:"text-danger"},o.completionDate))),c.a.createElement(i.a,{className:"my-3"},c.a.createElement(s.a,{xs:"12",md:"4",lg:"3",className:"d-flex align-items-center"},c.a.createElement(g.a,{for:"closingDate"},"Tender Closing Date")),c.a.createElement(s.a,{xs:"12",md:"8",lg:"9"},c.a.createElement(v.a,{initialSettings:{singleDatePicker:!0,showDropdowns:!0,startDate:new Date,minDate:new Date,autoApply:!0},onApply:function(e,a){return Y(a.startDate)}},c.a.createElement("div",{id:"reportrange",style:{background:"#fff",cursor:"pointer",padding:"5px 10px",border:"1px solid #ccc",width:"100%"}},c.a.createElement("i",{className:"fa fa-calendar mr-2"}),c.a.createElement("span",null,a.closingDate?a.closingDate.format("DD/MM/YYYY"):"DD/MMMM/YYYY")," ",c.a.createElement("i",{className:"fa fa-caret-down float-right"}))),r.closingDate&&o.closingDate&&c.a.createElement("small",{className:"text-danger"},o.closingDate)))))))},Y=function(e){var a=e.projectRequirementsData,t=e.setProjectRequirementsData,r=e.touched,o=e.errors,m=Object(M.a)().data,d=Object(l.useMemo)((function(){return m.map((function(e){return{label:e.name,value:e.id}}))}),[m]),E=Object(k.a)().data,f=Object(l.useMemo)((function(){return E.map((function(e){return{label:e.name,value:e.id}}))}),[E]),x=Object(w.a)().data,y=Object(l.useMemo)((function(){return x.map((function(e){return{label:e.name,value:e.id}}))}),[x]),j=Object(l.useCallback)((function(e){t((function(a){return Object(n.a)(Object(n.a)({},a),{},{skills:null!==e&&void 0!==e?e:[]})}))}),[t]),N=Object(l.useCallback)((function(e){t((function(a){return Object(n.a)(Object(n.a)({},a),{},{degree:null!==e&&void 0!==e?e:[]})}))}),[t]),O=Object(l.useCallback)((function(e){var a=e.target.value;t((function(e){return Object(n.a)(Object(n.a)({},e),{},{yearExperience:a})}))}),[t]),v=Object(l.useCallback)((function(e){t((function(a){return Object(n.a)(Object(n.a)({},a),{},{education:null!==e&&void 0!==e?e:[]})}))}),[t]);return c.a.createElement(u.a,{className:"shadow-sm"},c.a.createElement(p.a,null,c.a.createElement(i.a,{className:"px-5"},c.a.createElement(s.a,{xs:"12",className:"mb-3"},c.a.createElement("div",{className:"font-xl font-weight-bold"},"REQUIREMENTS")),c.a.createElement(s.a,{xs:"12"},c.a.createElement(i.a,{className:"my-3"},c.a.createElement(s.a,{xs:"12",md:"4",lg:"3",className:"d-flex align-items-center"},c.a.createElement(g.a,{for:"skills"},"Skiils")),c.a.createElement(s.a,{xs:"12",md:"8",lg:"9"},c.a.createElement(D.a,{closeMenuOnSelect:!1,options:d,isClearable:!0,isMulti:!0,placeholder:"Choose some skills...",onChange:function(e){return j(e)},components:{DropdownIndicator:function(){return null},IndicatorSeparator:function(){return null}},value:a.skills}),r.skills&&o.skills&&c.a.createElement("small",{className:"text-danger"},o.skills))),c.a.createElement(i.a,{className:"my-3"},c.a.createElement(s.a,{xs:"12",md:"4",lg:"3",className:"d-flex align-items-center"},c.a.createElement(g.a,{for:"yearExperience"},"Minimum years of experience")),c.a.createElement(s.a,{xs:"12",md:"8",lg:"9"},c.a.createElement(b.a,{type:"number",name:"yearExperience",id:"yearExperience",value:a.yearExperience,onChange:function(e){return O(e)},placeholder:"Budget Field..."}),r.yearExperience&&o.yearExperience&&c.a.createElement("small",{className:"text-danger"},o.yearExperience))),c.a.createElement(i.a,{className:"my-3"},c.a.createElement(s.a,{xs:"12",md:"4",lg:"3",className:"d-flex align-items-center"},c.a.createElement(g.a,{for:"degree"},"Degree")),c.a.createElement(s.a,{xs:"12",md:"8",lg:"9"},c.a.createElement(D.a,{options:f,placeholder:"Choose a degree...",value:a.degree,onChange:function(e){return N(e)},components:{DropdownIndicator:function(){return null},IndicatorSeparator:function(){return null}}}),r.degree&&o.degree&&c.a.createElement("small",{className:"text-danger"},o.degree))),c.a.createElement(i.a,{className:"my-3"},c.a.createElement(s.a,{xs:"12",md:"4",lg:"3",className:"d-flex align-items-center"},c.a.createElement(g.a,{for:"education"},"Field of study")),c.a.createElement(s.a,{xs:"12",md:"8",lg:"9"},c.a.createElement(D.a,{options:y,placeholder:"Choose a education field...",value:a.education,onChange:function(e){return v(e)},components:{DropdownIndicator:function(){return null},IndicatorSeparator:function(){return null}}}),r.education&&o.education&&c.a.createElement("small",{className:"text-danger"},o.education)))))))};a.default=function(e){var a=Object(l.useState)(!1),t=Object(r.a)(a,2),n=t[0],u=t[1],p=Object(j.a)({initialValues:{projectName:"",projectOwnerVisibility:"",sector:"",description:"",duration:0,budget:0,budgetVisibility:"",completionDate:"",closingDate:"",skills:[],yearExperience:0,degree:"",education:""},validationSchema:function(){return N.d().shape({projectName:N.g().required().label("Business Name"),projectOwnerVisibility:N.g().required().label("Project Owner Visibility"),sector:N.g().required().label("Sector"),description:N.g().required().label("Description"),duration:N.c().min(1,"Min value 1.").label("Duration"),budget:N.c().min(1,"Min value 1.").label("budget"),budgetVisibility:N.g().required().label("Budget Visibility"),completionDate:N.g().required().label("Completion Date"),closingDate:N.g().required().label("Tender Closing Date"),skills:N.g().required().label("Skills Requirements"),yearExperience:N.c().min(1,"Min value 1.").label("Year Experience"),degree:N.g().required().label("Degree"),education:N.g().required().label("Education Field")})},onSubmit:function(e,a){var t=a.setSubmitting;a.setErrors;t(!0),C.a.post("v1/project",{name:e.projectName,isOwnerDisplayed:"displayed"===e.projectOwnerVisibility,idSector:e.sector.value,description:e.description,duration:e.duration,budget:e.budget,isBudgetVisible:"displayed"===e.budgetVisibility,completeDate:e.completionDate,closingDate:e.closingDate,idEducationDegree:e.degree.value,idEducationField:e.education.value,minYearExp:e.yearExperience,requirementSkills:e.skills.map((function(e){return{idSkill:e.value}}))}).then((function(e){h.a.success("Create Project Successfully")})).catch((function(e){h.a.error("Create project failed.")})).finally((function(){u(!n),t(!1)}))}}),g=p.values,b=p.touched,E=p.errors,f=p.setValues,x=p.handleSubmit,y=p.isSubmitting;return c.a.createElement("div",null,c.a.createElement(i.a,null,c.a.createElement(s.a,{xs:"12"},c.a.createElement(S,{projectInformationData:g,setProjectInformationData:f,touched:b,errors:E})),c.a.createElement(s.a,{xs:"12"},c.a.createElement(Y,{projectRequirementsData:g,setProjectRequirementsData:f,touched:b,errors:E})),c.a.createElement(s.a,{xs:"12",className:"d-flex justify-content-end"},c.a.createElement(o.a,{color:"secondary",className:"mr-2"},"Cancel"),c.a.createElement(o.a,{color:"primary",onClick:function(){return u(!n)}},"Create"))),c.a.createElement(m.a,{isOpen:n,centered:!0,toggle:function(){return u(!n)}},c.a.createElement(d.a,{className:"p-5"},c.a.createElement(i.a,null,c.a.createElement(s.a,{xs:"12",className:"mb-5"},"Are you sure with this data?"),c.a.createElement(s.a,{xs:"12",className:"d-flex justify-content-end"},c.a.createElement(o.a,{color:"secondary",className:"mr-2",onClick:function(){return u(!n)}},"Cancel"),c.a.createElement(o.a,{color:"primary",disabled:y,onClick:x},"Create"))))))}}}]);
//# sourceMappingURL=18.82b10697.chunk.js.map