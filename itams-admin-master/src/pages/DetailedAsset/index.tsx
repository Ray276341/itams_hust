import * as React from 'react';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useParams } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import AssetMaintenanceTable from '../AllAssetMaintenances/AssetMaintenanceTable';
import AssetHistoryTable from './AssetHistoryTable';
import AssetInfo from './AssetInfo';

function DetailedAsset() {
  const { assetId } = useParams();
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Box>
      <PageHeader name={`View Asset ${assetId}`} canGoBack />
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              backgroundColor: '#FFF',
            }}
          >
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab
                label="Info"
                value="1"
                sx={{ textTransform: 'capitalize' }}
              />
              <Tab
                label="Maintenances"
                value="2"
                sx={{ textTransform: 'capitalize' }}
              />
              <Tab
                label="History"
                value="3"
                sx={{ textTransform: 'capitalize' }}
              />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ padding: 0 }}>
            <AssetInfo assetId={Number(assetId)} />
          </TabPanel>
          <TabPanel value="2" sx={{ padding: 0 }}>
            <AssetMaintenanceTable assetId={Number(assetId)} />
          </TabPanel>
          <TabPanel value="3" sx={{ padding: 0 }}>
            <AssetHistoryTable assetId={Number(assetId)} />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
}

export default DetailedAsset;
