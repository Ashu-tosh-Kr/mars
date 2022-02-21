import {
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useChangePass } from "api/hooks";
import { InputFieldSlow } from "components/formComponents/InputField";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

const initialValues = {
  oldPass: "",
  newPass: "",
  confirmPass: "",
};
const validationSchema = Yup.object({
  oldPass: Yup.string().required("Required"),
  newPass: Yup.string().required("Required"),
  confirmPass: Yup.string()
    .oneOf([Yup.ref("newPass")], "Passwords does not match")
    .required("Required"),
});

const SettingsScreen = () => {
  const { mutate, isLoading } = useChangePass();
  const onSubmit = (values) => {
    mutate(values);
  };

  const { t } = useTranslation();

  return (
    <>
      <Tabs w="100%" isFitted variant="soft-rounded">
        <TabList mb="1em">
          <Tab>{t("SettingsScreen.Change_password")}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel w={["100%", "100%", "50%"]}>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              <Form>
                <InputFieldSlow
                  mb={3}
                  placeholder={t("SettingsScreen.Old_password")}
                  name="oldPass"
                />
                <InputFieldSlow
                  mb={3}
                  placeholder={t("SettingsScreen.New_password")}
                  name="newPass"
                />
                <InputFieldSlow
                  mb={3}
                  placeholder={t("SettingsScreen.Confirm_password")}
                  name="confirmPass"
                />

                <Button type="submit" isLoading={isLoading} mr={3}>
                  {t("SettingsScreen.Change")}
                </Button>
              </Form>
            </Formik>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default SettingsScreen;
