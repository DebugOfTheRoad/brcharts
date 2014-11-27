define(["../utils/utils"],function(utils){
	var AxisTool={
		//添加x轴线
         addXLine:function(value,text,color){
            var chart=this,
                option=chart.option,
                xAxis=option.xAxis,
                plotLines;

            if(xAxis&&xAxis.plotLines){
                plotLines=xAxis.plotLines;
            }else{
                plotLines=[];
            }

            plotLines.push({
                    value:value?value:null,
                    color:color?color:"red",
                    dashStyle:"Solid",
                    width:1,
                    zIndex:10000,
                    label:{
                        text:text,
                        style:{
                            color:color?color:"red"
                        }
                    }
                });
            utils.merge(true,option,{
                xAxis:{
                    plotLines:plotLines
                }
            });
         },

         //添加y轴线
         addYLine:function(value,text,color){
            var chart=this,
                option=chart.option,
                yAxis=option.yAxis,
                plotLines;
            if(yAxis&&yAxis.plotLines){
                plotLines=yAxis.plotLines;
            }else{
                plotLines=[];
            }
            plotLines.push({
                    value:value?value:null,
                    color:color?color:"red",
                    dashStyle:"Solid",
                    width:1,
                    zIndex:10000,
                    label:{
                        text:text,
                        style:{
                            color:color?color:"red"
                        }
                    }
                });
            utils.merge(true,option,{
                yAxis:{
                    plotLines:plotLines
                }
            });
         },

         //添加x轴区域
         addXBand:function(from,to,color){
                var chart=this,
                option=chart.option,
                xAxis=option.xAxis,
                plotBands;
            if(xAxis&&xAxis.plotBands){
                plotBands=xAxis.plotBands;
            }else{
                plotBands=[];
            }
            plotBands.push({
                    from:from?from:null,
                    to:to?to:null,
                    color:color?color:"yellow"
                });
            utils.merge(true,option,{
                xAxis:{
                    plotBands:plotBands
                }
            });
         },

         //添加y轴区域
         addYBand:function(from,to,color){
                var chart=this,
                option=chart.option,
                yAxis=option.yAxis,
                plotBands;
            if(yAxis&&yAxis.plotBands){
                plotBands=yAxis.plotBands;
            }else{
                plotBands=[];
            }
            plotBands.push({
                    from:from?from:null,
                    to:to?to:null,
                    color:color?color:"yellow"
                });
            utils.merge(true,option,{
                yAxis:{
                    plotBands:plotBands
                }
            });
         },

          //设置是否显示x轴文本
        isShowXLabel:function(isShow){
            var chart=this,
            option={};
            
            option.xAxis={
                    labels: {
                        enabled: isShow
                    }
            };
             utils.merge(true,chart.option,option);     
        },
        
        //设置是否显示y轴文本
        isShowYLabel:function(isShow){
            var chart=this,
            option={};
            
            option.yAxis={
                    labels: {
                        enabled: isShow
                    }
            };
             utils.merge(true,chart.option,option);     
        },
        
        //隐藏y轴标题
        disableYTitle:function(){
            var chart=this,
            option={};
            
            option.yAxis={
                    title: {
                        text: null
                    }
            };
             utils.merge(true,chart.option,option);     
        },
        
        //隐藏X轴刻度
        disableXTick:function(){
            var chart=this,
            option={};
            
            option.xAxis={
                    tickWidth: 0        
            };
             utils.merge(true,chart.option,option);     
        },
        
        //隐藏Y轴刻度
        disableYTick:function(){
            var chart=this,
            option={};
            
            option.yAxis={
                    tickWidth: 0        
            };
            
             utils.merge(true,chart.option,option); 
        },
        
        //设置是否翻转xy轴
        isInverted:function(inverted){
            var chart=this,
            option={};
            
            option.chart={
                    inverted: inverted        
            };
            
             utils.merge(true,chart.option,option); 
        },
        
        //设置是否扭转x轴
        isXReversed:function(inverted){
            var chart=this,
            option={};
            
            option.xAxis={
                    reversed: inverted        
            };
            
             utils.merge(true,chart.option,option); 
        },
        
        //设置是否扭转y轴
        isYReversed:function(inverted){
            var chart=this,
            option={};
            
            option.yAxis={
                    reversed: inverted        
            };
            
             utils.merge(true,chart.option,option); 
        },
        
        //设置是否在x轴对面显示轴
        isXOpposite:function(opposite){
            var chart=this,
            option={};
            
            option.xAxis={
                    opposite: opposite        
            };
            
             utils.merge(true,chart.option,option); 
        },
        
        //设置是否在y轴对面显示轴
        isYOpposite:function(opposite){
            var chart=this,
            option={};
            
            option.yAxis={
                    opposite: opposite        
            };
            
             utils.merge(true,chart.option,option); 
        },
        
      //设置x轴文本旋转角度
        setXLabelRotation:function(degree){
            var chart=this,
            option={};    
            
            option.xAxis={
                    labels: {
                       rotation:degree
                    }        
            };
            
             utils.merge(true,chart.option,option); 
        },
        
        //设置y轴文本旋转角度
        setYLabelRotation:function(degree){
            var chart=this,
            option={};  
            
            option.yAxis={
                    labels: {
                       rotation:degree
                    }        
            };
            
             utils.merge(true,chart.option,option); 
        },
        
        //设置y轴刻度间隔
        setYTickInterval:function(interval){
            var chart=this,
            option={};
            
            option.yAxis={
                    tickInterval: interval        
            };
            
             utils.merge(true,chart.option,option); 
        },
        
        //设置x轴起始值
        setXStart:function(start){
            var chart=this,
            option={};
            
            option.xAxis={
                    min: start        
            };
            
             utils.merge(true,chart.option,option); 
        },
        
         //设置y轴起始值
        setYStart:function(start){
            var chart=this,
            option={};
            
            option.yAxis={
                    min: start        
            };
            
             utils.merge(true,chart.option,option); 
        },
        
        //设置x轴结束值
        setXEnd:function(end){
            var chart=this,
            option={};
            
            option.xAxis={
                    max: end        
            };
            
             utils.merge(true,chart.option,option); 
        },
        
        //设置y结束值
        setYEnd:function(end){
            var chart=this,
            option={};
            
            option.yAxis={
                    max: end        
            };
            
             utils.merge(true,chart.option,option); 
        },
        
        //设置是否显示x轴标尺
        isShowXCrossHairs:function(isShow){
            var chart=this,
            option={},
            crosshairs=chart.option.tooltip.crosshairs;

            option.tooltip={
                crosshairs: [{
                    width:1
                },crosshairs&&crosshairs[1]?crosshairs[1]:null]       
            };

            if(crosshairs&&crosshairs[0]){
                if(isShow){
                    crosshairs[0].width=crosshairs[0].width>0?crosshairs[0].width:1;
                }else{
                    crosshairs[0]=null;
                }
                option.tooltip.crosshairs[0]=crosshairs[0];
            }
            utils.merge(true,chart.option,option); 
        },
        
        //设置是否显示y轴标尺
        isShowYCrossHairs:function(isShow){
            var chart=this,
            option={},
            crosshairs=chart.option.tooltip.crosshairs;

            option.tooltip={
                crosshairs: [crosshairs&&crosshairs[0]?crosshairs[0]:null,{
                    width:1
                }]       
            };

            if(crosshairs&&crosshairs[1]){
                if(isShow){
                    crosshairs[1].width=crosshairs[1].width>0?crosshairs[1].width:1;
                }else{
                    crosshairs[1]=null;
                }
                option.tooltip.crosshairs[1]=crosshairs[1];
            }

            utils.merge(true,chart.option,option); 
        },
        
        //设置x轴标尺宽度
        setXCrossHairsWidth:function(width){
            var chart=this,
            option={},
            crosshairs=chart.option.tooltip.crosshairs;

            option.tooltip={
                crosshairs: [{
                    width:width
                },crosshairs&&crosshairs[1]?crosshairs[1]:null]       
            };

            if(crosshairs&&crosshairs[0]){
                crosshairs[0].width=width;
                option.tooltip.crosshairs[0]=crosshairs[0];
            }

            utils.merge(true,chart.option,option);
        },
        
        //设置y轴标尺宽度
        setYCrossHairsWidth:function(width){
            var chart=this,
            option={},
            crosshairs=chart.option.tooltip.crosshairs;

            option.tooltip={
                crosshairs: [crosshairs&&crosshairs[0]?crosshairs[0]:null,{
                    width:width
                }]       
            };

            if(crosshairs&&crosshairs[1]){
                crosshairs[1].width=width;
                option.tooltip.crosshairs[1]=crosshairs[1];
            }

            utils.merge(true,chart.option,option); 
        },
        
        //设置x轴标尺颜色
        setXCrossHairsColor:function(color){
            var chart=this,
            option={},
            crosshairs=chart.option.tooltip.crosshairs;

            option.tooltip={
                crosshairs: [{
                    color:color
                },crosshairs&&crosshairs[1]?crosshairs[1]:null]       
            };

            if(crosshairs&&crosshairs[0]){
                crosshairs[0].color=color;
                option.tooltip.crosshairs[0]=crosshairs[0];
            }

            utils.merge(true,chart.option,option); 
        },
        
        //设置y轴标尺颜色
        setYCrossHairsColor:function(color){
            var chart=this,
            option={},
            crosshairs=chart.option.tooltip.crosshairs;

            option.tooltip={
                crosshairs: [crosshairs&&crosshairs[0]?crosshairs[0]:null,{
                    color:color
                }]       
            };

            if(crosshairs&&crosshairs[1]){
                crosshairs[1].color=color;
                option.tooltip.crosshairs[1]=crosshairs[1];
            }

            utils.merge(true,chart.option,option);
        },

        //设置y值计算函数
        setYFunction:function(fun){
            var chart=this,
                option={};

            option.yAxis={
                yFunction:fun
            };

            utils.merge(true,chart.option,option); 
        },

        //设置y轴计算反函数
        setYInverseFunction:function(fun){
            var chart=this,
                option={};

            option.yAxis={
                yInverseFunction:fun
            };

            utils.merge(true,chart.option,option); 
        },

        //设置多Y轴显示   ////////////////////////////////////////////////
        addYAxis:function(shows,yTitle,yUnit,type){  
            var chart=this, 
            highchart=chart.highchart,
            userOption=chart.userOption,
            xName=userOption.xName,
            groupMap=chart.groupMap,
            groupKeys=groupMap.keys(),        //要显示的指标;
            chart_type=chart.option.chart.type;  

            if(chart_type!="spline"&&chart_type!="scatter"&&chart_type!="column"){
               throw "多Y轴添加只支持spline，scatter，column";
            }

            var yAxis={
                id: yTitle,
                title: {
                   text: yTitle+"("+yUnit+")"
                },
                lineWidth: 1,
                tickLength: 10,
                tickWidth: 1,
                opposite: true
            };
            highchart.addAxis(yAxis);    //添加Y轴 

            for (var i = 0; i < groupKeys.length; i++) {  
                for (var j = 0; j < shows.length ; j++) {  
                    var oneSeries={};
                        oneSeries.name=groupKeys[i]+"("+shows[j]+")";
                        if(type){
                            oneSeries.type=type;
                        }else{
                            oneSeries.type=chart.option.chart.type;
                        }
                        oneSeries.yAxis=yTitle;
                        oneSeries.data=[];
                    var data=groupMap.get(groupKeys[i]);
                    for (var k = 0; k < data.length; k++) {
                        if(data[k].hasOwnProperty(shows[j])){
                            var oneData={};
                            var datetime=data[k][xName]; 
                            if(datetime.match("-")!==null){
                                var datetimeToUTC=chart.datetimeChangeToUTC(datetime);   //datetime转化为UTC格式
                                oneData.x=datetimeToUTC;
                            }
                            oneData.y=data[k][shows[j]];
                            oneSeries.data.push(oneData);
                        }
                    }
                    highchart.addSeries(oneSeries);    //添加数据列 
                }   
            }   
        },

        //设置y分层
        setYLayer:function(dividing,percent){
            var chart=this,
                option={};

            option.yAxis={
                isLayer:true,
                dividing:dividing?dividing:null,
                layerPercent:percent?percent:null
            };

            utils.merge(true,chart.option,option); 
        }
       
	};
	return AxisTool;
});