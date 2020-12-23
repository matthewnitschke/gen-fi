export interface AppState {
  // data map props
  items: Map<string, Item>;
  transactions: Map<string, Transaction>;
  borrows: Map<string, Borrow>;

  // data decorator props
  rootItemIds: Array<string>;
  ignoredTransactionIds: Array<string>;

  // selection props
  selectedMonth: Date;
  selectedItemId: string;
  selectedTransactionId: string;
}

// ---------------------- Item ----------------------

export interface Item {
  id?: string;
  label: string;
  order: number;
}

export interface BucketGroup extends Item {
  items: Array<string>;
}

export interface Bucket extends Item {
  value: ItemValue;
}

interface ItemValue {
  type: ItemValueType;
}

interface StaticItemValue extends ItemValue {
  amount: number;
}
interface IncomeItemValue extends ItemValue {
  amount: number;
}
interface TableItemValue extends ItemValue {
  rows: Map<string, number>;
}
interface ExtraItemValue extends ItemValue {}

enum ItemValueType {
  income,
  static,
  table,
  extra,
}

// ---------------------- Other ----------------------

export interface Transaction {
  id: string;
  merchant: string;
  amount: number;
  date: Date;
}

interface Borrow {
  toId: string;
  fromId: string;
  amount: number;
}
