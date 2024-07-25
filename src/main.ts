import "./app.css"
import App from "./App.svelte"

/**
 * Svelteアプリを指定した要素にマウントし、既存の子要素を削除します。
 *
 * @param {HTMLElement} target - マウント先のHTML要素
 */
const target = document.getElementById("bmi") as HTMLElement

// 既存の子要素を削除します。
// マウント先の要素は基本的に子要素が空であることが望ましいが、
// 子要素に任意のテキストを指定しておくことでマウントされなかった場合に
// そのテキストが表示されるようにすることができる。
while (target.firstChild) {
	target.removeChild(target.firstChild)
}

const app = new App({
	target: target,
})

export default app
