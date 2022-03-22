import Head from 'next/head'
import styles from '../styles/Header.module.scss'

function Headersite(props) {
  const Capitalized = str => {
      if (typeof str !== 'string') {
          return '';
      }
      return str.charAt(0).toUpperCase() + str.substr(1);
  }
  const nome = Capitalized(props.nome); 
  const titleName = (nome)? '| '+nome : '' ;
  return (
    <div>
        <Head>
            <title>Pokedex {titleName}</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <header>
            <h1 className={styles.title}>Pokedex</h1>
            <h2 className={styles.subtitle}>{nome}</h2>
        </header>
    </div>
    
  )
}

export default Headersite
