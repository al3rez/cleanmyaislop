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
  <div class="max-w-7xl mx-auto px-6 lg:px-8">
    <!-- Centered hero with background image -->
    <div class="relative min-h-[600px] lg:min-h-[700px] overflow-hidden rounded-3xl">
    <!-- Background Image -->
    <div class="absolute inset-0">
      <img 
        src="/954929.jpg" 
        alt="Developer working on code" 
        class="w-full h-full object-cover"
      />
      <!-- Dark overlay for text readability -->
      <div class="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-transparent"></div>
    </div>
    
    <!-- Content -->
    <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
      <div class="max-w-xl">
        <h1 class="text-5xl lg:text-6xl font-medium text-white mb-8 leading-none text-balance">
          Hire developers who can clean your AI slop <span class="text-emerald-400">(code)</span>
        </h1>
        
        <!-- Search Box -->
        <div class="bg-gray-800/60 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50">
          <!-- Toggle Tabs -->
          <div class="flex rounded-full bg-gray-700/50 p-1 mb-6">
            <button
              onclick={() => activeTab = 'find'}
              class="flex-1 py-3 px-6 rounded-full text-sm font-medium transition-all {activeTab === 'find' ? 'bg-white text-gray-900' : 'text-gray-300 hover:text-white'}"
            >
              Find talent
            </button>
            <button
              onclick={() => activeTab = 'browse'}
              class="flex-1 py-3 px-6 rounded-full text-sm font-medium transition-all {activeTab === 'browse' ? 'bg-white text-gray-900' : 'text-gray-300 hover:text-white'}"
            >
              Browse jobs
            </button>
          </div>
          
          <!-- Search Input -->
          <form onsubmit={handleSearch} class="relative">
            <input
              type="text"
              bind:value={searchTerm}
              placeholder="Search by role, skills, or keywords"
              class="w-full px-6 py-4 pr-32 rounded-full text-white placeholder-gray-400 bg-gray-700/50 border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg"
            />
            <button
              type="submit"
              class="absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full font-medium transition-colors flex items-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </button>
          </form>
          
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