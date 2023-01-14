import Head from 'next/head'
import { Montserrat } from "@next/font/google"
import { Container, Text } from '@nextui-org/react'

import { useState, useEffect } from 'react'

const montserrat = Montserrat({ subsets: ['latin'] });

function Home({ hasInvadedData } : {hasInvadedData: boolean}) {
  const [hasInvaded, setHasInvaded] = useState(hasInvadedData);
  
  useEffect(() => {
    setHasInvaded(hasInvadedData);
  }, [])

  return (
    <>
      <Head>
        <title>{hasInvaded ? "Invasion has begun!" : "Taiwan is still free!"}</title>
        <meta name="description" content="Check if China has invaded Taiwan with this simple Website!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container style={{ 
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center",
        minHeight: "90vh",
        }} className={ montserrat.className }>
        <Text h1 weight="light">Has China invaded Taiwan?</Text>
        <Text h2 >{hasInvaded ? "Yes" : "Not yet"}</Text>
      </Container>
      <Container>
        <Text >Source: <a href="https://en.wikipedia.org/wiki/Taiwan">https://en.wikipedia.org/wiki/Taiwan</a></Text>
      </Container>
    </>
  )
}

import { hasChinaInvadedTaiwan } from '@/lib/HasChinaInvadedTaiwan';

// get static props from API
export async function getServerSideProps({ req, res} : {req: any, res: any}) {

  res.setHeader (
    'Cache-Control', 
    'public, s-maxage=10, stale-while-revalidate=59'
  )
  const hasInvadedData = await hasChinaInvadedTaiwan();
  return {
    props: {hasInvadedData},
  }
}

export default Home