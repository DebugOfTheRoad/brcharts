define([
	"./utils/utils",
	"./splinechart"
],function(utils,splineChart){
	var AreaChart={		
    	//重写mergeChartOption 
    	mergeChartOption:function(){
    		var chart=this,
    			option={};

    		option.chart={
    			type:"area",     //类型
				inverted:false   //X轴和Y轴是否倒换
    		};
            utils.merge(true,chart.option,option);
    	}
	};
	
    //继承Chart类
	AreaChart=utils.extendClass(splineChart,AreaChart);
    
    return AreaChart;
    
});