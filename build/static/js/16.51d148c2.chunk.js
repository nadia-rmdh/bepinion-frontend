(this.webpackJsonppplatform=this.webpackJsonppplatform||[]).push([[16],{402:function(e,t,a){"use strict";a.d(t,"b",(function(){return l})),a.d(t,"a",(function(){return i}));var r=a(409),n=a.n(r);function l(e){for(var t="",a=e.toString().split("").reverse().join(""),r=0;r<a.length;r++)r%3===0&&(t+=a.substr(r,3)+".");return t.split("",t.length-1).reverse().join("")}function i(e){for(var t=[{divider:1e18,suffix:"E"},{divider:1e15,suffix:"P"},{divider:1e12,suffix:"T"},{divider:1e9,suffix:"G"},{divider:1e6,suffix:"M"},{divider:1e3,suffix:"k"}],a=0;a<t.length;a++)if(e>=t[a].divider)return(e/t[a].divider).toString()+t[a].suffix;return e.toString()}n.a.register("locale","indonesia",{delimiters:{thousands:".",decimal:","},abbreviations:{thousand:"rb",million:"jt",billion:"M",trillion:"T"},ordinal:function(e){return 1===e?"er":"\xe8me"},currency:{symbol:"IDR"}}),n.a.locale("indonesia")},456:function(e,t,a){"use strict";var r=a(0),n=a.n(r),l=function(){return(l=Object.assign||function(e){for(var t,a=1,r=arguments.length;a<r;a++)for(var n in t=arguments[a])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}).apply(this,arguments)};function i(e,t,a){if(a||2===arguments.length)for(var r,n=0,l=t.length;n<l;n++)!r&&n in t||(r||(r=Array.prototype.slice.call(t,0,n)),r[n]=t[n]);return e.concat(r||t)}var c=function(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")},o={k:1e3,m:1e6,b:1e9},s=function(e){var t=e.value,a=e.groupSeparator,r=void 0===a?",":a,n=e.decimalSeparator,l=void 0===n?".":n,s=e.allowDecimals,m=void 0===s||s,u=e.decimalsLimit,d=void 0===u?2:u,p=e.allowNegativeValue,g=void 0===p||p,f=e.disableAbbreviations,b=void 0!==f&&f,E=e.prefix,v=void 0===E?"":E;if("-"===t)return t;var x=b?[]:["k","m","b"],h=new RegExp("((^|\\D)-\\d)|(-"+c(v)+")").test(t),y=RegExp("(\\d+)-?"+c(v)).exec(t)||[],j=y[0],N=y[1],O=function(e,t){var a=c(t.join("")),r=new RegExp("[^\\d"+a+"]","gi");return e.replace(r,"")}(function(e,t){void 0===t&&(t=",");var a=new RegExp(c(t),"g");return e.replace(a,"")}(v?j?t.replace(j,"").concat(N):t.replace(v,""):t,r),i([r,l],x)),C=O;if(!b){if(x.some((function(e){return e===O.toLowerCase()})))return"";var D=function(e,t){void 0===t&&(t=".");var a=new RegExp("(\\d+("+c(t)+"\\d*)?)([kmb])$","i"),r=e.match(a);if(r){var n=r[1],l=r[3],i=o[l.toLowerCase()];return Number(n.replace(t,"."))*i}}(O,l);D&&(C=String(D))}var w=h&&g?"-":"";if(l&&C.includes(l)){var S=O.split(l),k=S[0],V=S[1],M=d&&V?V.slice(0,d):V;return""+w+k+(m?""+l+M:"")}return""+w+C},m=function(e,t){var a=t.groupSeparator,r=void 0===a?",":a,n=t.decimalSeparator,l=void 0===n?".":n,i=new RegExp("\\d([^"+c(r)+c(l)+"0-9]+)"),o=e.match(i);return o?o[1]:void 0},u=function(e){var t=e.value,a=e.decimalSeparator,r=e.intlConfig,n=e.decimalScale,i=e.prefix,o=void 0===i?"":i,s=e.suffix,u=void 0===s?"":s;if(""===t||void 0===t)return"";if("-"===t)return"-";var g=new RegExp("^\\d?-"+(o?c(o)+"?":"")+"\\d").test(t),f="."!==a?d(t,a,g):t,b=(r?new Intl.NumberFormat(r.locale,r.currency?{style:"currency",currency:r.currency,minimumFractionDigits:n||0,maximumFractionDigits:20}:void 0):new Intl.NumberFormat(void 0,{minimumFractionDigits:n||0,maximumFractionDigits:20})).formatToParts(Number(f)),E=p(b,e),v=m(E,l({},e)),x=t.slice(-1)===a?a:"",h=(f.match(RegExp("\\d+\\.(\\d+)"))||[])[1];return void 0===n&&h&&a&&(E=E.includes(a)?E.replace(RegExp("(\\d+)("+c(a)+")(\\d+)","g"),"$1$2"+h):v&&!u?E.replace(v,""+a+h+v):""+E+a+h),u&&x?""+E+x+u:v&&x?E.replace(v,""+x+v):v&&u?E.replace(v,""+x+u):[E,x,u].join("")},d=function(e,t,a){var r=e;return t&&"."!==t&&(r=r.replace(RegExp(c(t),"g"),"."),a&&"-"===t&&(r="-"+r.slice(1))),r},p=function(e,t){var a=t.prefix,r=t.groupSeparator,n=t.decimalSeparator,l=t.decimalScale,c=t.disableGroupSeparators,o=void 0!==c&&c;return e.reduce((function(e,t,c){var s=t.type,m=t.value;return 0===c&&a?"minusSign"===s?[m,a]:"currency"===s?i(i([],e),[a]):[a,m]:"currency"===s?a?e:i(i([],e),[m]):"group"===s?o?e:i(i([],e),[void 0!==r?r:m]):"decimal"===s?void 0!==l&&0===l?e:i(i([],e),[void 0!==n?n:m]):i(i([],e),"fraction"===s?[void 0!==l?m.slice(0,l):m]:[m])}),[""]).join("")},g={currencySymbol:"",groupSeparator:"",decimalSeparator:"",prefix:"",suffix:""},f=function(e){return RegExp(/\d/,"gi").test(e)},b=Object(r.forwardRef)((function(e,t){var a=e.allowDecimals,i=void 0===a||a,c=e.allowNegativeValue,o=void 0===c||c,d=e.id,p=e.name,b=e.className,E=e.customInput,v=e.decimalsLimit,x=e.defaultValue,h=e.disabled,y=void 0!==h&&h,j=e.maxLength,N=e.value,O=e.onValueChange,C=e.fixedDecimalLength,D=e.placeholder,w=e.decimalScale,S=e.prefix,k=e.suffix,V=e.intlConfig,M=e.step,A=e.min,T=e.max,I=e.disableGroupSeparators,q=void 0!==I&&I,P=e.disableAbbreviations,R=void 0!==P&&P,Y=e.decimalSeparator,F=e.groupSeparator,L=e.onChange,U=e.onFocus,W=e.onBlur,B=e.onKeyDown,K=e.onKeyUp,G=function(e,t){var a={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(a[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var n=0;for(r=Object.getOwnPropertySymbols(e);n<r.length;n++)t.indexOf(r[n])<0&&Object.prototype.propertyIsEnumerable.call(e,r[n])&&(a[r[n]]=e[r[n]])}return a}(e,["allowDecimals","allowNegativeValue","id","name","className","customInput","decimalsLimit","defaultValue","disabled","maxLength","value","onValueChange","fixedDecimalLength","placeholder","decimalScale","prefix","suffix","intlConfig","step","min","max","disableGroupSeparators","disableAbbreviations","decimalSeparator","groupSeparator","onChange","onFocus","onBlur","onKeyDown","onKeyUp"]);if(Y&&f(Y))throw new Error("decimalSeparator cannot be a number");if(F&&f(F))throw new Error("groupSeparator cannot be a number");var $=Object(r.useMemo)((function(){return function(e){var t=e||{},a=t.locale,r=t.currency;return(a?new Intl.NumberFormat(a,r?{currency:r,style:"currency"}:void 0):new Intl.NumberFormat).formatToParts(1000.1).reduce((function(e,t,a){return"currency"===t.type?l(l({},e),0===a?{currencySymbol:t.value,prefix:t.value}:{currencySymbol:t.value,suffix:t.value}):"group"===t.type?l(l({},e),{groupSeparator:t.value}):"decimal"===t.type?l(l({},e),{decimalSeparator:t.value}):e}),g)}(V)}),[V]),J=Y||$.decimalSeparator||"",H=F||$.groupSeparator||"";if(J&&H&&J===H&&!1===q)throw new Error("decimalSeparator cannot be the same as groupSeparator");var Q={decimalSeparator:J,groupSeparator:H,disableGroupSeparators:q,intlConfig:V,prefix:S||$.prefix,suffix:k},z={decimalSeparator:J,groupSeparator:H,allowDecimals:i,decimalsLimit:v||C||2,allowNegativeValue:o,disableAbbreviations:R,prefix:S||$.prefix},X=void 0!==x&&null!==x?u(l(l({},Q),{decimalScale:w,value:String(x)})):void 0!==N&&null!==N?u(l(l({},Q),{decimalScale:w,value:String(N)})):"",Z=Object(r.useState)(X),_=Z[0],ee=Z[1],te=Object(r.useState)(!1),ae=te[0],re=te[1],ne=Object(r.useState)(0),le=ne[0],ie=ne[1],ce=t||Object(r.useRef)(null),oe=function(e,t){re(!0);var a=s(l({value:e},z));if(!(j&&a.replace(/-/g,"").length>j)){if(""===a||"-"===a||a===J)return O&&O(void 0,p,{float:null,formatted:"",value:""}),void ee(a);var r=parseFloat(a.replace(J,".")),n=u(l({value:a},Q));if(void 0!==t&&null!==t){var i=t+(n.length-e.length)||1;ie(i)}if(ee(n),O)O(a,p,{float:r,formatted:n,value:a})}};Object(r.useEffect)((function(){ae&&"-"!==_&&ce&&"object"===typeof ce&&ce.current&&ce.current.setSelectionRange(le,le)}),[_,le,ce,ae]);var se=l({type:"text",inputMode:"decimal",id:d,name:p,className:b,onChange:function(e){var t=e.target,a=t.value,r=t.selectionStart;oe(a,r),L&&L(e)},onBlur:function(e){var t=e.target.value,a=s(l({value:t},z));if("-"===a||!a)return ee(""),void(W&&W(e));var r=function(e,t,a){if(void 0===t&&(t="."),void 0===a||""===e||void 0===e)return e;if(!e.match(/\d/g))return"";var r=e.split(t),n=r[0],l=r[1];if(0===a)return n;var i=l||"";if(i.length<a)for(;i.length<a;)i+="0";else i=i.slice(0,a);return""+n+t+i}(function(e,t,a){if(a&&e.length>1){if(e.includes(t)){var r=e.split(t),n=r[0];if((l=r[1]).length>a)return""+n+t+l.slice(0,a)}var l,i=e.length>a?new RegExp("(\\d+)(\\d{"+a+"})"):new RegExp("(\\d)(\\d+)"),c=e.match(i);if(c)return""+(n=c[1])+t+(l=c[2])}return e}(a,J,C),J,void 0!==w?w:C),n=parseFloat(r.replace(J,".")),i=u(l(l({},Q),{value:r}));O&&O(r,p,{float:n,formatted:i,value:r}),ee(i),W&&W(e)},onFocus:function(e){return U&&U(e),_?_.length:0},onKeyDown:function(e){var t=e.key;if(M&&("ArrowUp"===t||"ArrowDown"===t)){e.preventDefault(),ie(_.length);var a=parseFloat(void 0!==N&&null!==N?String(N).replace(J,"."):s(l({value:_},z)))||0,r="ArrowUp"===t?a+M:a-M;if(void 0!==A&&r<A)return;if(void 0!==T&&r>T)return;var n=String(M).includes(".")?Number(String(M).split(".")[1].length):void 0;oe(String(n?r.toFixed(n):r).replace(".",J))}B&&B(e)},onKeyUp:function(e){var t=e.key,a=e.currentTarget.selectionStart;if("ArrowUp"!==t&&"ArrowDown"!==t&&"-"!==_){var r=m(_,{groupSeparator:H,decimalSeparator:J});if(r&&a&&a>_.length-r.length&&ce&&"object"===typeof ce&&ce.current){var n=_.length-r.length;ce.current.setSelectionRange(n,n)}}K&&K(e)},placeholder:D,disabled:y,value:void 0!==N&&null!==N&&"-"!==_&&_!==J?u(l(l({},Q),{decimalScale:ae?void 0:w,value:String(N)})):_,ref:ce},G);if(E){var me=E;return n.a.createElement(me,l({},se))}return n.a.createElement("input",l({},se))}));b.displayName="CurrencyInput",t.a=b},795:function(e,t,a){"use strict";a.r(t);var r=a(2),n=a(11),l=a(0),i=a.n(l),c=a(383),o=a(388),s=a(382),m=a(394),u=a(381),d=a(390),p=a(391),g=a(385),f=a(386),b=a(83),E=a(4),v=a(20),x=a(22),h=a(1),y=a.n(h),j=a(6),N=a.n(j),O=a(535),C=function(e){var t=N()("tooltip","show",e.popperClassName),a=N()("tooltip-inner",e.innerClassName);return i.a.createElement(O.a,Object(E.a)({},e,{popperClassName:t,innerClassName:a}))};C.propTypes=O.b,C.defaultProps={placement:"top",autohide:!0,placementPrefix:"bs-tooltip",trigger:"hover focus"};var D=C,w=a(3);function S(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}var k=["defaultOpen"],V=function(e){function t(t){var a;return(a=e.call(this,t)||this).state={isOpen:t.defaultOpen||!1},a.toggle=a.toggle.bind(Object(v.a)(a)),a}Object(x.a)(t,e);var a=t.prototype;return a.toggle=function(){this.setState({isOpen:!this.state.isOpen})},a.render=function(){return i.a.createElement(D,Object(E.a)({isOpen:this.state.isOpen,toggle:this.toggle},Object(w.n)(this.props,k)))},t}(l.Component);V.propTypes=function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?S(Object(a),!0).forEach((function(t){Object(b.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):S(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({defaultOpen:y.a.bool},D.propTypes);var M=a(392),A=a(393),T=a(217),I=a(395),q=a(27),P=a(9),R=a(24),Y=a(59),F=a(21),L=a(17),U=a(174),W=a(175),B=a(52),K=a(82),G=a(18),$=a(157),J=a(37),H=a.n(J),Q=a(111),z=a(26),X=a(86),Z=a.n(X),_=a(456),ee=a(402);var te=function(e){var t=e.projectInformationData,a=e.setProjectInformationData,n=e.touched,s=e.errors,m=Object(B.a)().data,u=Object(l.useMemo)((function(){return m.map((function(e){return{label:e.name,value:e.id}}))}),[m]),b=Object(l.useCallback)((function(e){var t=e.target.value;a((function(e){return Object(r.a)(Object(r.a)({},e),{},{projectName:t})}))}),[a]),E=Object(l.useCallback)((function(e){var t=e.target,n=t.value,l=t.checked;a((function(e){return Object(r.a)(Object(r.a)({},e),{},{projectOwnerVisibility:l?n:""})}))}),[a]),v=Object(l.useCallback)((function(e){a((function(t){return Object(r.a)(Object(r.a)({},t),{},{sectors:null!==e&&void 0!==e?e:[]})}))}),[a]),x=Object(l.useCallback)((function(e){var t=e.target.value;a((function(e){return Object(r.a)(Object(r.a)({},e),{},{description:t})}))}),[a]),h=Object(l.useCallback)((function(e){var t=e.target.value;a((function(e){return Object(r.a)(Object(r.a)({},e),{},{prerequisite:t})}))}),[a]);return i.a.createElement(d.a,{className:"shadow-sm"},i.a.createElement(p.a,null,i.a.createElement(c.a,{className:"px-md-5"},i.a.createElement(o.a,{xs:"12",className:"mb-3"},i.a.createElement("div",{className:"font-xl font-weight-bold"},"PROJECT INFORMATION")),i.a.createElement(o.a,{xs:"12"},i.a.createElement(c.a,{className:"my-3"},i.a.createElement(o.a,{xs:"12",md:"4",lg:"3",className:"d-flex align-items-center"},i.a.createElement(g.a,{for:"projectName"},"Project Name")),i.a.createElement(o.a,{xs:"12",md:"8",lg:"9"},i.a.createElement(f.a,{type:"text",name:"projectName",id:"projectName",value:t.projectName,onChange:function(e){return b(e)}}),n.projectName&&s.projectName&&i.a.createElement("small",{className:"text-danger"},s.projectName))),i.a.createElement(c.a,{className:"my-3"},i.a.createElement(o.a,{xs:"12",md:"4",lg:"3",className:"d-flex align-items-center"},i.a.createElement(g.a,{for:"projectOwnerVisibility",className:"m-0"},"Project Owner Visibility"),i.a.createElement(z.a,{icon:"question-circle",id:"projectOwnerVisibilityTooltip",className:"text-pinion-primary ml-1"}),i.a.createElement(V,{target:"projectOwnerVisibilityTooltip"},"You may choose to hide your name/company in the bidding stage. It will only be disclosed to the appointed party when the project is still open.")),i.a.createElement(o.a,{xs:"12",md:"8",lg:"9"},i.a.createElement("div",{className:"d-flex"},i.a.createElement(M.a,null,i.a.createElement(A.a,{addonType:"prepend"},i.a.createElement(T.a,{className:"bg-transparent border-0 px-0"},i.a.createElement(I.a,{type:"radio",id:"displayed",value:"displayed",checked:"displayed"===t.projectOwnerVisibility,onChange:function(e){return E(e)}}))),i.a.createElement(g.a,{for:"displayed",className:"d-flex bg-transparent p-1 m-0 align-items-center"},"Displayed")),i.a.createElement(M.a,null,i.a.createElement(A.a,{addonType:"prepend"},i.a.createElement(T.a,{className:"bg-transparent border-0 px-0"},i.a.createElement(I.a,{type:"radio",id:"undisclosed",value:"undisclosed",checked:"undisclosed"===t.projectOwnerVisibility,onChange:function(e){return E(e)}}))),i.a.createElement(g.a,{for:"undisclosed",className:"d-flex bg-transparent p-1 m-0 align-items-center"},"Undisclosed"))),n.projectOwnerVisibility&&s.projectOwnerVisibility&&i.a.createElement("small",{className:"text-danger"},s.projectOwnerVisibility))),i.a.createElement(c.a,{className:"my-3"},i.a.createElement(o.a,{xs:"12",md:"4",lg:"3",className:"d-flex align-items-center"},i.a.createElement(g.a,{for:"sector"},"Sector")),i.a.createElement(o.a,{xs:"12",md:"8",lg:"9"},i.a.createElement(R.a,{closeMenuOnSelect:!1,isClearable:!0,isMulti:!0,options:u,placeholder:"Choose max 3 sectors...",value:t.sectors,onChange:function(e){return v(e)},components:{DropdownIndicator:function(){return null},IndicatorSeparator:function(){return null}},isOptionDisabled:function(e){return t.sectors.length>=3}}),n.sector&&s.sector&&i.a.createElement("small",{className:"text-danger"},s.sector))),i.a.createElement(c.a,{className:"my-3"},i.a.createElement(o.a,{xs:"12",className:"d-flex align-items-center"},i.a.createElement(g.a,{for:"description",className:"mb-1"},"Description")),i.a.createElement(o.a,{xs:"12",className:"mb-3"},i.a.createElement("small",{className:"text-muted"},"1. Tell us about the background story of this project. ",i.a.createElement("br",null),"2. Tell us about your objectives of this project. ",i.a.createElement("br",null),"3. Tell us about the important decisions you need to make based on the result of this project. ",i.a.createElement("br",null),"4. Tell us where to focus our attention to. ",i.a.createElement("br",null),"5. Tell us about the boundary conditions of this issue (if any). ",i.a.createElement("br",null))),i.a.createElement(o.a,{xs:"12"},i.a.createElement(Y.a,{minRows:5,name:"description",id:"description",className:"form-control",value:t.description,onChange:function(e){return x(e)}}),n.description&&s.description&&i.a.createElement("small",{className:"text-danger"},s.description))),i.a.createElement(c.a,{className:"my-3"},i.a.createElement(o.a,{xs:"12",className:"d-flex align-items-center"},i.a.createElement(g.a,{for:"prerequisite"},"Supporting Materials")),i.a.createElement(o.a,{xs:"12"},i.a.createElement(Y.a,{minRows:5,name:"prerequisite",id:"prerequisite",className:"form-control",value:t.prerequisite,onChange:function(e){return h(e)}}),n.prerequisite&&s.prerequisite&&i.a.createElement("small",{className:"text-danger"},s.prerequisite)))))))},ae=function(e){var t=e.projectScheduleData,a=e.setProjectScheduleData,n=e.touched,s=e.errors,m=Object(l.useCallback)((function(e){var t=e.target.value;a((function(e){return Object(r.a)(Object(r.a)({},e),{},{duration:t})}))}),[a]);return i.a.createElement(d.a,{className:"shadow-sm"},i.a.createElement(p.a,null,i.a.createElement(c.a,{className:"px-md-5"},i.a.createElement(o.a,{xs:"12",className:"mb-3"},i.a.createElement("div",{className:"font-xl font-weight-bold"},"PROJECT SCHEDULE")),i.a.createElement(o.a,{xs:"12"},i.a.createElement(c.a,{className:"my-3"},i.a.createElement(o.a,{xs:"12",md:"4",lg:"3",className:"d-flex align-items-center"},i.a.createElement(g.a,{for:"duration"},"Meeting Duration")),i.a.createElement(o.a,{xs:"12",md:"8",lg:"9"},i.a.createElement(M.a,null,i.a.createElement(A.a,{addonType:"prepend"},i.a.createElement(f.a,{type:"number",name:"duration",id:"duration",value:t.duration,onChange:function(e){return m(e)},onWheel:function(e){e.target.blur()}}),i.a.createElement(T.a,null,"hours"))),n.duration&&s.duration&&i.a.createElement("small",{className:"text-danger"},s.duration)))),i.a.createElement(o.a,{xs:"12",className:"mt-5"},i.a.createElement(le,{projectTimelinesData:t,setProjectTimelinesData:a,touched:n,errors:s})))))},re=function(e){var t=e.projectRequirementsData,a=e.setProjectRequirementsData,n=e.touched,s=e.errors,m=Object(K.a)().data,u=Object(l.useMemo)((function(){return m.map((function(e){return{label:e.name,value:e.id}}))}),[m]),b=Object(U.a)().data,E=Object(l.useMemo)((function(){return b.map((function(e){return{label:e.name,value:e.id}}))}),[b]),v=Object(W.a)().data,x=Object(l.useMemo)((function(){return v.map((function(e){return{label:e.name,value:e.id}}))}),[v]),h=Object(l.useCallback)((function(e){a((function(t){return Object(r.a)(Object(r.a)({},t),{},{skills:null!==e&&void 0!==e?e:[]})}))}),[a]),y=Object(l.useCallback)((function(e){a((function(t){return Object(r.a)(Object(r.a)({},t),{},{degree:null!==e&&void 0!==e?e:[]})}))}),[a]),j=Object(l.useCallback)((function(e){var t=e.target.value;a((function(e){return Object(r.a)(Object(r.a)({},e),{},{yearExperience:t})}))}),[a]),N=Object(l.useCallback)((function(e){a((function(t){return Object(r.a)(Object(r.a)({},t),{},{education:null!==e&&void 0!==e?e:[]})}))}),[a]);return i.a.createElement(d.a,{className:"shadow-sm"},i.a.createElement(p.a,null,i.a.createElement(c.a,{className:"px-md-5"},i.a.createElement(o.a,{xs:"12",className:"mb-3"},i.a.createElement("div",{className:"font-xl font-weight-bold"},"CONSULTANT REQUIREMENTS")),i.a.createElement(o.a,{xs:"12"},i.a.createElement(c.a,{className:"my-3"},i.a.createElement(o.a,{xs:"12",md:"4",lg:"3",className:"d-flex align-items-center"},i.a.createElement(g.a,{for:"skills"},"Skiils")),i.a.createElement(o.a,{xs:"12",md:"8",lg:"9"},i.a.createElement(R.a,{closeMenuOnSelect:!1,options:u,isClearable:!0,isMulti:!0,onChange:function(e){return h(e)},components:{DropdownIndicator:function(){return null},IndicatorSeparator:function(){return null}},value:t.skills}),n.skills&&s.skills&&i.a.createElement("small",{className:"text-danger"},s.skills))),i.a.createElement(c.a,{className:"my-3"},i.a.createElement(o.a,{xs:"12",md:"4",lg:"3",className:"d-flex align-items-center"},i.a.createElement(g.a,{for:"yearExperience"},"Minimum years of experience")),i.a.createElement(o.a,{xs:"12",md:"8",lg:"9"},i.a.createElement(f.a,{type:"number",name:"yearExperience",id:"yearExperience",value:t.yearExperience,onChange:function(e){return j(e)},onWheel:function(e){e.target.blur()}}),n.yearExperience&&s.yearExperience&&i.a.createElement("small",{className:"text-danger"},s.yearExperience))),i.a.createElement(c.a,{className:"my-3"},i.a.createElement(o.a,{xs:"12",md:"4",lg:"3",className:"d-flex align-items-center"},i.a.createElement(g.a,{for:"degree"},"Degree")),i.a.createElement(o.a,{xs:"12",md:"8",lg:"9"},i.a.createElement(R.a,{options:E,value:t.degree,onChange:function(e){return y(e)},components:{DropdownIndicator:function(){return null},IndicatorSeparator:function(){return null}}}),n.degree&&s.degree&&i.a.createElement("small",{className:"text-danger"},s.degree))),i.a.createElement(c.a,{className:"my-3"},i.a.createElement(o.a,{xs:"12",md:"4",lg:"3",className:"d-flex align-items-center"},i.a.createElement(g.a,{for:"education"},"Field of study")),i.a.createElement(o.a,{xs:"12",md:"8",lg:"9"},i.a.createElement(R.a,{options:x,value:t.education,onChange:function(e){return N(e)},components:{DropdownIndicator:function(){return null},IndicatorSeparator:function(){return null}}}),n.education&&s.education&&i.a.createElement("small",{className:"text-danger"},s.education)))))))},ne=function(e){var t=e.projectDetailsData,a=e.setProjectDetailsData,s=e.touched,m=e.errors,u=e.authUser,f=Object(l.useState)(u.smcv),b=Object(n.a)(f,2),E=b[0],v=b[1],x=Object(l.useCallback)((function(e){var t=parseInt(null!==e&&void 0!==e?e:u.smcv);v(t),a((function(e){return Object(r.a)(Object(r.a)({},e),{},{minimumContractValue:t})}))}),[a,u]),h=Object(l.useCallback)((function(e){a((function(t){return Object(r.a)(Object(r.a)({},t),{},{estimatedContractValue:parseInt(e)})}))}),[a]),y=Object(l.useCallback)((function(e){var t=e.target.value;a((function(e){return Object(r.a)(Object(r.a)({},e),{},{budgetVisibility:t})}))}),[a]);return i.a.createElement(d.a,{className:"shadow-sm"},i.a.createElement(p.a,null,i.a.createElement(c.a,{className:"px-md-5"},i.a.createElement(o.a,{xs:"12",className:"mb-3"},i.a.createElement("div",{className:"font-xl font-weight-bold"},"COMMERCIAL DETAILS")),i.a.createElement(o.a,{xs:"12"},i.a.createElement(c.a,{className:"my-3"},i.a.createElement(o.a,{xs:"12",md:"4",lg:"3",className:"d-flex align-items-center"},i.a.createElement(g.a,{for:"minimumContractValue",className:"m-0"},"Minimum Contract Value (Optional)"),i.a.createElement(z.a,{icon:"question-circle",id:"minimumContractValueTooltip",className:"text-pinion-primary ml-1"}),i.a.createElement(V,{target:"minimumContractValueTooltip"},"A minimum contract value of Rp ",Object(ee.b)(null!==E&&void 0!==E?E:null===u||void 0===u?void 0:u.smcv)," is required. If it is deemed to low, Client is able to determine a user defined minimum contract value to filter out applicants.")),i.a.createElement(o.a,{xs:"12",md:"8",lg:"9"},i.a.createElement(M.a,null,i.a.createElement(A.a,{addonType:"prepend"},i.a.createElement(T.a,null,"IDR"),i.a.createElement(_.a,{placeholder:"Min. value ".concat(Object(ee.b)(null!==E&&void 0!==E?E:null===u||void 0===u?void 0:u.smcv)),decimalsLimit:2,groupSeparator:".",decimalSeparator:",",onValueChange:function(e){return x(e)},className:"form-control"}))),E>0&&E<u.smcv&&i.a.createElement("small",{className:"text-danger"},"Min. value ",Object(ee.b)(E)))),i.a.createElement(c.a,{className:"my-3"},i.a.createElement(o.a,{xs:"12",md:"4",lg:"3",className:"d-flex align-items-center"},i.a.createElement(g.a,{for:"estimatedContractValue",className:"m-0"},"Estimated Contract Value"),i.a.createElement(z.a,{icon:"question-circle",id:"estimatedContractValueTooltip",className:"text-pinion-primary ml-1"}),i.a.createElement(V,{target:"estimatedContractValueTooltip"},"Client is required to enter the estimated contract value to provide gauge for service fees expected from applicants.")),i.a.createElement(o.a,{xs:"12",md:"8",lg:"9"},i.a.createElement(M.a,null,i.a.createElement(A.a,{addonType:"prepend"},i.a.createElement(T.a,null,"IDR"),i.a.createElement(_.a,{placeholder:"Min. value ".concat(Object(ee.b)(null!==E&&void 0!==E?E:null===u||void 0===u?void 0:u.smcv)),decimalsLimit:2,groupSeparator:".",decimalSeparator:",",onValueChange:function(e){return h(e)},className:"form-control"}))),(s.estimatedContractValue&&m.estimatedContractValue||t.estimatedContractValue>0&&t.estimatedContractValue<E)&&i.a.createElement("small",{className:"text-danger"},"Min. value ",Object(ee.b)(E)))),i.a.createElement(c.a,{className:"my-3"},i.a.createElement(o.a,{xs:"12",md:"4",lg:"3",className:"d-flex align-items-center"},i.a.createElement(g.a,{for:"budgetVisibility",className:"m-0"},"Budget Visibility"),i.a.createElement(z.a,{icon:"question-circle",id:"budgetVisibilityTooltip",className:"text-pinion-primary ml-1"}),i.a.createElement(V,{target:"budgetVisibilityTooltip"},"You may choose to hide the estimated contract value in the bidding stage. Applicants will propose their service fee based on their own discretion.")),i.a.createElement(o.a,{xs:"12",md:"8",lg:"9"},i.a.createElement("div",{className:"d-flex"},i.a.createElement(M.a,null,i.a.createElement(A.a,{addonType:"prepend"},i.a.createElement(T.a,{className:"bg-transparent border-0 px-0"},i.a.createElement(I.a,{type:"radio",id:"displayedbudget",value:"displayed",checked:"displayed"===t.budgetVisibility,onChange:function(e){return y(e)}}))),i.a.createElement(g.a,{for:"displayedbudget",className:"d-flex bg-transparent p-1 m-0 align-items-center"},"Displayed")),i.a.createElement(M.a,null,i.a.createElement(A.a,{addonType:"prepend"},i.a.createElement(T.a,{className:"bg-transparent border-0 px-0"},i.a.createElement(I.a,{type:"radio",id:"undisclosedbudget",value:"undisclosed",checked:"undisclosed"===t.budgetVisibility,onChange:function(e){return y(e)}}))),i.a.createElement(g.a,{for:"undisclosedbudget",className:"d-flex bg-transparent p-1 m-0 align-items-center"},"Undisclosed"))),s.budgetVisibility&&m.budgetVisibility&&i.a.createElement("small",{className:"text-danger"},m.budgetVisibility)))))))},le=function(e){var t=e.projectTimelinesData,a=e.setProjectTimelinesData,n=e.touched,s=e.errors,m=Object(l.useCallback)((function(e){a((function(t){return Object(r.a)(Object(r.a)({},t),{},{closingDate:e,meetingDate:new Date(H()(e).add(7,"days"))})}))}),[a]),u=Object(l.useCallback)((function(e){a((function(t){return Object(r.a)(Object(r.a)({},t),{},{meetingDate:e,completionDate:H()(e).add(7,"days")})}))}),[a]);return i.a.createElement(c.a,null,i.a.createElement(o.a,{xs:"12",className:"create-project-timeline p-0 p-md-3"},i.a.createElement($.ArcherContainer,null,i.a.createElement("div",{className:"text-center d-flex justify-content-between"},i.a.createElement("div",null,i.a.createElement("div",null,"Create Project"),i.a.createElement($.ArcherElement,{id:"step-1-1",relations:[]},i.a.createElement("div",{className:"mx-auto round-100 text-center d-flex justify-content-center align-items-center",style:{backgroundColor:"#000000",border:"solid 1px #000000",width:"10px",height:"10px"}})),i.a.createElement("div",{className:"mt-2",style:{height:"26px"}}),i.a.createElement($.ArcherElement,{id:"step-1",relations:[{targetId:"step-1-1",targetAnchor:"middle",sourceAnchor:"middle",style:{strokeColor:"#000000",strokeWidth:2,endMarker:!1}},{targetId:"step-2",targetAnchor:"middle",sourceAnchor:"middle",style:{strokeColor:"#20a8d7",strokeWidth:5,endMarker:!1}}]},i.a.createElement("div",{className:"mx-auto text-center d-flex justify-content-center align-items-center",style:{backgroundColor:"#000000",border:"solid 1px #000000",width:"10px",height:"10px"}})),i.a.createElement("span",{className:"mt-2"},i.a.createElement("br",null),H()().format("DD-MM-YYYY"))),i.a.createElement("div",null,i.a.createElement("span",{className:"mb-3"},i.a.createElement(Z.a,{required:!0,name:"startDate",selected:t.closingDate,onChange:function(e){return m(e)},className:"form-control",dateFormat:"dd MMMM yyyy",minDate:new Date,wrapperClassName:"form-control"}),n.closingDate&&s.closingDate&&i.a.createElement("small",{className:"text-danger"},s.closingDate)),i.a.createElement($.ArcherElement,{id:"step-2",relations:[{targetId:"step-2-1",targetAnchor:"middle",sourceAnchor:"middle",style:{strokeColor:"#000000",strokeWidth:2,endMarker:!1}},{targetId:"step-3",targetAnchor:"middle",sourceAnchor:"middle",style:{strokeColor:"#20a8d7",strokeWidth:5,endMarker:!1}}]},i.a.createElement("div",{className:"mx-auto text-center d-flex justify-content-center align-items-center",style:{backgroundColor:"#000000",border:"solid 1px #000000",width:"10px",height:"10px",marginTop:"30px"}})),i.a.createElement("div",{className:"mt-2",style:{height:"30px"}}),i.a.createElement($.ArcherElement,{id:"step-2-1",relations:[]},i.a.createElement("div",{className:"mx-auto round-100 text-center d-flex justify-content-center align-items-center",style:{backgroundColor:"#000000",border:"solid 1px #000000",width:"10px",height:"10px"}})),i.a.createElement("div",null,"Tender Closing Date")),i.a.createElement("div",null,i.a.createElement("div",null,"Project Environment"),i.a.createElement($.ArcherElement,{id:"step-3-1",relations:[]},i.a.createElement("div",{className:"mx-auto round-100 text-center d-flex justify-content-center align-items-center",style:{backgroundColor:"#000000",border:"solid 1px #000000",width:"10px",height:"10px"}})),i.a.createElement("div",{className:"mt-2",style:{height:"26px"}}),i.a.createElement($.ArcherElement,{id:"step-3",relations:[{targetId:"step-3-1",targetAnchor:"middle",sourceAnchor:"middle",style:{strokeColor:"#000000",strokeWidth:2,endMarker:!1}},{targetId:"step-4",targetAnchor:"middle",sourceAnchor:"middle",style:{strokeColor:"#20a8d7",strokeWidth:5,endMarker:!1}}]},i.a.createElement("div",{className:"mx-auto text-center d-flex justify-content-center align-items-center",style:{backgroundColor:"#000000",border:"solid 1px #000000",width:"10px",height:"10px"}})),i.a.createElement("span",{className:"mt-2"},i.a.createElement("br",null),t.meetingDate?H()(t.meetingDate).subtract(7,"day").format("DD-MM-YYYY"):"DD-MM-YYYY")),i.a.createElement("div",null,i.a.createElement("span",{className:"mb-3"},i.a.createElement(Z.a,{required:!0,name:"startDate",selected:t.meetingDate,onChange:function(e){return u(e)},className:"form-control",dateFormat:"dd MMMM yyyy",minDate:new Date(H()(t.closingDate).add(7,"day")),wrapperClassName:"form-control"}),n.meetingDate&&s.meetingDate&&i.a.createElement("small",{className:"text-danger"},s.meetingDate)),i.a.createElement($.ArcherElement,{id:"step-4",relations:[{targetId:"step-4-1",targetAnchor:"middle",sourceAnchor:"middle",style:{strokeColor:"#000000",strokeWidth:2,endMarker:!1}},{targetId:"step-5",targetAnchor:"middle",sourceAnchor:"middle",style:{strokeColor:"#20a8d7",strokeWidth:5,endMarker:!1}}]},i.a.createElement("div",{className:"mx-auto text-center d-flex justify-content-center align-items-center",style:{backgroundColor:"#000000",border:"solid 1px #000000",width:"10px",height:"10px",marginTop:"30px"}})),i.a.createElement("div",{className:"mt-2",style:{height:"26px"}}),i.a.createElement($.ArcherElement,{id:"step-4-1",relations:[]},i.a.createElement("div",{className:"mx-auto round-100 text-center d-flex justify-content-center align-items-center",style:{backgroundColor:"#000000",border:"solid 1px #000000",width:"10px",height:"10px"}})),i.a.createElement("div",null,"Meeting Date")),i.a.createElement("div",null,i.a.createElement("div",null,"Project Completion"),i.a.createElement($.ArcherElement,{id:"step-5-1",relations:[]},i.a.createElement("div",{className:"mx-auto round-100 text-center d-flex justify-content-center align-items-center",style:{backgroundColor:"#000000",border:"solid 1px #000000",width:"10px",height:"10px"}})),i.a.createElement("div",{className:"mt-2",style:{height:"26px"}}),i.a.createElement($.ArcherElement,{id:"step-5",relations:[{targetId:"step-5-1",targetAnchor:"middle",sourceAnchor:"middle",style:{strokeColor:"#000000",strokeWidth:2,endMarker:!1}}]},i.a.createElement("div",{className:"mx-auto text-center d-flex justify-content-center align-items-center",style:{backgroundColor:"#000000",border:"solid 1px #000000",width:"10px",height:"10px"}})),i.a.createElement("span",{className:"mt-2"},i.a.createElement("br",null),t.completionDate?t.completionDate.format("DD-MM-YYYY"):"DD-MM-YYYY"))))))};t.default=function(e){var t=Object(G.g)(),a=Object(Q.b)(),r=Object(l.useState)(!1),d=Object(n.a)(r,2),p=d[0],g=d[1],f=Object(q.a)({initialValues:{projectName:"",projectOwnerVisibility:"",sectors:[],description:"",prerequisite:"",duration:0,budget:a.smcv,minimumContractValue:0,estimatedContractValue:0,budgetVisibility:"",completionDate:"",closingDate:new Date,meetingDate:new Date(H()().add(7,"day")),skills:[],yearExperience:0,degree:"",education:""},validationSchema:function(){return P.d().shape({projectName:P.g().required().label("Business Name"),projectOwnerVisibility:P.g().required().label("Project Owner Visibility"),sectors:P.g().required().label("Sector"),description:P.g().required().label("Description"),prerequisite:P.g().required().label("Supporting Materials"),duration:P.c().min(1,"Min value 1.").label("Duration"),estimatedContractValue:P.c().min(a.smcv,"Min value "+a.smcv).label("Estimated Contract Value"),budgetVisibility:P.g().required().label("Budget Visibility"),completionDate:P.g().required().label("Completion Date"),closingDate:P.g().required().label("Tender Closing Date"),meetingDate:P.g().required().label("Meeting Date"),skills:P.g().required().label("Skills Requirements"),yearExperience:P.c().min(1,"Min value 1.").label("Year Experience"),degree:P.g().required().label("Degree"),education:P.g().required().label("Education Field")})},onSubmit:function(e,a){var r=a.setSubmitting;a.setErrors;r(!0),L.a.post("v1/project",{name:e.projectName,isOwnerDisplayed:"displayed"===e.projectOwnerVisibility,sectorIds:e.sectors.map((function(e){return e.value})),description:e.description,prerequisite:e.prerequisite,duration:e.duration,budget:e.budget,minimumContractValue:e.minimumContractValue,estimatedContractValue:e.estimatedContractValue,isBudgetVisible:"displayed"===e.budgetVisibility,completeDate:e.completionDate,closingDate:e.closingDate,idEducationDegree:e.degree.value,idEducationField:e.education.value,minYearExp:e.yearExperience,requirementSkills:e.skills.map((function(e){return{idSkill:e.value}})),meetingDetails:{link:"",date:e.meetingDate}}).then((function(e){F.a.success("Create Project Successfully"),t.push("/")})).catch((function(e){F.a.error("Create project failed.")})).finally((function(){g(!p),r(!1)}))}}),b=f.values,E=f.touched,v=f.errors,x=f.setValues,h=f.handleSubmit,y=f.isSubmitting;return i.a.createElement(c.a,null,i.a.createElement(o.a,{xs:"12"},i.a.createElement(te,{projectInformationData:b,setProjectInformationData:x,touched:E,errors:v})),i.a.createElement(o.a,{xs:"12"},i.a.createElement(ae,{projectScheduleData:b,setProjectScheduleData:x,touched:E,errors:v})),i.a.createElement(o.a,{xs:"12"},i.a.createElement(re,{projectRequirementsData:b,setProjectRequirementsData:x,touched:E,errors:v})),i.a.createElement(o.a,{xs:"12"},i.a.createElement(ne,{projectDetailsData:b,setProjectDetailsData:x,touched:E,errors:v,authUser:a})),i.a.createElement(o.a,{xs:"12",className:"d-flex justify-content-end"},i.a.createElement(s.a,{color:"secondary",className:"mr-2"},"Cancel"),i.a.createElement(s.a,{color:"primary",onClick:function(){return g(!p)}},"Create")),i.a.createElement(m.a,{isOpen:p,centered:!0,toggle:function(){return g(!p)}},i.a.createElement(u.a,{className:"p-5"},i.a.createElement(c.a,null,i.a.createElement(o.a,{xs:"12",className:"mb-5"},"Are you sure with this data?"),i.a.createElement(o.a,{xs:"12",className:"d-flex justify-content-end"},i.a.createElement(s.a,{color:"secondary",className:"mr-2",onClick:function(){return g(!p)}},"Cancel"),i.a.createElement(s.a,{color:"primary",disabled:y,onClick:h},"Create"))))))}}}]);
//# sourceMappingURL=16.51d148c2.chunk.js.map