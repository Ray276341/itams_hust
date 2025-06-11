import * as React from "react";
import { Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import InputField from "../../components/FormComponent/InputField";
import DatePickerField from "../../components/FormComponent/DatePickerField";
import SelectField from "../../components/FormComponent/SelectField";
import { formatDate } from "../../helpers/format";
import { ServicePrice, ServicePriceDto } from "../../interface/interface";
import {
  createServicePrice,
  getServicePriceById,
  updateServicePrice,
} from "../../api/service";

interface RouteParams {
  serviceId: string;
  servicePriceId?: string;
}

type FormValues = Omit<ServicePriceDto, "servicePriceId"> & {
  serviceId: number;
};

const validationSchema = Yup.object({
  purchase_cost: Yup.number().min(0, "Must be ≥ 0").required(),
  purchase_date: Yup.date().required("Required"),
  expiration_date: Yup.date().required("Required"),
  unit_price: Yup.number().min(0, "Must be ≥ 0").required(),
  pricing_model: Yup.string().required("Required"),
});

export default function CreateServicePriceForm(props: any) {
  const params = useParams();
  const serviceId = Number((params as any).serviceId);
  const servicePriceId = (params as any).servicePriceId;

  const navigate = useNavigate();
  const isEdit = Boolean(servicePriceId);
  const [initialValues, setInitialValues] = React.useState<FormValues>({
    serviceId: Number(serviceId),
    purchase_cost: 0,
    purchase_date: new Date().toISOString(),
    expiration_date: new Date().toISOString(),
    pricing_model: "",
    unit_price: 0,
    description: "",
  });

  React.useEffect(() => {
    if (isEdit) {
      (async () => {
        try {
          const data: ServicePrice = await getServicePriceById(
            Number(servicePriceId)
          );
          setInitialValues({
            serviceId: data.service.id,
            purchase_cost: data.purchase_cost,
            purchase_date: formatDate(data.purchase_date),
            expiration_date: formatDate(data.expiration_date),
            pricing_model: data.pricing_model,
            unit: data.unit,
            unit_price: data.unit_price,
            description: data.description || "",
          });
        } catch (err) {
          toast.error("Failed to load price record");
        }
      })();
    }
  }, [isEdit, servicePriceId]);

  const handleSubmit = async (values: FormValues) => {
    try {
      if (isEdit) {
        await updateServicePrice({
          servicePriceId: Number(servicePriceId),
          ...values,
        });
        toast.success("Updated price record");
      } else {
        await createServicePrice(values);
        toast.success("Created price record");
      }
      navigate(-1);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error");
    }
  };

  return (
    <Box
      sx={{
        width: { md: "600px", xs: "100%" },
        mx: "auto",
        mt: 4,
        p: 3,
        bgcolor: "#FFF",
        borderRadius: 1,
      }}
    >
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <InputField
                id="purchase_cost"
                fieldName="Purchase Cost"
                formik={formik}
              />
              <DatePickerField
                id="purchase_date"
                fieldName="Purchase Date"
                formik={formik}
              />
              <DatePickerField
                id="expiration_date"
                fieldName="Expiration Date"
                formik={formik}
              />
              <InputField
                id="pricing_model"
                fieldName="Pricing Model"
                formik={formik}
              />
              <InputField
                id="unit_price"
                fieldName="Unit Price"
                formik={formik}
              />
              <InputField
                id="description"
                fieldName="Description"
                formik={formik}
                multiline
                rows={3}
              />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
              <LoadingButton
                variant="contained"
                type="submit"
                loading={formik.isSubmitting}
                sx={{
                  background: "#007aff",
                  borderRadius: "5px",
                  textTransform: "none",
                  color: "#FFF",
                  fontWeight: 700,
                  fontSize: 14,
                  "&:hover": { background: "#005eff" },
                }}
              >
                {isEdit ? "Save Changes" : "Create Price"}
              </LoadingButton>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
