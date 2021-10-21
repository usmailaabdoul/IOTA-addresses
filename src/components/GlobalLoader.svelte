<script lang="ts">
</script>

<div class="loader-container">
  <div class="loader"/>
</div>

<style>
  .loader-container {
    background-color: #00000070;
    z-index: 1000;
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .loader {
    border: 4px solid #fff;
    border-radius: 50%;
    border-top: 4px solid #3b8df7;
    width: 35px;
    height: 35px;
    -webkit-animation: spin 1.5s linear infinite;
    animation: spin 1.5s linear infinite;
  }
  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
