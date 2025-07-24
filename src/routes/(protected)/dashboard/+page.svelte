<script lang="ts">
  import Logo from '$lib/components/Logo.svelte';
  import { enhance } from '$app/forms';
  
  let { data } = $props();
</script>

<div class="min-h-screen bg-gray-50">
  <!-- Header -->
  <header class="py-3 px-6 lg:px-8 border-b border-gray-200 bg-white">
    <div class="max-w-7xl mx-auto flex justify-between items-center">
      <div class="flex items-center">
        <Logo size="medium" />
      </div>
      <div class="flex items-center gap-4">
        <span class="text-gray-700">Hi, {data.user.name}</span>
        <form method="POST" action="/auth/logout" use:enhance>
          <button type="submit" class="text-gray-600 hover:text-gray-900">Log out</button>
        </form>
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="bg-white rounded-lg shadow p-6 mb-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Welcome back, {data.user.name}!</h2>
      <p class="text-gray-600 mb-6">Ready to get your AI-generated code cleaned up by professionals?</p>
      
      <div class="flex gap-4">
        <a href="/projects/new" class="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium">
          Post New Project
        </a>
        <a href="/developers" class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium">
          Browse Developers
        </a>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Active Projects -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Active Projects</h3>
        <p class="text-3xl font-bold text-emerald-600">0</p>
        <p class="text-gray-600 text-sm">Currently in progress</p>
      </div>

      <!-- Pending Proposals -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Pending Proposals</h3>
        <p class="text-3xl font-bold text-blue-600">0</p>
        <p class="text-gray-600 text-sm">Awaiting your review</p>
      </div>

      <!-- Completed Projects -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Completed Projects</h3>
        <p class="text-3xl font-bold text-gray-600">0</p>
        <p class="text-gray-600 text-sm">Successfully delivered</p>
      </div>
    </div>

    <!-- Recent Projects -->
    <div class="mt-8 bg-white rounded-lg shadow">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Your Projects</h3>
      </div>
      <div class="p-6">
        <p class="text-gray-500 text-center py-8">No projects yet. Post your first project to get started!</p>
      </div>
    </div>
  </main>
</div>