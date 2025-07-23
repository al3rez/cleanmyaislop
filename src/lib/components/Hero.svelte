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

<section class="relative py-8 lg:py-12">
  <div class="max-w-6xl mx-auto px-6 lg:px-8">
    <!-- Rounded Background Container -->
    <div class="relative overflow-hidden rounded-3xl bg-gray-900">
      <!-- Background Image -->
      <div class="absolute inset-0">
        <img 
          src="/386041.jpg" 
          alt="Developer working with multiple monitors" 
          class="w-full h-full object-cover opacity-40 scale-x-[-1]"
        />
      </div>
      
      <!-- Content -->
      <div class="relative z-10 py-16 lg:py-24 px-8 lg:px-16">
        <div class="max-w-3xl">
          <h1 class="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight text-pretty">
            Hire developers who can clean your AI slop (code)
          </h1>
          
          <!-- Search Section -->
          <div class="bg-white/95 backdrop-blur-sm rounded-2xl p-6 mt-10 shadow-2xl">
            <!-- Tabs -->
            <div class="relative flex bg-gray-200 rounded-lg p-1 mb-5">
              <!-- Sliding indicator -->
              <div 
                class="absolute inset-1 bg-white rounded-md shadow-sm transition-transform duration-200 ease-out will-change-transform"
                style="width: calc(50% - 2px); transform: translateX({activeTab === 'find' ? '0' : 'calc(100% + 2px)'})"
              ></div>
              
              <!-- Buttons -->
              <button
                onclick={() => activeTab = 'find'}
                class="relative z-10 flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-colors duration-200 {activeTab === 'find' ? 'text-gray-900' : 'text-gray-600 hover:text-gray-800'}"
              >
                Find developers
              </button>
              <button
                onclick={() => activeTab = 'browse'}
                class="relative z-10 flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-colors duration-200 {activeTab === 'browse' ? 'text-gray-900' : 'text-gray-600 hover:text-gray-800'}"
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
            <div class="mt-5 flex flex-wrap items-center justify-center gap-3">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-white rounded-full shadow-sm flex items-center justify-center">
                  <img src="https://www.google.com/s2/favicons?domain=replit.com&sz=32" alt="Replit" class="h-5 w-5" />
                </div>
                <div class="w-8 h-8 bg-white rounded-full shadow-sm flex items-center justify-center">
                  <img src="https://www.google.com/s2/favicons?domain=lovable.dev&sz=32" alt="Lovable" class="h-5 w-5" />
                </div>
                <div class="w-8 h-8 bg-white rounded-full shadow-sm flex items-center justify-center">
                  <img src="https://www.google.com/s2/favicons?domain=v0.dev&sz=32" alt="v0" class="h-5 w-5" />
                </div>
                <div class="w-8 h-8 bg-white rounded-full shadow-sm flex items-center justify-center">
                  <img src="https://www.google.com/s2/favicons?domain=cursor.sh&sz=32" alt="Cursor" class="h-5 w-5" />
                </div>
                <span class="text-gray-400 mx-1">|</span>
                <div class="w-8 h-8 bg-white rounded-full shadow-sm flex items-center justify-center">
                  <img src="https://www.google.com/s2/favicons?domain=github.com&sz=32" alt="GitHub" class="h-5 w-5" />
                </div>
                <div class="w-8 h-8 bg-white rounded-full shadow-sm flex items-center justify-center">
                  <img src="https://www.google.com/s2/favicons?domain=openai.com&sz=32" alt="OpenAI" class="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>