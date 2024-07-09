<svelte:options customElement="bmi-calculator" />

<script lang="ts">
	/**
	 * BMI計算機コンポーネント
	 *
	 * このコンポーネントは、ユーザーの身長と体重を入力として受け取り、
	 * BMIを計算して結果を表示します。
	 */

	import "../app.css"
	import { writable } from "svelte/store"

	/** BMI判定 */
	const BmiKind = {
		Under: "under",
		Normal: "normal",
		Over: "over",
	} as const
	type BmiKind = (typeof BmiKind)[keyof typeof BmiKind]

	let weight = writable<number | null>(null)
	let height = writable<number | null>(null)
	let bmi = writable<number>(0)
	let result = writable<BmiKind | null>(null)

	// 体重と身長の値が変更されたらBMIをリセット
	weight.subscribe(resetBMI)
	height.subscribe(resetBMI)

	/**
	 * BMIをリセットする関数
	 *
	 * この関数は、BMIの値が0でない場合にBMIを0にリセットします。
	 */
	function resetBMI(): void {
		if ($bmi === 0) return
		$bmi = 0
		$result = null
	}

	/**
	 * BMIを計算する関数
	 *
	 * この関数は、体重と身長を入力として受け取り、BMIを計算して結果を表示します。
	 */
	function calculateBMI(): void {
		// TODO: 体重と身長が入力されていない場合はエラーメッセージを表示する
		if ($weight === null || $height === null) return

		const weightValue = $weight
		const heightValue = $height / 100 // cmをmに変換
		$bmi = Number((weightValue / (heightValue * heightValue)).toFixed(1))

		if ($bmi < 18.5) {
			$result = BmiKind.Under
		} else if ($bmi < 25) {
			$result = BmiKind.Normal
		} else {
			$result = BmiKind.Over
		}
	}
</script>

<div class="max-w-xl mx-auto bg-white rounded-lg border border-gray-300">
	<div class="p-6">
		<h2 class="mb-4 text-xl font-bold text-center text-gray-800">
			自分の身長と体重を当てはめて<br />肥満度をチェックしてみましょう!
		</h2>

		<div class="px-8">
			<div class="flex space-x-4 my-8">
				<div class="flex-1 flex relative">
					<label
						for="weight"
						class="rounded-l-md inline-flex items-center min-w-20 px-3 border-t bg-white border-l border-b border-gray-300 text-gray-500 shadow-sm text-sm"
					>
						体重(kg)
					</label>
					<input
						id="weight"
						type="number"
						step="0.1"
						min="0"
						placeholder="60"
						bind:value={$weight}
						class="rounded-r-md flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
					/>
				</div>

				<div class="flex-1 flex relative">
					<label
						for="height"
						class="rounded-l-md inline-flex items-center min-w-20 px-3 border-t bg-white border-l border-b border-gray-300 text-gray-500 shadow-sm text-sm"
					>
						身長(cm)
					</label>
					<input
						id="height"
						type="number"
						step="1"
						min="0"
						placeholder="160"
						bind:value={$height}
						class="rounded-r-md flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
					/>
				</div>
			</div>

			<button
				type="button"
				on:click={calculateBMI}
				class="w-full py-3 bg-orange-500 hover:bg-orange-600 focus:ring-orange-500 focus:ring-offset-orange-200 text-white transition ease-in duration-200 text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
			>
				BMIを診断する
			</button>
		</div>

		<div class="mt-14 bg-gray-100 rounded-3xl px-6 py-4">
			<h3
				class="text-xl font-bold text-center text-gray-400 mb-4 pb-3 border-b-2 border-white"
				class:text-gray-800={$bmi > 0}
			>
				診断結果
			</h3>
			<div class="h-24 flex items-center justify-center">
				{#if $bmi > 0}
					<div class="flex justify-center items-center w-full h-full">
						<div class="flex-1 text-center">
							<p class="text-sm text-gray-600 mb-2">あなたのBMI</p>
							<p class="text-4xl font-bold">{$bmi}</p>
						</div>
						<div class="w-0.5 self-stretch bg-white mx-4"></div>
						<div class="flex-1 text-center">
							<p class="text-sm text-gray-600 mb-2">判定</p>
							{#if $result === BmiKind.Normal}
								<p class="text-4xl font-bold text-green-500">適正</p>
							{:else if $result === BmiKind.Under}
								<p class="text-4xl font-bold text-cyan-400">痩せ</p>
							{:else}
								<p class="text-4xl font-bold text-amber-400">
									肥満<span class="text-xl ml-1">気味</span>
								</p>
							{/if}
						</div>
					</div>
				{:else}
					<div class="text-gray-400 text-center">
						<p class="mb-3">― ここに診断結果が表示されます ―</p>
						<div class="inline-block text-left">
							<ol class="list-decimal list-inside">
								<li>「体重」と「身長」を入力してください。</li>
								<li>「BMIを診断する」を押すと診断結果が表示されます。</li>
							</ol>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>

	<div
		class="mt-4 py-6 px-12 text-sm text-gray-600 rounded-b-lg border-t border-gray-300 bg-gray-100"
	>
		<p class="mb-4">
			<span class="pr-2 font-semibold">BMI計算式：</span>体重kg ÷ 身長m ÷ 身長m = BMI
		</p>

		<p class="mb-2 font-semibold">BMI判定基準：</p>
		<table class="border-collapse table-auto">
			<thead>
				<tr class="bg-gray-200">
					<th class="font-normal border border-gray-300 px-4 py-1">BMI (18歳以上)</th>
					<th class="font-normal border border-gray-300 px-4 py-1">判定</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td class="border border-gray-300 px-4 py-1">18.5未満</td>
					<td class="border border-gray-300 px-4 py-1 text-center">痩せ</td>
				</tr>
				<tr>
					<td class="border border-gray-300 px-4 py-1">18.5以上～25.0未満</td>
					<td class="border border-gray-300 px-4 py-1 text-center">適正</td>
				</tr>
				<tr>
					<td class="border border-gray-300 px-4 py-1">25.0以上</td>
					<td class="border border-gray-300 px-4 py-1 text-center">肥満気味</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
