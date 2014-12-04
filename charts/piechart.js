define([
	"./chart",
	"./utils/utils"
],function(Chart,utils){
	var PieChart={
			
	    	//重写mergeChartOption 
	    	mergeChartOption:function(){
	    		var chart=this,
	    			option={};
   
	    		option.chart={
	    			type:"pie"     //类型
	    		};

	            utils.merge(true,chart.option,option);
	    	},			

	    	//重写mergeSeriesOption 
	    	mergeSeriesOption:function(){
	    		var chart=this,
	    			option={},
	    			series=option.series=[],	
	    			
	    			userOption=chart.userOption,    //option
	    			data=chart.userData,            //数据 
	    			show=userOption.shows[0],       //y轴要显示的指标
	    			xName=chart.userOption.xName;

	    		var oneSeries={};
	    		oneSeries.name=show;
		        oneSeries.data=[];
		        
                for(var k = 0; k < data.length ; k++){  
            		var oneData=[];
            		oneData.push(data[k][xName]);
      				oneData.push(data[k][show]);
      				oneSeries.data.push(oneData);
                }

                series.push(oneSeries);
	            utils.merge(true,chart.option,option);
	    	},
	    	
	    	//重写mergeTooltipOption  
	    	mergeTooltipOption:function(){
	    		var chart=this,
    			    option={};
	    		    option.tooltip={
                         shared: false	    		
	    		    };
	    		
	    		 utils.merge(true,chart.option,option);
	    	},
	    	
	    	//设置堆栈显示类型
	    	mergePlotOptions:function(){
	    		var chart=this,
			    	option={};
	    		option.plotOptions={
	    			pie:{
    					allowPointSelect: true,
	                    cursor: 'pointer',
	                    dataLabels: {
	                        enabled: false
	                    },
	                    showInLegend: true
    	    		}
	    		};
  
	    		utils.merge(true,chart.option,option);
	    	},

		    //设置是否显示图例
	        isShowLegend:function(isShow){
	            var chart=this,
	                option={};

	            option.plotOptions={
	                pie:{
	                    showInLegend: isShow
    	    		}
	            };
	            utils.merge(true,chart.option,option);
	        },

	        //设置是否显示Label
	        isShowLabel:function(isShow){
	            var chart=this,
	                option={};

	            option.plotOptions={
	                pie:{
	                    dataLabels:{
	                        enabled: isShow
	                    }
    	    		}
	            };
	            utils.merge(true,chart.option,option);
	        },

	        //设置大小
	        setSize:function(size){
	        	var chart=this,
	                option={};

	            option.plotOptions={
	                pie:{
	                    size:size
    	    		}
	            };
	            utils.merge(true,chart.option,option);
	        }
	};
	
    //继承Chart类
	PieChart=utils.extendClass(Chart,PieChart);
    
    return PieChart;
    
});