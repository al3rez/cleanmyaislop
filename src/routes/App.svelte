<script lang="ts">
  import Hero from '$lib/components/Hero.svelte';
  import DeveloperCard from '$lib/components/DeveloperCard.svelte';
  import Logo from '$lib/components/Logo.svelte';
  import CodeAnimation from '$lib/components/CodeAnimation.svelte';
  import { mockDevelopers } from '$lib/mockData';
  import { enhance } from '$app/forms';
  
  let { data } = $props();
  
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
        {#if data?.user}
          <span class="text-gray-700 font-medium">Hi, {data.user.name}</span>
          <a href="/dashboard" class="text-gray-700 hover:text-gray-900 font-medium">Dashboard</a>
          <form method="POST" action="/auth/logout" use:enhance>
            <button type="submit" class="text-gray-700 hover:text-gray-900 font-medium">Log out</button>
          </form>
        {:else}
          <a href="#hero" class="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors">Start fixing AI code now →</a>
        {/if}
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
        <div class="bg-white p-8 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.08)] hover:shadow-[0_0_30px_rgba(0,0,0,0.12)] transition-all">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span class="text-2xl">🔄</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900">AI gets stuck on errors</h3>
          </div>
          <p class="text-gray-600">When AI hits cryptic errors or dependency conflicts, it goes in circles. You need someone who actually understands the error messages.</p>
        </div>
        
        <div class="bg-white p-8 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.08)] hover:shadow-[0_0_30px_rgba(0,0,0,0.12)] transition-all">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span class="text-2xl">🗣️</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900">Can't translate vision to code</h3>
          </div>
          <p class="text-gray-600">You know what you want but AI keeps missing the mark. Human developers understand context and can ask the right questions.</p>
        </div>
        
        <div class="bg-white p-8 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.08)] hover:shadow-[0_0_30px_rgba(0,0,0,0.12)] transition-all">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span class="text-2xl">🧠</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900">Hit the AI knowledge limit</h3>
          </div>
          <p class="text-gray-600">When you need recent APIs, niche libraries, or complex integrations, AI's training data isn't enough. You need current expertise.</p>
        </div>
        
        <div class="bg-white p-8 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.08)] hover:shadow-[0_0_30px_rgba(0,0,0,0.12)] transition-all">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span class="text-2xl">🌀</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900">Lost in complexity</h3>
          </div>
          <p class="text-gray-600">Your codebase has become an unmaintainable mess. You need someone to refactor and create proper architecture.</p>
        </div>
        
        <div class="bg-white p-8 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.08)] hover:shadow-[0_0_30px_rgba(0,0,0,0.12)] transition-all">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span class="text-2xl">🚀</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900">Need production-ready code</h3>
          </div>
          <p class="text-gray-600">AI code works in demos but falls apart at scale. You need performance optimization, security, and proper deployment.</p>
        </div>
        
        <div class="bg-white p-8 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.08)] hover:shadow-[0_0_30px_rgba(0,0,0,0.12)] transition-all">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span class="text-2xl">🔍</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900">Quality control needed</h3>
          </div>
          <p class="text-gray-600">You suspect your AI-generated code has issues but can't identify them. Expert code review saves you from future disasters.</p>
        </div>
      </div>
    </div>
  </section>





  <!-- Final CTA -->
  <section class="py-20 px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="relative min-h-[200px] overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl p-12 lg:p-16">
        <div class="relative z-10 text-center">
          <h2 class="text-3xl lg:text-5xl font-bold text-white mb-6 tracking-tight whitespace-nowrap">
            Find developers who actually fix your AI slop
          </h2>
          <p class="text-xl text-gray-300 mb-8">
            From quick fixes to complete rebuilds
          </p>
          <a href="#hero" class="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full text-lg font-medium transition-all transform hover:scale-105 shadow-lg">
            Start fixing AI code now →
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="py-20 px-6 lg:px-8 border-t border-gray-200 bg-gradient-to-b from-white to-gray-50">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
        <!-- Column 1: Logo & Description -->
        <div>
          <Logo size="small" />
          <p class="text-gray-600 text-sm mt-4 mb-6">
            Hire the best developers who clean up your AI slop
          </p>
          <p class="text-gray-500 text-xs">
            © 2025 CleanAISlop. We clean what AI breaks.
          </p>
        </div>
        
        <!-- Column 2: LINKS -->
        <div>
          <h3 class="font-semibold text-gray-900 text-sm uppercase tracking-wider mb-4">Links</h3>
          <ul class="space-y-3">
            <li><a href="/developers" class="text-gray-600 hover:text-gray-900 text-sm">Browse Developers</a></li>
            <li><a href="#how-it-works" class="text-gray-600 hover:text-gray-900 text-sm">How It Works</a></li>
            <li><a href="#pricing" class="text-gray-600 hover:text-gray-900 text-sm">Pricing</a></li>
            <li><a href="/blog" class="text-gray-600 hover:text-gray-900 text-sm">Blog</a></li>
          </ul>
        </div>
        
        <!-- Column 3: LEGAL -->
        <div>
          <h3 class="font-semibold text-gray-900 text-sm uppercase tracking-wider mb-4">Legal</h3>
          <ul class="space-y-3">
            <li><a href="/terms" class="text-gray-600 hover:text-gray-900 text-sm">Terms of Service</a></li>
            <li><a href="/privacy" class="text-gray-600 hover:text-gray-900 text-sm">Privacy Policy</a></li>
            <li><a href="/cookies" class="text-gray-600 hover:text-gray-900 text-sm">Cookie Policy</a></li>
            <li><a href="/disclaimer" class="text-gray-600 hover:text-gray-900 text-sm">Disclaimer</a></li>
          </ul>
        </div>
        
        <!-- Column 4: MORE -->
        <div>
          <h3 class="font-semibold text-gray-900 text-sm uppercase tracking-wider mb-4">More</h3>
          <ul class="space-y-3">
            <li><a href="/about" class="text-gray-600 hover:text-gray-900 text-sm">About Us</a></li>
            <li><a href="/contact" class="text-gray-600 hover:text-gray-900 text-sm">Contact</a></li>
            <li><a href="/faq" class="text-gray-600 hover:text-gray-900 text-sm">FAQ</a></li>
            <li><a href="/careers" class="text-gray-600 hover:text-gray-900 text-sm">Careers</a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</div>
