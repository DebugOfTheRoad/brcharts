define(["../utils/utils"],function(utils){
	var SeriesTool={

        addPoint:function(yObj){  
            var chart=this,
                shows=chart.userOption.shows,
                xName=chart.userOption.xName,
                group=chart.userOption.group,
                highchart=chart.highchart,
                xDataType=highchart.xAxis[0].options.type;

            if(xDataType=='datetime'){
                var x=utils.longTimeToUTC(Number(yObj[xName]));  
                for (var i = 0; i < shows.length; i++) {
                    if(yObj.hasOwnProperty(shows[i])){  
                        var y=Number(yObj[shows[i]]);
                        yObj.x=x;
                        yObj.y=y; 
                        if(group){
                            var groupMap=chart.groupMap;
                            var groupKeys=groupMap.keys();
                            for (var j = 0; j < groupKeys.length; j++) {
                                if(groupKeys[j]==yObj[group]){  
                                    highchart.series[shows.length*j+i].addPoint(yObj); 
                                }
                            };
                        }else{
                            highchart.series[i].addPoint(yObj);
                        }
                    }    
                };  
            }else{
                var x=yObj[xName];
                highchart.xAxis[0].options.categories.push(x);
                for (var i = 0; i < shows.length; i++) {
                    if(yObj.hasOwnProperty(shows[i])){
                        var y=Number(yObj[shows[i]]);
                        yObj.y=y;   
                        if(group){
                            var groupMap=chart.groupMap;
                            var groupKeys=groupMap.keys();
                            for (var j = 0; j < groupKeys.length; j++) {
                                if(groupKeys[j]==yObj[group]){
                                    highchart.series[shows.length*j+i].addPoint(yObj); 
                                }
                            };
                        }else{
                            highchart.series[i].addPoint(yObj);
                        }
                    }
                }
            }
        },
        
        updatePoint:function(seriesIndex,pointIndex,color,type){
            var chart=this;
            var point=chart.option.series[seriesIndex].data[pointIndex];
            point.marker={};
            point.marker.fillColor=color;
            point.marker.symbol=type;
        },

        //更新点的值，yobj为原始数据数组的一个对象
        updatePointValue:function(yObj){  
            var chart=this,
                shows=chart.userOption.shows,
                xName=chart.userOption.xName,
                fields=chart.userOption.fields,
                group=chart.userOption.group,
                highchart=chart.highchart,
                xDataType=highchart.xAxis[0].options.type;

            if(xDataType=='datetime'){  
                var x=utils.longTimeToUTC(Number(yObj[xName])); 
                for (var i = 0; i < shows.length; i++) {
                    if(yObj.hasOwnProperty(shows[i])){  
                        var y=Number(yObj[shows[i]]);
                        if(group){
                            var groupMap=chart.groupMap;
                            var groupKeys=groupMap.keys();
                            for (var j = 0; j < groupKeys.length; j++) {
                                if(groupKeys[j]==yObj[group]){  
                                    chart.updatePointValueByArg(groupKeys[j]+"("+utils.getDisplayName(fields,shows[i])+")",x,y);
                                }
                            };
                        }else{
                            chart.updatePointValueByArg(shows[i],x,y);
                        }
                    }  
                };
                
            }else{
                var x=yObj[xName];
                for (var i = 0; i < shows.length; i++) {
                    var y=Number(yObj[shows[i]]);
                    chart.updatePointValueByArg(shows[i],x,y);
                };
            }
        },

        //更新点的值
        updatePointValueByArg:function(show,xValue,yValue){  
            var chart=this,
                highchart=chart.highchart,
                series=highchart.options.series,
                seriesIndex,
                pointIndex;
            for (var i = 0; i < series.length; i++) {   
                if(series[i].name==show){ 
                    seriesIndex=i;
                    var data=series[i].data;  
                    for (var j = 0; j < data.length; j++) {
                        if(data[j]["x"]==xValue){    
                            pointIndex=j;
                            break;
                        }
                    };
                }
            };
            if(seriesIndex!=undefined&&pointIndex!=undefined){
                highchart.series[seriesIndex].data[pointIndex].update(yValue);
            }
            
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