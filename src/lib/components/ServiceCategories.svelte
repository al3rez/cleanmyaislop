<script lang="ts">
  const categories = [
    {
      icon: `<svg class="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
      </svg>`,
      title: 'Platform Migration',
      description: 'Move off Replit, Lovable, v0 to AWS, GCP, Vercel',
      color: 'text-emerald-600'
    },
    {
      icon: `<svg class="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
      </svg>`,
      title: 'Code Refactoring',
      description: 'Fix render loops, state issues, dead code',
      color: 'text-emerald-600'
    },
    {
      icon: `<svg class="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
      </svg>`,
      title: 'Testing & QA',
      description: 'Add tests to AI-generated code',
      color: 'text-emerald-600'
    },
    {
      icon: `<svg class="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>`,
      title: 'Performance Optimization',
      description: 'Make AI code production-ready',
      color: 'text-emerald-600'
    },
    {
      icon: `<svg class="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
        <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
      </svg>`,
      title: 'Scaling & DevOps',
      description: 'Deploy and scale AI-built apps',
      color: 'text-emerald-600'
    },
    {
      icon: `<svg class="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
      </svg>`,
      title: 'Architecture Review',
      description: 'Fix over-engineered AI patterns',
      color: 'text-emerald-600'
    },
    {
      icon: `<svg class="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l-5.5 9h11L12 2zm0 3.84L13.93 9h-3.87L12 5.84zM17.5 13c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM3 21.5h8v-8H3v8zm2-6h4v4H5v-4z"/>
      </svg>`,
      title: 'Complete Rewrite',
      description: 'When fixing takes longer than starting over',
      color: 'text-emerald-600'
    },
    {
      icon: `<svg class="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
      </svg>`,
      title: 'Maintenance & Support',
      description: 'Ongoing fixes for AI-generated code',
      color: 'text-emerald-600'
    }
  ];
</script>

<section class="py-20 px-6 lg:px-12 bg-gray-50">
  <div class="max-w-7xl mx-auto">
    <div class="text-center mb-12">
      <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
        Expert developers for every AI code nightmare
      </h2>
    </div>
    
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
      {#each categories as category}
        <a href="/developers?category={encodeURIComponent(category.title)}" class="group text-center">
          <div class="{category.color} mb-4 transition-transform group-hover:scale-110" style="will-change: transform;">
            {@html category.icon}
          </div>
          <h3 class="font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
            {category.title}
          </h3>
          <p class="text-sm text-gray-600">
            {category.description}
          </p>
        </a>
      {/each}
    </div>
    
    <div class="mt-12 text-center">
      <a href="/developers" class="text-emerald-600 hover:text-emerald-700 font-medium inline-flex items-center" plausible-event-name="Navigation+Click" data-plausible-event-link="browse_all_developers">
        Browse all developers
        <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  </div>
</section>