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
        }
	}
	return OtherTool;
});