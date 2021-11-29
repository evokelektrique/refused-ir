async function get_locale(lang) {
  const request = await fetch("/resources/data/" + lang + ".json");
  return await request.json();
}

function draw_chart(element_id, locale_tag, locale_data, data) {
  const options = {
    series: data.series,
    title: {
      text: data.title,
      align: 'center',
      style: {
        fontFamily:  "Vazir",
        color:  '#263238'
      },
    },
    dataLabels: { enabled: false },
    legend: {
      horizontalAlign: 'center',
      position: 'top',
      fontSize: '14px',
      fontFamily: 'Vazir',
      markers: {
        offsetX: 5,
      },
    },
    chart: {
      type: 'bar',
      height: 350,
      locales: [locale_data],
      defaultLocale: locale_tag,
      zoom: { enabled: false },
      toolbar: {
        show: false
      }
    },
    grid: {
      yaxis: { lines: { show: false, } },
      yaxis: { lines: { show: false, } }
    },
    theme: {
      palette: 'palette' + Math.floor(Math.random() * 10)
    },
    xaxis: {
      categories: data.categories,
      labels: {
        style: {
          fontSize: '14px',
          fontFamily: 'Vazir',
          fontWeight: "bold",
        }
      }
    },
    yaxis: {
      show: true,
      labels: {
        show: true,
        align: 'left',
        minWidth: 0,
        maxWidth: 100,
        offsetX: 20,
        offsetY: 0,
        style: {
          colors: [],
          fontSize: '14px',
          fontFamily: 'Vazir',
          fontWeight: 500,
          cssClass: 'apexcharts-yaxis-label',
        },
      },
      axisBorder: {
        show: true,
        color: 'transparent',
      },
      axisTicks: {
        show: true,
        borderType: 'solid',
        color: 'transparent',
        width: 6,
      },
      crosshairs: {
        show: true,
        position: 'back',
        stroke: {
          color: '#b6b6b6',
          width: 1,
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    tooltip: {
      custom: function({series, seriesIndex, dataPointIndex, w}) {
        return `<div class="chart_tooltip"><span>${series[seriesIndex][dataPointIndex]} ${data.tag}</span></div>`;
      }
    }
  };

  const chart = new ApexCharts(document.querySelector(element_id), options);
  chart.render();
}

(async function() {
  const locale_data = await get_locale("fa");
  const locale_tag = "fa";
  const data = {
    chart_one: {
      id: "#chart-1",
      title: "گزارش  سرعت لود از سایتی که حاوی تبلیغات است",
      series: [
        {data: [9.08, 5.79]}
      ],
      categories: [
        ['غیر فعال'],
        ['فعال'],
      ],
      tag: "ثانیه"
    },
    chart_two: {
      id: "#chart-2",
      title: "گزارش تعداد درخواست ها از سایتی که حاوی تبلیغات است",
      series: [
        {data: [89, 44]}
      ],
      categories: [
        ['فعال'],
        ['غیر فعال'],
      ],
      tag: "درخواست"
    },
    chart_three: {
      id: "#chart-3",
      title: "گزارش مصرف حجم از  سایتی که حاوی تبلیغات است",
      series: [
        {data: [2.2, 1]}
      ],
      categories: [
        ['فعال'],
        ['غیر فعال'],
      ],
      tag: "مگابایت"
    },
  };

  draw_chart(data.chart_one.id, locale_tag, locale_data, data.chart_one);
  draw_chart(data.chart_two.id, locale_tag, locale_data, data.chart_two);
  draw_chart(data.chart_three.id, locale_tag, locale_data, data.chart_three);
})();


