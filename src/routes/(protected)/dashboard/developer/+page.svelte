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
      <p class="text-gray-600 mb-6">Ready to help founders fix their AI-generated code?</p>
      
      <div class="flex gap-4">
        <a href="/projects" class="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium">
          Browse Projects
        </a>
        <a href="/profile/edit" class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium">
          Complete Your Profile
        </a>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <!-- Active Projects -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Active Projects</h3>
        <p class="text-3xl font-bold text-emerald-600">0</p>
        <p class="text-gray-600 text-sm">In progress</p>
      </div>

      <!-- Pending Proposals -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Pending Proposals</h3>
        <p class="text-3xl font-bold text-blue-600">0</p>
        <p class="text-gray-600 text-sm">Awaiting response</p>
      </div>

      <!-- Completed Projects -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Completed</h3>
        <p class="text-3xl font-bold text-gray-600">0</p>
        <p class="text-gray-600 text-sm">Total delivered</p>
      </div>

      <!-- Earnings -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Total Earnings</h3>
        <p class="text-3xl font-bold text-green-600">$0</p>
        <p class="text-gray-600 text-sm">Lifetime earnings</p>
      </div>
    </div>

    <!-- Profile Completion -->
    <div class="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
      <h3 class="text-lg font-semibold text-yellow-900 mb-2">Complete Your Profile</h3>
      <p class="text-yellow-700 mb-4">A complete profile increases your chances of winning projects by 80%!</p>
      <div class="space-y-2">
        <div class="flex items-center gap-2">
          <input type="checkbox" checked disabled class="h-4 w-4 text-emerald-600" />
          <span class="text-gray-700">Basic information</span>
        </div>
        <div class="flex items-center gap-2">
          <input type="checkbox" disabled class="h-4 w-4 text-gray-300" />
          <span class="text-gray-700">Add bio and skills</span>
        </div>
        <div class="flex items-center gap-2">
          <input type="checkbox" disabled class="h-4 w-4 text-gray-300" />
          <span class="text-gray-700">Set hourly rate</span>
        </div>
        <div class="flex items-center gap-2">
          <input type="checkbox" disabled class="h-4 w-4 text-gray-300" />
          <span class="text-gray-700">Add portfolio links</span>
        </div>
      </div>
      <a href="/profile/edit" class="inline-block mt-4 text-yellow-900 font-medium hover:text-yellow-800">
        Complete Profile →
      </a>
    </div>

    <!-- Available Projects -->
    <div class="mt-8 bg-white rounded-lg shadow">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">New Projects Matching Your Skills</h3>
      </div>
      <div class="p-6">
        <p class="text-gray-500 text-center py-8">No matching projects yet. Check back soon!</p>
      </div>
    </div>
  </main>
</div>