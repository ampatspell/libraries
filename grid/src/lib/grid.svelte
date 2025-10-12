<script lang="ts" module>
  export const gridAlignments = ['center', 'bottom-left', 'bottom-center'] as const;

  export type GridAlignment = (typeof gridAlignments)[number];

  export const gridAlignmentLabels: { [key in GridAlignment]: string } = {
    center: 'Center',
    'bottom-left': 'Bottom left',
    'bottom-center': 'Bottom center',
  };

  export type GridOptions = {
    gap: number;
    alignment: GridAlignment;
    aspectRatio: number;
  };

  export type GridImage = {
    readonly url: string;
  };
</script>

<script lang="ts" generics="Image extends GridImage">
  import Image from './image.svelte';

  let {
    images,
    options,
    onSelect: _onSelect,
  }: {
    images: Image[];
    options: GridOptions;
    onSelect: (file: Image) => void;
  } = $props();

  let gap = $derived(options.gap);
  let gridWidth = $state<number>();

  let numberOfColumns = $derived.by(() => {
    if (gridWidth) {
      return Math.max(2, Math.floor(gridWidth / 200));
    }
  });

  let size = $derived.by(() => {
    if (gridWidth && numberOfColumns) {
      const w = gridWidth - gap * (numberOfColumns - 1);
      const size = w / numberOfColumns;
      const width = size;
      const height = width / options.aspectRatio;
      return {
        width,
        height,
      };
    }
  });

  let onSelect = (image: Image) => () => _onSelect(image);
</script>

{#if images.length > 0}
  <div class="grid" bind:clientWidth={gridWidth}>
    <div
      class="images"
      style:--gap="{gap}px"
      style:--width="{size?.width ?? 0}px"
      style:--height="{size?.height ?? 0}px"
    >
      {#each images as file (file)}
        <Image image={file} {options} onClick={onSelect(file)} />
      {/each}
    </div>
  </div>
{/if}

<style lang="scss">
  .grid {
    flex: 1;
    display: flex;
    flex-direction: column;
    > .images {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: var(--gap);
    }
  }
</style>
