<script lang="ts">
  let searchTerm = $state('');
  let activeTab: 'find' | 'browse' = $state('find');

  function handleSearch(event: Event) {
    event.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/developers?search=${encodeURIComponent(searchTerm)}`;
    }
  }
</script>

<section class="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
  <div class="absolute inset-0 overflow-hidden">
    <div class="absolute -top-40 -right-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
    <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
  </div>
  
  <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-32">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <!-- Left Content -->
      <div>
        <h1 class="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
          Connecting developers who can fix AI slop to founders who need them
        </h1>
        
        <!-- Search Section -->
        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-6 mt-8">
          <!-- Tabs -->
          <div class="flex bg-white/10 rounded-lg p-1 mb-6">
            <button
              onclick={() => activeTab = 'find'}
              class="flex-1 py-3 px-6 rounded-lg font-medium transition-all {activeTab === 'find' ? 'bg-white text-gray-900' : 'text-white hover:text-gray-200'}"
            >
              Find developers
            </button>
            <button
              onclick={() => activeTab = 'browse'}
              class="flex-1 py-3 px-6 rounded-lg font-medium transition-all {activeTab === 'browse' ? 'bg-white text-gray-900' : 'text-white hover:text-gray-200'}"
            >
              Browse fixes
            </button>
          </div>
          
          <!-- Search Form -->
          <form onsubmit={handleSearch}>
            <div class="relative">
              <input
                type="text"
                bind:value={searchTerm}
                placeholder="Search by technology, framework, or AI platform"
                class="w-full px-6 py-4 pr-12 rounded-xl text-gray-900 placeholder-gray-500 bg-white focus:outline-none focus:ring-4 focus:ring-white/30"
              />
              <button
                type="submit"
                class="absolute right-2 top-1/2 -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg transition-colors"
                aria-label="Search"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>
          
          <!-- Platform Logos -->
          <div class="mt-6 flex items-center justify-center gap-8 opacity-70">
            <span class="text-sm">Fixing code from:</span>
            <div class="flex items-center gap-6">
              <span class="font-mono text-lg">Replit</span>
              <span class="font-mono text-lg">Lovable</span>
              <span class="font-mono text-lg">v0</span>
              <span class="font-mono text-lg">Cursor</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Right Image -->
      <div class="hidden lg:block">
        <div class="relative">
          <img 
            src="/placeholder.svg?height=600&width=600&text=Developer" 
            alt="Developer fixing AI-generated code" 
            class="rounded-2xl shadow-2xl"
          />
          <div class="absolute -bottom-6 -left-6 bg-white text-gray-900 p-4 rounded-xl shadow-lg">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <p class="font-semibold">200+ AI projects fixed</p>
                <p class="text-sm text-gray-600">This month</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  @keyframes blob {
    0% {
      transform: translate(0px, 0px) scale(1);
    }
    33% {
      transform: translate(30px, -50px) scale(1.1);
    }
    66% {
      transform: translate(-20px, 20px) scale(0.9);
    }
    100% {
      transform: translate(0px, 0px) scale(1);
    }
  }
  
  .animate-blob {
    animation: blob 7s infinite;
  }
  
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  
  .animation-delay-4000 {
    animation-delay: 4s;
  }
</style>