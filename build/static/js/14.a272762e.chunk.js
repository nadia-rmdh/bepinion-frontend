(this.webpackJsonppplatform=this.webpackJsonppplatform||[]).push([[14],{632:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var a=[],n=!0,r=!1,l=void 0;try{for(var o,c=e[Symbol.iterator]();!(n=(o=c.next()).done)&&(a.push(o.value),!t||a.length!==t);n=!0);}catch(s){r=!0,l=s}finally{try{!n&&c.return&&c.return()}finally{if(r)throw l}}return a}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")},r=a(0),l=i(r),o=i(a(1)),c=i(a(633)),s=i(a(634));function i(e){return e&&e.__esModule?e:{default:e}}var u={overflow:"hidden",position:"relative"};function m(e,t){return"\n    .react-stars-"+t+":before {\n      position: absolute;\n      overflow: hidden;\n      display: block;\n      z-index: 1;\n      top: 0; left: 0;\n      width: 50%;\n      content: attr(data-forhalf);\n      color: "+e+";\n  }"}function f(e){var t=(0,r.useState)(""),a=n(t,2),o=a[0],i=a[1],f=(0,r.useState)(0),d=n(f,2),p=d[0],h=d[1],v=(0,r.useState)([]),y=n(v,2),b=y[0],g=y[1],E=(0,r.useState)(!1),x=n(E,2),N=x[0],j=x[1],S=(0,c.default)(e),I=n(S,2),w=I[0],C=I[1],k=(0,r.useState)(0),O=n(k,2),A=O[0],H=O[1],M=(0,r.useState)(!1),z=n(M,2),P=z[0],F=z[1],_=(0,r.useState)(""),T=n(_,2),L=T[0],U=T[1];function D(e){"undefined"===typeof e&&(e=w.isHalf?Math.floor(p):Math.round(p));for(var t=[],a=0;a<w.count;a++)t.push({active:a<=e-1});return t}function B(e){if(w.edit){var t=Number(e.currentTarget.getAttribute("data-index"));if(w.isHalf){var a=R(e);F(a),a&&(t+=1),H(t)}else t+=1;!function(e){var t=b.filter((function(e){return e.active}));e!==t.length&&g(D(e))}(t)}}function R(e){var t=e.target.getBoundingClientRect(),a=e.clientX-t.left;return(a=Math.round(Math.abs(a)))>t.width/2}function V(){w.edit&&(q(p),g(D()))}function q(e){w.isHalf&&(F(function(e){return e%1===0}(e)),H(Math.floor(e)))}function G(e){if(w.edit){var t=Number(e.currentTarget.getAttribute("data-index")),a=void 0;if(w.isHalf){var n=R(e);F(n),n&&(t+=1),a=n?t:t+.5,H(t)}else a=t+=1;J(a)}}function J(t){t!==p&&(g(D(t)),h(t),e.onChange(t))}return(0,r.useEffect)((function(){var t,a;U(e.classNames+" react-stars"),t=e.value,a=e.count,h(t<0||t>a?0:t),g(D(e.value)),C(e),i((Math.random()+"").replace(".","")),j(function(e){return!e.isHalf&&e.emptyIcon&&e.filledIcon||e.isHalf&&e.emptyIcon&&e.halfIcon&&e.filledIcon}(e)),H(Math.floor(e.value)),F(e.isHalf&&e.value%1<.5)}),[]),l.default.createElement("div",{className:"react-stars-wrapper-"+o,style:{display:"flex"}},l.default.createElement("div",{tabIndex:w.a11y&&w.edit?0:null,"aria-label":"add rating by typing an integer from 0 to 5 or pressing arrow keys",onKeyDown:function(e){if(w.a11y||w.edit){var t=e.key,a=p,n=Number(t);n?Number.isInteger(n)&&n>0&&n<=w.count&&(a=n):("ArrowUp"===t||"ArrowRight"===t)&&a<w.count?(e.preventDefault(),a+=w.isHalf?.5:1):("ArrowDown"===t||"ArrowLeft"===t)&&a>.5&&(e.preventDefault(),a-=w.isHalf?.5:1),q(a),J(a)}},className:L,style:u},w.isHalf&&function(){return l.default.createElement("style",{dangerouslySetInnerHTML:{__html:N?(e=w.activeColor,"\n          span.react-stars-half > * {\n          color: "+e+";\n      }"):m(w.activeColor,o)}});var e}(),b.map((function(e,t){return l.default.createElement(s.default,{key:t,index:t,active:e.active,config:w,onMouseOver:B,onMouseLeave:V,onClick:G,halfStarHidden:P,halfStarAt:A,isUsingIcons:N,uniqueness:o})})),l.default.createElement("p",{style:{position:"absolute",left:"-200rem"},role:"status"},p)))}f.propTypes={classNames:o.default.string,edit:o.default.bool,half:o.default.bool,value:o.default.number,count:o.default.number,char:o.default.string,size:o.default.number,color:o.default.string,activeColor:o.default.string,emptyIcon:o.default.element,halfIcon:o.default.element,filledIcon:o.default.element,a11y:o.default.bool},f.defaultProps={edit:!0,half:!1,value:0,count:5,char:"\u2605",size:15,color:"gray",activeColor:"#ffd700",a11y:!0,onChange:function(){}},t.default=f},633:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var a=[],n=!0,r=!1,l=void 0;try{for(var o,c=e[Symbol.iterator]();!(n=(o=c.next()).done)&&(a.push(o.value),!t||a.length!==t);n=!0);}catch(s){r=!0,l=s}finally{try{!n&&c.return&&c.return()}finally{if(r)throw l}}return a}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")};t.default=function(e){var t=(0,r.useState)(e.count),a=n(t,2),l=a[0],o=a[1],c=(0,r.useState)(e.size),s=n(c,2),i=s[0],u=s[1],m=(0,r.useState)(e.char),f=n(m,2),d=f[0],p=f[1],h=(0,r.useState)(e.color),v=n(h,2),y=v[0],b=v[1],g=(0,r.useState)(e.activeColor),E=n(g,2),x=E[0],N=E[1],j=(0,r.useState)(e.isHalf),S=n(j,2),I=S[0],w=S[1],C=(0,r.useState)(e.edit),k=n(C,2),O=k[0],A=k[1],H=(0,r.useState)(e.emptyIcon),M=n(H,2),z=M[0],P=M[1],F=(0,r.useState)(e.halfIcon),_=n(F,2),T=_[0],L=_[1],U=(0,r.useState)(e.filledIcon),D=n(U,2),B=D[0],R=D[1],V=(0,r.useState)(e.a11y),q=n(V,2),G=q[0],J=q[1];return[{count:l,size:i,char:d,color:y,activeColor:x,isHalf:I,edit:O,emptyIcon:z,halfIcon:T,filledIcon:B,a11y:G},function(e){o(e.count),u(e.size),p(e.char),b(e.color),N(e.activeColor),w(e.isHalf),A(e.edit),P(e.emptyIcon),L(e.halfIcon),R(e.filledIcon),J(e.a11y)}]};var r=a(0)},634:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e};t.default=function(e){var t=e.index,a=e.active,r=e.config,l=e.onMouseOver,s=e.onMouseLeave,i=e.onClick,u=e.halfStarHidden,m=e.halfStarAt,f=e.isUsingIcons,d=e.uniqueness,p=r.color,h=r.activeColor,v=r.size,y=r.char,b=r.isHalf,g=r.edit,E=r.halfIcon,x=r.emptyIcon,N=r.filledIcon,j="",S=!1;b&&!u&&m===t&&(j=f?"react-stars-half":"react-stars-"+d,S=!0);var I=n({},c,{color:a?h:p,cursor:g?"pointer":"default",fontSize:v+"px"});return o.default.createElement("span",{className:j,style:I,key:t,"data-index":t,"data-forhalf":N?t:y,onMouseOver:l,onMouseMove:l,onMouseLeave:s,onClick:i},f?a?N:!a&&S?E:x:y)};var r,l=a(0),o=(r=l)&&r.__esModule?r:{default:r};var c={position:"relative",overflow:"hidden",cursor:"pointer",display:"block",float:"left"}},801:function(e,t,a){"use strict";a.r(t);var n=a(2),r=a(11),l=a(0),o=a.n(l),c=a(383),s=a(388),i=a(382),u=a(368),m=a(390),f=a(391),d=a(385),p=a(392),h=a(393),v=a(217),y=a(395),b=a(18),g=a(632),E=a.n(g),x=a(28),N=a(9),j=a(59),S=a(21),I=a(15);t.default=function(){var e=Object(b.g)(),t=Object(b.i)(),a=Object(l.useState)(!0),g=Object(r.a)(a,2),w=g[0],C=g[1],k=Object(l.useState)(!1),O=Object(r.a)(k,2),A=O[0],H=O[1];Object(l.useEffect)((function(){I.a.get("v1/project/".concat(t.params.projectId,"/check-rating")).then((function(){return C(!1)})).catch((function(){H(!0),C(!1)}))}),[t,e]);var M=Object(x.a)({initialValues:{useForAnotherProject:"yes",helpful:0,recommend:0,additionalComment:""},validationSchema:function(){return N.d().shape({helpful:N.c().min(1,"Please rate this."),recommend:N.c().min(1,"Please rate this.")})},onSubmit:function(a,n){var r=n.setSubmitting;n.setErrors;r(!0),I.a.post("v1/rating",{idProject:t.params.projectId,useForAnotherProject:"Yes"===a.useForAnotherProject,helpful:a.helpful,recommend:a.recommend,additionalComment:a.additionalComment}).then((function(t){S.a.success("Send Feedback Successfully"),e.push("/")})).catch((function(t){S.a.error("Send Feedback Failed."),e.push("/")})).finally((function(){r(!1)}))}}),z=M.values,P=M.touched,F=M.errors,_=M.setValues,T=M.handleSubmit,L=M.isSubmitting,U=function(e){var t=e.target.value;_((function(e){return Object(n.a)(Object(n.a)({},e),{},{useForAnotherProject:t})}))};return A?o.a.createElement(c.a,{className:"my-3 px-md-5"},o.a.createElement(s.a,{xs:"12",className:"d-flex justify-content-center align-items-center mb-4"},o.a.createElement("div",{className:"font-2xl font-weight-bold mb-3"},"Feedback Already Send")),o.a.createElement(s.a,{xs:"12",className:"mt-4 d-flex justify-content-center"},o.a.createElement(i.a,{color:"pinion-primary",size:"lg",onClick:function(){return e.push("/")}},"Go Back"))):w?o.a.createElement("div",{style:{position:"absolute",top:0,right:0,bottom:0,left:0,display:"flex",justifyContent:"center",alignItems:"center"}},o.a.createElement(u.a,{style:{width:48,height:48}})):o.a.createElement(m.a,null,o.a.createElement(f.a,null,A?o.a.createElement(c.a,{className:"my-3 px-md-5"},o.a.createElement(s.a,{xs:"12",className:"d-flex justify-content-center align-items-center mb-4"},o.a.createElement("div",{className:"font-2xl font-weight-bold mb-3"},"Feedback Already Send")),o.a.createElement(s.a,{xs:"12",className:"mt-4 d-flex justify-content-center"},o.a.createElement(i.a,{color:"pinion-primary",size:"lg",onClick:function(){return e.push("/")}},"Go Back"))):o.a.createElement(c.a,{className:"my-3 px-md-5"},o.a.createElement(s.a,{xs:"12",className:"d-flex justify-content-center align-items-center mb-4"},o.a.createElement("div",{className:"font-2xl font-weight-bold mb-3"},"Feedback")),o.a.createElement(s.a,{xs:"12"},o.a.createElement(c.a,{className:"mb-3"},o.a.createElement(s.a,{xs:"12",className:"d-flex align-items-center"},o.a.createElement(d.a,{for:"helpful"},"1. What do you think about our mission?")),o.a.createElement(s.a,{xs:"12",className:"pl-4"},o.a.createElement("div",{className:"d-flex"},o.a.createElement("small",{className:"text-muted mr-2 d-flex align-items-center"},"Not Interesting"),o.a.createElement(E.a,{count:5,onChange:function(e){return t=e,void _((function(e){return Object(n.a)(Object(n.a)({},e),{},{helpful:t})}));var t},size:30,value:z.helpful,isHalf:!0,emptyIcon:o.a.createElement("i",{className:"fa fa-star"}),halfIcon:o.a.createElement("i",{className:"fa fa-star-half-alt"}),fullIcon:o.a.createElement("i",{className:"fa fa-star"}),activeColor:"#ffd700"}),o.a.createElement("small",{className:"text-muted ml-2 d-flex align-items-center"},"Very Helpful")),P.helpful&&F.helpful&&o.a.createElement("small",{className:"text-danger"},F.helpful))),o.a.createElement(c.a,{className:"mb-3"},o.a.createElement(s.a,{xs:"12",className:"d-flex align-items-center"},o.a.createElement(d.a,{for:"recommend"},"2. How likely you will recommend Pinion to your peers?")),o.a.createElement(s.a,{xs:"12",className:"pl-4"},o.a.createElement("div",{className:"d-flex"},o.a.createElement("small",{className:"text-muted mr-2 d-flex align-items-center"},"Unlikely"),o.a.createElement(E.a,{count:5,onChange:function(e){return t=e,void _((function(e){return Object(n.a)(Object(n.a)({},e),{},{recommend:t})}));var t},size:30,value:z.recommend,isHalf:!0,emptyIcon:o.a.createElement("i",{className:"fa fa-star"}),halfIcon:o.a.createElement("i",{className:"fa fa-star-half-alt"}),fullIcon:o.a.createElement("i",{className:"fa fa-star"}),activeColor:"#ffd700"}),o.a.createElement("small",{className:"text-muted ml-2 d-flex align-items-center"},"Definitely")),P.recommend&&F.recommend&&o.a.createElement("small",{className:"text-danger"},F.recommend))),o.a.createElement(c.a,{className:"mb-3"},o.a.createElement(s.a,{xs:"12",className:"d-flex align-items-center"},o.a.createElement(d.a,{for:"useForAnotherProject"},"3. Would you use Pinion for another project?")),o.a.createElement(s.a,{xs:"12",className:"pl-4 d-flex"},o.a.createElement(p.a,null,o.a.createElement(h.a,{addonType:"prepend"},o.a.createElement(v.a,{className:"bg-transparent border-0 px-0"},o.a.createElement(y.a,{type:"radio",id:"size1",value:"yes",checked:"yes"===z.useForAnotherProject,onChange:U}))),o.a.createElement(d.a,{for:"size1",className:"d-flex bg-transparent p-1 m-0 align-items-center"},"Yes")),o.a.createElement(p.a,null,o.a.createElement(h.a,{addonType:"prepend"},o.a.createElement(v.a,{className:"bg-transparent border-0 px-0"},o.a.createElement(y.a,{type:"radio",id:"size2",value:"no",checked:"no"===z.useForAnotherProject,onChange:U}))),o.a.createElement(d.a,{for:"size2",className:"d-flex bg-transparent p-1 m-0 align-items-center"},"No")))),o.a.createElement(c.a,{className:"mb-3"},o.a.createElement(s.a,{xs:"12",className:"d-flex align-items-center"},o.a.createElement(d.a,{for:"additionalComment"},"Anything else you would like to tell us?")),o.a.createElement(s.a,{xs:"12",className:"pl-4 d-flex"},o.a.createElement(j.a,{minRows:5,name:"aboutUs",id:"aboutUs",className:"form-control",placeholder:"Improvements, ideas, compliments, or anything to help us grow together",value:z.additionalComment,onChange:function(e){var t=e.target.value;_((function(e){return Object(n.a)(Object(n.a)({},e),{},{additionalComment:t})}))}})))),o.a.createElement(s.a,{xs:"12",className:"mt-4 d-flex justify-content-center"},o.a.createElement(i.a,{color:"primary",size:"lg",onClick:T,disabled:L},L?o.a.createElement(o.a.Fragment,null,o.a.createElement(u.a,{color:"light",size:"sm"})," Loading..."):"Submit")))))}}}]);
//# sourceMappingURL=14.a272762e.chunk.js.map