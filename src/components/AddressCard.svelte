<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatcher = createEventDispatcher();

  export let address: string;
  export let balance: number;

  const removeAddress = () => {
    dispatcher("removeAddress");
  };
</script>

<main class="main-container">
  <div class="address"><span class="address-text">{address}</span></div>
  <div class="balance">
    <p class="balance-heading">Balance</p>
    <span class="balance-text">${balance}</span>
  </div>
  <div class="remove-balance">
    <button on:click={removeAddress} class="icon-btn btn-danger">X</button>
  </div>
</main>

<style>
  .main-container {
    background-color: #ffffff;
    margin: 10px 15px;
    padding: 10px;
    border-radius: 10px;
    height: 40px;

    display: flex;
    align-items: center;

    box-shadow: 2px 2px 4px 2px #3b8df709;
  }

  .address {
    flex: 3;
    display: flex;
    align-items: center;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .address-text {
    color: #3b8df7;
    font-size: 14px;
  }
  .balance {
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .balance-heading {
    margin: 0;
    font-size: 14px;
  }
  .balance-text {
    font-size: 18px;
    font-weight: 700;
    color: #3b8df7;
  }

  .remove-balance {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-end;
    margin: 0;
  }
</style>
