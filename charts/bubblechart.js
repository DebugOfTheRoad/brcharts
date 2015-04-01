define([
	"./chart",
	"./utils/utils",
	"./utils/map"
],function(Chart,utils,Map){
	var BubbleChart={
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
	    			type:"bubble"     //类型
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
	    			shows=userOption.shows,
	    			group=userOption.group; 

	    		if(group){
                	var groupMap=chart.groupMap;
                	var groupKeys=groupMap.keys();
                	for (var i = 0; i < groupKeys.length; i++) {
		                var oneSeries={};
		                oneSeries.name=groupKeys[i];
		                oneSeries.data=[];
		                var data=groupMap.get(groupKeys[i]);
		                for (var k = 0; k < data.length; k++) {
	                		var oneData=[];
		      				oneData.push(data[k][shows[0]]);
		      				oneData.push(data[k][shows[1]]);
		      				oneData.push(data[k][shows[2]]);
		      				oneSeries.data.push(oneData);
		                }
		                series.push(oneSeries);
		            }   
                }else{
                	var oneSeries={};
	                oneSeries.data=[];
	                var data=chart.userData;;
	                for (var k = 0; k < data.length; k++) {
                		var oneData=[];
	      				oneData.push(data[k][shows[0]]);
	      				oneData.push(data[k][shows[1]]);
	      				oneData.push(data[k][shows[2]]);
	      				oneSeries.data.push(oneData);
	                }
	                series.push(oneSeries);
                } 
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
                            return '<b>' + utils.getDisplayName(fields,this.series.name) + ':</b> ' + this.y +yUnit;
                         }
	    		    };  
	    		
	    		 utils.merge(true,chart.option,option);
	    	}
	};
	
    //继承Chart类
	BubbleChart=utils.extendClass(Chart,BubbleChart);
    
    return BubbleChart;
    
});