define([
	"./chart",
	"./utils/utils",
	"./utils/map"
],function(Chart,utils,Map){
	var ColumnChart={
			//基础数据处理
	        processData:function(){
	            var chart=this,
	                userOption=chart.userOption,
	                userData=chart.userData,
	                group=userOption.group,
	                groupMap;

	            //分组
	            groupMap=utils.group(userData,group);
	            chart.groupMap=groupMap;
	        },

	    	//重写mergeChartOption     --------确定显示的类型
	    	mergeChartOption:function(){
	    		var chart=this,
	    		    inverted=chart.userOption.inverted,
	    			option={};
   
	    		option.chart={
	    			type:"column",     //类型
					inverted:inverted,   //X轴和Y轴是否倒换
	                zoomType:"xy"       //缩放方向 
	    		};

	            utils.merge(true,chart.option,option);
	    	},			

	    	//重写mergeSeriesOption   --------确定显示的数据
	    	mergeSeriesOption:function(){
	    		var chart=this,
	    			option={},
	    			series=option.series=[],	
	    			
	    			userOption=chart.userOption,    //option 
	    			shows=userOption.shows,         //y轴要显示的指标
	    			group=userOption.group,         //分组依据
	    			groupMap=chart.groupMap,
                	groupKeys=groupMap.keys();        //要显示的指标
	    			
	    		for (var i = 0; i < groupKeys.length; i++) {  
	                for (var j = 0; j < shows.length ; j++) {  
	                	var oneSeries={};
	                        oneSeries.name=groupKeys[i]+"("+[shows[j]]+")";
	                        oneSeries.stack=groupKeys[i];             //堆栈显示依据
	                        oneSeries.data=new Array();
	                    var data=groupMap.get(groupKeys[i]);
	                	for (var k = 0; k < data.length; k++) {
	                		if(data[k].hasOwnProperty(shows[j])){
	                			var oneData={};
		      					oneData.y=data[k][shows[j]];
		      					oneSeries.data.push(oneData);
	                		}
	                	}
	                	series.push(oneSeries);
	                }   
	            }	
	            utils.merge(true,chart.option,option);
	    	},

	    	//重写mergeXAXisOption-----确定X轴显示的名称
	    	mergeXAXisOption:function(){
	    		var chart=this,
	    			option={},
	    			xName=chart.userOption.xName,
	    			data=chart.userData;
	    		var categoriesArr=utils.group(data,xName).keys();
	    		option.xAxis={
	    			categories: categoriesArr,
	                gridLineWidth: 1
	    		}

	            utils.merge(true,chart.option,option);
	    		//alert(JSON.stringify(chart.option.xAxis.categories));
	    	},

	    	//让数据显示在柱状图中
	    	showSeriesDataLabels:function(){
	    		var dataLabels={
	    			enabled: true,
	    			color: '#FFFFFF',
	    			align:'center',
	    			rotation: -90,
	    			x: 3,
	    			y: -25		
	    		};   		
	    		return dataLabels;
	    	},
	    	
	    	//重写mergeTooltipOption    --------提示框设置 
	    	mergeTooltipOption:function(){
	    		var chart=this,
    			    option={};
	    		    option.tooltip={
                         shared: false,
                         formatter: function () {
                             return '<b>'+utils.getDisplayName(this.x)+'</b><br>'+
                                    '<b>' + utils.getDisplayName(this.series.name) + ':</b> ' + this.y ;
                         }
	    		    };  
	    		
	    		 utils.merge(true,chart.option,option);
	    	},
	    	
	    	//设置堆栈显示类型
	    	mergePlotOptions:function(){
	    		var chart=this,
	    		stacking=chart.userOption.stacking,
			    option={};
	    		option.plotOptions={};
    			option.plotOptions.column={
    					stacking: stacking         //堆栈显示类型：null=禁用，normal=正常，percent=百分比
    	    		};
  
	    		utils.merge(true,chart.option,option);
	    	}

	    		
	};
	
    //继承Chart类
	ColumnChart=utils.extendClass(Chart,ColumnChart);
    
    return ColumnChart;
    
});