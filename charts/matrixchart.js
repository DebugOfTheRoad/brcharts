define([
	"./chart",
	"./utils/utils",
],function(Chart,utils){
	var MatrixChart={
			
	    	//重写mergeChartOption 
	    	mergeChartOption:function(){
	    		var chart=this,
	    			option={};
   
	    		option.chart={
	    			type:"matrix"     //类型
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
            		utils.extend(oneData,data[k]);  //将所有属性赋予给数据
            		oneData.name=data[k][xName];
      				oneData.y=data[k][show];
      				oneSeries.data.push(oneData);
                }

                series.push(oneSeries);
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
                            return '<b>'+utils.getDisplayName(fields,this.point.name)+'</b><br>'+
                                    '<b>' + utils.getDisplayName(fields,this.series.name) + ':</b> ' + this.y +yUnit;
                         }
	    		    };  
	    		
	    		 utils.merge(true,chart.option,option);
	    	},
	    	 //设置是否显示Label
	        isShowLabel:function(isShow){
	            var chart=this,
	                option={};

	            option.plotOptions={
	                matrix:{
	                    dataLabels:{
	                        enabled: isShow
	                    }
    	    		}
	            };
	            utils.merge(true,chart.option,option);
	        },

	        //设置label的颜色
	        setLabelColor:function(color){
	        	var chart=this,
	        		option={};

	        	option.plotOptions={
	                matrix:{
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
	        setLabelFontSize:function(fontSize){
	        	var chart=this,
	        		option={};

	        	option.plotOptions={
	                matrix:{
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
	        setLabelStyle:function(style){
	        	var chart=this,
	        		option={};

	        	option.plotOptions={
	                matrix:{
	                    dataLabels:{
	                        style: style
	                    }
    	    		}
	            };
	            utils.merge(true,chart.option,option);
	        },

	    	//设置label的格式化函数
	        setLabelFormatter:function(formatter){
	        	var chart=this,
	        		option={};

	        	option.plotOptions={
	                matrix:{
	                    dataLabels:{
	                        formatter: formatter
	                    }
    	    		}
	            };
	            utils.merge(true,chart.option,option);
	        },
	        
	};
	
    //继承Chart类
	MatrixChart=utils.extendClass(Chart,MatrixChart);
    
    return MatrixChart;
    
});