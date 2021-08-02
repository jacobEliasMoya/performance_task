import React from 'react';
import Main from './ui/layout/Main';
import Navbar from './ui/layout/Navbar';
import Overlay from './ui/layout/Overlay';

// adding in overlay 
const App: React.FC = () => {
    return (
        <div id='rootapp' className="App">
            <Overlay/>
            <Navbar />
            <Main />
        </div>
    );
};

export default App;
