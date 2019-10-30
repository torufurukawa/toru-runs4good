import Head from 'next/head'
import Locate from '../components/Locate'
import Cuckoo from '@torufurukawa/cuckoo'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Carousel } from 'react-bootstrap'
import '@torufurukawa/cuckoo/dist/style.css'

const path = '/types'
class App extends React.Component {
  get initialState() {
    return { lang: null, page: 0, type: null }
  }

  contents = {
    hasLicense: {
      ja: {
        text: <span>
          最初の質問です。<br />
          医療関係の資格💊 💉を持っていますか？
        </span>,
        yes: '持っている🙋‍',
        no: '持っていない🙅‍'
      },
      en: {
        text: <span>
          First question.<br />
          Do you have a health💊 or medical💉 related license?
        </span>,
        yes: 'Yes 🙋‍',
        no: 'No 🙅‍'
      }
    },
    whatLicense: {
      ja: {
        text: <span>それは、なんて資格ですか？</span>,
        doctor: '医師💉 ',
        nurse: '看護師🌡️',
        midwife: '助産師👶',
        pharmacist: '薬剤師💊',
        other: 'その他🔍'
      },
      en: {
        text: <span>Which license do you have?</span>,
        doctor: 'Doctor 💉 ',
        nurse: 'Nurse 🌡️',
        midwife: 'Midwife 👶',
        pharmacist: 'Pharmacist 💊',
        other: 'Other 🔍'
      }
    },
    preference: {
      ja: {
        text: <span>どちらの種類の作業が得意？</span>,
        admin: '決まったことをコツコツ ✍️',
        logistician: 'ゼロから立ち上げ ⛏'
      },
      en: {
        text: <span>Which type of work do you prefer?</span>,
        admin: 'Follow procedures precisely ✍️',
        logistician: 'Launch from zero ⛏'
      }
    },
    result: {
      ja: {
        doctor: <span>👩‍⚕️あなたはズバリ「医師」タイプ。<br />
          国境なき医師団では、けがをした人を治療する外科医や整形外科医、
          麻酔科医、感染症や栄養失調の治療などにあたる内科医や小児科医、
          産婦人科医、救急専門医などが活躍しているそうです。</span>,
        nurse: <span>👨‍⚕️あなたはズバリ「看護師」タイプ。<br/>
          国境なき医師団の看護師は、患者の看護ケアや手術の介助にあたるほか、
          現地の利用スタッフの教育や指導、
          病院の衛生管理も重要な役割なのだそうです。
        </span>,
        midwife: <span>👶あなたはズバリ「助産師」タイプ。<br/>
          国境なき医師団の助産師は、安全な出産のため、
          妊娠中から出産・産後まで母とこの健康をサポートしているそうです。
        </span>,
        pharmacist: <span>💊あなたはズバリ「薬剤師」タイプ。<br/>
          国境なき医師団の薬剤師は、
          医薬品の在庫や保存環境の管理を担当したり、
          使用する医薬品の許可などについて、
          現地の政府と交渉にあたることもあるそうです。
        </span>,
        admin: <span>あなたはズバリ「アドミニストレーター」タイプ✍️<br/>
          国境なき医師団のアドミニストレーターは、
          現地スタッフの雇用や給与の支払い、教育などの人事管理と、
          予算や経理などの財務管理を主に担当しているそうです。
        </span>,
        logistician: <span>あなたはズバリ「ロジスティシャン」タイプ🛠️<br/>
          国境なき医師団のロジスティシャンは、
          物資の調達、医療施設の建設や、通信機器・車両・発電機などの管理、
          水・衛生システムの構築、スタッフの安全確保など、
          医療と人事・財務以外をすべて担当するそうです。</span>,
        next: <span>いかがでしたか？
          フォロワーにも、ぜひタイプ診断を体験してもらいたいですね！</span>,
        button: '結果をツイートする'
      },
      en: {
        doctor: <span>👩‍⚕️ "Doctor" is suitable for you.<br />
          MSF doctor team consists of surgeons who treats injury,
          anesthesiologist, physicians who treats infectious diseases,
          obstetrician, gynecologist and emergency specialist.</span>,
        nurse: <span>👨‍⚕️ "Nurse" is suitable for you.<br/>
          In addition to assisting patients with nursing care and surgery,
          local staff education for
          hospital hygiene management is also an important role for MSF nurses.
        </span>,
        midwife: <span>👶 "Midwife" is suitable for you.<br/>
          From visiting expectant moms deep in the jungle to carry out
          ante-natal checks, to training birth attendants
          in busy maternity departments in hospital,
          MSF midwives are a vital part of our project teams.
        </span>,
        pharmacist: <span>💊 "Pharmacist" is suitable for you.<br/>
          MSF pharmacists are meticulous and savvy planners,
          ensuring medications are stocked, transported and distributed
          appropriately, whether as part of an ongoing programme or in response
          to a sudden disease outbreak.
        </span>,
        admin: <span>✍️ "Administrator" is suitable for you.<br/>
          Human Resources and Finance Administrators at MSF deliver
          support the logistical and medical teams by providing sound project
          administrative management. <br/>
          The HR and Finance Administrator for any MSF field project oversees
          personnel records and participates in the hiring, training and
          supervision of local staff.
        </span>,
        logistician: <span>🛠️ "Logistician" is suitable for you.<br/>
          MSF logisticians make sure our projects are equipped with everything
          that's needed to deal with an emergency. <br/>
          From collecting supplies off an MSF plane on a makeshift runway,
          to working with the medical team to forecast medical supplies months
          in advance, the work of a supply logistician is far reaching and
          vital to the whole team.</span>,
        next: <span>How was that? Share the result to your followers!</span>,
        button: 'Tweet'
      }
    },
    share: {
      ja: {
        template: [
          '🌟国境なき医師団エキスパート診断の結果🌟\n',
          '「<TYPE>」タイプでした\n',
          '国境なき医師団は、色んな分野のエキスパート集団なんだって。\n',
          'みんなも診断を試してみて！👇\n',
          '#ToruRunsForGood\n',
          '<URL>'
        ].join(''),
        role: {
          doctor: '👩‍⚕️医師',
          nurse: '👨‍⚕️看護師',
          midwife: '👶助産師',
          pharmacist: '💊薬剤師',
          admin: '✍️アドミニストレーター',
          logistician: '🛠️ロジスティシャン'
        }
      },
      en: {
        template: [
          '🌟The result of MSF expert test is...🌟\n',
          'I am suitable for "<TYPE>"\n',
          'Did you know MSF consists of many types of experts?\n',
          'Try this test and share your result!👇\n',
          '#ToruRunsForGood\n',
          '<URL>'
        ].join(''),
        role: {
          doctor: '👩‍⚕️ Doctor',
          nurse: '👨‍⚕️ Nurse',
          midwife: '👶 Midwife',
          pharmacist: '💊 Pharmacist',
          admin: '✍️ Administrator',
          logistician: '🛠️ Logistician'
        }
      }
    },
    card: {
      title: 'MSF Expert Test | 国境なき医師団診断',
      description: `What's your experties? | あなたは何タイプ？`
    }
  }

  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  render() {
    const lang = this.state.lang || 'ja'
    const hasLicense = this.contents.hasLicense[lang]
    const whatLicense = this.contents.whatLicense[lang]
    const preference = this.contents.preference[lang]
    const result = this.contents.result[lang]
    const share = this.contents.share[lang]
    const currentUrl = this.props.host + this.props.path

    let tweetText = share.template
    tweetText = tweetText.replace(/<TYPE>/, share.role[this.state.type])
    tweetText = tweetText.replace(/<URL>/, currentUrl)
    const webIntent = Cuckoo.linkToTweet(tweetText)
    const imageUrl = this.props.host + require('../static/typescard.jpg')

    return [
      <Head key="head">
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@torurunsforgood" />
        <meta name="twitter:title" content={this.contents.card.title} />
        <meta name="twitter:description" content={this.contents.card.description} />
        <meta name="twitter:image" content={imageUrl} />
      </Head>,
      <Cuckoo.Container key="body">
        <Carousel activeIndex={this.state.page}
          onSelect={() => { }}
          controls={false} indicators={false} interval={null}>
          <Carousel.Item>
            <LanguageSelector
              useEnglish={this.useEnglish.bind(this)}
              useJapanese={this.useJapanese.bind(this)} />
          </Carousel.Item>
          <Carousel.Item>
            <Cuckoo.Container>
              <Cuckoo.Text>{hasLicense.text}</Cuckoo.Text>
              <Cuckoo.Button onClick={() => { this.setState({ page: 2 }) }}>
                {hasLicense.yes}
              </Cuckoo.Button>
              <Cuckoo.Button onClick={() => { this.setState({ page: 3 }) }}>
                {hasLicense.no}
              </Cuckoo.Button>
            </Cuckoo.Container>
          </Carousel.Item>
          <Carousel.Item>
            <Cuckoo.Container>
              <a href="#" className="text-decoration-none"
                onClick={() => { this.setState({ page: 1 }) }}>
                &lt;
              </a>
              <Cuckoo.Text>{whatLicense.text}</Cuckoo.Text>
              {['doctor', 'nurse', 'midwife', 'pharmacist'].map(
                (key) => {
                  const callback = () => {
                    this.setState({ type: key, page: 4 })
                  }
                  return (
                    <Cuckoo.Button key={key} onClick={callback}>
                      {whatLicense[key]}
                    </Cuckoo.Button>
                  )
                }
              )}
              <Cuckoo.Button onClick={() => { this.setState({ page: 3 }) }}>
                {whatLicense.other}
              </Cuckoo.Button>
            </Cuckoo.Container>
          </Carousel.Item>
          <Carousel.Item>
            <Cuckoo.Container>
              <a href="#" className="text-decoration-none"
                onClick={() => { this.setState({ page: 1 }) }}>
                &lt;
              </a>
              <Cuckoo.Text>{preference.text}</Cuckoo.Text>
              {['admin', 'logistician'].map((key) => {
                const callback = () => {
                  this.setState({ type: key, page: 4 })
                }
                return (
                  <Cuckoo.Button key={key} onClick={callback}>
                    {preference[key]}
                  </Cuckoo.Button>
                )
              })}
            </Cuckoo.Container>
          </Carousel.Item>
          <Carousel.Item>
            <Cuckoo.Container>
              <a href="#" className="text-decoration-none"
                onClick={() => { this.setState({ page: 1 }) }}>
                &lt;
              </a>
              <Cuckoo.Text>
                {result[this.state.type]}
                <br/>
                {result.next}
              </Cuckoo.Text>
              <Cuckoo.Button href={webIntent}>{result.button}</Cuckoo.Button>
            </Cuckoo.Container>
          </Carousel.Item>
        </Carousel>
      </Cuckoo.Container>
    ]
  }

  useEnglish() {
    this.setLang('en')
  }

  useJapanese() {
    this.setLang('ja')
  }

  setLang(lang) {
    this.setState({ lang: lang, page: 1 })
  }
}

function LanguageSelector({ useJapanese, useEnglish }) {
  return (
    <Cuckoo.Container>
      <Cuckoo.Button onClick={useJapanese}>日本語</Cuckoo.Button>
      <Cuckoo.Button onClick={useEnglish}>English</Cuckoo.Button>
    </Cuckoo.Container>
  )
}

export default Locate(path, App)
