<script lang="ts">
  import DeveloperCard from '$lib/components/DeveloperCard.svelte';
  import { mockDevelopers } from '$lib/mockData';
  import type { Developer, DeveloperFilter } from '$lib/types';
  
  let developers: Developer[] = $state(mockDevelopers);
  let filteredDevelopers: Developer[] = $state(mockDevelopers);
  
  // Filter state
  let filters: DeveloperFilter = $state({
    technologies: [],
    frameworks: [],
    availability: undefined,
    verified: undefined,
    projectSize: undefined
  });
  
  // Sorting
  let sortBy = $state('featured');
  
  // Get unique technologies and frameworks
  const allTechnologies = Array.from(new Set(mockDevelopers.flatMap(d => d.technologies))).sort();
  const allFrameworks = Array.from(new Set(mockDevelopers.flatMap(d => d.frameworks))).sort();
  
  // Filter and sort developers
  $effect(() => {
    let filtered = developers;
    
    // Apply filters
    if (filters.technologies?.length) {
      filtered = filtered.filter(dev => 
        filters.technologies!.some(tech => dev.technologies.includes(tech))
      );
    }
    
    if (filters.frameworks?.length) {
      filtered = filtered.filter(dev => 
        filters.frameworks!.some(fw => dev.frameworks.includes(fw))
      );
    }
    
    if (filters.availability !== undefined) {
      filtered = filtered.filter(dev => dev.isAvailable === filters.availability);
    }
    
    if (filters.verified !== undefined) {
      filtered = filtered.filter(dev => dev.verified === filters.verified);
    }
    
    if (filters.projectSize && filters.projectSize !== 'any') {
      filtered = filtered.filter(dev => 
        dev.preferredProjectSize === filters.projectSize || dev.preferredProjectSize === 'any'
      );
    }
    
    // Sort
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'featured':
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        case 'rating':
          return (b.avgRating || 0) - (a.avgRating || 0);
        case 'experience':
          return b.yearsExperience - a.yearsExperience;
        case 'rate-low':
          return (a.hourlyRate || 999) - (b.hourlyRate || 999);
        case 'rate-high':
          return (b.hourlyRate || 0) - (a.hourlyRate || 0);
        default:
          return 0;
      }
    });
    
    filteredDevelopers = filtered;
  });
  
  function toggleTechnology(tech: string) {
    if (filters.technologies?.includes(tech)) {
      filters.technologies = filters.technologies.filter(t => t !== tech);
    } else {
      filters.technologies = [...(filters.technologies || []), tech];
    }
  }
  
  function clearFilters() {
    filters = {
      technologies: [],
      frameworks: [],
      availability: undefined,
      verified: undefined,
      projectSize: undefined
    };
  }
</script>

<div class="min-h-screen bg-gray-50 relative">
  <!-- Coming Soon Overlay -->
  <div class="absolute inset-0 bg-white/95 backdrop-blur-sm z-50 flex items-center justify-center">
    <div class="text-center max-w-md mx-auto p-8">
      <div class="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg class="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </div>
      <h2 class="text-3xl font-bold text-gray-900 mb-4">Developer Directory Coming Soon</h2>
      <p class="text-lg text-gray-600 mb-8">
        We're manually vetting our first batch of developers to ensure quality. Join the waitlist to get early access!
      </p>
      <a href="/#hero" class="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
        Join Waitlist →
      </a>
    </div>
  </div>

  <!-- Header -->
  <header class="bg-white border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Developer Directory</h1>
          <p class="mt-2 text-lg text-gray-600">
            Find experienced developers to clean up your AI-generated code
          </p>
        </div>
        <a 
          href="/" 
          class="text-gray-500 hover:text-gray-700 transition-colors"
        >
          ← Back to Home
        </a>
      </div>
    </div>
  </header>
  
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex gap-8">
      <!-- Filters Sidebar -->
      <aside class="w-64 flex-shrink-0">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold text-gray-900">Filters</h2>
            <button 
              onclick={clearFilters}
              class="text-sm text-red-600 hover:text-red-700"
            >
              Clear all
            </button>
          </div>
          
          <!-- Availability Filter -->
          <div class="mb-6">
            <h3 class="text-sm font-medium text-gray-900 mb-3">Availability</h3>
            <div class="space-y-2">
              <label class="flex items-center">
                <input 
                  type="radio" 
                  name="availability"
                  value="all"
                  checked={filters.availability === undefined}
                  onchange={() => filters.availability = undefined}
                  class="mr-2"
                />
                <span class="text-sm text-gray-700">All developers</span>
              </label>
              <label class="flex items-center">
                <input 
                  type="radio" 
                  name="availability"
                  value="available"
                  checked={filters.availability === true}
                  onchange={() => filters.availability = true}
                  class="mr-2"
                />
                <span class="text-sm text-gray-700">Available now</span>
              </label>
            </div>
          </div>
          
          <!-- Verified Filter -->
          <div class="mb-6">
            <label class="flex items-center">
              <input 
                type="checkbox" 
                checked={filters.verified === true}
                onchange={(e) => filters.verified = e.currentTarget.checked ? true : undefined}
                class="mr-2"
              />
              <span class="text-sm text-gray-700">Verified developers only</span>
            </label>
          </div>
          
          <!-- Project Size Filter -->
          <div class="mb-6">
            <h3 class="text-sm font-medium text-gray-900 mb-3">Project Size</h3>
            <select 
              bind:value={filters.projectSize}
              class="w-full rounded-md border-gray-300 text-sm"
            >
              <option value={undefined}>Any size</option>
              <option value="small">Small ($500 - $5k)</option>
              <option value="medium">Medium ($5k - $20k)</option>
              <option value="large">Large ($20k+)</option>
            </select>
          </div>
          
          <!-- Technologies Filter -->
          <div class="mb-6">
            <h3 class="text-sm font-medium text-gray-900 mb-3">Technologies</h3>
            <div class="space-y-2 max-h-48 overflow-y-auto">
              {#each allTechnologies as tech}
                <label class="flex items-center">
                  <input 
                    type="checkbox" 
                    checked={filters.technologies?.includes(tech)}
                    onchange={() => toggleTechnology(tech)}
                    class="mr-2"
                  />
                  <span class="text-sm text-gray-700">{tech}</span>
                </label>
              {/each}
            </div>
          </div>
        </div>
      </aside>
      
      <!-- Main Content -->
      <main class="flex-1">
        <!-- Sort and Results Count -->
        <div class="flex items-center justify-between mb-6">
          <div class="text-sm text-gray-600">
            Showing {filteredDevelopers.length} of {developers.length} developers
          </div>
          <div class="flex items-center gap-2">
            <label for="sort-select" class="text-sm text-gray-700">Sort by:</label>
            <select 
              id="sort-select"
              bind:value={sortBy}
              class="rounded-md border-gray-300 text-sm"
            >
              <option value="featured">Featured</option>
              <option value="rating">Highest rated</option>
              <option value="experience">Most experienced</option>
              <option value="rate-low">Lowest rate</option>
              <option value="rate-high">Highest rate</option>
            </select>
          </div>
        </div>
        
        <!-- Developer Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {#each filteredDevelopers as developer}
            <DeveloperCard {developer} />
          {/each}
        </div>
        
        {#if filteredDevelopers.length === 0}
          <div class="text-center py-12">
            <p class="text-gray-500">No developers match your filters. Try adjusting your criteria.</p>
          </div>
        {/if}
      </main>
    </div>
  </div>
</div>