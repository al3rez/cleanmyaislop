<script lang="ts">
	import '../app.css';
	import BuildInfo from '$lib/components/BuildInfo.svelte';
	
	let { children } = $props();
</script>

{@render children()}
<BuildInfo />
