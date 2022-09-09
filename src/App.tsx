import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { Button } from './components/Button';
import { defaultTheme } from './styles/themes/default';
import { GlobalStyle } from './styles/global';

function App() {
    const [count, setCount] = useState(0);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Button variants='primary'/>
            <Button variants='secondary'/>
            <Button variants='danger'/>
            <Button variants='sucess'/>
            <GlobalStyle/>
        </ThemeProvider>
    );
}

export { App }; 
