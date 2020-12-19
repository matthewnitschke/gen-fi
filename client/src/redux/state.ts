export interface AppState {
    selectedMonth: Date,

    items: Map<String, Item>,
    transactions: Map<String, Transaction>,
    borrows: Map<String, Borrow>,

    ignoredTransactions: Array<String>,
    selectedItemId: String,
    selectedTransactionId: String
}


// ---------------------- Item ----------------------

interface Item {
    label: String,
    value: ItemValue
}

interface ItemValue {
    type: ItemValueType
}

interface StaticItemValue extends ItemValue { amount: Number }
interface IncomeItemValue extends ItemValue { amount: Number }
interface TableItemValue extends ItemValue {
    rows: Map<String, Number>
}
interface ExtraItemValue extends ItemValue {}

enum ItemValueType {
    income,
    static,
    table,
    extra
}

// ---------------------- Other ----------------------

interface Transaction {
    merchant: String,
    amount: Number,
    date: Date
}

interface Borrow {
    toId: String,
    fromId: String,
    amount: Number
}