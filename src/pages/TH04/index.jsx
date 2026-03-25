import React from 'react';
import ReactDOM from 'react-dom';

import SoManager from './components/SoManager';
import QuyetDinhManager from './components/QuyetDinhManager';
import TruongManager from './components/TruongManager';
import VanBangForm from './components/VanBangForm';
import Search from './components/Search';

function App() {
    return (
        <div>
            <SoManager />
            <QuyetDinhManager />
            <TruongManager />
            <VanBangForm />
            <Search />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));