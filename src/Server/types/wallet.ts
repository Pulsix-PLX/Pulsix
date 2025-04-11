export interface wallet {
  id: number;
  wallet_name: string;
  balance: number;
  type: 'container' | 'wallet';
  nation:string;
  currency:string;
  description:string;
  user_id:number;
  date_of_add:any;
  category_id:number;
  container_id: number | null;
  color: any;
  type_ui: string;
}