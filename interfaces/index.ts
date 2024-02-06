export interface Op_product {
  ID: number;
  stt_tag: string;
  label: string;
  partner_ID: number;
  stock_quantity: number;
  is_available: boolean;
  category_ID: number;
  created_at?: string;
  updated_at?: string;
  Id_user_create_at?: number;
  unit_price: number;
  currency: string;
}

export interface Op_command {
  ID: number;
  stt_tag: string;
  client_ID?: number;
  agent_created_at_ID?: number;
  agent_closed_at_ID?: number;
  status?: string;
  is_closed?: false;
  close_date?: string;
  created_at?: string;
  updated_at?: string;
  Id_user_create_at?: number;
}

export interface Rf_category {
  ID: number;
  stt_tag: string;
  label: string;
  partner_ID: number;
  is_available: number;
  created_at: string;
  updated_at: string;
  Id_user_create_at: number;
}

export interface Rf_partner {
  ID: number;
  stt_tag: string;
  sociaty_name: string;
  rf_contact_name: string;
  rf_contact_function: string;
  address: string;
  city: string;
  country: string;
  phone_number: string;
  fax: string;
  website: string;
  created_at: string;
  updated_at: string;
  Id_user_create_at: number;
}

export interface rf_direction {
  ID: number;
  stt_tag: string;
  label: string;
  created_at: string;
  updated_at: string;
  Id_user_create_at: number;
}

export interface Op_command_line {
  ID: number;
  stt_tag: string;
  product_ID: number;
  unit_price: string;
  quantity: string;
  created_at: string;
  updated_at: string;
  Id_user_create_at: number;
}

export interface Op_bill {
  ID: number;
  stt_tag: string;
  command_ID: number;
  agent_created_at_ID: number;
  agent_closed_at_ID: number;
  is_printed: string;
  print_at: string;
  sent_on: string;
  created_at: string;
  updated_at: string;
  Id_user_create_at: number;
}

export interface Op_agent {
  agent_ID: number;
  stt_tag: string;
  first_name: string;
  second_name: string;
  birth_date: string;
  hired_date: string;
  fired_date: string;
  address: string;
  city: string;
  country: string;
  sexe: string;
  phone_number: string;
  mail: string;
  salary: string;
  direction_ID: number;
  service_rh_ID: number;
  created_at: string;
  updated_at: string;
  Id_user_create_at: number;
}

export interface Rf_user_role {
  ID: number;
  stt_tag: string;
  user_ID: number;
  role_ID: number;
  created_at: string;
  updated_at: string;
  Id_user_create_at: number;
}

export interface Sys_role {
  ID: number;
  NAME: string;
  ACTION: string;
  created_at: string;
  updated_at: string;
  Id_user_create_at: number;
}
export interface Client {
  first_name: string;
  second_name: string;
  address: string;
  city: string;
  country: string;
  sexe: string;
  phone_number: string;
  mail: string;
}

export interface Op_client {
  ID: number;
  stt_tag: string;
  first_name: string;
  second_name: string;
  address: string;
  city: string;
  country: string;
  sexe: string;
  phone_number: string;
  mail: string;
  created_at: string;
  updated_at: string;
  Id_user_create_at: number;

  set_first_name?: (value: string) => void;
  set_second_name?: (value: string) => void;
  set_address?: (value: string) => void;
  set_city?: (value: string) => void;
  set_country?: (value: string) => void;
  set_sexe?: (value: string) => void;
  set_phone_number?: (value: string) => void;
  set_mail?: (value: string) => void;
  set_Id_user_create_at?: (value: number) => void;
  create?: (client: Client) => void;
}

export interface Category {
  ID: number;
  stt_tag: string;
  label: string;
  partner_ID: string;
  is_available: boolean;
  created_at: string;
  updated_at: string;
  Id_user_create_at: number;

  set_ID: (val: number) => void;
  set_stt_tag: (val: string) => void;
  set_label: (val: string) => void;
  set_partner_ID: (val: string) => void;
  set_is_available: (val: boolean) => void;
  set_created_at: (val: string) => void;
  set_updated_at: (val: string) => void;
  set_Id_user_create_at: (val: number) => void;
}

export interface Product {
  ID: number;
  stt_tag: string;
  label: string;
  partner_ID: number;
  stock_quantity: string;
  is_available: string;
  category_ID: number;
  created_at: string;
  updated_at: string;
  Id_user_create_at: number;

  set_ID: (val: number) => void;
  set_stt_tag: (val: string) => void;
  set_label: (val: string) => void;
  set_partner_ID: (val: number) => void;
  set_stock_quantity: (val: string) => void;
  set_is_available: (val: string) => void;
  set_category_ID: (val: number) => void;
  set_created_at: (val: string) => void;
  set_updated_at: (val: string) => void;
  set_Id_user_create_at: (val: number) => void;
}