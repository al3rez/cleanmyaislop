<script lang="ts">
  import Hero from '$lib/components/Hero.svelte';
  import DeveloperCard from '$lib/components/DeveloperCard.svelte';
  import Logo from '$lib/components/Logo.svelte';
  import CodeAnimation from '$lib/components/CodeAnimation.svelte';
  import { mockDevelopers } from '$lib/mockData';
  
  // Get featured developers
  const featuredDevelopers = mockDevelopers.filter(dev => dev.featured).slice(0, 3);
  
  // Client logos
  const clientLogos = [
    { name: "Microsoft", domain: "microsoft.com" },
    { name: "Airbnb", domain: "airbnb.com" },
    { name: "GoDaddy", domain: "godaddy.com" },
    { name: "Glassdoor", domain: "glassdoor.com" },
    { name: "Cisco", domain: "cisco.com" },
    { name: "Automattic", domain: "automattic.com" },
    { name: "Nasdaq", domain: "nasdaq.com" },
    { name: "Meta", domain: "meta.com" }
  ];
</script>

<div class="min-h-screen bg-white">
  <!-- Header -->
  <header class="py-3 px-6 lg:px-8 border-b border-gray-200 bg-white">
    <div class="max-w-7xl mx-auto flex justify-between items-center">
      <div class="flex items-center">
        <Logo size="medium" />
        <nav class="hidden md:flex items-center space-x-8 ml-12">
          <a href="/developers" class="text-gray-600 hover:text-gray-900 font-medium transition-colors">Find Talent</a>
          <a href="#how-it-works" class="text-gray-600 hover:text-gray-900 font-medium transition-colors">How It Works</a>
          <a href="#for-developers" class="text-gray-600 hover:text-gray-900 font-medium transition-colors">For Developers</a>
        </nav>
      </div>
      <div class="flex items-center gap-4">
        <button class="text-gray-700 hover:text-gray-900 font-medium">Log in</button>
        <button class="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors">Sign up</button>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <Hero />

  <!-- Client Logos Infinite Scroll -->
  <section class="relative px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-8">
        <p class="text-sm text-gray-500 uppercase tracking-wider font-medium">Founders we've rescued from AI chaos</p>
      </div>
      <div class="relative overflow-hidden">
        <!-- Left blur gradient -->
        <div class="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none"></div>
        
        <!-- Right blur gradient -->
        <div class="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none"></div>
        
        <!-- Scrolling content -->
        <div class="flex animate-scroll">
          <div class="flex gap-12 pr-12">
            {#each clientLogos as company}
              <div class="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity whitespace-nowrap">
                <img 
                  src="https://www.google.com/s2/favicons?domain={company.domain}&sz=32" 
                  alt="{company.name} logo" 
                  class="h-8 w-8"
                />
                <span class="text-gray-700 font-medium text-lg">{company.name}</span>
              </div>
            {/each}
          </div>
          <div class="flex gap-12 pr-12">
            {#each clientLogos as company}
              <div class="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity whitespace-nowrap">
                <img 
                  src="https://www.google.com/s2/favicons?domain={company.domain}&sz=32" 
                  alt="{company.name} logo" 
                  class="h-8 w-8"
                />
                <span class="text-gray-700 font-medium text-lg">{company.name}</span>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Feature Cards Section -->
  <section class="relative py-20 px-6 lg:px-8 bg-gradient-to-b from-white via-gray-50/50 to-white">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-10 tracking-tight">How we help you escape AI platform lock-in</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Feature Card 1 - Replit -->
        <a href="/developers?platform=replit" class="group">
          <div class="bg-white rounded-xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.08)] hover:shadow-[0_0_30px_rgba(0,0,0,0.12)] transition-all transform hover:-translate-y-1">
            <div class="flex items-center mb-4">
              <img src="https://www.google.com/s2/favicons?domain=replit.com&sz=32" alt="Replit" class="h-8 w-8" />
              <span class="ml-2 text-xs font-medium text-gray-500 uppercase tracking-wider">From Replit</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Take your app off Replit</h3>
            <p class="text-gray-600 text-sm">Deploy to real hosting, add proper CI/CD, and escape the container limits</p>
          </div>
        </a>

        <!-- Feature Card 2 - Lovable/v0 -->
        <a href="/developers?platform=lovable" class="group">
          <div class="bg-white rounded-xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.08)] hover:shadow-[0_0_30px_rgba(0,0,0,0.12)] transition-all transform hover:-translate-y-1">
            <div class="flex items-center mb-4">
              <img src="https://www.google.com/s2/favicons?domain=lovable.dev&sz=32" alt="Lovable" class="h-8 w-8" />
              <span class="ml-2 text-xs font-medium text-gray-500 uppercase tracking-wider">From Lovable/v0</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Polish the AI design</h3>
            <p class="text-gray-600 text-sm">Professional UI/UX, consistent styling, and proper responsive design</p>
          </div>
        </a>

        <!-- Feature Card 3 - Cursor -->
        <a href="/developers?platform=cursor" class="group">
          <div class="bg-white rounded-xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.08)] hover:shadow-[0_0_30px_rgba(0,0,0,0.12)] transition-all transform hover:-translate-y-1">
            <div class="flex items-center mb-4">
              <img src="https://www.google.com/s2/favicons?domain=cursor.sh&sz=32" alt="Cursor" class="h-8 w-8" />
              <span class="ml-2 text-xs font-medium text-gray-500 uppercase tracking-wider">From Cursor</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Optimize performance</h3>
            <p class="text-gray-600 text-sm">Fix memory leaks, reduce bundle size, and implement proper caching</p>
          </div>
        </a>

        <!-- Feature Card 4 - General -->
        <a href="/developers" class="group">
          <div class="bg-white rounded-xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.08)] hover:shadow-[0_0_30px_rgba(0,0,0,0.12)] transition-all transform hover:-translate-y-1">
            <div class="flex items-center mb-4">
              <svg class="h-8 w-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <span class="ml-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Clean Code</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Ship to production</h3>
            <p class="text-gray-600 text-sm">Code reviews, tests, GitHub workflows, and proper documentation</p>
          </div>
        </a>
      </div>
    </div>
  </section>

  <!-- Code Animation Section -->
  <section class="relative py-20 px-6 lg:px-8 bg-gradient-to-b from-white via-gray-50/30 to-gray-50">
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Left column - Text -->
        <div>
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Before someone tweets your exposed API keys
          </h2>
          <p class="text-xl text-gray-600 mb-8">
            We fix AI slop before hackers access your waitlist, steal your OpenAI keys, or your site becomes a viral coding fail
          </p>
          
          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span class="text-red-600 text-sm">⚠️</span>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900">Security vulnerabilities</h3>
                <p class="text-gray-600">AI exposes API keys, passwords, and creates SQL injection risks</p>
              </div>
            </div>
            
            <div class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span class="text-orange-600 text-sm">🐛</span>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900">No error handling</h3>
                <p class="text-gray-600">Payment failures, data loss, and crashes in production</p>
              </div>
            </div>
            
            <div class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span class="text-emerald-600 text-sm">✓</span>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900">Professional fixes</h3>
                <p class="text-gray-600">Secure, scalable, and properly tested code</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Right column - Animation -->
        <div>
          <CodeAnimation />
        </div>
      </div>
    </div>
  </section>



  <!-- Common AI Code Problems Section -->
  <section class="relative py-20 px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
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
          <div class="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
            <svg class="w-8 h-8 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
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
  <section id="featured" class="relative py-20 px-6 lg:px-8 bg-gradient-to-b from-white via-gray-50 to-white">
    <div class="max-w-6xl mx-auto">
      <div class="mb-16">
        <span class="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full mb-4 inline-block">
          Featured Developers
        </span>
        <h2 class="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
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
          class="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
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
  <section id="how-it-works" class="py-20 px-6 lg:px-8">
    <div class="max-w-5xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
          How it works
        </h2>
        <p class="text-xl text-gray-600">
          Get your AI-generated code fixed in 3 simple steps
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="text-center">
          <div class="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span class="text-3xl font-bold text-emerald-600">1</span>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">Post your project</h3>
          <p class="text-gray-600">Describe your AI code issues, platform (Replit, v0, Cursor), and budget</p>
        </div>
        
        <div class="text-center">
          <div class="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span class="text-3xl font-bold text-emerald-600">2</span>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">Get proposals</h3>
          <p class="text-gray-600">Receive quotes from verified developers who specialize in AI cleanup</p>
        </div>
        
        <div class="text-center">
          <div class="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span class="text-3xl font-bold text-emerald-600">3</span>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">Ship clean code</h3>
          <p class="text-gray-600">Work with your developer to transform AI slop into production-ready code</p>
        </div>
      </div>
    </div>
  </section>

  <!-- For Developers Section -->
  <section id="for-developers" class="relative py-20 px-6 lg:px-8 bg-gradient-to-b from-white via-gray-50 to-white">
    <div class="max-w-5xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 tracking-tight">
            For developers: Turn AI cleanup into steady income
          </h2>
          <p class="text-xl text-gray-600 mb-8">
            Join the growing market of developers specializing in fixing AI-generated code. Set your own rates, choose your clients, and build your reputation.
          </p>
          <ul class="space-y-4 mb-8">
            <li class="flex items-start">
              <svg class="w-6 h-6 text-emerald-600 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              <div>
                <span class="font-semibold text-gray-900">Average $125/hour</span> for experienced AI cleanup specialists
              </div>
            </li>
            <li class="flex items-start">
              <svg class="w-6 h-6 text-emerald-600 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              <div>
                <span class="font-semibold text-gray-900">Direct client relationships</span> - no middleman fees
              </div>
            </li>
            <li class="flex items-start">
              <svg class="w-6 h-6 text-emerald-600 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              <div>
                <span class="font-semibold text-gray-900">Growing demand</span> as more startups use AI tools
              </div>
            </li>
          </ul>
          <button class="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors">
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
  <section class="py-20 px-6 lg:px-8 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white">
    <div class="max-w-3xl mx-auto text-center">
      <h2 class="text-3xl lg:text-4xl font-bold mb-6 tracking-tight">
        Find developers who can clean AI-generated code today
      </h2>
      
      <p class="text-xl mb-8 opacity-90">
        Join thousands of founders who've successfully migrated off AI platforms
      </p>
      
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <a href="/developers" class="bg-white text-emerald-700 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-medium transition-colors">
          Browse Developers
        </a>
        <button class="bg-transparent border-2 border-white text-white hover:bg-white hover:text-emerald-700 px-8 py-4 rounded-lg text-lg font-medium transition-colors">
          Apply as Developer
        </button>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="py-20 px-6 lg:px-8 border-t border-gray-200 bg-gradient-to-b from-white to-gray-50">
    <div class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
      <Logo size="small" />
      <div class="text-gray-500 text-sm">
        © 2025 CleanAISlop. We clean what AI breaks.
      </div>
    </div>
  </footer>
</div>
