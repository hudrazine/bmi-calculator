import './app.css'
import App from './App.svelte'

const app = new App({
  target: document.getElementById('bmi-calculator') as HTMLElement,
})

export default app
