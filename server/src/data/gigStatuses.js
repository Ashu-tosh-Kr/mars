export const gigStatuses = [
  {
    step: 1,
    name: "Drafting",
    description: "Basic draft when the client calls with minimum details",
    personInChargeRole: 1,
  },
  {
    step: 2,
    name: "Initial Review",
    description: "Drafted, waiting for SV review",
    personInChargeRole: 2,
  },
  {
    step: 3,
    name: "Detailing",
    description: "SV reviewed first draft, waiting for details",
    personInChargeRole: 1,
  },
  {
    step: 4,
    name: "SV Review",
    description: "Witing for SV review",
    personInChargeRole: 2,
  },
  {
    step: 5,
    name: "CEO Review",
    description: "Waiting for CEO review",
    personInChargeRole: 4,
  },
  {
    step: 6,
    name: "Approved",
    description: "Approved, waiting for gig to start & end",
    personInChargeRole: 1,
  },
  {
    step: 7,
    name: "Billing",
    description: "Gig completed, sending the bill",
    personInChargeRole: 1,
  },
  {
    step: 8,
    name: "Payment Pending",
    description: "Payment pending from client",
    personInChargeRole: 2,
  },
  {
    step: 9,
    name: "Paid",
    description: "Paid, waiting to send reciept to talent",
    personInChargeRole: 2,
  },
  {
    step: 10,
    name: "Reciept Sent",
    description: "Reciept sent to talent",
    personInChargeRole: 2,
  },
  {
    step: 11,
    name: "Completed",
    description: "Gig life cycle over",
    personInChargeRole: 2,
  },
  {
    step: 0,
    name: "Cancelled",
    description: "Gig was cancelled",
    personInChargeRole: 4,
  },
];
export default gigStatuses;
