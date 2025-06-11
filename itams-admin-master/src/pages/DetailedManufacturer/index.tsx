import * as React from 'react';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useParams } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import AssetModelTable from '../AllAssetModels/AssetModelTable';
import LicenseTable from '../AllLicenses/LicenseTable';
import ManufacturerInfo from './ManufacturerInfo';

function DetailedManufacturer() {
  const { manufacturerId } = useParams();
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Box>
      <PageHeader name={`View manufacturer ${manufacturerId}`} canGoBack />
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
                label="Asset Models"
                value="2"
                sx={{ textTransform: 'capitalize' }}
              />
              <Tab
                label="Licenses"
                value="3"
                sx={{ textTransform: 'capitalize' }}
              />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ padding: 0 }}>
            <ManufacturerInfo manufacturerId={Number(manufacturerId)} />
          </TabPanel>
          <TabPanel value="2" sx={{ padding: 0 }}>
            <AssetModelTable manufacturerId={Number(manufacturerId)} />
          </TabPanel>
          <TabPanel value="3" sx={{ padding: 0 }}>
            <LicenseTable manufacturerId={Number(manufacturerId)} />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
}

export default DetailedManufacturer;
