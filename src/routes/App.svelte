<script lang="ts">
  import DeveloperCard from '$lib/components/DeveloperCard.svelte';
  import { mockDevelopers } from '$lib/mockData';
  
  let email = '';
  let isSubmitted = false;
  let currentLogoSlide = $state(0);
  
  // Get featured developers
  const featuredDevelopers = mockDevelopers.filter(dev => dev.featured).slice(0, 3);
  
  // Client logos/testimonials for carousel
  const clientLogos = [
    { name: "TechFlow", logo: "/placeholder.svg?height=40&width=120&text=TechFlow", industry: "SaaS Platform" },
    { name: "DataSync", logo: "/placeholder.svg?height=40&width=120&text=DataSync", industry: "Analytics" },
    { name: "CloudBridge", logo: "/placeholder.svg?height=40&width=120&text=CloudBridge", industry: "Infrastructure" },
    { name: "APIFirst", logo: "/placeholder.svg?height=40&width=120&text=APIFirst", industry: "Developer Tools" },
    { name: "ScaleUp", logo: "/placeholder.svg?height=40&width=120&text=ScaleUp", industry: "E-commerce" },
    { name: "InnovateLab", logo: "/placeholder.svg?height=40&width=120&text=InnovateLab", industry: "AI/ML" },
    { name: "DevCorp", logo: "/placeholder.svg?height=40&width=120&text=DevCorp", industry: "Enterprise" },
    { name: "StartupX", logo: "/placeholder.svg?height=40&width=120&text=StartupX", industry: "Fintech" }
  ];
  
  // Auto-advance logo carousel
  let logoInterval: ReturnType<typeof setInterval> | undefined;
  
  function startLogoCarousel() {
    logoInterval = setInterval(() => {
      currentLogoSlide = (currentLogoSlide + 1) % Math.ceil(clientLogos.length / 4);
    }, 3000);
  }
  
  function stopLogoCarousel() {
    if (logoInterval) {
      clearInterval(logoInterval);
    }
  }
  
  import { onMount, onDestroy } from 'svelte';
  
  onMount(() => {
    startLogoCarousel();
  });
  
  onDestroy(() => {
    stopLogoCarousel();
  });
  
  function handleSubmit(event: Event) {
    event.preventDefault();
    isSubmitted = true;
    setTimeout(() => {
      isSubmitted = false;
      email = '';
    }, 3000);
  }
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
  <section class="py-16 px-6 lg:px-12">
    <div class="max-w-4xl mx-auto">
      <div class="mb-6">
        <span class="text-sm font-medium text-red-500 bg-red-50 px-3 py-1 rounded-full">
          Developer Directory for AI Code Cleanup
        </span>
      </div>
      
      <h1 class="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
        "The cognitive load of parsing AI code is brutal"
      </h1>
      
      <p class="text-xl text-gray-600 leading-relaxed mb-8 max-w-3xl">
        When your React component has inconsistent states, unused props, and weird render loops. 
        When it looks good at first but is "insidiously flawed". When fixing it takes longer than writing from scratch.
        <span class="font-semibold text-gray-900">We connect you with devs who actually know how to fix AI slop.</span>
      </p>
      
      <div class="flex gap-4">
        <a href="/developers" class="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors">
          Browse Developers
        </a>
        <button class="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-8 py-4 rounded-lg text-lg font-medium transition-colors">
          Join as Developer
        </button>
      </div>
      
      <p class="text-sm text-gray-500 mt-3">
        <span class="font-semibold">50+ verified developers</span> • Former engineers from Google, Meta, Amazon
      </p>
    </div>
  </section>

  <!-- Client Logos Carousel -->
  <section class="py-12 px-6 lg:px-12 border-t border-gray-100">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-8">
        <p class="text-sm text-gray-500 mb-4">Successfully cleaned up AI code for these companies</p>
      </div>
      
      <!-- Carousel Container -->
      <div class="relative overflow-hidden">
        <div 
          class="flex transition-transform duration-500 ease-in-out"
          style="transform: translateX(-{currentLogoSlide * 100}%)"
        >
          {#each Array(Math.ceil(clientLogos.length / 4)) as _, slideIndex}
            <div class="w-full flex-shrink-0">
              <div class="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
                {#each clientLogos.slice(slideIndex * 4, slideIndex * 4 + 4) as client}
                  <div class="flex flex-col items-center space-y-2 opacity-60 hover:opacity-100 transition-opacity">
                    <img src="{client.logo}" alt="{client.name} logo" class="h-8 object-contain" />
                    <span class="text-xs text-gray-400">{client.industry}</span>
                  </div>
                {/each}
              </div>
            </div>
          {/each}
        </div>
        
        <!-- Carousel Indicators -->
        <div class="flex justify-center mt-6 space-x-2">
          {#each Array(Math.ceil(clientLogos.length / 4)) as _, index}
            <button
              class="w-2 h-2 rounded-full transition-all duration-300 {currentLogoSlide === index ? 'bg-red-500' : 'bg-gray-300'}"
              onclick={() => currentLogoSlide = index}
              aria-label="Slide {index + 1}"
            ></button>
          {/each}
        </div>
      </div>
    </div>
  </section>

  <!-- Reddit Quotes Section -->
  <section class="py-20 px-6 lg:px-12 bg-gray-50">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-16">
        <span class="text-sm font-medium text-red-500 bg-red-50 px-3 py-1 rounded-full mb-4 inline-block">
          Real founder pain points
        </span>
        <h2 class="text-4xl font-bold text-gray-900 mb-4">
          You're not alone in debugging hell
        </h2>
        <p class="text-xl text-gray-600">
          Real quotes from founders trapped in AI debugging nightmares
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <blockquote class="bg-white p-8 rounded-xl">
          <p class="text-lg text-gray-700 italic mb-4">
            "The code was very nicely formatted and looked pretty well written until you understood what they wanted"
          </p>
          <footer class="text-gray-500 text-sm">— r/devops developer who charged "a fuckload" to fix it</footer>
        </blockquote>
        
        <blockquote class="bg-white p-8 rounded-xl">
          <p class="text-lg text-gray-700 italic mb-4">
            "The cognitive load of parsing through code that's 80% correct is honestly harder than writing it from scratch"
          </p>
          <footer class="text-gray-500 text-sm">— Developer dealing with AI-generated modules</footer>
        </blockquote>
        
        <blockquote class="bg-white p-8 rounded-xl">
          <p class="text-lg text-gray-700 italic mb-4">
            "Enabling everyone to mass produce low quality spaghetti code at rates never before imagined"
          </p>
          <footer class="text-gray-500 text-sm">— Senior engineer on the AI future</footer>
        </blockquote>
        
        <blockquote class="bg-white p-8 rounded-xl">
          <p class="text-lg text-gray-700 italic mb-4">
            "AI generated code ranges from perfect to absolutely retarded, and the AI has no idea wtf it generates"
          </p>
          <footer class="text-gray-500 text-sm">— r/devops reality check</footer>
        </blockquote>
      </div>
    </div>
  </section>

  <!-- Common AI Code Problems Section -->
  <section class="py-20 px-6 lg:px-12 bg-gray-50">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <span class="text-sm font-medium text-red-500 bg-red-50 px-3 py-1 rounded-full mb-4 inline-block">
          What you're dealing with
        </span>
        <h2 class="text-4xl font-bold text-gray-900 mb-4">
          The AI code horror show we see every day
        </h2>
        <p class="text-xl text-gray-600">
          Real issues from real codebases. Sound familiar?
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-xl">
          <div class="text-red-500 text-3xl mb-3">🧩</div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Inconsistent States</h3>
          <p class="text-gray-600">React components with 15 different useState hooks that conflict with each other. State updates that race and break the UI.</p>
        </div>
        
        <div class="bg-white p-6 rounded-xl">
          <div class="text-red-500 text-3xl mb-3">🔄</div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Render Loops</h3>
          <p class="text-gray-600">useEffect dependencies that trigger infinite re-renders. Components that update their own props in a circle.</p>
        </div>
        
        <div class="bg-white p-6 rounded-xl">
          <div class="text-red-500 text-3xl mb-3">🎭</div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Looks Good, Works Bad</h3>
          <p class="text-gray-600">Beautifully formatted code that completely misses the business logic. Perfect syntax, wrong implementation.</p>
        </div>
        
        <div class="bg-white p-6 rounded-xl">
          <div class="text-red-500 text-3xl mb-3">🏗️</div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Over-Architecture</h3>
          <p class="text-gray-600">Simple CRUD app with 47 abstraction layers. Factories creating factories to make a button component.</p>
        </div>
        
        <div class="bg-white p-6 rounded-xl">
          <div class="text-red-500 text-3xl mb-3">👻</div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Phantom Functions</h3>
          <p class="text-gray-600">API calls to endpoints that don't exist. Helper functions that reference libraries you've never installed.</p>
        </div>
        
        <div class="bg-white p-6 rounded-xl">
          <div class="text-red-500 text-3xl mb-3">💀</div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Dead Code Everywhere</h3>
          <p class="text-gray-600">Unused props, imports, and entire modules. Variables declared but never referenced. Comments from a different codebase.</p>
        </div>
      </div>
      
      <div class="mt-12 text-center">
        <p class="text-lg text-gray-700 font-medium">
          "Code is written once, but read thousands of times" — and AI doesn't care about readability
        </p>
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
  <section id="how-it-works" class="py-20 px-6 lg:px-12 bg-gray-50">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-16">
        <span class="text-sm font-medium text-red-500 bg-red-50 px-3 py-1 rounded-full mb-4 inline-block">
          How it works
        </span>
        <h2 class="text-4xl font-bold text-gray-900 mb-4">
          Connect with the right developer in minutes
        </h2>
        <p class="text-xl text-gray-600">
          Skip the guesswork. Find pre-vetted developers who specialize in your tech stack.
        </p>
      </div>
      
      <div class="space-y-8">
        <div class="flex items-start space-x-6">
          <div class="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0">
            <svg class="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">Browse verified developers</h3>
            <p class="text-lg text-gray-600">All developers are pre-screened with proven track records of fixing AI-generated code.</p>
          </div>
        </div>
        
        <div class="flex items-start space-x-6">
          <div class="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0">
            <svg class="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
            </svg>
          </div>
          <div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">Compare rates and expertise</h3>
            <p class="text-lg text-gray-600">Filter by technology, budget, and experience level. Find the perfect match for your project.</p>
          </div>
        </div>
        
        <div class="flex items-start space-x-6">
          <div class="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0">
            <svg class="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
              <path fill-rule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 102 0V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 2V6a1 1 0 10-2 0v1a1 1 0 002 0zm-1 2a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"/>
            </svg>
          </div>
          <div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">Direct communication</h3>
            <p class="text-lg text-gray-600">Message developers directly. No middlemen, no markup, just professional connections.</p>
          </div>
        </div>
        
        <div class="flex items-start space-x-6">
          <div class="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0">
            <svg class="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"/>
              <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"/>
            </svg>
          </div>
          <div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">Secure payments</h3>
            <p class="text-lg text-gray-600">Built-in escrow and milestone payments. Only release funds when you're satisfied.</p>
          </div>
        </div>
        
        <div class="flex items-start space-x-6">
          <div class="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0">
            <svg class="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2L3 7v11a2 2 0 002 2h10a2 2 0 002-2V7l-7-5z"/>
              <path d="M8 15v-3a1 1 0 011-1h2a1 1 0 011 1v3H8z"/>
            </svg>
          </div>
          <div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">Real reviews</h3>
            <p class="text-lg text-gray-600">Read detailed reviews from other founders who've escaped debugging hell.</p>
          </div>
        </div>
        
        <div class="flex items-start space-x-6">
          <div class="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0">
            <svg class="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
          </div>
          <div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">Success stories</h3>
            <p class="text-lg text-gray-600">Join 200+ founders who've successfully cleaned up their AI code through our directory.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- For Developers Section -->
  <section id="for-developers" class="py-20 px-6 lg:px-12">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-16">
        <span class="text-sm font-medium text-red-500 bg-red-50 px-3 py-1 rounded-full mb-4 inline-block">
          For developers
        </span>
        <h2 class="text-4xl font-bold text-gray-900 mb-4">
          Turn AI cleanup skills into steady income
        </h2>
        <p class="text-xl text-gray-600">
          Join the growing market of developers who fix AI-generated code
        </p>
      </div>
      
      <div class="space-y-12">
        <div class="flex items-start space-x-6">
          <div class="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
            1
          </div>
          <div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">
              Set your rates and availability
            </h3>
            <p class="text-lg text-gray-600 leading-relaxed">
              Create your profile, showcase your expertise, and set your own rates. 
              Highlight your experience with specific frameworks and AI cleanup projects. 
              You're in control of who you work with and when.
            </p>
          </div>
        </div>
        
        <div class="flex items-start space-x-6">
          <div class="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
            2
          </div>
          <div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">
              Get matched with founders
            </h3>
            <p class="text-lg text-gray-600 leading-relaxed">
              Founders browse profiles and reach out directly when they need help. 
              No bidding wars, no race to the bottom. Quality developers attract 
              quality clients who understand the value of clean code.
            </p>
          </div>
        </div>
        
        <div class="flex items-start space-x-6">
          <div class="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
            3
          </div>
          <div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">
              Build your reputation
            </h3>
            <p class="text-lg text-gray-600 leading-relaxed">
              Every successful cleanup adds to your profile. Build a portfolio of 
              AI rescue stories. Top developers earn $150-200/hour fixing what 
              AI breaks. Join the new gold rush.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Developer Tiers Section -->
  <section class="py-20 px-6 lg:px-12 bg-gray-50">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <span class="text-sm font-medium text-red-500 bg-red-50 px-3 py-1 rounded-full mb-4 inline-block">
          Developer tiers
        </span>
        <h2 class="text-4xl font-bold text-gray-900 mb-4">
          Find developers that match your budget
        </h2>
        <p class="text-xl text-gray-600">
          From budget-friendly juniors to enterprise architects
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Junior Tier -->
        <div class="bg-white rounded-2xl p-8 border border-gray-200">
          <div class="text-center mb-6">
            <h3 class="text-2xl font-bold text-gray-900 mb-2">Junior Developers</h3>
            <div class="text-4xl font-bold text-gray-900 mb-2">$40-80/hr</div>
            <p class="text-gray-600">Great for smaller projects</p>
          </div>
          
          <ul class="space-y-3 text-gray-700 mb-8">
            <li class="flex items-start">
              <span class="text-green-500 mr-2">✓</span>
              Fresh grads who get it
            </li>
            <li class="flex items-start">
              <span class="text-green-500 mr-2">✓</span>
              "I use AI daily so I know its BS"
            </li>
            <li class="flex items-start">
              <span class="text-green-500 mr-2">✓</span>
              Fix render loops & dead code
            </li>
            <li class="flex items-start">
              <span class="text-green-500 mr-2">✓</span>
              Won't judge your AI slop
            </li>
          </ul>
          
          <p class="text-sm text-gray-600 text-center">
            Perfect for: Small apps, MVPs, budget-conscious founders
          </p>
        </div>
        
        <!-- Mid Tier -->
        <div class="bg-white rounded-2xl p-8 border-2 border-red-500 relative">
          <div class="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </div>
          
          <div class="text-center mb-6">
            <h3 class="text-2xl font-bold text-gray-900 mb-2">Senior Developers</h3>
            <div class="text-4xl font-bold text-gray-900 mb-2">$100-150/hr</div>
            <p class="text-gray-600">Full stack cleanup experts</p>
          </div>
          
          <ul class="space-y-3 text-gray-700 mb-8">
            <li class="flex items-start">
              <span class="text-green-500 mr-2">✓</span>
              "I've seen this AI pattern 100 times"
            </li>
            <li class="flex items-start">
              <span class="text-green-500 mr-2">✓</span>
              Turn 60k lines into 8k that works
            </li>
            <li class="flex items-start">
              <span class="text-green-500 mr-2">✓</span>
              Fix your "insidiously flawed" code
            </li>
            <li class="flex items-start">
              <span class="text-green-500 mr-2">✓</span>
              Charge "a fuckload" (worth it)
            </li>
          </ul>
          
          <p class="text-sm text-gray-600 text-center">
            Perfect for: That React nightmare, timesheet disasters, "it worked in ChatGPT"
          </p>
        </div>
        
        <!-- Enterprise Tier -->
        <div class="bg-white rounded-2xl p-8 border border-gray-200">
          <div class="text-center mb-6">
            <h3 class="text-2xl font-bold text-gray-900 mb-2">Expert Architects</h3>
            <div class="text-4xl font-bold text-gray-900 mb-2">$150-250/hr</div>
            <p class="text-gray-600">Enterprise-level solutions</p>
          </div>
          
          <ul class="space-y-3 text-gray-700 mb-8">
            <li class="flex items-start">
              <span class="text-green-500 mr-2">✓</span>
              "I wrote the docs AI trained on"
            </li>
            <li class="flex items-start">
              <span class="text-green-500 mr-2">✓</span>
              Seen every LLM hallucination
            </li>
            <li class="flex items-start">
              <span class="text-green-500 mr-2">✓</span>
              Rewrite > debug (always)
            </li>
            <li class="flex items-start">
              <span class="text-green-500 mr-2">✓</span>
              Your team will understand it
            </li>
          </ul>
          
          <p class="text-sm text-gray-600 text-center">
            Perfect for: When your staff has "proof" the AI is wrong
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Final CTA -->
  <section class="py-20 px-6 lg:px-12">
    <div class="max-w-4xl mx-auto text-center">
      <h2 class="text-4xl font-bold text-gray-900 mb-6">
        Ready to escape debugging hell?
      </h2>
      
      <p class="text-xl text-gray-600 mb-8 leading-relaxed">
        Whether you're stuck with 60k lines of AI spaghetti or you're a developer who fixes it, 
        CleanMyAISlop connects the right people at the right time.
      </p>
      
      <div class="flex justify-center gap-4">
        <a href="/developers" class="bg-red-500 hover:bg-red-600 text-white px-12 py-4 rounded-lg text-xl font-medium transition-colors">
          Find a Developer
        </a>
        <button class="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-12 py-4 rounded-lg text-xl font-medium transition-colors">
          Join as Developer
        </button>
      </div>
      
      <p class="text-gray-500 mt-8">
        hello@cleanmyaislop.com • 200+ successful cleanups • 50+ verified developers
      </p>
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
