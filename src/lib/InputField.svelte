<script lang="ts">
	/**
	 * 入力フィールドコンポーネント
	 *
	 * ラベル付きの数値入力フィールドを提供します。
	 * 外部からのクラス名を受け取ることができます。
	 */

	export let id: string
	export let label: string
	export let value: number | null
	export let placeholder: string
	export let step: string
	export let min: string
	export let class_name = ""
	export { class_name as class }
</script>

<div class={`tw-flex tw-relative tw-min-w-48 ${class_name}`}>
	<label
		for={id}
		class="
			tw-inline-flex tw-items-center
			tw-min-w-20 tw-px-3
			tw-rounded-l-md
			tw-border-t tw-border-l tw-border-b tw-border-slate-300
			tw-bg-white
			tw-text-gray-500 tw-text-sm
			tw-shadow-sm
		"
	>
		{label}
	</label>
	<input
		{id}
		type="number"
		{step}
		{min}
		{placeholder}
		bind:value
		class="
			tw-flex-1
			tw-w-full tw-px-4 tw-py-2
			tw-rounded-r-md
			tw-border tw-border-slate-300
			tw-bg-white
			tw-text-gray-700 tw-text-base
			placeholder:tw-text-gray-400
			tw-shadow-sm
			tw-appearance-none
			focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-red-500 focus:tw-border-transparent
		"
	/>
</div>