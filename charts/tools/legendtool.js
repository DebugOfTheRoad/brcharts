define(["../utils/utils"],function(utils){
	var LegendTool={
		//设置是否显示图例
        isShowLegend:function(isShow){
            var chart=this,
                option={};

            option.legend={
                enabled:isShow
            };
            utils.merge(true,chart.option,option);
        },

        //设置图例水平对齐方式
        //align:"left", "center","right"
        setLengendAlign:function(align){
            var chart=this,
                option={};

            option.legend={
                align:align
            };
            utils.merge(true,chart.option,option);
        },

        //设置图例垂直对齐方式
        //verticalAlign:"top", "middle","bottom
        setLengendVerticalAlign:function(verticalAlign){
            var chart=this,
                option={};

            option.legend={
                verticalAlign:verticalAlign
            };
            utils.merge(true,chart.option,option);
        },

        //设置图例位置
        setLengendPosition:function(x,y){
            var chart=this,
                option={};

            option.legend={
                x:Number(x),
                y:Number(y)
            };
            utils.merge(true,chart.option,option);
        },

        //设置图例是否浮动
        isLengendFloating:function(isFloating){
            var chart=this,
                option={};

            option.legend={
                floating:isFloating
            };
            utils.merge(true,chart.option,option);
        },

        //设置图例布局
        setLengendLayout:function(layout){
            var chart=this,
                option={};

            option.legend={
                layout:layout
            };
            utils.merge(true,chart.option,option);
        },

        //设置图例是否折叠
        isLengendFlod:function(isFold){
            var chart=this,
                option={};

            option.legend={
                isFold:isFold
            };
            utils.merge(true,chart.option,option);
        }
	};
	return LegendTool;
});