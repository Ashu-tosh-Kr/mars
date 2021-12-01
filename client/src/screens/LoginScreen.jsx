import { Flex, Heading, Button, AlertIcon, Alert } from "@chakra-ui/react";
import InputField from "components/formComponents/InputField";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { login } from "redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid Email").required("Required"),
  password: Yup.string().required("Required"),
});

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error, userInfo } = useSelector((state) => state.userLogin);

  const onSubmit = ({ email, password }) => {
    dispatch(login(email, password));
  };

  const redirect = location.search ? location.search.split("=")[1] : "/";
  useEffect(() => {
    if (userInfo) {
      navigate(redirect, { replace: true });
    }
  }, [history, userInfo, redirect]);

  return (
    <Flex height="100vh" align="center" justify="center">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {/* {(formik) => {
          return ( */}
        <Form>
          <Flex
            direction="column"
            backgroundColor="cyan.100"
            p={12}
            rounded={6}
          >
            <Heading mb="6">Log In</Heading>
            {error && (
              <Alert mb={3} rounded={6} status="error">
                <AlertIcon />
                {error}
              </Alert>
            )}
            <InputField
              name="email"
              type="email"
              placeholder="xyz@gmail.com"
              mb={3}
            />
            <InputField
              placeholder="******"
              name="password"
              type="password"
              mb={6}
            />
            <Button
              isLoading={loading}
              loadingText="Logging In"
              type="submit"
              colorScheme="teal"
            >
              Log In
            </Button>
          </Flex>
        </Form>
        {/* ); */}
        {/* }} */}
      </Formik>
    </Flex>
  );
};

export default LoginScreen;
