// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";
import { connect } from "react-redux";

import { NavBar } from "../../Components";
import cx from "classnames";

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return {};
};

class GuidePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      data: [],
      selectedKey: "",
      tabs: [
        { key: "menu", name: "Menu Guide" },
        // { key: "travel", name: "Travel Guide" },
        { key: "service", name: "Helpful Service" },
        { key: "trans", name: "Public Transport" },
        { key: "holi", name: "Holidays & Hours" },
        { key: "area", name: "Areas & Maps" },
        { key: "emer", name: "Emergency" },
        { key: "korea", name: "About Korea" },
        { key: "contact", name: "Business Inquires (Contact Us)" }
      ]
    };
  }

  componentWillMount() {}

  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    const { tabs, selectedKey } = this.state;
    return (
      <div className="guidePage">
        <NavBar isActive="guide" />
        This is Guide Redux Page
        <div className="guidePage__notice">
          <div className="guidePage__notice__content">
            <div className="guidePage__notice__content__wrapper">
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                  justifyContent: "center",
                  textAlign: "left"
                }}
              >
                <p>Welcome!</p>
                <p>
                  Learn how to use <b>Hooah!U</b> smarter!
                </p>
              </div>
              <img src="" alt="" />
              <hr />
              {tabs.map(data => {
                return (
                  <div
                    key={data.key}
                    className={cx(
                      "guidePage__notice__content__wrapper__itemContainer",
                      {
                        "guidePage__notice__content__wrapper__itemContainer-active":
                          selectedKey === data.key
                      }
                    )}
                    onClick={() => this.handleClick(data.key)}
                  >
                    <div className="guidePage__notice__content__wrapper__itemContainer__item">
                      <p>{data.name}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="guidePage__feed">
          {selectedKey === "" ? (
            <div className="guidePage__feed__main">
              <div className="guidePage__feed__main__box">
                <h4>Travelers</h4>
                <h5>HOOAH!U and Travel-holics</h5>
                <h5>
                  <span>28,500+</span> <br />
                  USFK Personnel
                </h5>
              </div>
              <div className="guidePage__feed__main__box">
                <h4>Community Members & Leaders</h4>
                <h5>HOOAH!U between community and you</h5>
                <h5>
                  <span>3,500+</span> <br /> KATUSAS
                </h5>
              </div>
              <div className="guidePage__feed__main__box">
                <h4>Business Owners</h4>
                <h5>Our members may be in need of your business</h5>
                <h5>
                  <span>500+</span> <br /> Local Communities
                </h5>
              </div>
              <div className="guidePage__feed__main__title">
                <h3>CONNECTED</h3>
              </div>
            </div>
          ) : (
            <div className="guidePage__feed__content">
              <div className="guidePage__feed__content__header">
                {this.renderHead()}
              </div>
              <hr />
              <div className="guidePage__feed__content__body">
                {this.renderBody()}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  handleInput = e => {
    this.setState({ input: e.target.value });
  };

  handleClick = param => {
    this.setState({ selectedKey: param });
  };

  renderHead = () => {
    switch (this.state.selectedKey) {
      case "menu":
        return <h4>General Guide About Hooah!U's Service</h4>;
      case "service":
        return <h4>Helpful Service</h4>;
      case "trans":
        return <h4>General Information on Public Transportation</h4>;
      case "holi":
        return <h4>Holidays & Hours</h4>;
      case "area":
        return <h4>Four Areas and Major Cities in them</h4>;
      case "emer":
        return <h4>Emergency</h4>;
      case "korea":
        return <h4>Basics of Korea</h4>;
      case "contact":
        return (
          <h4>Your Business / Place Can be Promoted to All USFK Personnel</h4>
        );
      default:
        return null;
    }
  };

  renderBody = () => {
    switch (this.state.selectedKey) {
      case "menu":
        return (
          <div className="guidePage__feed__content__body-menu">
            <h5>Feed</h5>
            <h6>
              Feed에서 USFK 네트워크 사람들을 만나고 필요한 정보를 찾아보세요
            </h6>
            <p>
              Feed에서 USFK 네트워크의 사람들과 소통하고 필요한 정보를 찾을 수
              있습니다. 원하는 Post type에 맞게 선택해서 글을 확인할 수
              있습니다.
            </p>

            <h5>Package Trip</h5>
            <h6>PASS를 효과적으로 활용해보세요</h6>
            <p>
              패키지리스트는 제한된 시간과 거리 내에서 한국을 효율적으로
              여행하기 위해 후아유팀에서 만든 여행 패키지 메뉴입니다. 모든
              패키지들은 후아유 팀 멤버들이 직접 엄선하여 만들었습니다. <br />
              본인의 1)
              <span> 패스 Day수</span> 2)
              <span> 원하는 테마</span> 등에 따라 여행지를 sort하고 이용하면
              됩니다. 개별 장소는 추후 Place List에 업데이트 될 예정입니다.
            </p>

            <h5>Place List</h5>
            <h6>원하는 개별 장소를 찾아보세요</h6>
            <p>
              Place List에서는 당신이 원하는 개별 장소를 찾아볼 수 있습니다.
              후아유팀이 엄선해 둔 특정 지역의 특정 장소를 찾아보세요.
            </p>
          </div>
        );
      case "travel":
        return <div className="guidePage__feed__content__body-travel" />;
      case "service":
        return (
          <div className="guidePage__feed__content__body-service">
            <h5>Travel Hotline (24hours call service center)</h5>
            <h6>Dial : 1330</h6>
            <p>
              1330은 한국관광공사 산하에서 운영되고 있는 여행 핫 라인 서비스로
              여행과 관련해 발생할 수 있는 거의 모든 상황에 대해 지원을 해주고
              통역까지 도와줌. 여행 코스부터 환불 등에 필요한 통역 지원까지
              제공되며 가령 여권을 잃어버렸거나 하는 경우에도 1330 서비스를
              이용할 수 있음. 전화 연결 시 맨 처음에는 한국어로 안내가 되어
              영어를 듣기 위해서는 조금 기다려야 함. 기다리기 싫은 경우는 바로
              2번을 눌러 영어로 서비스를 받을 수 있음.
            </p>
            <h5>Visit Korea</h5>
            한국관광공사에서 운영하는 공식 여행정보 사이트. 여행관련 정보들이
            상당히 자세히 나와있으며 최신 업데이트로 유지되므로 참고하면 좋을
            것. <br />
            <br />
            1) App : Visit Korea : Official Guide <br />
            2) Web :{" "}
            <a href="https://english.visitkorea.or.kr/enu/TRV/TRV_MAIN.jsp">
              https://english.visitkorea.or.kr/enu/TRV/TRV_MAIN.jsp
            </a>
          </div>
        );
      case "trans":
        return (
          <div className="guidePage__feed__content__body-trans">
            <h5>Subway</h5>
            <p>
              Subway is definitely Korea’s most used public transportation. It’s
              available in five major cities (Seoul, Busan, Daegu, Gwangju and
              Daejeon) and you can practically get anywhere with it. You can
              also get to areas near Seoul with Shinbundang Line, Gyeongchun
              Line, Gyeongui-Jungang Line, Ever Line (the line to Everland!),
              Uisinseol Line, and more coming up.
            </p>

            <h6>Subway Fare</h6>
            <p>
              <img
                src="https://hooahu.agit.io/secure_link?sub=group&key=300113685&h=%2FHdx31AHF38nbOS52o9yGIYMJjU%3D&act=download&ref=302357423&url=https%3A%2F%2Fmud-kage.kakao.com%2Fdna%2FxOEFG%2FbtqoF6cHicb%2Fcipfv3c2q99ngqpavsiyxz%2Fo.png"
                alt="GuidePage_fig"
              />
            </p>

            <h6>How to purchase transportation card</h6>
            <p>
              Passengers can buy either a Single Journey Ticket or a
              rechargeable card (T-money, Cashbee or MPASS, etc.) at the ticket
              vending machine next to the ticket barrier. Both are only
              purchased by cash and you have to pay an additional ₩ 500 for
              security deposit. The deposit can be received when returning the
              card through the separate machine, (installed next to the ticket
              vending machine) after use.
            </p>

            <h6>Subway Lockers</h6>
            <p>
              If you have too much stuff with you and want to go around with
              your hands free, subway lockers are there for you. Locker fees and
              storage hours may vary depending on the terms and conditions of
              each facility and instructions are provided in multiple languages.
              <ul>
                <li>Basic storage time: 2-4 hours</li>
                <li>
                  Fees: Small locker: ₩ 2,000 / Medium locker: ₩ 3,000 / Large
                  locker: ₩ 4,000 <br />
                  <span>
                    ※ Fees may differ in each subway station. Additional fees
                    may be charged when basic storage time is exceeded.
                  </span>
                </li>
                <li>
                  Payment: All lockers accept payment with a transportation
                  card, while some lockers also accept payment in cash.
                </li>
              </ul>
            </p>

            <h5>Bus</h5>

            <h6>City Bus</h6>
            <p>
              <img
                src="https://hooahu.agit.io/secure_link?sub=group&key=300113685&h=YGx40WzJ1ngr7WSBrJBbF5hxe6M%3D&act=download&ref=302357422&url=https%3A%2F%2Fmud-kage.kakao.com%2Fdna%2F7QIKF%2FbtqoKI2vVeD%2Fajgpk44s6l9brsmwjebhxz%2Fo.png"
                alt="GuidePage_fig"
              />
            </p>
            <p>
              City bus is another convenient way to go around Seoul. Buses in
              Seoul are classified by color: blue buses go on major roads and
              run for relatively long distances; green buses go for shorter
              distances and carry travelers between transfer points (i.e. subway
              stations and longer bus routes); red buses are express buses that
              go from Seoul to suburban areas; yellow buses operate on a closed
              circuit within a district of Seoul. <br />
              <a href="https://en.wikipedia.org/wiki/Seoul_Buses">
                Wikepedia : https://en.wikipedia.org/wiki/Seoul_Buses
              </a>
            </p>
            <p>
              <img
                src="https://hooahu.agit.io/secure_link?sub=group&key=300113685&h=HgpNMGHSUgkAFaeaeyZvmn5Q820%3D&act=download&ref=302357424&url=https%3A%2F%2Fmud-kage.kakao.com%2Fdna%2FchDDhn%2FbtqoJ6Cyxfn%2Fiduat6on6b0u3unlhih9xz%2Fo.png"
                alt="GuidePage_fig"
              />
            </p>

            <h6>Express Bus</h6>
            <p>
              Express buses run on expressways and make stop at a rest area but
              seldom make a stopover in a city other than its destination.
              Different fares apply for ilban (regular or standard) and udeung
              (luxury) buses. Udeung buses offer additional comfort with wider
              seats.
              <ul>
                <li>
                  Express Bus Terminals in Seoul <br />
                  Seoul Express Bus Terminal (Gyeongbu / Yeongdong Line) <br />
                  Central City Express Bus Terminal (Honam Line)
                </li>
                <li>
                  Express Bus Ticket Reservation and Schedule <br />
                  <a href="https://www.hticket.co.kr/main.do">
                    https://www.hticket.co.kr/main.do
                  </a>
                  <br />
                  <span>
                    ※ Available only in Korean before Seollal or Chuseok
                    holidays
                  </span>
                </li>
              </ul>
            </p>

            <h6>Intercity Bus</h6>
            <p>
              Intercity buses usually make stopovers at smaller cities while on
              its way from one region to another region. An intercity bus that
              runs directly from one region to its destination without any
              stopover is referred to as jikhaeng (direct route) or mujeongcha
              (non-stop). Ticket price for nighttime buses that run late at
              night usually cost more than daytime buses.
              <ul>
                <li>
                  Intercity Bus Terminals in Seoul <br />
                  Seoul Nambu Terminal <br />
                  Sangbong Terminal
                </li>
                <li>
                  Intercity Bus Ticket Reservation and Schedule <br />
                  <a href="www.bustago.or.kr">www.bustago.or.kr</a>
                  <br />
                  <a href="txbus.t-money.co.kr">txbus.t-money.co.kr</a>
                </li>
                <li>
                  Jonghap Express Bus Terminals in Seoul (Both express and
                  intercity) <br />
                  Dong Seoul Jonghap Terminal <br />
                  <a href="www.ti21.co.kr">www.ti21.co.kr (Korean only)</a>
                </li>
              </ul>
            </p>

            <h5>Taxi</h5>

            <h6>Taxis in Korea, the fastest and most convenient</h6>
            <p>
              In Korea, there are plentiful of taxis and they are clean, safe,
              and above all, inexpensive. They can be found at taxi stands in
              most busy city areas or hailed on the streets. There are also call
              taxis that can be requested by phone. However, call taxis are
              slightly more expensive than the taxis you flag down on the
              street. An increasing number of taxi drivers nowadays speak some
              English, which may be helpful for first-time visitors. <br />
              <br />
              While virtually all taxis operating in the Seoul area accept
              credit cards or pre-paid public transportation cards (T-money
              card), it is possible that some taxis in the outlying or isolated
              regions may request cash only. Keep this in mind and make sure to
              have some cash (in KRW) with you if you plan to use a cab in
              remote areas. The taxi fare is calculated by distance and time.
              Basic fares can slightly vary from region to region.
            </p>

            <h6>Basic fare</h6>
            <p>2,800-3,000won</p>

            <h6>Region</h6>
            <p>Varies by region.</p>

            <h6>Additional Fare by Meter</h6>
            <p>Fare calculated by distance travelled.</p>

            <h6>Details</h6>
            <p>
              In Seoul, Gyeonggi, Incheon and Busan, a surcharge of 20% applies
              during late-night hours (midnight-4am) and in the suburbs (N/A for
              other cities).
            </p>

            <h6>International Taxis</h6>
            <p>
              Korea offers special international taxis, which are driven by taxi
              drivers who can speak one or more foreign languages: English,
              Japanese or Chinese.
            </p>

            <p>
              <img
                src="https://hooahu.agit.io/secure_link?sub=group&key=300113685&h=n8yvKZBN3L3EvFl1G4%2FLfvnDM1g%3D&act=download&ref=302357418&url=https%3A%2F%2Fmud-kage.kakao.com%2Fdna%2FbDihW%2FbtqoIeuxoj0%2Fh6wkld4gmey3aab4704lxz%2Fo.jpg"
                alt="GuidePage_fig"
              />
              <a href="https://english.visitkorea.or.kr/enu/TRP/TP_ENG_7.jsp">
                Visitkorea Taxi :
                https://english.visitkorea.or.kr/enu/TRP/TP_ENG_7.jsp
              </a>
            </p>
          </div>
        );
      case "holi":
        return (
          <div className="guidePage__feed__content__body-holi">
            <h5>National Holiday</h5>
            <p>
              Koreans officially follow the Gregorian calendar, even though
              there are a few holidays that are based on the lunar calendar.
              During the official holidays, offices and banks are closed but
              palaces, museums, most restaurants, department stores, and
              amusement facilities are open. <b>Seollal</b> and <b>Chuseok</b>{" "}
              are the most important traditional holidays for Koreans, so
              millions of people visit their hometowns to celebrate with their
              families during these times. On Seollal, Koreans hold a memorial
              service for their ancestors and perform sebae, a formal bow of
              respect to their elders as a New Year's greeting.
            </p>

            <h5>Usual Business Hours</h5>
            <h6>Banks</h6>
            <p>
              Weekdays: 09:00 – 16:00 <br />
              Weekends and National Holidays: Closed
            </p>

            <h6>Government Offices and Organizations</h6>
            <p>
              Weekdays: 09:00 – 18:00 <br />
              Weekends and National Holidays: Closed
            </p>

            <h6>Post Offices</h6>
            <p>
              Weekdays: 09:00 – 18:00 <br />
              Public Holidays: Closed <br />
              Nationwide list:{" "}
              <a href="www.koreapost.go.kr">
                www.koreapost.go.kr (Korean, English)
              </a>
              <br />
              List of post offices in Seoul:{" "}
              <a href="english.seoul.go.kr">english.seoul.go.kr (English)</a>
            </p>

            <h6>Foreign Diplomatic Missions</h6>
            <p>
              Weekdays: Hours vary, <br /> please see the following link for
              more information >>{" "}
              <a href="http://www.mofat.go.kr/ENG/main/index.jsp">
                Ministry of Foreign Affairs and Trade (English)
              </a>
              <br />
              Weekends and National Holidays: Closed
            </p>

            <h6>Department Stores</h6>
            <p>
              10:30 – 20:00 <br />
              Typically one day a month (usually a Monday) department stores are
              closed to the public. However, closings will vary according to
              each store.
            </p>
          </div>
        );
      case "area":
        return (
          <div className="guidePage__feed__content__body-area">
            <p>
              <img
                src="https://hooahu.agit.io/secure_link?sub=group&key=300113685&h=il0F6c5m2q5Cb8yvOms%2FgqV9i%2Bg%3D&act=download&ref=302357419&url=https%3A%2F%2Fmud-kage.kakao.com%2Fdna%2FNUfP5%2FbtqoJw9j4uD%2Feou1t1cp0ux2oeunz8ruxz%2Fo.png"
                alt="GuidePage_fig"
              />
            </p>
          </div>
        );
      case "emer":
        return (
          <div className="guidePage__feed__content__body-emer">
            <h5>DIALING DSN FROM NON-DSN (EX: FROM CELLPHONE)</h5>
            <p>
              Casey: 0505-730-XXXX (LAST 4 DSN) <br />
              Red Cloud: 0505-732-XXXX <br />
              Stanley: 0505-732-XXXX <br />
              Yongsan: 05033-LAST 6 OF DSN <br />
              Humphreys: 0503-353-XXXX / 0503-354-XXXX (If DSN prefix w/ 754)
              <br />
              Daegu: 05033-LAST 6 OF DSN
            </p>

            <h5>AMBULANCE</h5>
            <p>
              Off Post: 119 <br />
              On Post: 911
            </p>

            <h5>MILLITARY POLICE (ON-POST / OFF-POST)</h5>
            <p>
              Casey: 730-4417 / 0505-730-4417 <br />
              Red Cloud: 732-6693 / 0505-732-6693 <br />
              Stanley: 732-5310 / 0505-732-5310 <br />
              Yongsan: 315-724-3004 / 05033-24-3004 <br />
              Hannam Village: 315-723-9131 / 05033-23-9131 <br />
              Humphreys: 753-3111 / 0503-353-3111 <br />
              Daegu: 764-4141 / 0503-364-4141
            </p>

            <h5>IF EMERGENCY AND YOU HAVE AVAILABLE TAXI NEAR YOU</h5>
            <h6>SHOW DRIVER</h6>
            <p>
              To nearest train station: 가까운 기차역으로 데려다 주세요.
              <br />
              To nearest subway station: 가까운 지하철역으로 데려다 주세요.
              <br />
              To nearest bus main-station(hub): 가까운 버스터미널로 데려다
              주세요. <br />
              To nearest hospital: 가까운 병원으로 데려다 주세요. 급합니다.
              <br />
              To nearest Korean police station: 가까운 경찰서로 데려다 주세요.
            </p>

            <h5>EMERGENCY CALL (OFF POST)</h5>
            <p>
              Police Department Tel: 112 <br />
              Fire Department Tel: 119 <br />
              Medical Emergencies Tel: 1339
            </p>

            <h5>1330 KOREA TRAVEL HOTLINE (MULTILINGUAL ASSISTANCE)</h5>
            <p>
              The 1330 Korea Travel Hotline, operated by the Korea Tourism
              Organization, is a one-stop helpline available as a public service
              for both local and international travelers. Click{" "}
              <a
                className="here"
                href="http://english.visitkorea.or.kr/enu/TRV/TV_ENG_3_1.jsp"
              >
                here
              </a>{" "}
              to learn more.
            </p>
          </div>
        );
      case "korea":
        return (
          <div className="guidePage__feed__content__body-korea">
            <h5>About Korea (Visit Korea)</h5>
            <p>
              <a href="https://english.visitkorea.or.kr/enu/AKR/AKR_MAIN.jsp">
                https://english.visitkorea.or.kr/enu/AKR/AKR_MAIN.jsp
              </a>
            </p>

            <h5>Where is Korea?</h5>
            <p>
              The Korean peninsula is located in North-East Asia. It is
              surrounded by the ocean on three sides, making it a unique
              geographical location. With Seoul as its capital city, the
              landsite is roughly 1,030 km (612 miles) long and 175 km (105
              miles) wide at its narrowest point. Korea's total land area is
              100,033 square km, neighboring Japan to the east, China to the
              west, and sharing a northern border with Democratic People's
              Republic of Korea (North Korea). <br />
              <br />
              According to the Ministry of Government Administration and Home
              Affairs, as of July 2015, the total population of Korea is
              51,448,183, ranking 26th globally by country. Out of the total
              population, roughly 20% live in Seoul, the capital city of Korea.
              Other large and economically advanced cities such as Busan,
              Incheon, Daegu, Daejeon, Gwangju and Ulsan have higher population
              densities than other cities in Korea.
            </p>

            <h5>National Flag</h5>
            <p>
              <b>Taegeukgi</b> : Its design symbolizes the principles of the yin
              and yang in oriental philosophy. The circle in the center is
              divided into two equal parts, where the upper red responds to the
              active cosmic forces of the yang; conversely, the lower blue
              section represents the passive cosmic forces of the yin. The
              flag's background is white, representing Korean’s desire for peace
              and purity. The circle is surrounded by four trigrams, one in each
              corner, characterizing continual movement, balance and harmony.
              Each trigram symbolizes one of the four universal elements
              (heaven, earth, fire, and water).
            </p>

            <h5>National Flower</h5>
            <p>
              <b>Mugunghwa</b> : The national flower of Korea is mugunghwa, or
              rose of Sharon, which comes into bloom from July to October every
              year. Profusions of the blossom gracefully decorate the entire
              nation during that time, providing a view which has been loved by
              all Korean for many years. It is also favorite plant of the people
              as the flower’s symbolic significance stems from the Korean word
              ‘mugung’, meaning immortality. This word accurately reflects the
              enduring nature of Korean culture, and the determination and
              perseverance of the Korean people.
            </p>

            <h5>National Anthem</h5>
            <p>
              <b>Aegukga</b> : Aegukga literally means 'a song expressing one’s
              love towards their country' in Korean, and that was the exact
              reason this anthem came to be born. Since its creation, the song
              has undergone several versions of transition; however, it remained
              focused on praising the sense of loyalty to the country. Maestro
              Ahn Eak-tai (1905-1965) is credited with having made the present
              form of the song in 1935, which was then adopted by the Korean
              Government (1948) officially as the national anthem and began to
              be used at all schools and official functions.
            </p>

            <p className="guidePage__feed__content__body-korea__fig56">
              <img
                src="https://hooahu.agit.io/secure_link?sub=group&key=300113685&h=wn%2FWCM%2Bs3ZN3LealenheCOETQ88%3D&act=download&ref=302357421&url=https%3A%2F%2Fmud-kage.kakao.com%2Fdna%2FckBpZV%2FbtqoI4Zy8Xq%2Fjvkfa52qgcjxkpvik9aaxz%2Fo.png"
                alt="GuidePage_fig"
              />
              <img
                src="https://hooahu.agit.io/secure_link?sub=group&key=300113685&h=4BNYlSUUbhdShoY8QhyYpSDODQE%3D&act=download&ref=302357417&url=https%3A%2F%2Fmud-kage.kakao.com%2Fdna%2Fb4bK4Z%2FbtqoI5D8g3K%2F5iv2zg2loqeg9eatpuycxz%2Fo.jpg"
                alt="GuidePage_fig"
              />
            </p>

            <h5>Weather</h5>
            <p className="guidePage__feed__content__body-korea__fig7">
              <img
                src="https://hooahu.agit.io/secure_link?sub=group&key=300113685&h=m2Wagm7IVa9HEoGIoVfjqgmSrpE%3D&act=download&ref=302357420&url=https%3A%2F%2Fmud-kage.kakao.com%2Fdna%2FyAVsm%2FbtqoECJUXHG%2Fbuoj2e9numd7nmr66inuxz%2Fo.png"
                alt="GuidePage_fig"
              />
            </p>
          </div>
        );
      case "contact":
        return (
          <div className="guidePage__feed__content__body-contact">
            <q> 당신의 비즈니스를 미군들에게 알려보세요! </q>

            <h5>Contact Point</h5>
            <p>
              <a href="">team@hooahu.com</a>
            </p>
          </div>
        );
      default:
        return null;
    }
  };
}

GuidePage.defaultProps = defaultProps;
GuidePage.propTypes = propTypes;

export default connect(mapStateToProps)(GuidePage);
