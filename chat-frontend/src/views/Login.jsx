import { Button } from 'components'

const Login = () => (
    <div className="container">
        <h2>Choose your name: </h2>
        <Button
            id="login-button"
            onClick={() => console.log('moi')}>
                Log in
        </Button>
    </div>
)

export default Login
