<script lang="ts">
  import { Turnstile } from 'svelte-turnstile';
  import { env } from '$env/dynamic/public';
  
  const PUBLIC_TURNSTILE_SITE_KEY = env.PUBLIC_TURNSTILE_SITE_KEY || '';
  
  let role: 'client' | 'developer' = $state('client');
  let email = $state('');
  let isSubmitting = $state(false);
  let isSubmitted = $state(false);
  let error = $state('');
  let turnstileToken = $state('');

  function onTurnstileCallback(token: { detail: { token: string } }) {
    turnstileToken = token.detail.token;
  }

  async function handleSubmit(event: Event) {
    event.preventDefault();
    error = '';
    
    if (!email.trim()) return;
    
    isSubmitting = true;
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          role,
          turnstileToken
        })
      });

      const data = await response.json();

      if (!response.ok) {
        error = data.error || 'Something went wrong';
        return;
      }

      isSubmitted = true;
    } catch (err) {
      error = 'Network error. Please try again.';
    } finally {
      isSubmitting = false;
    }
  }
</script>

<section id="hero" class="relative lg:py-8 xl:py-12 lg:bg-gradient-to-b lg:from-white lg:to-white">
  <div class="lg:px-6 xl:px-8 lg:max-w-7xl lg:mx-auto">
    <!-- Mobile: Full-width, Desktop: Centered with rounded corners -->
    <div class="relative min-h-[400px] md:min-h-[450px] lg:min-h-[500px] xl:min-h-[550px] overflow-hidden lg:rounded-3xl lg:shadow-2xl">
      <!-- Background Image -->
      <div class="absolute inset-0">
        <img 
          src="/chatgpt.png" 
          alt="Developer working on code" 
          class="w-full h-full object-cover"
        />
        <!-- Dark overlay for text readability -->
        <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent lg:bg-gradient-to-r lg:from-gray-900/90 lg:via-gray-900/70 lg:to-transparent"></div>
      </div>
      
      <!-- Content -->
      <div class="relative z-10 h-full flex flex-col justify-center">
        <div class="px-6 py-8 lg:px-8 lg:py-12 xl:py-16 lg:max-w-7xl">
          <div class="lg:max-w-xl">
            <h1 class="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-medium text-white mb-4 md:mb-6 leading-tight text-balance tracking-tight relative">
              Hire the best developers who clean your 
              <span class="text-emerald-400" aria-label="AI slop">⟨AI slop⟩</span>
            </h1>
            <p class="text-lg md:text-xl text-gray-300 mb-6 md:mb-8">
              Before your AI deletes your production database
            </p>
        
            <!-- Waitlist Box -->
            <div class="bg-gray-800/60 backdrop-blur-md rounded-xl md:rounded-2xl p-6 md:p-8 border border-gray-700/50 min-h-[280px] md:min-h-[320px] flex flex-col justify-center">
            {#if !isSubmitted}
              <div class="w-full">
                <!-- Toggle Tabs -->
                <div class="flex rounded-full bg-gray-700/50 p-1 mb-4 md:mb-6">
                  <button
                    onclick={() => role = 'client'}
                    class="flex-1 py-2 md:py-3 px-4 md:px-6 rounded-full text-xs md:text-sm font-medium transition-all cursor-pointer {role === 'client' ? 'bg-white text-gray-900' : 'text-gray-300 hover:text-white'}"
                  >
                    I need developers
                  </button>
                  <button
                    onclick={() => role = 'developer'}
                    class="flex-1 py-2 md:py-3 px-4 md:px-6 rounded-full text-xs md:text-sm font-medium transition-all cursor-pointer {role === 'developer' ? 'bg-white text-gray-900' : 'text-gray-300 hover:text-white'}"
                  >
                    I am a developer
                  </button>
                </div>
                
                <!-- Simple Email Form -->
                <form onsubmit={handleSubmit} class="relative">
                  <input
                    id="waitlist-email"
                    type="email"
                    bind:value={email}
                    placeholder="Enter your email"
                    required
                    class="w-full px-4 md:px-6 py-3 md:py-4 pr-28 md:pr-32 rounded-full text-white placeholder-gray-400 bg-gray-700/50 border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-base md:text-lg transition-all"
                  />
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    class="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 md:px-6 py-2.5 md:py-3 rounded-full text-sm md:text-base font-medium transition-colors cursor-pointer"
                  >
                    {#if isSubmitting}
                      <svg class="animate-spin h-4 md:h-5 w-4 md:w-5" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    {:else}
                      <span class="hidden md:inline">Start fixing AI code now →</span>
                      <span class="md:hidden">Get Started →</span>
                    {/if}
                  </button>
                </form>
              
                {#if error}
                  <div class="mt-3 text-red-400 text-sm text-center">
                    {error}
                  </div>
                {/if}

                {#if PUBLIC_TURNSTILE_SITE_KEY}
                  <div class="mt-4 flex justify-center">
                    <Turnstile
                      siteKey={PUBLIC_TURNSTILE_SITE_KEY}
                      on:callback={onTurnstileCallback}
                      theme="dark"
                    />
                  </div>
                {/if}
              
                <div class="text-center mt-3 md:mt-4">
                  <p class="text-gray-400 text-xs md:text-sm">
                    {#if role === 'client'}
                      We'll manually match you with pre-vetted developers within 48 hours
                    {:else}
                      We'll review your profile and connect you with clients in 24-48 hours
                    {/if}
                  </p>
                </div>
              </div>
            {:else}
              <!-- Success Message -->
              <div class="text-center w-full">
                <div class="w-12 md:w-16 h-12 md:h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <svg class="w-6 md:w-8 h-6 md:h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 class="text-lg md:text-xl font-semibold text-white mb-2">Perfect! Check your email</h3>
                <p class="text-gray-400 text-sm md:text-base">
                  {#if role === 'developer'}
                    We'll send you next steps to complete your developer profile. Our team will review and connect you with matching clients.
                  {:else}
                    We'll reach out within 24 hours to understand your project needs and match you with the right developers.
                  {/if}
                </p>
              </div>
            {/if}
            
            <!-- Platform Logos -->
            <div class="mt-4 md:mt-6 flex items-center gap-3 md:gap-4 justify-center">
              <div class="p-2 md:p-3 bg-white rounded-full">
                <img src="https://www.google.com/s2/favicons?domain=replit.com&sz=32" alt="Replit" class="h-5 md:h-6 w-5 md:w-6" />
              </div>
              <div class="p-2 md:p-3 bg-white rounded-full">
                <img src="https://www.google.com/s2/favicons?domain=lovable.dev&sz=32" alt="Lovable" class="h-5 md:h-6 w-5 md:w-6" />
              </div>
              <div class="p-2 md:p-3 bg-white rounded-full">
                <img src="https://www.google.com/s2/favicons?domain=v0.dev&sz=32" alt="v0" class="h-5 md:h-6 w-5 md:w-6" />
              </div>
              <div class="p-2 md:p-3 bg-white rounded-full">
                <img src="https://www.google.com/s2/favicons?domain=cursor.sh&sz=32" alt="Cursor" class="h-5 md:h-6 w-5 md:w-6" />
              </div>
              <div class="p-2 md:p-3 bg-white rounded-full">
                <img src="https://www.google.com/s2/favicons?domain=github.com&sz=32" alt="GitHub" class="h-5 md:h-6 w-5 md:w-6" />
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
