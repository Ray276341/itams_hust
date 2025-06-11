import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
  Chart,
  PieSeries,
  Title,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

const Root = (props: any) => (
  <Legend.Root
    {...props}
    sx={{
      display: 'flex',
      margin: 'auto',
      flexDirection: 'row',
      flexWrap: 'wrap',
    }}
  />
);
const Item = (props: any) => (
  <Legend.Item sx={{ maxWidth: '120px' }} {...props} />
);
const Label = (props: any) => (
  <Legend.Label {...props} sx={{ whiteSpace: 'wrap' }} />
);

export default function PieChart(props: any) {
  const { data } = props;
  return (
    <Paper sx={{ minWidth: { md: '35vw' } }}>
      <Chart data={data}>
        <PieSeries valueField="area" argumentField="country" />
        <Title text="Assets By Status" />
        <Legend
          position="bottom"
          rootComponent={Root}
          itemComponent={Item}
          labelComponent={Label}
        />
        <Animation />
      </Chart>
    </Paper>
  );
}
