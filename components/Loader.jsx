import styles from '../styles/Home.module.css'
import Image from 'next/image';
import images from '../assets';
const Loader = ({ loaderType, text, loading }) => {

    if(loaderType == 'loaderWithText') 
    return (
        <div className={styles.spinner1}>
        {
            loading &&
            <Image src={images.spinner1} alt="loader" width={100} objectFit="contain" />
        }
            
            {
                text && 
                <p className={styles.spinnerText}>{text}</p>
            }
        </div>
    )

    if(loaderType == 'loaderOnly') 
    return (
        <div className={styles.spinner1}>
            <Image src={images.spinner1} alt="loader" width={100} objectFit="contain" />
        </div>
    )

    return(

        <h1>Ok</h1>
    )
}


export default Loader;
