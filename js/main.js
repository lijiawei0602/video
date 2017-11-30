var video = document.querySelector("video");
var play = document.getElementsByClassName("switch")[0];
var totalTime = document.getElementsByClassName("total")[0];
var expand = document.getElementsByClassName("expand")[0];
var loaded = document.getElementsByClassName("loaded")[0];
var currentTime = document.getElementsByClassName("current")[0];
var progress = document.getElementsByClassName("progress")[0];


//当视频可播放的时候
video.addEventListener("canplay", function(){
	this.style.display = "block";
	totalTime.innerHTML = getFormatTime(this.duration);
},false);

play.addEventListener("click", function(){
	if(video.paused){
		video.play();
	}else{
		video.pause();
	}
	this.classList.toggle("fa-pause");
},false);

expand.addEventListener("click",function(){
	video.webkitRequestFullScreen();
},false);

video.addEventListener("timeupdate",function(){
	var current = this.currentTime;
	var duration = this.duration;

	var pre = current / duration * 100 + "%";
	loaded.style.width = pre;

	currentTime.innerHTML = getFormatTime(current);
},false);

progress.addEventListener("click", function(e){
	var event = e || window.event;
	video.currentTime = (event.offsetX / this.offsetWidth) * video.duration;
},false);

video.addEventListener("ended",function(){
	play.classList.remove("fa-pause");
	loaded.style.width = 0;
	currentTime.innerHTML = "00:00:00";
	this.currentTime = 0;
},false);

function getFormatTime(time){
	var h = parseInt(time / 3600),
		m = parseInt(time % 3600 / 60),
		s = parseInt(time % 60);

	h = h < 10 ? "0"+h : h;
	m = m < 10 ? "0"+m : m;
	s = s < 10 ? "0"+s : s;

	return h+":"+m+":"+s;
}