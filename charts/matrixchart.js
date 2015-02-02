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
	    	}
	        
	};
	
    //继承Chart类
	MatrixChart=utils.extendClass(Chart,MatrixChart);
    
    return MatrixChart;
    
});