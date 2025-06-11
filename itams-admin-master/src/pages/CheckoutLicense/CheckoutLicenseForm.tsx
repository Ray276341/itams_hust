import { Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Formik, Form } from 'formik';
import { useState, useEffect } from 'react';
import InputField from '../../components/FormComponent/InputField';
import { toast } from 'react-toastify';
import { CheckoutLicense, Asset } from '../../interface/interface';
import SelectField from '../../components/FormComponent/SelectField';
import { checkoutLicense } from '../../api/license';
import { useNavigate } from 'react-router-dom';
import { getAllAssets } from '../../api/asset';
import dayjs from 'dayjs';
import DatePickerField from '../../components/FormComponent/DatePickerField';
import * as Yup from 'yup';

function CheckoutLicenseForm(props: any) {
  const { data, action } = props;
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [assets, setAssets] = useState<Asset[]>([]);
  const initialValues: CheckoutLicense = {
    licenseId: data?.id,
    assetId: 0,
    checkout_date: data?.date ?? dayjs(),
    checkout_note: '',
  };
  const validationSchema = Yup.object({
    checkout_date: Yup.date().typeError('Invalid date'),
  });
  useEffect(() => {
    const getData = async () => {
      try {
        const assets: Asset[] = await getAllAssets();
        setAssets(assets);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const handleSubmit = async (license: CheckoutLicense) => {
    setLoading(true);
    try {
      await checkoutLicense(license);
      navigate(-1);
      toast.success('Checkout successfully');
    } catch (err: any) {
      console.log('Checkout license', err);
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
                <InputField
                  id="name"
                  fieldName="License Name"
                  fullWidth
                  formik={formik}
                  value={data?.name}
                  disabled
                />
                <InputField
                  id="key"
                  fieldName="Key"
                  fullWidth
                  formik={formik}
                  value={data?.key}
                  disabled
                />
                <SelectField
                  id="assetId"
                  fieldName="Asset"
                  formik={formik}
                  data={assets}
                  required
                />
                <DatePickerField
                  id="checkout_date"
                  fieldName="Checkout Date"
                  formik={formik}
                  required
                />
                <InputField
                  id="checkout_note"
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

export default CheckoutLicenseForm;
