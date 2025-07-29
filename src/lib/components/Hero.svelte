<script lang="ts">
  let role: 'client' | 'developer' = $state('client');
  let isSubmitting = $state(false);
  let isSubmitted = $state(false);
  
  // Form data
  let formData = $state({
    email: '',
    name: '',
    company: '',
    projectDescription: '',
    github: '',
    experience: ''
  });
  
  // Step tracking
  let currentStep = $state(0);
  let currentValue = $state('');
  
  // Define steps for each role
  const clientSteps = [
    { field: 'email', type: 'email', placeholder: 'Enter your email to get started', required: true },
    { field: 'name', type: 'text', placeholder: 'What\'s your name?', required: true },
    { field: 'company', type: 'text', placeholder: 'Company name (optional - press Enter to skip)', required: false },
    { field: 'projectDescription', type: 'text', placeholder: 'Briefly describe your AI code issues', required: true }
  ];
  
  const developerSteps = [
    { field: 'email', type: 'email', placeholder: 'Enter your email to get started', required: true },
    { field: 'name', type: 'text', placeholder: 'What\'s your name?', required: true },
    { field: 'github', type: 'url', placeholder: 'Your GitHub profile URL', required: true },
    { field: 'experience', type: 'text', placeholder: 'Your experience fixing AI code (e.g., "Fixed 50+ Replit apps")', required: true }
  ];
  
  let steps = $derived(role === 'client' ? clientSteps : developerSteps);
  let currentStepConfig = $derived(steps[currentStep]);
  let progressPercentage = $derived(((currentStep + 1) / steps.length) * 100);

  async function handleStepSubmit(event: Event) {
    event.preventDefault();
    
    // Skip optional fields if empty
    if (!currentStepConfig.required && !currentValue.trim()) {
      currentStep++;
      currentValue = '';
      return;
    }
    
    // Validate required fields
    if (currentStepConfig.required && !currentValue.trim()) return;
    
    // Save current value
    formData[currentStepConfig.field] = currentValue;
    
    // Move to next step or submit
    if (currentStep < steps.length - 1) {
      currentStep++;
      currentValue = formData[steps[currentStep].field] || '';
    } else {
      // Final submission
      isSubmitting = true;
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        // In production: await fetch('/api/waitlist', ...)
        isSubmitted = true;
      } finally {
        isSubmitting = false;
      }
    }
  }
  
  function goBack() {
    if (currentStep > 0) {
      currentStep--;
      currentValue = formData[steps[currentStep].field] || '';
    }
  }
  
  // Reset form when role changes
  $effect(() => {
    if (role) {
      currentStep = 0;
      currentValue = '';
      formData = {
        email: '',
        name: '',
        company: '',
        projectDescription: '',
        github: '',
        experience: ''
      };
    }
  });
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
        <h1 class="text-5xl lg:text-6xl font-medium text-white mb-8 leading-none text-balance tracking-tight">
          Get matched with developers who fix AI-generated <span class="text-emerald-400">code</span>
        </h1>
        
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
            
            <!-- Progress Bar Container (always rendered to prevent shift) -->
            <div class="mb-4 h-[41px] flex items-center justify-center" style="will-change: contents;">
              {#if currentStep === 0}
                <!-- Step 0: Welcome message -->
                <div class="text-center">
                  <p class="text-emerald-400 text-sm font-medium">
                    {#if role === 'client'}
                      Get a human expert when AI gets stuck
                    {:else}
                      Help vibe coders when AI fails
                    {/if}
                  </p>
                </div>
              {:else}
                <!-- Progress bar for steps 1+ -->
                <div class="w-full">
                  <div class="h-1 bg-gray-700/50 rounded-full overflow-hidden">
                    <div 
                      class="h-full bg-emerald-500 transition-all duration-300 ease-out"
                      style="width: {progressPercentage}%; will-change: width;"
                    ></div>
                  </div>
                  <div class="flex justify-between mt-2">
                    <button
                      type="button"
                      onclick={goBack}
                      class="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      ← Back
                    </button>
                    <span class="text-gray-400 text-xs">
                      Step {currentStep + 1} of {steps.length}
                    </span>
                  </div>
                </div>
              {/if}
            </div>
            
            <!-- Single Input Form -->
            <form onsubmit={handleStepSubmit} class="relative">
              <input
                type={currentStepConfig.type}
                bind:value={currentValue}
                placeholder={currentStepConfig.placeholder}
                required={currentStepConfig.required}
                autofocus
                class="w-full px-6 py-4 pr-32 rounded-full text-white placeholder-gray-400 bg-gray-700/50 border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg transition-all"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                class="absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-8 py-3 rounded-full font-medium transition-colors flex items-center gap-2"
              >
                {#if isSubmitting}
                  <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                {:else if currentStep === steps.length - 1}
                  Complete
                {:else}
                  Continue
                {/if}
              </button>
            </form>
            
            <p class="text-gray-400 text-sm text-center mt-4">
              {#if currentStep === 0}
                {#if role === 'client'}
                  We'll manually match you with pre-vetted developers within 48 hours
                {:else}
                  We'll review your profile and connect you with clients in 24-48 hours
                {/if}
              {:else}
                Press Enter to continue • {currentStepConfig.required ? 'Required' : 'Optional - press Enter to skip'}
              {/if}
            </p>
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
                  We'll send you a quick form to share your experience and GitHub. Our team will review and connect you with matching clients.
                {:else}
                  We'll send you a brief form about your project needs. Our team will hand-pick 2-3 developers who specialize in fixing your type of AI-generated code.
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
