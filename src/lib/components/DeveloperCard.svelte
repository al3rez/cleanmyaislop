<script lang="ts">
  import type { Developer } from '$lib/types';
  
  export let developer: Developer;
  
  function formatRate(rate?: number) {
    if (!rate) return 'Contact for rates';
    return `$${rate}/hour`;
  }
  
  function formatMinimum(minimum?: number) {
    if (!minimum) return '';
    return `$${minimum.toLocaleString()} min`;
  }
</script>

<div class="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow" style="will-change: box-shadow;">
  <div class="flex justify-between items-start mb-4">
    <div>
      <div class="flex items-center gap-2 mb-1">
        <h3 class="text-xl font-semibold text-gray-900">{developer.name}</h3>
        {#if developer.verified}
          <span class="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
            ✓ Verified
          </span>
        {/if}
        {#if developer.featured}
          <span class="inline-flex items-center rounded-full bg-orange-50 px-2 py-1 text-xs font-medium text-orange-700">
            ⭐ Featured
          </span>
        {/if}
      </div>
      <p class="text-gray-600">{developer.headline}</p>
    </div>
    <div class="text-right">
      <div class="text-2xl font-bold text-gray-900">{formatRate(developer.hourlyRate)}</div>
      {#if developer.projectMinimum}
        <div class="text-sm text-gray-500">{formatMinimum(developer.projectMinimum)}</div>
      {/if}
    </div>
  </div>
  
  <p class="text-gray-600 mb-4 line-clamp-2">{developer.bio}</p>
  
  <div class="mb-4">
    <div class="flex flex-wrap gap-2">
      {#each developer.technologies.slice(0, 5) as tech}
        <span class="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-0.5 text-sm font-medium text-gray-800">
          {tech}
        </span>
      {/each}
      {#if developer.technologies.length > 5}
        <span class="inline-flex items-center px-2.5 py-0.5 text-sm text-gray-500">
          +{developer.technologies.length - 5} more
        </span>
      {/if}
    </div>
  </div>
  
  <div class="grid grid-cols-3 gap-4 mb-4 text-sm">
    <div>
      <div class="text-gray-500">Experience</div>
      <div class="font-semibold text-gray-900">{developer.yearsExperience} years</div>
    </div>
    <div>
      <div class="text-gray-500">Projects</div>
      <div class="font-semibold text-gray-900">{developer.projectsCompleted}</div>
    </div>
    <div>
      <div class="text-gray-500">Rating</div>
      <div class="font-semibold text-gray-900">
        {#if developer.avgRating}
          ⭐ {developer.avgRating} ({developer.totalReviews})
        {:else}
          New
        {/if}
      </div>
    </div>
  </div>
  
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-3 text-sm">
      {#if developer.location}
        <span class="text-gray-500">📍 {developer.location}</span>
      {/if}
      <span class="text-gray-500">⏱️ {developer.responseTime}</span>
    </div>
    <div class="flex items-center gap-2">
      {#if developer.isAvailable}
        <span class="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-sm font-medium text-green-700">
          Available
        </span>
      {:else}
        <span class="inline-flex items-center rounded-full bg-gray-50 px-2.5 py-0.5 text-sm font-medium text-gray-700">
          Busy
        </span>
      {/if}
    </div>
  </div>
  
  <div class="mt-4 pt-4 border-t border-gray-100 flex gap-3">
    <a 
      href="/developers/{developer.id}" 
      class="flex-1 text-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
    >
      View Profile
    </a>
    {#if developer.portfolioUrl}
      <a 
        href={developer.portfolioUrl} 
        target="_blank"
        rel="noopener noreferrer"
        class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
      >
        Portfolio
      </a>
    {/if}
  </div>
</div>