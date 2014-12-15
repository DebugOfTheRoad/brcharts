#图表接口文档

>brcharts是基于Highcharts再次封装完善起来的一套纯js图标库，目前支持曲线图、柱状图、散点图、饼图、环图、流媒体播放图、瀑布图、TCP建联图和极地图9种，同时我们提供了各种接口对图标基本属性的修改控制，以面向对象的思想生成各种图标，简单实用。

###使用步骤：

####1.新建一个HTML静态网页，引入所需要的js文件。
```html
<html>
  <head>
    <title>曲线图</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" >
    <script src="../built/brcharts/lib/jquery-1.8.3.js"></script>
    <script src="../built/brcharts/highcharts/highcharts.src.js"></script>
    <script data-main="../built/brcharts/main"
        src="../built/brcharts/lib/require.js"></script>
  </head>
  <body>
      <div id="container"></div>
  </body>
</html>

```

####2、通过requirejs异步加载brcharts，初始化brcharts对象。

```html
<script>
    require(["brcharts"],function(brcharts){
        $(function(){
             --------    //第3步
             --------    //第4步
        });
    });
</script>
```

####3、传递数据和设置图的参数。

```js
  var data=[{"taskName":"任务1","RE_TIME":5,"datetime":"1360454400000"},
           {"taskName":"任务1","RE_TIME":8,"datetime":"1364169600000"},
           {"taskName":"任务2","RE_TIME":7,"datetime":"1394496000000"},
           {"taskName":"任务2","RE_TIME":6,"datetime":"1402444800000"}
      ];
  var option={
          containerId:"container",          //放置HighCharts容器对应的ID
          shows:["RE_TIME"],                //要显示的指标
          title:"曲线图",                   //标题
          subtitle:"副标题",                //副标题
          yTitle:"时间",                    //y轴标题
          yUnit:"s" ,                       //y轴单位
          xName:"datetime",                 //x轴显示的名称
          fields:{                          //字符的反显
                    "RE_TIME":"响应时间"
                  },
          group:"taskName"                  //分组依据
      };
```

####4、初始化想要生成的瀑布图，调用相应的接口在网页显示。

```js
  var chart=new brcharts.SplineChart();    //初始化曲线图
  chart.setData(data);         //传递数据
  chart.setOption(option);     //设置参数
  chart.draw();                //绘制曲线图
```

####5、最后保存网页，在浏览器中打开就可显示相应的瀑布图。

###瀑布图类型与其相对应的对象名称。
        曲线图-------------SplineChart
        柱状图-------------ColumnChart
        散点图-------------ScatterChart
        饼  图-------------PieChart
        环  图-------------RingChart
        流媒体播放图-------TsChart
        瀑布图-------------WaterfallChart
        TCP建联图----------TsChart
        极地图-------------PolarChart








