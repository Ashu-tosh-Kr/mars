import {
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
  AccordionItem,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import InputField from "components/formComponents/InputField";
import { InputFieldSlow } from "components/formComponents/InputField";
import MenuField from "components/formComponents/MenuField";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function MoneySection({ user, formik }) {
  /**hooks */
  const { t } = useTranslation();

  //autofills talentfee
  useEffect(() => {
    const totalCostIncurred = formik.values.costs?.reduce((previousValue, currentValue) => {
      return +previousValue + +currentValue.price;
    }, 0);
    formik.setFieldValue(
      "money.talentFeeBeforeTax",
      +formik.values.money.costCondition === 5
        ? Math.round((formik.values.money.serviceFeeBeforeTax - totalCostIncurred) * 0.8)
        : formik.values.money.serviceFeeBeforeTax * 0.8
    );
  }, [formik.values.money.serviceFeeBeforeTax, formik.values.money.costCondition]);
  //autofills billable cost
  useEffect(() => {
    const totalCostIncurred = formik.values.costs?.reduce((previousValue, currentValue) => {
      return +previousValue + +currentValue.price;
    }, 0);
    formik.setFieldValue(
      "money.billableCost",
      +formik.values.money.costCondition === 1 ? totalCostIncurred : 0
    );
  }, [formik.values.money.costCondition]);

  //handlers
  const T = (val) => t(`EditGigModal.MoneySection.${val}`);

  //helpers
  const costConditions = [
    { _id: 1, name: T("Actual_cost_is_billable") },
    { _id: 2, name: T("Pre-defined_amount_is_billable") },
    { _id: 3, name: T("Coupon-tickets_are_provided") },
    { _id: 4, name: T("Out_of_pocket") },
    { _id: 5, name: T("Cost_included_in_Gig_service_fee") },
  ];

  //jsx
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            Money
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Grid templateColumns="repeat(12, 1fr)" gap={4}>
          <GridItem colSpan={[12, 12, 12, 6]}>
            <MenuField
              disabled={user.role === 0}
              name="money.costCondition"
              label={T("Cost_Condition")}
              placeholder={T("Select_Cost_Condition")}
              options={costConditions}
            />
          </GridItem>
          <GridItem colSpan={[12, 12, 12, 6]}>
            <InputField disabled label={T("Tax")} placeholder={T("Tax")} name="money.tax" />
          </GridItem>
          <GridItem colSpan={[12, 12, 12, 6]}>
            <InputField
              disabled={user.role === 0}
              label={T("Service_Fee_Before_Tax")}
              placeholder={T("Service_Fee_Before_Tax")}
              // onChange={() => {
              //   formik.handleChange();
              //   formik.setFieldValue(
              //     "money.serviceFeeIncludingTax",
              //     formik.values.money.serviceFeeBeforeTax * 1.1
              //   );
              // }}
              name="money.serviceFeeBeforeTax"
            />
          </GridItem>
          <GridItem colSpan={[12, 12, 12, 6]}>
            <InputField
              disabled
              label={T("Service_Fee_Including_Tax")}
              placeholder={T("Service_Fee_Including_Tax")}
              name="money.serviceFeeIncludingTax"
              value={
                (formik.values.money.serviceFeeIncludingTax = Math.round(
                  formik.values.money.serviceFeeBeforeTax * 1.1
                ))
              }
            />
          </GridItem>
          <GridItem colSpan={[12, 12, 12, 6]}>
            <InputFieldSlow
              disabled={user.role === 0}
              label={T("Talent_Fee_Before_Tax")}
              placeholder={T("Talent_Fee_Before_Tax")}
              name="money.talentFeeBeforeTax"
              // value={
              //   (formik.values.money.talentFeeBeforeTax =
              //     formik.values.money.serviceFeeBeforeTax * 0.8)
              // }
            />
          </GridItem>
          <GridItem colSpan={[12, 12, 12, 6]}>
            <InputField
              disabled
              label={T("Talent_Fee_Including_Tax")}
              placeholder={T("Talent_Fee_Including_Tax")}
              name="money.talentFeeIncludingTax"
              value={
                (formik.values.money.talentFeeIncludingTax = Math.round(
                  formik.values.money.talentFeeBeforeTax * 1.1
                ))
              }
            />
          </GridItem>
          <GridItem colSpan={[12, 12, 12, 6]}>
            <InputField
              disabled={user.role === 0}
              label={T("Money_Note")}
              placeholder={T("Money_Note")}
              name="money.moneyNote"
            />
          </GridItem>
          <GridItem colSpan={[12, 12, 12, 6]}>
            <InputFieldSlow
              disabled={user.role === 0}
              label={T("Billable_Cost")}
              placeholder={T("Billable_Cost")}
              name="money.billableCost"
            />
          </GridItem>
          <GridItem colSpan={[12, 12, 12]}>
            <InputField
              disabled
              label={T("Total")}
              placeholder={T("Total")}
              name="money.total"
              value={
                (formik.values.money.total =
                  formik.values.money.serviceFeeIncludingTax + +formik.values.money.billableCost)
              }
            />
          </GridItem>
        </Grid>
      </AccordionPanel>
    </AccordionItem>
  );
}
