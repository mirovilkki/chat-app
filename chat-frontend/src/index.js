import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import 'globals'
import { Login } from 'views'

if (module.hot) {
    module.hot.accept()
}

ReactDOM.render(
    React.createElement(AppContainer, {}, React.createElement(Login)),
    document.getElementById('root')
)
