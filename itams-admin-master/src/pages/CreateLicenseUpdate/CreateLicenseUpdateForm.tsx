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
import { LicenseUpdate, NewLicenseUpdate } from "../../interface/interface";
import { Actions } from "../../interface/interface";
import {
  createNewLicenseUpdate,
  getLicenseUpdateById,
  updateLicenseUpdate,
} from "../../api/licenseUpdate";

interface CreateFormProps {
  action: Actions;
  data?: LicenseUpdate;
}

export default function CreateLicenseUpdateForm({
  action,
  data,
}: CreateFormProps) {
  const params = useParams();
  const licenseId = Number(params.licenseId);
  const licenseUpdateId = params.licenseUpdateId;
  const isEdit = action === Actions.UPDATE;
  const navigate = useNavigate();

  const defaultValues: NewLicenseUpdate = {
    licenseId,
    version: "",
    release_date: formatDate(new Date().toISOString()),
    note: "",
  };

  const [initialValues, setInitialValues] = React.useState<NewLicenseUpdate>(
    data && isEdit
      ? {
          licenseId: data.licenseId,
          version: data.version,
          release_date: data.release_date || defaultValues.release_date,
          note: data.note || "",
        }
      : defaultValues
  );

  React.useEffect(() => {
    if (isEdit && !data && licenseUpdateId) {
      (async () => {
        try {
          const fetched = await getLicenseUpdateById(Number(licenseUpdateId));
          setInitialValues({
            licenseId: fetched.licenseId,
            version: fetched.version,
            release_date: fetched.release_date || defaultValues.release_date,
            note: fetched.note || "",
          });
        } catch {
          toast.error("Failed to load license update record");
        }
      })();
    }
  }, [isEdit, data, licenseUpdateId]);

  const validationSchema = Yup.object({
    version: Yup.string().required("Required"),
    release_date: Yup.date().required("Required"),
  });

  const handleSubmit = async (values: NewLicenseUpdate) => {
    try {
      if (isEdit && data?.id) {
        await updateLicenseUpdate(data.id, values);
        toast.success("Updated license update record");
      } else {
        await createNewLicenseUpdate(values);
        toast.success("Created license update record");
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
