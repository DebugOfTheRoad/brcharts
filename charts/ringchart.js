define([
	"./chart",
	"./utils/utils",
],function(Chart,utils){
	var RingChart={
			
	    	//重写mergeChartOption 
	    	mergeChartOption:function(){
	    		var chart=this,
	    			option={};
   
	    		option.chart={
	    			type:"ring"     //类型
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
            		var oneData={};

            		oneData.name=data[k][xName];
      				oneData.y=data[k][show];
      				oneSeries.data.push(oneData);
                }

                series.push(oneSeries);
	            utils.merge(true,chart.option,option);
	    	},

	    	 //设置是否显示Label
	        isShowLabel:function(isShow){
	            var chart=this,
	                option={};

	            option.plotOptions={
	                ring:{
	                    dataLabels:{
	                        enabled: isShow
	                    }
    	    		}
	            };
	            utils.merge(true,chart.option,option);
	        },

	        //设置label的颜色
	        setRingLabelColor:function(color){
	        	var chart=this,
	        		option={};

	        	option.plotOptions={
	                ring:{
	                    dataLabels:{
	                        style: {
	                        	color:color
	                        }
	                    }
    	    		}
	            };
	            utils.merge(true,chart.option,option);
	        },

	        //设置label的字体大小
	        setRingLabelFontSize:function(fontSize){
	        	var chart=this,
	        		option={};

	        	option.plotOptions={
	                ring:{
	                    dataLabels:{
	                        style: {
	                        	fontSize:fontSize+"px"
	                        }
	                    }
    	    		}
	            };
	            utils.merge(true,chart.option,option);
	        },

	        //设置label的样式
	        setRingLabelStyle:function(style){
	        	var chart=this,
	        		option={};

	        	option.plotOptions={
	                ring:{
	                    dataLabels:{
	                        style: style
	                    }
    	    		}
	            };
	            utils.merge(true,chart.option,option);
	        },

	        //设置label的边距
	        setRingLabelMargin:function(margin){
	        	var chart=this,
	        		option={};

	        	option.plotOptions={
	                ring:{
	                    dataLabels:{
	                        margin: margin
	                    }
    	    		}
	            };
	            utils.merge(true,chart.option,option);
	        },

	        //设置label的格式化函数
	        setRingLabelFormatter:function(formatter){
	        	var chart=this,
	        		option={};

	        	option.plotOptions={
	                ring:{
	                    dataLabels:{
	                        formatter: formatter
	                    }
    	    		}
	            };
	            utils.merge(true,chart.option,option);
	        },

	        //设置内环半径
	        setRingInderR:function(ir){
	        	var chart=this,
	        		option={};

	        	option.plotOptions={
	                ring:{
	                    ir:ir
    	    		}
	            };
	            utils.merge(true,chart.option,option);
	        },

	        //设置外环半径
	        setRingOuterR:function(or){
	        	var chart=this,
	        		option={};

	        	option.plotOptions={
	                ring:{
	                    or:or
    	    		}
	            };
	            utils.merge(true,chart.option,option);
	        },

	        //设置是否label居中显示
	        isLabelCenter:function(isCenter){
	        	var chart=this,
	        		option={};

	        	option.plotOptions={
	        		ring:{
		                dataLabels:{
		                    isCenter: isCenter
		                }
	            	}
	            };
	            utils.merge(true,chart.option,option);
	        }
	        
	};
	
    //继承Chart类
	RingChart=utils.extendClass(Chart,RingChart);
    
    return RingChart;
    
});