/*! For license information please see 19.2a79169e.chunk.js.LICENSE.txt */
(this.webpackJsonppplatform=this.webpackJsonppplatform||[]).push([[19],{411:function(e,r,t){var n,a;void 0===(a="function"===typeof(n=function(){var e,r,t={},n={},a={currentLocale:"en",zeroFormat:null,nullFormat:null,defaultFormat:"0,0",scalePercentBy100:!0},i={currentLocale:a.currentLocale,zeroFormat:a.zeroFormat,nullFormat:a.nullFormat,defaultFormat:a.defaultFormat,scalePercentBy100:a.scalePercentBy100};function o(e,r){this._input=e,this._value=r}return(e=function(n){var a,l,u,c;if(e.isNumeral(n))a=n.value();else if(0===n||"undefined"===typeof n)a=0;else if(null===n||r.isNaN(n))a=null;else if("string"===typeof n)if(i.zeroFormat&&n===i.zeroFormat)a=0;else if(i.nullFormat&&n===i.nullFormat||!n.replace(/[^0-9]+/g,"").length)a=null;else{for(l in t)if((c="function"===typeof t[l].regexps.unformat?t[l].regexps.unformat():t[l].regexps.unformat)&&n.match(c)){u=t[l].unformat;break}a=(u=u||e._.stringToNumber)(n)}else a=Number(n)||null;return new o(n,a)}).version="2.0.6",e.isNumeral=function(e){return e instanceof o},e._=r={numberToFormat:function(r,t,a){var i,o,l,u,c,s,f,m,p=n[e.options.currentLocale],d=!1,v=!1,g="",b="",h=!1;if(r=r||0,l=Math.abs(r),e._.includes(t,"(")?(d=!0,t=t.replace(/[\(|\)]/g,"")):(e._.includes(t,"+")||e._.includes(t,"-"))&&(s=e._.includes(t,"+")?t.indexOf("+"):r<0?t.indexOf("-"):-1,t=t.replace(/[\+|\-]/g,"")),e._.includes(t,"a")&&(o=!!(o=t.match(/a(k|m|b|t)?/))&&o[1],e._.includes(t," a")&&(g=" "),t=t.replace(new RegExp(g+"a[kmbt]?"),""),l>=1e12&&!o||"t"===o?(g+=p.abbreviations.trillion,r/=1e12):l<1e12&&l>=1e9&&!o||"b"===o?(g+=p.abbreviations.billion,r/=1e9):l<1e9&&l>=1e6&&!o||"m"===o?(g+=p.abbreviations.million,r/=1e6):(l<1e6&&l>=1e3&&!o||"k"===o)&&(g+=p.abbreviations.thousand,r/=1e3)),e._.includes(t,"[.]")&&(v=!0,t=t.replace("[.]",".")),u=r.toString().split(".")[0],c=t.split(".")[1],f=t.indexOf(","),i=(t.split(".")[0].split(",")[0].match(/0/g)||[]).length,c?(e._.includes(c,"[")?(c=(c=c.replace("]","")).split("["),b=e._.toFixed(r,c[0].length+c[1].length,a,c[1].length)):b=e._.toFixed(r,c.length,a),u=b.split(".")[0],b=e._.includes(b,".")?p.delimiters.decimal+b.split(".")[1]:"",v&&0===Number(b.slice(1))&&(b="")):u=e._.toFixed(r,0,a),g&&!o&&Number(u)>=1e3&&g!==p.abbreviations.trillion)switch(u=String(Number(u)/1e3),g){case p.abbreviations.thousand:g=p.abbreviations.million;break;case p.abbreviations.million:g=p.abbreviations.billion;break;case p.abbreviations.billion:g=p.abbreviations.trillion}if(e._.includes(u,"-")&&(u=u.slice(1),h=!0),u.length<i)for(var y=i-u.length;y>0;y--)u="0"+u;return f>-1&&(u=u.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1"+p.delimiters.thousands)),0===t.indexOf(".")&&(u=""),m=u+b+(g||""),d?m=(d&&h?"(":"")+m+(d&&h?")":""):s>=0?m=0===s?(h?"-":"+")+m:m+(h?"-":"+"):h&&(m="-"+m),m},stringToNumber:function(e){var r,t,a,o=n[i.currentLocale],l=e,u={thousand:3,million:6,billion:9,trillion:12};if(i.zeroFormat&&e===i.zeroFormat)t=0;else if(i.nullFormat&&e===i.nullFormat||!e.replace(/[^0-9]+/g,"").length)t=null;else{for(r in t=1,"."!==o.delimiters.decimal&&(e=e.replace(/\./g,"").replace(o.delimiters.decimal,".")),u)if(a=new RegExp("[^a-zA-Z]"+o.abbreviations[r]+"(?:\\)|(\\"+o.currency.symbol+")?(?:\\))?)?$"),l.match(a)){t*=Math.pow(10,u[r]);break}t*=(e.split("-").length+Math.min(e.split("(").length-1,e.split(")").length-1))%2?1:-1,e=e.replace(/[^0-9\.]+/g,""),t*=Number(e)}return t},isNaN:function(e){function r(r){return e.apply(this,arguments)}return r.toString=function(){return e.toString()},r}((function(e){return"number"===typeof e&&isNaN(e)})),includes:function(e,r){return-1!==e.indexOf(r)},insert:function(e,r,t){return e.slice(0,t)+r+e.slice(t)},reduce:function(e,r){if(null===this)throw new TypeError("Array.prototype.reduce called on null or undefined");if("function"!==typeof r)throw new TypeError(r+" is not a function");var t,n=Object(e),a=n.length>>>0,i=0;if(3===arguments.length)t=arguments[2];else{for(;i<a&&!(i in n);)i++;if(i>=a)throw new TypeError("Reduce of empty array with no initial value");t=n[i++]}for(;i<a;i++)i in n&&(t=r(t,n[i],i,n));return t},multiplier:function(e){var r=e.toString().split(".");return r.length<2?1:Math.pow(10,r[1].length)},correctionFactor:function(){var e=Array.prototype.slice.call(arguments);return e.reduce((function(e,t){var n=r.multiplier(t);return e>n?e:n}),1)},toFixed:function(e,r,t,n){var a,i,o,l,u=e.toString().split("."),c=r-(n||0);return a=2===u.length?Math.min(Math.max(u[1].length,c),r):c,o=Math.pow(10,a),l=(t(e+"e+"+a)/o).toFixed(a),n>r-a&&(i=new RegExp("\\.?0{1,"+(n-(r-a))+"}$"),l=l.replace(i,"")),l}},e.options=i,e.formats=t,e.locales=n,e.locale=function(e){return e&&(i.currentLocale=e.toLowerCase()),i.currentLocale},e.localeData=function(e){if(!e)return n[i.currentLocale];if(e=e.toLowerCase(),!n[e])throw new Error("Unknown locale : "+e);return n[e]},e.reset=function(){for(var e in a)i[e]=a[e]},e.zeroFormat=function(e){i.zeroFormat="string"===typeof e?e:null},e.nullFormat=function(e){i.nullFormat="string"===typeof e?e:null},e.defaultFormat=function(e){i.defaultFormat="string"===typeof e?e:"0.0"},e.register=function(e,r,t){if(r=r.toLowerCase(),this[e+"s"][r])throw new TypeError(r+" "+e+" already registered.");return this[e+"s"][r]=t,t},e.validate=function(r,t){var n,a,i,o,l,u,c,s;if("string"!==typeof r&&(r+="",console.warn&&console.warn("Numeral.js: Value is not string. It has been co-erced to: ",r)),(r=r.trim()).match(/^\d+$/))return!0;if(""===r)return!1;try{c=e.localeData(t)}catch(f){c=e.localeData(e.locale())}return i=c.currency.symbol,l=c.abbreviations,n=c.delimiters.decimal,a="."===c.delimiters.thousands?"\\.":c.delimiters.thousands,(null===(s=r.match(/^[^\d]+/))||(r=r.substr(1),s[0]===i))&&(null===(s=r.match(/[^\d]+$/))||(r=r.slice(0,-1),s[0]===l.thousand||s[0]===l.million||s[0]===l.billion||s[0]===l.trillion))&&(u=new RegExp(a+"{2}"),!r.match(/[^\d.,]/g)&&!((o=r.split(n)).length>2)&&(o.length<2?!!o[0].match(/^\d+.*\d$/)&&!o[0].match(u):1===o[0].length?!!o[0].match(/^\d+$/)&&!o[0].match(u)&&!!o[1].match(/^\d+$/):!!o[0].match(/^\d+.*\d$/)&&!o[0].match(u)&&!!o[1].match(/^\d+$/)))},e.fn=o.prototype={clone:function(){return e(this)},format:function(r,n){var a,o,l,u=this._value,c=r||i.defaultFormat;if(n=n||Math.round,0===u&&null!==i.zeroFormat)o=i.zeroFormat;else if(null===u&&null!==i.nullFormat)o=i.nullFormat;else{for(a in t)if(c.match(t[a].regexps.format)){l=t[a].format;break}o=(l=l||e._.numberToFormat)(u,c,n)}return o},value:function(){return this._value},input:function(){return this._input},set:function(e){return this._value=Number(e),this},add:function(e){var t=r.correctionFactor.call(null,this._value,e);return this._value=r.reduce([this._value,e],(function(e,r,n,a){return e+Math.round(t*r)}),0)/t,this},subtract:function(e){var t=r.correctionFactor.call(null,this._value,e);return this._value=r.reduce([e],(function(e,r,n,a){return e-Math.round(t*r)}),Math.round(this._value*t))/t,this},multiply:function(e){return this._value=r.reduce([this._value,e],(function(e,t,n,a){var i=r.correctionFactor(e,t);return Math.round(e*i)*Math.round(t*i)/Math.round(i*i)}),1),this},divide:function(e){return this._value=r.reduce([this._value,e],(function(e,t,n,a){var i=r.correctionFactor(e,t);return Math.round(e*i)/Math.round(t*i)})),this},difference:function(r){return Math.abs(e(this._value).subtract(r).value())}},e.register("locale","en",{delimiters:{thousands:",",decimal:"."},abbreviations:{thousand:"k",million:"m",billion:"b",trillion:"t"},ordinal:function(e){var r=e%10;return 1===~~(e%100/10)?"th":1===r?"st":2===r?"nd":3===r?"rd":"th"},currency:{symbol:"$"}}),e.register("format","bps",{regexps:{format:/(BPS)/,unformat:/(BPS)/},format:function(r,t,n){var a,i=e._.includes(t," BPS")?" ":"";return r*=1e4,t=t.replace(/\s?BPS/,""),a=e._.numberToFormat(r,t,n),e._.includes(a,")")?((a=a.split("")).splice(-1,0,i+"BPS"),a=a.join("")):a=a+i+"BPS",a},unformat:function(r){return+(1e-4*e._.stringToNumber(r)).toFixed(15)}}),function(){var r={base:1e3,suffixes:["B","KB","MB","GB","TB","PB","EB","ZB","YB"]},t={base:1024,suffixes:["B","KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"]},n=r.suffixes.concat(t.suffixes.filter((function(e){return r.suffixes.indexOf(e)<0}))).join("|");n="("+n.replace("B","B(?!PS)")+")",e.register("format","bytes",{regexps:{format:/([0\s]i?b)/,unformat:new RegExp(n)},format:function(n,a,i){var o,l,u,c=e._.includes(a,"ib")?t:r,s=e._.includes(a," b")||e._.includes(a," ib")?" ":"";for(a=a.replace(/\s?i?b/,""),o=0;o<=c.suffixes.length;o++)if(l=Math.pow(c.base,o),u=Math.pow(c.base,o+1),null===n||0===n||n>=l&&n<u){s+=c.suffixes[o],l>0&&(n/=l);break}return e._.numberToFormat(n,a,i)+s},unformat:function(n){var a,i,o=e._.stringToNumber(n);if(o){for(a=r.suffixes.length-1;a>=0;a--){if(e._.includes(n,r.suffixes[a])){i=Math.pow(r.base,a);break}if(e._.includes(n,t.suffixes[a])){i=Math.pow(t.base,a);break}}o*=i||1}return o}})}(),e.register("format","currency",{regexps:{format:/(\$)/},format:function(r,t,n){var a,i,o=e.locales[e.options.currentLocale],l={before:t.match(/^([\+|\-|\(|\s|\$]*)/)[0],after:t.match(/([\+|\-|\)|\s|\$]*)$/)[0]};for(t=t.replace(/\s?\$\s?/,""),a=e._.numberToFormat(r,t,n),r>=0?(l.before=l.before.replace(/[\-\(]/,""),l.after=l.after.replace(/[\-\)]/,"")):r<0&&!e._.includes(l.before,"-")&&!e._.includes(l.before,"(")&&(l.before="-"+l.before),i=0;i<l.before.length;i++)switch(l.before[i]){case"$":a=e._.insert(a,o.currency.symbol,i);break;case" ":a=e._.insert(a," ",i+o.currency.symbol.length-1)}for(i=l.after.length-1;i>=0;i--)switch(l.after[i]){case"$":a=i===l.after.length-1?a+o.currency.symbol:e._.insert(a,o.currency.symbol,-(l.after.length-(1+i)));break;case" ":a=i===l.after.length-1?a+" ":e._.insert(a," ",-(l.after.length-(1+i)+o.currency.symbol.length-1))}return a}}),e.register("format","exponential",{regexps:{format:/(e\+|e-)/,unformat:/(e\+|e-)/},format:function(r,t,n){var a=("number"!==typeof r||e._.isNaN(r)?"0e+0":r.toExponential()).split("e");return t=t.replace(/e[\+|\-]{1}0/,""),e._.numberToFormat(Number(a[0]),t,n)+"e"+a[1]},unformat:function(r){var t=e._.includes(r,"e+")?r.split("e+"):r.split("e-"),n=Number(t[0]),a=Number(t[1]);return a=e._.includes(r,"e-")?a*=-1:a,e._.reduce([n,Math.pow(10,a)],(function(r,t,n,a){var i=e._.correctionFactor(r,t);return r*i*(t*i)/(i*i)}),1)}}),e.register("format","ordinal",{regexps:{format:/(o)/},format:function(r,t,n){var a=e.locales[e.options.currentLocale],i=e._.includes(t," o")?" ":"";return t=t.replace(/\s?o/,""),i+=a.ordinal(r),e._.numberToFormat(r,t,n)+i}}),e.register("format","percentage",{regexps:{format:/(%)/,unformat:/(%)/},format:function(r,t,n){var a,i=e._.includes(t," %")?" ":"";return e.options.scalePercentBy100&&(r*=100),t=t.replace(/\s?\%/,""),a=e._.numberToFormat(r,t,n),e._.includes(a,")")?((a=a.split("")).splice(-1,0,i+"%"),a=a.join("")):a=a+i+"%",a},unformat:function(r){var t=e._.stringToNumber(r);return e.options.scalePercentBy100?.01*t:t}}),e.register("format","time",{regexps:{format:/(:)/,unformat:/(:)/},format:function(e,r,t){var n=Math.floor(e/60/60),a=Math.floor((e-60*n*60)/60),i=Math.round(e-60*n*60-60*a);return n+":"+(a<10?"0"+a:a)+":"+(i<10?"0"+i:i)},unformat:function(e){var r=e.split(":"),t=0;return 3===r.length?(t+=60*Number(r[0])*60,t+=60*Number(r[1]),t+=Number(r[2])):2===r.length&&(t+=60*Number(r[0]),t+=Number(r[1])),Number(t)}}),e})?n.call(r,t,r,e):n)||(e.exports=a)},459:function(e,r,t){"use strict";var n=t(0),a=t.n(n),i=function(){return(i=Object.assign||function(e){for(var r,t=1,n=arguments.length;t<n;t++)for(var a in r=arguments[t])Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a]);return e}).apply(this,arguments)};function o(e,r,t){if(t||2===arguments.length)for(var n,a=0,i=r.length;a<i;a++)!n&&a in r||(n||(n=Array.prototype.slice.call(r,0,a)),n[a]=r[a]);return e.concat(n||r)}var l=function(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")},u={k:1e3,m:1e6,b:1e9},c=function(e){var r=e.value,t=e.groupSeparator,n=void 0===t?",":t,a=e.decimalSeparator,i=void 0===a?".":a,c=e.allowDecimals,s=void 0===c||c,f=e.decimalsLimit,m=void 0===f?2:f,p=e.allowNegativeValue,d=void 0===p||p,v=e.disableAbbreviations,g=void 0!==v&&v,b=e.prefix,h=void 0===b?"":b;if("-"===r)return r;var y=g?[]:["k","m","b"],x=new RegExp("((^|\\D)-\\d)|(-"+l(h)+")").test(r),w=RegExp("(\\d+)-?"+l(h)).exec(r)||[],S=w[0],F=w[1],_=function(e,r){var t=l(r.join("")),n=new RegExp("[^\\d"+t+"]","gi");return e.replace(n,"")}(function(e,r){void 0===r&&(r=",");var t=new RegExp(l(r),"g");return e.replace(t,"")}(h?S?r.replace(S,"").concat(F):r.replace(h,""):r,n),o([n,i],y)),N=_;if(!g){if(y.some((function(e){return e===_.toLowerCase()})))return"";var B=function(e,r){void 0===r&&(r=".");var t=new RegExp("(\\d+("+l(r)+"\\d*)?)([kmb])$","i"),n=e.match(t);if(n){var a=n[1],i=n[3],o=u[i.toLowerCase()];return Number(a.replace(r,"."))*o}}(_,i);B&&(N=String(B))}var E=x&&d?"-":"";if(i&&N.includes(i)){var M=_.split(i),O=M[0],j=M[1],L=m&&j?j.slice(0,m):j;return""+E+O+(s?""+i+L:"")}return""+E+N},s=function(e,r){var t=r.groupSeparator,n=void 0===t?",":t,a=r.decimalSeparator,i=void 0===a?".":a,o=new RegExp("\\d([^"+l(n)+l(i)+"0-9]+)"),u=e.match(o);return u?u[1]:void 0},f=function(e){var r=e.value,t=e.decimalSeparator,n=e.intlConfig,a=e.decimalScale,o=e.prefix,u=void 0===o?"":o,c=e.suffix,f=void 0===c?"":c;if(""===r||void 0===r)return"";if("-"===r)return"-";var d=new RegExp("^\\d?-"+(u?l(u)+"?":"")+"\\d").test(r),v="."!==t?m(r,t,d):r,g=(n?new Intl.NumberFormat(n.locale,n.currency?{style:"currency",currency:n.currency,minimumFractionDigits:a||0,maximumFractionDigits:20}:void 0):new Intl.NumberFormat(void 0,{minimumFractionDigits:a||0,maximumFractionDigits:20})).formatToParts(Number(v)),b=p(g,e),h=s(b,i({},e)),y=r.slice(-1)===t?t:"",x=(v.match(RegExp("\\d+\\.(\\d+)"))||[])[1];return void 0===a&&x&&t&&(b=b.includes(t)?b.replace(RegExp("(\\d+)("+l(t)+")(\\d+)","g"),"$1$2"+x):h&&!f?b.replace(h,""+t+x+h):""+b+t+x),f&&y?""+b+y+f:h&&y?b.replace(h,""+y+h):h&&f?b.replace(h,""+y+f):[b,y,f].join("")},m=function(e,r,t){var n=e;return r&&"."!==r&&(n=n.replace(RegExp(l(r),"g"),"."),t&&"-"===r&&(n="-"+n.slice(1))),n},p=function(e,r){var t=r.prefix,n=r.groupSeparator,a=r.decimalSeparator,i=r.decimalScale,l=r.disableGroupSeparators,u=void 0!==l&&l;return e.reduce((function(e,r,l){var c=r.type,s=r.value;return 0===l&&t?"minusSign"===c?[s,t]:"currency"===c?o(o([],e),[t]):[t,s]:"currency"===c?t?e:o(o([],e),[s]):"group"===c?u?e:o(o([],e),[void 0!==n?n:s]):"decimal"===c?void 0!==i&&0===i?e:o(o([],e),[void 0!==a?a:s]):o(o([],e),"fraction"===c?[void 0!==i?s.slice(0,i):s]:[s])}),[""]).join("")},d={currencySymbol:"",groupSeparator:"",decimalSeparator:"",prefix:"",suffix:""},v=function(e){return RegExp(/\d/,"gi").test(e)},g=Object(n.forwardRef)((function(e,r){var t=e.allowDecimals,o=void 0===t||t,l=e.allowNegativeValue,u=void 0===l||l,m=e.id,p=e.name,g=e.className,b=e.customInput,h=e.decimalsLimit,y=e.defaultValue,x=e.disabled,w=void 0!==x&&x,S=e.maxLength,F=e.value,_=e.onValueChange,N=e.fixedDecimalLength,B=e.placeholder,E=e.decimalScale,M=e.prefix,O=e.suffix,j=e.intlConfig,L=e.step,R=e.min,$=e.max,k=e.disableGroupSeparators,T=void 0!==k&&k,D=e.disableAbbreviations,P=void 0!==D&&D,C=e.decimalSeparator,A=e.groupSeparator,z=e.onChange,I=e.onFocus,V=e.onBlur,K=e.onKeyDown,U=e.onKeyUp,G=function(e,r){var t={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&r.indexOf(n)<0&&(t[n]=e[n]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(n=Object.getOwnPropertySymbols(e);a<n.length;a++)r.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(e,n[a])&&(t[n[a]]=e[n[a]])}return t}(e,["allowDecimals","allowNegativeValue","id","name","className","customInput","decimalsLimit","defaultValue","disabled","maxLength","value","onValueChange","fixedDecimalLength","placeholder","decimalScale","prefix","suffix","intlConfig","step","min","max","disableGroupSeparators","disableAbbreviations","decimalSeparator","groupSeparator","onChange","onFocus","onBlur","onKeyDown","onKeyUp"]);if(C&&v(C))throw new Error("decimalSeparator cannot be a number");if(A&&v(A))throw new Error("groupSeparator cannot be a number");var Z=Object(n.useMemo)((function(){return function(e){var r=e||{},t=r.locale,n=r.currency;return(t?new Intl.NumberFormat(t,n?{currency:n,style:"currency"}:void 0):new Intl.NumberFormat).formatToParts(1000.1).reduce((function(e,r,t){return"currency"===r.type?i(i({},e),0===t?{currencySymbol:r.value,prefix:r.value}:{currencySymbol:r.value,suffix:r.value}):"group"===r.type?i(i({},e),{groupSeparator:r.value}):"decimal"===r.type?i(i({},e),{decimalSeparator:r.value}):e}),d)}(j)}),[j]),J=C||Z.decimalSeparator||"",Y=A||Z.groupSeparator||"";if(J&&Y&&J===Y&&!1===T)throw new Error("decimalSeparator cannot be the same as groupSeparator");var q={decimalSeparator:J,groupSeparator:Y,disableGroupSeparators:T,intlConfig:j,prefix:M||Z.prefix,suffix:O},H={decimalSeparator:J,groupSeparator:Y,allowDecimals:o,decimalsLimit:h||N||2,allowNegativeValue:u,disableAbbreviations:P,prefix:M||Z.prefix},Q=void 0!==y&&null!==y?f(i(i({},q),{decimalScale:E,value:String(y)})):void 0!==F&&null!==F?f(i(i({},q),{decimalScale:E,value:String(F)})):"",W=Object(n.useState)(Q),X=W[0],ee=W[1],re=Object(n.useState)(!1),te=re[0],ne=re[1],ae=Object(n.useState)(0),ie=ae[0],oe=ae[1],le=r||Object(n.useRef)(null),ue=function(e,r){ne(!0);var t=c(i({value:e},H));if(!(S&&t.replace(/-/g,"").length>S)){if(""===t||"-"===t||t===J)return _&&_(void 0,p,{float:null,formatted:"",value:""}),void ee(t);var n=parseFloat(t.replace(J,".")),a=f(i({value:t},q));if(void 0!==r&&null!==r){var o=r+(a.length-e.length)||1;oe(o)}if(ee(a),_)_(t,p,{float:n,formatted:a,value:t})}};Object(n.useEffect)((function(){te&&"-"!==X&&le&&"object"===typeof le&&le.current&&le.current.setSelectionRange(ie,ie)}),[X,ie,le,te]);var ce=i({type:"text",inputMode:"decimal",id:m,name:p,className:g,onChange:function(e){var r=e.target,t=r.value,n=r.selectionStart;ue(t,n),z&&z(e)},onBlur:function(e){var r=e.target.value,t=c(i({value:r},H));if("-"===t||!t)return ee(""),void(V&&V(e));var n=function(e,r,t){if(void 0===r&&(r="."),void 0===t||""===e||void 0===e)return e;if(!e.match(/\d/g))return"";var n=e.split(r),a=n[0],i=n[1];if(0===t)return a;var o=i||"";if(o.length<t)for(;o.length<t;)o+="0";else o=o.slice(0,t);return""+a+r+o}(function(e,r,t){if(t&&e.length>1){if(e.includes(r)){var n=e.split(r),a=n[0];if((i=n[1]).length>t)return""+a+r+i.slice(0,t)}var i,o=e.length>t?new RegExp("(\\d+)(\\d{"+t+"})"):new RegExp("(\\d)(\\d+)"),l=e.match(o);if(l)return""+(a=l[1])+r+(i=l[2])}return e}(t,J,N),J,void 0!==E?E:N),a=parseFloat(n.replace(J,".")),o=f(i(i({},q),{value:n}));_&&_(n,p,{float:a,formatted:o,value:n}),ee(o),V&&V(e)},onFocus:function(e){return I&&I(e),X?X.length:0},onKeyDown:function(e){var r=e.key;if(L&&("ArrowUp"===r||"ArrowDown"===r)){e.preventDefault(),oe(X.length);var t=parseFloat(void 0!==F&&null!==F?String(F).replace(J,"."):c(i({value:X},H)))||0,n="ArrowUp"===r?t+L:t-L;if(void 0!==R&&n<R)return;if(void 0!==$&&n>$)return;var a=String(L).includes(".")?Number(String(L).split(".")[1].length):void 0;ue(String(a?n.toFixed(a):n).replace(".",J))}K&&K(e)},onKeyUp:function(e){var r=e.key,t=e.currentTarget.selectionStart;if("ArrowUp"!==r&&"ArrowDown"!==r&&"-"!==X){var n=s(X,{groupSeparator:Y,decimalSeparator:J});if(n&&t&&t>X.length-n.length&&le&&"object"===typeof le&&le.current){var a=X.length-n.length;le.current.setSelectionRange(a,a)}}U&&U(e)},placeholder:B,disabled:w,value:void 0!==F&&null!==F&&"-"!==X&&X!==J?f(i(i({},q),{decimalScale:te?void 0:E,value:String(F)})):X,ref:le},G);if(b){var se=b;return a.a.createElement(se,i({},ce))}return a.a.createElement("input",i({},ce))}));g.displayName="CurrencyInput",r.a=g}}]);
//# sourceMappingURL=19.2a79169e.chunk.js.map