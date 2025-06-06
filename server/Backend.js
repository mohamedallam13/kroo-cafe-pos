(function (root, factory) {
  root.BACKEND = factory();
})(this, function () {

  const {
    MASTER_INDEX_ID,
    KROO_CAFE_SSID,
    KROO_AUTO_LEDGER,
    KROO_SYSTEM,
    ALL_SHEET_PARAMS,
  } = ENV
  const { Toolkit, SHEETS } = KROOLibraries
  const { readFromJSON, timestampCreate } = Toolkit
  const { getSheetObjFromParamObj, createWriteArr, writeAdvancedToSheet_2 } = SHEETS

  let ordersDBSheetObj
  let krooLedgerSheetObj
  let krooSystemCafeordersDBSheetObj
  let timestamp

  const paymentAccounts = {
    cash: "KROO-SAFE-KORBA-1",
    card: "GEIDEA-1",
    instapay: "KROOCC-INSTAPAY"
  }

  const paymentTypes = {
    cash: "KROO Safe",
    card: "Geidea",
    instapay: "Bank"
  }

  function getMenuItems() {
    globalSSID = KROO_CAFE_SSID
    const { menuItemsFile, membersEmailsObj } = readFromJSON(MASTER_INDEX_ID)
    console.log(menuItemsFile, membersEmailsObj)
    const menuObj = readFromJSON(menuItemsFile)
    const emailsObj = readFromJSON(membersEmailsObj)
    console.log({ menuObj, emailsObj })
    return JSON.stringify({ menuObj, emailsObj })
  }

  function submitOrder(order) {
    console.log(order)
    const { paymentMethod } = order
    timestamp = timestampCreate(undefined, "MM/dd/YYYY HH:mm:ss")
    console.log(order.accountEmail)
    try {
      getOrdersSheet()
      const ordersObjArr = createOrdersObjArr(order)
      writeToDBSheet(ordersObjArr, ordersDBSheetObj)
      if (paymentMethod == "account") {
        getKROOCafeOrdersSheet()
        const cafeOrdersObjArr = createCafeOrdersObjArr(order)
        writeToDBSheet(cafeOrdersObjArr, krooSystemCafeordersDBSheetObj)
      } else {
        getAutoLedgerSheet()
        const ledgerObjArr = createLedgerObjArr(order)
        writeToDBSheet(ledgerObjArr, krooLedgerSheetObj)
      }
      return true
    } catch (e) {
      throw e
    }
  }

  function createOrdersObjArr(order) {
    const { discount, orderId, paymentMethod, accountEmail } = order
    const ordersObjArr = order.items.map(item => {
      const { name, price, quantity } = item
      item.item = name
      item.amount = price * quantity
      item.email = accountEmail || "kroo.mensa.cc@kroo.cc"
      item.settled = paymentMethod == "account" ? false : true
      return { ...item, timestamp, discount, orderId, paymentMethod }
    })
    return ordersObjArr
  }

  function createLedgerObjArr(order) {
    const { discount, orderId, accountEmail, paymentMethod } = order
    const ledgerObjArr = order.items.map(item => {
      const { name, quantity, price } = item
      item.item = item.name
      item.settled = true

      const discountAdded = discount == "" || discount == 0 ? "" : " - Discount " + formatAsPercentage(discount)
      return {
        timestamp,
        type: "Income - Daily",
        category: "Cafe",
        email: accountEmail || "kroo.mensa.cc@kroo.cc",
        description: quantity + " " + name + discountAdded,
        debitCredit: "Debit",
        paymentMethod: paymentMethod == "instapay" ? "Transfer" : paymentMethod,
        amount: price * quantity * (1 - (discount/100)),
        transactionId: orderId,
        account: paymentAccounts[paymentMethod],
        paymentType: paymentTypes[paymentMethod],
        month: (((new Date()).getMonth()) + 1) + "/" + ((new Date()).getFullYear())
      }
    })
    return ledgerObjArr
  }

  function createCafeOrdersObjArr(order) {
    const { accountEmail, discount, orderId } = order
    // timestamp	row	email	item	company	quantity	pricing	amount	discount	netAmount	settled	autoSettle	partialSettle	promocode	month
    const krooCafeObjArr = order.items.map(item => {
      const { name, quantity, price } = item
      return {
        timestamp,
        email: accountEmail,
        item: name,
        quantity,
        pricing: price,
        amount: (price * quantity),
        discount:(discount/100),
        cafeOrderId: orderId
      }
    })
    return krooCafeObjArr
  }

  function getAutoLedgerSheet() {
    const { krooLedger } = ALL_SHEET_PARAMS
    krooLedgerSheetObj = getSheetObjFromParamObj({ ssid: KROO_AUTO_LEDGER, ...krooLedger })
  }

  function getOrdersSheet() {
    const { ordersDB } = ALL_SHEET_PARAMS
    ordersDBSheetObj = getSheetObjFromParamObj({ ssid: KROO_CAFE_SSID, ...ordersDB })
  }

  function getKROOCafeOrdersSheet() {
    const { krooSystemCafeOrders } = ALL_SHEET_PARAMS
    krooSystemCafeordersDBSheetObj = getSheetObjFromParamObj({ ssid: KROO_SYSTEM, ...krooSystemCafeOrders })
  }

  function writeToDBSheet(casesObjArr, sheetObj) {
    const { lastRow } = sheetObj
    const writeArr = createWriteArr(casesObjArr, sheetObj) // KROO Library version is different, it accepts sheetObj
    writeAdvancedToSheet_2(writeArr, sheetObj, undefined, (lastRow + 1))
  }

  function getRandomArbitrary(min, max) {
    return Math.ceil(Math.random() * (max - min) + min);
  }

  function formatAsPercentage(num) {
    return `${(num).toFixed(2)}%`; //Already coming in as an integer
  }

  function getOrderHistory() {
    globalSSID = KROO_CAFE_SSID
    const { ordersHistoryObj } = readFromJSON(MASTER_INDEX_ID)
    const historyData = readFromJSON(ordersHistoryObj)
    console.log(historyData)
    return JSON.stringify(historyData)
  }

  return {
    getMenuItems,
    submitOrder,
    getOrderHistory
  };
});

let defaultOrder = { "items": [{ "name": "Water", "price": 20, "image": "https://drive.google.com/file/d/1H05vl_RtDUoHZeGp1Z_X5vqBuZtKHAr-/view?usp=drive_link", "quantity": 1 }], "discount": 0, "paymentMethod": "account", "orderId": "test-uqx6xw2mk", accountEmail: "omar.hbk1996@gmail.com" }

function getMenuItems() {
  return BACKEND.getMenuItems()
}

function submitOrder(order) {
  order = order || defaultOrder
  return BACKEND.submitOrder(order)
}

function getOrderHistory() {
  return BACKEND.getOrderHistory()
}

// const testHistoryData = {
//   "2025-02-01": [
//     {
//       date: "2025-02-01T10:30:00",
//       items: [
//         { name: "Espresso", quantity: 2, price: 108 },
//         { name: "Croissant", quantity: 1, price: 93 }
//       ],
//       paymentMethod: "Cash"
//     },
//     {
//       date: "2025-02-01T14:45:00",
//       items: [
//         { name: "Latte", quantity: 1, price: 139 },
//         { name: "Sandwich", quantity: 2, price: 201 },
//         { name: "Salad", quantity: 1, price: 247 }
//       ],
//       paymentMethod: "Card"
//     },
//     {
//       date: "2025-02-01T17:20:00",
//       items: [
//         { name: "Cappuccino", quantity: 3, price: 124 },
//         { name: "Muffin", quantity: 2, price: 77 }
//       ],
//       paymentMethod: "InstaPay"
//     }
//   ],
//   "2025-02-02": [
//     {
//       date: "2025-02-02T09:15:00",
//       items: [
//         { name: "Americano", quantity: 2, price: 93 },
//         { name: "Muffin", quantity: 4, price: 77 }
//       ],
//       paymentMethod: "Cash"
//     },
//     {
//       date: "2025-02-02T12:30:00",
//       items: [
//         { name: "Salad", quantity: 2, price: 247 },
//         { name: "Latte", quantity: 2, price: 139 }
//       ],
//       paymentMethod: "Account"
//     }
//   ],
//   "2025-02-03": [
//     {
//       date: "2025-02-03T10:00:00",
//       items: [
//         { name: "Espresso", quantity: 1, price: 108 },
//         { name: "Sandwich", quantity: 1, price: 201 },
//         { name: "Latte", quantity: 1, price: 139 }
//       ],
//       paymentMethod: "Card"
//     },
//     {
//       date: "2025-02-03T10:30:00",
//       items: [
//         { name: "Espresso", quantity: 1, price: 108 },
//         { name: "Sandwich", quantity: 1, price: 201 },
//         { name: "Latte", quantity: 1, price: 139 }
//       ],
//       paymentMethod: "Card"
//     },
//     {
//       date: "2025-02-03T11:00:00",
//       items: [
//         { name: "Espresso", quantity: 1, price: 108 },
//         { name: "Sandwich", quantity: 1, price: 201 },
//         { name: "Latte", quantity: 1, price: 139 }
//       ],
//       paymentMethod: "Card"
//     },
//     {
//       date: "2025-02-03T11:30:00",
//       items: [
//         { name: "Espresso", quantity: 1, price: 108 },
//         { name: "Sandwich", quantity: 1, price: 201 },
//         { name: "Latte", quantity: 1, price: 139 }
//       ],
//       paymentMethod: "Card"
//     },
//     {
//       date: "2025-02-03T12:00:00",
//       items: [
//         { name: "Espresso", quantity: 1, price: 108 },
//         { name: "Sandwich", quantity: 1, price: 201 },
//         { name: "Latte", quantity: 1, price: 139 }
//       ],
//       paymentMethod: "Card"
//     },

//     {
//       date: "2025-02-03T15:45:00",
//       items: [
//         { name: "Cappuccino", quantity: 2, price: 124 },
//         { name: "Croissant", quantity: 3, price: 93 }
//       ],
//       paymentMethod: "InstaPay"
//     },
//     {
//       date: "2025-02-03T18:20:00",
//       items: [
//         { name: "Americano", quantity: 1, price: 93 },
//         { name: "Salad", quantity: 1, price: 247 }
//       ],
//       paymentMethod: "Cash"
//     }
//   ]
// };