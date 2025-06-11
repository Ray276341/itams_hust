import * as React from "react";
import { Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import InputField from "../../components/FormComponent/InputField";
import DatePickerField from "../../components/FormComponent/DatePickerField";
import { formatDate } from "../../helpers/format";
import { ServiceUpdate, NewServiceUpdate } from "../../interface/interface";
import { Actions } from "../../interface/interface";
import {
  createNewServiceUpdate,
  getServiceUpdateById,
  updateServiceUpdate,
} from "../../api/serviceUpdate";

interface CreateFormProps {
  action: Actions;
  data?: ServiceUpdate;
}

export default function CreateServiceUpdateForm({
  action,
  data,
}: CreateFormProps) {
  const params = useParams();
  const serviceId = Number(params.serviceId);
  const serviceUpdateId = params.serviceUpdateId;
  const isEdit = action === Actions.UPDATE;
  const navigate = useNavigate();

  const defaultValues: NewServiceUpdate = {
    serviceId,
    version: "",
    release_date: formatDate(new Date().toISOString()),
    note: "",
  };

  const [initialValues, setInitialValues] = React.useState<NewServiceUpdate>(
    data && isEdit
      ? {
          serviceId: data.serviceId,
          version: data.version,
          release_date: data.release_date || defaultValues.release_date,
          note: data.note || "",
        }
      : defaultValues
  );

  React.useEffect(() => {
    if (isEdit && !data && serviceUpdateId) {
      (async () => {
        try {
          const fetched = await getServiceUpdateById(Number(serviceUpdateId));
          setInitialValues({
            serviceId: fetched.serviceId,
            version: fetched.version,
            release_date: fetched.release_date || defaultValues.release_date,
            note: fetched.note || "",
          });
        } catch {
          toast.error("Failed to load service update record");
        }
      })();
    }
  }, [isEdit, data, serviceUpdateId]);

  const validationSchema = Yup.object({
    version: Yup.string().required("Required"),
    release_date: Yup.date().required("Required"),
  });

  const handleSubmit = async (values: NewServiceUpdate) => {
    try {
      if (isEdit && data?.id) {
        await updateServiceUpdate(data.id, values);
        toast.success("Updated service update record");
      } else {
        await createNewServiceUpdate(values);
        toast.success("Created service update record");
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
              <InputField id="version" fieldName="Version" formik={formik} />
              <DatePickerField
                id="release_date"
                fieldName="Release Date"
                formik={formik}
              />
              <InputField
                id="note"
                fieldName="Note"
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
                {isEdit ? "Save Changes" : "Create Update"}
              </LoadingButton>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
