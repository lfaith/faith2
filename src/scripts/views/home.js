document.addEventListener('touchmove', function(e){e.preventDefault();},false);
var homeTpl=require('../templates/home.string');
var util=require('../util/util.js');
SPA.defineView("home",{
	html:homeTpl, 
	plugins:["delegated",{//引入插件
		name:'avalon',
		options:function(vm){
			vm.livelist=[];//给VM添加livelist的属性
		}
	}],
	init:{
		mySwiper:null,
		head_swiper:null,
		formatData:function(data){//将json数据变成二维数组
			var newArr=[];
			for(var i=0,len=Math.ceil(data.length/2);i<len;i++){
				newArr[i] = [];
	            newArr[i].push(data[2*i]);
	            newArr[i].push(data[2*i+1]);
			}
			return newArr
		}
	},
	bindEvents:{
		beforeShow:function(){
			var vm=this.getVM(),//获取VM
				that=this;//获取视图
			$.ajax({
				url:"/footballApp/json/livelist.json",
				dataType:"json",
				success:function(e){
					//将json挂到VM上
					vm.livelist=that.formatData(e.data)
				},
				error:function(){
					alert('请求失败')
				}
			})
		},
		show:function(){
			this.mySwiper = new Swiper('.sec>.swiper-container',{
				onSlideChangeStart:function(swiper){
					alert(0)
					var index=swiper.activeIndex;
					util.setFocus($('#m-nav li').eq(index))
				}
			})
			// this.head_swiper = new Swiper('.m-home>.swiper-container',{
			// 	onSlideChangeStart:function(swiper){
			// 		var index=swiper.activeIndex;
			// 		util.setFocus($('#h_nav li').eq(index))
			// 	}
			// })
			var liveScroll=this.widgets['liveScroll'];
			liveScroll.options.scrollX=true;
			liveScroll.options.scrollY=false;
		}
	},
	bindActions:{
		"tap.slide":function(e){
			var index=$(e.el).index();
			this.mySwiper.slideTo(index,1000,false);
			util.setFocus($(e.el));
		},
		// "tap.tabs":function(e){
		// 	var index=$(e.el).index();
		// 	this.head_swiper.slideTo(index,1000,false);
		// 	util.setFocus($(e.el));
		// }
	}
})