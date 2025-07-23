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

<section class="relative py-16 lg:py-20">
  <div class="max-w-6xl mx-auto px-6 lg:px-8">
    <!-- Rounded Background Container -->
    <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 via-blue-800 to-emerald-800">
      <!-- Background Image -->
      <div class="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=900&fit=crop" 
          alt="Developer working" 
          class="w-full h-full object-cover opacity-20"
        />
      </div>
      
      <!-- Content -->
      <div class="relative z-10 py-16 lg:py-24 px-8 lg:px-16">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Hire developers who can clean your AI slop (code)
          </h1>
          
          <!-- Search Section -->
          <div class="bg-white/95 backdrop-blur-sm rounded-2xl p-6 mt-10 shadow-2xl">
            <!-- Tabs -->
            <div class="flex bg-gray-100 rounded-lg p-1 mb-5">
              <button
                onclick={() => activeTab = 'find'}
                class="flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all {activeTab === 'find' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}"
              >
                Find developers
              </button>
              <button
                onclick={() => activeTab = 'browse'}
                class="flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all {activeTab === 'browse' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}"
              >
                Browse projects
              </button>
            </div>
            
            <!-- Search Form -->
            <form onsubmit={handleSearch}>
              <div class="relative">
                <input
                  type="text"
                  bind:value={searchTerm}
                  placeholder="Search by technology, framework, or AI platform"
                  class="w-full px-5 py-3.5 pr-12 rounded-lg text-gray-900 placeholder-gray-500 bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  class="absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-600 hover:bg-emerald-700 text-white p-2.5 rounded-md transition-colors shadow-sm"
                  aria-label="Search"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>
            
            <!-- Platform Logos -->
            <div class="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-gray-600">
              <div class="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
                <img src="https://www.google.com/s2/favicons?domain=replit.com&sz=32" alt="Replit" class="h-5 w-5 opacity-70" />
                <img src="https://www.google.com/s2/favicons?domain=lovable.dev&sz=32" alt="Lovable" class="h-5 w-5 opacity-70" />
                <img src="https://www.google.com/s2/favicons?domain=v0.dev&sz=32" alt="v0" class="h-5 w-5 opacity-70" />
                <img src="https://www.google.com/s2/favicons?domain=cursor.sh&sz=32" alt="Cursor" class="h-5 w-5 opacity-70" />
                <span class="text-gray-400">|</span>
                <img src="https://www.google.com/s2/favicons?domain=github.com&sz=32" alt="GitHub" class="h-5 w-5 opacity-70" />
                <img src="https://www.google.com/s2/favicons?domain=openai.com&sz=32" alt="OpenAI" class="h-5 w-5 opacity-70" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>