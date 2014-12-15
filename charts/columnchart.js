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
	            if(group){
	            	groupMap=utils.group(userData,group);
	            	chart.groupMap=groupMap;
	            }
	            
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
	    			fields=userOption.fields,
	    			shows=userOption.shows,         //y轴要显示的指标
	    			group=userOption.group;         //分组依据
	    
                if(group){
                	var groupMap=chart.groupMap;
                	var groupKeys=groupMap.keys();
                	for (var i = 0; i < groupKeys.length; i++) {
		                for (var j = 0; j < shows.length ; j++) {  
		                	var oneSeries={};
		                        oneSeries.name=groupKeys[i]+"("+utils.getDisplayName(fields,shows[j])+")";
		                        oneSeries.stack=groupKeys[i];             //堆栈显示依据
		                        oneSeries.data=[];
		                    var data=groupMap.get(groupKeys[i]);
		                	for (var k = 0; k < data.length; k++) {
		                		if(data[k].hasOwnProperty(shows[j])){
		                			var oneData={};
		                			utils.extend(oneData,data[k]);  //将所有属性赋予给数据
			      					oneData.y=data[k][shows[j]];
			      					oneSeries.data.push(oneData);
		                		}
		                	}
		                	series.push(oneSeries);
		                }   
		            }	
                }else{
                	 for (var j = 0; j < shows.length ; j++) {  
		                	var oneSeries={};
		                        oneSeries.name=[shows[j]];
		                        oneSeries.data=[];
		                    var data=chart.userData;
		                	for (var k = 0; k < data.length; k++) {
		                		if(data[k].hasOwnProperty(shows[j])){
		                			var oneData={};
		                			utils.extend(oneData,data[k]);  //将所有属性赋予给数据
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
	    			categoriesArr=[],
	    			xName=chart.userOption.xName,
	    			data=chart.userData,
	    			group=chart.userOption.group;

    			if(group){
					categoriesArr=utils.group(data,xName).keys();
    			}else{
    				for (var i = 0; i < data.length; i++) {
    					categoriesArr.push(data[i][xName]);
    				};
    			}
	    		option.xAxis={
	    			categories: categoriesArr,
	                gridLineWidth: 1
	    		};

	            utils.merge(true,chart.option,option);
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
	    			fields=chart.fields,
    			    option={};
	    		    option.tooltip={
                         shared: false,
                         formatter: function () {
                         	var yUnit=this.series.yAxis.options.yUnit || "";
                            return '<b>'+utils.getDisplayName(fields,this.x)+'</b><br>'+
                                    '<b>' + utils.getDisplayName(fields,this.series.name) + ':</b> ' + this.y +yUnit;
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