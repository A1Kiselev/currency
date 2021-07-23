import {Line} from 'react-chartjs-2';
import moment from "moment";

const options = {
  yAxes: [
    {
      display:  true,
      position: 'left',
      id:       'y-axis-1',
    },
  ],
};

const datasets = [
  {
    label:           '',
    data:            [],
    fill:            false,
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor:     'rgba(255, 99, 132, 0.2)',
    yAxisID:         'y-axis-1',
  },
];

const Chart = ({currency, currencyKey}) => {
  const labels = currency.map(el => moment(el.Date).format('DD/MM/YYYY')) || [];

  datasets[0].data = currency.map(el => Number.parseFloat((el.Cur_OfficialRate)))
  datasets[0].label = currencyKey

  const data = {
    labels,
    datasets,
  }

  return (
    <div className='chart-wrapper'>
      <Line data={data} options={options}/>
    </div>
  )
}

export default Chart;
