(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{277:function(t,e,n){"use strict";n.r(e);var o,r=n(242),a=n(1),i=n(57),l=(o=function(t,e){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),c=function(t,e,n,o){var r,a=arguments.length,i=a<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,n,o);else for(var l=t.length-1;l>=0;l--)(r=t[l])&&(i=(a<3?r(i):a>3?r(e,n,i):r(e,n))||i);return a>3&&i&&Object.defineProperty(e,n,i),i},s=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.mobileOrEmail=null,e.captcha=null,e.snakeCase=r.a,e}return l(e,t),e=c([Object(a.Component)({components:{RbInput:i.a},translator:{zh:{mobile_or_email:"手机号或邮箱",captcha:"验证码",verify_now:"立即验证"},en:{mobile_or_email:"Mobile or Email",captcha:"Captcha",verify_now:"Verify Now"}},validator:{mobileOrEmail:{minLength:1},captcha:{minLength:1}}})],e)}(a.Vue),u=n(4),p=Object(u.a)(s,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("main",[n("form",{on:{submit:function(e){return e.preventDefault(),t.login(e)}}},[n("div",[t._v(t._s(t.$t("forget_password")))]),t._l(["mobileOrEmail","captcha"],function(e){return n("rb-input",{key:e,class:{invalid:t.$v[e].$error},attrs:{label:t.$t(t.snakeCase(e)),captcha:"captcha"===e},on:{input:function(n){t.$v[e].$touch()}},model:{value:t._self[e],callback:function(n){t.$set(t._self,e,n)},expression:"_self[type]"}},[t.$v[e].$error?n("template",{slot:"error"},[t._v(t._s(t.$t("required")))]):t._e()],2)}),n("rb-btn",{staticClass:"btn-block",attrs:{type:"submit",disabled:t.$v.$invalid}},[t._v(t._s(t.$t("verify_now")))])],2),n("div",{staticClass:"tips text-center"},[n("router-link",{attrs:{to:"/login"}},[t._v(t._s(t.$t("login_tips")))])],1)])},[],!1,null,null,null);p.options.__file="ForgetPassword.vue";e.default=p.exports}}]);