define([
	"./chart",
	"./utils/utils"
],function(Chart,utils){
	var ScatterChart={
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
	    			option={};

	    		option.chart={
	    			type:"scatter",     //类型
					inverted:false,   //X轴和Y轴是否倒换
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
	    			xName=userOption.xName,   //x轴显示的名称 
	    			shows=userOption.shows,
	    			groupMap=chart.groupMap,
                	groupKeys=groupMap.keys();        //要显示的指标
	    			
	    		for (var i = 0; i < groupKeys.length; i++) {  
	                for (var j = 0; j < shows.length ; j++) {  
	                	var oneSeries={};
	                        oneSeries.name=groupKeys[i]+"("+shows[j]+")";
	                        oneSeries.data=[];
	                    var data=groupMap.get(groupKeys[i]);
	                	for (var k = 0; k < data.length; k++) {
	                		if(data[k].hasOwnProperty(shows[j])){
	                			var oneData={};
	                			var datetime=data[k][xName];
			    			    var datetimeToUTC=chart.datetimeChangeToUTC(datetime);   //datetime转化为UTC格式
			    			    oneData.x=datetimeToUTC;
		      					oneData.y=data[k][shows[j]];
		      					oneSeries.data.push(oneData);
	                		}
	                	}
	                	series.push(oneSeries);
	                }   
	            }

	    		 
	            utils.merge(true,chart.option,option);
	    	},


	    	//datetime转化为UTC格式
	    	datetimeChangeToUTC:function(array){
	    		var UTC;
	    		array=array.split(" ");
	    		array[0]=array[0].split("-");
	    		array[1]=array[1].split(":");	
	    		//将时间“2014-01-01 08:00”转化为二位数组“[[2014,1,1],[8,0]]”后，再转化为UTC格式
	    		UTC=Date.UTC(array[0][0], array[0][1]-1, array[0][2], array[1][0], array[1][1]);
	    		return UTC;
	    	},
	    	
	    	//重写mergeXAXisOption     --------确定X轴显示的名称及刻度 
	    	mergeXAXisOption:function(){
	    		var chart=this,
	    			option={};
	    			
	    		option.xAxis={
    				gridLineWidth: 1,
	                type: 'datetime',
	                dateTimeLabelFormats: {
	    			    month: '%e. %b',
	                    year: '%b'
	                }
	    		};

	            utils.merge(true,chart.option,option);
	    	},
	
	    	//重写mergeTooltipOption    --------提示框设置 
	    	mergeTooltipOption:function(){
	    		var chart=this,
    			    option={};
	    		    option.tooltip={
                         formatter: function () {
	    		    	       var str='<b>' + Highcharts.dateFormat('%Y-%m-%d', this.x) + '</b><br/>'+Highcharts.dateFormat('%H:%M:%S', this.x);
	    		    	       str+= '<br/><b>' + utils.getDisplayName(this.series.name) + ':</b> ' + this.y;
	                      return str;
                         }
	    		    };  
	    		
	    		 utils.merge(true,chart.option,option);
	    	}

	    		
	};
	
    //继承Chart类
	ScatterChart=utils.extendClass(Chart,ScatterChart);
    
    return ScatterChart;

});