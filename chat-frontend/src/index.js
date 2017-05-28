import 'styles/styles.scss'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import 'globals'
import { Chat } from 'views'

if (module.hot) {
    module.hot.accept()
}

ReactDOM.render(
    React.createElement(AppContainer, { className: 'app-container' }, React.createElement(Chat)),
    document.getElementById('root')
)
