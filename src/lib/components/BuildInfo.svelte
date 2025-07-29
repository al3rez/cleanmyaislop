<script lang="ts">
  import { onMount } from 'svelte';
  
  let buildTime = '';
  let commitHash = '';
  
  onMount(() => {
    // These will be replaced at build time
    buildTime = '__BUILD_TIME__';
    commitHash = '__COMMIT_HASH__';
  });
</script>

<!-- Subtle build info in bottom right corner -->
<div class="fixed bottom-2 right-2 text-[10px] text-gray-600 font-mono opacity-30 hover:opacity-60 transition-opacity select-none pointer-events-none">
  {#if buildTime && buildTime !== '__BUILD_TIME__'}
    <span title="Build timestamp">{buildTime}</span>
  {/if}
  {#if commitHash && commitHash !== '__COMMIT_HASH__'}
    <span class="ml-1" title="Commit">#{commitHash}</span>
  {/if}
</div>