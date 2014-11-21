define([
    "./chart",
    "./utils/utils",
],function(Chart,utils){
    var WaterfallChart={

        //基础数据处理
        processData:function(){
            var chart=this,
                userOption=chart.userOption,
                userData=chart.userData,
                group=userOption.group,
                dimension=userOption.dimension,
                groupMap,
                dimensionMap;

            //分组
            groupMap=utils.group(userData,group);
            chart.groupMap=groupMap;

            //维度
            if(dimension){
                dimensionMap=utils.group(userData,dimension);
                chart.dimensionMap=dimensionMap;
            }
        },

        //设置图的高度
        setChartHeight:function(){
             var chart=this, 
                containerId=chart.userOption.containerId,
                container,
                dataLen;

            dataLen=chart.groupMap.keys().length;
            $('#'+containerId).css("height",dataLen*30+120);//数字是单个条的所占高度
        },

    	//重写mergeChartOption
    	mergeChartOption:function(){
    		var chart=this,
                userOption=chart.userOption;
                xNames=chart.groupMap.keys();
    			option={};

    		option.chart={
    			type:"waterfall",
				inverted:true,
                zoomType:"y",
                showLen:xNames.length,
                subType:"streaming",
                groupKeys:chart.groupMap.keys()
    		};

            utils.merge(true,chart.option,option);

            chart.setChartHeight();
    	},

    	//重写mergeSeriesOption
    	mergeSeriesOption:function(){
    		var chart=this,
    			option={},
    			series=option.series=[],
    			userOption=chart.userOption,
                data=chart.userData,
    			groupField=userOption.group,
                dimensionField=userOption.dimension,
    			shows=userOption.shows,
    			startName=userOption.startName,
                dimensionMap,
                dimensionKeys;

            if(dimensionField){
                dimensionMap=chart.dimensionMap,
                dimensionKeys=dimensionMap.keys();
                for (var k = 0; k < dimensionKeys.length; k++) {
                    for (var i = shows.length-1; i >= 0; i--) {
                        var oneSeries={};
                        oneSeries.name=dimensionKeys[k];
                        oneSeries.data=new Array();
                        for (var j = 0; j < data.length; j++) {
                            var oneData={};
                            if(dimensionKeys[k]==data[j][dimensionField]){
                                utils.extend(oneData,data[k]);  //将所有属性赋予给数据
                                oneData.name=data[j][groupField];
                                oneData.start=data[j][startName];
                                oneData.y=data[j][shows[i]];
                                oneData._showField=shows[i];
                            }
                            oneSeries.data.push(oneData);
                        };
                        series.push(oneSeries);
                    };
                };
            }else{
                for (var i = shows.length-1; i >= 0; i--) {
                    var oneSeries={};
                    oneSeries.name=shows[i];
                    oneSeries.data=new Array();
                    for (var j = 0; j < data.length; j++) {
                        var oneData={};
                        utils.extend(oneData,data[j]);  //将所有属性赋予给数据
                        oneData.name=data[j][groupField];
                        oneData.start=data[j][startName];
                        oneData.y=data[j][oneSeries.name];
                        oneSeries.data.push(oneData);
                    };

                    series.push(oneSeries);
                };
            }
            
            utils.merge(true,chart.option,option);
    	},

    	//重写mergeXAXisOption
    	mergeXAXisOption:function(){
    		var chart=this,
    			option={},
    			xName=chart.userOption.xName,
                groupMap=chart.groupMap,
                groupKeys,
                xNames=[];

            groupKeys = groupMap.keys();

            for (var i = 0; i < groupKeys.length; i++) {
                xNames.push(groupMap.get(groupKeys[i])[0][xName]);
            };


    		option.xAxis={
    			categories: xNames,
                gridLineWidth: 1
    		}

            utils.merge(true,chart.option,option);
    	},

        //重写mergeYAxisOption
        mergeYAxisOption:function(){
            var chart=this,
                option={};

            option.yAxis={
                title:{
                    align:"low"
                 },
                opposite: true
            };

            utils.merge(true,chart.option,option);
        },

        //重写mergeLegendOption
        mergeLegendOption:function(){
            var chart=this,
                dimension=chart.userOption.dimension,
                option={};

            option.legend={
                verticalAlign: 'top',
                x: 20,
                y: 30,
                labelFormatter:function(){
                    if(dimension)
                        return this.name;
                    else
                        return utils.getDisplayName(this.name);
                }
            }

            utils.merge(true,chart.option,option);
        },

        //重写mergeTitleOption
        mergeTitleOption:function(){
            var chart=this,
                option={},
                yUnit=chart.userOption.yUnit,
                dimension=chart.userOption.dimension,
                xName=chart.userOption.xName;

            option.tooltip={
                formatter:function(){
                    if(dimension)
                        return '<b>' + this.point[xName] + '</b><br/>' + this.series.name + '<br/>'+utils.getDisplayName(this.point._showField)+":" + this.y +yUnit ;
                    else
                        return '<b>' + this.point[xName] + '</b><br/>' + utils.getDisplayName(this.series.name) + ":" + this.y +yUnit ;
                } 
            }
            utils.merge(true,chart.option,option);
        }
    };

    //继承Chart类
    WaterfallChart=utils.extendClass(Chart,WaterfallChart);
    
    return WaterfallChart;
});
