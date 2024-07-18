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
	import InputField from "./InputField.svelte"

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

<div class="max-w-xl mx-auto">
	<div class="p-8 bg-white rounded-xl border-2 border-slate-300">
		<h2 class="mb-4 text-xl font-bold text-center text-gray-700">
			自分の肥満度をチェックしてみましょう!
		</h2>

		<div class="px-8">
			<div class="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 my-8">
				<InputField
					id="weight"
					label="体重(kg)"
					bind:value={$weight}
					placeholder="60"
					step="0.1"
					min="0"
					class_name="w-full sm:w-1/2"
				/>

				<InputField
					id="height"
					label="身長(cm)"
					bind:value={$height}
					placeholder="160"
					step="1"
					min="0"
					class_name="w-full sm:w-1/2"
				/>
			</div>

			<button
				type="button"
				on:click={calculateBMI}
				class="
					w-full py-3
					rounded-lg
					bg-red-500
					text-white text-lg text-center font-semibold
					transition ease-in duration-200
					hover:bg-red-600
					focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-red-200
				"
			>
				BMIを診断する
			</button>
		</div>

		<div class="flex flex-col min-h-48 mt-10 px-8 py-4 bg-slate-100 rounded-3xl">
			<h3
				class="text-xl font-normal text-center text-gray-500 mb-4 pb-3 border-b-2 border-white"
				class:text-gray-700={$bmi > 0}
			>
				診断結果
			</h3>
			<div class="flex-1 flex items-center justify-center">
				{#if $bmi > 0}
					<div class="flex justify-center items-center w-full h-full">
						<div class="flex-1 text-center">
							<p class="text-base text-gray-700 mb-2">あなたのBMI</p>
							<p class="text-4xl font-bold">{$bmi}</p>
						</div>
						<div class="w-0.5 self-stretch bg-white mx-4"></div>
						<div class="flex-1 text-center">
							<p class="text-base text-gray-700 mb-3">判定</p>
							{#if $result === BmiKind.Normal}
								<p class="text-4xl font-bold text-emerald-500">適正</p>
							{:else if $result === BmiKind.Under}
								<p class="text-4xl font-bold text-cyan-500">やせ</p>
							{:else}
								<p class="text-4xl font-bold text-amber-500">
									肥満<span class="text-xl ml-1">気味</span>
								</p>
							{/if}
						</div>
					</div>
				{:else}
					<div class="text-gray-500 text-center">
						<div class="inline-block text-left">
							<ol class="list-decimal pl-5">
								<li class="mb-2">
									<span>「体重」と「身長」を入力してください。</span>
								</li>
								<li>
									<span>「BMIを診断する」を押すと診断結果が表示されます。</span>
								</li>
							</ol>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>

	<div class="mt-2 px-4 text-sm text-gray-500">
		<p>
			<span class="pr-2">BMI計算式：</span>体重kg ÷ (身長m × 身長m) = BMI
		</p>
		<p>
			<span class="pr-2">BMI判定基準：</span>18.5未満 (痩せ) / 18.5以上～25.0未満 (適正) /
			25.0以上(肥満気味)
		</p>
	</div>
</div>
