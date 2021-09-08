import WeatchercastProvider from '@store/Weathercast.context';
import Searcher from '@components/Searcher/Searcher';

import './App.scss';

const Weathercast = () => {
    return (
        <div className="container">
            <h1>Weathercast</h1>
            <div className="center">
                <WeatchercastProvider>
                    <Searcher />
                </WeatchercastProvider>
            </div>
        </div>
    );
};

export default Weathercast;
