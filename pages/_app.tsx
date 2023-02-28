import { FC } from 'react'
import client from 'apollo-client';
import { ApolloProvider } from '@apollo/client/react';
import '../styles/Layout.scss'
import '../styles/Login.scss'
import '../styles/Input.scss'
import '../styles/Button.scss'
import '../styles/Musicadd.scss'
import '../styles/Audio.scss'
import '../styles/PlayList.scss'

import Layout from 'components/Layout/Layout/Layout';
import MyAudio from 'components/UI/MyAudio/MyAudio';


const MyApp:FC<any>=({ Component, pageProps })=> {
    return (
    <ApolloProvider client={client}>
        <Layout>
            <Component {...pageProps} />
            <MyAudio />
        </Layout>
    </ApolloProvider>)
}

export default MyApp