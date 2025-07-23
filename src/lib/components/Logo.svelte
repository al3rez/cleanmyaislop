<script lang="ts">
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
  <img 
    src="/aislop.svg"
    alt="CleanAISlop logo"
    width={currentSize.icon}
    height={currentSize.icon}
    class="{size === 'small' ? 'h-8' : size === 'medium' ? 'h-10' : 'h-12'}"
  />
  
  {#if showText}
    <div class="{currentSize.text} tracking-tight text-black">
      <span class="text-emerald-600">clean</span>myaislop
    </div>
  {/if}
</div>
