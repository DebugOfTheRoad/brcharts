define([
    "./chart",
    "./utils/utils",
],function(Chart,utils){
    var WaterfallChart={

        //设置图的高度
        setChartHeight:function(){
             var chart=this, 
                containerId=chart.userOption.containerId,
                container,
                dataLen=chart.userData.length;
            $('#'+containerId).css("height",dataLen*30+150);//数字是单个条的所占高度
        },

    	//重写mergeChartOption
    	mergeChartOption:function(){
    		var chart=this,
    			option={};

    		option.chart={
    			type:"waterfall",
				inverted:true,
                zoomType:"y"
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
    			shows=userOption.shows,
    			startName=userOption.startName;

            for (var i = shows.length-1; i >= 0; i--) {
                var oneSeries={};
                oneSeries.name=shows[i];
                oneSeries.data=[];
                for (var j = 0; j < data.length; j++) {
              		var oneData={};
                    utils.extend(oneData,data[i]);  //将所有属性赋予给数据
      				oneData.start=data[j][startName];
      				oneData.y=data[j][oneSeries.name];
      				oneSeries.data.push(oneData);
                }

                series.push(oneSeries);
            }

            utils.merge(true,chart.option,option);
    	},

    	//重写mergeXAXisOption
    	mergeXAXisOption:function(){
    		var chart=this,
    			option={},
    			xName=chart.userOption.xName,
    			data=chart.userData;

    		var categoriesArr=[];

    		for (var i = 0; i < data.length; i++) {
    			categoriesArr.push(data[i][xName]);
    		}
    		option.xAxis={
    			categories: categoriesArr,
                gridLineWidth: 1
    		};

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
                option={};

            option.legend={
                verticalAlign: 'top',
                x: 20,
                y: 30
            };

            utils.merge(true,chart.option,option);
        },

        //设置x轴label鼠标放上去事件
        setXLabelMouseOver:function(mouseOver){
            var chart=this,
                option={};

            option.xAxis={
                onLabelMouseOver:mouseOver
            };

            utils.merge(true,chart.option,option);
        },

        //重写mergeTitleOption
        mergeTitleOption:function(){
            var chart=this,
                option={};

            option.tooltip={
                formatter:function(){
                    var yUnit=this.series.yAxis.options.yUnit || "";
                    return '<b>' + this.x + '</b><br/>'+'<b>' + utils.getDisplayName(this.series.name) + '</b>:' + this.y +yUnit;
                } 
            };
            utils.merge(true,chart.option,option);
        }
    };

    //继承Chart类
    WaterfallChart=utils.extendClass(Chart,WaterfallChart);
    
    return WaterfallChart;
});
