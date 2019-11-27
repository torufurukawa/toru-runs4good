import 'react'
import Head from 'next/head'
import Locate from '../../components/Locate'

const path = '/trust'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const imageUrl = this.props.host + require('./no.png')
    const redirectUrl = this.props.host + this.props.path

    return (
      <div>
        <Head key="head">
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@torurunsforgood" />
          <meta name="twitter:title" content="信じない" />
          <meta name="twitter:image" content={imageUrl} />
          <meta http-equiv="refresh" content={`0; URL='${redirectUrl}'`} />
        </Head>
      </div>
    )
  }
}

export default Locate(path, App)
