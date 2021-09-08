import './Searcher.scss';

const Searcher: React.FC = () => {
    return (
        <div className="searcher">
            <form>
                <input type="text" placeholder="Please enter a city name" />
                <button type="submit">search</button>
            </form>
        </div>
    );
};

export default Searcher;
