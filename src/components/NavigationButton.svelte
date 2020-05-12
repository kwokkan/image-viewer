<script>
	export let text;
  
  export function onClick() {
    
  }
</script>

<style>
  .navigation-button {
    border: 1px solid red;
  }
</style>

<button class="navigation-button" on:click="{onClick}">
  {text}
</button>
