import styles from '../styles/Home.module.css'
import Image from 'next/image';
import images from '../assets';
const Loader = ({ color }) => {

    if(color == 'blue') 
    return (
        <div className={styles.spinner1}>
            <Image src={images.spinner1} alt="loader" width={100} objectFit="contain" />
        </div>
    )

    if(color == 'green') 
    return (
        <div className={styles.spinner2}>
            <Image src={images.loader} alt="loader" width={100} objectFit="contain" />
        </div>
    )
}


export default Loader;
