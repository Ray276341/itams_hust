import { Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Formik, Form } from "formik";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { AcceptRequestService, Service } from "../../interface/interface";
import SelectField from "../../components/FormComponent/SelectField";
import { useNavigate } from "react-router-dom";
import { getServicesByCategory, acceptRequest } from "../../api/service";

function AcceptRequestForm(props: any) {
  const { data, action } = props;
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [services, setServices] = useState<Service[]>([]);
  const initialValues: AcceptRequestService = {
    id: data?.id ?? "",
    serviceId: data?.serviceId ?? "",
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const services: Service[] = await getServicesByCategory(
          data?.categoryId
        );
        setServices(services);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const handleSubmit = async (data: AcceptRequestService) => {
    setLoading(true);
    try {
      await acceptRequest(data);
      navigate(-1);
      toast.success("Accept successfully");
    } catch (err: any) {
      console.log("Accept request", err);
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
                  id="serviceId"
                  fieldName="Service"
                  formik={formik}
                  data={services}
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

export default AcceptRequestForm;
