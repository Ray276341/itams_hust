import { Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Formik, Form } from "formik";
import { useState, useEffect } from "react";
import InputField from "../../components/FormComponent/InputField";
import { toast } from "react-toastify";
import { CheckoutService, User } from "../../interface/interface";
import SelectField from "../../components/FormComponent/SelectField";
import { checkoutService } from "../../api/service";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../../api/user";
import dayjs from "dayjs";
import DatePickerField from "../../components/FormComponent/DatePickerField";
import * as Yup from "yup";

function CheckoutServiceForm(props: any) {
  const { data, action } = props;
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const initialValues: CheckoutService = {
    serviceId: data?.id,
    userId: 0,
    checkout_date: data?.date ?? dayjs(),
    checkout_note: "",
  };
  const validationSchema = Yup.object({
    checkout_date: Yup.date().typeError("Invalid date"),
  });
  useEffect(() => {
    const getData = async () => {
      try {
        const users: User[] = await getAllUsers();
        setUsers(users);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const handleSubmit = async (service: CheckoutService) => {
    setLoading(true);
    try {
      await checkoutService(service);
      navigate(-1);
      toast.success("Checkout successfully");
    } catch (err: any) {
      console.log("Checkout service", err);
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
                  value={data?.name}
                  disabled
                />
                <SelectField
                  id="userId"
                  fieldName="User"
                  formik={formik}
                  data={users}
                  required
                />
                <DatePickerField
                  id="checkout_date"
                  fieldName="Checkout Date"
                  formik={formik}
                  required
                />
                <InputField
                  id="checkout_note"
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

export default CheckoutServiceForm;
