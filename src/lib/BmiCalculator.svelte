<script lang="ts">
	/**
	 * BMI計算機コンポーネント
	 *
	 * このコンポーネントは、ユーザーの身長と体重を入力として受け取り、
	 * BMIを計算して結果を表示します。
	 */
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
	let errorMessage = writable<string | null>(null)

	// 体重と身長の値が変更されたらBMIをリセット
	weight.subscribe(resetBMI)
	height.subscribe(resetBMI)

	// 体重または身長の値が変更されたらエラーメッセージをリセット
	$: {
		if ($weight !== null || $height !== null) {
			$errorMessage = null
		}
	}

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
	 * 入力値が不足している場合は、エラーメッセージを表示します。
	 */
	function calculateBMI(): void {
		if ($weight === null && $height === null) {
			$errorMessage = "体重と身長を入力してください。"
			return
		} else if ($weight === null) {
			$errorMessage = "体重を入力してください。"
			return
		} else if ($height === null) {
			$errorMessage = "身長を入力してください。"
			return
		}

		$errorMessage = null // エラーメッセージをリセット
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

<div class="tw-max-w-xl tw-mx-auto">
	<div class="tw-p-8 tw-bg-white tw-rounded-xl tw-border-2 tw-border-slate-300">
		<p class="tw-mb-4 tw-text-xl tw-font-bold tw-text-center tw-text-gray-700">
			自分の肥満度をチェックしてみましょう!
		</p>

		<!-- 入力ブロック -->
		<div class="tw-px-8">
			<div
				class="tw-flex tw-flex-col sm:tw-flex-row sm:tw-space-x-4 tw-space-y-4 sm:tw-space-y-0 tw-my-8"
			>
				<InputField
					id="weight"
					label="体重(kg)"
					bind:value={$weight}
					placeholder="60"
					step="0.1"
					min="0"
					class="tw-w-full sm:tw-w-1/2"
				/>

				<InputField
					id="height"
					label="身長(cm)"
					bind:value={$height}
					placeholder="160"
					step="1"
					min="0"
					class="tw-w-full sm:tw-w-1/2"
				/>
			</div>

			<div class="tw-relative">
				{#if $errorMessage}
					<p
						class="tw-absolute -tw-top-4 tw-left-0 tw-right-0 tw-text-red-500 tw-text-sm tw-text-center tw-bg-white tw-py-1"
					>
						{$errorMessage}
					</p>
				{/if}
				<button
					type="button"
					on:click={calculateBMI}
					class="
						tw-w-full tw-py-3 tw-mt-4
						tw-rounded-lg
						tw-bg-red-500
						tw-text-white tw-text-lg tw-text-center tw-font-semibold
						tw-transition tw-ease-in tw-duration-200
						hover:tw-bg-red-600
						focus:tw-outline-none focus:tw-ring-2 tw-ring-red-500 focus:tw-ring-offset-2 focus:tw-ring-offset-red-200
					"
				>
					BMIを診断する
				</button>
			</div>
		</div>

		<!-- 診断結果表示ブロック -->
		<div
			class="tw-flex tw-flex-col tw-min-h-48 tw-mt-10 tw-px-8 tw-py-4 tw-bg-slate-100 tw-rounded-3xl"
		>
			<h3
				class="tw-text-xl tw-font-normal tw-text-center tw-text-gray-500 tw-mb-4 tw-pb-3 tw-border-b-2 tw-border-white"
				class:tw-text-gray-700={$bmi > 0}
			>
				診断結果
			</h3>
			<div class="tw-flex-1 tw-flex tw-items-center tw-justify-center">
				{#if $bmi > 0}
					<div class="tw-flex tw-justify-center tw-items-center tw-w-full tw-h-full">
						<div class="tw-flex-1 tw-text-center">
							<p class="tw-text-base tw-text-gray-700 tw-mb-2">あなたのBMI</p>
							<p class="tw-text-4xl tw-font-bold">{$bmi}</p>
						</div>
						<div class="tw-w-0.5 tw-self-stretch tw-bg-white tw-mx-4"></div>
						<div class="tw-flex-1 tw-text-center">
							<p class="tw-text-base tw-text-gray-700 tw-mb-3">判定</p>
							{#if $result === BmiKind.Normal}
								<p class="tw-text-4xl tw-font-bold tw-text-emerald-500">適正</p>
							{:else if $result === BmiKind.Under}
								<p class="tw-text-4xl tw-font-bold tw-text-cyan-500">やせ</p>
							{:else}
								<p class="tw-text-4xl tw-font-bold tw-text-amber-500">
									肥満<span class="tw-text-xl tw-ml-1">気味</span>
								</p>
							{/if}
						</div>
					</div>
				{:else}
					<div class="tw-text-gray-500 tw-text-center">
						<div class="tw-inline-block tw-text-left">
							<ol class="tw-list-decimal tw-pl-5">
								<li class="tw-mb-2">
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

	<!-- 注釈 -->
	<div class="tw-mt-2 tw-px-4 tw-text-sm tw-text-gray-500">
		<p>
			<span class="tw-pr-2">BMI計算式：</span>体重kg ÷ (身長m × 身長m) = BMI
		</p>
		<p>
			<span class="tw-pr-2">BMI判定基準：</span>18.5未満 (痩せ) / 18.5以上～25.0未満 (適正) /
			25.0以上(肥満気味)
		</p>
	</div>
</div>
