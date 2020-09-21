import React, { useRef, useEffect } from 'react';
import styles from '../styles/Graphics.module.css';
import Chart from 'chart.js';

const Graphics = (props) => {
  const canvas = useRef();

  useEffect(() => {
    const ctx = canvas.current.getContext('2d');
    let datasets;
    if (!props.dataset) {
      datasets = [
        {
          data: [0, 0, 0, 0, 0, 0],
        }
      ]
    } else {
      datasets = [
        ...props.dataset
      ];
    }

    const colors = ['rgba(62, 130, 115)', 'rgba(102, 209, 188)'];
    const colorsLength = colors.length;
    datasets.forEach((data, index) => {
      data.categoryPercentage = 0.8;
      data.backgroundColor = colors[index % colorsLength];
    })

    new Chart(ctx, {
      labels: '',
      type: 'bar',
      data: {
        labels: ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'],
        datasets: [...datasets]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              max: 100,
              stepSize: 25,
              padding: 5
            },
            gridLines: {
              display: true,
              drawBorder: true,
              drawOnChartArea: false,
              zeroLineColor: 'rgb(0,0,0)',
              color: 'rgba(0, 0, 0)',
              tickMarkLength: 5
            },
            scaleLabel: {
              align: 'center'
            }
          }],
          xAxes: [{
            ticks: {
              padding: 5
            },
            gridLines: {
              display: true,
              drawBorder: true,
              drawOnChartArea: false,
              zeroLineColor: 'rgb(0,0,0)',
              color: 'rgba(0, 0, 0)',
              offsetGridLines: false,
              tickMarkLength: 5
            },
            scaleLabel: {
              align: 'center'
            }
          }]
        }
      }
    });
  }, [props.data, props.datal, props.dataset]);


  return (
    <div className={styles['graphics__container']}>
      <h2 className={styles['graphics__title']}>Stats</h2>
      <canvas ref={canvas}></canvas>
    </div>
  )
}

export default Graphics