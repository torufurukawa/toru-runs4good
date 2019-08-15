import 'react'
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Carousel, InputGroup, FormControl } from 'react-bootstrap'
import Cuckoo from '@torufurukawa/cuckoo'
import '@torufurukawa/cuckoo/dist/style.css'

// -------------------------------------------------------------
// App
// -------------------------------------------------------------

class App extends React.Component {
  static get initialState() {
    return {
      lang: null,
      activeIndex: 0,
      estimate: { hours: '', minutes: '' },
      location: ''
    }
  }

  charitySheetUrl = 'https://www.runwithheart.jp/charity_sheet/23530'
  contents = {
    intro: {
      ja: {
        text: <span>
          「国境なき医師団」って、医療スタッフ以外にも、
          色んなエキスパートが協力しあって、
          医療・人道援助活動を行っているんですよ。<br />
          ご存知でした？
        </span>,
        yes: '知ってた 🙆',
        no: '知らなかった 🙅‍'
      },
      en: {
        text: <span>
          Did you know?<br />
          Médecins Sans Frontières (MSF) provides medical care
          with many types of expertes as well as medical staff.
        </span>,
        yes: 'Yes, I knew it. 🙆',
        no: `No, I didn't 🙅‍`
      }
    },
    donate: {
      ja: {
        text: <span>
          そうでしたか。<br />
          医療だけでなく、ロジスティクス、アドミニストレーション、水供給など
          様々な分野のエキスパートが協力して、
          国境なき医師団の活動が成り立っているらしですよ。<br />
          @ToruRunsForGood は、国境なき医師団のチャリティランナーとして、
          東京マラソンに出願しています。<br />
          みなさんからのご協力をぜひお願いいたします。
        </span>,
        ok: 'ならば寄付しよう💡',
        done: 'もう寄付したよ💸',
        url: this.charitySheetUrl
      },
      en: {
        text: <span>
          Oh, is that right?<br />
          In addition to medical staff, MSF teams include logisticians,
          water specialists, and administrators, among others. <br/>
          In some countries they establish emergency units.<br />
          @ToruRunsForGood is applying for Tokyo Marathon charity to support MSF<br />
          Your gift will help them bring medical cae to people in need.
        </span>,
        ok: 'I will happily support 💡',
        done: 'I supported 💸',
        url: this.charitySheetUrl
      }
    },
    timeEstimation: {
      ja: {
        text: <span>
          ありがとうございます！<br />
          ところで、@ToruRunsForGood は、
          東京マラソンを何時間何分ぐらいで完走できると思いますか？
        </span>,
        next: '次へ👉'
      },
      en: {
        text: <span>
          Thank you!<br />
          By the way, how long do you think
          @ToruRunsForGood will take to finish his Tokyo Marathon race?
        </span>,
        next: 'Next 👉'
      }
    },
    location: {
      ja: {
        text: <span>
          2020年3月1日は、どこで @ToruRunsForGood を応援👋してくれますか？
        </span>,
        buttons: [
          'スタートの東京都庁🏢',
          '17km折返しの雷門🏮',
          '中間点の門前仲町🍺',
          '36km折返しの高輪🏗',
          'フィニッシュの東京駅前🚃',
          'Twitter🐦'
        ]
      },
      en: {
        text: <span>
          On March 1st, 2020, where will you send your woohoo👋 to @ToruRunsForGood?
        </span>,
        buttons: [
          'at Shinjuku, starting point 🏢',
          'at Kaminari Mon, 17km/10mi point 🏮',
          'at Monzen Nakacho, the half point 🍺',
          'at Takanawa, 36km/22mi point 🏗',
          'at Tokyo Station, finish line 🚃',
          'on Twitter 🐦'
        ]
      }
    },
    prompt: {
      ja: {
        templateLines: [
          '国境なき医師団 @MSFJapan を応援します 👏<BR>',
          'チャリティランナー @ToruRunsForGood が',
          '東京マラソン🗼🏃を<HOURS>:<MINUTES>⏰で完走できるように、',
          '<LOCATION>で応援します<BR> 👏 #ToruRunsForGood <URL>'
        ]
      },
      en: {
        templateLines: [
          'I support @MSFJapan charity runner @ToruRunsForGood.👏 ',
          'I will be <LOCATION> to cheer him <HOURS>:<MINUTES> marathon 🗼🏃 race. ',
          '#ToruRunsForGood <URL>'
        ]
      }
    },
    card: {
      title: '@ToruRunsForGood',
      description: 'Supporting MSF at Tokyo Marathon | 東京マラソンでチャリティランナーに申込中'
    }
  }

  constructor(props) {
    super(props)
    this.state = App.initialState
  }

  static async getInitialProps({ req }) {
    return {
      currentUrl: `https://${req.headers.host}${req.url}`,
      host: `https://${req.headers.host}`
    }
  }

  render() {
    console.log(this.state)
    const lang = this.state.lang || 'ja'
    const imageUrl = this.props.host + require('../static/cardimage.jpg')

    return [
      <Head key="head">
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@torurunsforgood" />
        <meta name="twitter:title" content={this.contents.card.title} />
        <meta name="twitter:description" content={this.contents.card.description} />
        <meta name="twitter:image" content={imageUrl} />
      </Head>,
      <Cuckoo.Container key="body">
        <Carousel activeIndex={this.state.activeIndex} onSelect={() => { }}
          controls={false} indicators={false} interval={null}>
          <Carousel.Item>
            <LanguageSelector
              useJapanese={this.useJapanese.bind(this)}
              useEnglish={this.useEnglish.bind(this)} />
          </Carousel.Item>
          <Carousel.Item>
            <IntroPage
              content={this.contents.intro[lang]}
              next={this.goToNext.bind(this)} />
          </Carousel.Item>
          <Carousel.Item>
            <DonatePage
              content={this.contents.donate[lang]}
              next={this.goToNext.bind(this)} />
          </Carousel.Item>
          <Carousel.Item>
            <TimeEstimationPage
              content={this.contents.timeEstimation[lang]}
              next={this.goToNext.bind(this)}
              estimate={this.state.estimate}
              onEstimateChange={this.onEstimateChange.bind(this)} />
          </Carousel.Item>
          <Carousel.Item>
            <LocationPage
              content={this.contents.location[lang]}
              onClick={this.setLocation.bind(this)} />
          </Carousel.Item>
        </Carousel>
      </Cuckoo.Container>
    ]
  }

  reset() {
    this.setState(App.initialState)
  }

  useEnglish() {
    this.setLang('en')
  }

  useJapanese() {
    this.setLang('ja')
  }

  setLang(lang) {
    this.setState({ lang: lang, activeIndex: 1 })
  }

  onEstimateChange(estimate) {
    this.setState({ estimate })
  }

  setLocation(location) {
    this.setState({ location }, () => {
      const data = []
      data['<HOURS>'] = this.state.estimate.hours
      data['<MINUTES>'] = this.state.estimate.minutes
      data['<LOCATION>'] = this.state.location
      data['<URL>'] = this.props.currentUrl
      data['<BR>'] = '\n'
      const lines = this.contents.prompt[this.state.lang || 'ja'].templateLines
      const template = lines.join('')
      const text = Object.keys(data).reduce((result, key) => {
        return result.replace(key, data[key])
      }, template)

      const url = Cuckoo.linkToTweet(text)
      window.location.href = url
    })
  }

  goToNext() {
    this.setState({ activeIndex: this.state.activeIndex + 1 })
  }
}

// -------------------------------------------------------------
// Sub components
// -------------------------------------------------------------

function LanguageSelector({ useJapanese, useEnglish }) {
  return (
    <Cuckoo.Container>
      <Cuckoo.Button onClick={useJapanese}>日本語</Cuckoo.Button>
      <Cuckoo.Button onClick={useEnglish}>English</Cuckoo.Button>
    </Cuckoo.Container>
  )
}

function IntroPage({ content, next }) {
  return (
    <Cuckoo.Container>
      <Cuckoo.Text>{content.text}</Cuckoo.Text>
      <Cuckoo.Button onClick={next}>{content.yes}</Cuckoo.Button>
      <Cuckoo.Button onClick={next}>{content.no}</Cuckoo.Button>
    </Cuckoo.Container>
  )
}

function DonatePage({ content, next }) {
  return (
    <Cuckoo.Container>
      <Cuckoo.Text>{content.text}</Cuckoo.Text>
      <Cuckoo.Button href={content.url}>
        {content.ok}
      </Cuckoo.Button>
      <Cuckoo.Button onClick={next}>{content.done}</Cuckoo.Button>
    </Cuckoo.Container >
  )
}

function TimeEstimationPage({ content, next, estimate, onEstimateChange }) {
  const hours = estimate.hours
  const minutes = estimate.minutes
  const ready = hours != '' && minutes != ''
  const hourOptions = ['3', '4', '5', '6']
  const minuteOptions = ['00', '15', '30', '45']

  return (
    <Cuckoo.Container>
      <Cuckoo.Text>{content.text}</Cuckoo.Text>
      <InputGroup>
        <FormControl as="select" value={hours}
          onChange={(event) => {
            onEstimateChange({ hours: event.target.value, minutes: minutes })
          }}>
          <option value='' disabled>??</option>
          {hourOptions.map((v) => {
            return <option value={v} key={v}>{v}</option>
          })}
        </FormControl>
        <InputGroup.Append style={{ marginRight: '-1px' }}>
          <InputGroup.Text> : </InputGroup.Text>
        </InputGroup.Append>
        <FormControl as="select" value={minutes}
          onChange={(event) => {
            onEstimateChange({ hours: hours, minutes: event.target.value })
          }}>
          <option value='' disabled>??</option>
          {minuteOptions.map((v) => {
            return <option value={v} key={v}>{v}</option>
          })}
        </FormControl>
      </InputGroup>
      <Cuckoo.Button onClick={next} disabled={!ready}>
        {content.next}
      </Cuckoo.Button>
    </Cuckoo.Container >
  )
}

function LocationPage({ content, onClick }) {
  return (
    <Cuckoo.Container>
      <Cuckoo.Text>{content.text}</Cuckoo.Text>
      {content.buttons.map((v, i) => {
        return (
          <Cuckoo.Button key={i} onClick={() => { onClick(v) }}>
            {v}
          </Cuckoo.Button>
        )
      })}
    </Cuckoo.Container>
  )
}

function ResetButton({ reset }) {
  return (
    <div className="fixed-bottom text-center">
      <span onClick={reset} style={{ color: '#CCC', cursor: 'pointer' }}>■</span>
    </div>
  )
}

// -------------------------------------------------------------
// main
// -------------------------------------------------------------

export default App
