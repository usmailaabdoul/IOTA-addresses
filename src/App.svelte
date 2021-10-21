<script lang="ts">
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  
  import AddressCard from "./components/AddressCard.svelte";
  import ActionButtons from "./components/ActionButtons.svelte";
  import Modal from "./components/Modal.svelte";
  import Loader from "./components/Loader.svelte";
  import type {AddressesProps} from './types/index';
  import { addresses } from './store/index';
  import manageAddress from "./api/index";
  import {
    addNewAddress, 
    exportAddress, 
    fetchAddress,
    addressesJob,
  } from './store/helpers/address';

  let addresses_value: AddressesProps[];
  let showModal: boolean = false;
  let type: "address" | "cvs";
  let title: string;
  let loading: boolean = false;

  addresses.subscribe(value => addresses_value = value);

  onMount(async () => {
    await manageAddress.connect();
    async function getAddress() {
      loading = true;
      await fetchAddress()
      loading = false;
    }
    getAddress();
    // await addressesJob()
  });

  const onSubmit = async (e) => {
    showModal = false;
    if (type == "address") {
      try {
        addNewAddress(e.detail);
      } catch (error) {
        console.log(error)
      }
    } else if (type == "cvs") {
      exportAddress(e.detail)
    }
  };

  const exportCVS = async () => {
    type = "cvs";
    title = "Export Address as CVS";
    showModal = true;
  };

  const removeAddress = (address, add) => {
    console.log(add);
    const newAddress = addresses_value.filter((a) => a.address !== address);
    addresses.update(() => newAddress)
  };

  const addAddress = () => {
    type = "address";
    title = "Add address with bech32 address";
    showModal = true;
  };

</script>

<main>
  {#if addresses_value && addresses_value.length > 0}
    <div class="addresses-container">
      <h2 class="addresses-header">Addresses</h2>
      {#each addresses_value as address}
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
      <Loader />
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
    disabledExport={addresses_value && addresses_value.length > 0}
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
