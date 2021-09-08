import WeatchercastProvider from '@store/Weathercast.context';

import './App.scss';

const Weathercast = () => {
    return (
        <div className="container">
            <h1>Weathercast</h1>
            <div className="center">
                <WeatchercastProvider>
                    
                </WeatchercastProvider>
            </div>
        </div>
    );
};

export default Weathercast;
