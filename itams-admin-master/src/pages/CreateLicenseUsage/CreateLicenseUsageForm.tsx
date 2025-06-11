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
  createLicenseUsage,
  getLicenseUsageById,
  updateLicenseUsage,
} from "../../api/licenseUsage";
import { getLicenseToAsset } from "../../api/license";
import {
  LicenseUsage,
  NewLicenseUsage,
  LicenseToAssetQuery,
  LicenseToAsset,
} from "../../interface/interface";
import { Actions } from "../../interface/interface";

interface CreateFormProps {
  action: Actions;
  data?: LicenseUsage;
}

export default function CreateLicenseUsageForm({
  action,
  data,
}: CreateFormProps) {
  const params = useParams<{ licenseId: string; licenseUsageId?: string }>();
  const licenseId = Number(params.licenseId);
  const usageId = params.licenseUsageId && Number(params.licenseUsageId);
  const isEdit = action === Actions.UPDATE;
  const navigate = useNavigate();

  const [assets, setAssets] = React.useState<{ id: number; name: string }[]>(
    []
  );
  const [loaded, setLoaded] = React.useState(false);

  const defaultValues: NewLicenseUsage = {
    licenseId,
    assetId: 0,
    cost: 0,
    usage_metric: "",
    usage_value: "",
    record_at: formatDate(new Date().toISOString()),
  };
  const [initialValues, setInitialValues] = React.useState<NewLicenseUsage>(
    data && isEdit
      ? {
          licenseId,
          assetId: data.asset.id,
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
        const query: LicenseToAssetQuery = { licenseId };
        const list: LicenseToAsset[] = await getLicenseToAsset(query);
        setAssets(
          list.map((u) => ({
            id: u.assetId,
            name: u.assetName,
          }))
        );
      } catch (err: any) {
        toast.error("Failed to load assets");
      } finally {
        setLoaded(true);
      }
    })();
  }, [licenseId]);

  React.useEffect(() => {
    if (isEdit && !data && usageId) {
      (async () => {
        try {
          const fetched = await getLicenseUsageById(usageId);
          setInitialValues({
            licenseId,
            assetId: fetched.asset.id,
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
  }, [isEdit, data, usageId, licenseId]);

  if (!loaded) return null;

  const validationSchema = Yup.object({
    assetId: Yup.number().required("Required"),
    usage_metric: Yup.string().required("Required"),
    usage_value: Yup.string().required("Required"),
    record_at: Yup.date().required("Required"),
  });

  const handleSubmit = async (values: NewLicenseUsage) => {
    try {
      if (isEdit && data?.id) {
        await updateLicenseUsage(data.id, values);
        toast.success("Updated usage record");
      } else {
        await createLicenseUsage(values);
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
                id="assetId"
                fieldName="Asset"
                formik={formik}
                data={assets}
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
