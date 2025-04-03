export interface wallet {
  id: number;
  wallet_name: string;
  balance: number;
  type: 'container' | 'wallet';
  nation:string;
  currency:string;
  description:string;
  user_id:string;
  date_of_add:any;
  category_id:string;
  container_id: number | null;

}