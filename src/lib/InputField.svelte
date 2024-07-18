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
</script>

<div class={`flex relative min-w-48 ${class_name}`}>
	<label
		for={id}
		class="
			inline-flex items-center
			min-w-20 px-3
			rounded-l-md
			border-t border-l border-b border-slate-300
			bg-white
			text-gray-500 text-sm
			shadow-sm
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
			flex-1
			w-full px-4 py-2
			rounded-r-md
			border border-slate-300
			bg-white
			text-gray-700 text-base
			placeholder:text-gray-400
			shadow-sm
			appearance-none
			focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
		"
	/>
</div>
