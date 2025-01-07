import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.js'
import * as serviceWorker from './serviceWorker'

console.time('Render Time')

function waitForRender() {
  return new Promise(resolve => {
    ReactDOM.render(<App />, document.getElementById('root'))
    setTimeout(resolve, 0)
  })
}

waitForRender().then(() => {
  console.timeEnd('Render Time')
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
