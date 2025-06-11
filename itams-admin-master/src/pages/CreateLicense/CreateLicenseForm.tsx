import { Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Formik, Form } from "formik";
import { useState, useEffect } from "react";
import InputField from "../../components/FormComponent/InputField";
import { toast } from "react-toastify";
import {
  Actions,
  NewLicense,
  Category,
  Manufacturer,
  Supplier,
  Status,
} from "../../interface/interface";
import { getAllSuppliers } from "../../api/supplier";
import SelectField from "../../components/FormComponent/SelectField";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../../api/category";
import { getAllManufacturers } from "../../api/manufacturer";
import { createNewLicense, updateLicense } from "../../api/license";
import DatePickerField from "../../components/FormComponent/DatePickerField";
import dayjs from "dayjs";
import { useAuthContext } from "../../context/AuthContext";
import * as Yup from "yup";
import { getAllStatuses } from "../../api/status";

function CreateLicenseForm(props: any) {
  const { data, action } = props;
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const { getNotifications } = useAuthContext();
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const initialValues: NewLicense = {
    name: data?.name ?? "",
    key: data?.key ?? "",
    license_link: data?.license_link ?? "",
    description: data?.description ?? "",
    purchase_cost: data?.purchase_cost ?? 0,
    purchase_date: data?.purchase_date ?? dayjs(),
    expiration_date: data?.expiration_date ?? dayjs(),
    seats: data?.seats ?? 0,
    statusId:
      statuses.find((status: Status) => {
        return status.name === data?.status;
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
  const validationSchema = Yup.object({
    purchase_cost: Yup.number()
      .typeError("This value must be a number")
      .min(0, "This value must be greater than or equal to 0"),
    purchase_date: Yup.date().typeError("Invalid date"),
    expiration_date: Yup.date().typeError("Invalid date"),
    seats: Yup.number()
      .typeError("This value must be a number")
      .integer()
      .typeError("This value must be an integer")
      .min(0, "This value must be greater than or equal to 0"),
  });
  useEffect(() => {
    const getData = async () => {
      try {
        const statuses: Status[] = await getAllStatuses();
        const categories: Category[] = await getAllCategories();
        const manufacturers: Manufacturer[] = await getAllManufacturers();
        const suppliers: Supplier[] = await getAllSuppliers();
        setStatuses(statuses);
        setCategories(categories);
        setManufacturers(manufacturers);
        setSuppliers(suppliers);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const handleSubmit = async (newLicense: NewLicense) => {
    setLoading(true);
    try {
      if (action === Actions.UPDATE) await updateLicense(data.id, newLicense);
      else await createNewLicense(newLicense);
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
                  id="key"
                  fieldName="Key"
                  fullWidth
                  formik={formik}
                />
                <InputField
                  id="license_link"
                  fieldName="License Link"
                  fullWidth
                  formik={formik}
                />
                <InputField
                  id="description"
                  fieldName="Description"
                  fullWidth
                  formik={formik}
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
                <DatePickerField
                  id="expiration_date"
                  fieldName="Expiration Date"
                  formik={formik}
                  required
                />
                <InputField
                  id="seats"
                  fieldName="Seats"
                  fullWidth
                  formik={formik}
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

export default CreateLicenseForm;
