<div class="loader" />

<style>
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
