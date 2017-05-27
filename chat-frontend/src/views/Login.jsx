import { Button, TextInput } from 'components'

const Login = () => {
    const loginCredentials = Atom({ name: '' })
    const name = loginCredentials.view('name')

    return (
        <div className="layout">
            <h2>Choose your name: </h2>
            <div className="margin--bottom-medium" >
                <TextInput
                    id="loginNameInput"
                    name="name"
                    placeholder="Type Your Name Here"
                    value={name} />
            </div>
            <Button
                id="login-button"
                disabled={U.isEmpty(loginCredentials.view('name'))}
                onClick={() => console.log('moi')}>
                    Log in
            </Button>
        </div>
    )
}

export default Login
