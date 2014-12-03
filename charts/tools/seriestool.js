define(["../utils/utils"],function(utils){
	var SeriesTool={
		 //添加点
        addPoint:function(seriesIndex,x,y){
            var chart=this,
                highchart=chart.highchart,
                chartType=chart.option.chart.type,
                xDataType=highchart.xAxis[0].options.type;

            if(xDataType=='datetime'){
                highchart.series[seriesIndex].addPoint([x,y]);
            }else{
                highchart.xAxis[0].options.categories.push(x);
                highchart.series[seriesIndex].addPoint(y);
            }              
        },
        
        //更新点
        updatePoint:function(seriesIndex,pointIndex,color,type){
            var chart=this;
            var point=chart.option.series[seriesIndex].data[pointIndex];
            point.marker={};
            point.marker.fillColor=color;
            point.marker.symbol=type;
        },

        //更新点的值
        updatePointValue:function(seriesIndex,pointIndex,yValue){
            var chart=this,
                highchart=chart.highchart;

            highchart.series[seriesIndex].data[pointIndex].update(yValue);
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