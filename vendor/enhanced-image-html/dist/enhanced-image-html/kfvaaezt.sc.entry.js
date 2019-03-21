const t=window.EnhancedImageHtml.h;import{a as e,b as s}from"./chunk-3135fd79.js";const i=t=>{let e=t.trim();return e.replace(/-([a-z])/g,t=>t[1].toUpperCase())},a=t=>t.trim(),n=t=>{const e={},s=t.split(";");for(let t=0;t<s.length-1;t++){let n=i(s[t].split(":")[0]),l=a(s[t].split(":")[1]);e[n]=l}return e};class l{constructor(){this.invertValue=e.invert,this.contrastValue=e.contrast,this.hueValue=e.hue,this.saturationValue=e.saturation,this.brightnessValue=e.brightness,this.fullscreenToggled=!1,this.fullscreenStyles={},this.location="topright",this.invertColors=(()=>{this.invertValue=1==this.invertValue?0:1}),this.setSliderValue=((t,e)=>{this[`${t}Value`]=e}),this.fullscreen=(()=>{this.fullscreenToggled?(document.exitFullscreen(),this.fullscreenStyles={}):(this.element.requestFullscreen(),this.fullscreenStyles=s),this.fullscreenToggled=!this.fullscreenToggled}),this.setLocation=(t=>{this.location=t})}componentWillLoad(){this.styled=this.styling?n(this.styling):{},this.location=this.settingsPosition?this.settingsPosition:"topright",this.invert&&(this.invertValue=parseInt(this.invert)),this.contrast&&(this.contrastValue=parseInt(this.contrast)),this.hue&&(this.hueValue=parseInt(this.hue)),this.saturation&&(this.saturationValue=parseInt(this.saturation)),this.lightness&&(this.brightnessValue=parseInt(this.lightness))}componentWillUpdate(){this.invert=this.invertValue+"",this.contrast=this.contrastValue+"",this.hue=this.hueValue+"",this.saturation=this.saturationValue+"",this.lightness=this.brightnessValue+"",this.settingsPosition=this.location+""}invertWatch(t){this.invert=t,this.invertValue=parseInt(t)}contrastWatch(t){this.contrast=t,this.contrastValue=parseInt(t)}hueWatch(t){this.hue=t,this.hueValue=parseInt(t)}saturationWatch(t){this.saturation=t,this.saturationValue=parseInt(t)}lightnessWatch(t){this.lightness=t,this.brightnessValue=parseInt(t)}settingsPositionWatch(t){this.settingsPosition=t,this.location=t}exitFullscreenHandler(){document.webkitIsFullScreen||(this.fullscreenStyles={},this.fullscreenToggled=!1)}render(){return t("div",{style:Object.assign({},this.styled,this.fullscreenStyles),class:`enhanced-image-container ${this.classes?this.classes:""}`},t("enhanced-image-settings",{class:`enhanced-image-settings enhanced-image-settings-${this.location}`,src:this.src,invertColors:this.invertColors,setSliderValue:this.setSliderValue,fullscreen:this.fullscreen,fullscreenToggled:this.fullscreenToggled,invert:this.invertValue,contrast:this.contrastValue,hue:this.hueValue,saturation:this.saturationValue,brightness:this.brightnessValue,location:this.location,setLocation:this.setLocation,textSelect:this.textSelect}),t("img",{src:this.src,style:{filter:`\n                            invert(${this.invertValue})\n                            contrast(${this.contrastValue}%)\n                            hue-rotate(${this.hueValue}deg)\n                            saturate(${this.saturationValue}%)\n                            brightness(${this.brightnessValue}%)\n                        `,height:`${this.height?this.height+"px":null}`,width:`${this.width?this.width+"px":null}`},alt:this.alt?this.alt:"",class:"enhanced-image"}))}static get is(){return"enhanced-image"}static get properties(){return{alt:{type:String,attr:"alt"},brightnessValue:{state:!0},classes:{type:String,attr:"classes"},contrast:{type:String,attr:"contrast",reflectToAttr:!0,mutable:!0,watchCallbacks:["contrastWatch"]},contrastValue:{state:!0},element:{elementRef:!0},fullscreenStyles:{state:!0},fullscreenToggled:{state:!0},height:{type:String,attr:"height"},hue:{type:String,attr:"hue",reflectToAttr:!0,mutable:!0,watchCallbacks:["hueWatch"]},hueValue:{state:!0},invert:{type:String,attr:"invert",reflectToAttr:!0,mutable:!0,watchCallbacks:["invertWatch"]},invertValue:{state:!0},lightness:{type:String,attr:"lightness",reflectToAttr:!0,mutable:!0,watchCallbacks:["lightnessWatch"]},location:{state:!0},saturation:{type:String,attr:"saturation",reflectToAttr:!0,mutable:!0,watchCallbacks:["saturationWatch"]},saturationValue:{state:!0},settingsPosition:{type:String,attr:"settings-position",reflectToAttr:!0,mutable:!0,watchCallbacks:["settingsPositionWatch"]},src:{type:String,attr:"src"},styled:{state:!0},styling:{type:String,attr:"styling"},textSelect:{type:Boolean,attr:"text-select",reflectToAttr:!0,mutable:!0},width:{type:String,attr:"width"}}}static get listeners(){return[{name:"window:fullscreenchange",method:"exitFullscreenHandler"}]}static get style(){return".enhanced-image-container{position:relative}.enhanced-image-container:-webkit-full-screen{min-height:100%!important;height:100%!important}.enhanced-image{width:100%}.enhanced-image-settings{position:absolute;display:none;z-index:9999}.enhanced-image-settings-topright{right:20px;top:20px}.enhanced-image-settings-topleft{top:20px;left:20px}.enhanced-image-settings-bottomleft{bottom:20px;left:20px}.enhanced-image-settings-bottomright{bottom:20px;right:20px}.enhanced-image-container:hover .enhanced-image-settings{display:block}"}}export{l as EnhancedImage};