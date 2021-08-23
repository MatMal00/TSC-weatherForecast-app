import Form from '@components/form/Form';

import styles from './Weatchercast.module.css';

const Weathercast = () => {
    return (
        <div className={styles.container}>
            <h1>Weathercast</h1>
            <div className={styles.center}>
                <Form />
            </div>
        </div>
    );
};

export default Weathercast;
