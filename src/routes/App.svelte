<script lang="ts">
  import Hero from '$lib/components/Hero.svelte';
  import DeveloperCard from '$lib/components/DeveloperCard.svelte';
  import Logo from '$lib/components/Logo.svelte';
  import CodeAnimation from '$lib/components/CodeAnimation.svelte';
  import { mockDevelopers } from '$lib/mockData';
  import { enhance } from '$app/forms';
  import { onMount } from 'svelte';
  
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

  // Smooth scrolling for anchor links
  onMount(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          const offset = 80; // Account for sticky header
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  });
</script>

<div class="min-h-screen bg-white">
  <!-- Header -->
  <header class="sticky top-0 z-50 border-b border-gray-200 bg-white">
    <div class="px-4 md:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto flex justify-between items-center h-14 md:h-16">
        <div class="flex items-center">
          <div class="md:hidden">
            <Logo size="small" />
          </div>
          <div class="hidden md:block">
            <Logo size="medium" />
          </div>
          <nav class="hidden lg:flex items-center space-x-7 ml-12">
            <a href="/developers" class="text-gray-600 hover:text-gray-900 font-medium transition-colors">Find developers</a>
            <a href="#how-we-help" class="text-gray-600 hover:text-gray-900 font-medium transition-colors">How it works</a>
            <a href="#why-founders" class="text-gray-600 hover:text-gray-900 font-medium transition-colors">Why CleanupMyAISlop</a>
            <a href="/pricing" class="text-gray-600 hover:text-gray-900 font-medium transition-colors">Pricing</a>
          </nav>
        </div>
        <div class="flex items-center gap-4 md:gap-6">
          {#if data?.user}
            <span class="hidden md:inline text-gray-700 font-medium">Hi, {data.user.name}</span>
            <a href="/dashboard" class="text-gray-700 hover:text-gray-900 font-medium text-sm md:text-base">Dashboard</a>
            <form method="POST" action="/auth/logout" use:enhance>
              <button type="submit" class="text-gray-700 hover:text-gray-900 font-medium text-sm md:text-base">Log out</button>
            </form>
          {:else}
            <a href="/login" class="hidden md:block text-gray-600 hover:text-gray-900 font-medium transition-colors">Log in</a>
            <button 
              onclick={() => document.getElementById('waitlist-email')?.focus()}
              class="bg-emerald-600 hover:bg-emerald-700 text-white px-3 md:px-6 py-2 md:py-2.5 rounded-lg font-medium transition-colors text-sm md:text-base">
              <span class="hidden md:inline">Start fixing AI code now →</span>
              <span class="md:hidden">Get Started</span>
            </button>
          {/if}
        </div>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <Hero />

  <!-- Client Logos Infinite Scroll -->
  <section class="relative py-8 md:py-12 px-6 lg:px-8">
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
  <section id="how-we-help" class="relative py-12 md:py-20 px-6 lg:px-8 bg-gradient-to-b from-white via-gray-50/50 to-white">
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
  <section class="relative py-12 md:py-20 px-6 lg:px-8 bg-gradient-to-b from-white via-gray-50/30 to-gray-50">
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
  <section id="why-founders" class="relative py-12 md:py-20 px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
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





  <!-- Last week on X section -->
  <section class="relative py-8 md:py-12 px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Left column - Text -->
        <div class="order-2 lg:order-1">
          <p class="text-sm text-gray-500 uppercase tracking-wider font-medium mb-2">Last week on X</p>
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            When "vibe coding" meets reality
          </h2>
          <p class="text-xl text-gray-600 mb-8">
            Another founder learned the hard way: AI code without understanding is a ticking time bomb
          </p>
          
          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span class="text-red-600 text-sm">🚨</span>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900">Bypassed subscriptions</h3>
                <p class="text-gray-600">Users accessing paid features without paying</p>
              </div>
            </div>
            
            <div class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span class="text-red-600 text-sm">💸</span>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900">Maxed-out API keys</h3>
                <p class="text-gray-600">Thousands in unexpected charges from exposed credentials</p>
              </div>
            </div>
            
            <div class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span class="text-red-600 text-sm">💀</span>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900">Database corruption</h3>
                <p class="text-gray-600">Production data compromised and business operations halted</p>
              </div>
            </div>

            <div class="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <p class="text-amber-800 text-sm italic">
                "As you know, I'm not technical so this is taking me longer than usual to figure out."
              </p>
              <p class="text-amber-600 text-xs mt-1">— The founder, after the attack</p>
            </div>
          </div>
        </div>
        
        <!-- Right column - Tweet Image -->
        <div class="order-1 lg:order-2">
          <div class="relative">
            <div class="bg-black p-4 rounded-xl shadow-2xl">
              <img 
                src="https://nmn.gl/blog/assets/vibe-coding-security.webp" 
                alt="Founder's tweet about SaaS being hacked due to AI-generated code"
                class="w-full rounded-lg"
              />
            </div>
            <div class="absolute -bottom-4 -right-4 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
              Don't be next
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Final CTA -->
  <section class="py-12 md:py-20 px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 shadow-xl md:shadow-2xl p-8 md:p-12 lg:p-16">
        <div class="relative z-10 text-center">
          <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6 tracking-tight">
            Find developers who actually fix your AI slop
          </h2>
          <p class="text-lg md:text-xl text-gray-300 mb-6 md:mb-8">
            Before hackers find your exposed API keys
          </p>
          <button 
            onclick={() => document.getElementById('waitlist-email')?.focus()}
            class="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-medium transition-all transform hover:scale-105 shadow-lg">
            <span class="hidden md:inline">Start fixing AI code now →</span>
            <span class="md:hidden">Get Started →</span>
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="py-12 md:py-20 px-6 lg:px-8 border-t border-gray-200 bg-gradient-to-b from-white to-gray-50">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-3 md:grid-cols-4 gap-4 md:gap-8 lg:gap-12">
        <!-- Column 1: Logo & Description -->
        <div class="col-span-3 md:col-span-1">
          <Logo size="small" />
          <p class="text-gray-600 text-sm mt-4 mb-6">
            Hire the best developers who clean up your AI slop
          </p>
          <p class="text-gray-500 text-xs">
            Copyright © 2025 - All rights reserved
          </p>
        </div>
        
        <!-- Column 2: LINKS -->
        <div>
          <h3 class="font-semibold text-gray-900 text-xs md:text-sm uppercase tracking-wider mb-3 md:mb-4">Links</h3>
          <ul class="space-y-2 md:space-y-3">
            <li><a href="/developers" class="text-gray-600 hover:text-gray-900 text-sm">Browse Developers</a></li>
            <li><a href="#how-it-works" class="text-gray-600 hover:text-gray-900 text-sm">How It Works</a></li>
            <li><a href="#pricing" class="text-gray-600 hover:text-gray-900 text-sm">Pricing</a></li>
            <li><a href="/blog" class="text-gray-600 hover:text-gray-900 text-sm">Blog</a></li>
          </ul>
        </div>
        
        <!-- Column 3: LEGAL -->
        <div>
          <h3 class="font-semibold text-gray-900 text-xs md:text-sm uppercase tracking-wider mb-3 md:mb-4">Legal</h3>
          <ul class="space-y-2 md:space-y-3">
            <li><a href="/terms" class="text-gray-600 hover:text-gray-900 text-sm">Terms of Service</a></li>
            <li><a href="/privacy" class="text-gray-600 hover:text-gray-900 text-sm">Privacy Policy</a></li>
            <li><a href="/cookies" class="text-gray-600 hover:text-gray-900 text-sm">Cookie Policy</a></li>
            <li><a href="/disclaimer" class="text-gray-600 hover:text-gray-900 text-sm">Disclaimer</a></li>
          </ul>
        </div>
        
        <!-- Column 4: MORE -->
        <div>
          <h3 class="font-semibold text-gray-900 text-xs md:text-sm uppercase tracking-wider mb-3 md:mb-4">More</h3>
          <ul class="space-y-2 md:space-y-3">
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
