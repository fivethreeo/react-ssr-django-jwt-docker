import React from 'react';

export const CookieContext = React.createContext(null);

export function withCookies(Component) {
    return function WrapperComponent(props) {
        return (
            <CookieContext.Consumer>
                {state => <Component {...props} cookies={state} />}
            </CookieContext.Consumer>
        );
    };
}

export default CookieContext.Provider;