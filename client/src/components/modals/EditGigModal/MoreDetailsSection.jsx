import {
  Grid,
  GridItem,
  FormLabel,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
  AccordionItem,
} from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";
//non lib imports
import InputField from "components/formComponents/InputField";
import { FieldArray } from "formik";
import InputArray from "components/formComponents/InputArray";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import MenuField from "components/formComponents/MenuField";
import RadioField from "components/formComponents/RadioField";
import { useTranslation } from "react-i18next";

export default function MoreDetailsSection({ user, users, formik }) {
  const { t } = useTranslation();
  const T = (val) => t(`EditGigModal.MoreDetailsSection.${val}`);
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            {T("More_Details_Section")}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Grid templateColumns="repeat(12, 1fr)" gap={4}>
          <GridItem colSpan={[12, 12, 12, 6]}>
            <InputField
              disabled={user.role === 0}
              label={T("Dress_Code")}
              placeholder={T("Enter_dress_code")}
              name="dressCode"
            />
          </GridItem>
          <GridItem colSpan={[12, 12, 12, 6]}>
            <InputField
              disabled={user.role === 0}
              label={T("What_To_Bring")}
              placeholder={T("Enter_what_to_bring")}
              name="whatToBring"
            />
          </GridItem>
          <GridItem colSpan={[12, 12, 12, 6]}>
            <InputField
              disabled={user.role === 0}
              label={T("People_Count")}
              placeholder={T("Enter_People_Count")}
              name="gigPeopleCount"
            />
          </GridItem>
          <GridItem colSpan={[12, 12, 12]}>
            <FormLabel htmlFor="gigPeopleName">{T("Gig_People_Name")}</FormLabel>
            <FieldArray
              disabled={user.role === 0}
              name="gigPeopleName"
              render={(arrayHelpers) => (
                <Grid templateColumns="repeat(12, 1fr)" gap={4}>
                  {formik.values.gigPeopleName.map((name, index) => (
                    <GridItem colSpan={[12, 12, 12, 12]} key={index}>
                      <InputArray
                        key={index}
                        label={T("Gig_People_Name")}
                        placeholder={T("Enter_Gig_People_Name")}
                        name={`gigPeopleName.${index}`}
                        rightAddOn={<AiOutlinePlusCircle />}
                        leftAddOn={<AiOutlineMinusCircle />}
                        rightAddOnClick={() => arrayHelpers.insert(index + 1)}
                        leftAddOnClick={() => {
                          if (formik.values.gigPeopleName.length !== 1) arrayHelpers.remove(index);
                        }}
                      />
                    </GridItem>
                  ))}
                </Grid>
              )}
            />
          </GridItem>
          <GridItem colSpan={[12, 12, 12, 6]}>
            <InputField
              disabled={user.role === 0}
              label={T("Promotion")}
              placeholder={T("Enter_promotion")}
              name="promotion"
            />
          </GridItem>
          <GridItem colSpan={[12, 12, 12, 6]}>
            <InputField
              disabled={user.role === 0}
              label={T("Car_Parking")}
              placeholder={T("Enter_Car_Parking")}
              name="carParking"
            />
          </GridItem>
          <GridItem colSpan={[12, 12, 12, 6]}>
            <InputField
              disabled={user.role === 0}
              label={T("Photo_Shoot")}
              placeholder={T("Enter_Photo_Shoot")}
              name="photoShoot"
            />
          </GridItem>
          <GridItem colSpan={[12, 12, 12, 6]}>
            <InputField
              disabled={user.role === 0}
              label={T("Autograph")}
              placeholder={T("Enter_Autograph")}
              name="autograph"
            />
          </GridItem>
          <GridItem colSpan={[12, 12, 12, 6]}>
            <InputField
              disabled={user.role === 0}
              label={T("Food")}
              placeholder={T("Enter_Food")}
              name="food"
            />
          </GridItem>
          <GridItem colSpan={[12, 12, 12, 6]}>
            <RadioField
              disabled={user.role === 0}
              name="dvd"
              label={T("dvd")}
              //TODO ↓ Can I translate these?
              options={[
                { key: "Bring DVD", value: "true" },
                { key: "Don't Bring DVD", value: "false" },
              ]}
            />
          </GridItem>
          <GridItem colSpan={[12, 12, 12, 12]}>
            <InputField
              disabled={user.role === 0}
              label={T("Other")}
              placeholder={T("Enter_Other")}
              name="other"
            />
          </GridItem>
          <GridItem colSpan={[12, 12, 12, 12]}>
            <InputField label={T("Memo")} placeholder={T("Enter_Memo")} name="memo" />
          </GridItem>
          <GridItem colSpan={[12, 12, 12]}>
            <FormLabel htmlFor="interviewQuestions">{T("Interview_Questions")}</FormLabel>
            <FieldArray
              disabled={user.role === 0}
              name="interviewQuestions"
              render={(arrayHelpers) => (
                <Grid templateColumns="repeat(12, 1fr)" gap={4}>
                  {formik.values.interviewQuestions.map((question, index) => (
                    <GridItem colSpan={[12, 12, 12]} key={index}>
                      <InputArray
                        key={index}
                        placeholder={T("Enter_Interview_Questions")}
                        name={`interviewQuestions.${index}`}
                        rightAddOn={<AiOutlinePlusCircle />}
                        leftAddOn={<AiOutlineMinusCircle />}
                        rightAddOnClick={() => arrayHelpers.insert(index + 1)}
                        leftAddOnClick={() => {
                          if (formik.values.interviewQuestions.length !== 1)
                            arrayHelpers.remove(index);
                        }}
                      />
                    </GridItem>
                  ))}
                </Grid>
              )}
            />
          </GridItem>
          <GridItem colSpan={[12, 12, 12, 6]}>
            <MenuField
              disabled={user.role === 0}
              name="assignee"
              label={T("Assignee")}
              placeholder={T("Select_New_Assignee")}
              options={users.map((user) => {
                return { ...user, name: user.username };
              })}
            />
          </GridItem>
        </Grid>
      </AccordionPanel>
    </AccordionItem>
  );
}
