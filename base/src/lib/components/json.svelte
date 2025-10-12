<script lang="ts">
  let { data }: { data: unknown } = $props();

  let string = $derived.by(() => {
    try {
      return JSON.stringify(data, null, 2);
    } catch(err: unknown) {
      console.error((err as Error).stack);
    }
  });
</script>

<div class="json">{string}</div>

<style lang="scss">
  .json {
    font-family: monospace;
    white-space: pre-wrap;
    font-size: 12px;
  }
</style>
