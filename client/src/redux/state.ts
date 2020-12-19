export interface AppState {
    selectedMonth: Date,

    items: Map<string, Item>,
    transactions: Map<string, Transaction>,
    borrows: Map<string, Borrow>,

    ignoredTransactions: Array<string>,
    selectedItemId: string,
    selectedTransactionId: string
}


// ---------------------- Item ----------------------

export interface Item {
    id?: string,
    label: string,
    value: ItemValue
}

interface ItemValue {
    type: ItemValueType
}

interface StaticItemValue extends ItemValue { amount: number }
interface IncomeItemValue extends ItemValue { amount: number }
interface TableItemValue extends ItemValue {
    rows: Map<string, number>
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
    merchant: string,
    amount: number,
    date: Date
}

interface Borrow {
    toId: string,
    fromId: string,
    amount: number
}