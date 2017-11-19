;(function($, w){

	//默认配置
	var DEFAULT = {

		//用来定义鼠标的触发类型
		"triggerType":"click",

		//切换效果
		"effect":"default",

		//默认展示第几个
		"invoke":1,

		//定义tab是否自动切换
		"auto":false
	};

	var Tab = function(tab){

		var _this_ = this;

		//保存单个tab组件
		this.tab = tab;

		//初始化
		_init.call(this);

		//绑定事件
		_bindEvent.call(this);
	}

	Tab.prototype = {
		//自动切换
		autoPlay:function(){

			var _this_ = this,
				tabItems = this.tabItems,//tab标签列表
				tabLength = tabItems.length,//tab个数
				config = this.config;//配置

			this.timer = w.setInterval(function(){

				_this_.loop++;

				if(_this_.loop >= tabLength){
					_this_.loop = 0;
				}

				// tabItems.eq(_this_.loop).trigger(config.triggerType);
				_this_.invoke(tabItems.eq(_this_.loop));

			},config.auto);

		},

		//事件驱动函数
		invoke:function(currentTab){
			var _this_ = this;

			//索引值
			var index = currentTab.index();

			//1.tab显示为选中状态
			currentTab.addClass("actived").siblings().removeClass("actived");

			//2.切换内容，根据effect的值来决定切换动画
			var effect = this.config.effect;
			var conItems = this.contentItems;

			if(effect === "default" || effect != "fade"){

				conItems.eq(index).addClass("current").siblings().removeClass("current");

			}else if(effect === "fade"){

				conItems.eq(index).fadeIn().siblings().fadeOut();

			}

			//如果配置了自动切换，要同步索引
			if(this.config.auto){
				this.loop = index;
			}

		},

		//获取配置参数
		getConfig:function(){

			//获取组件配置
			var config = this.tab.data('config');

			//处理配置参数
			if(config && config != ''){
				return $.parseJSON(config);
			}else{
				return null;
			}
		},

	};

	Tab.init = function(tabs){

		var _this_ = this;

		tabs.each(function(){

			new _this_($(this));

		});

	};

	//注册成jQuery方法
	$.fn.extend({

		tab:function(){

			this.each(function(){

				new Tab($(this));

			});

			return this;

		}

	});


	//初始化函数，静态私有方法
	function _init(){

		var _this_ = this;

		//保存配置信息的变量
		var config;

		//扩展配置参数
		if(this.getConfig()){

			this.config = $.extend({}, DEFAULT, this.getConfig());

		}else{

			this.config = DEFAULT;

		}

		//保存标签列表和对应的内容列表
		this.tabItems = this.tab.find('ul.tab-nav li');
		this.contentItems = this.tab.find('div.content-wrap div.content-item');

		//缓存配置变量，减少遍历成本
		config = this.config;

		//自动切换
		if(config.auto){

			//定义一个定时器
			this.timer = null;

			//计数器
			this.loop = 0;

			this.autoPlay();

			this.tab.hover(function(){

				w.clearInterval(_this_.timer);

			},function(){
				_this_.autoPlay();
			});

		}

		if(config.invoke > 1){

			this.invoke(this.tabItems.eq(config.invoke - 1));

		}

	}

	//绑定事件
	function _bindEvent(){

		var _this_ = this;

		//保存配置参数,减少查找次数
		var config = this.config;

		if(config.triggerType === "click"){

			this.tabItems.bind(config.triggerType,function(){

				_this_.invoke($(this));

			});

		}else if(config.triggerType === "mouseover" || config.triggerType != "click"){

			this.tabItems.mouseover(function(){

				var self = $(this);

				_this_.timeout = w.setTimeout(function(){

					_this_.invoke(self);

				}, 300);

			}).mouseout(function(){

				if(_this_.timeout){

					w.clearTimeout(_this_.timeout);

				}

			});

		}

	}

	window.Tab = Tab;
})(jQuery, window);