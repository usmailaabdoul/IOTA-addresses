import manageAddress from "../../api/index";
import { addresses, globalLoader } from "../index";
import { csvGenerator } from "../../utils/generateCSV";
import type { ExportedAddressesProps } from "../../types/index";

export const addressesJob = async () => {
  let addresses_value;
  addresses.subscribe(value => addresses_value = value);
  setInterval(async () => {
    let updateAddress = await manageAddress.updateAddress(addresses_value);
    addresses.update(() => updateAddress);
  }, 5000);
}

export const fetchAddress = async () => {
  const res = await manageAddress.generateRandomAddresses();
  addresses.update(() => res);
}

export const addNewAddress = async (data: string) => {
  globalLoader.update(() => true);
  const newAddress = await manageAddress.addNewAddress(data);
  addresses.update(a => [newAddress, ...a])
  globalLoader.update(() => false);
}

export const exportAddress = async (fileName: string) => {
  let addresses_value;

	addresses.subscribe(value => addresses_value = value);
  let _addresses: ExportedAddressesProps = addresses_value.map((address) => ({
    address: address.address,
    balance: address.balance,
    addressType: address.addressType,
  }));
  let addressKeys: string[] = Object.keys(_addresses[0]);
  let addressHeader: string[] = ["Address", "Balance", "Address Type"];

  csvGenerator(_addresses, addressKeys, addressHeader, fileName);
}