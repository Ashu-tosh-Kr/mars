export const gigStatuses = [
  {
    step: 1,
    name: "1-下書作成中",
    description: "Basic draft when the client calls with minimum details",
    personInChargeRole: 1,
  },
  {
    step: 2,
    name: "2-下書点検中-経理入力中",
    description: "Drafted, waiting for SV review",
    personInChargeRole: 2,
  },
  {
    step: 3,
    name: "3-詳細入力中",
    description: "SV reviewed first draft, waiting for details",
    personInChargeRole: 1,
  },
  {
    step: 4,
    name: "4-詳細点検中",
    description: "Witing for SV review",
    personInChargeRole: 2,
  },
  {
    step: 5,
    name: "5-CEO審査中",
    description: "Waiting for CEO review",
    personInChargeRole: 4,
  },
  {
    step: 6,
    name: "6-承認済-本番当日待ち",
    description: "Approved, waiting for gig to start & end",
    personInChargeRole: 1,
  },
  {
    step: 7,
    name: "7-出演完了-精算中-請求書作成中",
    description: "Gig completed, sending the bill",
    personInChargeRole: 1,
  },
  {
    step: 8,
    name: "8-請求済み-支払待ち",
    description: "Payment pending from client",
    personInChargeRole: 2,
  },
  {
    step: 9,
    name: "支払済み-領収書作成中",
    description: "Paid, waiting to send reciept to talent",
    personInChargeRole: 2,
  },
  {
    step: 10,
    name: "10-領収書送付済み-完了ボタン待ち",
    description: "Reciept sent to talent",
    personInChargeRole: 2,
  },
  {
    step: 11,
    name: "11-完了",
    description: "Gig life cycle over",
    personInChargeRole: 2,
  },
  {
    step: 0,
    name: "12-中止",
    description: "Gig was cancelled",
    personInChargeRole: 4,
  },
];
export default gigStatuses;
