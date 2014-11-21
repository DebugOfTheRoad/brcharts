define(["../utils/utils"],function(utils){
	var TitleTool={
		//设置标题内容
        setTitleText:function(text,isUseHtml){
            var chart=this,
                option={};
            option.title={
                text:text,
                useHTML:isUseHtml?true:false
            }
            utils.merge(true,chart.option,option);
        },

        //设置标题的颜色
        setTitleColor:function(color){
            var chart=this,
                option={};
            option.title={
                style:{
                    color:color
                } 
            }
            utils.merge(true,chart.option,option);
        },

        //设置标题的字体大小
        setTitleFontSize:function(fontSize){
            var chart=this,
                option={};
            option.title={
                style:{
                    fontSize:fontSize+"px"
                } 
            }
            utils.merge(true,chart.option,option);
        },

        //设置标题水平对齐方式
        //align:"left", "center","right"
        setTitleAlign:function(align){
            var chart=this,
                option={};

            option.title={
                align:align
            };
            utils.merge(true,chart.option,option);
        },

        //设置标题垂直对齐方式
        //verticalAlign:"top", "middle","bottom
        setTitleVerticalAlign:function(verticalAlign){
            var chart=this,
                option={};

            option.title={
                verticalAlign:verticalAlign
            };
            utils.merge(true,chart.option,option);
        },

        //设置标题位置
        setTitlePosition:function(x,y){
            var chart=this,
                option={};

            option.title={
                x:Number(x),
                y:Number(y)
            };
            utils.merge(true,chart.option,option);
        },

        //设置标题边距
        setTitleMargin:function(margin){
            var chart=this,
                option={};

            option.title={
                margin:Number(margin)
            };
            utils.merge(true,chart.option,option);
        },

        //设置副标题内容
        setSubTitleText:function(text,isUseHtml){
            var chart=this,
                option={};
            option.subtitle={
                text:text,
                useHTML:isUseHtml?true:false
            }
            utils.merge(true,chart.option,option);
        },

        //设置副标题的颜色
        setSubTitleColor:function(color){
            var chart=this,
                option={};
            option.subtitle={
                style:{
                    color:color
                } 
            }
            utils.merge(true,chart.option,option);
        },

         //设置副标题的字体大小
        setSubTitleFontSize:function(fontSize){
            var chart=this,
                option={};
            option.subtitle={
                style:{
                    fontSize:fontSize+"px"
                } 
            }
            utils.merge(true,chart.option,option);
        },

        //设置副标题水平对齐方式
        //align:"left", "center","right"
        setSubTitleAlign:function(align){
            var chart=this,
                option={};

            option.subtitle={
                align:align
            };
            utils.merge(true,chart.option,option);
        },

        //设置副标题垂直对齐方式
        //verticalAlign:"top", "middle","bottom
        setSubTitleVerticalAlign:function(verticalAlign){
            var chart=this,
                option={};

            option.subtitle={
                verticalAlign:verticalAlign
            };
            utils.merge(true,chart.option,option);
        },

        //设置副标题位置
        setSubTitlePosition:function(x,y){
            var chart=this,
                option={};

            option.subtitle={
                x:Number(x),
                y:Number(y)
            };
            utils.merge(true,chart.option,option);
        },

        //设置副标题边距
        setSubTitleMargin:function(margin){
            var chart=this,
                option={};

            option.subtitle={
                margin:Number(margin)
            };
            utils.merge(true,chart.option,option);
        }
	}
	return TitleTool;
});