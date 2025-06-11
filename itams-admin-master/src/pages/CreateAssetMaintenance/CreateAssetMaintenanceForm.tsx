import { Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Formik, Form } from 'formik';
import { useState, useEffect } from 'react';
import InputField from '../../components/FormComponent/InputField';
import { toast } from 'react-toastify';
import {
  Actions,
  NewAssetMaintenance,
  Asset,
  Supplier,
} from '../../interface/interface';
import SelectField from '../../components/FormComponent/SelectField';
import { useNavigate } from 'react-router-dom';
import { getAllAssets } from '../../api/asset';
import { getAllSuppliers } from '../../api/supplier';
import {
  createNewAssetMaintenance,
  updateAssetMaintenance,
} from '../../api/assetMaintenance';
import DatePickerField from '../../components/FormComponent/DatePickerField';
import dayjs from 'dayjs';
import * as Yup from 'yup';

function CreateAssetMaintenanceForm(props: any) {
  const { data, action } = props;
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const initialValues: NewAssetMaintenance = {
    start_date: data?.start_date ?? dayjs(),
    end_date: data?.end_date ?? '',
    cost: data?.cost ?? 0,
    note: data?.note ?? '',
    assetId:
      assets.find((asset: Asset) => {
        return asset.id === data?.asset_id;
      })?.id ?? 0,
    supplierId:
      suppliers.find((supplier: Supplier) => {
        return supplier.name === data?.supplier;
      })?.id ?? 0,
  };
  const validationSchema = Yup.object({
    cost: Yup.number()
      .typeError('This value must be an number')
      .min(0, 'This value must be greater than or equal to 0'),
    start_date: Yup.date().typeError('Invalid date'),
    end_date: Yup.date().typeError('Invalid date'),
  });
  useEffect(() => {
    const getData = async () => {
      try {
        const assets: Asset[] = await getAllAssets();
        const suppliers: Supplier[] = await getAllSuppliers();
        setAssets(assets);
        setSuppliers(suppliers);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const handleSubmit = async (newAssetMaintenance: NewAssetMaintenance) => {
    setLoading(true);
    try {
      if (action === Actions.UPDATE)
        await updateAssetMaintenance(data.id, newAssetMaintenance);
      else await createNewAssetMaintenance(newAssetMaintenance);
      navigate(-1);
      toast.success(
        action === Actions.UPDATE
          ? 'Update successfully'
          : 'Create successfully',
      );
    } catch (err: any) {
      console.log('Create asset', err);
      toast.error(err.response.data.message);
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        width: { md: '1000px', xs: '100%' },
        background: '#FFF',
        borderRadius: '5px',
        py: '32px',
        margin: 'auto',
      }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange={false}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        {(formik) => {
          return (
            <Form>
              <Box sx={{ mx: '60px', mt: '20px' }}>
                <SelectField
                  id="assetId"
                  fieldName="Asset"
                  formik={formik}
                  data={assets}
                  required
                />
                <SelectField
                  id="supplierId"
                  fieldName="Supplier"
                  formik={formik}
                  data={suppliers}
                  required
                />
                <DatePickerField
                  id="start_date"
                  fieldName="Start Date"
                  formik={formik}
                  required
                />
                <DatePickerField
                  id="end_date"
                  fieldName="End Date"
                  formik={formik}
                />
                <InputField id="cost" fieldName="Cost" formik={formik} />
                <InputField
                  id="note"
                  fieldName="Note"
                  formik={formik}
                  multiline
                  fullWidth
                />
              </Box>
              <Box
                sx={{
                  mx: '60px',
                  mt: '20px',
                  display: 'flex',
                  justifyContent: 'right',
                }}
              >
                <LoadingButton
                  loading={loading}
                  type="submit"
                  sx={{
                    background: '#007aff',
                    boxShadow: '0px 8px 25px rgba(114, 56, 207, 0.15)',
                    borderRadius: '10px',
                    textTransform: 'none',
                    color: '#FFF',
                    fontWeight: 700,
                    fontSize: 14,
                    '&:hover': {
                      background: '#005eff',
                    },
                  }}
                >
                  Save
                </LoadingButton>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
}

export default CreateAssetMaintenanceForm;
