import 'styles/styles.scss'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import 'globals'
import { Chat } from 'views'

ReactDOM.render(
    React.createElement(AppContainer, { }, React.createElement(Chat)),
    document.getElementById('root')
)
