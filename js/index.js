$(function() {
    //value[排名,交易金额,建议台数,距离,显示颜色]
    // 1 绿色(减弱) 2 蓝色(保持) 3红色(加强)
    var data = [
        {name: '园东社区', value: [28,2556,0,1059,2]},
        {name: '红荔社区', value: [80,5500,-5,843,1]},
        {name: '南天社区', value: [19,4095,0,1132,2]},
        {name: '长城社区', value: [91,3950,2,860,3]},
        {name: '鹏盛社区', value: [31,2516,0,519,2]},
        {name: '华林社区', value: [14,4357,0,800,2]},
        {name: '玉田社区', value: [84,5897,0,784,2]},
        {name: '滨江社区', value: [85,5689,0,672,2]},
        {name: '巴登社区', value: [20,5714,0,769,2]},
        {name: '东园社区', value: [57,2000,0,579,2]},
        {name: '沙埔头社区', value: [72,5500,5,515,3]},
        {name: '锦龙社区', value: [26,3933,0,999,2]},
        {name: '园西社区', value: [15,2360,0,211,2]},
        {name: '南华社区', value: [45,2655,0,938,2]},
        {name: '赤尾社区', value: [27,2950,-2,823,1]},
        {name: '滨河社区', value: [81,5308,0,577,2]},
        {name: '渔农社区', value: [47,3000,0,725,2]},
        {name: '水围社区', value: [9,2113,0,454,2]},
        {name: '皇岗社区', value: [10,2100,-2,911,1]},
        {name: '海滨社区', value: [34,2549,-3,591,1]},
        {name: '福民社区', value: [86,3533,0,894,2]},
        {name: '口岸社区', value: [6,3425,0,888,2]},
        {name: '福安社区', value: [92,3000,1,432,3]},
        {name: '岗厦社区', value: [18,4133,0,690,2]},
        {name: '福山社区', value: [88,4750,0,657,2]},
        {name: '福田社区', value: [61,6389,2,598,3]},
        {name: '福华社区', value: [63,5002,3,988,3]},
        {name: '天安社区', value: [73,2750,0,433,2]},
        {name: '金城社区', value: [87,1550,0,567,2]},
        {name: '新沙社区', value: [60,2500,-3,834,1]},
        {name: '金地社区', value: [48,2739,-4,1100,1]},
        {name: '新华社区', value: [42,1700,-1,921,1]},
        {name: '翠湾社区', value: [55,1806,-3,855,1]},
    ];
    var geoCoordMap = {
        '园东社区':[114.1108, 22.5607],
        '红荔社区':[114.1045, 22.5601],
        '南天社区':[114.1013, 22.5603],
        '长城社区':[114.0948, 22.5588],
        '鹏盛社区':[114.1070, 22.5630],
        '华林社区':[114.1030, 22.5652],
        '玉田社区':[114.1024, 22.5423],
        '滨江社区':[114.1080, 22.5430],
        '巴登社区':[114.1088, 22.5455],
        '东园社区':[114.1088, 22.5438],
        '沙埔头社区':[114.0998, 22.5433],
        '锦龙社区':[114.0948, 22.5413],
        '园西社区':[114.0942, 22.5442],
        '南华社区':[114.0947, 22.5397],
        '赤尾社区':[114.0930, 22.5380],
        '滨河社区':[114.0915, 22.5360],
        '渔农社区':[114.0806, 22.5220],
        '水围社区':[114.0680, 22.5260],
        '皇岗社区':[114.0670, 22.5310],
        '海滨社区':[114.0720, 22.5290],
        '福民社区':[114.0770, 22.5320],
        '口岸社区':[114.0860, 22.5330],
        '福安社区':[114.0590, 22.5380],
        '岗厦社区':[114.0698, 22.5423],
        '福山社区':[114.0758, 22.5383],
        '福田社区':[114.0848, 22.5378],
        '福华社区':[114.0898, 22.5438],
        '天安社区':[114.0380, 22.5370],
        '金城社区':[114.0030, 22.5370],
        '新沙社区':[114.0530, 22.5360],
        '金地社区':[114.0390, 22.5270],
        '新华社区':[114.0510, 22.5310],
        '翠湾社区':[114.0480, 22.5215],

    };

    var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value)
                });
            }
        }
        return res;
    };

    //area高度
    var area_H = $(document).height() - 80 + 'px';
    $('.area').css('height',area_H);
    $('.transaction').css('height',area_H);
    //地图

    var myChina = echarts.init(document.getElementById('allmap'))
    var option = {
        color: ['#EE5566','#0DB3CC','#80D640'],
        tooltip : {
            trigger: 'item',
            formatter:function(prams){
                return prams.name + '<br />'+ '交易金额：'+prams.value[3]+'（万元）' + '<br />'+ '社区综合排名：' + prams.value[2] + '（名）';
            }
        },
        legend: {
            backgroundColor: '#fff',
            orient: 'vertical',
            top: 10,
            right:10,
            icon: 'rect',
            padding:10,
            selectedMode:false,
            data:['加强','保持','减弱'],
            textStyle: {
                color: '#333'
            }
        },
        bmap: {
            center: [114.0600, 22.5439],   //114.5435, 22.5439   左：侨城东路   右:红岭  上：梅岭水库    下：福田口岸
            zoom: 14,
            roam: 'scale',
            zlevel:999,
            mapStyle: {
                styleJson: [
                    {
                    'featureType': 'water',  //调整水颜色
                    'elementType': 'all',
                    'stylers': {
                        'color': '#d1d1d1'
                    }
                }, {
                    'featureType': 'land',   //调整土地颜色
                    'elementType': 'all',
                    'stylers': {
                        'color': '#f3f3f3'
                    }
                }, {
                    'featureType': 'railway',  //铁路信息
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'highway', //高速公路
                    'elementType': 'all',
                    'stylers': {
                        'color': '#fdfdfd'
                    }
                }, {
                    'featureType': 'highway',
                    'elementType': 'labels',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'arterial',
                    'elementType': 'geometry',
                    'stylers': {
                        'color': '#fefefe'
                    }
                }, {
                    'featureType': 'arterial',
                    'elementType': 'geometry.fill',
                    'stylers': {
                        'color': '#fefefe'
                    }
                }, {
                    'featureType': 'poi',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'on'
                    }
                }, {
                    'featureType': 'green',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'subway',  //地铁线路
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                },/* {
                    'featureType': 'manmade',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#d1d1d1'
                    }
                }, {
                    'featureType': 'local',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#d1d1d1'
                    }
                }, {
                    'featureType': 'arterial',
                    'elementType': 'labels',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, */{
                    'featureType': 'boundary',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#000'
                    }
                }, {
                    'featureType': 'building',
                    'elementType': 'labels',
                    'stylers': {
                        /*'color': '#d1d1d1'*/
                        'visibility':'off'
                    }
                }, {
                    'featureType': 'label',
                    'elementType': 'labels.text.fill',
                    'stylers': {
                        'color': '#999999'
                    }
                }]
            }
        },
        visualMap: {
            min: 1,
            max: 3,
            calculable: true,
            show:false,
            color: ['#EE5566','#0DB3CC','#80D640'],
            textStyle: {
                color: '#fff'
            }
        },
        series : [
            {
                name: '加强',
                type: 'effectScatter',
                coordinateSystem: 'bmap',
                zlevel:9999,
                data: convertData(data.sort(function (a, b) {
                    return b.value - a.value[1];
                }).slice(0, 56)),
                symbolSize: function (val) {
                    return val[3] / 200;
                },
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: '{b}',
                        show: false
                    },
                    emphasis: {
                        position: 'top',
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        /*opacity:0.7,*/
                        shadowBlur: 10,
                        shadowColor: '#999'
                    }
                },
            },
            {
                name: '保持',
                type: 'scatter',
                coordinateSystem: 'bmap',
            },
            {
                name: '减弱',
                type: 'scatter',
                coordinateSystem: 'bmap',
            }
        ]
    };
    myChina.setOption(option);
    /*var bmap = myChina.getModel().getComponent('dituContent').getMap();
    bmap.addEventListener('click',function(e){
        if(!e.overlay){
            e.stopPropagation()
        }
    })*/

    //点击弹出层
    myChina.on('click',function(prams){
        console.log(prams);
        $('#tab').css('display','block');
        //社区名
        var name = prams.name;
        $('.tabText >h1').html(name);
        //台数和距离
        var desk = prams.value[4];
        var distance = prams.value[5];
        $('span.colorRed:eq(0)').html(desk);
        $('span.colorRed:eq(1)').html(distance);

        //点击地图时选项卡回到默认
        $('div.tab_menu ul li:eq(0)').addClass("selected")
            .siblings().removeClass('selected');
        $('div.tab_box >div:eq(0)').show()
            .siblings().hide();
        $('#transactionLine').empty();
        $('#transactionBar').empty();

        //区域特性
        //饼图随机数
        function randomData() {
            return Math.round(Math.random()*500);
        }
        var areaPie = echarts.init(document.getElementById('areaPie'));
        var areaPie_option = {
            backgroundColor:'#f8f8f8',
            title : {
                top:5,
                left:5,
                text: '区域人流分析',
                textStyle:{
                    fontSize:16
                }
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c}人 ({d}%)"
            },
            legend: {
                x: 'center',
                left:20,
                bottom:10,
                data: ['小区','车站','医院','商场','市场','学校','大厦','景点']
            },
            series : [
                {
                    name: '区域人流分析',
                    type: 'pie',
                    radius : '45%',
                    center: ['50%', '42%'],
                    data:[
                        {name:'小区', value:randomData()},
                        {name:'车站', value:randomData()},
                        {name:'医院', value:randomData()},
                        {name:'商场', value:randomData()},
                        {name:'市场', value:randomData()},
                        {name:'学校', value:randomData()},
                        {name:'大厦', value:randomData()},
                        {name:'景点', value:randomData()}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
        areaPie.setOption(areaPie_option)

        //柱状图随机数
        var dataBar = [];
        for (var i = 0; i < 5; i++) {
            dataBar.push((Math.random() * 500).toFixed(0));
        }
        var areaBar = echarts.init(document.getElementById('areaBar'));
        var areaBar_option = {
            backgroundColor:'#f8f8f8',
            title : {
                top:5,
                left:5,
                text: '区域人口年龄分布',
                textStyle:{
                    fontSize:16
                }
            },
            tooltip : {
                trigger: 'axis',
                formatter: "{a} <br/>{b} : {c}（人）",
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : ['0~10', '10~20', '20~30', '30~50', '50岁以上'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'年龄分布',
                    type:'bar',
                    barWidth: '60%',
                    data:dataBar
                }
            ]
        }
        areaBar.setOption(areaBar_option)

    });

    //弹出层选项卡
    var $div_li =$("div.tab_menu ul li");
    $div_li.click(function(){
        $(this).addClass("selected")            //当前<li>元素高亮
            .siblings().removeClass("selected");  //去掉其它同辈<li>元素的高亮
        var index =  $div_li.index(this);  // 获取当前点击的<li>元素 在 全部li元素中的索引。
        $("div.tab_box > div")       //选取子节点。不选取子节点的话，会引起错误。如果里面还有div
            .eq(index).show()   //显示 <li>元素对应的<div>元素
            .siblings().hide(); //隐藏其它几个同辈的<div>元素

        if(index == '1'){
            //交易分析
            if(!$('#transactionLine').is(':has(div)')){
                //折线图随机数
                var transactionLine1 = [],transactionLine2 = [],transactionLine3 = [],
                    transactionBar1= [],transactionBar2= [];
                for (var i = 0; i < 12; i++) {
                    transactionLine1.push((Math.random() * 500).toFixed(2));
                    transactionLine2.push((Math.random() * 10).toFixed(2));
                    transactionLine3.push((Math.random() * 10).toFixed(2));
                }
                //柱状图随机数
                for (var i = 0; i < 6; i++) {
                    transactionBar1.push((Math.random() * 600).toFixed(0));
                    transactionBar2.push((Math.random() * 600).toFixed(0));
                }
                //折线图
                var transactionLine = echarts.init(document.getElementById('transactionLine'));
                var transactionLine_option = {
                    backgroundColor:'#f8f8f8',
                    title : {
                        top:5,
                        left:5,
                        text: 'ATM交易分析',
                        textStyle:{
                            fontSize:16
                        }
                    },
                    tooltip: {
                        trigger: 'axis',
                        formatter: '{b}<br />{a0}: {c0}'+'（万）<br />{a1}: {c1}'+'（万）<br />{a2}: {c2}'+'（万）'
                    },
                    legend: {
                        top:35,
                        data:['跨行交易金额','发卡手续费','转接服务费']
                    },
                    grid: {
                        top:'30%',
                        left: '3%',
                        right: '3%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        axisLabel:{
                            interval:0,
                        },
                        boundaryGap: false,
                        data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
                    },
                    yAxis: [
                        {
                            type:'value',
                            name:"万",
                            splitLine: {
                                show: false
                            }
                        },
                        {
                            type: 'value',
                            name:"万",
                            splitLine: {
                                show: false
                            }
                        }
                    ],
                    series: [
                        {
                            name:'跨行交易金额',
                            type:'line',
                            yAxisIndex: 0,
                            data:transactionLine1
                        },
                        {
                            name:'发卡手续费',
                            type:'line',
                            yAxisIndex: 1,
                            data:transactionLine2
                        },
                        {
                            name:'转接服务费',
                            type:'line',
                            yAxisIndex: 1,
                            data:transactionLine3
                        }
                    ]
                };
                transactionLine.setOption(transactionLine_option)

                //柱状图
                var transactionBar = echarts.init(document.getElementById('transactionBar'));
                var transactionBar_option = {
                    backgroundColor:'#f8f8f8',
                    title : {
                        top:5,
                        left:5,
                        text: '年度交易金额分析',
                        textStyle:{
                            fontSize:16
                        }
                    },
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        },
                        formatter: '{b}<br />{a0}: {c0}'+'（万）<br />{a1}: {c1}'+'（万）'
                    },
                    legend: {
                        top:5,
                        right:5,
                        data:['取现','转账']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            axisLabel:{
                                interval:0,
                            },
                            data : ['中国银行','农业银行','建设银行','工商银行','邮政储蓄','交通银行']
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:'取现',
                            type:'bar',
                            stack: '广告',
                            data:transactionBar1
                        },
                        {
                            name:'转账',
                            type:'bar',
                            stack: '广告',
                            data:transactionBar2
                        }
                    ]
                };
                transactionBar.setOption(transactionBar_option)

                //折线图点击事件
                transactionLine.on('click',function(prams){
                    console.log(prams.dataIndex);
                    var name = prams.dataIndex;
                    var transactionBar3= [],transactionBar4= [];
                    for(var i = 0; i < 6; i++){
                        transactionBar3.push((Math.random() * 60).toFixed(0));
                        transactionBar4.push((Math.random() * 60).toFixed(0));
                    }
                    transactionBar_option.title.text = + (name + 1) +'月交易金额分析';
                    transactionBar_option.series[0].data = transactionBar3;
                    transactionBar_option.series[1].data = transactionBar4;
                    transactionBar.setOption(transactionBar_option)
                })
            }
        }
    });

    //弹出层关闭
    $('.close').on('click',function(){
        $('#tab').css('display','none');
    })
});