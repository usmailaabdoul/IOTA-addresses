import { Converter } from "@iota/util.js";
import { Bip32Path, Bip39 } from "@iota/crypto.js";
import {
  Bech32Helper,
  Ed25519Address,
  Ed25519Seed,
  ED25519_ADDRESS_TYPE,
  generateBip44Address,
  SingleNodeClient,
  INodeInfo,
  getBalance,
  IBip44GeneratorState,
} from "@iota/iota.js";
import type {AddressesProps} from '../types/index';

class ManageAddress {
  endpoint: string;
  client: SingleNodeClient;
  info: INodeInfo;
  seed: Ed25519Seed;

  constructor(endpoint) {
    this.endpoint = endpoint;
    this.client;
    this.info;
    this.seed;
  }

  async connect() {
    const client = new SingleNodeClient(this.endpoint);
    this.client = client;
    this.info = await client.info();
  }

  async generateRandomAddresses() {
    const randomMnemonic = Bip39.randomMnemonic();
    const baseSeed = Ed25519Seed.fromMnemonic(randomMnemonic);
    this.seed = baseSeed;
    // const seed = Converter.bytesToHex(baseSeed.toBytes())
    // console.log("\tSeed", seed);

    const addressGeneratorAccountState: IBip44GeneratorState = {
      accountIndex: 0,
      addressIndex: 0,
      isInternal: false
    };

    const Addresses: AddressesProps[] = [];
    
    for (let i = 0; i < 2; i++) {
      const path = generateBip44Address(addressGeneratorAccountState, i === 0);

      const addressSeed = baseSeed.generateSeedFromPath(new Bip32Path(path));
      const addressKeyPair = addressSeed.keyPair();

      const indexEd25519Address = new Ed25519Address(addressKeyPair.publicKey);
      const indexPublicKeyAddress = indexEd25519Address.toAddress();
      const address = Bech32Helper.toBech32(ED25519_ADDRESS_TYPE, indexPublicKeyAddress, this.info.bech32HRP)
    
      // console.log("\tAddress ", address)
      let addressDetails = await this.client.address(address)
      Addresses.push({...addressDetails, addressBech32: address});
      // console.log(
      //   "\tAddress details",
      //   addressDetails
      // );
    }

    return Addresses;
  }

  async addNewAddress(address: string) {
    let addressDetails = await this.client.address(address)

    const newAddress:AddressesProps = addressDetails;
    newAddress.addressBech32 = address
    return newAddress;
  }

  async updateAddress(addresses) {
    addresses.forEach(async (address) => {
      const newBalance = await getBalance(this.client, this.seed, 0);
      address.balance = newBalance;
    })

    console.log("Updated address", addresses)
    return addresses;
  }
}

const manageAddress = new ManageAddress("https://chrysalis-nodes.iota.org/");
export default manageAddress;
