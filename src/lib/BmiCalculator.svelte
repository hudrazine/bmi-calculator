<svelte:options customElement="bmi-calculator" />

<script lang="ts">
	import { writable } from "svelte/store"

	const height = writable(160)
	const weight = writable(60)
</script>
