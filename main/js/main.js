window.addEventListener("load",()=>{
const trigger=new ScrollTrigger.default({
	trigger: {
		once: true,
		toggle: {
			class: {
				in: "tr_scroll",
				out: "inactive"
			}
		},
		offset: {
			viewport: {
				x: 0,
				y: 0.3
			}
		}
	},
	scroll: {
		element: window,
		// callback: (offset, dir) => { scrollInteraction(offset.y); }
	}
});

trigger.add("#start, section[id^=page], li");

let mainCurrent, mainTotal;
let [mainSlider, profileList]=document.getElementById("start").children;
let [slider, direction, swiperControl]=mainSlider.children;
let [prev, next]=direction.children;
let [num, progressbar, pausePlay]=swiperControl.children;
let keytext=document.getElementsByClassName("keytext");

const keytextString=[
	{
		image: "main1.png",
		alt: "main1",
		title: "CREATE SEMANTIC PAGES",
		sub_title: "Create semantic pages that increase web accessibility",
		sub1: "W Concept 사이트 리뉴얼",
		sub2: "제작기간 3주",
		sub3: "HTML + CSS + jQuery + Figma"
	},
	{
		image: "main2.png",
		alt: "main2",
		title: "JAVASCRIPT AND LIBRARIES",
		sub_title: "Using JavaScript implementations and libraries",
		sub1: "YBM ECC 사이트 리뉴얼",
		sub2: "제작기간 3주",
		sub3: "HTML + CSS + JavaScript + Figma"
	},
	{
		image: "main3.png",
		alt: "main3",
		title: "USER INTERFACE USING REACT",
		sub_title: "User interface implementation using React",
		sub1: "BARESIO 사이트 리뉴얼",
		sub2: "제작기간 3주",
		sub3: "HTML + CSS + JavaScript + React + Figma"
	}
];

let mainSwiper=new Swiper(".mainSwiper", {
	speed: 1500,
	autoplay: {
		delay: 5000,
		disableOnInteraction: false
	},
	on: {
		init: function(){
			mainCurrent=this.activeIndex;
			mainTotal=this.slides.length;
			next.classList.add("visible");
			num.innerHTML=`<span>${mainCurrent+1}</span> / ${mainTotal}`;
			textInteractive(mainCurrent)
			progressbarMove();
		},
		slideChange: function(){
			mainCurrent=this.activeIndex;
			mainTotal=this.slides.length;
			num.innerHTML=`<span>${mainCurrent+1}</span> / ${mainTotal}`;

			switch(mainCurrent){
				case 0 :
					prev.classList.remove("visible")
					next.classList.add("visible")
					break;
				case mainTotal-1 :
					prev.classList.add("visible")
					next.classList.remove("visible")
					break;
				default:
					prev.classList.add("visible")
					next.classList.add("visible")
					break;
			}

			setTimeout(()=>{
				if(pausePlay.classList.contains("pause")){
					progressbarMove();
				}
				else{
					gsap.to(".progressbar span", {display: "none", duration: 0} );
				}
			},1500)
		},
		slideChangeTransitionEnd: function(){
			mainCurrent=this.activeIndex;
			mainTotal=this.slides.length;
			textInteractive(mainCurrent);
		}
	}
});

function textInteractive(n){
	setTimeout(()=>{
		keytext[n].innerHTML=`
			<strong>${keytextString[n].title}</strong>
			<span>${keytextString[n].sub_title}</span>
			<p class="description">
				<span>${keytextString[n].sub1}</span>
				<span>${keytextString[n].sub2}</span>
				<span>${keytextString[n].sub3}</span>
			</p>
			<a href="" class="link_button">바로가기</a>
		`;
	}, 10)

	setTimeout(()=>{
		for(let i=0; i<keytext.length; i++){
			if(i==n){
				keytext[i].classList.add("active");
			}
			else{
				keytext[i].classList.remove("active");
			}
		}
	}, 100)
}

function progressbarMove(){
	gsap.fromTo(".progressbar span", {display: "block", width: 0}, {width: 100 +"%", ease:Linear.easeNone, duration: 5});
}

prev.addEventListener("click",e=>{
	e.preventDefault();
	mainSwiper.slidePrev();
})
next.addEventListener("click",e=>{
	e.preventDefault();
	mainSwiper.slideNext();
})

pausePlay.addEventListener("click",e=>{
	e.preventDefault();

	if(e.target.classList.contains("play")){
		e.target.removeAttribute("class");
		e.target.classList.add("pause");
		e.target.innerHTML="pause";
		mainSwiper.autoplay.start();
		progressbarMove();
	}
	else{
		gsap.to(".progressbar span", {display: "none", duration: 0} );
		e.target.removeAttribute("class");
		e.target.classList.add("play");
		e.target.innerHTML="play";
		mainSwiper.autoplay.stop();
	}
});
});