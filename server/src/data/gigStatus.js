export const gigStatuses = [
  {
    step: 1,
    name: "First Draft",
    description: "Basic draft when the client calls with minimum details",
    approverRole: 1,
  },
  {
    step: 2,
    name: "First Review",
    description: "Drafted, waiting for SV review",
    approverRole: 2,
  },
  {
    step: 3,
    name: "Detailing",
    description: "SV reviewed first draft, waiting for details",
    approverRole: 1,
  },
  {
    step: 4,
    name: "SV Review",
    description: "Witing for SV review",
    approverRole: 2,
  },
  {
    step: 5,
    name: "CEO Review",
    description: "Waiting for CEO review",
    approverRole: 4,
  },
  {
    step: 6,
    name: "Approved",
    description: "Approved, waiting for gig to start & end",
    approverRole: 1,
  },
  {
    step: 7,
    name: "Billing",
    description: "Gig completed, sending the bill",
    approverRole: 1,
  },
  {
    step: 8,
    name: "Payment Pending",
    description: "drafted, waiting for SV review",
    approverRole: 2,
  },
  {
    step: 9,
    name: "Paid",
    description: "Paid, waiting to pay talent",
    approverRole: 2,
  },
  {
    step: 10,
    name: "Reciept Sent",
    description: "Reciept sent to talent",
    approverRole: 2,
  },
  {
    step: 11,
    name: "Completed",
    description: "Gig life cycle over",
    approverRole: 2,
  },
  {
    step: 11,
    name: "Cancelled",
    description: "Gig was cancelled",
    approverRole: 4,
  },
];
export default gigStatuses;
