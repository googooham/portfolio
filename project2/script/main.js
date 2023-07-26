window.addEventListener("load",()=>{
	gsap.registerPlugin(ScrollTrigger);
	let scrT=0
	let winW=0
	let winTopMove
	let html=document.querySelector("html")
	let header=document.getElementById("header")
	let section=document.querySelectorAll("section[id^=page]")
	let [logo, gnb, tap]=header.firstElementChild.children
	let gnbList=gnb.firstElementChild.children
	let topButton=document.getElementsByClassName("top_botton")[0]

	scrollInteraction=t=>{
		scrT=t
		if(t>section[1].offsetTop - 20){
			header.classList.add("white")
		}
		else{
			header.classList.remove("white")
		}
	}

	tap.addEventListener("click",(e)=>{
		e.preventDefault()
		header.classList.toggle("active")

		if(header.classList.contains("active")){
			header.classList.remove("white")
			winTopMove=scrT
			html.classList.add("active")
			html.style.top=-scrT+"px"
		}
		else{
			html.classList.remove("active")
			window.scrollTo({top: winTopMove})

			if(scrT>section[1].offsetTop - 20){
				header.classList.add("white")
			}
			else{
				header.classList.remove("white")
			}
		}
	})

	for(let i=0; i<gnbList.length; i++){
		gnbList[i].addEventListener("click",e=>{
			e.preventDefault()

			if(header.classList.contains("active")){
				html.classList.remove("active")
				header.classList.remove("active")
				window.scrollTo({top: winTopMove})
			}

			for(let j=0; j<gnbList.length; j++){
				if(j===i){
					gsap.to(window, {scrollTo: section[j].offsetTop, duration: 1});
				}
			}
		})
	}

	window.addEventListener("resize",()=>{
		winW=window.innerWidth
		
		if(winW > 720){
			header.classList.remove("active")
			html.classList.remove("active")
			window.scrollTo({top: winTopMove})
		}
	})

	topButton.addEventListener("click",e=>{
		e.preventDefault()
		gsap.to(window, {scrollTo: 0, duration: 2});
	})
	
	const trigger=new ScrollTrigger.default({
		trigger: {
			once: true,
			toggle: {
				class: {
					in: "scr",
					out: "inactive"
				}
			},
			offset: {
				viewport: {
					x: 0,
					y: 0.5
				}
			}
		},
		scroll: {
			element: window,
			callback: (offset, dir) => { scrollInteraction(offset.y); }
		}
	})
	
	trigger.add("#page6, section[id^=page]")
})