<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  export let disabledExport: boolean;
  console.log(disabledExport);
  const dispatcher = createEventDispatcher()

  const addAddress = () => {
    dispatcher('addAddress');
  }

  const exportCVS = () => {
    dispatcher('exportCVS');
  }
</script>

<main class="action-btns">
  <div class="action-btn-wrapper">
    <button class="action-btn" on:click={exportCVS} disabled={!disabledExport} >Export as CVS</button>
  </div>
  <div class="action-btn-wrapper2">
    <button class="action-btn" on:click={addAddress}>Add new address</button>
  </div>
</main>

<style>
	@media (max-width: 420px) {
		.action-btns {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
      background-color: #3b8df7;
      position: fixed;
      bottom: 0;
      width: 100%;
      padding-top: 10px
    }
    .action-btn-wrapper {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: flex-end;
      margin: 0;
      margin-right: 10px;
    }
    .action-btn {
      padding: 12px 15px;
      border: none;
      font-size: 16px;
      font-weight: 500;
    }

    .action-btn-wrapper2 {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: flex-start;
      margin: 0;
      margin-left: 10px;
    }
	}
</style>