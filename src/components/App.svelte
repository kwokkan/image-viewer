<script>
  import NavigationButton from "./NavigationButton.svelte";

  export let name;
</script>

<style>
  .title {
    font-weight: bold;
  }
</style>

<div class="title">
  <NavigationButton text="<" />
  
  Image viewer for {name}
  
  <NavigationButton text=">" />
</div>
