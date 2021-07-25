// This file is modified by guole
// * Translated into Chinese.
// * Remove title of category statistics chart.
// * Enlarge size of category statistics chart.
// * Add post canlendar.
// * Add category radar chart.

const cheerio = require('cheerio')
const moment = require('moment')

hexo.extend.filter.register('after_render:html', function (locals) {
  const $ = cheerio.load(locals)
  const post = $('#posts-chart')
  const tag = $('#tags-chart')
  const category = $('#categories-chart')
  const calendar = $('#posts-calendar')
  const radar = $('#categories-radar')
  let htmlEncode = false

  if (post.length > 0 || tag.length > 0 || category.length > 0 || calendar.length > 0 || radar.length > 0) {
    $('head').after('<style type="text/css">#posts-chart,#posts-calendar,#categories-chart,#categories-radar,#tags-chart{width: 100%;height: 300px;margin: 0.5rem auto;padding: 0.5rem;overflow-x: auto;}</style><script type="text/javascript" src="https://cdn.jsdelivr.net/npm/echarts@4.7.0/dist/echarts.min.js"></script>')
    if (post.length > 0 && $('#postsChart').length === 0) {
      if (post.attr('data-encode') === 'true') htmlEncode = true
      post.after(postsChart())
    }
    if (calendar.length > 0 && $('#postsCalendar').length === 0) {
      if (calendar.attr('data-encode') === 'true') htmlEncode = true
      calendar.after(postsCalendar())
    }
    if (tag.length > 0 && $('#tagsChart').length === 0) {
      if (tag.attr('data-encode') === 'true') htmlEncode = true
      tag.after(tagsChart(tag.attr('data-length')))
    }
    if (category.length > 0 && $('#categoriesChart').length === 0) {
      if (category.attr('data-encode') === 'true') htmlEncode = true
      category.after(categoriesChart())
    }
    if (radar.length > 0 && $('#categoriesRadar').length === 0) {
      if (radar.attr('data-encode') === 'true') htmlEncode = true
      radar.after(categoriesRadar())
    }
    if (htmlEncode) {
      return $.root().html().replace(/&amp;#/g, '&#')
    } else {
      return $.root().html()
    }
  } else {
    return locals
  }
}, 25)

function postsChart () {
  const startDate = moment().subtract(1, 'years').startOf('month')
  const endDate = moment().endOf('month')

  const monthMap = new Map()
  const dayTime = 3600 * 24 * 1000
  for (let time = startDate; time <= endDate; time += dayTime) {
    const month = moment(time).format('YYYY-MM')
    if (!monthMap.has(month)) {
      monthMap.set(month, 0)
    }
  }
  hexo.locals.get('posts').forEach(function (post) {
    const month = post.date.format('YYYY-MM')
    if (monthMap.has(month)) {
      monthMap.set(month, monthMap.get(month) + 1)
    }
  })

  const monthArr = JSON.stringify([...monthMap.keys()])
  const monthValueArr = JSON.stringify([...monthMap.values()])

  return `
  <script id="postsChart">
    let postsChart = echarts.init(document.getElementById('posts-chart'));
    let postsOption = {
        title: {
            text: '文章发布统计',
            top: -5,
            x: 'center'
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            data: ${monthArr}
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                // name: 'Number of Post',
                name: '文章篇数',
                type: 'line',
                color: ['#6772e5'],
                data: ${monthValueArr},
                markPoint: {
                    symbolSize: 45,
                    color: ['#fa755a','#3ecf8e','#82d3f4'],
                    data: [{
                        type: '最大值',
                        itemStyle: {color: ['#3ecf8e']},
                        name: 'MAX'
                    }, {
                        type: 'min',
                        itemStyle: {color: ['#fa755a']},
                        name: '最小值'
                    }]
                },
                markLine: {
                    itemStyle: {color: ['#ab47bc']},
                    data: [
                        {type: 'average', name: '平均值'}
                    ]
                }
            }
        ]
    };
    postsChart.setOption(postsOption);
    </script>`
}

// Post Canlendar added by george16886
function postsCalendar () {
  // calculate range.
  const startDate = moment().subtract(1, 'years')
  const endDate = moment()
  const rangeArr = '["' + startDate.format('YYYY-MM-DD') + '", "' + endDate.format('YYYY-MM-DD') + '"]'

  // post and count map.
  const dateMap = new Map()
  hexo.locals.get('posts').forEach(function (post) {
    const date = post.date.format('YYYY-MM-DD')
    const count = dateMap.get(date)
    dateMap.set(date, count === null || count === undefined ? 1 : count + 1)
  })

  // loop the data for the current year, generating the number of post per day
  var i = 0
  var datePosts = '['
  const dayTime = 3600 * 24 * 1000
  for (let time = startDate; time <= endDate; time += dayTime) {
    const date = moment(time).format('YYYY-MM-DD')
    datePosts = (i === 0 ? datePosts + '["' : datePosts + ', ["') + date + '", ' + (dateMap.has(date) ? dateMap.get(date) : 0) + ']'
    i++
  }
  datePosts += ']'

  return `
  <script id="postsCalendar">
    let postsCalendar = echarts.init(document.getElementById('posts-calendar'));
    let postsCalendarOption = {
        title: {
            top: 0,
            text: '文章发布日历',
            left: 'center',
            textStyle: {
                color: '#3C4858'
            }
        },
        tooltip: {
            padding: 10,
            backgroundColor: '#555',
            borderColor: '#777',
            borderWidth: 1,
            formatter: function (obj) {
                var value = obj.value;
                return '<div style="font-size: 14px;">' + value[0] + '<br/> ✒️文章 : ' + value[1] + '</div>';
            }
        },
        visualMap: {
            show: true,
            showLabel: true,
            categories: [0, 1, 2, 3, 4],
            calculable: true,
            inRange: {
                symbol: 'rect',
                color: ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127']
            },
            itemWidth: 12,
            itemHeight: 12,
            orient: 'horizontal',
            left: 'center',
            bottom: 30
        },
        calendar: [{
            top: 90,
            right: 25,
            range: ${rangeArr},
            cellSize: [13, 13],
            splitLine: {
                show: false
            },
            itemStyle: {
                color: '#196127',
                borderColor: '#fff',
                borderWidth: 2
            },
            yearLabel: {
                show: false
            },
            monthLabel: {
                nameMap: 'en',
                fontSize: 11
            },
            dayLabel: {
                formatter: '{start}  1st',
                nameMap: ['', 'Mon', '', 'Wed', '', 'Fri', ''],
                fontSize: 11
            }
        }],
        series: [{
            type: 'heatmap',
            coordinateSystem: 'calendar',
            calendarIndex: 0,
            data: ${datePosts}
        }]
    };
    postsCalendar.setOption(postsCalendarOption);
    </script>`
}

function tagsChart (dataLength = 10) {
  const tagArr = []
  hexo.locals.get('tags').map(function (tag) {
    tagArr.push({ name: tag.name, value: tag.length })
  })
  tagArr.sort((a, b) => { return b.value - a.value })

  const tagNameArr = []
  const tagCountArr = []
  for (let i = 0, len = Math.min(tagArr.length, dataLength); i < len; i++) {
    tagNameArr.push(tagArr[i].name)
    tagCountArr.push(tagArr[i].value)
  }

  const tagNameArrJson = JSON.stringify(tagNameArr)
  const tagCountArrJson = JSON.stringify(tagCountArr)

  return `
  <script id="tagsChart">
    let tagsChart = echarts.init(document.getElementById('tags-chart'));
    let tagsOption = {
        title: {
            text: 'Top ${dataLength} 标签统计',
            top: -5,
            x: 'center'
        },
        tooltip: {
            formatter: "{b} : {c}"
        },
        xAxis: {
            type: 'category',
            data: ${tagNameArrJson}
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                type: 'bar',
                color: ['#82d3f4'],
                barWidth : 18,
                data: ${tagCountArrJson},
                markPoint: {
                    symbolSize: 45,
                    data: [{
                        type: 'max',
                        itemStyle: {color: ['#3ecf8e']},
                        name: '最大值'
                    }, {
                        type: 'min',
                        itemStyle: {color: ['#fa755a']},
                        name: '最小值'
                    }],
                },
                markLine: {
                    itemStyle: {color: ['#ab47bc']},
                    data: [
                        {type: 'average', name: '平均值'}
                    ]
                }
            }
        ]
    };
    tagsChart.setOption(tagsOption);
    </script>`
}

function categoriesChart () {
  const categoryArr = []
  hexo.locals.get('categories').map(function (category) {
    categoryArr.push({ name: category.name, value: category.length })
  })

  const categoryArrJson = JSON.stringify(categoryArr)

  return `
  <script id="categoriesChart">
    let categoriesChart = echarts.init(document.getElementById('categories-chart'));
    let categoriesOption = {
        title: {
            text: '',
            top: 0,
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
            {
                // name: 'Category:',
                name: '# 分类',
                type: 'pie',
                radius: '75%',
                color: ['#6772e5', '#ff9e0f', '#fa755a', '#3ecf8e', '#82d3f4', '#ab47bc', '#525f7f', '#f51c47', '#26A69A'],
                data: ${categoryArrJson},
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    categoriesChart.setOption(categoriesOption);
    </script>`
}

// Category Radar added by george16886
function categoriesRadar () {
  const categories = hexo.locals.get('categories')

  // Find the maximum and average values of the post categories.
  const radarValueArr = []
  categories.some(function (category) {
    radarValueArr.push(category.length)
  })
  const max = Math.max.apply(null, radarValueArr) + Math.min.apply(null, radarValueArr)

  // Calculate the data needed for the radar chart.
  const indicatorArr = []
  categories.map(function (category) {
    indicatorArr.push({ name: category.name, max: max })
  })

  const indicatorData = JSON.stringify(indicatorArr)
  const radarValueData = JSON.stringify(radarValueArr)

  return `
  <script id="categoriesRadar">
    let categoriesRadar = echarts.init(document.getElementById('categories-radar'));
    let categoriesRadarOption = {
        title: {
            left: 'center',
            text: '',
            textStyle: {
                fontWeight: 500,
                fontSize: 22
            }
        },
        tooltip: {},
        radar: {
            name: {
                textStyle: {
                    color: '#3C4858'
                }
            },
            indicator: ${indicatorData},
            nameGap: 5,
            center: ['50%','55%'],
            radius: '75%'
        },
        series: [{
            type: 'radar',
            color: ['#3ecf8e'],
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            data : [
                {
                    value : ${radarValueData},
                    // name : 'Categories:'
                    name: '# 文章分类'
                }
            ]
        }]
    };
    categoriesRadar.setOption(categoriesRadarOption);
    </script>`
}
