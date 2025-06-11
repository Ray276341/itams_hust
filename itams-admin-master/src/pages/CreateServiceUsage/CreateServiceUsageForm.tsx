import * as React from "react";
import { Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import InputField from "../../components/FormComponent/InputField";
import SelectField from "../../components/FormComponent/SelectField";
import DatePickerField from "../../components/FormComponent/DatePickerField";
import { formatDate } from "../../helpers/format";
import {
  createServiceUsage,
  getServiceUsageById,
  updateServiceUsage,
} from "../../api/serviceUsage";
import { getServiceToUser } from "../../api/service";
import {
  ServiceUsage,
  NewServiceUsage,
  ServiceToUserQuery,
  ServiceToUser,
} from "../../interface/interface";
import { Actions } from "../../interface/interface";

interface CreateFormProps {
  action: Actions;
  data?: ServiceUsage;
}

export default function CreateServiceUsageForm({
  action,
  data,
}: CreateFormProps) {
  const params = useParams<{ serviceId: string; serviceUsageId?: string }>();
  const serviceId = Number(params.serviceId);
  const usageId = params.serviceUsageId && Number(params.serviceUsageId);
  const isEdit = action === Actions.UPDATE;
  const navigate = useNavigate();

  const [users, setUsers] = React.useState<{ id: number; name: string }[]>([]);
  const [loaded, setLoaded] = React.useState(false);

  const defaultValues: NewServiceUsage = {
    serviceId,
    userId: 0,
    cost: 0,
    usage_metric: "",
    usage_value: "",
    record_at: formatDate(new Date().toISOString()),
  };
  const [initialValues, setInitialValues] = React.useState<NewServiceUsage>(
    data && isEdit
      ? {
          serviceId,
          userId: data.user.id,
          cost: 0,
          usage_metric: data.usage_metric,
          usage_value: data.usage_value,
          record_at: data.record_at,
        }
      : defaultValues
  );

  React.useEffect(() => {
    (async () => {
      try {
        const query: ServiceToUserQuery = { serviceId };
        const list: ServiceToUser[] = await getServiceToUser(query);
        setUsers(
          list.map((u) => ({
            id: u.userId,
            name: u.userName,
          }))
        );
      } catch (err: any) {
        toast.error("Failed to load users");
      } finally {
        setLoaded(true);
      }
    })();
  }, [serviceId]);

  React.useEffect(() => {
    if (isEdit && !data && usageId) {
      (async () => {
        try {
          const fetched = await getServiceUsageById(usageId);
          setInitialValues({
            serviceId,
            userId: fetched.user.id,
            cost: 0,
            usage_metric: fetched.usage_metric,
            usage_value: fetched.usage_value,
            record_at: fetched.record_at,
          });
        } catch {
          toast.error("Failed to load usage record");
        }
      })();
    }
  }, [isEdit, data, usageId, serviceId]);

  if (!loaded) return null;

  const validationSchema = Yup.object({
    userId: Yup.number().required("Required"),
    usage_metric: Yup.string().required("Required"),
    usage_value: Yup.string().required("Required"),
    record_at: Yup.date().required("Required"),
  });

  const handleSubmit = async (values: NewServiceUsage) => {
    try {
      if (isEdit && data?.id) {
        await updateServiceUsage(data.id, values);
        toast.success("Updated usage record");
      } else {
        await createServiceUsage(values);
        toast.success("Created usage record");
      }
      navigate(-1);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "auto",
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
              <SelectField
                id="userId"
                fieldName="User"
                formik={formik}
                data={users}
                required
              />
              <InputField
                id="usage_metric"
                fieldName="Metric"
                formik={formik}
              />
              <InputField id="usage_value" fieldName="Value" formik={formik} />
              <DatePickerField
                id="record_at"
                fieldName="Date"
                formik={formik}
              />
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
                {isEdit ? "Save Changes" : "Create Usage"}
              </LoadingButton>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
