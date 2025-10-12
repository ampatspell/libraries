<script lang="ts">
  import './body.scss';

  let { children } = $props();
</script>

<div class="layout">
  {@render children()}
</div>

<style lang="scss">
  .layout {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
  }
</style>
