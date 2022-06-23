import styles from './Header.module.scss'
import Image from 'next/image'

export default function Header() {
    return (
        <div className={styles.header}> 
            <div className='container'>
               <div className={styles.header__upper}>
                    <a href="/" rel='norefferer' className={styles.header__logo}>
                        <Image
                            priority
                            src="/images/logo.svg"
                            height={45}
                            width={48}
                        />
                        <span className={styles.header__company}>Agency</span>
                    </a>   
                    <div className={styles.header__nav}>
                        <a href="#" rel="norefefferer" className={styles.header__item}>About</a>
                        <a href="#" rel="norefefferer" className={styles.header__item}>Services</a>
                        <a href="#" rel="norefefferer" className={styles.header__item}>Pricing</a>
                        <a href="#" rel="norefefferer" className={styles.header__item}>Blog</a>
                    </div> 
                    <button className={styles.header__button}>Contact</button>
                </div>
                <div className={styles.header__lower}>
                    <h1 className={styles.header__title}>Portfolio</h1>
                    <p className={styles.header__about}>Agency provides a full service range including technical skills, design, business understanding.</p>
                </div>
            </div>    
        </div>
    )
}