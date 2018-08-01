<!-- use jssor.slider.debug.js instead for debug -->
jQuery(document).ready(function ($) {

var jssor_1_SlideoTransitions = [
  [{b:0,d:600,y:-290,e:{y:27}}],
  [{b:0,d:1000,y:185},{b:1000,d:500,o:-1},{b:1500,d:500,o:1},{b:2000,d:1500,r:360},{b:3500,d:1000,rX:30},{b:4500,d:500,rX:-30},{b:5000,d:1000,rY:30},{b:6000,d:500,rY:-30},{b:6500,d:500,sX:1},{b:7000,d:500,sX:-1},{b:7500,d:500,sY:1},{b:8000,d:500,sY:-1},{b:8500,d:500,kX:30},{b:9000,d:500,kX:-30},{b:9500,d:500,kY:30},{b:10000,d:500,kY:-30},{b:10500,d:500,c:{x:87.50,t:-87.50}},{b:11000,d:500,c:{x:-87.50,t:87.50}}],
  [{b:0,d:600,x:410,e:{x:27}}],
  [{b:-1,d:1,o:-1},{b:0,d:600,o:1,e:{o:5}}],
  [{b:-1,d:1,c:{x:175.0,t:-175.0}},{b:0,d:800,c:{x:-175.0,t:175.0},e:{c:{x:7,t:7}}}],
  [{b:-1,d:1,o:-1},{b:0,d:600,x:-570,o:1,e:{x:6}}],
  [{b:-1,d:1,o:-1,r:-180},{b:0,d:800,o:1,r:180,e:{r:7}}],
  [{b:0,d:1000,y:80,e:{y:24}},{b:1000,d:1100,x:570,y:170,o:-1,r:30,sX:9,sY:9,e:{x:2,y:6,r:1,sX:5,sY:5}}],
  [{b:2000,d:600,rY:30}],
  [{b:0,d:500,x:-105},{b:500,d:500,x:230},{b:1000,d:500,y:-120},{b:1500,d:500,x:-70,y:120},{b:2600,d:500,y:-80},{b:3100,d:900,y:160,e:{y:24}}],
  [{b:0,d:1000,o:-0.4,rX:2,rY:1},{b:1000,d:1000,rY:1},{b:2000,d:1000,rX:-1},{b:3000,d:1000,rY:-1},{b:4000,d:1000,o:0.4,rX:-1,rY:-1}]
];

var jssor_1_options = {
  $AutoPlay: true,
  $Idle: 2000,
  $CaptionSliderOptions: {
$Class: $JssorCaptionSlideo$,
$Transitions: jssor_1_SlideoTransitions,
$Breaks: [
  [{d:2000,b:1000}]
]
  },
  $ArrowNavigatorOptions: {
$Class: $JssorArrowNavigator$
  },
  $BulletNavigatorOptions: {
$Class: $JssorBulletNavigator$
  }
};

var jssor_1_slider = new $JssorSlider$("jssor_1", jssor_1_options);

//responsive code begin
//you can remove responsive code if you don't want the slider scales while window resizing
function ScaleSlider() {
var refSize = jssor_1_slider.$Elmt.parentNode.clientWidth;
if (refSize) {
refSize = Math.min(refSize, 1000);
jssor_1_slider.$ScaleWidth(refSize);
}
else {
window.setTimeout(ScaleSlider, 30);
}
}
ScaleSlider();
$(window).bind("load", ScaleSlider);
$(window).bind("resize", ScaleSlider);
$(window).bind("orientationchange", ScaleSlider);
//responsive code end
});

