define([
	"./chart",
	"./utils/utils",
],function(Chart,utils){
	var SplineChart={	
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
	    			option={};

	    		option.chart={
	    			type:"spline",     //类型
					inverted:false,   //X轴和Y轴是否倒换
	                zoomType:"x"       //缩放方向 
	    		};

	            utils.merge(true,chart.option,option);
	    	},			

	    	//重写mergeSeriesOption   --------确定显示的数据
	    	mergeSeriesOption:function(){
	    		var chart=this,
	    			option={},
	    			series=option.series=[],		
	    			userOption=chart.userOption,   //option
	    			xName=userOption.xName,
	    			shows=userOption.shows,       //要显示的指标
                	group=userOption.group;

                if(group){
                	var groupMap=chart.groupMap;
                	var groupKeys=groupMap.keys();  
                	for (var i = 0; i < groupKeys.length; i++) {  
		                for (var j = 0; j < shows.length ; j++) {  
		                	var oneSeries={};
		                        oneSeries.name=groupKeys[i]+"("+shows[j]+")";
		                        oneSeries.data=[];
		                    var data=groupMap.get(groupKeys[i]);
		                	for (var k = 0; k < data.length; k++) {
		                		if(data[k].hasOwnProperty(shows[j])){
		                			var oneData={};
		                			utils.extend(oneData,data[k]);  //将所有属性赋予给数据
				    			    oneData.x=utils.longTimeToUTC(Number(data[k][xName]));
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
			    			    oneData.x=utils.longTimeToUTC(Number(data[k][xName]));
		      					oneData.y=data[k][shows[j]];
		      					oneSeries.data.push(oneData);
	                		}
	                	}
	                	series.push(oneSeries);
	                } 
                }
	            utils.merge(true,chart.option,option);
	    	},

	    	//重写mergeXAXisOption     --------确定X轴显示的名称
	    	mergeXAXisOption:function(){
	    		var chart=this,
	    			option={};
	    			
	    		option.xAxis={
	    			//categories: [0,10,100,1000],
	                gridLineWidth: 1,
	                type: 'datetime',
	                labels: {
		                formatter: function () {
		                    return Highcharts.dateFormat('%m-%d %H:%M', this.value);
		                }
		            }
	    		};

	            utils.merge(true,chart.option,option);
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
	    		    	    var str='<e>' + Highcharts.dateFormat('%m-%d %H:%M', this.x) + '<br/>'
	    		    	       + utils.getDisplayName(fields,this.series.name) + ':' + this.y+yUnit;
	                      	return str;
                         }
	    		    };  
	    		
	    		 utils.merge(true,chart.option,option);
	    	}
  	
	};
	
    //继承Chart类
	SplineChart=utils.extendClass(Chart,SplineChart);
    
    return SplineChart;
});