import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import ContactList from './ContactList'

export default function Home() {
  return (
    <div className={styles.container}>
       <ContactList />
    </div>
  )
}
