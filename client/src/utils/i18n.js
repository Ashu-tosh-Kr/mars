import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          now_in_english: "Now in English",
          Sidebar: {
            All_Gigs: "All Gigs",
            Clients: "Clients",
            Dashboard: "Dashboard",
            Manage_Users: "Manage Users",
            New_Gig: "New Gig",
            Settings: "Settings",
            ToDo: "ToDo",
          },
          NewGigScreen: {
            Add: "Add",
            Address: "Address",
            Arrival_Time: "Arrival Time",
            Assistant: "Assistant",
            AutoGenerated: "AutoGenerated",
            Autograph: "Autograph",
            Cancel: "Cancel",
            Car_Parking: "Car Parking",
            Caution: "Caution",
            Client: "Client",
            DVD: "DVD",
            Departure_Time: "Departure Time",
            Details: "Details",
            Dress_Code: "Dress_Code",
            Embargo: "Embargo",
            Enter_Gig_People_Name: "Enter Gig People Name",
            Enter_Interview_Questions: "Enter Interview Questions",
            Food: "Food",
            Gig_End_Date: "Gig End Date",
            Gig_People_Name: "Gig People Name",
            Gig_Start_Date: "Gig Start Date",
            Gig_Type: "Gig_Type",
            Host: "Host",
            Id: "Id",
            Interview_Questions: "Interview Questions",
            Location: "Location",
            Other: "Other",
            People_Count: "People Count",
            Photo_Shoot: "Photo_Shoot",
            Promotion: "Promotion",
            Schedule_Details: "Schedule Details",
            Select_Arrival_Time: "Select Arrival Time",
            Select_Assistant: "Select Assistant",
            Select_Client: "Select Client",
            Select_Departure_Time: "Select Departure Time",
            Select_Embargo_Date: "Select Embargo Date",
            Select_Gig_End_Date: "Select Gig End Date",
            Select_Gig_Start_Date: "Select Gig Start Date",
            Select_Talent: "Select Talent",
            Talent: "Talent",
            Title: "Title",
            What_To_Bring: "What To Bring",
          },
          CostModal: {
            Category: "Category",
            Detail: "Detail",
            Price: "Price",
            Method: "Payment Method",
          },
        },
      },
      ja: {
        translation: {
          now_in_english: "日本語で表示中",
          Sidebar: {
            All_Gigs: "案件の一覧",
            Clients: "依頼元の一覧",
            Dashboard: "ホームページ",
            Manage_Users: "ユーザーの管理",
            New_Gig: "新しい案件",
            Settings: "設定",
            ToDo: "やること",
          },
          NewGigScreen: {
            Add: "追加",
            Address: "住所",
            Arrival_Time: "入り時間",
            Assistant: "当日の担当者",
            AutoGenerated: "自動で発行されるよ！",
            Autograph: "当日のサインの有無",
            Cancel: "中止",
            Car_Parking: "駐車場",
            Caution: "注意事項",
            Client: "依頼元",
            DVD: "DVDの有無",
            Departure_Time: "終了時間",
            Details: "実施内容",
            Dress_Code: "服装",
            Embargo: "情報解禁日",
            Enter_Gig_People_Name: "対象者・共演者を入力してね",
            Enter_Interview_Questions: "想定される質問を入力してね",
            Food: "お弁当の有無",
            Gig_End_Date: "実施終了",
            Gig_People_Name: "対象者・共演者",
            Gig_Start_Date: "実施開始",
            Gig_Type: "項目",
            Host: "主催者",
            Id: "案件No.",
            Interview_Questions: "当日質疑応答",
            Location: "実施場所",
            Other: "その他",
            People_Count: "対象人数",
            Photo_Shoot: "当日写真撮影",
            Promotion: "告知物",
            Schedule_Details: "スケジュール",
            Select_Arrival_Time: "入り時間を選んでね",
            Select_Assistant: "当日の担当者を選んでね",
            Select_Client: "依頼元の担当者を選んでね",
            Select_Departure_Time: "終了時間を選んでね",
            Select_Embargo_Date: "情報解禁日を選んでね",
            Select_Gig_End_Date: "実施終了の日時を選んでね",
            Select_Gig_Start_Date: "実施開始の日時を選んでね",
            Select_Talent: "タレントを選んでね",
            Talent: "タレント名",
            Title: "題名",
            What_To_Bring: "持ち物",
          },
          CostModal: {
            Category: "",
            Detail: "",
            Price: "",
            Method: "",
          },
        },
      },
    },
  });

export default i18n;