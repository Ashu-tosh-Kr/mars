import { useState } from "react";

//TODO translate to EN (currently coding in JA, because JA is high priorty)

//TODO fix CSS styling methodology - currently not the best way
//TODO ↓ ideally get rid of this and use Chakra
import "./BillPrintScreen.css";

const BillPrintScreen = () => {
  //TODO receive ↓ variables (currently using dummy states "myStates")
  //TODO rename ↓ variable names (currently too verbose)
  const [myStates] = useState({
    gigTitle: "Interview",

    // ↓ not clientID per se - "the company name of the client"
    clientId: "Sony TV Corporation Ltd",
    gigStart: "2020-12-31",
    galId: "2012001",
    gigLocation: "Taj Mahal Studio",

    // who created this bill?
    lastNameOfEmployeeWhoClickedOnCreateBill: "John",

    // who approved this bill?
    lastNameOfEmployeeWhoShallApproveThisBill: "Michael",

    // service cost before tax
    gigServiceFeeBeforeTax: 10000,

    // array (or whatever data type) of "costs that are billable to Speilberg"
    // if gig's "billing condition" is equal to "cost is not billable", nothing appears here to begin with
    arrayOfCostsThatAreBillableToSpeilberg: [
      { billId: "jf9olaalviaj3", billCategory: "transport-taxi", billHowMuch: 100 },
      { billId: "e09jlalfeij39", billCategory: "food", billHowMuch: 200 },
      { billId: "fF94(aslmN4823", billCategory: "transport-food", billHowMuch: 200 },
      // ↑ billID won't appear on "PDF". it's just for keeping track e.g. when rendering with map method
    ],
  });

  return (
    <div contentEditable="true" className="m-auto text-center m-5-auto" style={{ width: "960px" }}>
      <script src="https://cdn.tailwindcss.com"></script>
      <p className="mb-10 text-4xl font-bold" style={{ letterSpacing: "1.5rem" }}>
        御請求書
      </p>
      <div className="flex flex-nowrap">
        <div className="flex-grow mb-10">
          <p className="mb-10 text-left">{myStates.clientId}</p>
          <p className="mb-10 text-left">
            毎度格別のお引き立てにあずかり、ありがとうございます。
            <br />
            下記の通りご請求申し上げます。
            <br />
            なお、御振込は下記講座にお願いします。
            <br />
          </p>

          <div className="flex justify-between p-2 mb-5 text-xl font-bold text-left border-2 border-black">
            <span>ご請求位金額</span>
            <span>¥ {myStates.serviceCostBeforeTax * 1.1} .-</span>
          </div>

          <table>
            <tbody>
              <tr>
                <th className="">納　入　日</th>
                <td className="w-10">:</td>
                <td className="text-left">{myStates.gigLocation}</td>
              </tr>
              <tr>
                <th className="">納 入 場 所</th>
                <td className="w-10">:</td>
                <td className="text-left">{myStates.gigStart}</td>
              </tr>
              <tr>
                <th className="">お支払期限日</th>
                <td className="w-10">:</td>
                <td className="text-left">{myStates.gigStart + "末日"}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex-grow">
          <p className="text-center">請求No. GAL5-{myStates.galID}</p>
          <hr />
          <p className="mb-10 text-center">作成日: 2021年11月01日</p>
          <p className="text-center">愛知県名古屋市中区栄1-2-3 Mars Building</p>
          <p className="text-center">Mars Talent Company Ltd.</p>
          <p className="text-center">TEL: 052-123-456</p>

          <div className="flex justify-end mt-5 mb-10">
            <div className="w-24">
              <p className="w-full p-1 border-2 border-black">認可</p>
              <img
                width="100%"
                className="border-2 border-black"
                src="https://ui-avatars.com/api/?rounded=true&color=ff0000"
              />
            </div>
            <div className="w-24">
              <p className="w-full p-1 border-2 border-black ">作成</p>
              <img
                width="100%"
                className="border-2 border-black"
                src="https://ui-avatars.com/api/?rounded=true&color=ff0000"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between border-2 border-black flex-nowrap">
        <div className="flex-auto border-2 border-dashed border-gray-50">
          <p className="font-bold border border-gray-900 border-dashed">NO</p>
          <p className="border border-gray-900 border-dashed">1</p>
          <p className="border border-gray-900 border-dashed">2</p>
          <p className="border border-gray-900 border-dashed">3</p>
          <p className="border border-gray-900 border-dashed">4</p>
          <p className="border border-gray-900 border-dashed">5</p>
        </div>
        <div className="flex-auto border-2 border-dashed border-gray-50">
          <p className="font-bold border border-gray-700 border-dashed">案件名</p>
          <p className="border border-gray-700 border-dashed">Late night movie</p>
          <p className="border border-gray-700 border-dashed">World interview</p>
          <p className="border border-gray-700 border-dashed">Photo shoot</p>
          <p className="border border-gray-700 border-dashed">Movie - Matrix 6</p>
          <p className="border border-gray-700 border-dashed">Dance festival</p>
          <p className="border border-gray-700 border-dashed">TOTAL BEFORE TAX</p>
          <p className="border border-gray-700 border-dashed">TAX</p>
          <p className="border border-gray-700 border-dashed">TOTAL INCL TAX</p>
        </div>
        <div className="flex-auto border-2 border-dashed border-gray-50">
          <p className="font-bold border border-gray-800 border-dashed">数量</p>
          <p className="border border-gray-800 border-dashed">1</p>
          <p className="border border-gray-800 border-dashed">1</p>
          <p className="border border-gray-800 border-dashed">1</p>
          <p className="border border-gray-800 border-dashed">1</p>
          <p className="border border-gray-800 border-dashed">1</p>
        </div>
        <div className="flex-auto border-2 border-dashed border-gray-50">
          <p className="font-bold border border-gray-700 border-dashed">単位</p>
          <p className="border border-gray-700 border-dashed">hour</p>
          <p className="border border-gray-700 border-dashed">session</p>
          <p className="border border-gray-700 border-dashed">hour</p>
          <p className="border border-gray-700 border-dashed">session</p>
          <p className="border border-gray-700 border-dashed">session</p>
        </div>
        <div className="flex-auto border-2 border-dashed border-gray-50">
          <p className="font-bold border border-gray-700 border-dashed">式</p>
          <p className="border border-gray-700 border-dashed">100</p>
          <p className="border border-gray-700 border-dashed">200</p>
          <p className="border border-gray-700 border-dashed">300</p>
          <p className="border border-gray-700 border-dashed">400</p>
          <p className="border border-gray-700 border-dashed">500</p>
        </div>
        <div className="flex-auto border-2 border-dashed border-gray-50">
          <p className="font-bold border border-gray-700 border-dashed">金額</p>
          <p className="border border-gray-700 border-dashed">100</p>
          <p className="border border-gray-700 border-dashed">400</p>
          <p className="border border-gray-700 border-dashed">300</p>
          <p className="border border-gray-700 border-dashed">400</p>
          <p className="border border-gray-700 border-dashed">500</p>
          <p className="border border-gray-700 border-dashed">40000</p>
          <p className="border border-gray-700 border-dashed">4000</p>
          <p className="border border-gray-700 border-dashed">44000</p>
        </div>
      </div>
      <p className="text-left">
        【振込先】
        <br />
        {/* ↓ U+3000 JA symbols - may appear garbled in IDE, probably renders properly in browser */}
        　　三菱大阪ABC銀行　江坂支店 普通口座 11223344
        <br />
        　　カブシキガイシャ　マーズ　ヒノ　ユウジロウ
        <br />
        ※お振込手数料は、お客様ご負担とさせて頂きます。
      </p>
    </div>
  );
};

export default BillPrintScreen;
