<script lang="ts">
  import aislopSvg from '$lib/assets/aislop.svg?raw';
  
  export let size: 'small' | 'medium' | 'large' = 'medium';
  export let showText = true;
  
  const sizes = {
    small: { icon: 32, text: 'text-xl' },
    medium: { icon: 40, text: 'text-2xl' },
    large: { icon: 48, text: 'text-3xl' }
  };
  
  const currentSize = sizes[size];
</script>

<div class="flex items-center gap-1">
  <div 
    class="{size === 'small' ? 'h-8 w-8' : size === 'medium' ? 'h-10 w-10' : 'h-12 w-12'}"
  >
    {@html aislopSvg}
  </div>
  
  {#if showText}
    <div class="{currentSize.text} font-medium tracking-tight text-black">
      cleanmyaislop
    </div>
  {/if}
</div>
