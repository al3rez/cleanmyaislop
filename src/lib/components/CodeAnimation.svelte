<script lang="ts">
  import { onMount } from 'svelte';
  
  let codeLines: string[] = [];
  let currentLineIndex = 0;
  let showCursor = true;
  
  const messyCode = [
    '// AI-generated mess',
    'function getData() {',
    '  var data = [];',
    '  for (var i = 0; i < 100; i++) {',
    '    data.push(Math.random());',
    '    data.push(Math.random());',
    '    data.push(Math.random());',
    '  }',
    '  return data;',
    '}',
    '',
    '// TODO: fix this later',
    'async function processData(data) {',
    '  let result = null;',
    '  await fetch("/api/data")',
    '    .then(res => res.json())',
    '    .then(json => result = json)',
    '    .catch(err => console.log(err));',
    '  return result;',
    '}'
  ];
  
  const cleanCode = [
    '// Cleaned by human developer',
    'interface DataPoint {',
    '  id: string;',
    '  value: number;',
    '  timestamp: Date;',
    '}',
    '',
    'const generateData = (count: number): DataPoint[] => {',
    '  return Array.from({ length: count }, (_, i) => ({',
    '    id: crypto.randomUUID(),',
    '    value: Math.random() * 100,',
    '    timestamp: new Date()',
    '  }));',
    '};',
    '',
    'const fetchData = async <T>(endpoint: string): Promise<T> => {',
    '  try {',
    '    const response = await fetch(endpoint);',
    '    if (!response.ok) throw new Error(`HTTP ${response.status}`);',
    '    return await response.json();',
    '  } catch (error) {',
    '    console.error("Data fetch failed:", error);',
    '    throw error;',
    '  }',
    '};'
  ];
  
  onMount(() => {
    // Start with messy code
    let isShowingMessy = true;
    codeLines = [];
    
    // Typewriter effect for adding lines
    const typewriterInterval = setInterval(() => {
      const sourceCode = isShowingMessy ? messyCode : cleanCode;
      
      if (currentLineIndex < sourceCode.length) {
        codeLines = [...codeLines, sourceCode[currentLineIndex]];
        currentLineIndex++;
      } else {
        // Clear and switch to clean code
        if (isShowingMessy) {
          setTimeout(() => {
            codeLines = [];
            currentLineIndex = 0;
            isShowingMessy = false;
          }, 2000);
        } else {
          // Restart the cycle
          setTimeout(() => {
            codeLines = [];
            currentLineIndex = 0;
            isShowingMessy = true;
          }, 3000);
        }
      }
    }, 100);
    
    // Cursor blink
    const cursorInterval = setInterval(() => {
      showCursor = !showCursor;
    }, 500);
    
    return () => {
      clearInterval(typewriterInterval);
      clearInterval(cursorInterval);
    };
  });
</script>

<div class="relative w-full min-h-[400px]" style="will-change: contents;">
  <!-- Terminal window -->
  <div class="bg-gray-900 rounded-lg shadow-2xl overflow-hidden" style="will-change: transform;">
    <!-- Terminal header -->
    <div class="bg-gray-800 px-4 py-2 flex items-center gap-2">
      <div class="w-3 h-3 rounded-full bg-red-500"></div>
      <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
      <div class="w-3 h-3 rounded-full bg-green-500"></div>
      <span class="ml-3 text-xs text-gray-400 font-mono">code-cleanup.ts</span>
    </div>
    
    <!-- Code content -->
    <div class="p-4 font-mono text-sm h-[350px] overflow-y-auto">
      <div class="space-y-1" style="will-change: contents;">
        {#each codeLines as line, i}
          <div class="text-gray-300 whitespace-pre">
            {#if line.includes('// AI-generated mess')}
              <span class="text-red-400">{line}</span>
            {:else if line.includes('// Cleaned by human developer')}
              <span class="text-emerald-400">{line}</span>
            {:else if line.includes('TODO') || line.includes('var ') || line.includes('console.log')}
              <span class="text-orange-400">{line}</span>
            {:else if line.includes('interface') || line.includes('const ') || line.includes('async') || line.includes('function')}
              <span class="text-blue-400">{line}</span>
            {:else if line.includes('return') || line.includes('throw')}
              <span class="text-purple-400">{line}</span>
            {:else}
              {line}
            {/if}
          </div>
        {/each}
        {#if showCursor}
          <span class="inline-block w-2 h-4 bg-emerald-400 animate-pulse"></span>
        {/if}
      </div>
    </div>
  </div>
  
  <!-- Floating indicators -->
  <div class="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium animate-bounce" style="will-change: transform;">
    AI Slop
  </div>
  
  {#if codeLines.length > 0 && codeLines[0].includes('Cleaned')}
    <div class="absolute bottom-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-medium animate-bounce" style="will-change: transform;">
      Human Verified ✓
    </div>
  {/if}
</div>

<style>
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  div {
    animation: fadeIn 0.3s ease-out;
  }
</style>