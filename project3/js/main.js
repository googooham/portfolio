$(function(){
	let scrollH;
	let winW;
	let winTopMove;
	let scrollFlag;
	let mobileSize=1025;
	let isMobile;
	let slidei=0;
	let total=5;

	const trigger=new ScrollTrigger.default({
		trigger: {
			once: true,
			toggle: {
				class: {
					in: "scroll_active",
					out: "inactive"
				}
			},
			offset: {
				viewport: {
					x: 0,
					y: 0.1
				}
			}
		}
	});

	trigger.add("[class^=scroll_motion]");

	$(window).resize(function(){
		winW=$(window).width();

		

		if(winW < mobileSize){
			isMobile = true;
			$(".gnb > ul > li").find("ul").hide();
		}
		else{
			isMobile = false;
			$(".gnb > ul > li").find("ul").show();
		}
	});

	$(window).scroll(function(){
		scrollH = $(window).scrollTop();

		if(scrollH != 0){
			$("#header").addClass("active");
			scrollFlag=true;
		}
		else {
			scrollFlag=false;
			if($(".language").hasClass("active") || $("#search").hasClass("active")) return;
			$("#header").removeClass("active");
		}
	});


	$("#gnb > ul").hover(
		function(){
			if($("#header").hasClass("open_gnb"))return;
			$("#header").addClass("active");
		},
		function(){
			if(scrollFlag || $("#search").hasClass("active") || $(".language").hasClass("active")) return;
			$("#header").removeClass("active");
		}
	);

	$(".language > a").click(function(e){
		e.preventDefault();
		$(".language").toggleClass("active");

		if($(".language").hasClass("active")){
			$("#header").addClass("active");
		}
		else{
			if(scrollFlag || $("#search").hasClass("active")) return;
			$("#header").removeClass("active");
		}
	});

	$(".language li").click(function(e){
		e.preventDefault();
		
		$(".language li").removeClass("active");
		$(this).addClass("active");
	});


	$(".header_search a").click(function(e){
		e.preventDefault();
		$("#search").toggleClass("active");

		if($("#search").hasClass("active")) {
			winTopMove=scrollH;

			$("html").addClass("active").css({"top": -scrollH +"px"});
			$("#header").addClass("active");
		}
		else{
			$("html").removeClass("active");
			$(window).scrollTop(winTopMove);

			if(scrollFlag || $(".language").hasClass("active")) return;
			$("#header").removeClass("active");
		}
	});

	


	$(".tab").click(function(e){
		e.preventDefault();

		$("#search").removeClass("active");
		$(".language").removeClass("active");
		
		if($("#header").hasClass("open_gnb")==false){
			winTopMove=scrollH;

			$("#header").removeClass("active").addClass("open_gnb");
			$.when($("#header").addClass("open_gnb")).done(function(){
				$(".gnb > ul > li").addClass("open_list");
			});
			$("html").addClass("active").css({"top": -scrollH +"px"});
		}
		else{
			$("html").removeClass("active");
			$("#header").removeClass("open_gnb")
			$(".gnb > ul > li").removeClass("open_list");
			$(window).scrollTop(winTopMove);
			
			if(scrollFlag){
				$("#header").addClass("active");
			}
		}
	});

	$(".gnb > ul > li").click(function(e){
		e.preventDefault();

		if(isMobile){
			if($(this).hasClass("active") == false){
				$(".gnb > ul > li").removeClass("active");
				$(this).addClass("active");
				$(".gnb > ul > li").find("ul").stop().slideUp();
				$(this).find("ul").stop().slideDown();
			}
			else{
				$(".gnb > ul > li").removeClass("active");
				$(".gnb > ul > li").find("ul").stop().slideUp();
			}
		}
	});



	







	function galleryInterfaction(){
		$(".current").html("0"+(slidei+1));

		$(".slide_button .left").removeClass("active");
		$(".slide_button .right").removeClass("active");

		$(".product_box > ul > li").fadeOut(200);
		$.when($(".product_box > ul > li").fadeOut(200)).done(function(){
			$(".product_box > ul > li").eq(slidei).fadeIn(200);
		});

		$(".image_box li").eq(slidei).prev().removeAttr("class").addClass("prev");
		$(".image_box li").eq(slidei).removeAttr("class").addClass("show");
		$(".image_box li").eq(slidei).next().removeAttr("class").addClass("next");
	}

	galleryInterfaction();

	$(".slide_button .left").click(function(){
		if(slidei > 0){
			slidei--;

			galleryInterfaction();

			if(slidei < 1){
				$(".slide_button .left").addClass("active");
			}
		}
	});


	$(".slide_button .right").click(function(){
		if(slidei < total-1){
			slidei++;

			galleryInterfaction();

			if(slidei > total-2){
				$(".slide_button .right").addClass("active");
			}
		}
			
	});


	$(".famliy button").click(function(){
		$(".footer_inner .famliy").toggleClass("active");
	});


	$(window).trigger("scroll");
	$(window).trigger("resize");
});

