import { Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Formik, Form } from "formik";
import { useState } from "react";
import InputField from "../../components/FormComponent/InputField";
import { toast } from "react-toastify";
import { CheckinService, User } from "../../interface/interface";
import { checkinService } from "../../api/service";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import DatePickerField from "../../components/FormComponent/DatePickerField";
import * as Yup from "yup";

function CheckinServiceForm(props: any) {
  const { data, action } = props;
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const initialValues: CheckinService = {
    serviceToUserId: data?.id,
    checkin_date: data?.date ?? dayjs(),
    checkin_note: "",
  };
  const validationSchema = Yup.object({
    Checkin_date: Yup.date().typeError("Invalid date"),
  });

  const handleSubmit = async (service: CheckinService) => {
    setLoading(true);
    try {
      await checkinService(service);
      navigate(-1);
      toast.success("Checkin successfully");
    } catch (err: any) {
      console.log("Checkin service", err);
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
                  fieldName="Service Name"
                  fullWidth
                  formik={formik}
                  value={data?.serviceName}
                  disabled
                />
                <DatePickerField
                  id="checkin_date"
                  fieldName="Checkin Date"
                  formik={formik}
                  required
                />
                <InputField
                  id="checkin_note"
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

export default CheckinServiceForm;
