var __awaiter=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(i,s){function a(e){try{o(r.next(e))}catch(e){s(e)}}function l(e){try{o(r.throw(e))}catch(e){s(e)}}function o(e){e.done?i(e.value):new n(function(t){t(e.value)}).then(a,l)}o((r=r.apply(e,t||[])).next())})},__generator=this&&this.__generator||function(e,t){var n,r,i,s,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return s={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function l(s){return function(l){return function(s){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(i=2&s[0]?r.return:s[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,s[1])).done)return i;switch(r=0,i&&(s=[2&s[0],i.value]),s[0]){case 0:case 1:i=s;break;case 4:return a.label++,{value:s[1],done:!1};case 5:a.label++,r=s[1],s=[0];continue;case 7:s=a.ops.pop(),a.trys.pop();continue;default:if(!(i=(i=a.trys).length>0&&i[i.length-1])&&(6===s[0]||2===s[0])){a=0;continue}if(3===s[0]&&(!i||s[1]>i[0]&&s[1]<i[3])){a.label=s[1];break}if(6===s[0]&&a.label<i[1]){a.label=i[1],i=s;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(s);break}i[2]&&a.ops.pop(),a.trys.pop();continue}s=t.call(e,a)}catch(e){s=[6,e],r=0}finally{n=i=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,l])}}};EnhancedImageHtml.loadBundle("hnqfjk8x",["exports","./chunk-eb7227a3.js"],function(e,t){var n=window.EnhancedImageHtml.h,r=function(e){return new Promise(function(t){var n=new Image;n.onload=function(){return t(n)},n.src=e})},i=function(e){for(var t=atob(e.split(",")[1]),n=t.length,r=new Uint8Array(n),i=0;i<n;i++)r[i]=t.charCodeAt(i);return new Blob([r])},s=function(){function e(){var e=this;this.toggledSettings=!1,this.colorsInverted=!1,this.contrastSliderValue=t.SLIDER_DEFAULTS.contrast,this.hueSliderValue=t.SLIDER_DEFAULTS.hue,this.saturationSliderValue=t.SLIDER_DEFAULTS.saturation,this.brightnessSliderValue=t.SLIDER_DEFAULTS.brightness,this.toggleSettings=function(){e.toggledSettings=!e.toggledSettings},this.colorsInvert=function(){e.invertColors(),e.colorsInverted=!e.colorsInverted},this.handleSliderInput=function(t){e.setSlider(t.target.name,t.target.value)},this.saveImage=function(t){return __awaiter(e,void 0,void 0,function(){var e,n,s,a,l,o,c,u;return __generator(this,function(h){switch(h.label){case 0:return e=this.src,[4,r(this.src)];case 1:return n=h.sent(),s=n.height,a=n.width,(l=document.createElement("canvas")).width=a,l.height=s,(o=l.getContext("2d")).filter="\n            invert("+(this.colorsInverted?100:0)+"%)\n            contrast("+this.contrastSliderValue+"%)\n            hue-rotate("+this.hueSliderValue+"deg)\n            saturate("+this.saturationSliderValue+"%)\n            brightness("+this.brightnessSliderValue+"%)\n        ",o.drawImage(n,0,0,a,s),c=l.toDataURL("image/png"),u=i(c),t(u,e),[2]}})})},this.setSlider=function(t,n){var r=t+"SliderValue";e.setSliderValue(t,n),e[r]=n}}return e.prototype.componentWillUpdate=function(){this.colorsInverted=!!this.invert,this.contrastSliderValue=this.contrast,this.hueSliderValue=this.hue,this.saturationSliderValue=this.saturation,this.brightnessSliderValue=this.brightness},e.prototype.render=function(){return n("div",{class:"enhanced-image-settings-container enhanced-image-settings-container-"+this.location},n("enhanced-image-settings-button",{toggle:this.toggleSettings}),this.toggledSettings&&n("enhanced-image-settings-list",{colorsInvert:this.colorsInvert,colorsInverted:this.colorsInverted,contrastSliderValue:this.contrastSliderValue,hueSliderValue:this.hueSliderValue,saturationSliderValue:this.saturationSliderValue,brightnessSliderValue:this.brightnessSliderValue,handleSliderInput:this.handleSliderInput,setSlider:this.setSlider,fullscreen:this.fullscreen,fullscreenToggled:this.fullscreenToggled,saveImage:this.saveImage,location:this.location,setLocation:this.setLocation,textSelect:this.textSelect}))},Object.defineProperty(e,"is",{get:function(){return"enhanced-image-settings"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{brightness:{type:Number,attr:"brightness"},brightnessSliderValue:{state:!0},colorsInverted:{state:!0},contrast:{type:Number,attr:"contrast"},contrastSliderValue:{state:!0},fullscreen:{type:"Any",attr:"fullscreen"},fullscreenToggled:{type:Boolean,attr:"fullscreen-toggled"},hue:{type:Number,attr:"hue"},hueSliderValue:{state:!0},invert:{type:Number,attr:"invert"},invertColors:{type:"Any",attr:"invert-colors"},location:{type:String,attr:"location"},saturation:{type:Number,attr:"saturation"},saturationSliderValue:{state:!0},setLocation:{type:"Any",attr:"set-location"},setSliderValue:{type:"Any",attr:"set-slider-value"},src:{type:String,attr:"src"},textSelect:{type:Boolean,attr:"text-select"},toggledSettings:{state:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return".enhanced-image-settings-container.sc-enhanced-image-settings{display:grid;-ms-flex-align:center;align-items:center}.enhanced-image-settings-container-topright.sc-enhanced-image-settings{justify-items:right}.enhanced-image-settings-container-topleft.sc-enhanced-image-settings{justify-items:left}.enhanced-image-settings-container-bottomright.sc-enhanced-image-settings{justify-items:right}.enhanced-image-settings-container-bottomright.sc-enhanced-image-settings   enhanced-image-settings-button.sc-enhanced-image-settings{grid-row:2}.enhanced-image-settings-container-bottomleft.sc-enhanced-image-settings{justify-items:left}.enhanced-image-settings-container-bottomleft.sc-enhanced-image-settings   enhanced-image-settings-button.sc-enhanced-image-settings{grid-row:2}"},enumerable:!0,configurable:!0}),e}(),a=function(){function e(){}return e.prototype.render=function(){return n("div",{onClick:this.toggle,class:"enhanced-image-settings-button",innerHTML:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 930 930">\n  <defs>\n    <style>\n      .cls-1 {\n        fill: #2c2c2d;\n      }\n\n      .cls-2 {\n        fill: #fff;\n      }\n\n      .cls-3 {\n        fill: #252626;\n      }\n    </style>\n  </defs>\n  <title>Enhanced Image</title>\n  <g id="Layer_2" data-name="Layer 2">\n    <g id="Icon-Toggle">\n      <g>\n        <rect class="cls-1" width="930" height="930" rx="85.35"/>\n        <rect class="cls-2" x="140.21" y="222.58" width="650.76" height="35.3" rx="15"/>\n        <rect class="cls-2" x="140.21" y="444.99" width="650.76" height="35.3" rx="15"/>\n        <rect class="cls-2" x="140.21" y="672.11" width="650.76" height="35.3" rx="15"/>\n        <g>\n          <circle class="cls-3" cx="647.99" cy="240.82" r="85.61"/>\n          <path class="cls-2" d="M648,170.21a70.62,70.62,0,1,1-70.62,70.61A70.69,70.69,0,0,1,648,170.21m0-30A100.62,100.62,0,1,0,748.6,240.82,100.62,100.62,0,0,0,648,140.21Z"/>\n        </g>\n        <g>\n          <circle class="cls-3" cx="313.78" cy="460.88" r="85.61"/>\n          <path class="cls-2" d="M313.78,390.27a70.62,70.62,0,1,1-70.61,70.61,70.69,70.69,0,0,1,70.61-70.61m0-30A100.62,100.62,0,1,0,414.4,460.88,100.61,100.61,0,0,0,313.78,360.27Z"/>\n        </g>\n        <g>\n          <circle class="cls-3" cx="546.79" cy="690.35" r="85.61"/>\n          <path class="cls-2" d="M546.79,619.74a70.62,70.62,0,1,1-70.62,70.61,70.7,70.7,0,0,1,70.62-70.61m0-30A100.62,100.62,0,1,0,647.4,690.35,100.62,100.62,0,0,0,546.79,589.74Z"/>\n        </g>\n      </g>\n    </g>\n  </g>\n</svg>\n'})},Object.defineProperty(e,"is",{get:function(){return"enhanced-image-settings-button"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{toggle:{type:"Any",attr:"toggle"}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return".enhanced-image-settings-button.sc-enhanced-image-settings-button{cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;height:30px;width:30px}.enhanced-image-settings-button.sc-enhanced-image-settings-button   svg.sc-enhanced-image-settings-button{height:30px;width:30px;-webkit-filter:drop-shadow(0 0 3px #323334);filter:drop-shadow(0 0 3px hsl(220,2%,20%))}"},enumerable:!0,configurable:!0}),e}();e.EnhancedImageSettings=s,e.EnhancedImageSettingsButton=a,Object.defineProperty(e,"__esModule",{value:!0})});