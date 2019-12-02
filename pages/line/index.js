import 'react'
import Head from 'next/head'
import Locate from '../../components/Locate'

const path = '/line'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const baseUrl = this.props.host + this.props.path
    const imageUrl = this.props.host + require('./line.png')

    return (
      <div>
        <Head>
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@torurunsforgood" />
          <meta name="twitter:title" content="国境なき医師団とLINEで友達になる" />
          <meta name="twitter:image" content={imageUrl} />
          <meta http-equiv="refresh" content="0;URL='https://line.me/R/ti/p/@msf_japan'" />
        </Head>
        <div></div>
      </div>

    )
  }
}

export default Locate(path, App)
