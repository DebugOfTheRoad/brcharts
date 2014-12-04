define(["../utils/utils"],function(utils){
	var SeriesTool={

        addPoint:function(yObj){
            var chart=this,
                shows=chart.userOption.shows,
                xName=chart.userOption.xName,
                highchart=chart.highchart,
                xDataType=highchart.xAxis[0].options.type;

            if(xDataType=='datetime'){
                var x=utils.longTimeToUTC(Number(yObj[xName]));
                for (var i = 0; i < shows.length; i++) {
                    var y=Number(yObj[shows[i]]);
                    highchart.series[i].addPoint([x,y]);
                };
                
            }else{
                var x=yObj[xName];
                for (var i = 0; i < shows.length; i++) {
                    var y=Number(yObj[shows[i]]);
                    highchart.series[i].addPoint([x,y]);
                };
                highchart.series[i].addPoint(y);
                highchart.xAxis[0].options.categories.push(x);
            }
        },
        
        updatePoint:function(seriesIndex,pointIndex,color,type){
            var chart=this;
            var point=chart.option.series[seriesIndex].data[pointIndex];
            point.marker={};
            point.marker.fillColor=color;
            point.marker.symbol=type;
        },

        //更新点
        updatePointValue:function(show,xValue,yValue){
            var chart=this,
                xName=chart.userOption.xName,
                highchart=chart.highchart,
                series=highchart.options.series,
                seriesIndex,
                pointIndex;
            for (var i = 0; i < series.length; i++) {
                if(series[i].name[0]==show){
                    seriesIndex=i;
                    var data=series[i].data;
                    for (var j = 0; j < data.length; j++) {
                        if(data[j][xName]==xValue){
                            pointIndex=j;
                            break;
                        }
                    };
                }
            };
            if(seriesIndex!=undefined&&pointIndex!=undefined){
                chart.updatePointValueByIndex(seriesIndex,pointIndex,yValue);
            }
            
        },

        //更新点的值
        updatePointValueByIndex:function(seriesIndex,pointIndex,yValue){
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