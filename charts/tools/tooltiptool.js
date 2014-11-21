define(["../utils/utils"],function(utils){
	var TooltipTool={
		//设置浮层格式化函数
	    setTooltipFormatter:function(formatter){
	        var chart=this,
	            option={};
	        option.tooltip={
	            formatter:formatter 
	        }
	        utils.merge(true,chart.option,option);
	    }
	}
	return TooltipTool;
});