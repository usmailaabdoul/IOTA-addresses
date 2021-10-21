import type { IAddressResponse } from "@iota/iota.js";

export interface AddressesProps extends IAddressResponse {
  addressBech32?: string;
}

export interface ExportedAddressesProps {
  address: string;
  balance: number;
  addressType: string;
}


export interface CsvGeneratorProps {
  data: ExportedAddressesProps;
  headerKeys: string[];
  header: string[];
  fileName: string;
}