import * as React from 'react';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useParams } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import LicenseTable from '../AllLicenses/LicenseTable';
import AssetTable from '../AllAssets/AssetTable';
import SupplierInfo from './SupplierInfo';

function DetailedSupplier() {
  const { supplierId } = useParams();
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Box>
      <PageHeader name={`View Supplier ${supplierId}`} canGoBack />
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
                label="Assets"
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
            <SupplierInfo supplierId={Number(supplierId)} />
          </TabPanel>
          <TabPanel value="2" sx={{ padding: 0 }}>
            <AssetTable supplierId={Number(supplierId)} />
          </TabPanel>
          <TabPanel value="3" sx={{ padding: 0 }}>
            <LicenseTable supplierId={Number(supplierId)} />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
}

export default DetailedSupplier;
