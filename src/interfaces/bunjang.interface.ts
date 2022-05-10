export interface BunjangProps {
  order: string;
  n: number;
  page: number;
  req_ref: string;
  q: string;
  stat_device: string;
  version: number;
}

export interface BunjangProduct {
  ad: boolean;
  bizseller: boolean;
  checkout: boolean;
  contact_hope: boolean;
  free_shipping: boolean;
  is_adult: boolean;
  is_super_up_shop: unknown;
  location: string;
  max_cpc: unknown;
  name: string;
  num_comment: string;
  num_faved: string;
  only_neighborhood: boolean;
  outlink_url: string;
  pid: string;
  price: string;
  product_image: string;
  pu_id: unknown;
  ref_campaign: unknown;
  ref_code: unknown;
  ref_medium: unknown;
  ref_content: string;
  ref_source: string;
  ref_test: unknown;
  status: string;
  style: string;
  super_up: unknown;
  tag: string;
  uid: string;
  update_time: number;
  used: number;
  bun_pay_filter_enabled: boolean;
  inspection: unknown;
  imp_id: string;
  ad_ref: string;
  faved: boolean;
}
