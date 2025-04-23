export interface transactionFieldstype{
  user_id:number;
  wallet_id:number;
  amount:number;
  type:"Income" | "Expense";
  cause?:string;
  category_id?:number;
  subCategory_id?:number;
  id?:number;
  date?:Date;
}