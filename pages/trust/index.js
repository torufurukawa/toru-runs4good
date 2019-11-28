import 'react'
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css'
import Locate from '../../components/Locate'
import Cuckoo from '@torufurukawa/cuckoo'
import '@torufurukawa/cuckoo/dist/style.css'

const path = '/trust'
const tweetId = '1199864308164751361'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { activeIndex: 0, tweetId }
  }

  render() {
    const baseUrl = this.props.host + this.props.path
    const yesContent = '🙆 信じる ' + baseUrl + '/yes'
    const yesUrl = inReplyTo(Cuckoo.linkToTweet(yesContent), tweetId)
    const noContent = '🙅 信じない ' + baseUrl + '/no'
    const noUrl = inReplyTo(Cuckoo.linkToTweet(noContent), tweetId)
    const imageUrl = this.props.host + require('./trust.jpg')

    return (
      <Cuckoo.Container>
        <Head>
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@torurunsforgood" />
          <meta name="twitter:title" content="信じる or 信じない" />
          <meta name="twitter:image" content={imageUrl} />
        </Head>
        <Cuckoo.Text>
          マラソン🏃するときに「一緒に走ろうな🤝！」<br />
          って言ってくる奴いるじゃないですか。<br />
          あれ、信じますか？ <br />
        </Cuckoo.Text>
        <Cuckoo.Button href={yesUrl}>🙆 信じる</Cuckoo.Button>
        <Cuckoo.Button href={noUrl}>🙅 信じない</Cuckoo.Button>
      </Cuckoo.Container>
    )
  }
}

function inReplyTo(url, tweetId) {
  return url + '&in_reply_to=' + tweetId
}

export default Locate(path, App)
