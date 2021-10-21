<script lang="ts">
  import { createEventDispatcher } from "svelte";
  export let title: string;
  export let type: "address" | "cvs";

  const dispatcher = createEventDispatcher();

  const closeModal = () => {
    dispatcher("closeModal");
  };

  let value = "";

  const onSubmit = (e) => {
    e.preventDefault();
    dispatcher("onSubmit", value);
    value = "";
  };
</script>

<main class="main-wrapper">
  <div class="modal-close-btn">
    <button on:click={closeModal} class="icon-btn">X</button>
  </div>
  <div class="main-container">
    <h3 class="form-title">{title}</h3>
    <form class="form-container">
      <input
        class="form-input"
        type="text"
        placeholder={type === "address"
          ? "address"
          : "file name to download as"}
        bind:value
      />
      <!-- <input
        class="form-button"
        type="submit"
        placeholder="address"
        value=
      /> -->
      <div class="form-button-wrapper">
        <button class="form-button" on:click={onSubmit}>{type === "address" ? "Add Address" : "Download CVS file"}</button>
      </div>
    </form>
  </div>
</main>

<style>
  .main-wrapper {
    background-color: #ffffff;
    height: 55%;
    border-radius: 15px 15px 0 0;
  }
  .modal-close-btn {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 15px 20px;
  }

  .main-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
  }
  .form-title {
    text-align: center;
  }
  .form-container {
    display: flex;
    flex-direction: column;
    margin: 20px 20px 0 20px;
  }
  .form-input {
    border-radius: 5px;
    padding: 10px;
    color: #090909;
    margin: 15px 0px;
  }

  .form-button {
    border-radius: 5px;
    padding: 10px 20px;
    background-color: #3b8df7;
    border: none;
    color: #ffffff;
    font-size: 18px;
    font-weight: 500;
    width: 100%;
  }
</style>
