import { Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Formik, Form } from "formik";
import { useState } from "react";
import InputField from "../../components/FormComponent/InputField";
import { toast } from "react-toastify";
import { Actions, NewRelationship } from "../../interface/interface";
import { useNavigate } from "react-router-dom";
import {
  createNewRelationship,
  updateRelationship,
} from "../../api/relationship";

function CreateRelationshipForm(props: any) {
  const { data, action } = props;
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const initialValues: NewRelationship = {
    name: data?.name ?? "",
  };

  const handleSubmit = async (newRelationship: NewRelationship) => {
    setLoading(true);
    try {
      if (action === Actions.UPDATE)
        await updateRelationship(data.id, newRelationship);
      else await createNewRelationship(newRelationship);
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

export default CreateRelationshipForm;
