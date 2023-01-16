import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Link from "next/link"
export default function Home() {
  return (
    <div className={styles.container}>
      <Link href='http://localhost:2900/auth/v1/google-login'>google-login </Link><br></br>
      <Link href='http://localhost:2900/auth/v1/facebook-login'>facebook-login </Link>
    </div>
  )
}
