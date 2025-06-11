import { Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Formik, Form } from "formik";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  Actions,
  Category,
  NewRequestService,
} from "../../interface/interface";
import SelectField from "../../components/FormComponent/SelectField";
import {
  createNewRequestService,
  updateRequestService,
} from "../../api/service";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../../api/category";
import InputField from "../../components/FormComponent/InputField";

function CreateServiceForm(props: any) {
  const { data, action } = props;
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [category, setCategories] = useState<Category[]>([]);
  const initialValues: NewRequestService = {
    categoryId:
      category.find((category: Category) => {
        return category.name === data?.category;
      })?.id ?? 0,
    note: "",
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const category: Category[] = await getAllCategories();
        setCategories(category);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const handleSubmit = async (newRequestService: NewRequestService) => {
    setLoading(true);
    try {
      if (action === Actions.UPDATE)
        await updateRequestService(data.id, newRequestService);
      else await createNewRequestService(newRequestService);
      navigate(-1);
      toast.success(
        action === Actions.UPDATE
          ? "Update successfully"
          : "Create successfully"
      );
    } catch (err: any) {
      console.log("Create service", err);
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
                <SelectField
                  id="categoryId"
                  fieldName="Category"
                  formik={formik}
                  data={category}
                  required
                />
                <InputField
                  id="note"
                  fieldName="Note"
                  formik={formik}
                  multiline
                  fullWidth
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
