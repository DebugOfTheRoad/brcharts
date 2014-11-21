define(["../utils/utils"],function(utils){
	var SeriesTool={
		 //添加点
        addPoint:function(seriesIndex,x,y){
            var chart=this;
            var point={
                    x:x,
                    y:y
            }
            chart.option.series[seriesIndex].data.push(point);  
        },
        
        //更新点
        updatePoint:function(seriesIndex,pointIndex,color,type){
            var chart=this;
            var point=chart.option.series[seriesIndex].data[pointIndex];
            //point.color=color;
            point.marker={};
            point.marker.fillColor=color;
            point.marker.symbol=type;
        },
        
        //移除数据列
        removeSeries:function(seriesIndex){
            var chart=this,
                highchart=chart.highchart;
            highchart.series[seriesIndex].remove();
            //chart.option.series.splice(seriesIndex,1);
        },
        
        //设置数据列是否显示
        setSeriesVisible:function(seriesIndex,visible){
            var chart=this, 
                highchart=chart.highchart;
            if(visible){
                highchart.series[seriesIndex].hide();
            }else{
                highchart.series[seriesIndex].show();
            }   
        }
	}
	return SeriesTool;
});