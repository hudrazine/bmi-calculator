import "./app.css"
import BmiCalculator from "./lib/BmiCalculator.svelte"

// マウント先の要素を取得
const target = document.getElementById("bmi") as HTMLElement

// 既存の子要素を削除します。
// マウント先の要素は基本的に子要素が空であることが望ましいが、
// 子要素に任意のテキストを指定しておくことでマウントされなかった場合に
// そのテキストが表示されるようにすることができる。
while (target.firstChild) {
	target.removeChild(target.firstChild)
}

const app = new BmiCalculator({
	target: target,
	props: {
		title: target.getAttribute("data-title"),
	},
})

export default app
