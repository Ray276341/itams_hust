import { Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Formik, Form } from 'formik';
import { useState, useEffect } from 'react';
import InputField from '../../components/FormComponent/InputField';
import { toast } from 'react-toastify';
import {
  Actions,
  AssetModel,
  Department,
  NewAsset,
  Status,
  Supplier,
} from '../../interface/interface';
import { getAllSuppliers } from '../../api/supplier';
import SelectField from '../../components/FormComponent/SelectField';
import { createNewAsset, updateAsset, saveImage } from '../../api/asset';
import { useNavigate } from 'react-router-dom';
import { getAllAssetModels } from '../../api/assetModel';
import { getAllDepartments } from '../../api/department';
import { getAllStatuses } from '../../api/status';
import dayjs from 'dayjs';
import DatePickerField from '../../components/FormComponent/DatePickerField';
import { useAuthContext } from '../../context/AuthContext';
import { ImageListType } from 'react-images-uploading';
import { UploadImage } from '../../components/FormComponent/UploadImage';
import * as Yup from 'yup';

function CreateAssetForm(props: any) {
  const { data, action } = props;
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const { getNotifications } = useAuthContext();
  const [assetModels, setAssetModels] = useState<AssetModel[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [image, setImage] = useState<ImageListType>([]);
  const onImageChange = async (imageList: ImageListType) => {
    setImage(imageList);
  };
  const initialValues: NewAsset = {
    name: data?.name ?? '',
    purchase_cost: data?.purchase_cost ?? 0,
    purchase_date: data?.purchase_date ?? dayjs(),
    assetModelId:
      assetModels.find((assetModel: AssetModel) => {
        return assetModel.name === data?.assetModel;
      })?.id ?? 0,
    departmentId:
      departments.find((department: Department) => {
        return department.name === data?.department;
      })?.id ?? 0,
    statusId:
      statuses.find((status: Status) => {
        return status.name === data?.status;
      })?.id ?? 0,
    supplierId:
      suppliers.find((supplier: Supplier) => {
        return supplier.name === data?.supplier;
      })?.id ?? 0,
  };
  const validationSchema = Yup.object({
    purchase_cost: Yup.number()
      .typeError('This value must be an number')
      .min(0, 'This value must be greater than or equal to 0'),
    purchase_date: Yup.date().typeError('Invalid date'),
  });
  useEffect(() => {
    const getData = async () => {
      try {
        const assetModels: AssetModel[] = await getAllAssetModels();
        const departments: Department[] = await getAllDepartments();
        const statuses: Status[] = await getAllStatuses();
        const suppliers: Supplier[] = await getAllSuppliers();
        setAssetModels(assetModels);
        setDepartments(departments);
        setStatuses(statuses);
        setSuppliers(suppliers);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const handleSubmit = async (newAsset: NewAsset) => {
    setLoading(true);
    try {
      if (action === Actions.UPDATE) await updateAsset(data.id, newAsset);
      else await createNewAsset(newAsset);
      if (image.length > 0) await saveImage(data.id, image[0].file);
      await getNotifications();
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
        enableReinitialize={action === Actions.UPDATE ? true : false}
        onSubmit={handleSubmit}
      >
        {(formik) => {
          return (
            <Form>
              <Box sx={{ mx: '60px', mt: '20px' }}>
                <InputField
                  id="name"
                  fieldName="Name"
                  fullWidth
                  formik={formik}
                  required
                />
                <InputField
                  id="purchase_cost"
                  fieldName="Purchase cost"
                  formik={formik}
                  required
                />
                <DatePickerField
                  id="purchase_date"
                  fieldName="Purchase Date"
                  formik={formik}
                  required
                />
                <SelectField
                  id="assetModelId"
                  fieldName="Asset Model"
                  formik={formik}
                  data={assetModels}
                  required
                />
                <SelectField
                  id="departmentId"
                  fieldName="Department"
                  formik={formik}
                  data={departments}
                  required
                />
                <SelectField
                  id="statusId"
                  fieldName="Status"
                  formik={formik}
                  data={statuses}
                  required
                />
                <SelectField
                  id="supplierId"
                  fieldName="Supplier"
                  formik={formik}
                  data={suppliers}
                  required
                />
                <UploadImage image={image} onImageChange={onImageChange} />
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

export default CreateAssetForm;
