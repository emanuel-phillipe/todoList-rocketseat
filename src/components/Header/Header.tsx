
import LogoFull from '../../assets/LogoFull.svg'
import styles from './Header.module.css'

export function Header(){
    return (
        <header className={styles.header}>
            <img src={LogoFull}/>
        </header>
    )
}