/*! For license information please see 4.2933e88e.chunk.js.LICENSE.txt */
(this.webpackJsonppplatform=this.webpackJsonppplatform||[]).push([[4],{406:function(e,t,a){"use strict";a.d(t,"b",(function(){return l})),a.d(t,"a",(function(){return o}));var r=a(410),n=a.n(r);function l(e){for(var t="",a=e.toString().split("").reverse().join(""),r=0;r<a.length;r++)r%3===0&&(t+=a.substr(r,3)+".");return t.split("",t.length-1).reverse().join("")}function o(e){for(var t=[{divider:1e18,suffix:"E"},{divider:1e15,suffix:"P"},{divider:1e12,suffix:"T"},{divider:1e9,suffix:"G"},{divider:1e6,suffix:"M"},{divider:1e3,suffix:"k"}],a=0;a<t.length;a++)if(e>=t[a].divider)return(e/t[a].divider).toString()+t[a].suffix;return e.toString()}n.a.register("locale","indonesia",{delimiters:{thousands:".",decimal:","},abbreviations:{thousand:"rb",million:"jt",billion:"M",trillion:"T"},ordinal:function(e){return 1===e?"er":"\xe8me"},currency:{symbol:"IDR"}}),n.a.locale("indonesia")},410:function(e,t,a){var r,n;void 0===(n="function"===typeof(r=function(){var e,t,a={},r={},n={currentLocale:"en",zeroFormat:null,nullFormat:null,defaultFormat:"0,0",scalePercentBy100:!0},l={currentLocale:n.currentLocale,zeroFormat:n.zeroFormat,nullFormat:n.nullFormat,defaultFormat:n.defaultFormat,scalePercentBy100:n.scalePercentBy100};function o(e,t){this._input=e,this._value=t}return(e=function(r){var n,i,c,s;if(e.isNumeral(r))n=r.value();else if(0===r||"undefined"===typeof r)n=0;else if(null===r||t.isNaN(r))n=null;else if("string"===typeof r)if(l.zeroFormat&&r===l.zeroFormat)n=0;else if(l.nullFormat&&r===l.nullFormat||!r.replace(/[^0-9]+/g,"").length)n=null;else{for(i in a)if((s="function"===typeof a[i].regexps.unformat?a[i].regexps.unformat():a[i].regexps.unformat)&&r.match(s)){c=a[i].unformat;break}n=(c=c||e._.stringToNumber)(r)}else n=Number(r)||null;return new o(r,n)}).version="2.0.6",e.isNumeral=function(e){return e instanceof o},e._=t={numberToFormat:function(t,a,n){var l,o,i,c,s,u,m,d,f=r[e.options.currentLocale],p=!1,b=!1,h="",g="",v=!1;if(t=t||0,i=Math.abs(t),e._.includes(a,"(")?(p=!0,a=a.replace(/[\(|\)]/g,"")):(e._.includes(a,"+")||e._.includes(a,"-"))&&(u=e._.includes(a,"+")?a.indexOf("+"):t<0?a.indexOf("-"):-1,a=a.replace(/[\+|\-]/g,"")),e._.includes(a,"a")&&(o=!!(o=a.match(/a(k|m|b|t)?/))&&o[1],e._.includes(a," a")&&(h=" "),a=a.replace(new RegExp(h+"a[kmbt]?"),""),i>=1e12&&!o||"t"===o?(h+=f.abbreviations.trillion,t/=1e12):i<1e12&&i>=1e9&&!o||"b"===o?(h+=f.abbreviations.billion,t/=1e9):i<1e9&&i>=1e6&&!o||"m"===o?(h+=f.abbreviations.million,t/=1e6):(i<1e6&&i>=1e3&&!o||"k"===o)&&(h+=f.abbreviations.thousand,t/=1e3)),e._.includes(a,"[.]")&&(b=!0,a=a.replace("[.]",".")),c=t.toString().split(".")[0],s=a.split(".")[1],m=a.indexOf(","),l=(a.split(".")[0].split(",")[0].match(/0/g)||[]).length,s?(e._.includes(s,"[")?(s=(s=s.replace("]","")).split("["),g=e._.toFixed(t,s[0].length+s[1].length,n,s[1].length)):g=e._.toFixed(t,s.length,n),c=g.split(".")[0],g=e._.includes(g,".")?f.delimiters.decimal+g.split(".")[1]:"",b&&0===Number(g.slice(1))&&(g="")):c=e._.toFixed(t,0,n),h&&!o&&Number(c)>=1e3&&h!==f.abbreviations.trillion)switch(c=String(Number(c)/1e3),h){case f.abbreviations.thousand:h=f.abbreviations.million;break;case f.abbreviations.million:h=f.abbreviations.billion;break;case f.abbreviations.billion:h=f.abbreviations.trillion}if(e._.includes(c,"-")&&(c=c.slice(1),v=!0),c.length<l)for(var E=l-c.length;E>0;E--)c="0"+c;return m>-1&&(c=c.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1"+f.delimiters.thousands)),0===a.indexOf(".")&&(c=""),d=c+g+(h||""),p?d=(p&&v?"(":"")+d+(p&&v?")":""):u>=0?d=0===u?(v?"-":"+")+d:d+(v?"-":"+"):v&&(d="-"+d),d},stringToNumber:function(e){var t,a,n,o=r[l.currentLocale],i=e,c={thousand:3,million:6,billion:9,trillion:12};if(l.zeroFormat&&e===l.zeroFormat)a=0;else if(l.nullFormat&&e===l.nullFormat||!e.replace(/[^0-9]+/g,"").length)a=null;else{for(t in a=1,"."!==o.delimiters.decimal&&(e=e.replace(/\./g,"").replace(o.delimiters.decimal,".")),c)if(n=new RegExp("[^a-zA-Z]"+o.abbreviations[t]+"(?:\\)|(\\"+o.currency.symbol+")?(?:\\))?)?$"),i.match(n)){a*=Math.pow(10,c[t]);break}a*=(e.split("-").length+Math.min(e.split("(").length-1,e.split(")").length-1))%2?1:-1,e=e.replace(/[^0-9\.]+/g,""),a*=Number(e)}return a},isNaN:function(e){function t(t){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}((function(e){return"number"===typeof e&&isNaN(e)})),includes:function(e,t){return-1!==e.indexOf(t)},insert:function(e,t,a){return e.slice(0,a)+t+e.slice(a)},reduce:function(e,t){if(null===this)throw new TypeError("Array.prototype.reduce called on null or undefined");if("function"!==typeof t)throw new TypeError(t+" is not a function");var a,r=Object(e),n=r.length>>>0,l=0;if(3===arguments.length)a=arguments[2];else{for(;l<n&&!(l in r);)l++;if(l>=n)throw new TypeError("Reduce of empty array with no initial value");a=r[l++]}for(;l<n;l++)l in r&&(a=t(a,r[l],l,r));return a},multiplier:function(e){var t=e.toString().split(".");return t.length<2?1:Math.pow(10,t[1].length)},correctionFactor:function(){var e=Array.prototype.slice.call(arguments);return e.reduce((function(e,a){var r=t.multiplier(a);return e>r?e:r}),1)},toFixed:function(e,t,a,r){var n,l,o,i,c=e.toString().split("."),s=t-(r||0);return n=2===c.length?Math.min(Math.max(c[1].length,s),t):s,o=Math.pow(10,n),i=(a(e+"e+"+n)/o).toFixed(n),r>t-n&&(l=new RegExp("\\.?0{1,"+(r-(t-n))+"}$"),i=i.replace(l,"")),i}},e.options=l,e.formats=a,e.locales=r,e.locale=function(e){return e&&(l.currentLocale=e.toLowerCase()),l.currentLocale},e.localeData=function(e){if(!e)return r[l.currentLocale];if(e=e.toLowerCase(),!r[e])throw new Error("Unknown locale : "+e);return r[e]},e.reset=function(){for(var e in n)l[e]=n[e]},e.zeroFormat=function(e){l.zeroFormat="string"===typeof e?e:null},e.nullFormat=function(e){l.nullFormat="string"===typeof e?e:null},e.defaultFormat=function(e){l.defaultFormat="string"===typeof e?e:"0.0"},e.register=function(e,t,a){if(t=t.toLowerCase(),this[e+"s"][t])throw new TypeError(t+" "+e+" already registered.");return this[e+"s"][t]=a,a},e.validate=function(t,a){var r,n,l,o,i,c,s,u;if("string"!==typeof t&&(t+="",console.warn&&console.warn("Numeral.js: Value is not string. It has been co-erced to: ",t)),(t=t.trim()).match(/^\d+$/))return!0;if(""===t)return!1;try{s=e.localeData(a)}catch(m){s=e.localeData(e.locale())}return l=s.currency.symbol,i=s.abbreviations,r=s.delimiters.decimal,n="."===s.delimiters.thousands?"\\.":s.delimiters.thousands,(null===(u=t.match(/^[^\d]+/))||(t=t.substr(1),u[0]===l))&&(null===(u=t.match(/[^\d]+$/))||(t=t.slice(0,-1),u[0]===i.thousand||u[0]===i.million||u[0]===i.billion||u[0]===i.trillion))&&(c=new RegExp(n+"{2}"),!t.match(/[^\d.,]/g)&&!((o=t.split(r)).length>2)&&(o.length<2?!!o[0].match(/^\d+.*\d$/)&&!o[0].match(c):1===o[0].length?!!o[0].match(/^\d+$/)&&!o[0].match(c)&&!!o[1].match(/^\d+$/):!!o[0].match(/^\d+.*\d$/)&&!o[0].match(c)&&!!o[1].match(/^\d+$/)))},e.fn=o.prototype={clone:function(){return e(this)},format:function(t,r){var n,o,i,c=this._value,s=t||l.defaultFormat;if(r=r||Math.round,0===c&&null!==l.zeroFormat)o=l.zeroFormat;else if(null===c&&null!==l.nullFormat)o=l.nullFormat;else{for(n in a)if(s.match(a[n].regexps.format)){i=a[n].format;break}o=(i=i||e._.numberToFormat)(c,s,r)}return o},value:function(){return this._value},input:function(){return this._input},set:function(e){return this._value=Number(e),this},add:function(e){var a=t.correctionFactor.call(null,this._value,e);return this._value=t.reduce([this._value,e],(function(e,t,r,n){return e+Math.round(a*t)}),0)/a,this},subtract:function(e){var a=t.correctionFactor.call(null,this._value,e);return this._value=t.reduce([e],(function(e,t,r,n){return e-Math.round(a*t)}),Math.round(this._value*a))/a,this},multiply:function(e){return this._value=t.reduce([this._value,e],(function(e,a,r,n){var l=t.correctionFactor(e,a);return Math.round(e*l)*Math.round(a*l)/Math.round(l*l)}),1),this},divide:function(e){return this._value=t.reduce([this._value,e],(function(e,a,r,n){var l=t.correctionFactor(e,a);return Math.round(e*l)/Math.round(a*l)})),this},difference:function(t){return Math.abs(e(this._value).subtract(t).value())}},e.register("locale","en",{delimiters:{thousands:",",decimal:"."},abbreviations:{thousand:"k",million:"m",billion:"b",trillion:"t"},ordinal:function(e){var t=e%10;return 1===~~(e%100/10)?"th":1===t?"st":2===t?"nd":3===t?"rd":"th"},currency:{symbol:"$"}}),e.register("format","bps",{regexps:{format:/(BPS)/,unformat:/(BPS)/},format:function(t,a,r){var n,l=e._.includes(a," BPS")?" ":"";return t*=1e4,a=a.replace(/\s?BPS/,""),n=e._.numberToFormat(t,a,r),e._.includes(n,")")?((n=n.split("")).splice(-1,0,l+"BPS"),n=n.join("")):n=n+l+"BPS",n},unformat:function(t){return+(1e-4*e._.stringToNumber(t)).toFixed(15)}}),function(){var t={base:1e3,suffixes:["B","KB","MB","GB","TB","PB","EB","ZB","YB"]},a={base:1024,suffixes:["B","KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"]},r=t.suffixes.concat(a.suffixes.filter((function(e){return t.suffixes.indexOf(e)<0}))).join("|");r="("+r.replace("B","B(?!PS)")+")",e.register("format","bytes",{regexps:{format:/([0\s]i?b)/,unformat:new RegExp(r)},format:function(r,n,l){var o,i,c,s=e._.includes(n,"ib")?a:t,u=e._.includes(n," b")||e._.includes(n," ib")?" ":"";for(n=n.replace(/\s?i?b/,""),o=0;o<=s.suffixes.length;o++)if(i=Math.pow(s.base,o),c=Math.pow(s.base,o+1),null===r||0===r||r>=i&&r<c){u+=s.suffixes[o],i>0&&(r/=i);break}return e._.numberToFormat(r,n,l)+u},unformat:function(r){var n,l,o=e._.stringToNumber(r);if(o){for(n=t.suffixes.length-1;n>=0;n--){if(e._.includes(r,t.suffixes[n])){l=Math.pow(t.base,n);break}if(e._.includes(r,a.suffixes[n])){l=Math.pow(a.base,n);break}}o*=l||1}return o}})}(),e.register("format","currency",{regexps:{format:/(\$)/},format:function(t,a,r){var n,l,o=e.locales[e.options.currentLocale],i={before:a.match(/^([\+|\-|\(|\s|\$]*)/)[0],after:a.match(/([\+|\-|\)|\s|\$]*)$/)[0]};for(a=a.replace(/\s?\$\s?/,""),n=e._.numberToFormat(t,a,r),t>=0?(i.before=i.before.replace(/[\-\(]/,""),i.after=i.after.replace(/[\-\)]/,"")):t<0&&!e._.includes(i.before,"-")&&!e._.includes(i.before,"(")&&(i.before="-"+i.before),l=0;l<i.before.length;l++)switch(i.before[l]){case"$":n=e._.insert(n,o.currency.symbol,l);break;case" ":n=e._.insert(n," ",l+o.currency.symbol.length-1)}for(l=i.after.length-1;l>=0;l--)switch(i.after[l]){case"$":n=l===i.after.length-1?n+o.currency.symbol:e._.insert(n,o.currency.symbol,-(i.after.length-(1+l)));break;case" ":n=l===i.after.length-1?n+" ":e._.insert(n," ",-(i.after.length-(1+l)+o.currency.symbol.length-1))}return n}}),e.register("format","exponential",{regexps:{format:/(e\+|e-)/,unformat:/(e\+|e-)/},format:function(t,a,r){var n=("number"!==typeof t||e._.isNaN(t)?"0e+0":t.toExponential()).split("e");return a=a.replace(/e[\+|\-]{1}0/,""),e._.numberToFormat(Number(n[0]),a,r)+"e"+n[1]},unformat:function(t){var a=e._.includes(t,"e+")?t.split("e+"):t.split("e-"),r=Number(a[0]),n=Number(a[1]);return n=e._.includes(t,"e-")?n*=-1:n,e._.reduce([r,Math.pow(10,n)],(function(t,a,r,n){var l=e._.correctionFactor(t,a);return t*l*(a*l)/(l*l)}),1)}}),e.register("format","ordinal",{regexps:{format:/(o)/},format:function(t,a,r){var n=e.locales[e.options.currentLocale],l=e._.includes(a," o")?" ":"";return a=a.replace(/\s?o/,""),l+=n.ordinal(t),e._.numberToFormat(t,a,r)+l}}),e.register("format","percentage",{regexps:{format:/(%)/,unformat:/(%)/},format:function(t,a,r){var n,l=e._.includes(a," %")?" ":"";return e.options.scalePercentBy100&&(t*=100),a=a.replace(/\s?\%/,""),n=e._.numberToFormat(t,a,r),e._.includes(n,")")?((n=n.split("")).splice(-1,0,l+"%"),n=n.join("")):n=n+l+"%",n},unformat:function(t){var a=e._.stringToNumber(t);return e.options.scalePercentBy100?.01*a:a}}),e.register("format","time",{regexps:{format:/(:)/,unformat:/(:)/},format:function(e,t,a){var r=Math.floor(e/60/60),n=Math.floor((e-60*r*60)/60),l=Math.round(e-60*r*60-60*n);return r+":"+(n<10?"0"+n:n)+":"+(l<10?"0"+l:l)},unformat:function(e){var t=e.split(":"),a=0;return 3===t.length?(a+=60*Number(t[0])*60,a+=60*Number(t[1]),a+=Number(t[2])):2===t.length&&(a+=60*Number(t[0]),a+=Number(t[1])),Number(a)}}),e})?r.call(t,a,t,e):r)||(e.exports=n)},631:function(e,t,a){"use strict";a.r(t);var r=a(17),n=a(11),l=a(0),o=a.n(l),i=a(535),c=a(369),s=a(383),u=a(388),m=a(391),d=a(392),f=a(382),p=a(393),b=a(394),h=a(218),g=a(396),v=a(630),E=a(395),x=a(381),y=a(377),N=(a(485),a(386),a(34)),_=a.n(N),w=a(468),j=a(13),S=a(108),k=a(168),F=a(21),M=a(18),T=a(406),P=Object(i.b)(_.a);var B=function(e){var t=e.data,a=e.mutate,i=Object(l.useState)(null),c=Object(n.a)(i,2),y=c[0],N=c[1],w=Object(l.useState)([]),S=Object(n.a)(w,2),k=S[0],T=S[1],P=Object(l.useCallback)((function(e){var t=e.target,a=t.value,n=t.checked;T(n?function(e){return[].concat(Object(r.a)(e),[a])}:function(e){return e.filter((function(e){return e!==a}))})}),[T]),B=Object(l.useMemo)((function(){var e=k.length>0?null===t||void 0===t?void 0:t.filter((function(e){return k.includes(e.projectStatus)})):t;return null!==e&&void 0!==e?e:[]}),[t,k]);return o.a.createElement(m.a,{className:"shadow-sm"},o.a.createElement(d.a,null,o.a.createElement(s.a,null,o.a.createElement(u.a,{xs:"12",className:"my-1 text-center"},o.a.createElement("h4",null,"Project Status")),o.a.createElement(u.a,{xs:"12",className:"d-flex my-1"},o.a.createElement(p.a,null,o.a.createElement(b.a,{addonType:"prepend"},o.a.createElement(h.a,{className:"bg-transparent border-0 px-0"},o.a.createElement(g.a,{type:"checkbox",id:"open",value:"open",checked:k.includes("open"),onChange:P}))),o.a.createElement("div",{className:"d-flex bg-transparent p-1 align-items-center"},"Open")),o.a.createElement(p.a,null,o.a.createElement(b.a,{addonType:"prepend"},o.a.createElement(h.a,{className:"bg-transparent border-0 px-0"},o.a.createElement(g.a,{type:"checkbox",id:"under_review",value:"under_review",checked:k.includes("under_review"),onChange:P}))),o.a.createElement("div",{className:"d-flex bg-transparent p-1 align-items-center"},"Under Review")),o.a.createElement(p.a,null,o.a.createElement(b.a,{addonType:"prepend"},o.a.createElement(h.a,{className:"bg-transparent border-0 px-0"},o.a.createElement(g.a,{type:"checkbox",id:"expired",value:"expired",checked:k.includes("expired"),onChange:P}))),o.a.createElement("div",{className:"d-flex bg-transparent p-1 align-items-center"},"Expired")),o.a.createElement(p.a,null,o.a.createElement(b.a,{addonType:"prepend"},o.a.createElement(h.a,{className:"bg-transparent border-0 px-0"},o.a.createElement(g.a,{type:"checkbox",id:"tnc_review",value:"tnc_review",checked:k.includes("tnc_review"),onChange:P}))),o.a.createElement("div",{className:"d-flex bg-transparent p-1 align-items-center"},"T&C Review")),o.a.createElement(p.a,null,o.a.createElement(b.a,{addonType:"prepend"},o.a.createElement(h.a,{className:"bg-transparent border-0 px-0"},o.a.createElement(g.a,{type:"checkbox",id:"on_going",value:"on_going",checked:k.includes("on_going"),onChange:P}))),o.a.createElement("div",{className:"d-flex bg-transparent p-1 align-items-center"},"On going")),o.a.createElement(p.a,null,o.a.createElement(b.a,{addonType:"prepend"},o.a.createElement(h.a,{className:"bg-transparent border-0 px-0"},o.a.createElement(g.a,{type:"checkbox",id:"deliverable_approved",value:"deliverable_approved",checked:k.includes("deliverable_approved"),onChange:P}))),o.a.createElement("div",{className:"d-flex bg-transparent p-1 align-items-center"},"Approved")),o.a.createElement(p.a,null,o.a.createElement(b.a,{addonType:"prepend"},o.a.createElement(h.a,{className:"bg-transparent border-0 px-0"},o.a.createElement(g.a,{type:"checkbox",id:"close",value:"close",checked:k.includes("close"),onChange:P}))),o.a.createElement("div",{className:"d-flex bg-transparent p-1 align-items-center"},"Closed"))),o.a.createElement(u.a,{xs:"12",className:"my-1"},o.a.createElement(v.a,{hover:!0,className:"text-center"},o.a.createElement("thead",null,o.a.createElement("tr",null,o.a.createElement("th",null,"Project Name"),o.a.createElement("th",null,"Professional Name"),o.a.createElement("th",null,"Completion Date"),o.a.createElement("th",null,"Deliverable Status"),o.a.createElement("th",null,"Project Status"))),o.a.createElement("tbody",null,B.length>0?B.map((function(e,t){var a,r,n;return o.a.createElement("tr",{key:t},o.a.createElement("td",{className:"text-left"},o.a.createElement(j.b,{to:"".concat("on_going"===e.projectStatus?"/project/".concat(e.idProject,"/wall"):"close"===e.projectStatus?"/rate/".concat(e.idProject):"/project/".concat(e.idProject,"/professionals"))},e.projectName)),o.a.createElement("td",null,(null===e||void 0===e||null===(a=e.professionalList)||void 0===a?void 0:a.length)>0?o.a.createElement(j.b,{to:"/professional/".concat(e.professionalList[0].idProfessionalUserMeta)},e.professionalList[0].firstName," ",e.professionalList[0].lastName):"-"),o.a.createElement("td",{className:"text-uppercase"},null!==(r=null===e||void 0===e?void 0:e.activityStatus)&&void 0!==r?r:"-"),o.a.createElement("td",null,_()(null!==(n=null===e||void 0===e?void 0:e.completeDate)&&void 0!==n?n:"").format("DD-MM-YYYY")),o.a.createElement("td",{className:"text-uppercase"},"tnc review"===e.projectStatus.replace("_"," ")?"T&C REVIEW":e.projectStatus.replace("_"," "),"expired"===e.projectStatus?o.a.createElement(f.a,{color:"pinion-primary",size:"sm",block:!0,className:"text-white mt-2",onClick:function(){return N(e.idProject)}},"Reopen"):null))})):o.a.createElement("tr",null,o.a.createElement("td",{colspan:"5",className:"text-center text-muted"},"No Data")))))),o.a.createElement(E.a,{isOpen:y,centered:!0,toggle:function(){return N(!y)}},o.a.createElement(x.a,{className:"p-5"},o.a.createElement(s.a,null,o.a.createElement(u.a,{xs:"12"},o.a.createElement("div",{className:"mb-2"},"Are you sure you want to reopen this project?")),o.a.createElement(u.a,{xs:"12",className:"d-flex justify-content-end"},o.a.createElement(f.a,{color:"secondary",className:"mr-2",onClick:function(){return N(!y)}},"Cancel"),o.a.createElement(f.a,{color:"primary",className:"text-capitalize",onClick:function(){M.a.put("v1/project/".concat(y,"/reopen"),{isReopen:!0}).then((function(e){F.a.success("Reopen Successfully"),a()})).catch((function(e){F.a.error("Reopen Failed")})).finally((function(){return N(!y)}))}},"Reopen")))))))},C=function(e){var t=e.data;return o.a.createElement(m.a,{className:"shadow-sm mt-3"},o.a.createElement(d.a,null,o.a.createElement(s.a,null,o.a.createElement(u.a,{xs:"12",className:"my-1 text-center"},o.a.createElement("h4",null,"Project Statistics")),o.a.createElement(u.a,{xs:"12",className:"d-flex my-1 justify-content-center"},o.a.createElement(s.a,null,o.a.createElement(u.a,{xs:"12",md:"4"},o.a.createElement("p",{style:{whiteSpace:"nowrap"}},"Number of projects in tender"),o.a.createElement("div",{className:"d-flex justify-content-center",style:{fontSize:"50pt"}},o.a.createElement(y.a,{color:"secondary",className:"d-flex justify-content-center",style:{width:80,height:80}},t.posted))),o.a.createElement(u.a,{xs:"12",md:"4"},o.a.createElement("p",{style:{whiteSpace:"nowrap"}},"Number of active projects"),o.a.createElement("div",{className:"d-flex justify-content-center",style:{fontSize:"50pt"}},o.a.createElement(y.a,{color:"secondary",className:"d-flex justify-content-center",style:{width:80,height:80}},t.onGoing))),o.a.createElement(u.a,{xs:"12",md:"4"},o.a.createElement("p",{style:{whiteSpace:"nowrap"}},"Number of completed projects"),o.a.createElement("div",{className:"d-flex justify-content-center",style:{fontSize:"50pt"}},o.a.createElement(y.a,{color:"secondary",className:"d-flex justify-content-center",style:{width:80,height:80}},t.close))))))))},O=function(e){var t=e.events;return o.a.createElement(m.a,{className:"shadow-sm mt-3 text-center"},o.a.createElement(d.a,{style:{height:"60vh"}},o.a.createElement(s.a,null,o.a.createElement(u.a,{xs:"12"},o.a.createElement("h4",{className:"mb-4"},"My Calendar"),t?o.a.createElement(i.a,{popup:!0,localizer:P,defaultDate:new Date,messages:{previous:o.a.createElement("i",{className:"fa fa-angle-left"}),next:o.a.createElement("i",{className:"fa fa-angle-right"})},defaultView:"month",views:["month","week","day","agenda"],events:t,style:{height:"50vh"}}):o.a.createElement("div",{style:{position:"absolute",top:0,right:0,bottom:0,left:0,background:"rgba(255,255,255, 0.5)",display:"flex",justifyContent:"center",alignItems:"center"}},o.a.createElement(c.a,{style:{width:48,height:48}}))))))},z=function(e){var t=e.data;return o.a.createElement(m.a,{className:"shadow-sm mt-3 text-center"},o.a.createElement(d.a,{style:{height:"60vh"}},o.a.createElement(s.a,null,o.a.createElement(u.a,{xs:"12"},o.a.createElement("h4",{className:"mb-4"},"Trends")),o.a.createElement(u.a,{xs:"12"},o.a.createElement(s.a,null,o.a.createElement(u.a,{xs:"12",className:"px-0"},o.a.createElement("h6",null,"Average Time per Project"),o.a.createElement("div",{style:{fontSize:"30pt"}},t.totalDurationCloseProject?parseInt(t.totalDuration/t.totalDurationCloseProject).toFixed(2):0," hrs"),o.a.createElement("small",{className:"text-muted"},"Total ",t.totalDuration," hours")),o.a.createElement(u.a,{xs:"6",className:"mt-5"},o.a.createElement("div",null,"Skills"),o.a.createElement("div",null,o.a.createElement(w.a,{data:{labels:["Skill 1","Skill 2","Skill 3","Skill 4","Skill 5","Skill 6"],datasets:[{label:"Skills",data:[12,19,3,5,2,3],backgroundColor:["rgba(255, 99, 132, 0.7)","rgba(54, 162, 235, 0.7)","rgba(255, 206, 86, 0.7)","rgba(75, 192, 192, 0.7)","rgba(153, 102, 255, 0.7)","rgba(255, 159, 64, 0.7)"],borderColor:["rgba(255, 99, 132, 1)","rgba(54, 162, 235, 1)","rgba(255, 206, 86, 1)","rgba(75, 192, 192, 1)","rgba(153, 102, 255, 1)","rgba(255, 159, 64, 1)"],borderWidth:1}]},options:{maintainAspectRatio:!1,legend:!1,tooltips:{mode:"label"},responsive:!0,responsiveAnimationDuration:2e3,hover:{intersect:!0,mode:"point"},onHover:function(e,t){e.target.style.cursor=t[0]?"pointer":"default"}},height:250}))),o.a.createElement(u.a,{xs:"6",className:"mt-5"},o.a.createElement("div",null,"Sectors"),o.a.createElement("div",null,o.a.createElement(w.a,{data:{labels:["Sector 1","Sector 2","Sector 3","Sector 4","Sector 5","Sector 6"],datasets:[{label:"Sectors",data:[12,19,3,5,2,3],backgroundColor:["rgba(255, 99, 132, 0.7)","rgba(54, 162, 235, 0.7)","rgba(255, 206, 86, 0.7)","rgba(75, 192, 192, 0.7)","rgba(153, 102, 255, 0.7)","rgba(255, 159, 64, 0.7)"],borderColor:["rgba(255, 99, 132, 1)","rgba(54, 162, 235, 1)","rgba(255, 206, 86, 1)","rgba(75, 192, 192, 1)","rgba(153, 102, 255, 1)","rgba(255, 159, 64, 1)"],borderWidth:1}]},options:{maintainAspectRatio:!1,legend:!1,tooltips:{mode:"label"},responsive:!0,responsiveAnimationDuration:2e3,hover:{intersect:!0,mode:"point"},onHover:function(e,t){e.target.style.cursor=t[0]?"pointer":"default"}},height:250}))))))))},D=function(e){var t=e.data;return o.a.createElement(m.a,{className:"shadow-sm mt-3 text-center"},o.a.createElement(d.a,null,o.a.createElement(s.a,null,o.a.createElement(u.a,{xs:"12"},o.a.createElement("h3",{className:"mb-4"},"Finance")),o.a.createElement(u.a,{xs:"12",lg:"4"},o.a.createElement("small",null,"Total AP"),o.a.createElement("div",{style:{fontSize:"30pt",fontWeight:"bold"}},Object(T.a)(t.totalAR))),o.a.createElement(u.a,{xs:"12",lg:"4"},o.a.createElement("small",null,"Average AP per project"),o.a.createElement("div",{style:{fontSize:"30pt",fontWeight:"bold"}},Object(T.a)(t.averageAR))),o.a.createElement(u.a,{xs:"12",lg:"4"},o.a.createElement("small",null,"Estimated AP based on Tender"),o.a.createElement("div",{style:{fontSize:"30pt",fontWeight:"bold"}},Object(T.a)(t.estimateAR))))))};t.default=function(){var e,t,a=Object(S.b)(),r=Object(k.b)((function(){return"v1/user/me/dashboard"})),n=r.data,i=r.error,p=r.mutate,b=!n||i,h=Object(l.useMemo)((function(){var e,t;return null!==(e=null===n||void 0===n||null===(t=n.data)||void 0===t?void 0:t.data)&&void 0!==e?e:[]}),[n]);return b?o.a.createElement("div",{style:{position:"absolute",top:0,right:0,bottom:0,left:0,background:"rgba(255,255,255, 0.5)",display:"flex",justifyContent:"center",alignItems:"center"}},o.a.createElement(c.a,{style:{width:48,height:48}})):o.a.createElement(s.a,{className:"mt-md-3 mt-lg-n2"},o.a.createElement(u.a,{xs:"12"},o.a.createElement(m.a,{className:"shadow-sm"},o.a.createElement(d.a,null,o.a.createElement(s.a,null,o.a.createElement(u.a,{xs:"12",className:"d-flex justify-content-between"},o.a.createElement("h2",{className:"font-weight-bold mb-4"},a.name," ",o.a.createElement("small",{className:"text-muted"},null===(e=a.registrantInformation)||void 0===e?void 0:e.firstName," ",null===(t=a.registrantInformation)||void 0===t?void 0:t.lastName)),o.a.createElement("div",null,o.a.createElement(j.b,{to:"/project/create"},o.a.createElement(f.a,{color:"primary"},"Create Project")))),o.a.createElement(u.a,{xs:"12"},o.a.createElement(B,{data:null===h||void 0===h?void 0:h.projectList,mutate:p})),o.a.createElement(u.a,{xs:"12"},o.a.createElement(C,{data:null===h||void 0===h?void 0:h.projectStatistics})),o.a.createElement(u.a,{xs:"12",lg:"5"},o.a.createElement(O,{events:null===h||void 0===h?void 0:h.calenderDetails})),o.a.createElement(u.a,{xs:"12",lg:"7"},o.a.createElement(z,{data:null===h||void 0===h?void 0:h.trendDetails})),o.a.createElement(u.a,{xs:"12"},o.a.createElement(D,{data:null===h||void 0===h?void 0:h.financeStatistics})))))))}}}]);
//# sourceMappingURL=4.2933e88e.chunk.js.map