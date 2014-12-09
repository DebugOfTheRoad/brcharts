define([
	"./chart",
	"./utils/utils"
],function(Chart,utils){
	var PolarChart={
			
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
	    			polar: true,
	    			type:"area"     //类型
	    		};

	            utils.merge(true,chart.option,option);
	    	},			

	    	//重写mergeSeriesOption   --------确定显示的数据
	    	mergeSeriesOption:function(){
	    		var chart=this,
	    			option={},
	    			series=option.series=[],		
	    			userOption=chart.userOption,   //option
	    			data,
	    			xName=userOption.xName,
	    			shows=userOption.shows,
	    			groupMap=chart.groupMap,
                	groupKeys=groupMap.keys();        //要显示的指标

	    		  
	    		  //alert(shows);
	            for (var i = 0; i < groupKeys.length; i++) {  //shows.length-1
	                var oneSeries={};
	                oneSeries.name=groupKeys[i];
	                oneSeries.data=[];
	                oneSeries.pointPlacement='on';
	                data=groupMap.get(groupKeys[i]);
	                for (var j = 0; j < data.length ; j++) {  //data.length 
	                	for (var k = 0; k < shows.length; k++) {
	                		if(data[j].hasOwnProperty(shows[k])){
	                			var oneData={};
	                			utils.extend(oneData,data[k]);  //将所有属性赋予给数据
		      					oneData.y=data[j][shows[k]];
		      					oneSeries.data.push(oneData);
	                		}
	                	}
	                }
	                series.push(oneSeries);
	            }
	            utils.merge(true,chart.option,option);
	    	},

	    	//重写mergeXAXisOption     --------确定X轴显示的名称
	    	mergeXAXisOption:function(){
	    		var chart=this,
	    			shows=this.userOption.shows,
	    			fields=chart.fields,
	    			xNames=[],
	    			option={};
                for (var i = 0; i < shows.length; i++) {
                	xNames.push(utils.getDisplayName(fields,shows[i]));
            	}
	    			
	    		option.xAxis={
	    			categories: xNames,
	                tickmarkPlacement: 'on',
	                lineWidth: 0
	    		};
	            utils.merge(true,chart.option,option);
	    	},

	    	//重写mergeYAxisOption
	    	mergeYAxisOption:function(){
	    		var chart=this,
	    			option={};
	    		option.yAxis={
	                gridLineInterpolation: 'polygon',
	                lineWidth: 0
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
	    		    	    var str='<b>' +  utils.getDisplayName(fields,this.series.name)+ '</b><br/>' + this.x  + ':</b> ' + this.y+yUnit;
	                      	return str;
                         }
	    		    };  
	    		
	    		 utils.merge(true,chart.option,option);
	    	}
	    	
	    	
	    	
	};
	
    //继承Chart类
	PolarChart=utils.extendClass(Chart,PolarChart);
    
    return PolarChart;

});