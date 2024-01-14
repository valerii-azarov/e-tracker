export interface Record {
  _id: string;
  title: string;
  description: string;
  amount: number;
  type: string;
  categoryId: {
    name: string;
  };
  date: string;
}

export interface Transaction {
  [date: string]: Record[];
}
