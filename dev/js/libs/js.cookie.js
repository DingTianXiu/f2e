/*!
 * JavaScript Cookie v2.1.0
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
!function(a){var b,c;"function"==typeof define&&define.amd?define(a):"object"==typeof exports?module.exports=a():(b=window.Cookies,c=window.Cookies=a(),c.noConflict=function(){return window.Cookies=b,c})}(function(){function a(){for(var c,d,a=0,b={};a<arguments.length;a++){c=arguments[a];for(d in c)b[d]=c[d]}return b}function b(c){function d(b,e,f){var g,h,j,k,l,m,n,o;if(arguments.length>1){f=a({path:"/"},d.defaults,f),"number"==typeof f.expires&&(h=new Date,h.setMilliseconds(h.getMilliseconds()+864e5*f.expires),f.expires=h);try{g=JSON.stringify(e),/^[\{\[]/.test(g)&&(e=g)}catch(i){}return e=c.write?c.write(e,b):encodeURIComponent(String(e)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),b=encodeURIComponent(String(b)),b=b.replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent),b=b.replace(/[\(\)]/g,escape),document.cookie=[b,"=",e,f.expires&&"; expires="+f.expires.toUTCString(),f.path&&"; path="+f.path,f.domain&&"; domain="+f.domain,f.secure?"; secure":""].join("")}for(b||(g={}),j=document.cookie?document.cookie.split("; "):[],k=/(%[0-9A-Z]{2})+/g,l=0;l<j.length;l++){m=j[l].split("="),n=m[0].replace(k,decodeURIComponent),o=m.slice(1).join("="),'"'===o.charAt(0)&&(o=o.slice(1,-1));try{if(o=c.read?c.read(o,n):c(o,n)||o.replace(k,decodeURIComponent),this.json)try{o=JSON.parse(o)}catch(i){}if(b===n){g=o;break}b||(g[n]=o)}catch(i){}}return g}return d.get=d.set=d,d.getJSON=function(){return d.apply({json:!0},[].slice.call(arguments))},d.defaults={},d.remove=function(b,c){d(b,"",a(c,{expires:-1}))},d.withConverter=b,d}return b(function(){})});