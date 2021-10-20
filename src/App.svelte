<script lang="ts">
  import { fly } from "svelte/transition";
  import AddressCard from "./components/AddressCard.svelte";
  import ActionButtons from "./components/ActionButtons.svelte";
  import Modal from "./components/Modal.svelte";
  import Spinner from "./components/Spinner.svelte";
  import manageAddress from "./api/index";
  import { onMount } from "svelte";
  import type { IAddressResponse } from "@iota/iota.js";
  import { csvGenerator } from "./utils/generateCVS";

  interface AddressesProps extends IAddressResponse {
    addressBech32?: string;
  }
  let addresses: AddressesProps[];
  let showModal: boolean = false;
  let type: "address" | "cvs";
  let title: string;
  let loading: boolean = false;

  onMount(async () => {
    async function getAddress() {
      loading = true;
      await manageAddress.connect();
      addresses = await manageAddress.generateRandomAddresses();
      loading = false;
      console.log(addresses);
    }
    getAddress();
  });

  const onSubmit = async (e) => {
    console.log(e.detail);
    showModal = false;
    if (type == "address") {
      try {
        const newAddress = await manageAddress.addNewAddress(e.detail);
        console.log(newAddress)
        addresses = [...addresses, newAddress];
      } catch (error) {
        console.log(error)
      }
    } else if (type == "cvs") {
      let _addresses = addresses.map((address) => ({
        address: address.address,
        balance: address.balance,
        addressType: address.addressType,
      }));
      let addressKeys = Object.keys(_addresses[0]);
      let addressHeader = ["Address", "Balance", "Address Type"];
      console.log("exportring cvs", addressKeys);
      csvGenerator(_addresses, addressKeys, addressHeader, e.detail);
    }
  };

  const exportCVS = () => {
    type = "cvs";
    title = "Export Address as CVS";
    showModal = true;
  };
  const removeAddress = (address, add) => {
    console.log(add);
    addresses = addresses.filter((a) => a.address !== address);
  };
  const addAddress = () => {
    type = "address";
    title = "Add new address";
    showModal = true;
  };
</script>

<main>
  {#if addresses && addresses.length > 0}
    <div class="addresses-container">
      <h2 class="addresses-header">Addresses</h2>
      {#each addresses as address}
        <AddressCard
          address={address.address}
          balance={address.balance}
          on:removeAddress={() => {
            removeAddress(address.address, address.addressBech32)
          }}
        />
      {/each}
    </div>
  {:else if loading}
    <div class="no-address-container">
      <Spinner />
    </div>
  {:else}
    <div class="no-address-container">No addresses added yet!</div>
  {/if}
  {#if showModal}
    <div
      class="add-address-wrapper"
      transition:fly={{ y: 1000, duration: 500 }}
    >
      <Modal
        on:closeModal={() => (showModal = false)}
        on:onSubmit={onSubmit}
        {title}
        {type}
      />
    </div>
  {/if}
  <ActionButtons
    on:addAddress={addAddress}
    on:exportCVS={exportCVS}
    disabledExport={addresses && addresses.length > 0}
  />
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .add-address-wrapper {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background-color: #00000090;

    overflow-y: hidden;
    max-height: 100%;

    transition-property: all;
    transition-duration: 0.5s;
    transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  }
  .addresses-container {
    padding-bottom: 60px;
  }

  .addresses-header {
    margin-left: 20px;
  }

  .no-address-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
  }
</style>
