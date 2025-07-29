<script lang="ts">
  let role: 'client' | 'developer' = $state('client');
  let email = $state('');
  let isSubmitting = $state(false);
  let isSubmitted = $state(false);

  async function handleSubmit(event: Event) {
    event.preventDefault();
    
    if (!email.trim()) return;
    
    isSubmitting = true;
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In production: await fetch('/api/waitlist', { email, role })
      isSubmitted = true;
    } finally {
      isSubmitting = false;
    }
  }
</script>

<section id="hero" class="relative py-8 lg:py-12 bg-gradient-to-b from-white to-white">
  <div class="max-w-7xl mx-auto px-6 lg:px-8">
    <!-- Centered hero with background image -->
    <div class="relative min-h-[600px] lg:min-h-[700px] overflow-hidden rounded-3xl shadow-2xl">
    <!-- Background Image -->
    <div class="absolute inset-0">
      <img 
        src="/chatgpt.png" 
        alt="Developer working on code" 
        class="w-full h-full object-cover"
      />
      <!-- Dark overlay for text readability -->
      <div class="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-transparent"></div>
    </div>
    
    <!-- Content -->
    <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
      <div class="max-w-xl">
        <h1 class="text-5xl lg:text-6xl font-medium text-white mb-6 leading-none text-balance tracking-tight">
          Hire developers who clean up your <span class="text-emerald-400">AI slop</span>
        </h1>
        <p class="text-xl text-gray-300 mb-8">
          Join 500+ founders who escaped AI code disasters
        </p>
        
        <!-- Waitlist Box -->
        <div class="bg-gray-800/60 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50">
          {#if !isSubmitted}
            <!-- Toggle Tabs -->
            <div class="flex rounded-full bg-gray-700/50 p-1 mb-6">
              <button
                onclick={() => role = 'client'}
                class="flex-1 py-3 px-6 rounded-full text-sm font-medium transition-all {role === 'client' ? 'bg-white text-gray-900' : 'text-gray-300 hover:text-white'}"
              >
                I need developers
              </button>
              <button
                onclick={() => role = 'developer'}
                class="flex-1 py-3 px-6 rounded-full text-sm font-medium transition-all {role === 'developer' ? 'bg-white text-gray-900' : 'text-gray-300 hover:text-white'}"
              >
                I am a developer
              </button>
            </div>
            
            
            <!-- Simple Email Form -->
            <form onsubmit={handleSubmit} class="relative">
              <input
                type="email"
                bind:value={email}
                placeholder="Enter your email"
                required
                class="w-full px-6 py-4 pr-32 rounded-full text-white placeholder-gray-400 bg-gray-700/50 border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg transition-all"
              />
              
              <button
                type="submit"
                disabled={isSubmitting}
                class="absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-full font-medium transition-colors"
              >
                {#if isSubmitting}
                  <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                {:else}
                  Join Waitlist
                {/if}
              </button>
            </form>
            
            <div class="text-center mt-4">
              <p class="text-gray-400 text-sm">
                {#if role === 'client'}
                  We'll manually match you with pre-vetted developers within 48 hours
                {:else}
                  We'll review your profile and connect you with clients in 24-48 hours
                {/if}
              </p>
            </div>
          {:else}
            <!-- Success Message -->
            <div class="text-center py-8">
              <div class="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-white mb-2">Perfect! Check your email</h3>
              <p class="text-gray-400">
                {#if role === 'developer'}
                  We'll send you next steps to complete your developer profile. Our team will review and connect you with matching clients.
                {:else}
                  We'll reach out within 24 hours to understand your project needs and match you with the right developers.
                {/if}
              </p>
            </div>
          {/if}
          
          <!-- Platform Logos -->
          <div class="mt-6 flex items-center gap-4 justify-center">
            <div class="p-3 bg-white rounded-full">
              <img src="https://www.google.com/s2/favicons?domain=replit.com&sz=32" alt="Replit" class="h-6 w-6" />
            </div>
            <div class="p-3 bg-white rounded-full">
              <img src="https://www.google.com/s2/favicons?domain=lovable.dev&sz=32" alt="Lovable" class="h-6 w-6" />
            </div>
            <div class="p-3 bg-white rounded-full">
              <img src="https://www.google.com/s2/favicons?domain=v0.dev&sz=32" alt="v0" class="h-6 w-6" />
            </div>
            <div class="p-3 bg-white rounded-full">
              <img src="https://www.google.com/s2/favicons?domain=cursor.sh&sz=32" alt="Cursor" class="h-6 w-6" />
            </div>
            <div class="p-3 bg-white rounded-full">
              <img src="https://www.google.com/s2/favicons?domain=github.com&sz=32" alt="GitHub" class="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</section>
