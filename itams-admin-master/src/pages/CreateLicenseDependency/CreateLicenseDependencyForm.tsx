import * as React from "react";
import { Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../../components/FormComponent/InputField";
import SelectField from "../../components/FormComponent/SelectField";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { getAllRelationships } from "../../api/relationship";
import { getAllLicenses } from "../../api/license";
import {
  createNewLicenseDependency,
  updateLicenseDependency,
} from "../../api/licenseDependency";
import {
  LicenseDependency,
  NewLicenseDependency,
  License,
  Relationship,
} from "../../interface/interface";

const validationSchema = Yup.object({
  licenseId: Yup.number().required("Required"),
  dependencyId: Yup.number().required("Required"),
  relationshipId: Yup.number().required("Required"),
  note: Yup.string(),
});

interface FormValues {
  licenseId: number;
  dependencyId: number;
  relationshipId: number;
  note: string;
}

export default function CreateLicenseDependencyForm({
  action,
  data,
}: {
  action: string;
  data?: LicenseDependency & { direction?: "outgoing" | "incoming" };
}) {
  const { licenseId: paramId } = useParams<{ licenseId: string }>();
  const direction = data?.direction as "outgoing" | "incoming";
  const defaultLicenseId = Number(paramId);
  const navigate = useNavigate();

  const [licenses, setLicenses] = React.useState<
    { id: number; name: string }[]
  >([]);
  const [relationships, setRelationships] = React.useState<
    { id: number; name: string }[]
  >([]);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    async function load() {
      try {
        const svcs: License[] = await getAllLicenses();
        const rels: Relationship[] = await getAllRelationships();
        setLicenses(svcs.map((s) => ({ id: s.id, name: s.name })));
        setRelationships(rels.map((r) => ({ id: r.id, name: r.name })));
      } catch (err: any) {
        toast.error("Failed to load form options");
      } finally {
        setLoaded(true);
      }
    }
    load();
  }, []);

  if (!loaded) {
    return null;
  }

  const initialValues: FormValues = {
    licenseId:
      action === "UPDATE"
        ? data!.licenseId
        : direction === "outgoing"
        ? defaultLicenseId
        : 0,
    dependencyId:
      action === "UPDATE"
        ? data!.dependencyId
        : direction === "incoming"
        ? defaultLicenseId
        : 0,
    relationshipId: action === "UPDATE" ? data!.relationshipId : 0,
    note: action === "UPDATE" ? data!.note || "" : "",
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      const payload: NewLicenseDependency = {
        licenseId: values.licenseId,
        dependencyId: values.dependencyId,
        relationshipId: values.relationshipId,
        note: values.note,
      };
      if (action === "UPDATE" && data) {
        await updateLicenseDependency(data.id, payload);
        toast.success("Updated successfully");
      } else {
        await createNewLicenseDependency(payload);
        toast.success("Created successfully");
      }
      navigate(-1);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error");
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", p: 2, background: "#FFF" }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <SelectField
                id="licenseId"
                fieldName="License"
                formik={formik}
                data={licenses}
                disabled={direction === "outgoing" || action === "UPDATE"}
                required
              />

              <SelectField
                id="dependencyId"
                fieldName="Depends On"
                formik={formik}
                data={licenses}
                disabled={direction === "incoming" || action === "UPDATE"}
                required
              />

              <SelectField
                id="relationshipId"
                fieldName="Relationship"
                formik={formik}
                data={relationships}
                required
              />

              <InputField
                id="note"
                fieldName="Note"
                formik={formik}
                fullWidth
              />

              <LoadingButton
                loading={formik.isSubmitting}
                type="submit"
                variant="contained"
                sx={{ mt: 2, textTransform: "none" }}
              >
                Save
              </LoadingButton>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
