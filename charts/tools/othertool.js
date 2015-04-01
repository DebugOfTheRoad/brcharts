define(["../utils/utils"],function(utils){
	var OtherTool={
		//设置是否渐变色
        isGradient:function(enabled){
            var chart=this,
                colors=chart.option.colors?chart.option.colors:Highcharts.getOptions().colors,
                option={};
            if(enabled){
                colors= Highcharts.map(colors, function(color) {
                    if(color.stops)
                        return color;
                    else
                        return {
                            radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 },
                            stops: [
                                [0, color],
                                [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
                            ]
                        };
                });
            }else{
                colors = Highcharts.map(colors, function(color) {
                    if(color.stops)
                        return color.stops[0][1];
                    else
                        return color;
                });
            }
            option.colors=colors;

            utils.merge(true,chart.option,option);
        },

        //设置版权信息是否显示
        isShowCredits:function(enabled){
             var chart=this,
                option={};

            option.credits={
                enabled:enabled
            };
            utils.merge(true,chart.option,option);
        },

        //设置基础颜色
        setBaseColors:function(colors){
             var chart=this,
                option={};

            option.colors={
                colors:colors
            };
            utils.merge(true,chart.option,option);
        },

        //设置语言
        setLang:function(lang){
            var langOption;

            var en={
                unit:"unit"
            };

            var zh_cn={
                loading:"加载中...",
                months:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
                noData:"无数据",
                resetZoom:"重置",
                resetZoomTitle:"缩放",
                shortMonths:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
                weekdays:["周一","周二","周三","周四","周五","周六","周日"],
                unit:"单位"
            };

            switch(lang){
                case "en":langOption=en;break;
                case "zh-cn":langOption=zh_cn;break;
            }

            Highcharts.setOptions({lang:langOption});


        },

        //设置高度
        setHeight:function(height){
            var chart=this,
                containerId=chart.userOption.containerId,
                highchart=chart.highchart;
                option={};
            $("#"+containerId).css("height",height);
            highchart.reflow();
        }
	};
	return OtherTool;
});