define([
    "./utils/utils",
    "./tools/axistool",
    "./tools/legendtool",
    "./tools/othertool",
    "./tools/seriestool",
    "./tools/titletool",
    "./tools/tooltiptool",
],function(utils,AxisTool,LegendTool,OtherTool,SeriesTool,TitleTool,TooltipTool){
    /**
     * Chart 类，
     * 图的基类,其他图继承于该类
     * 该类对外提供highcharts的option参数
     * 通过函数对外提供接口
     */
    var Chart=function(){
        this.init();
    };

    Chart.prototype={
        /**
        * 默认的option
        * 如果要修改通用的基础属性，修改这个
        * 该属性将影响所有图形
        */
        option:{
            title:{},
            subtitle:{},
            credits:{
                enabled:false
            },
            colors:['#87CEFF', '#76EE00', '#836FFF', '#FF8C69', '#FF7F00', '#FF4040', '#FF69B4', '#DDA0DD', '#CAE1FF', '#DCDCDC', '#ABABAB', '#8B8B00', '#48D1CC', '#383838', '#1C86EE', '#00CD66']
        },
        userOption:{},

        init:function(){
            utils.extend(Chart.prototype,AxisTool);
            utils.extend(Chart.prototype,LegendTool);
            utils.extend(Chart.prototype,OtherTool);
            utils.extend(Chart.prototype,SeriesTool);
            utils.extend(Chart.prototype,TitleTool);
            utils.extend(Chart.prototype,TooltipTool);
        },

        //设置用户option
        setOption:function(userOption){
            var chart=this;
            chart.userOption=userOption;
            chart.fields=userOption.fields;

            chart.processData();        //基础数据处理
            chart.initChartOption();    //设置chart的option
            chart.initTitleOption();    //设置title的option
            chart.initSeriesOption();   //设置series的option
            chart.initTooptipOption();  //设置tooltip的option
            chart.initXAxisOption();    //设置xAxis的option
            chart.initYAxisOption();    //设置yAxis的option
            chart.initLegendOption();   //设置legend的option
            chart.initPlotOptions();    //设置PlotOptions
            chart.initOtherOptions();   //设置其他option
        },

        //添加数据
        setData:function(userData){
            var chart=this;

            chart.userData=userData;
        },

        //基础数据处理
        processData:function(){
            
        }, 

        //初始化标题
        initTitleOption:function(){
            var chart=this,
                userOption=chart.userOption,
                option=chart.option;
            
            option.title={
                text:userOption.title||""
            };
            option.subtitle={};

            chart.mergeTitleOption();
        },

        //初始化图
         initChartOption:function(){
            var chart=this;
            chart.mergeChartOption();
         },

         //初始化数据列
         initSeriesOption:function(){
            var chart=this;
            chart.mergeSeriesOption();
         },

         //初始化浮层
         initTooptipOption:function(){
            var chart=this;
            chart.mergeTooltipOption();
         },

         //初始化X轴
         initXAxisOption:function(){
            var chart=this,
                option=chart.option;

            option.xAxis={
                tickLength:0
            };

            chart.mergeXAXisOption();
         },

         //初始化Y轴
         initYAxisOption:function(){
            var chart=this,
                option=chart.option,
                userOption=chart.userOption,
                yTitle;

            if(userOption.yTitle&&userOption.yTitle!=""){
                yTitle=userOption.yUnit?userOption.yTitle+"("+userOption.yUnit+")":userOption.yTitle
            }

            option.yAxis={
                 title:{
                    text:yTitle
                 },
                 tickLength:0,
                 yUnit:userOption.yUnit
            };
            chart.mergeYAxisOption();
         },

         //初始化图例
         initLegendOption:function(){
            var chart=this,
                option=chart.option,
                fields=chart.fields;

            option.legend={
                isAlignment:true,
                isFold:true,
                labelFormatter:function(){
                    return utils.getDisplayName(fields,this.name);
                }
            };

            chart.mergeLegendOption();
         },

         //初始化每个系列类型配置对象 
         initPlotOptions:function(){
            var chart=this;
            chart.mergePlotOptions();
         },

         //初始化其他
         initOtherOptions:function(){
            var chart=this;
            chart.mergeOtherOptions();
         },

         //绘制
         draw:function(){
            var chart=this, 
                containerId=chart.userOption.containerId,
                container;

            container=window.document.getElementById(containerId);
            $('#'+containerId).highcharts(chart.option);
            chart.highchart=$('#'+containerId).highcharts();
         },

        /**
        *并入特殊的option，供子类继承
        */
         mergeChartOption:function(){},
         mergeTitleOption:function(){},
         mergeSeriesOption:function(){},
         mergeTooltipOption:function(){},
         mergeXAXisOption:function(){},
         mergeYAxisOption:function(){},
         mergeLegendOption:function(){},
         mergePlotOptions:function(){},
         mergeOtherOptions:function(){}
    };
    
    return Chart;

});
