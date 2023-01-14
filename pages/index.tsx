import Head from 'next/head'
import { Montserrat } from "@next/font/google"
import { Container, Text, Collapse, Card } from '@nextui-org/react'
import { useState, useEffect } from 'react'
const montserrat = Montserrat({ subsets: ['latin'] });

import { VscArrowDown } from 'react-icons/vsc'

// import Telgramjson type
import Telegramjson from '@/interfaces/Telegramjson';
import TelegramMessage from '@/interfaces/TelegramMessage';

function Home({ hasInvadedData,telegramMessageCount, telegramMessages } : 
  {hasInvadedData: boolean, telegramMessageCount: number, telegramMessages: Array<TelegramMessage>}) {
  const [hasInvaded, setHasInvaded] = useState(Boolean);
  const [messages, setMessages] = useState(Array<TelegramMessage>);
  
  useEffect(() => {
    setHasInvaded(hasInvadedData);
    setMessages(telegramMessages);
  }, [])

  return (
    <>
      <Head>
        <title>{hasInvaded ? "Invasion has begun!" : "Taiwan is still free!"}</title>
        <meta name="description" content="Check if China has invaded Taiwan with this simple Website!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container id="wrapper" style={{ 
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center",
        minHeight: "90vh",
        }} className={ montserrat.className }>
        <Text h1 weight="light">Has China invaded Taiwan?</Text>
        <Text color={hasInvaded ? "error" : "success"} h2 >{hasInvaded ? "Yes" : "Not yet"}</Text>
        <Collapse id='collapse' title="Latest news">
          <Container style={{ 
            display: "flex", 
            flexDirection: "column", 
            justifyContent: "center", 
            alignItems: "center",
            gap: "5rem", 
            width: "100%",
            padding: "1rem"
            }}>
            {messages.map((message, index) => {
              return (
                <Card key={index} style={{ margin: 0 }} className={ montserrat.className }>
                    <Card.Header>
                      <Text h5 weight="light">{message.reactions.results.map((reaction : any, index: any) => {
                        return (
                          <span key={index}>{reaction.reaction.emoticon} {reaction.count} </span>
                        )
                      })}</Text>
                    </Card.Header>
                    <Card.Body>
                      <Text h4 weight="light" dangerouslySetInnerHTML={{ __html: message.message}}></Text>
                    </Card.Body>
                    <Card.Footer>
                      <Text h5 weight="light">{new Date(message.date * 1000).toLocaleString()} Last edited: {new Date(message.edit_date * 1000).toLocaleString()}</Text>
                    </Card.Footer>
                </Card>
              )
            })}
          </Container>
        </Collapse>
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
  
  // fetch json from https://tg.i-c-a.su/json/TaiwanWarIntel
  const data = await fetch('https://tg.i-c-a.su/json/TaiwanWarIntel', { method: "GET" })
  const telegramFeed = await data.json();
    const telegramMessageCount = telegramFeed.messages.length;
    const telegramMessages = telegramFeed.messages;

  const hasInvadedData = await hasChinaInvadedTaiwan();
  
  return {
    props: {hasInvadedData, telegramMessageCount, telegramMessages},
  }
}

export default Home