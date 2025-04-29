export interface Order {
  id: string;
  client_id: string;
  order_status: string;
  created_at: string;
  updated_at: string;
  delivery_person_id?: string;
  pickup_time?: string;
  delivery_time?: string;
  items: any[];
}