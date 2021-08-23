import { useState } from 'react';
import styles from './Form.module.css';

const Form: React.FC = () => {
    const [city, setCity] = useState('');

    const cityInputHandler = (event: { target: HTMLInputElement }) => setCity(event.target.value);

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();

        if (city.trim().length === 0) {
            alert('INVALID VALUE');
        } else {
            console.log(city);
            setCity('');
        }
    };

    return (
        <form onSubmit={submitHandler} className={styles.form}>
            <input onChange={cityInputHandler} value={city} type="text" />
            <button type="submit">search</button>
        </form>
    );
};

export default Form;
