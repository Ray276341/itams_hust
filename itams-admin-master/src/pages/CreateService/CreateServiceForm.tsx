import { Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Formik, Form } from "formik";
import { useState, useEffect } from "react";
import InputField from "../../components/FormComponent/InputField";
import { toast } from "react-toastify";
import {
  Actions,
  NewService,
  ServiceType,
  Category,
  Manufacturer,
  Supplier,
  Status,
} from "../../interface/interface";
import { getAllSuppliers } from "../../api/supplier";
import { getAllServiceTypes } from "../../api/serviceType";
import SelectField from "../../components/FormComponent/SelectField";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../../api/category";
import { getAllManufacturers } from "../../api/manufacturer";
import { createNewService, updateService } from "../../api/service";
import DatePickerField from "../../components/FormComponent/DatePickerField";
import dayjs from "dayjs";
import { useAuthContext } from "../../context/AuthContext";
import * as Yup from "yup";
import { getAllStatuses } from "../../api/status";

function CreateServiceForm(props: any) {
  const { data, action } = props;
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const { getNotifications } = useAuthContext();
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const initialValues: NewService = {
    name: data?.name ?? "",
    description: data?.description ?? "",
    unit: data?.unit ?? "",
    statusId:
      statuses.find((status: Status) => {
        return status.name === data?.status;
      })?.id ?? 0,
    serviceTypeId:
      serviceTypes.find((serviceType: ServiceType) => {
        return serviceType.name === data?.service_type;
      })?.id ?? 0,
    categoryId:
      categories.find((category: Category) => {
        return category.name === data?.category;
      })?.id ?? 0,
    manufacturerId:
      manufacturers.find((manufacturer: Manufacturer) => {
        return manufacturer.name === data?.manufacturer;
      })?.id ?? 0,
    supplierId:
      suppliers.find((supplier: Supplier) => {
        return supplier.name === data?.supplier;
      })?.id ?? 0,
  };
  const validationSchema = Yup.object({});
  useEffect(() => {
    const getData = async () => {
      try {
        const statuses: Status[] = await getAllStatuses();
        const serviceTypes: ServiceType[] = await getAllServiceTypes();
        const categories: Category[] = await getAllCategories();
        const manufacturers: Manufacturer[] = await getAllManufacturers();
        const suppliers: Supplier[] = await getAllSuppliers();
        setStatuses(statuses);
        setServiceTypes(serviceTypes);
        setCategories(categories);
        setManufacturers(manufacturers);
        setSuppliers(suppliers);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const handleSubmit = async (newService: NewService) => {
    setLoading(true);
    try {
      if (action === Actions.UPDATE) await updateService(data.id, newService);
      else await createNewService(newService);
      await getNotifications();
      navigate(-1);
      toast.success(
        action === Actions.UPDATE
          ? "Update successfully"
          : "Create successfully"
      );
    } catch (err: any) {
      console.log("Create asset", err);
      toast.error(err.response.data.message);
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        width: { md: "1000px", xs: "100%" },
        background: "#FFF",
        borderRadius: "5px",
        py: "32px",
        margin: "auto",
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
              <Box sx={{ mx: "60px", mt: "20px" }}>
                <InputField
                  id="name"
                  fieldName="Name"
                  fullWidth
                  formik={formik}
                  required
                />
                <InputField
                  id="unit"
                  fieldName="Unit"
                  fullWidth
                  formik={formik}
                  required
                />

                <InputField
                  id="description"
                  fieldName="Description"
                  fullWidth
                  formik={formik}
                />
                <SelectField
                  id="statusId"
                  fieldName="Status"
                  formik={formik}
                  data={statuses}
                  required
                />

                <SelectField
                  id="serviceTypeId"
                  fieldName="Service Type"
                  formik={formik}
                  data={serviceTypes}
                  required
                />
                <SelectField
                  id="categoryId"
                  fieldName="Category"
                  formik={formik}
                  data={categories}
                  required
                />
                <SelectField
                  id="manufacturerId"
                  fieldName="Manufacturer"
                  formik={formik}
                  data={manufacturers}
                  required
                />
                <SelectField
                  id="supplierId"
                  fieldName="Supplier"
                  formik={formik}
                  data={suppliers}
                  required
                />
              </Box>
              <Box
                sx={{
                  mx: "60px",
                  mt: "20px",
                  display: "flex",
                  justifyContent: "right",
                }}
              >
                <LoadingButton
                  loading={loading}
                  type="submit"
                  sx={{
                    background: "#007aff",
                    boxShadow: "0px 8px 25px rgba(114, 56, 207, 0.15)",
                    borderRadius: "10px",
                    textTransform: "none",
                    color: "#FFF",
                    fontWeight: 700,
                    fontSize: 14,
                    "&:hover": {
                      background: "#005eff",
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

export default CreateServiceForm;
