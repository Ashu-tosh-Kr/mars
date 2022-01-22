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

export default function MoreDetailsSection({ user, users, formik }) {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            More Details
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Grid templateColumns="repeat(12, 1fr)" gap={4}>
          <GridItem colSpan={[12, 12, 12, 6]}>
            <InputField
              disabled={user.role === 0}
              label="Dress Code"
              placeholder="Dress Code"
              name="dressCode"
            />
          </GridItem>
          <GridItem colSpan={[12, 12, 12, 6]}>
            <InputField
              disabled={user.role === 0}
              label="What To Bring"
              placeholder="What To Bring"
              name="whatToBring"
            />
          </GridItem>
          <GridItem colSpan={[12, 12, 12, 6]}>
            <InputField
              disabled={user.role === 0}
              label="People Count"
              placeholder="People Count"
              name="gigPeopleCount"
            />
          </GridItem>
          <GridItem colSpan={[12, 12, 12]}>
            <FormLabel htmlFor="gigPeopleName">Gig People Name</FormLabel>
            <FieldArray
              disabled={user.role === 0}
              name="gigPeopleName"
              render={(arrayHelpers) => (
                <Grid templateColumns="repeat(12, 1fr)" gap={4}>
                  {formik.values.gigPeopleName.map((name, index) => (
                    <GridItem colSpan={[12, 12, 12, 12]} key={index}>
                      <InputArray
                        key={index}
                        label="Gig People Name"
                        placeholder="Gig People Name"
                        name={`gigPeopleName.${index}`}
                        rightAddOn={<AiOutlinePlusCircle />}
                        leftAddOn={<AiOutlineMinusCircle />}
                        rightAddOnClick={() => arrayHelpers.insert(index + 1)}
                        leftAddOnClick={() => {
                          if (formik.values.gigPeopleName.length !== 1)
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
            <InputField
              disabled={user.role === 0}
              label="Promotion"
              placeholder="Promotion"
              name="promotion"
            />
          </GridItem>
          <GridItem colSpan={[12, 12, 12, 6]}>
            <InputField
              disabled={user.role === 0}
              label="Car Parking"
              placeholder="Car Parking"
              name="carParking"
            />
          </GridItem>
          <GridItem colSpan={[12, 12, 12, 6]}>
            <InputField
              disabled={user.role === 0}
              label="Photo Shoot"
              placeholder="Photo Shoot"
              name="photoShoot"
            />
          </GridItem>
          <GridItem colSpan={[12, 12, 12, 6]}>
            <InputField
              disabled={user.role === 0}
              label="Autograph"
              placeholder="Autograph"
              name="autograph"
            />
          </GridItem>
          <GridItem colSpan={[12, 12, 12, 6]}>
            <InputField
              disabled={user.role === 0}
              label="Food"
              placeholder="Food"
              name="food"
            />
          </GridItem>
          <GridItem colSpan={[12, 12, 12, 6]}>
            <RadioField
              disabled={user.role === 0}
              name="dvd"
              label="DVD"
              options={[
                { key: "Bring DVD", value: "true" },
                { key: "Don't Bring DVD", value: "false" },
              ]}
            />
          </GridItem>
          <GridItem colSpan={[12, 12, 12, 12]}>
            <InputField
              disabled={user.role === 0}
              label="Other"
              placeholder="Other"
              name="other"
            />
          </GridItem>
          <GridItem colSpan={[12, 12, 12, 12]}>
            <InputField label="Memo" placeholder="Memo" name="memo" />
          </GridItem>
          <GridItem colSpan={[12, 12, 12]}>
            <FormLabel htmlFor="interviewQuestions">
              Interview Questions
            </FormLabel>
            <FieldArray
              disabled={user.role === 0}
              name="interviewQuestions"
              render={(arrayHelpers) => (
                <Grid templateColumns="repeat(12, 1fr)" gap={4}>
                  {formik.values.interviewQuestions.map((question, index) => (
                    <GridItem colSpan={[12, 12, 12]} key={index}>
                      <InputArray
                        key={index}
                        placeholder="Interview Questions"
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
              label="Assignee"
              placeholder="Select New Assignee"
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
