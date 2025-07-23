<script lang="ts">
  import { onMount } from 'svelte';
  
  let codeLines: string[] = [];
  let currentLineIndex = 0;
  let showCursor = true;
  let isShowingMessy = true;
  
  const messyCode = [
    '// AI-generated code problems:',
    '',
    '// 🚨 EXPOSED SECRET KEYS',
    'STRIPE_KEY = "sk_live_1234567890"',
    'DATABASE_PASSWORD = "admin123"',
    'API_TOKEN = "secret_token_xyz"',
    '',
    '// 🚨 SECURITY HOLE - Anyone can delete data!',
    'when user visits: /delete-user/123',
    '  → directly delete user 123',
    '  → no permission check',
    '  → no confirmation',
    '',
    '// 🚨 SENDING PASSWORDS IN EMAILS',
    'send_email_to_user:',
    '  subject: "Your account"',
    '  body: "Your password is: " + password',
    '',
    '// 🚨 NO ERROR HANDLING',
    'process_payment:',
    '  charge_credit_card()',
    '  // What if payment fails?',
    '  // Customer charged but no product!',
    '',
    '// 🚨 HARDCODED LIMITS',
    'MAX_USERS = 100',
    'SERVER = "localhost:3000"'
  ];
  
  const cleanCode = [
    '// Fixed by professional developer:',
    '',
    '// ✅ SECURE ENVIRONMENT VARIABLES',
    'STRIPE_KEY = load_from_secure_vault()',
    'DATABASE_PASSWORD = encrypted_env_variable',
    'API_TOKEN = rotate_every_30_days()',
    '',
    '// ✅ PROPER AUTHENTICATION',
    'when user visits: /delete-user/123',
    '  → check if user is logged in',
    '  → verify user owns this account',
    '  → require email confirmation',
    '  → log this action for audit',
    '',
    '// ✅ SECURE PASSWORD HANDLING',
    'send_email_to_user:',
    '  → send password reset link',
    '  → link expires in 1 hour',
    '  → one-time use only',
    '',
    '// ✅ ROBUST ERROR HANDLING',
    'process_payment:',
    '  try:',
    '    charge_credit_card()',
    '    send_confirmation_email()',
    '  if payment fails:',
    '    refund_customer()',
    '    notify_support_team()',
    '',
    '// ✅ SCALABLE CONFIGURATION',
    'MAX_USERS = unlimited',
    'SERVER = auto_scaling_cloud()'
  ];
  
  onMount(() => {
    // Start with messy code
    isShowingMessy = true;
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
            {#if line.includes('// AI-generated') || line.includes('// Fixed by')}
              <span class="text-emerald-400 font-semibold">{line}</span>
            {:else if line.includes('🚨')}
              <span class="text-red-400 font-bold">{line}</span>
            {:else if line.includes('✅')}
              <span class="text-emerald-400 font-bold">{line}</span>
            {:else if line.includes('sk_live_') || line.includes('admin123') || line.includes('secret_token')}
              <span class="text-red-300 bg-red-900/30">{line}</span>
            {:else if line.includes('What if') || line.includes('Customer charged')}
              <span class="text-orange-300 italic">{line}</span>
            {:else if line.includes('→')}
              <span class="text-gray-400">{line}</span>
            {:else if line.includes('when user') || line.includes('send_email') || line.includes('process_payment')}
              <span class="text-blue-400">{line}</span>
            {:else if line.includes('try:') || line.includes('if payment fails:')}
              <span class="text-purple-400">{line}</span>
            {:else if line.includes('load_from_secure_vault') || line.includes('encrypted_env_variable') || line.includes('auto_scaling_cloud')}
              <span class="text-green-400">{line}</span>
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
  {#if isShowingMessy && codeLines.length > 0}
    <div class="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium animate-bounce" style="will-change: transform;">
      AI Slop
    </div>
  {/if}
  
  {#if !isShowingMessy && codeLines.length > 0}
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