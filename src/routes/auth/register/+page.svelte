<script lang="ts">
  import Logo from '$lib/components/Logo.svelte';
  import { enhance } from '$app/forms';
  
  let { form } = $props();
  
  let role = $state(form?.role || 'client');
</script>

<div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-md">
    <div class="flex justify-center">
      <Logo size="large" />
    </div>
    <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
      Create your account
    </h2>
    <p class="mt-2 text-center text-sm text-gray-600">
      Already have an account?
      <a href="/auth/login" class="font-medium text-emerald-600 hover:text-emerald-500">
        Sign in
      </a>
    </p>
  </div>

  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <form method="POST" use:enhance>
        {#if form?.error}
          <div class="mb-4 p-4 text-sm text-red-800 bg-red-100 rounded-md">
            {form.error}
          </div>
        {/if}
        
        <div class="space-y-6">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">
              Full name
            </label>
            <div class="mt-1">
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form?.name || ''}
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div class="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required
                value={form?.email || ''}
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div class="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="new-password"
                required
                minlength="8"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>
            <p class="mt-1 text-xs text-gray-500">Minimum 8 characters</p>
          </div>

          <div>
            <span class="block text-sm font-medium text-gray-700 mb-3">
              I want to...
            </span>
            <div class="space-y-2">
              <label class="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="client"
                  bind:group={role}
                  class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                />
                <span class="ml-3">
                  <span class="block text-sm font-medium text-gray-700">
                    Fix my AI-generated code
                  </span>
                  <span class="block text-xs text-gray-500">
                    I need help cleaning up code from Replit, v0, Cursor, etc.
                  </span>
                </span>
              </label>
              
              <label class="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="developer"
                  bind:group={role}
                  class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                />
                <span class="ml-3">
                  <span class="block text-sm font-medium text-gray-700">
                    Offer cleanup services
                  </span>
                  <span class="block text-xs text-gray-500">
                    I'm a developer who can fix AI-generated code
                  </span>
                </span>
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              Create account
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>