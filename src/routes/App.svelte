<script lang="ts">
  import Hero from '$lib/components/Hero.svelte';
  import ServiceCategories from '$lib/components/ServiceCategories.svelte';
  import DeveloperCard from '$lib/components/DeveloperCard.svelte';
  import { mockDevelopers } from '$lib/mockData';
  
  // Get featured developers
  const featuredDevelopers = mockDevelopers.filter(dev => dev.featured).slice(0, 3);
  
  // Client logos
  const clientLogos = [
    "Microsoft", "Airbnb", "GoDaddy", "Glassdoor", 
    "Cisco", "Automatic", "Nasdaq", "P&G"
  ];
</script>

<div class="min-h-screen bg-white">
  <!-- Header -->
  <header class="py-8 px-6 lg:px-12">
  <div class="max-w-6xl mx-auto flex justify-between items-center">
    <div class="flex items-center space-x-3">
  <!-- Custom SVG Logo - Larger, no container -->
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="black" role="img" aria-label="CleanupMyAISlop icon mono" class="w-12 h-12 animate-pulse">
    <title>CleanupMyAISlop icon mono</title>
    <g transform="rotate(-15 32 32)">
      <rect x="16" y="14" width="32" height="30" rx="6"/>
      <circle cx="16" cy="29" r="5"/>
      <line x1="44" y1="14" x2="48" y2="6" stroke="black" stroke-width="4" stroke-linecap="round"/>
      <circle cx="48" cy="6" r="3"/>
      <!-- eye holes -->
      <circle cx="28" cy="26" r="3.5" fill="white"/>
      <circle cx="38" cy="26" r="3.5" fill="white"/>
      <!-- mouth/drip hole - orange for throw up -->
      <path d="M38 37c0 3-2 5-5 5h-2c-3 0-5 2-5 5v1h16v-3c0-3-2-5-4-8z" fill="#f97316"/>
    </g>
    <!-- pixel block - orange for slop -->
    <rect x="43" y="46" width="6" height="6" rx="1" fill="#f97316"/>
  </svg>
  <div class="text-2xl font-medium text-gray-900">
    CleanMyAISlop
  </div>
</div>
    <nav class="hidden md:flex space-x-8 text-gray-600">
      <a href="/developers" class="hover:text-gray-900 transition-colors">Browse Developers</a>
      <a href="#how-it-works" class="hover:text-gray-900 transition-colors">How It Works</a>
      <a href="#for-developers" class="hover:text-gray-900 transition-colors">For Developers</a>
    </nav>
  </div>
</header>

  <!-- Hero Section -->
  <Hero />

  <!-- Client Logos -->
  <section class="py-12 px-6 lg:px-12 bg-gray-50">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-8">
        <p class="text-sm text-gray-500 uppercase tracking-wider">Trusted by teams at</p>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center">
        {#each clientLogos as logo}
          <div class="text-gray-400 text-2xl font-bold opacity-50 hover:opacity-100 transition-opacity">
            {logo}
          </div>
        {/each}
      </div>
    </div>
  </section>
  
  <!-- Service Categories -->
  <ServiceCategories />


  <!-- Common AI Code Problems Section -->
  <section class="py-20 px-6 lg:px-12">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Why founders come to us
        </h2>
        <p class="text-xl text-gray-600">
          The most common AI code disasters we fix every day
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <svg class="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">"It worked in the demo"</h3>
          <p class="text-gray-600">AI code that breaks the moment real users touch it. Race conditions, edge cases, and state management nightmares.</p>
        </div>
        
        <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
            <svg class="w-8 h-8 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
              <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">"Looks good, works bad"</h3>
          <p class="text-gray-600">Beautifully formatted code that completely misses the business logic. Perfect syntax, wrong implementation.</p>
        </div>
        
        <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
            <svg class="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Can't scale past MVP</h3>
          <p class="text-gray-600">Hardcoded everything. No proper architecture. Falls apart when you need to add features or handle more users.</p>
        </div>
        
        <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <svg class="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"/>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Performance disasters</h3>
          <p class="text-gray-600">Infinite re-renders, memory leaks, and O(n³) algorithms. Your app slows to a crawl with real data.</p>
        </div>
        
        <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg class="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm14 1a1 1 0 11-2 0 1 1 0 012 0zM2 13a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2zm14 1a1 1 0 11-2 0 1 1 0 012 0z" clip-rule="evenodd"/>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Platform lock-in</h3>
          <p class="text-gray-600">Stuck on Replit or v0 with no clear path to real hosting. Vendor-specific code everywhere.</p>
        </div>
        
        <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div class="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-4">
            <svg class="w-8 h-8 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clip-rule="evenodd"/>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Security nightmares</h3>
          <p class="text-gray-600">API keys in frontend code. No input validation. SQL injection waiting to happen. Amateur hour security.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Featured Developers Section -->
  <section id="featured" class="py-20 px-6 lg:px-12">
    <div class="max-w-6xl mx-auto">
      <div class="mb-16">
        <span class="text-sm font-medium text-red-500 bg-red-50 px-3 py-1 rounded-full mb-4 inline-block">
          Featured Developers
        </span>
        <h2 class="text-4xl font-bold text-gray-900 mb-4">
          Top-rated developers who specialize in AI cleanup
        </h2>
        <p class="text-xl text-gray-600">
          Verified experts with proven track records of rescuing founders from debugging hell
        </p>
      </div>
      
      <!-- Featured Developer Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {#each featuredDevelopers as developer}
          <DeveloperCard {developer} />
        {/each}
      </div>
      
      <div class="text-center">
        <a 
          href="/developers" 
          class="inline-flex items-center text-red-600 hover:text-red-700 font-medium"
        >
          View all developers
          <svg class="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </a>
      </div>
    </div>
  </section>

  <!-- How It Works Section -->
  <section id="how-it-works" class="py-20 px-6 lg:px-12">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          How it works
        </h2>
        <p class="text-xl text-gray-600">
          Get your AI-generated code fixed in 3 simple steps
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="text-center">
          <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span class="text-3xl font-bold text-green-600">1</span>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">Post your project</h3>
          <p class="text-gray-600">Describe your AI code issues, platform (Replit, v0, Cursor), and budget</p>
        </div>
        
        <div class="text-center">
          <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span class="text-3xl font-bold text-green-600">2</span>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">Get proposals</h3>
          <p class="text-gray-600">Receive quotes from verified developers who specialize in AI cleanup</p>
        </div>
        
        <div class="text-center">
          <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span class="text-3xl font-bold text-green-600">3</span>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">Ship clean code</h3>
          <p class="text-gray-600">Work with your developer to transform AI slop into production-ready code</p>
        </div>
      </div>
    </div>
  </section>

  <!-- For Developers Section -->
  <section id="for-developers" class="py-20 px-6 lg:px-12 bg-gray-50">
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            For developers: Turn AI cleanup into steady income
          </h2>
          <p class="text-xl text-gray-600 mb-8">
            Join the growing market of developers specializing in fixing AI-generated code. Set your own rates, choose your clients, and build your reputation.
          </p>
          <ul class="space-y-4 mb-8">
            <li class="flex items-start">
              <svg class="w-6 h-6 text-green-600 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              <div>
                <span class="font-semibold text-gray-900">Average $125/hour</span> for experienced AI cleanup specialists
              </div>
            </li>
            <li class="flex items-start">
              <svg class="w-6 h-6 text-green-600 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              <div>
                <span class="font-semibold text-gray-900">Direct client relationships</span> - no middleman fees
              </div>
            </li>
            <li class="flex items-start">
              <svg class="w-6 h-6 text-green-600 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              <div>
                <span class="font-semibold text-gray-900">Growing demand</span> as more startups use AI tools
              </div>
            </li>
          </ul>
          <button class="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors">
            Apply to Join
          </button>
        </div>
        <div class="bg-white p-8 rounded-2xl shadow-lg">
          <div class="flex items-center gap-4 mb-6">
            <img src="/placeholder.svg?height=64&width=64" alt="Developer avatar" class="w-16 h-16 rounded-full" />
            <div>
              <h3 class="font-semibold text-gray-900">Sarah Chen</h3>
              <p class="text-gray-600">Senior Full Stack Developer</p>
            </div>
          </div>
          <blockquote class="text-gray-700 italic mb-4">
            "I've made over $40k in the last 3 months just fixing AI-generated React code. The demand is insane - founders are desperate for developers who can untangle the mess AI creates."
          </blockquote>
          <div class="flex items-center gap-6 text-sm">
            <span class="text-gray-600">⭐ 4.9/5 rating</span>
            <span class="text-gray-600">27 projects completed</span>
          </div>
        </div>
      </div>
    </div>
  </section>


  <!-- Final CTA -->
  <section class="py-20 px-6 lg:px-12 bg-gradient-to-br from-green-600 to-green-700 text-white">
    <div class="max-w-4xl mx-auto text-center">
      <h2 class="text-3xl lg:text-4xl font-bold mb-6">
        Find developers who can fix AI-generated code today
      </h2>
      
      <p class="text-xl mb-8 opacity-90">
        Join thousands of founders who've successfully migrated off AI platforms
      </p>
      
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <a href="/developers" class="bg-white text-green-700 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-medium transition-colors">
          Browse Developers
        </a>
        <button class="bg-transparent border-2 border-white text-white hover:bg-white hover:text-green-700 px-8 py-4 rounded-lg text-lg font-medium transition-colors">
          Apply as Developer
        </button>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="py-12 px-6 lg:px-12 border-t border-gray-100">
  <div class="max-w-6xl mx-auto flex justify-between items-center">
    <div class="flex items-center space-x-3">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="black" role="img" aria-label="CleanupMyAISlop icon mono" class="w-10 h-10">
    <title>CleanupMyAISlop icon mono</title>
    <g transform="rotate(-15 32 32)">
      <rect x="16" y="14" width="32" height="30" rx="6"/>
      <circle cx="16" cy="29" r="5"/>
      <line x1="44" y1="14" x2="48" y2="6" stroke="black" stroke-width="4" stroke-linecap="round"/>
      <circle cx="48" cy="6" r="3"/>
      <!-- eye holes -->
      <circle cx="28" cy="26" r="3.5" fill="white"/>
      <circle cx="38" cy="26" r="3.5" fill="white"/>
      <!-- mouth/drip hole - orange for throw up -->
      <path d="M38 37c0 3-2 5-5 5h-2c-3 0-5 2-5 5v1h16v-3c0-3-2-5-4-8z" fill="#f97316"/>
    </g>
    <!-- pixel block - orange for slop -->
    <rect x="43" y="46" width="6" height="6" rx="1" fill="#f97316"/>
  </svg>
  <div class="text-xl font-medium text-gray-900">
    CleanMyAISlop
  </div>
</div>
    <div class="text-gray-500">
      © 2025 We fix what AI breaks.
    </div>
  </div>
</footer>
</div>
