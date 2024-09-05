import React from 'react';

export const Login = () => {

    return (
        <>
            <div className="login-flex-container">
                <div className="login-container">
                    <h2>LOGIN</h2>

                    <form action="action_page.php" method="POST">
                        <div className="input-container">
                            <div className="icon-container">
                                <i className="bi bi-person"></i>
                            </div>
                            <input type="text" placeholder="Username"/>
                        </div>
                        <div className="input-container">
                            <div className="icon-container">
                                <i className="bi bi-shield-lock"></i>
                            </div>
                            <input type="text" placeholder="Password"/>
                        </div>
                        <input className="login-button" type="submit" value="Login Now"/>
                    </form>
                </div>

                <p className="freepik-attribution">Designed by Freepik.com</p>
            </div>
        </>
    )
}