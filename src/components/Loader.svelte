
<div class="loader" />

<style>
  @media (max-width: 420px) {
    .loader {
      border: 5px solid #fff;
      border-radius: 50%;
      border-top: 5px solid #3b8df7;
      width: 30px;
      height: 30px;
      -webkit-animation: spin 1.5s linear infinite; /* Safari */
      animation: spin 1.5s linear infinite;
    }

    /* Safari */
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
  }
</style>
