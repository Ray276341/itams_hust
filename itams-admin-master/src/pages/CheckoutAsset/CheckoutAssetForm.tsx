import { Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Formik, Form } from 'formik';
import { useState, useEffect } from 'react';
import InputField from '../../components/FormComponent/InputField';
import { toast } from 'react-toastify';
import {
  Actions,
  AssetModel,
  CheckoutAsset,
  Status,
  Supplier,
  User,
} from '../../interface/interface';
import { getAllSuppliers } from '../../api/supplier';
import SelectField from '../../components/FormComponent/SelectField';
import { checkoutAsset, createNewAsset, updateAsset } from '../../api/asset';
import { useNavigate } from 'react-router-dom';
import { getAllAssetModels } from '../../api/assetModel';
import { getAllUsers } from '../../api/user';
import { getAllStatuses } from '../../api/status';
import dayjs from 'dayjs';
import DatePickerField from '../../components/FormComponent/DatePickerField';

function CheckoutAssetForm(props: any) {
  const { data, action } = props;
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const initialValues: CheckoutAsset = {
    assetId: data?.id,
    userId: 0,
    statusId:
      statuses.find((status: Status) => {
        return status.name === data?.status;
      })?.id ?? 0,
    checkout_date: data?.date ?? dayjs(),
    checkout_note: '',
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const users: User[] = await getAllUsers();
        const statuses: Status[] = await getAllStatuses();
        setUsers(users);
        setStatuses(statuses);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const handleSubmit = async (asset: CheckoutAsset) => {
    setLoading(true);
    try {
      await checkoutAsset(asset);
      navigate(-1);
      toast.success('Checkout successfully');
    } catch (err: any) {
      console.log('Checkout asset', err);
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
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        {(formik) => {
          return (
            <Form>
              <Box sx={{ mx: '60px', mt: '20px' }}>
                <InputField
                  id="name"
                  fieldName="Asset Name"
                  fullWidth
                  formik={formik}
                  value={data?.name}
                  disabled
                />
                <SelectField
                  id="statusId"
                  fieldName="Status"
                  formik={formik}
                  data={statuses}
                  required
                />
                <SelectField
                  id="userId"
                  fieldName="User"
                  formik={formik}
                  data={users}
                  required
                />
                <DatePickerField
                  id="checkout_date"
                  fieldName="Checkout Date"
                  formik={formik}
                  required
                />
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

export default CheckoutAssetForm;
