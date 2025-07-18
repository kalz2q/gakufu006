"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface MusicData {
  title: string;
  info: string;
  filename: string;
}

export default function MusicSheetApp() {
  const [musicData, setMusicData] = useState<MusicData[]>([]);
  const [currentMusic, setCurrentMusic] = useState<MusicData | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastSearchTerm, setLastSearchTerm] = useState("");

  useEffect(() => {
    document.title = "楽譜(音付き)";
    // 初期データをシャッフル (起動時1回のみ)
    setMusicData(shuffleArray([...initialData]));
  }, []);

  const shuffleArray = (array: MusicData[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleMusicSelect = (music: MusicData) => {
    setIsLoading(true);
    setLastSearchTerm(searchTerm);
    setCurrentMusic(music);
    setTimeout(() => setIsLoading(false), 300);
  };

  const handleBackToList = () => {
    setCurrentMusic(null);
    setSearchTerm(lastSearchTerm);
  };

  const filteredMusic = musicData.filter(
    (music) =>
      music.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      music.info.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {currentMusic ? (
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
            <button
              onClick={handleBackToList}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors whitespace-nowrap"
            >
              ← リストに戻る
            </button>
            <div className="w-full">
              <audio
                controls
                className="w-full ml-auto max-w-[800px]"
                src={`${currentMusic.filename}.mp3`}
              />
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  {currentMusic.title}
                </h1>
                {currentMusic.info && (
                  <p className="text-gray-600">{currentMusic.info}</p>
                )}
              </div>

              <div className="border rounded-lg overflow-hidden">
                <Image
                  src={`${currentMusic.filename}.svg`}
                  alt={`${currentMusic.title} 楽譜`}
                  width={1200}
                  height={600}
                  layout="responsive"
                  quality={100}
                />
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-6">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
              無料楽譜サイト(音付き)
            </h1>

            <div className="mb-6">
              <input
                type="text"
                placeholder="曲名、歌い出し、ジャンルなどで検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="overflow-hidden rounded-lg border">
              <ul className="divide-y divide-gray-200">
                {filteredMusic.map((music, index) => (
                  <li
                    key={index}
                    onClick={() => handleMusicSelect(music)}
                    className={`px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-lg text-gray-800">
                        {music.title}
                      </span>
                      <span className="text-blue-500">▶</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {filteredMusic.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                該当する曲が見つかりませんでした
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// 初期データはそのまま
const initialData: MusicData[] = [
  {
    title:
      "埴生の宿(はにゅうのやどもわがやどたまのよそいうらやまじ 童謡・唱歌)",
    info: "",
    filename: "埴生の宿",
  },
  {
    title: "同期の桜(おまえとおれとはどうきのさくら 軍歌・戦時歌謡)",
    info: "",
    filename: "同期の桜",
  },
  {
    title: "ラジオ体操の歌(藤山一郎 童謡・唱歌 1951 大中恩)",
    info: "",
    filename: "ラジオ体操の歌",
  },
  {
    title: "クシコス・ポスト(ネッケ 運動会 クラシック Csikos Post)",
    info: "",
    filename: "クシコスポスト",
  },
  {
    title: "冬のソナタ(最初から今まで 冬ソナ NHK 韓国ドラマ テレビ)",
    info: "",
    filename: "冬のソナタ",
  },
  {
    title: "叱られて(しかられてあのこはまちまでおつかいに 童謡・唱歌)",
    info: "",
    filename: "叱られて",
  },
  {
    title: "学生時代(つたのからまるちゃぺるで 歌謡曲 ペギー葉山 1964 平岡精二)",
    info: "",
    filename: "学生時代",
  },
  {
    title: "この道(このみちはいつかきたみち 童謡・唱歌)",
    info: "",
    filename: "この道",
  },
  {
    title:
      "子鹿のバンビ(こじかのばんびはかわいいなおはながにおうはるのあさ 童謡・唱歌)",
    info: "",
    filename: "子鹿のバンビ",
  },
  {
    title:
      "さらば涙と言おう(さよならはだれにいうさよならはかなしみに 森田健作 歌謡曲)",
    info: "",
    filename: "さらば涙と言おう",
  },
  {
    title: "アブラハムの子(あぶらはむにはしちにんのこ 童謡・唱歌 洋楽)",
    info: "",
    filename: "アブラハムの子",
  },
  {
    title: "かっこう(かっこうかっこうどこかでなつをよぶもりのこえ 童謡・唱歌)",
    info: "",
    filename: "かっこう",
  },
  {
    title: "森の小人(もりのこかげでどんじゃらほい 童謡・唱歌)",
    info: "",
    filename: "森の小人",
  },
  {
    title: "君が代(きみがよはちよにやちよに 国歌)",
    info: "",
    filename: "君が代",
  },
  {
    title: "おうま(おうまのおやこはなかよしこよし 童謡・唱歌)",
    info: "",
    filename: "おうま",
  },
  {
    title: "金魚の昼寝(あかいべべきたかわいいきんぎょ 童謡・唱歌)",
    info: "",
    filename: "金魚の昼寝",
  },
  {
    title: "案山子(やまだのなかのいっぽんあしのかかし 童謡・唱歌)",
    info: "",
    filename: "案山子",
  },
  {
    title: "つき(でたでたつきが 童謡・唱歌)",
    info: "",
    filename: "つき",
  },
  {
    title:
      "月の沙漠(つきのさばくをはるばるとたびのらくだがゆきました 童謡・唱歌)",
    info: "",
    filename: "月の沙漠",
  },
  {
    title: "あんたがたどこさ(ひごさひごどこさくまもとさ 童謡・唱歌)",
    info: "",
    filename: "あんたがたどこさ",
  },
  {
    title: "山の音楽家(わたしゃおんがくかやまのこりす 童謡・唱歌)",
    info: "",
    filename: "山の音楽家",
  },
  {
    title: "山のロザリア(やまのむすめろざりあいつもひとりうたうよ 童謡・唱歌)",
    info: "",
    filename: "山のロザリア",
  },
  {
    title: "森の水車(みどりのもりのかなたから 童謡・唱歌)",
    info: "",
    filename: "森の水車",
  },
  {
    title: "ローレライ(なじかはしらねどこころわびて Lorelei 童謡・唱歌 洋楽)",
    info: "",
    filename: "ローレライ",
  },
  {
    title: "椰子の実(やしのみ。なもしらぬとおきしまより 童謡・唱歌)",
    info: "",
    filename: "椰子の実",
  },
  {
    title:
      "早春賦(はるはなのみのかぜのさむさやたにのうぐいすうたはおもえど 童謡・唱歌)",
    info: "",
    filename: "早春賦",
  },
  {
    title: "かなりや(うたをわすれたかなりやは 童謡・唱歌)",
    info: "",
    filename: "かなりや",
  },
  {
    title: "鎌倉(しちりがはまのいそづたい 童謡・唱歌)",
    info: "",
    filename: "鎌倉",
  },
  {
    title: "くつがなる(おててつないでのみちをゆけば 童謡・唱歌)",
    info: "",
    filename: "くつがなる",
  },
  {
    title:
      "TOMORROW(トゥモロー。なみだのかずだけつよくなれるよ 岡本真夜 JPOP 歌謡曲)",
    info: "",
    filename: "tomorrow",
  },
  {
    title: "一週間(にちようびにいちばにでかけ ロシア)",
    info: "",
    filename: "一週間",
  },
  {
    title: "かえるの合唱(かえるのうたがきこえてくるよ 童謡・唱歌)",
    info: "",
    filename: "かえるの合唱",
  },
  {
    title: "アマリリス(みんなできこうたのしいオルゴールを 童謡・唱歌)",
    info: "",
    filename: "アマリリス",
  },
  {
    title: "ステンカ・ラージン(くおんにとどろくゔぉるがのながれ ロシア)",
    info: "",
    filename: "ステンカ・ラージン",
  },
  {
    title: "さくら(さくらさくらやよいのそらはみわたすかぎり 童謡・唱歌)",
    info: "",
    filename: "さくら",
  },
  {
    title:
      "待ちぼうけ(まちぼうけあるひせっせとのらかせぎそこへうさぎがとんででて 童謡・唱歌)",
    info: "",
    filename: "待ちぼうけ",
  },
  {
    title:
      "夕焼け小焼け(ゆうやけこやけでひがくれてやまのおてらのかねがなる 童謡・唱歌)",
    info: "",
    filename: "夕焼け小焼け",
  },
  {
    title:
      "宇宙戦艦ヤマト(さらばちきゅうよたびだつふねはうちゅうせんかんやまと アニメ)",
    info: "",
    filename: "宇宙戦艦ヤマト",
  },
  {
    title: "スキーの歌(かがやくひのかげはゆるのやま 童謡・唱歌)",
    info: "",
    filename: "スキーの歌",
  },
  {
    title: "スキー(やまはしろがねあさひをあびて 童謡・唱歌)",
    info: "",
    filename: "スキー",
  },
  {
    title: "げんこつやまのたぬきさん(童謡・唱歌)",
    info: "",
    filename: "げんこつやま",
  },
  {
    title:
      "山寺の和尚さん(やまでらのおしょうさんがまりはけりたしまりはなし 童謡・唱歌。服部良一)",
    info: "",
    filename: "山寺の和尚さん",
  },
  {
    title: "雪(ゆきやこんこあられやこんこ 童謡・唱歌)",
    info: "",
    filename: "雪",
  },
  {
    title: "あわてんぼうのサンタクロース(クリスマス 童謡・唱歌)",
    info: "",
    filename: "あわてんぼうのサンタクロース",
  },
  {
    title: "四季の雨(ふるともみえじはるのあめ 童謡・唱歌。軍歌・戦時歌謡)",
    info: "",
    filename: "四季の雨",
  },
  {
    title: "もろびとこぞりて(クリスマス 童謡・唱歌)",
    info: "",
    filename: "もろびとこぞりて",
  },
  {
    title: "愛国行進曲(みよとうかいのそらあけて 軍歌・戦時歌謡)",
    info: "",
    filename: "愛国行進曲",
  },
  {
    title:
      "長崎の女(こいのなみだかそてつのはながかぜにこぼれるいしだたみ 歌謡曲)",
    info: "",
    filename: "長崎の女",
  },
  {
    title: "水師営の会見(りょじゅんかいじょうやくなりて 軍歌・戦時歌謡)",
    info: "",
    filename: "水師営の会見",
  },
  {
    title: "出征兵士を送る歌(わがおおきみにめされたる 軍歌・戦時歌謡)",
    info: "",
    filename: "出征兵士を送る歌",
  },
  {
    title:
      "亜麻色の髪の乙女(ヴィレッジ・シンガーズ。あまいろのながいかみをかぜが 歌謡曲。グループ・サウンズ)",
    info: "",
    filename: "亜麻色の髪の乙女",
  },
  {
    title:
      "高校三年生(あかいゆうひがこうしゃをそめて 歌謡曲 舟木一夫 1963 遠藤実)",
    info: "",
    filename: "高校三年生",
  },
  {
    title: "星に願いを(ディズニー ピノキオ かがやくほしにこころのゆめを 洋楽)",
    info: "",
    filename: "星に願いを",
  },
  {
    title: "樅の木(たんねんばうむ。もみのきもみのきおいやしげれる 童謡・唱歌)",
    info: "",
    filename: "樅の木",
  },
  {
    title:
      "ズンドコ節(きしゃのまどからてをにぎりおくってくれたひとよりも 軍歌・戦時歌謡。海軍小唄)",
    info: "",
    filename: "ズンドコ節",
  },
  {
    title:
      "さらばナポリ(Addio a Napoli わかれのときよいざいざさらば 洋楽 イタリア カンツォーネ)",
    info: "",
    filename: "さらばナポリ",
  },
  {
    title:
      "東京行進曲(むかしこいしいぎんざのやなぎあだなとしまをだれがしろ 歌謡曲)",
    info: "",
    filename: "東京行進曲",
  },
  {
    title: "アイルランドの子守歌(トゥラルーラルラー 洋楽 民謡 こもりうた)",
    info: "",
    filename: "アイルランドの子守歌",
  },
  {
    title:
      "この木なんの木(日立。このきなんのききになるきなまえもしらないきですから CMソング)",
    info: "",
    filename: "この木なんの木",
  },
  {
    title:
      "ホエン・アイ・フォール・イン・ラブ(When I Fall in Love 洋楽 めぐり逢えたら 映画音楽 Celine Dion)",
    info: "",
    filename: "whenifallinlove",
  },
  {
    title:
      "秋の夜半(ウェーバー。あきのよわのみそらすみて クラシック 魔弾の射手 童謡・唱歌)",
    info: "",
    filename: "秋の夜半",
  },
  {
    title:
      "ジョニーが凱旋するとき(When Johnny Comes Marching Home 洋楽 行進曲)",
    info: "",
    filename: "ジョニーが凱旋するとき",
  },
  {
    title: "お富さん(いきなくろべいみこしのまつに 歌謡曲 邦楽)",
    info: "",
    filename: "お富さん",
  },
  {
    title:
      "皆の衆(みなのしゅうみなのしゅううれしかったらはらからわらえ 演歌 村田英雄)",
    info: "",
    filename: "皆の衆",
  },
  {
    title:
      "チャンチキおけさ(つきがわびしいろじうらのやたいのさけのほろにがさ 演歌 三波春夫)",
    info: "",
    filename: "ちゃんちきおけさ",
  },
  {
    title: "Jupiter(ホルスト「惑星」よりジュピター「木星」クラシック)",
    info: "",
    filename: "木星",
  },
  {
    title: "恋は水色(ポール・モーリア 洋楽)",
    info: "",
    filename: "恋は水色",
  },
  {
    title: "広瀬中佐(とどろくつつおととびくるだんがん 軍歌・戦時歌謡)",
    info: "",
    filename: "広瀬中佐",
  },
  {
    title:
      "チム・チム・チェリー(ディズニー。メリー・ポピンズ。ちむちむにーちむちむにー 洋楽)",
    info: "",
    filename: "チム・チム・チェリー",
  },
  {
    title:
      "花まつり(ぬるんだみずにはるのひはうかびこぶねははなたばをつんではしる 洋楽 ラテン)",
    info: "",
    filename: "花まつり",
  },
  {
    title:
      "秋桜(うすべにのこすもすがあきのひのなにげないひだまりにゆれている 歌謡曲 山口百恵)",
    info: "",
    filename: "秋桜",
  },
  {
    title: "オーラ・リー(Aura Lee 洋楽)",
    info: "",
    filename: "オーラ・リー",
  },
  {
    title:
      "イエスタデイ・ワンス・モア(カーペンターズ Yesterday Once More 洋楽)",
    info: "",
    filename: "イエスタデイ・ワンス・モア",
  },
  {
    title:
      "あの丘越えて(やまのまきばのゆうぐれにかりがとんでるただいちわ 歌謡曲 美空ひばり 万城目正 1951 映画)",
    info: "",
    filename: "あの丘越えて",
  },
  {
    title:
      "誰よりも君を愛す(だれにもいわれずたがいにちかったかりそめのこいなら 歌謡曲 松尾和子)",
    info: "",
    filename: "誰よりも君を愛す",
  },
  {
    title: "春の唄(らららあかいはなたば 童謡・唱歌 歌謡曲)",
    info: "",
    filename: "春の唄ラララ",
  },
  {
    title: "春の歌(メンデルスゾーン クラシック)",
    info: "",
    filename: "メンデルスゾーンの春の歌",
  },
  {
    title:
      "春の唄(さくらのはなのさくころはうららうららとひはうらら 童謡・唱歌 歌謡曲)",
    info: "",
    filename: "春の唄さくら",
  },
  {
    title:
      "夢はひそかに(ディズニー「シンデレラ」より Dream Is a Wish Your Heart Makes 洋楽)",
    info: "",
    filename: "夢はひそかに",
  },
  {
    title:
      "シューベルトの子守歌(ねむれねむらははのむねに クラシック こもりうた)",
    info: "",
    filename: "シューベルトの子守歌",
  },
  {
    title:
      "シューベルトのアヴェ・マリア クラシック クリスマス アベマリア ラ・ノビア",
    info: "",
    filename: "シューベルトのアヴェ・マリア",
  },
  {
    title: "菩提樹(シューベルト。いずみにそいてしげるぼだいじゅ クラシック)",
    info: "",
    filename: "菩提樹",
  },
  {
    title: "シューベルトのセレナーデ(Schubert Serenade(Staendchen) クラシック)",
    info: "",
    filename: "シューベルトのセレナーデ",
  },
  {
    title:
      "ます(シューベルト。きよきながれをひかりはえてますははしれり クラシック)",
    info: "",
    filename: "ます",
  },
  {
    title:
      "ストーミー・マンデー(Tボーン・ウォーカー ブルース 洋楽 T-Bone Walker Blues)",
    info: "",
    filename: "ストーミー・マンデー",
  },
  {
    title: "シューベルトの野ばら(わらべはみたりのなかのばら クラシック)",
    info: "",
    filename: "シューベルトの野ばら",
  },
  {
    title: "セサミストリートのテーマ(さーにーでい 洋楽 テレビ)",
    info: "",
    filename: "セサミストリート",
  },
  {
    title:
      "心の窓に灯火を(いじわるこがらしふきつけるふるいせーたーあぼろしゅーず 歌謡曲 ザ・ピーナッツ)",
    info: "",
    filename: "心の窓に灯火を",
  },
  {
    title:
      "南から南から(みなみからみなみからとんできたきたわたりどり 軍歌・戦時歌謡 三原純子)",
    info: "",
    filename: "南から南から",
  },
  {
    title:
      "黒ネコのタンゴ(きみはかわいいぼくのくろねこあかいりぼんがよくにあうよ 童謡・唱歌)",
    info: "",
    filename: "黒ネコのタンゴ",
  },
  {
    title:
      "満州娘(わたしじゅうろくまんしゅうむすめはるよさんがつゆきどけに 軍歌・戦時歌謡)",
    info: "",
    filename: "満州娘",
  },
  {
    title:
      "この広い野原いっぱい(このひろいのはらいっぱいさくはなをひとつのこらず フォーク 歌謡曲)",
    info: "",
    filename: "この広い野原いっぱい",
  },
  {
    title:
      "快傑ハリマオ(かいけつはりまお。まっかなたいようもえているはてないみなみのおおぞらに 歌謡曲 テレビ 三橋美智也)",
    info: "",
    filename: "快傑ハリマオ",
  },
  {
    title: "麦と兵隊(じょしゅうじょしゅうとじんばはすすむ 軍歌・戦時歌謡)",
    info: "",
    filename: "麦と兵隊",
  },
  {
    title:
      "ラムのラブソング(あんまりそわそわしないであなたはいつでもきょろきょろ アニメ うる星やつら)",
    info: "",
    filename: "ラムのラブソング",
  },
  {
    title:
      "真っ赤な太陽(まっかにもえたたいようだからまなつのうみはこいのきせつなの 美空ひばり 歌謡曲)",
    info: "",
    filename: "真っ赤な太陽",
  },
  {
    title:
      "風(ひとはだれもただひとりたびにでてひとはだれもふるさとをふりかえる フォーク 歌謡曲 はしだのりひこ)",
    info: "",
    filename: "風",
  },
  {
    title: "勘太郎月夜唄(かげかやなぎかかんたろうさんが 歌謡曲 演歌 小畑実)",
    info: "",
    filename: "勘太郎月夜唄",
  },
  {
    title: "サーカスの唄(たびのつばくろさみしかないか 古賀政男 歌謡曲 演歌)",
    info: "",
    filename: "サーカスの唄",
  },
  {
    title:
      "矢切の渡し(つれてにげてよついておいでよゆうぐれのあめががふる ちあきなおみ 歌謡曲 演歌)",
    info: "",
    filename: "矢切の渡し",
  },
  {
    title: "ハバロフスク小唄(軍歌・戦時歌謡)",
    info: "",
    filename: "ハバロフスク小唄",
  },
  {
    title:
      "高原列車は行く(きしゃのまどからはんけちふれば 歌謡曲 岡本敦郎 古関裕而)",
    info: "",
    filename: "高原列車は行く",
  },
  {
    title:
      "カチューシャの唄(かちゅーしゃかわいやわかれのつらさ 1914 歌謡曲 松井須磨子)",
    info: "",
    filename: "カチューシャの唄",
  },
  {
    title: "カチューシャ(りんごのはなほころび ロシア)",
    info: "",
    filename: "カチューシャ",
  },
  {
    title:
      "赤鼻のトナカイ(Rudolph the Red-Nosed Reindeer、まっかなおはなの。クリスマス)",
    info: "",
    filename: "赤鼻のトナカイ",
  },
  {
    title: "ぶんぶんぶん(ぶんぶんぶんはちがとぶ 童謡・唱歌 ボヘミア 洋楽)",
    info: "",
    filename: "ぶんぶんぶん",
  },
  {
    title:
      "愛国の花(ましろきふじのけだかさを 軍歌・戦時歌謡 古関裕而 渡辺はま子)",
    info: "",
    filename: "愛国の花",
  },
  {
    title: "露営の歌(かってくるぞといさましく 古関裕而 軍歌・戦時歌謡)",
    info: "",
    filename: "露営の歌",
  },
  {
    title:
      "お座敷小唄(ふじのたかねにふるゆきもきょうとぽんとちょうにふるゆきも 歌謡曲 和田弘とマヒナスターズ)",
    info: "",
    filename: "お座敷小唄",
  },
  {
    title:
      "翼をください(いまわたしのねがいごとがかなうならば フォーク 歌謡曲 赤い鳥)",
    info: "",
    filename: "翼をください",
  },
  {
    title:
      "めえめえこやぎ(めえめえもりのこやぎこやぎはしればこいしにあたる 本居長世 児山羊 童謡・唱歌)",
    info: "",
    filename: "めえめえこやぎ",
  },
  {
    title: "十五夜お月さん(じゅうごやおつきさん 童謡・唱歌)",
    info: "",
    filename: "十五夜お月さん",
  },
  {
    title:
      "お山の杉の子(むかしむかしそのむかししいのきばやしのすぐそばに 童謡・唱歌 軍歌・戦時歌謡)",
    info: "",
    filename: "お山の杉の子",
  },
  {
    title:
      "狼なんかこわくない(Who's Afraid of the Big Bad Wolf ディズニー 洋楽  おおかみ 三匹の子豚)",
    info: "",
    filename: "狼なんかこわくない",
  },
  {
    title:
      "故郷を離るる歌(そののさゆりなでしこかきねのちぐさ ドイツ 童謡・唱歌)",
    info: "",
    filename: "故郷を離るる歌",
  },
  {
    title: "大きな栗の木の下で(おおきなくりのきのしたで 童謡・唱歌 イギリス)",
    info: "",
    filename: "大きな栗の木の下で",
  },
  {
    title: "茶摘み(ちゃつみ。なつもちかづくはちじゅうはちや 童謡・唱歌)",
    info: "",
    filename: "茶摘み",
  },
  {
    title:
      "蘇州夜曲(きみがみむねにだかれてきくは 服部良一 1940 軍歌・戦時歌謡 映画)",
    info: "",
    filename: "蘇州夜曲",
  },
  {
    title:
      "森のくまさん(あるひもりのなかくまさんにであった 童謡・唱歌 アメリカ スカウト)",
    info: "",
    filename: "森のくまさん",
  },
  {
    title:
      "二宮金次郎(しばかりなわないわらじをつくりおやのてをすけ 童謡・唱歌)",
    info: "",
    filename: "二宮金次郎",
  },
  {
    title: "富士山(あたまをくものうえにだししほうの 童謡・唱歌)",
    info: "",
    filename: "富士山",
  },
  {
    title: "海(まつばらとおくみゆるところしらほのかげはうかぶ 童謡・唱歌)",
    info: "",
    filename: "海(松原遠く)",
  },
  {
    title: "海(うみはひろいなおおきいなつきがのぼるしひがしずむ 童謡・唱歌)",
    info: "",
    filename: "海(海は広いな)",
  },
  {
    title:
      "チロルの子守歌(すずのひびきとおくやまのまきばくれて 童謡・唱歌 Austria Tirol Tyrol こもりうた)",
    info: "",
    filename: "チロルの子守歌",
  },
  {
    title: "軍艦マーチ(まもるもせむるもくろがねの 軍歌・戦時歌謡 軍艦行進曲)",
    info: "",
    filename: "軍艦マーチ",
  },
  {
    title: "ペチカ(ゆきのふるよはたのしいぺちか 童謡・唱歌)",
    info: "",
    filename: "ペチカ",
  },
  {
    title:
      "銀座カンカン娘(あのこかわいやかんかんむすめ 歌謡曲 服部良一 高峰秀子 笠置シヅ子)",
    info: "",
    filename: "銀座カンカン娘",
  },
  {
    title:
      "中国地方の子守唄(ねんねこさっしゃりませねたこのかわいさ 童謡・唱歌 こもりうた)",
    info: "",
    filename: "中国地方の子守唄",
  },
  {
    title:
      "五木の子守唄(おどまぼんぎりぼんぎりぼんからさきゃおらんど 童謡・唱歌 こもりうた)",
    info: "",
    filename: "五木の子守唄",
  },
  {
    title:
      "ジョスランの子守歌(Berceuse de Jocelyn クラシック Godard フランス こもりうた)",
    info: "",
    filename: "ジョスランの子守歌",
  },
  {
    title: "バードランドの子守唄(Lullaby of Birdland ジャズ こもりうた)",
    info: "",
    filename: "バードランドの子守唄",
  },
  {
    title: "江戸の子守唄(ねんねんころりよおころりよ 童謡・唱歌 こもりうた)",
    info: "",
    filename: "江戸の子守唄",
  },
  {
    title:
      "島原の子守唄(おどみゃしまばらのなしのきそだちよ 童謡・唱歌 こもりうた)",
    info: "",
    filename: "島原の子守唄",
  },
  {
    title:
      "モーツァルトの子守歌(ねむれよいこよにわやまきばに クラシック 童謡・唱歌 こもりうた)",
    info: "",
    filename: "モーツァルトの子守歌",
  },
  {
    title:
      "コサックの子守歌(ねむれやこさっくのいとしごよ 童謡・唱歌 ロシア こもりうた)",
    info: "",
    filename: "コサックの子守歌",
  },
  {
    title: "ブラームスの子守歌(ねむれよあこ クラシック こもりうた)",
    info: "",
    filename: "ブラームスの子守歌",
  },
  {
    title: "メリーさんの羊(めりーさんのひつじ 童謡・唱歌 洋楽)",
    info: "",
    filename: "メリーさんの羊",
  },
  {
    title: "旅笠道中(よるがつめたいこころがさむい 歌謡曲 1935 東海林太郎)",
    info: "",
    filename: "旅笠道中",
  },
  {
    title: "揺籃のうた(ゆりかごのうたをかなりやがうたうよねんねこ 童謡・唱歌)",
    info: "",
    filename: "揺籃のうた",
  },
  {
    title:
      "カントリー・ロード(ジョン・デンバー 故郷へ帰りたい Take Me Home, Country Roads 洋楽 1971)",
    info: "",
    filename: "カントリー・ロード",
  },
  {
    title:
      "汽車(いまはやまなかいまははまいまはてっきょうわたるぞと 童謡・唱歌)",
    info: "",
    filename: "汽車",
  },
  {
    title: "汽車ポッポ(きしゃきしゃぽっぽぽっぽしゅっぽしゅっぽ 童謡・唱歌)",
    info: "",
    filename: "汽車ポッポ",
  },
  {
    title:
      "南国土佐を後にして(なんごくとさをあとにして 1953 歌謡曲 ペギー葉山カバー 1959)",
    info: "",
    filename: "南国土佐を後にして",
  },
  {
    title:
      "サンタ・ルチア(ほしかげしろくうみをてらし 洋楽 童謡・唱歌 イタリア ナポリ 1849)",
    info: "",
    filename: "サンタ・ルチア",
  },
  {
    title:
      "からすの赤ちゃん(からすのあかちゃんなぜなくのこけこっこのおばさんに 童謡・唱歌)",
    info: "",
    filename: "からすの赤ちゃん",
  },
  {
    title:
      "箱根八里(はこねのやまはてんかのけんかんこくかんもものならず 童謡・唱歌 滝廉太郎 1901)",
    info: "",
    filename: "箱根八里",
  },
  {
    title: "どじょっこふなっこ(はるになればすがこもとけて 童謡・唱歌)",
    info: "",
    filename: "どじょっこふなっこ",
  },
  {
    title:
      "桃太郎(ももたろさんももたろさんおこしにつけたきびだんご 童謡・唱歌)",
    info: "",
    filename: "桃太郎",
  },
  {
    title:
      "はなさかじじい(うらのはたけでぽちがなくしょうじきじいさんほったれば 童謡・唱歌)",
    info: "",
    filename: "はなさかじじい",
  },
  {
    title:
      "証城寺の狸囃子(しょしょしょうじょうじしょうじょうじのにわは 童謡・唱歌)",
    info: "",
    filename: "証城寺の狸囃子",
  },
  {
    title: "かたつむり(でんでんむしむし 童謡・唱歌)",
    info: "",
    filename: "かたつむり",
  },
  {
    title:
      "うさぎとかめ(もしもしかめよかめさんよせかいのうちにおまえほど 童謡・唱歌)",
    info: "",
    filename: "うさぎとかめ",
  },
  {
    title:
      "かごめかごめ(かごめかごめかごのなかのとりはいついつでやる 童謡・唱歌)",
    info: "",
    filename: "かごめかごめ",
  },
  {
    title: "こいのぼり(やねよりたかい 童謡・唱歌)",
    info: "",
    filename: "こいのぼり",
  },
  {
    title: "鯉のぼり(いらかのなみとくものなみ 童謡・唱歌)",
    info: "",
    filename: "鯉のぼり",
  },
  {
    title: "田植え(そろたでそろたさなえがそろた 童謡・唱歌)",
    info: "",
    filename: "田植え",
  },
  {
    title:
      "竹田の子守唄(もりもいやがるぼんからさきにゃ 童謡・唱歌 フォーク 赤い鳥)",
    info: "",
    filename: "竹田の子守唄",
  },
  {
    title:
      "夕焼けとんび(ゆうやけぞらがまっかっかとんびがぐるりとわをかいた 歌謡曲 三橋美智也 1958)",
    info: "",
    filename: "夕焼けとんび",
  },
  {
    title: "鞠と殿様(てんてんてんまりてんてまり 童謡・唱歌)",
    info: "",
    filename: "鞠と殿様",
  },
  {
    title: "一月一日(いちがついちじつ、としのはじめのためしとて 童謡・唱歌)",
    info: "",
    filename: "一月一日",
  },
  {
    title: "荒城の月(はるこうろうのはなのえん 童謡・唱歌 滝廉太郎 1901)",
    info: "",
    filename: "荒城の月",
  },
  {
    title: "船頭小唄(おれはかわらのかれすすき 歌謡曲 1921)",
    info: "",
    filename: "船頭小唄",
  },
  {
    title: "船頭さん(むらのわたしのせんどさんは 童謡・唱歌 軍歌・戦時歌謡)",
    info: "",
    filename: "船頭さん",
  },
  {
    title:
      "ちょうちょう(ちょうちょうちょうちょうなのはにとまれ 童謡・唱歌 ドイツ)",
    info: "",
    filename: "ちょうちょう",
  },
  {
    title:
      "むすんでひらいて(むすんでひらいててをうってむすんで 童謡・唱歌 フランス ルソー)",
    info: "",
    filename: "むすんでひらいて",
  },
  {
    title: "日の丸の旗（しろじにあかくひのまるそめて 童謡・唱歌)",
    info: "",
    filename: "日の丸の旗",
  },
  {
    title: "チューリップ(さいたさいたちゅーりっぷのはなが 童謡・唱歌)",
    info: "",
    filename: "チューリップ",
  },
  {
    title: "こがねむし(こがねむしはかねもちだ 童謡・唱歌 黄金虫)",
    info: "",
    filename: "こがねむし",
  },
  {
    title:
      "権兵衛さんの赤ちゃん(ごんべさんのあかちゃん リパブリック讃歌 ヨドバシカメラ 童謡・唱歌)",
    info: "",
    filename: "権兵衛さんの赤ちゃん",
  },
  {
    title: "春の小川(はるのおがわはさらさらながる 童謡・唱歌)",
    info: "",
    filename: "春の小川",
  },
  {
    title: "シャボン玉(しゃぼんだまとんだやねまでとんだ 童謡・唱歌)",
    info: "",
    filename: "シャボン玉",
  },
  {
    title: "七つの子(からすなぜなくのからすはやまに 童謡・唱歌)",
    info: "",
    filename: "七つの子",
  },
  {
    title:
      "通りゃんせ(とおりゃんせとおりゃんせここはどこのほそみちじゃ 童謡・唱歌)",
    info: "",
    filename: "通りゃんせ",
  },
  {
    title:
      "ねこふんじゃった(ねこふんじゃったねこふんづけちゃったらひっかいた 童謡・唱歌)",
    info: "",
    filename: "ねこふんじゃった",
  },
  {
    title:
      "四季の歌(はるをあいするひとはこころきよきひと 歌謡曲 荒木とよひさ フォーク)",
    info: "",
    filename: "四季の歌",
  },
  {
    title: "背くらべ(はしらのきずはおととしの 童謡・唱歌)",
    info: "",
    filename: "背くらべ",
  },
  {
    title: "うさぎ(うさぎうさぎなにみてはねる 童謡・唱歌)",
    info: "",
    filename: "うさぎ",
  },
  {
    title: "兎のダンス(そそらそらそらうさぎのだんす 童謡・唱歌)",
    info: "",
    filename: "兎のダンス",
  },
  {
    title:
      "鉄道唱歌(きてきいっせいしんばしをはやわがきしゃははなれたり 童謡・唱歌)",
    info: "",
    filename: "鉄道唱歌",
  },
  {
    title: "女のみち(わたしがささげたそのひとに 歌謡曲 演歌 ぴんからトリオ)",
    info: "",
    filename: "女のみち",
  },
  {
    title: "ふるさと(うさぎおいしかのやまこぶなつりし 童謡・唱歌)",
    info: "",
    filename: "ふるさと",
  },
  {
    title:
      "ぞうさん(ぞうさんおはながながいのねそうよかあさんもながいのよ 童謡・唱歌)",
    info: "",
    filename: "ぞうさん",
  },
  {
    title: "菊の花(きれいなはなよきくのはな 童謡・唱歌)",
    info: "",
    filename: "菊の花",
  },
  {
    title:
      "村まつり(むらのちんじゅのかみさまのきょうはめでたいおまつりび 童謡・唱歌)",
    info: "",
    filename: "村まつり",
  },
  {
    title: "村の鍛冶屋(しばしもやすまずつちうつひびき  童謡・唱歌)",
    info: "",
    filename: "村の鍛冶屋",
  },
  {
    title: "浦島太郎(むかしむかしうらしまはたすけたかめに 童謡・唱歌)",
    info: "",
    filename: "浦島太郎",
  },
  {
    title: "赤いサラファン(あかいさらふぁんぬうてみても 童謡・唱歌 ロシア)",
    info: "",
    filename: "赤いサラファン",
  },
  {
    title: "池の鯉(でてこいでてこいいけのこい 童謡・唱歌)",
    info: "",
    filename: "池の鯉",
  },
  {
    title: "うぐいす(うめのこえだでうぐいすは 童謡・唱歌)",
    info: "",
    filename: "うぐいす",
  },
  {
    title:
      "水あそび(みずをたくさんくんできてみずでっぽうであそびましょ 童謡・唱歌)",
    info: "",
    filename: "水あそび",
  },
  {
    title: "花火(どんとなったはなびだきれいだな 童謡・唱歌)",
    info: "",
    filename: "花火",
  },
  {
    title: "おさるのかごや(えっさえっさえっさほいさっさ 童謡・唱歌)",
    info: "",
    filename: "おさるのかごや",
  },
  {
    title: "一寸法師(ゆびにたりないいっすんぼうし 童謡・唱歌)",
    info: "",
    filename: "一寸法師",
  },
  {
    title:
      "牛若丸(きょうのごじょうのはしのうえだいのおとこのべんけいは 童謡・唱歌)",
    info: "",
    filename: "牛若丸",
  },
  {
    title: "金太郎(まさかりかついできんたろう 童謡・唱歌)",
    info: "",
    filename: "金太郎",
  },
  {
    title: "たなばたさま(ささのはさらさらのきばにゆれる 童謡・唱歌)",
    info: "",
    filename: "たなばたさま",
  },
  {
    title: "みかんの花咲く丘(みかんのはながさいている 童謡・唱歌)",
    info: "",
    filename: "みかんの花咲く丘",
  },
  {
    title:
      "たわらはごろごろ(おくらにどっさりこおこめはざっくりこでちゅちゅねずみは 童謡・唱歌)",
    info: "",
    filename: "たわらはごろごろ",
  },
  {
    title: "われは海の子(われはうみのこしらなみの 童謡・唱歌)",
    info: "",
    filename: "われは海の子",
  },
  {
    title: "鳩(ぽっぽっぽはとぽっぽまめがほしいかそらやるぞ 童謡・唱歌)",
    info: "",
    filename: "鳩",
  },
  {
    title: "歌の町(よいこがすんでるよいまちは 童謡・唱歌)",
    info: "",
    filename: "歌の町",
  },
  {
    title:
      "めだかの学校(めだかのがっこうはかわのなかそっとのぞいてみてごらん 童謡・唱歌)",
    info: "",
    filename: "めだかの学校",
  },
  {
    title: "人形(わたしのにんぎょうはよいにんぎょう 童謡・唱歌)",
    info: "",
    filename: "人形",
  },
  {
    title: "真白き富士の嶺(七里ヶ浜の哀歌。ましろきふじのね 童謡・唱歌)",
    info: "",
    filename: "真白き富士の嶺",
  },
  {
    title: "ピクニック(おかをこえいこうよくちぶえふきつつ 童謡・唱歌 イギリス)",
    info: "",
    filename: "ピクニック",
  },
  {
    title:
      "丘を越えて(おかをこえていこうよますみのそらはほがらかに 1931 歌謡曲 藤山一郎 古賀政男)",
    info: "",
    filename: "丘を越えて",
  },
  {
    title: "港(そらもみなともよははれてつきにかずますふねのかげ 童謡・唱歌)",
    info: "",
    filename: "港",
  },
  {
    title: "かわいい魚屋さん(かわいいかわいいさかなやさん 童謡・唱歌)",
    info: "",
    filename: "かわいい魚屋さん",
  },
  {
    title:
      "おさななじみ(おさななじみのおもいではあおいれもんのあじがする 童謡・唱歌 デュークエイセス)",
    info: "",
    filename: "おさななじみ",
  },
  {
    title:
      "かわいいかくれんぼ(ひよこがねひよこがおにわでぴょこぴょこかくれんぼ 童謡・唱歌)",
    info: "",
    filename: "かわいいかくれんぼ",
  },
  {
    title:
      "あわて床屋(はるははようからかわべのあしにかにがみせだしとこやでござる 童謡・唱歌)",
    info: "",
    filename: "あわて床屋",
  },
  {
    title: "赤い帽子白い帽子(あかいぼうししろいぼうしなかよしさん 童謡・唱歌)",
    info: "",
    filename: "赤い帽子白い帽子",
  },
  {
    title:
      "かもめの水兵さん(かもめのすいへいさんならんだすいへいさん 童謡・唱歌)",
    info: "",
    filename: "かもめの水兵さん",
  },
  {
    title:
      "電車唱歌(たまのみやいはまるのうちちかきひびやにあつまれる 東京地理教育電車唱歌 童謡・唱歌)",
    info: "",
    filename: "電車唱歌",
  },
  {
    title: "電車ごっこ(うんてんしゅはきみだしゃしょうはぼくだ 童謡・唱歌)",
    info: "",
    filename: "電車ごっこ",
  },
  {
    title: "隣組(とんとんとんからりととなりぐみ童謡・唱歌 軍歌・戦時歌謡)",
    info: "",
    filename: "隣組",
  },
  {
    title:
      "おなかのへるうた(どうしておなかがへるのかなけんかをするとへるのかな 童謡・唱歌)",
    info: "",
    filename: "おなかのへるうた",
  },
  {
    title: "里の秋(しずかなしずかなさとのあき 童謡・唱歌)",
    info: "",
    filename: "里の秋",
  },
  {
    title: "大黒様(おおきなふくろをかたにかけ 童謡・唱歌)",
    info: "",
    filename: "大黒様",
  },
  {
    title: "かぞえうた(ひとつとやーひとよあければにぎやかで 童謡・唱歌)",
    info: "",
    filename: "かぞえうた",
  },
  {
    title: "赤い鳥小鳥(あかいとりことりなぜなぜあかい 童謡・唱歌)",
    info: "",
    filename: "赤い鳥小鳥",
  },
  {
    title: "あの子はたあれ(あのこはたあれたれでしょね 童謡・唱歌)",
    info: "",
    filename: "あの子はたあれ",
  },
  {
    title: "ほたるこい(ほうほうほたるこい 童謡・唱歌)",
    info: "",
    filename: "ほたるこい",
  },
  {
    title: "おつかいありさん(あんまりいそいでごっつんこ 童謡・唱歌)",
    info: "",
    filename: "おつかいありさん",
  },
  {
    title:
      "ないしょ話(ないしょないしょないしょのはなしはあのねのね 童謡・唱歌)",
    info: "",
    filename: "ないしょ話",
  },
  {
    title: "静かな湖畔(しずかなこはんのもりのかげから 童謡・唱歌)",
    info: "",
    filename: "静かな湖畔",
  },
  {
    title: "どんぐりころころ(どんぐりころころどんぶりこ 童謡・唱歌)",
    info: "",
    filename: "どんぐりころころ",
  },
  {
    title:
      "朝はどこから(あさはどこからくるかしらあのそらこえてくもこえて 童謡・唱歌)",
    info: "",
    filename: "朝はどこから",
  },
  {
    title: "朝だ元気で(あさだあさだよあさひがのぼる 童謡・唱歌)",
    info: "",
    filename: "朝だ元気で",
  },
  {
    title: "すずめのおやど(すずめすずめおやどはどこだ 童謡・唱歌 アメリカ)",
    info: "",
    filename: "すずめのおやど",
  },
  {
    title: "たきび(かきねのかきねのまがりかど 童謡・唱歌 さざんか)",
    info: "",
    filename: "たきび",
  },
  {
    title:
      "花(はるのうららのすみだがわのぼりくだりのふなびとが 童謡・唱歌 滝廉太郎)",
    info: "",
    filename: "花",
  },
  {
    title: "虫の声(あれまつむしがないている 童謡・唱歌)",
    info: "",
    filename: "虫の声",
  },
  {
    title:
      "めんこい仔馬(ぬれたこうまのたてがみをなでりゃりょうてにあさのつゆ 童謡・唱歌 軍歌・戦時歌謡)",
    info: "",
    filename: "めんこい仔馬",
  },
  {
    title: "雨(あめがふりますあめがふる 童謡・唱歌)",
    info: "",
    filename: "雨",
  },
  {
    title: "野菊(とおいやまからふいてくるこさむいかぜに 童謡・唱歌)",
    info: "",
    filename: "野菊",
  },
  {
    title: "夕日(ぎんぎんぎらぎらゆうひがしずむ 童謡・唱歌)",
    info: "",
    filename: "夕日",
  },
  {
    title: "春が来た(はるがきたどこにきた 童謡・唱歌)",
    info: "",
    filename: "春が来た",
  },
  {
    title: "青い目の人形(あおいめをしたおにんぎょは 童謡・唱歌)",
    info: "",
    filename: "青い目の人形",
  },
  {
    title: "冬景色(さぎりきゆるみなとえの 童謡・唱歌)",
    info: "",
    filename: "冬景色",
  },
  {
    title: "宵待草(まてどくらせどこぬひとを 童謡・唱歌)",
    info: "",
    filename: "宵待草",
  },
  {
    title: "霞か雲か(かすみかくもか 童謡・唱歌 ドイツ)",
    info: "",
    filename: "霞か雲か",
  },
  {
    title:
      "花かげ(じゅうごやおつきさまひとりぼちさくらふぶきのはなかげに 童謡・唱歌)",
    info: "",
    filename: "花かげ",
  },
  {
    title:
      "山賊の歌(あめがふればおがわができかぜがふけばやまができる 童謡・唱歌)",
    info: "",
    filename: "山賊の歌",
  },
  {
    title:
      "山の人気者(やまのにんきものそれはみるくやあさからよるまでうたをふりまく 童謡・唱歌 ヨーデル)",
    info: "",
    filename: "山の人気者",
  },
  {
    title: "あの町この町(あのまちこのまちひがくれる 童謡・唱歌)",
    info: "",
    filename: "あの町この町",
  },
  {
    title: "仲よし小道(なかよしこみちはどこのみち 童謡・唱歌)",
    info: "",
    filename: "仲よし小道",
  },
  {
    title:
      "バラが咲いた(ばらがさいたばらがさいたまっかなばらが 童謡・唱歌 フォーク)",
    info: "",
    filename: "バラが咲いた",
  },
  {
    title: "あめふり(あめあめふれふれかあさんがじゃのめでおむかえ 童謡・唱歌)",
    info: "",
    filename: "あめふり",
  },
  {
    title:
      "アルプス一万尺(あるぷすいちまんじゃくこやりのうえであるぺんおどりを 童謡・唱歌 Yankee Doodle アメリカ)",
    info: "",
    filename: "アルプス一万尺",
  },
  {
    title:
      "フニクリ・フニクラ(あかいひをふくあのやまへのぼろうのぼろう 童謡・唱歌 イタリア)",
    info: "",
    filename: "フニクリ・フニクラ",
  },
  {
    title: "山男の歌(むすめさんよくきけよやまおとこにゃほれるなよ 童謡・唱歌)",
    info: "",
    filename: "山男の歌",
  },
  {
    title: "仰げば尊し(あおげばとうとしわがしのおん 童謡・唱歌)",
    info: "",
    filename: "仰げば尊し",
  },
  {
    title:
      "夏は来ぬ(うのはなのにおうかきねにほととぎすはやもきなきて 童謡・唱歌)",
    info: "",
    filename: "夏は来ぬ",
  },
  {
    title: "夏の思い出(なつがくればおもいだすはるかなおぜ 童謡・唱歌)",
    info: "",
    filename: "夏の思い出",
  },
  {
    title: "とんび(とべとべとんびそらたかく 童謡・唱歌)",
    info: "",
    filename: "とんび",
  },
  {
    title: "もみじ(あきのゆうひにてるやま 童謡・唱歌 紅葉)",
    info: "",
    filename: "もみじ",
  },
  {
    title:
      "蛙の笛(つきよのたんぼでころろころろころろころころなるふえは 童謡・唱歌)",
    info: "",
    filename: "蛙の笛",
  },
  {
    title: "羽衣(しろいはまべのまつばらになみがよせたりかえしたり 童謡・唱歌)",
    info: "",
    filename: "羽衣",
  },
  {
    title: "浜辺の歌(あしたはまべをさまよえば 童謡・唱歌)",
    info: "",
    filename: "浜辺の歌",
  },
  {
    title: "牧場の朝(ただいちめんにたちこめた 童謡・唱歌)",
    info: "",
    filename: "牧場の朝",
  },
  {
    title: "線路は続くよどこまでも(せんろはつづくよどこまでも 童謡・唱歌)",
    info: "",
    filename: "線路は続くよどこまでも",
  },
  {
    title: "故郷の空(ゆうぞらはれてあきかぜふき 童謡・唱歌 スコットランド)",
    info: "",
    filename: "故郷の空",
  },
  {
    title:
      "灯台守(とうだいもり。こおれるつきかげそらにさえて 童謡・唱歌 アメリカ)",
    info: "",
    filename: "灯台守",
  },
  {
    title: "喜びも悲しみも幾歳月(いくとしつき。おいらみさきのとうだいもりは)",
    info: "",
    filename: "喜びも悲しみも幾歳月",
  },
  {
    title: "ロンドン橋(ろんどんばしおちた 童謡・唱歌 イギリス)",
    info: "",
    filename: "ロンドン橋",
  },
  {
    title: "だんご3兄弟(くしにささってだんごだんご 童謡・唱歌)",
    info: "",
    filename: "だんご3兄弟",
  },
  {
    title:
      "オールド・ブラック・ジョー(フォスター わかきひはやゆめとすぎ 童謡・唱歌)",
    info: "",
    filename: "オールド・ブラック・ジョー",
  },
  {
    title:
      "谷間のともしび(たそがれにわがやのひまどにうつりしとき 童謡・唱歌 アメリカ)",
    info: "",
    filename: "谷間のともしび",
  },
  {
    title:
      "南の花嫁さん(ねむのなみきをおうまのせなにゆらゆらゆらと 童謡・唱歌)",
    info: "",
    filename: "南の花嫁さん",
  },
  {
    title: "行商人(コロブチカ、korobeiniki, korobushka ロシア 童謡・唱歌)",
    info: "",
    filename: "行商人",
  },
  {
    title: "ロンドンデリーの歌(ダニー・ボーイ 童謡・唱歌 アイルランド)",
    info: "",
    filename: "ロンドンデリーの歌",
  },
  {
    title:
      "少年探偵団の歌(ぼぼぼくらはしょうねんたんていだんゆうきりんりんるりのいろ テレビ 童謡・唱歌)",
    info: "",
    filename: "少年探偵団の歌",
  },
  {
    title:
      "月光仮面は誰でしょう(どこのだれだかしらないけれどだれもがみんな テレビ 童謡・唱歌)",
    info: "",
    filename: "月光仮面は誰でしょう",
  },
  {
    title:
      "花の街(なないろのたにをこえてながれていくかぜのりぼん 童謡・唱歌 團伊玖磨)",
    info: "",
    filename: "花の街",
  },
  {
    title:
      "鉄人28号(びるのまちにがおーよるのはいうぇいにがおー テレビ アニメ 童謡・唱歌)",
    info: "",
    filename: "鉄人28号",
  },
  {
    title:
      "鉄腕アトム(そらをこえてらららにじのかなた アニメ 童謡・唱歌 テレビ)",
    info: "",
    filename: "鉄腕アトム",
  },
  {
    title: "草原情歌(はるかはなれたそのまたむこう 童謡・唱歌 中国)",
    info: "",
    filename: "草原情歌",
  },
  {
    title:
      "岬めぐり(あなたがいつかはなしてくれたみさきをぼくはたずねてきた 歌謡曲 フォーク)",
    info: "",
    filename: "岬めぐり",
  },
  {
    title: "ラサ・サヤン・ゲ(らささやんげ 童謡・唱歌 インドネシア)",
    info: "",
    filename: "ラサ・サヤン・ゲ",
  },
  {
    title:
      "南の島のハメハメハ大王(みなみのしまのだいおうはそのなもいだいな 童謡・唱歌)",
    info: "",
    filename: "南の島のハメハメハ大王",
  },
  {
    title: "冬の星座(こがらしとだえてさゆるそらより 童謡・唱歌 アメリカ)",
    info: "",
    filename: "冬の星座",
  },
  {
    title:
      "雪の降るまちを(ゆきのふるまちをおもいでだけがとおりすぎてゆく 童謡・唱歌)",
    info: "",
    filename: "雪の降るまちを",
  },
  {
    title:
      "クラリネットをこわしちゃった(ぼくのだいすきなくらりねっとぱぱからもらった 童謡・唱歌)",
    info: "",
    filename: "クラリネットをこわしちゃった",
  },
  {
    title:
      "いぬのおまわりさん(まいごのまいごのこねこちゃんあなたのおうちはどこですか 童謡・唱歌 大中恩)",
    info: "",
    filename: "いぬのおまわりさん",
  },
  {
    title: "緑のラララ(やわらかいみどりのすずしそうなこかげ 童謡・唱歌)",
    info: "",
    filename: "緑のラララ",
  },
  {
    title: "アイアイ(あいあいあいあいおさるさんだよ 童謡・唱歌)",
    info: "",
    filename: "アイアイ",
  },
  {
    title: "ケンタッキーの我が家(My Old Kentucky Home  フォスター 童謡・唱歌)",
    info: "",
    filename: "ケンタッキーの我が家",
  },
  {
    title:
      "峠の我が家(Home on the Range つのぶえはこだまするやまのおかなたに 童謡・唱歌 アメリカ カンザス)",
    info: "",
    filename: "峠の我が家",
  },
  {
    title:
      "おお牧場はみどり(おおまきばはみどりくさのうみかぜがふく 童謡・唱歌 チェコ)",
    info: "",
    filename: "おお牧場はみどり",
  },
  {
    title:
      "星かげさやかに(ほしかげさやかにしずかにふけぬ 燃えろよ燃えろよ キャンプファイヤー 童謡・唱歌 フランス)",
    info: "",
    filename: "星かげさやかに",
  },
  {
    title:
      "今日の日はさようなら(いつまでもたえることなくともだちでいよう  童謡・唱歌 フォーク)",
    info: "",
    filename: "今日の日はさようなら",
  },
  {
    title:
      "聖者が街にやってくる(聖者の行進 Oh, when the saints go marchin' in  童謡・唱歌 クリスマス ジャズ 黒人霊歌)",
    info: "",
    filename: "聖者が街にやってくる",
  },
  {
    title:
      "雪山讃歌(愛しのクレメンタイン。ゆきよいわよわれらがやどり 童謡・唱歌 アメリカ)",
    info: "",
    filename: "雪山讃歌",
  },
  {
    title:
      "とんでったバナナ(ばなながいっぽんありましたあおいみなみのそらのした 童謡・唱歌)",
    info: "",
    filename: "とんでったバナナ",
  },
  {
    title: "トロイカ(ゆきのしらかばなみきゆうひがはえる 童謡・唱歌 ロシア)",
    info: "",
    filename: "トロイカ",
  },
  {
    title:
      "藁の中の七面鳥(さあたいへんださあたいへんだ 童謡・唱歌 オクラホマ・ミキサー アメリカ フォークダンス)",
    info: "",
    filename: "藁の中の七面鳥",
  },
  {
    title:
      "気のいいあひる(むかしあひるはからだがおおきくてうみもわたればさかなもたべたよ 童謡・唱歌 ボヘミア)",
    info: "",
    filename: "気のいいあひる",
  },
  {
    title: "故郷の廃家(いくとせふるさときてみれば 童謡・唱歌 アメリカ)",
    info: "",
    filename: "故郷の廃家",
  },
  {
    title:
      "海行かば(うみゆかばみづくかばねやまゆかばくさむすかばね 軍歌・戦時歌謡)",
    info: "",
    filename: "海行かば",
  },
  {
    title: "籠の鳥(あいたさみたさにこわさをわすれ 歌謡曲 東海林太郎)",
    info: "",
    filename: "籠の鳥",
  },
  {
    title:
      "ラバウル小唄(さらばらばうるよまたくるまでは 軍歌・戦時歌謡 南洋航路)",
    info: "",
    filename: "ラバウル小唄",
  },
  {
    title: "北上夜曲(においやさしいしらゆりのぬれているよな 歌謡曲 1941)",
    info: "",
    filename: "北上夜曲",
  },
  {
    title: "アイネ・クライネ・ナハトムジーク(モーツァルト クラシック 1787)",
    info: "",
    filename: "アイネ・クライネ・ナハトムジーク",
  },
  {
    title:
      "きらきら星(きらきらひかるおそらのほしよ Twinkle Twinkle Little Star 童謡・唱歌 フランス)",
    info: "",
    filename: "きらきら星",
  },
  {
    title: "燦めく星座(おとこじゅんじょうのあいのほしのいろ 歌謡曲 1940)",
    info: "",
    filename: "燦めく星座",
  },
  {
    title:
      "山の一日(あかるくたのしいやまのいちにちあさひといっしょにあるきだし 童謡・唱歌 ドイツ)",
    info: "",
    filename: "山の一日",
  },
  {
    title:
      "かあさんの歌(かあさんはよなべをしててぶくろあんでくれた 童謡・唱歌)",
    info: "",
    filename: "かあさんの歌",
  },
  {
    title:
      "手のひらを太陽に(ぼくらはみんないきているいきているからうたうんだ 童謡・唱歌 やなせたかし)",
    info: "",
    filename: "手のひらを太陽に",
  },
  {
    title:
      "おもちゃの兵隊のマーチ(キューピー3分クッキングより  クラシック ドイツ)",
    info: "",
    filename: "おもちゃの兵隊のマーチ",
  },
  {
    title: "暁に祈る(あああのかおであのこえで 古関裕而 軍歌・戦時歌謡)",
    info: "",
    filename: "暁に祈る",
  },
  {
    title:
      "からたちの花(からたちのはながさいたよしろいしろいはながさいたよ 童謡・唱歌 北原白秋 山田耕筰)",
    info: "",
    filename: "からたちの花",
  },
  {
    title: "手をたたきましょう(童謡・唱歌)",
    info: "",
    filename: "手をたたきましょう",
  },
  {
    title:
      "思い出(かきにあかいはなさくいつかのあのいえ 童謡・唱歌 久しき昔  イングランド)",
    info: "",
    filename: "思い出",
  },
  {
    title:
      "おもちゃのマーチ(やっとこやっとこくりだしたおもちゃのまーちがらったった 童謡・唱歌)",
    info: "",
    filename: "おもちゃのマーチ",
  },
  {
    title: "おもちゃのチャチャチャ(そらにきらきらおほしさま 童謡・唱歌)",
    info: "",
    filename: "おもちゃのチャチャチャ",
  },
  {
    title:
      "にっぽん昔ばなし(ぼうやよいこだねんねしないまもむかしもかわりなく 童謡・唱歌)",
    info: "",
    filename: "にっぽん昔ばなし",
  },
  {
    title:
      "春風(主人は冷たい土の中に。ふけそよそよふけはるかぜよ フォスター 童謡・唱歌)",
    info: "",
    filename: "春風",
  },
  {
    title: "春よ来い(はるよこいはやくこいあるきはじめた 童謡・唱歌)",
    info: "",
    filename: "春よ来い",
  },
  {
    title: "紀元節(くもにそびゆるたかちほの 童謡・唱歌)",
    info: "",
    filename: "紀元節",
  },
  {
    title:
      "紀元二千六百年(きんしかがやくにっぽんのはえあるひかり 童謡・唱歌 軍歌・戦時歌謡)",
    info: "",
    filename: "紀元二千六百年",
  },
  {
    title: "どこかで春が(どこかではるがうまれてる 童謡・唱歌)",
    info: "",
    filename: "どこかで春が",
  },
  {
    title:
      "大きな古時計(おおきなのっぽのふるどけいおじいさんのとけい 童謡・唱歌 アメリカ)",
    info: "",
    filename: "大きな古時計",
  },
  {
    title:
      "森へ行きましょう(もりへゆきましょうむすめさんあはは 童謡・唱歌 ポーランド)",
    info: "",
    filename: "森へ行きましょう",
  },
  {
    title: "もずが枯木で(もずがかれきにないている 童謡・唱歌 サトウハチロー)",
    info: "",
    filename: "もずが枯木で",
  },
  {
    title: "池の雨(ヤマハ音楽教室幼児科メロディー暗唱曲 童謡・唱歌 ドイツ)",
    info: "",
    filename: "池の雨",
  },
  {
    title:
      "星の界(ほしのよ。つきなきみそらに 童謡・唱歌 讃美歌 いつくしみふかき)",
    info: "",
    filename: "星の界",
  },
  {
    title:
      "ともしび(よぎりのかなたへわかれをつげおおしきますらおいでてゆく 童謡・唱歌 ロシア)",
    info: "",
    filename: "ともしび",
  },
  {
    title: "りんごのひとりごと(わたしはまっかなりんごです 童謡・唱歌)",
    info: "",
    filename: "りんごのひとりごと",
  },
  {
    title:
      "北風小僧の寒太郎(きたかぜこぞうのかんたろうことしもまちまでやってきた 童謡・唱歌)",
    info: "",
    filename: "北風小僧の寒太郎",
  },
  {
    title:
      "金剛石(こんごうせきもみがかずばたまのひかりはそわざらん 童謡・唱歌)",
    info: "",
    filename: "金剛石",
  },
  {
    title:
      "花嫁人形(きんらんどんすのおびしめながらはなよめごりょうは 童謡・唱歌)",
    info: "",
    filename: "花嫁人形",
  },
  {
    title: "蛍(ほたるのやどはかわばたやなぎ 童謡・唱歌)",
    info: "",
    filename: "蛍",
  },
  {
    title:
      "幸せなら手をたたこう(しあわせならてをたたこう 童謡・唱歌 アメリカ 坂本九)",
    info: "",
    filename: "幸せなら手をたたこう",
  },
  {
    title:
      "うれしいひなまつり(あかりをつけましょぼんぼりに 童謡・唱歌 サトウハチロー)",
    info: "",
    filename: "うれしいひなまつり",
  },
  {
    title:
      "夜汽車(いつもいつもとおるよぎしゃしずかなひびききけば 童謡・唱歌 ドイツ)",
    info: "",
    filename: "夜汽車",
  },
  {
    title:
      "国境の町(そりのすずさえさびしくひびく 歌謡曲 軍歌・戦時歌謡 東海林太郎)",
    info: "",
    filename: "国境の町",
  },
  {
    title: "こうま(はいしいはいしいあゆめよこうま 童謡・唱歌)",
    info: "",
    filename: "こうま",
  },
  {
    title: "すうじのうた(すうじのいちはなあにこうばのえんとつ 童謡・唱歌)",
    info: "",
    filename: "すうじのうた",
  },
  {
    title: "赤い靴(あかいくつはいてたおんなのこ 童謡・唱歌)",
    info: "",
    filename: "赤い靴",
  },
  {
    title:
      "酸模の咲く頃(すかんぽのさくころ。どてのすかんぽじゃわさらさ 童謡・唱歌)",
    info: "",
    filename: "酸模の咲く頃",
  },
  {
    title:
      "紅屋の娘(べにやのむすめのいうことにゃさのいうことにゃ 童謡・唱歌 1929 歌謡曲)",
    info: "",
    filename: "紅屋の娘",
  },
  {
    title:
      "ゆかいな牧場(いちろうさんのまきばでいーあいいーあいおー 童謡・唱歌 アメリカ)",
    info: "",
    filename: "ゆかいな牧場",
  },
  {
    title:
      "山小舎の灯(やまごやのともしび。たそがれのともしびはほのかにともりて 童謡・唱歌)",
    info: "",
    filename: "山小舎の灯",
  },
  {
    title: "こぎつね(こぎつねこんこんやまのなか 童謡・唱歌 ドイツ)",
    info: "",
    filename: "こぎつね",
  },
  {
    title: "草競馬(くさけいば フォスター 童謡・唱歌)",
    info: "",
    filename: "草競馬",
  },
  {
    title: "さんぽ(あるこうあるこうわたしはげんき 童謡・唱歌 ジブリ 久石譲)",
    info: "",
    filename: "さんぽ",
  },
  {
    title:
      "異国の丘(きょうもくれゆくいこくのおかに 歌謡曲 軍歌・戦時歌謡 吉田正 シベリア)",
    info: "",
    filename: "異国の丘",
  },
  {
    title:
      "鐘の鳴る丘(みどりのおかのあかいやねとんがりぼうしの 古関裕而 童謡・唱歌 歌謡曲)",
    info: "",
    filename: "鐘の鳴る丘",
  },
  {
    title: "夢のお馬車(きんのおくらにぎんのすず 童謡・唱歌)",
    info: "",
    filename: "夢のお馬車",
  },
  {
    title: "若鷲の歌(わかいちしおのよかれんの 古関裕而 軍歌・戦時歌謡)",
    info: "",
    filename: "若鷲の歌",
  },
  {
    title: "戦友(ここはおくにをなんびゃくり 軍歌・戦時歌謡)",
    info: "",
    filename: "戦友",
  },
  {
    title:
      "婦人従軍歌(ほづつのひびことおざかるあとにはむしもこえたてず 軍歌・戦時歌謡)",
    info: "",
    filename: "婦人従軍歌",
  },
  {
    title:
      "嗚呼玉杯に花うけて(一高寮歌。ああぎょくはいにはなうけてりょくしゅにつきのかげやどし)",
    info: "",
    filename: "嗚呼玉杯に花うけて",
  },
  {
    title:
      "上を向いて歩こう(うえをむいてあるこう 歌謡曲 坂本九 永六輔 中村八大)",
    info: "",
    filename: "上を向いて歩こう",
  },
  {
    title:
      "あら野のはてに(あらののはてにゆうひはおちて クリスマス 讃美歌 グロリア)",
    info: "",
    filename: "あら野のはてに",
  },
  {
    title: "女心の歌(おんなごころのうた ヴェルディリゴレット クラシック)",
    info: "",
    filename: "女心の歌",
  },
  {
    title:
      "イパネマの娘(The Girl from Ipanema 洋楽 ボサ・ノヴァ ブラジル アントニオ・カルロス・ジョビン)",
    info: "",
    filename: "イパネマの娘",
  },
  {
    title: "亜麻色の髪の乙女(ドビュッシー クラシック)",
    info: "",
    filename: "亜麻色の髪の乙女ドビュッシー",
  },
  {
    title: "華麗なる大円舞曲(ショパン クラシック)",
    info: "",
    filename: "華麗なる大円舞曲",
  },
  {
    title:
      "雪椿(やさしさとかいしょのなさがうらとおもてについている 歌謡曲 小林幸子 遠藤実)",
    info: "",
    filename: "雪椿",
  },
  {
    title:
      "青葉の笛(敦盛と忠度。いちのたにのいくさやぶれうたれしへいけの 童謡・唱歌 平家物語)",
    info: "",
    filename: "青葉の笛",
  },
  {
    title:
      "星影のワルツ(わかれることはつらいけどしかたがないんだ 歌謡曲 千昌夫 遠藤実)",
    info: "",
    filename: "星影のワルツ",
  },
  {
    title: "青春の輝き(I Need To Be In Love 洋楽 カーペンターズ 1976)",
    info: "",
    filename: "青春の輝き",
  },
  {
    title:
      "いつかある日(いつかあるひやまでしんだらふるいやまのともよ 歌謡曲 フォーク 中沢厚子 1974)",
    info: "",
    filename: "いつかある日",
  },
  {
    title:
      "誰か故郷を想わざる(はなつむのべにひはおちて 軍歌・戦時歌謡 古賀政男 霧島昇 1940)",
    info: "",
    filename: "誰か故郷を想わざる",
  },
  {
    title:
      "丘は花ざかり(わかいいのちのかれんだーを 歌謡曲 藤山一郎 1952 服部良一)",
    info: "",
    filename: "丘は花ざかり",
  },
  {
    title: "ホルン協奏曲第1番(モーツァルト クラシック)",
    info: "",
    filename: "ホルン協奏曲第1番モーツァルト",
  },
  {
    title:
      "コーヒー・ルンバ(むかしあらぶのえらいおぼうさんがこいをわすれた 歌謡曲 西田佐知子 洋楽)",
    info: "",
    filename: "コーヒー・ルンバ",
  },
  {
    title:
      "星の流れに(ほしのながれにみをうらなって 歌謡曲 菊池章子 映画 こんな女にだれがした 1947)",
    info: "",
    filename: "星の流れに",
  },
  {
    title:
      "青い山脈(わかくあかるいうたごえに 藤山一郎 歌謡曲 映画 服部良一 1949)",
    info: "",
    filename: "青い山脈",
  },
  {
    title:
      "世界の国からこんにちは(日本万国博覧会テーマソング 1970 三波春夫 中村八大 歌謡曲)",
    info: "",
    filename: "世界の国からこんにちは",
  },
  {
    title:
      "未来へ(ほらあしもとをみてごらんこれがあなたのあゆむみち Kiroro 歌謡曲 1998)",
    info: "",
    filename: "未来へ",
  },
  {
    title:
      "青葉城恋唄(ひろせがわながれるきしべおもいではかえらず さとう宗幸 歌謡曲 1978 仙台 杜の都)",
    info: "",
    filename: "青葉城恋唄",
  },
  {
    title: "ファミリーマート(あなたとこんびにふぁみりーまーと CM)",
    info: "",
    filename: "ファミリーマート",
  },
  {
    title:
      "ヤットン節(おさけのむなさけのむなのごいけんなれどよいよい 1951 歌謡曲)",
    info: "",
    filename: "ヤットン節",
  },
  {
    title:
      "春が呼んでるよ(ひばりのこすずめのことびながらなにをみた ヘイ・ムイ・ヤシネック 童謡・唱歌 ポーランド)",
    info: "",
    filename: "春が呼んでるよ",
  },
  {
    title: "ハバネラ(ビゼー カルメンより クラシック)",
    info: "",
    filename: "ハバネラ",
  },
  {
    title:
      "悲しき口笛(おかのほてるのあかいひも 歌謡曲 1949 美空ひばり 万城目正)",
    info: "",
    filename: "悲しき口笛",
  },
  {
    title:
      "桜井の訣別(あおばしげれるさくらいのさとのわたりのゆうまぐれ 童謡・唱歌 大楠公の歌 楠木正成)",
    info: "",
    filename: "桜井の訣別",
  },
  {
    title: "アラビアの唄(さばくにひがおちて 洋楽 和製ジャズ 1928)",
    info: "",
    filename: "アラビアの唄",
  },
  {
    title:
      "遠くへ行きたい(しらないまちをあるいてみたいどこかとおくへ  歌謡曲 1962 中村八大)",
    info: "",
    filename: "遠くへ行きたい",
  },
  {
    title:
      "リンゴ追分(りんごのはなびらがかぜにちったよね 歌謡曲 1952 美空ひばり)",
    info: "",
    filename: "リンゴ追分",
  },
  {
    title:
      "アカシアの雨がやむとき(あかしあのあめにうたれてこのまましんでしまいたい 歌謡曲 西田佐知子 1960)",
    info: "",
    filename: "アカシアの雨がやむとき",
  },
  {
    title:
      "有楽町で逢いましょう(あなたをまてばあめがふる 歌謡曲 吉田正 フランク永井 1957 そごうCM)",
    info: "",
    filename: "有楽町で逢いましょう",
  },
  {
    title:
      "知床旅情(しれとこのみさきにはまなすのさくころ 歌謡曲 民謡 森繁久彌 1965)",
    info: "",
    filename: "知床旅情",
  },
  {
    title:
      "箱根八里の半次郎(まわしがっぱもさんねんがらす 2000 歌謡曲 演歌 氷川きよし)",
    info: "",
    filename: "箱根八里の半次郎",
  },
  {
    title:
      "ラブユー東京(なないろのにじがきえてしまったの 1966 黒沢明とロス・プリモス)",
    info: "",
    filename: "ラブユー東京",
  },
  {
    title:
      "人生いろいろ(しんでしまおうなんてなやんだりしたわ 島倉千代子 1987 歌謡曲 浜口庫之助)",
    info: "",
    filename: "人生いろいろ",
  },
  {
    title:
      "好きになった人(さようならさようならげんきでいてね 都はるみ 1968 市川昭介)",
    info: "",
    filename: "好きになった人",
  },
  {
    title:
      "長崎の鐘(こよなくはれたあおぞらをかなしとおもうせつなさよ 藤山一郎 古関裕而 歌謡曲 1949)",
    info: "",
    filename: "長崎の鐘",
  },
  {
    title:
      "知りたくないの(あなたのかこなどしりたくないの 菅原洋一 歌謡曲 洋楽 1965)",
    info: "",
    filename: "知りたくないの",
  },
  {
    title:
      "男の純情(おとこいのちのじゅんじょうは 古賀政男 藤山一郎 歌謡曲 1936)",
    info: "",
    filename: "男の純情",
  },
  {
    title: "新雪(むらさきけむるしんせつの 1942 灰田勝彦 歌謡曲 映画)",
    info: "",
    filename: "新雪",
  },
  {
    title: "人を恋うる歌(つまをめとらばさいたけて 1895 与謝野鉄幹 歌謡曲)",
    info: "",
    filename: "人を恋うる歌",
  },
  {
    title:
      "街のサンドイッチマン(ろいどめがねにえんびふく 1953 鶴田浩二 吉田正)",
    info: "",
    filename: "街のサンドイッチマン",
  },
  {
    title:
      "酒は涙か溜息か(さけはなみだかためいきかこころのうさの 古賀政男 藤山一郎 歌謡曲 1931)",
    info: "",
    filename: "酒は涙か溜息か",
  },
  {
    title:
      "ちんちん千鳥(ちんちんちどりのなくよさは 童謡・唱歌 北原白秋 近衛秀麿)",
    info: "",
    filename: "ちんちん千鳥",
  },
  {
    title:
      "浪花節だよ人生は(のめといわれてすなおにのんだ 1976 歌謡曲 演歌 細川たかしなど)",
    info: "",
    filename: "浪花節だよ人生は",
  },
  {
    title:
      "港町ブルース(せのびしてみるかいきょうをきょうもきてきが 1969 森進一 歌謡曲 演歌)",
    info: "",
    filename: "港町ブルース",
  },
  {
    title: "港が見える丘(あなたとふたりできたおかは 1947 歌謡曲)",
    info: "",
    filename: "港が見える丘",
  },
  {
    title:
      "あなたと共に(あなたとともにゆきましょうこいのあまさとせつなさを 津村謙 吉岡妙子 歌謡曲 1954)",
    info: "",
    filename: "あなたと共に",
  },
  {
    title: "かえり船(なみのせのせにゆられてゆれて 1946 田端義夫 歌謡曲)",
    info: "",
    filename: "かえり船",
  },
  {
    title:
      "あの素晴しい愛をもう一度(いのちかけてとちかったひから 歌謡曲 フォーク 北山修 加藤和彦 1971)",
    info: "",
    filename: "あの素晴しい愛をもう一度",
  },
  {
    title:
      "せんせい(あわいはつこいきえたひはあめがしとしとふっていた 歌謡曲 森昌子 1972 遠藤実 阿久悠)",
    info: "",
    filename: "せんせい",
  },
  {
    title:
      "愛の讃歌(あなたのもえるてであたしをだきしめてただふたりだけで エディット・ピアフ 越路吹雪 シャンソン 洋楽 1952)",
    info: "",
    filename: "愛の讃歌",
  },
  {
    title:
      "夜明けのうた(よあけのうたよわたしのこころのきのうのかなしみを 岸洋子 1964 歌謡曲 いずみたく)",
    info: "",
    filename: "夜明けのうた",
  },
  {
    title:
      "タッチ(こきゅうをとめていちびょうあなたしんけんなめをしたから 1985 岩崎良美 アニメ 歌謡曲)",
    info: "",
    filename: "タッチ",
  },
  {
    title:
      "いい湯だな(いいゆだなゆげがてんじょうからぽたりとせなかに ザ・ドリフターズ デュークエイセス 1969 いずみたく)",
    info: "",
    filename: "いい湯だな",
  },
  {
    title:
      "ああ上野駅(どこかにこきょうのかおりをのせてはいるれっしゃのなつかしさ 歌謡曲 井沢八郎 1964)",
    info: "",
    filename: "ああ上野駅",
  },
  {
    title:
      "昴(すばる。めをとじてなにもみえずかなしくてめをあければ 1980 谷村新司 歌謡曲)",
    info: "",
    filename: "昴",
  },
  {
    title:
      "世界に一つだけの花(はなやのみせさきにならんだ 歌謡曲 SMAP 2002 槇原敬之)",
    info: "",
    filename: "世界に一つだけの花",
  },
  {
    title: "ジュ・トゥ・ヴ(エリック・サティ クラシック 1900 フランス)",
    info: "",
    filename: "ジュ・トゥ・ヴ",
  },
  {
    title:
      "新日本ハウス(すみなれたわがやにはなのかおりをそえて CM ドリーム 吉幾三 2002)",
    info: "",
    filename: "新日本ハウス",
  },
  {
    title:
      "いつも何度でも(よんでいるどこかむねのおくで 千と千尋の神隠しジブリ 久石譲 2001)",
    info: "",
    filename: "いつも何度でも",
  },
  {
    title: "やさしき愛の歌(Love's Old Sweet Song 洋楽 1884 molloy)",
    info: "",
    filename: "やさしき愛の歌",
  },
  {
    title:
      "イッツ・オンリー・ア・ペーパー・ムーン(It's Only a Paper Moon 1933 洋楽 ジャズ)",
    info: "",
    filename: "イッツ・オンリー・ア・ペーパー・ムーン",
  },
  {
    title:
      "タイム・トゥ・セイ・グッバイ(Time To Say Goodbye サラ・ブライトマン)",
    info: "",
    filename: "タイム・トゥ・セイ・グッバイ",
  },
  {
    title: "武田薬品(たけだたけだたけだたけだたけだ CM)",
    info: "",
    filename: "武田薬品",
  },
  {
    title: "別れの曲(ショパン はるのひそよかぜ クラシック)",
    info: "",
    filename: "別れの曲",
  },
  {
    title: "戦場のメリークリスマス(坂本龍一 映画 1983)",
    info: "",
    filename: "戦場のメリークリスマス",
  },
  {
    title:
      "オー・ソレ・ミオ(ひるのひのかがやくようなはれたひとみ 洋楽 童謡・唱歌 1898 イタリア)",
    info: "",
    filename: "オー・ソレ・ミオ",
  },
  {
    title: "愛のうたごえ(ディズニー「バンビ」より Bambi)",
    info: "",
    filename: "愛のうたごえ(バンビ)",
  },
  {
    title: "キャリー・ザット・ウェイト(ビートルズ Carry That Weight 1969 洋楽)",
    info: "",
    filename: "キャリー・ザット・ウェイト",
  },
  {
    title:
      "右から2番目の星(ディズニー「ピーター・パン」より The Second Star to the Right)",
    info: "",
    filename: "右から2番目の星",
  },
  {
    title:
      "ルパン三世(まっかなばらはあいつのくちびる 1977 歌謡曲 アニメ 大野雄二)",
    info: "",
    filename: "ルパン三世",
  },
  {
    title: "主よ人の望みの喜びよ(J.S.バッハ クラシック)",
    info: "",
    filename: "主よ人の望みの喜びよ",
  },
  {
    title:
      "バイカル湖のほとり(ゆたかなるざばいかるのはてしなきのやまを ロシア 童謡・唱歌)",
    info: "",
    filename: "バイカル湖のほとり",
  },
  {
    title: "ライオンは寝ている(トークンズ 1961 洋楽)",
    info: "",
    filename: "ライオンは寝ている",
  },
  {
    title:
      "おめでとうクリスマス(We Wish You a Merry Christmas 童謡・唱歌 イングランド)",
    info: "",
    filename: "おめでとうクリスマス",
  },
  {
    title: "ラ・バンバ(La Bamba 洋楽 メキシコ)",
    info: "",
    filename: "ラ・バンバ",
  },
  {
    title: "Summer(菊次郎の夏 1999 久石譲 歌謡曲)",
    info: "",
    filename: "Summer菊次郎の夏",
  },
  {
    title: "夜明けのスキャット(由紀さおり 1969 いずみたく 歌謡曲)",
    info: "",
    filename: "夜明けのスキャット",
  },
  {
    title:
      "モスクワ郊外の夕べ(ざわめきもいまははなくものみなまどろむ ロシア 童謡・唱歌)",
    info: "",
    filename: "モスクワ郊外の夕べ",
  },
  {
    title: "カロ・ミオ・ベン(Caro Mio Ben ジョルダーニ イタリア オペラ 1782)",
    info: "",
    filename: "カロ・ミオ・ベン",
  },
  {
    title:
      "ポリリズム(とてもだいじなきみのおもいは Perfume 2007 歌謡曲 中田ヤスタカ)",
    info: "",
    filename: "ポリリズム",
  },
  {
    title:
      "ホワイト・クリスマス(アーヴィング・バーリン ビング・クロスビー 1941 洋楽)",
    info: "",
    filename: "ホワイト・クリスマス",
  },
  {
    title:
      "マギー若き日の歌を(When you and I were young, Maggie 童謡・唱歌 洋楽 カナダ アメリカ)",
    info: "",
    filename: "マギー若き日の歌を",
  },
  {
    title:
      "言葉にできない(おわるはずのないあいあいがとだえた 小田和正 1982 オフコース)",
    info: "",
    filename: "言葉にできない",
  },
  {
    title:
      "ハイ・ホー(くちぶえをげんきにふきならし、ディズニー「白雪姫」より 1937 童謡・唱歌)",
    info: "",
    filename: "ハイ・ホー",
  },
  {
    title:
      "嘆きのセレナータ(こころもゆるあつきこいきみをばしのびて トセリ イタリア)",
    info: "",
    filename: "嘆きのセレナータ",
  },
  {
    title:
      "古城(まつかぜさわぐおかのうえこじょうよひとりなにしのぶ 三橋美智也 1959)",
    info: "",
    filename: "古城",
  },
  {
    title:
      "トラン・ブーラン(とらんぶーらんやしのはかげあかるくてりかがやき マレーシア国歌 童謠・唱歌 歌謡曲としては放送禁止)",
    info: "",
    filename: "トラン・ブーラン",
  },
  {
    title: "シンコペイテッド・クロック(ルロイ・アンダーソン 1945)",
    info: "",
    filename: "シンコペイテッド・クロック",
  },
  {
    title: "乾杯の歌(ヴェルディ 椿姫より クラシック 1853 オペラ イタリア)",
    info: "",
    filename: "乾杯の歌",
  },
  {
    title:
      "お嫁においで(もしもこのふねできみのしあわせみつけたらすぐにかえるから  加山雄三 1966 歌謡曲)",
    info: "",
    filename: "お嫁においで",
  },
  {
    title: "いつか王子様が(ディズニー 白雪姫 Someday My Prince Will Come 1937)",
    info: "",
    filename: "いつか王子様が",
  },
  {
    title:
      "君恋し(よいやみせまればなやみははてなし 1922 二村定一 フランク永井 時雨音羽)",
    info: "",
    filename: "君恋し",
  },
  {
    title:
      "忘れな草をあなたに(わかれてもわかれてもこころのおくに 1963 童謡・唱歌 歌謡曲 菅原洋一)",
    info: "",
    filename: "忘れな草をあなたに",
  },
  {
    title:
      "高原の駅よさようなら(しばしわかれのよぎしゃのまどよ 1951 歌謡曲 小畑実 佐々木俊一)",
    info: "",
    filename: "高原の駅よさようなら",
  },
  {
    title:
      "牧人ひつじを(まきびとひつじをまもれる クリスマス 讃美歌 イングランド)",
    info: "",
    filename: "牧人ひつじを",
  },
  {
    title: "酋長の娘(わたしのらばさん 軍歌・戦時歌謡 1930 歌謡曲)",
    info: "",
    filename: "酋長の娘",
  },
  {
    title:
      "アイ・アイ・アイ(ちりゆくはなに チリ ラテン フレイレAyAyAy 洋楽 ペレス・プラード)",
    info: "",
    filename: "アイ・アイ・アイ",
  },
  {
    title:
      "長崎は今日も雨だった(あなたひとりにかけたこいあいのことばを 歌謡曲 クール・ファイブ 1989 前川清 彩木雅夫)",
    info: "",
    filename: "長崎は今日も雨だった",
  },
  {
    title: "旅愁(ふけゆくあきのよたびのそらの 童謡・唱歌 1868 アメリカ)",
    info: "",
    filename: "旅愁",
  },
  {
    title:
      "ちんから峠(ちんからほいちんからほいちんからとうげの 童謡・唱歌 海沼実 1939)",
    info: "",
    filename: "ちんから峠",
  },
  {
    title: "アメイジング・グレイス(1722 讃美歌 アメリカ)",
    info: "",
    filename: "アメイジング・グレイス",
  },
  {
    title:
      "サントリー・オールド(ざらんらんりらんじゅびだで 小林亜星 CM 人間みな兄弟〜夜がくる 1968)",
    info: "",
    filename: "サントリー・オールド",
  },
  {
    title: "世界の車窓から(1987 溝口肇)",
    info: "",
    filename: "世界の車窓から",
  },
  {
    title: "若葉(あざやかなみどりよあかるいみどりよ 童謠・唱歌 1942)",
    info: "",
    filename: "若葉",
  },
  {
    title: "ロッホ・ローモンド(スコットランドの湖 童謠・唱歌)",
    info: "",
    filename: "ロッホ・ローモンド",
  },
  {
    title: "愛の挨拶(エルガー クラシック 1888)",
    info: "",
    filename: "愛の挨拶",
  },
  {
    title:
      "また君に恋してる(あさつゆがまねくひかりをあびて 歌謡曲 2007 ビリー・バンバン坂本冬美)",
    info: "",
    filename: "また君に恋してる",
  },
  {
    title:
      "麦打ち歌(ちょいとねえさんどこへいくわたしゃゆうげのみずくみに サデロ イタリア)",
    info: "",
    filename: "麦打ち歌",
  },
  {
    title:
      "ドナウ川の漣(どなうがわのさざなみ ルーマニア 1880 クラシック ワルツ)",
    info: "",
    filename: "ドナウ川の漣",
  },
  {
    title:
      "希望のささやき(あまつみつかいのこえもかくやと 童謠・唱歌 アメリカ クリスマス)",
    info: "",
    filename: "希望のささやき",
  },
  {
    title:
      "落葉しぐれ(たびのおちばがしぐれにぬれて 歌謡曲 1953 三浦洸一 吉田正)",
    info: "",
    filename: "落葉しぐれ",
  },
  {
    title:
      "潮来笠(いたこのいたろうちょっとみなればはくじょうそうなわたりどり 歌謡曲 1960 橋幸夫 吉田正)",
    info: "",
    filename: "潮来笠",
  },
  {
    title:
      "旅姿三人男(しみずみなとのめいぶつはおちゃのかおりと 歌謡曲 1938 ディック・ミネ 軍歌・戦時歌謡)",
    info: "",
    filename: "旅姿三人男",
  },
  {
    title:
      "銀色の道(とおいとおいはるかなみちはふゆのあらしがふいてるが 歌謡曲 童謡・唱歌 1966 宮川泰 フォーク)",
    info: "",
    filename: "銀色の道",
  },
  {
    title:
      "ホフマンの舟歌(オッフェンバッハ Barcarolle D'Hoffmann クラシック  オペラ)",
    info: "",
    filename: "ホフマンの舟歌",
  },
  {
    title: "ラスト・クリスマス(ワム！ 洋楽 1984 Wham! - Last Christmas)",
    info: "",
    filename: "ラスト・クリスマス",
  },
  {
    title:
      "湯島の白梅(ゆしまとおればおもいだすおつたちからのこころいき 1942 映画 婦系図)",
    info: "",
    filename: "湯島の白梅",
  },
  {
    title: "長崎物語(あかいはなならまんじゅしゃげ 1939 歌謡曲 佐々木俊一)",
    info: "",
    filename: "長崎物語",
  },
  {
    title:
      "懐しのブルース(ふるいにっきのぺーじには 1948 万城目正 映画 高峰三枝子 歌謡曲)",
    info: "",
    filename: "懐しのブルース",
  },
  {
    title:
      "涙そうそう(なだそうそう。ふるいあるばむめくりありがとうってつぶやいた 1998 歌謡曲 森山良子 BEGIN)",
    info: "",
    filename: "涙そうそう",
  },
  {
    title:
      "おどるポンポコリン(なんでもかんでもみんなおどりをおどっているよ 童謡・唱歌 B.B.クィーンズ 1990 アニメ 歌謡曲 ちびまる子ちゃん)",
    info: "",
    filename: "おどるポンポコリン",
  },
  {
    title:
      "野球拳(やきゅうするならこういうぐあいにしやしゃんせ お座敷遊び じゃんけん 童謡・唱歌)",
    info: "",
    filename: "野球拳",
  },
  {
    title:
      "ひょっこりひょうたん島(なみをじゃぶじゃぶじゃぶじゃぶかきわけて 1964 童謡・唱歌 人形劇 井上 宇野誠一郎)",
    info: "",
    filename: "ひょっこりひょうたん島",
  },
  {
    title:
      "東京ラプソディ(はなさきはなちるよいもぎんざのやなぎのしたで 1936 歌謡曲 藤山一郎 古賀政男)",
    info: "",
    filename: "東京ラプソディ",
  },
  {
    title:
      "あざみの歌(やまにはやまのうれいありうみにはうみのかなしみや 童謡・唱歌 1949 八洲秀章 歌謡曲)",
    info: "",
    filename: "あざみの歌",
  },
  {
    title: "乙女の願い(ショパン クラシック)",
    info: "",
    filename: "乙女の願い",
  },
  {
    title: "サテン・ドール(Satin Doll ジャズ 1953 デューク・エリントン)",
    info: "",
    filename: "サテン・ドール",
  },
  {
    title:
      "明日があるさ(いつものえきでいつもあうせーらーふくのおさげがみ 歌謡曲 1963 坂本九 青島幸男 中村八大)",
    info: "",
    filename: "明日があるさ",
  },
  {
    title:
      "タバコやの娘(むこうよこちょうのたばこやの 1937 歌謡曲 岸井明 平井英子 鈴木静一)",
    info: "",
    filename: "タバコやの娘",
  },
  {
    title:
      "夢淡き東京(やなぎあおめるひつばめがぎんざにとぶひ 歌謡曲 1947 サトウイチロー 古関裕而 藤山一郎)",
    info: "",
    filename: "夢淡き東京",
  },
  {
    title:
      "トラジ(とらじとらじとらじかわいいとらじのはなさいてる 童謡・唱歌 朝鮮)",
    info: "",
    filename: "トラジ",
  },
  {
    title:
      "春の日の花と輝く(はるのひのはなとかがやく アイルランド 童謡・唱歌 讃美歌)",
    info: "",
    filename: "春の日の花と輝く",
  },
  {
    title:
      "湖畔の宿(やまのさびしいみずうみにひとりきたのもかなしいこころ 服部良一 1940 高峰三枝子)",
    info: "",
    filename: "湖畔の宿",
  },
  {
    title:
      "ミッキーマウス・マーチ(ぼくらのくらぶのりーだーは ディズニー 1955 ジミー・ドッド ミッキーマウス・クラブ)",
    info: "",
    filename: "ミッキーマウス・マーチ",
  },
  {
    title:
      "雨に咲く花(およばぬこととあきらめました 歌謡曲 1935 関種子 池田不二男)",
    info: "",
    filename: "雨に咲く花",
  },
  {
    title:
      "金髪のジェニー(フォスター Jeanie With the Light Brown Hair 童謡・唱歌)",
    info: "",
    filename: "金髪のジェニー",
  },
  {
    title:
      "新妻に捧げる歌(しあわせをもとめてふたりのこころはよりそいむすびあう 歌謡曲 1964 江利チエミ 神津善行)",
    info: "",
    filename: "新妻に捧げる歌",
  },
  {
    title: "天国と地獄(オッフェンバック クラシック 運動会 1858 地獄のオルフェ)",
    info: "",
    filename: "天国と地獄",
  },
  {
    title:
      "踊子(さよならもいえずないているわたしのおどりこよああふねがでる 歌謡曲 三浦洸一 渡久地政信 1957)",
    info: "",
    filename: "踊子",
  },
  {
    title:
      "おおスザンナ(フォスター わたしゃあらばまからるいじあなへばんじょー 童謡・唱歌 1848)",
    info: "",
    filename: "おおスザンナ",
  },
  {
    title:
      "並木の雨(なみきのみちにあめがふるどこのひとやら 歌謡曲 1933 ミス・コロムビア)",
    info: "",
    filename: "並木の雨",
  },
  {
    title:
      "ホール・ニュー・ワールド(ディズニー「アラジン」より A Whole New World 1992 アラン・メンケン)",
    info: "",
    filename: "ホール・ニュー・ワールド",
  },
  {
    title:
      "川の流れのように(しらずしらずあるいてきた 歌謡曲 美空ひばり 1989 見岳章)",
    info: "",
    filename: "川の流れのように",
  },
  {
    title:
      "愛燦燦(あめさんさんとこのみにおちてわずかばかりのうんのわるさを 歌謡曲 1986 美空ひばり 小椋佳)",
    info: "",
    filename: "愛燦燦",
  },
  {
    title: "いい日旅立ち(ゆきどけまじかの 1978 歌謡曲 山口百恵 谷村新司)",
    info: "",
    filename: "いい日旅立ち",
  },
  {
    title: "真実の愛(Treue Liebe ドイツ 童謡・唱歌)",
    info: "",
    filename: "真実の愛",
  },
  {
    title:
      "東京の花売り娘(あおいめをふくやなぎのつじにはなをめしませ 歌謡曲 岡晴夫 1946 上原げんと)",
    info: "",
    filename: "東京の花売り娘",
  },
  {
    title:
      "アリラン(ありらんありらんあらりよーありらんとうげをこえゆく 朝鮮 童謡・唱歌)",
    info: "",
    filename: "アリラン",
  },
  {
    title: "砂山(うみはあらうみむこうはさどよ 童謡・唱歌 中山晋平)",
    info: "",
    filename: "砂山",
  },
  {
    title:
      "ニーナ(Tre giorni son che Nina by Ciampi/Pergolesi ふつかふれどもにーなはめざめず イタリア歌曲 1749)",
    info: "",
    filename: "ニーナ",
  },
  {
    title:
      "ブルー・ライト・ヨコハマ(まちのあかりがとてもきれいねよこはま 1968 いしだあゆみ 歌謡曲 筒美京平)",
    info: "",
    filename: "ブルー・ライト・ヨコハマ",
  },
  {
    title:
      "君の名は(きみのなはとたずねしひとあり 織井茂子 古関裕而 歌謡曲 1952)",
    info: "",
    filename: "君の名は",
  },
  {
    title: "ありのままで(アナと雪の女王 let It Go ディズニー 2013)",
    info: "",
    filename: "ありのままで",
  },
  {
    title:
      "琵琶湖周航の歌(われはうみのこさすらいのたびにしあればしみじみと 1917 童謡・唱歌 歌謡曲 学生歌)",
    info: "",
    filename: "琵琶湖周航の歌",
  },
  {
    title:
      "赤い花白い花(あかいはなつんであのひとにあげよ 童謡・唱歌 フォーク 中林三恵 1964)",
    info: "",
    filename: "赤い花白い花",
  },
  {
    title:
      "うちの女房にゃ髭がある(なにかいおうとおもっても 歌謡曲 1936 映画 古賀政男)",
    info: "",
    filename: "うちの女房にゃ髭がある",
  },
  {
    title:
      "想い出まくら(こんなひはあのひとのまねをしてけむたそうなかおしてたばこをすうわ 歌謡曲 1975 小坂恭子)",
    info: "",
    filename: "想い出まくら",
  },
  {
    title:
      "なごり雪(きしゃをまつきみのよこでぼくはとけいをきにしてる 1974 歌謡曲 かぐや姫 イルカ)",
    info: "",
    filename: "なごり雪",
  },
  {
    title:
      "誰もいない海(いまはもうあきだれもいないうみ 歌謡曲 フォーク 1970 トワ・エ・モワ)",
    info: "",
    filename: "誰もいない海",
  },
  {
    title:
      "庭の千草(にわのちぐさもむしのねもかれてさびしく 童謡・唱歌 アイルランド)",
    info: "",
    filename: "庭の千草",
  },
  {
    title:
      "野崎小唄(のざきまいりはやかたぶねでまいろどこをむいても 歌謡曲 1935 東海林太郎 大村能章)",
    info: "",
    filename: "野崎小唄",
  },
  {
    title: "王将(ふけばとぶようなしょうぎのこまに 歌謡曲 1961 村田英雄 船村徹)",
    info: "",
    filename: "王将",
  },
  {
    title: "眠りの精(つきのひかりにはなもくさも ブラームス 子守歌 クラシック)",
    info: "",
    filename: "眠りの精",
  },
  {
    title:
      "たゆとう小舟(たゆとうおぶねにみちからたよりてなみのえうらうら 童謡・唱歌 讃美歌)",
    info: "",
    filename: "たゆとう小舟",
  },
  {
    title:
      "柳ヶ瀬ブルース(あめのふるよるはこころもぬれるましてひとりじゃ 歌謡曲 1966 美川憲一)",
    info: "",
    filename: "柳ヶ瀬ブルース",
  },
  {
    title:
      "サライ(とおいゆめすてきれずにふるさとをすてた 加山雄三 谷村新司 歌謡曲 1992)",
    info: "",
    filename: "サライ",
  },
  {
    title:
      "いつでも夢を(ゆめよりひそかにあめよりやさしく 歌謡曲 吉永小百合 橋幸夫 1962 吉田正)",
    info: "",
    filename: "いつでも夢を",
  },
  {
    title:
      "おーい中村くん(おーいなかむらくんちょいとまちたまえ 歌謡曲 1958 若原一郎)",
    info: "",
    filename: "おーい中村くん",
  },
  {
    title:
      "アニー・ローリー(あしたつゆおくののしじまに 童謡・唱歌 スコットランド)",
    info: "",
    filename: "アニー・ローリー",
  },
  {
    title: "別れ船(なごりつきないはてしない 歌謡曲 田端義夫 1940)",
    info: "",
    filename: "別れ船",
  },
  {
    title:
      "純情二重奏(もりのあおばのかげにきて 1939 高峰三枝子 歌謡曲 映画 万城目正 霧島昇)",
    info: "",
    filename: "純情二重奏",
  },
  {
    title:
      "ゴンドラの唄(いのちみじかしこいせよおとめ 1915 歌謡曲 中山晋平 松井須磨子)",
    info: "",
    filename: "ゴンドラの唄",
  },
  {
    title: "柔(かつとおもうなおもえばまけよ 1964 美空ひばり 歌謡曲 古賀政男)",
    info: "",
    filename: "柔",
  },
  {
    title: "大江戸出世小唄(どてのやなぎはかぜまかせ 1935 歌謡曲 映画 高田浩吉)",
    info: "",
    filename: "大江戸出世小唄",
  },
  {
    title:
      "愛のままで(ことりたちはなにをさわぐのあまいかじつが 歌謡曲 2008 秋元順子 花岡優平)",
    info: "",
    filename: "愛のままで",
  },
  {
    title: "ひいらぎかざろう(クリスマス 讃美歌 イギリス ウェールズ 童謡・唱歌)",
    info: "",
    filename: "ひいらぎかざろう",
  },
  {
    title:
      "夢路より(ゆめじよりかえりてほしのひかりあおげや フォスター 童謡・唱歌 Beautiful Dreamer)",
    info: "",
    filename: "夢路より",
  },
  {
    title: "ヨーホー(ディズニー「カリブの海賊」より Yo Ho)",
    info: "",
    filename: "ヨーホー",
  },
  {
    title:
      "アフトン川の流れ(Flow Gently, Sweet Afton 童謡・唱歌 イギリス スコットランド)",
    info: "",
    filename: "アフトン川の流れ",
  },
  {
    title:
      "赤いスイートピー(はるいろのきしゃにのってうみにつれていってよ 歌謡曲 松田聖子 1982 松任谷由実)",
    info: "",
    filename: "赤いスイートピー",
  },
  {
    title:
      "東京のバスガール(わかいきぼうもこいもあるびるのまちから 歌謡曲 コロムビア・ローズ 1957)",
    info: "",
    filename: "東京のバスガール",
  },
  {
    title:
      "都の西北(みやこのせいほくわせだのもりにそびゆるいらかは 早稲田大学校歌)",
    info: "",
    filename: "都の西北",
  },
  {
    title: "啼くな小鳩よ(なくなこばとよこころのつまよ 歌謡曲 岡晴夫 1947)",
    info: "",
    filename: "啼くな小鳩よ",
  },
  {
    title:
      "坊がつる讃歌(ひとみなはなにようときもざんせつこいしやまにいり 1978 芹洋子 童謡・唱歌)",
    info: "",
    filename: "坊がつる讃歌",
  },
  {
    title:
      "黒百合の歌(くろゆりはこいのはなあいするひとにささげれば 古関裕而 歌謡曲 1953 織井茂子)",
    info: "",
    filename: "黒百合の歌",
  },
  {
    title:
      "二人は若い(あなたとよべばあなたとこたえるやまのこだまのうれしさよ 1934 歌謡曲 ディック・ミネ 星玲子 古賀政男)",
    info: "",
    filename: "二人は若い",
  },
  {
    title: "エレジー(マスネ「悲歌」 クラシック フランス)",
    info: "",
    filename: "エレジー(マスネ)",
  },
  {
    title: "TAKUMI/匠(大改造！！劇的ビフォーアフターより 松谷卓 2002)",
    info: "",
    filename: "TAKUMI",
  },
  {
    title:
      "ラ・クカラーチャ(くるまにゆられて 童謡・唱歌 メキシコ La cucaracha)",
    info: "",
    filename: "ラ・クカラーチャ",
  },
  {
    title:
      "ストトン節(すととんすととんとかよわせていまさらいやとは 添田知道 大正末期)",
    info: "",
    filename: "ストトン節",
  },
  {
    title: "禁じられた遊び(愛のロマンス 洋楽 1952 映画 ナルシソ・イエペス)",
    info: "",
    filename: "禁じられた遊び",
  },
  {
    title:
      "北の宿から(あなたかわりはないですかひごとさむさがつのります 歌謡曲 都はるみ 小林亜星 1975)",
    info: "",
    filename: "北の宿から",
  },
  {
    title:
      "ああモンテンルパの夜は更けて(モンテンルパの夜は更けて Muntinlupa フィリピン 歌謡曲 渡辺はま子 1952)",
    info: "",
    filename: "ああモンテンルパの夜は更けて",
  },
  {
    title:
      "東京ドドンパ娘(すきになったらはなれられない 歌謡曲 1961 渡辺マリ 鈴木庸一)",
    info: "",
    filename: "東京ドドンパ娘",
  },
  {
    title:
      "九段の母(うえのえきからくだんまでかってしらないじれったさ 歌謡曲 軍歌・戦時歌謡 1939)",
    info: "",
    filename: "九段の母",
  },
  {
    title: "おぼろ月夜(なのはなばたけにいりひうすれ 童謡・唱歌)",
    info: "",
    filename: "おぼろ月夜",
  },
  {
    title:
      "赤いハンカチ(あかしやのはなのしたであのこがそっとまぶたをふいた 歌謡曲 1962 石原裕次郎 上原賢六)",
    info: "",
    filename: "赤いハンカチ",
  },
  {
    title:
      "銀座の柳(うえてうれしいぎんざのやなぎえどのなごりのうすみどり 歌謡曲 中山晋平 1932 映画)",
    info: "",
    filename: "銀座の柳",
  },
  {
    title:
      "我が心のジョージア(Georgia on My Mind 洋楽 童謡・唱歌 1930 レイ・チャールズ)",
    info: "",
    filename: "我が心のジョージア",
  },
  {
    title:
      "海に来たれ(めざめとくこよつきはなみまにかがやく 童謡・唱歌 ナポリ イタリア ヴェネチア)",
    info: "",
    filename: "海に来たれ",
  },
  {
    title:
      "ガッチャマンの歌(だれだーだれだーだれだーそらのかなたにおどるかげ 小林亜星 1972 アニメ テレビ)",
    info: "",
    filename: "ガッチャマンの歌",
  },
  {
    title:
      "巨人の星(おもいこんだらしれんのみちをゆくがおとこのどこんじょう アニメ テレビ ゆけゆけひゅうま 1968  渡辺岳夫)",
    info: "",
    filename: "巨人の星",
  },
  {
    title:
      "若者たち(きみのゆくみちははてしなくとおい 歌謡曲 テレビ フォーク 1966 佐藤勝)",
    info: "",
    filename: "若者たち",
  },
  {
    title:
      "桑港のチャイナタウン(さんふらんしすこのちゃいなたうん 歌謡曲 1950 渡辺はま子 佐々木俊一)",
    info: "",
    filename: "桑港のチャイナタウン",
  },
  {
    title:
      "島育ち(あかいそてつのみもうれるころかなもとしごろ 歌謡曲 田端義夫 1962 三界稔)",
    info: "",
    filename: "島育ち",
  },
  {
    title: "北国の春(しらかばあおぞらみなみかぜ 1977 千昌夫 歌謡曲  遠藤実)",
    info: "",
    filename: "北国の春",
  },
  {
    title:
      "好きだった(すきだったうそじゃなかったすきだった 歌謡曲 鶴田浩二 吉田正 1956)",
    info: "",
    filename: "好きだった",
  },
  {
    title:
      "水戸黄門(じんせいらくありゃくもあるさ ああ人生に涙あり 1969 歌謡曲 テレビ 杉良太郎 木下忠司)",
    info: "",
    filename: "水戸黄門",
  },
  {
    title:
      "残酷な天使のテーゼ(ざんこくなてんしのようにしょうねんよしんわになれ 歌謡曲 テレビ アニメ 高橋洋子 1995 佐藤英敏 及川眠子)",
    info: "",
    filename: "残酷な天使のテーゼ",
  },
  {
    title:
      "若き血(わかきちにもゆるものこうきみてるわれら 慶応大学応援歌 堀内敬三 1927)",
    info: "",
    filename: "若き血",
  },
  {
    title: "シルクロードのテーマ(絲綢之路 喜多郎 1980)",
    info: "",
    filename: "シルクロードのテーマ",
  },
  {
    title: "再会(あえなくなってはじめてしった 歌謡曲 松尾和子 1960 吉田正)",
    info: "",
    filename: "再会",
  },
  {
    title:
      "ゲイシャ・ワルツ(あなたのりーどでしまだもゆれる 歌謡曲 1952 神楽坂はん子 古賀政男)",
    info: "",
    filename: "ゲイシャ・ワルツ",
  },
  {
    title: "お正月(もういくつねるとおしょうがつ 童謡・唱歌 瀧廉太郎 1901)",
    info: "",
    filename: "お正月",
  },
  {
    title: "トンコ節(あなたのくれたおびどめの 歌謡曲 1949 久保幸江 古賀政男)",
    info: "",
    filename: "トンコ節",
  },
  {
    title:
      "山のけむり(やまのけむりのほのぼのとたゆとうもりよあのみちよ 童謡・唱歌 歌謡曲 八洲秀章 1952)",
    info: "",
    filename: "山のけむり",
  },
  {
    title:
      "夜霧よ今夜も有難う(しのびあうこいをつつむよぎりよ 歌謡曲 石原裕次郎 浜口庫之助 1967)",
    info: "",
    filename: "夜霧よ今夜も有難う",
  },
  {
    title: "ドラゴンクエスト序曲(ゲーム 鳥山明 すぎやまこういち 堀井雄二 1986)",
    info: "",
    filename: "ドラゴンクエスト序曲",
  },
  {
    title: "月月火水木金金(あさだよあけだうしおのいぶき 軍歌・戦時歌謡 1940)",
    info: "",
    filename: "月月火水木金金",
  },
  {
    title: "まつのき小唄(まつのきばかりがまつじゃない 歌謡曲 1964 二宮ゆき子)",
    info: "",
    filename: "まつのき小唄",
  },
  {
    title:
      "マイ・ボニー(My Bonnie Lies Over the Ocean 童謡・唱歌 洋楽 イギリス スコットランド)",
    info: "",
    filename: "マイ・ボニー",
  },
  {
    title:
      "もしも月給が上がったら(もしもげっきゅうがあがったら 歌謡曲 林伊佐緒・新橋みどり 平岡照章 1937)",
    info: "",
    filename: "もしも月給が上がったら",
  },
  {
    title:
      "十人のインディアン(ひとりふたりさんにんいるよ 童謡・唱歌 Ten Little Indians)",
    info: "",
    filename: "十人のインディアン",
  },
  {
    title:
      "スーダラ節(ちょいといっぱいのつもりでのんで 歌謡曲 植木等 1961 青島幸男 萩原哲晶)",
    info: "",
    filename: "スーダラ節",
  },
  {
    title:
      "およげ！たいやきくん(まいにちまいにちぼくらはてっぱんの 1975 佐瀬寿一 子門真人)",
    info: "",
    filename: "およげ！たいやきくん",
  },
  {
    title:
      "おおブレネリ(おおぶれねりあなたのおうちはどこわたしのおうちは 童謡・唱歌  スイス)",
    info: "",
    filename: "おおブレネリ",
  },
  {
    title:
      "ドレミの歌(どはどーなつのど 童謡・唱歌 1959 サウンド・オブ・ミュージック)",
    info: "",
    filename: "ドレミの歌",
  },
  {
    title:
      "名月赤城山(おとこごころにおとこがほれて 歌謡曲 東海林太郎 1939 菊池博)",
    info: "",
    filename: "名月赤城山",
  },
  {
    title:
      "リンゴの唄(あかいりんごにくちびるよせて 歌謡曲 1945 並木路子 万城目正 サトウハチロー)",
    info: "",
    filename: "リンゴの唄",
  },
  {
    title:
      "瀬戸の花嫁(せとはひぐれてゆうなみこなみ 歌謡曲 1972 小柳ルミ子 平尾昌晃)",
    info: "",
    filename: "瀬戸の花嫁",
  },
  {
    title:
      "若いお巡りさん(もしもしべんちでささやくおふたりさん 歌謡曲 1956 曽根史朗 利根一郎)",
    info: "",
    filename: "若いお巡りさん",
  },
  {
    title:
      "白銀の糸(しろがねのいとこがねにまじり 童謠・唱歌 洋楽 Silver Threads Among the Gold アメリカ)",
    info: "",
    filename: "白銀の糸",
  },
  {
    title:
      "波浮の港(いそのうのとりゃひぐれにゃかえるはぶのみなとにゃ 中山晋平 1923 歌謡曲 童謡・唱歌)",
    info: "",
    filename: "波浮の港",
  },
  {
    title:
      "島のブルース(あまみなちかしゃそてつのかげで 歌謡曲 三沢あけみ 1963 渡久地政信)",
    info: "",
    filename: "島のブルース",
  },
  {
    title: "祇園小唄(つきはおぼろにひがしやま 歌謡曲 1923 佐々紅華)",
    info: "",
    filename: "祇園小唄",
  },
  {
    title:
      "出船(こよいでふねかおなごりおしや 1928 歌謡曲 童謡・唱歌 杉山長谷夫)",
    info: "",
    filename: "出船",
  },
  {
    title:
      "蒲田行進曲(にじのみやこひかりのみなときねまのてんち 映画 挿入歌 Rudolf Friml Song of the Vagabonds)",
    info: "",
    filename: "蒲田行進曲",
  },
  {
    title:
      "雀の学校(ちいちいぱっぱちいぱっぱすずめのがっこうのせんせいは 童謡・唱歌 1922 弘田龍太郎)",
    info: "",
    filename: "雀の学校",
  },
  {
    title:
      "さくら貝の歌(うるわしきさくらいがいひとつ 童謡・唱歌 八洲秀章 1950)",
    info: "",
    filename: "さくら貝の歌",
  },
  {
    title:
      "東京節(パイノパイノパイ とうきょうのちゅうすうはまるのうち 1918 添田知道 エノケン)",
    info: "",
    filename: "東京節",
  },
  {
    title:
      "赤胴鈴之助の歌(けんをとってはにっぽんいちにゆめはおおきなしょうねんけんし  童謡・唱歌 漫画 ラジオ 1957 金子三雄)",
    info: "",
    filename: "赤胴鈴之助の歌",
  },
  {
    title:
      "カスバの女(なみだじゃないのようわきなあめに ここはちのはてあるじぇりあ 歌謡曲 1955 エト邦枝 久我山明)",
    info: "",
    filename: "カスバの女",
  },
  {
    title:
      "見上げてごらん夜の星を(みあげてごらんよるのほしを 歌謡曲 坂本九 1960 いずみたく)",
    info: "",
    filename: "見上げてごらん夜の星を",
  },
  {
    title:
      "この世の花(あかくさくはなあおいはな 歌謡曲 1955 島倉千代子 万城目正)",
    info: "",
    filename: "この世の花",
  },
  {
    title:
      "急げ幌馬車(ひぐれかなしやあれのははるかいそげほろばしゃすずのねだより 1934 歌謡曲 松平晃 江口夜詩)",
    info: "",
    filename: "急げ幌馬車",
  },
  {
    title:
      "天国に結ぶ恋(こよいなごりのみかづきも 歌謡曲 1932 徳山璉・四家文子 林純平)",
    info: "",
    filename: "天国に結ぶ恋",
  },
  {
    title:
      "月がとっても青いから(つきがとってもあおいからとおまわりしてかえろう 歌謡曲 1955 菅原都々子 陸奥明)",
    info: "",
    filename: "月がとっても青いから",
  },
  {
    title:
      "黒い瞳の(くろいひとみのわかものがわたしのこころをとりこにした 童謠・唱歌 加藤登紀子 ロシア)",
    info: "",
    filename: "黒い瞳の",
  },
  {
    title:
      "てるてる坊主(てるてるぼうずてるぼうずあしたてんきにしておくれ 童謠・唱歌 中山晋平)",
    info: "",
    filename: "てるてる坊主",
  },
  {
    title: "たこのうた(たこたこあがれかぜよくうけて 童謠・唱歌)",
    info: "",
    filename: "たこのうた",
  },
  {
    title:
      "浜千鳥(あおいつきよのはまべにはおやをさがしてなくとりが 童謠・唱歌 弘田龍太郎 1919)",
    info: "",
    filename: "浜千鳥",
  },
  {
    title:
      "崖の上のポニョ(ぽーにょぽにょぽにょぽにょさかなのこ 童謠・唱歌 ジブリ 久石譲 2008)",
    info: "",
    filename: "崖の上のポニョ",
  },
  {
    title:
      "女ひとり(きょうとおおはらさんぜんいんこいにつかれたおんながひとり 歌謡曲 デューク・エイセス いずみたく 1965)",
    info: "",
    filename: "女ひとり",
  },
  {
    title:
      "君をのせて(天空の城ラピュタ。あのちへいせんかがやくのは ジブリ 1986)",
    info: "",
    filename: "君をのせて",
  },
  {
    title:
      "別れの一本杉(なけたなけたこれえきれずになけたっけ 歌謡曲 1955 春日八郎 船村徹)",
    info: "",
    filename: "別れの一本杉",
  },
  {
    title:
      "東京五輪音頭(はあーあのひろーまでながめたつきが 歌謡曲 三波春夫 古賀政男 1963)",
    info: "",
    filename: "東京五輪音頭",
  },
  {
    title:
      "さざんかの宿(くもりがらすをてでふいてあなたあしたがみえますか 歌謡曲 大川栄策 市川昭介 1982)",
    info: "",
    filename: "さざんかの宿",
  },
  {
    title:
      "シーハイル(いわきのおろしがふくならふけよやまからやまへとわれらははしる 1929 童謠・唱歌)",
    info: "",
    filename: "シーハイル",
  },
  {
    title:
      "鈴懸の径(ともとかたらんすずかけのみち 歌謡曲 1942 灰田勝彦 軍歌・戦時歌謡 灰田有紀彦)",
    info: "",
    filename: "鈴懸の径",
  },
  {
    title: "カリンカ(ガマズミよ、ガマズミよ、私のガマズミよ 童謡・唱歌 ロシア)",
    info: "",
    filename: "カリンカ",
  },
  {
    title:
      "影を慕いて(まぼろしのかげをしたいて 1929 歌謡曲 マンドリン 古賀政男)",
    info: "",
    filename: "影を慕いて",
  },
  {
    title:
      "美しき天然(そらにさえずるとりのこえ 童謡・唱歌 うつくしき 田中穂積 1902)",
    info: "",
    filename: "美しき天然",
  },
  {
    title: "別れのブルース(まどをあければ 1937 歌謡曲 淡谷のり子 服部良一)",
    info: "",
    filename: "別れのブルース",
  },
  {
    title:
      "東京ナイト・クラブ(なぜなくのまつげがぬれてる 歌謡曲 1959 フランク永井 松尾和子 吉田正)",
    info: "",
    filename: "東京ナイト・クラブ",
  },
  {
    title:
      "支那の夜(しなのよるしなのよるよみなとのあかりむらさきのよに 歌謡曲 軍歌・戦時歌謡 1938 渡辺はま子 竹岡信幸)",
    info: "",
    filename: "支那の夜",
  },
  {
    title:
      "ここに幸あり(あらしもふけばあめもふる 歌謡曲 映画 1956 大津美子 飯田三郎)",
    info: "",
    filename: "ここに幸あり",
  },
  {
    title:
      "蛍の光(ほたるのひかりまどのゆき 童謡・唱歌 イギリス スコットランド)",
    info: "",
    filename: "蛍の光",
  },
  {
    title:
      "一杯のコーヒーから(いっぱいのこーひーからゆめのはなさくこともある 1939 歌謡曲 霧島昇 ミス・コロムビア 服部良一)",
    info: "",
    filename: "一杯のコーヒーから",
  },
  {
    title:
      "暗路(やみじ。おぐらきよわをひとりゆけばくもよりしばしつくはもれて 童謡・唱歌 洋楽 W.T.Wrighton)",
    info: "",
    filename: "暗路",
  },
  {
    title:
      "イヨマンテの夜(いよまんてもえろかがりびああまんげつよ 1950 伊藤久男 古関裕而 熊祭りの夜 歌謡曲)",
    info: "",
    filename: "イヨマンテの夜",
  },
  {
    title:
      "ああそれなのに(そらにゃきょうもあどばるん 1937 歌謡曲 美ち奴 古賀政男)",
    info: "",
    filename: "ああそれなのに",
  },
  {
    title: "冬の夜(ともしびちかくきぬぬうははは 童謡・唱歌)",
    info: "",
    filename: "冬の夜",
  },
  {
    title: "お江戸日本橋(おえどにほんばしななつだち 童謡・唱歌)",
    info: "",
    filename: "お江戸日本橋",
  },
  {
    title: "アロハ・オエ(やさしくかなずるはゆかしうくれれよ 童謠・唱歌 ハワイ)",
    info: "",
    filename: "アロハ・オエ",
  },
  {
    title: "岸壁の母(はははきましたきょうもきた 歌謡曲 1954 菊池章子 平川浪竜)",
    info: "",
    filename: "岸壁の母",
  },
  {
    title:
      "瓢箪ブギ(のめやうたえやよのなかはさけださけだよひょうたんぶぎ 1954 春日八郎 江口夜詩)",
    info: "",
    filename: "瓢箪ブギ",
  },
  {
    title:
      "大利根月夜(あれをごらんとゆびさすかたに 歌謡曲 田端義夫 1939 長津義司)",
    info: "",
    filename: "大利根月夜",
  },
  {
    title:
      "こんなベッピン見たことない(とかなんとかおっしゃって 歌謡曲 神楽坂はん子 1952 古賀政男)",
    info: "",
    filename: "こんなベッピン見たことない",
  },
  {
    title:
      "ブンガワン・ソロ(ぶんがわんそろはてしなききよきながれに 童謠・唱歌 インドネシア)",
    info: "",
    filename: "ブンガワン・ソロ",
  },
  {
    title:
      "金色夜叉(あたみのかいがんさんぽするかんいちおみやの 1918 演歌師 後藤紫雲・宮島郁芳 尾崎紅葉の小説)",
    info: "",
    filename: "金色夜叉",
  },
  {
    title:
      "追憶(ほしかげやさしくまたたくみそらをあおぎてさまよい 童謡・唱歌 讃美歌 アメリカ)",
    info: "",
    filename: "追憶",
  },
  {
    title:
      "テネシーワルツ(おもいでなつかしあのてねしーわるつ 洋楽 アメリカ 1946 パティ・ペイジ 江利チエミ)",
    info: "",
    filename: "テネシーワルツ",
  },
  {
    title:
      "昔の名前で出ています(きょうとにいるときゃしのぶとよばれたの 歌謡曲 小林旭 1975 叶弦大)",
    info: "",
    filename: "昔の名前で出ています",
  },
  {
    title:
      "世界は二人のために(あいあなたとふたりはなあなたとふたり 歌謡曲 佐良直美 1967 いずみたく)",
    info: "",
    filename: "世界は二人のために",
  },
  {
    title:
      "文明堂(かすてらいちばんでんわはにばん オッフェンバック 天国と地獄 クラシック CM 童謡・唱歌)",
    info: "",
    filename: "文明堂",
  },
  {
    title:
      "花嫁(はなよめはよぎしゃにのってとついでゆくの 歌謡曲 フォーク 端田宜彦 1971)",
    info: "",
    filename: "花嫁",
  },
  {
    title: "春よ、来い(あわきひかりたつにわかあめ 歌謡曲 松任谷由美 1994)",
    info: "",
    filename: "春よ、来い",
  },
  {
    title: "村の娘(あけゆくやまやまをこがねいろにそめ イタリア 童謠・唱歌)",
    info: "",
    filename: "村の娘",
  },
  {
    title:
      "さとうきび畑(ざわわざわわざわわひろいさとうきびばたけは 歌謡曲 2001 森山良子 寺島尚彦)",
    info: "",
    filename: "さとうきび畑",
  },
  {
    title:
      "シャボン玉ホリデー(しゃぼんだまるるるるるるるしゃぼんだまららららららら テレビ ザ・ピーナッツ クレージーキャッツ 1961)",
    info: "",
    filename: "シャボン玉ホリデー",
  },
  {
    title:
      "なつかしのバージニア(Carry Me Back to Old Virginny いざゆかんなつかしのゆめにあこがる 童謡・唱歌 アメリカ)",
    info: "",
    filename: "なつかしのバージニア",
  },
  {
    title:
      "また逢う日まで(またあうひまであえるときまでわかれのそのわけははなしたくない 尾崎紀世彦 歌謡曲 1971 筒美京平)",
    info: "",
    filename: "また逢う日まで",
  },
  {
    title: "渡る世間は鬼ばかり(羽田健太郎 1990 テレビ)",
    info: "",
    filename: "渡る世間は鬼ばかり",
  },
  {
    title:
      "ソルベーグの歌(ふゆはゆきてはるすぎてはるすぎて グリーグ クラシック ノルウェー)",
    info: "",
    filename: "ソルベーグの歌",
  },
  {
    title:
      "贈る言葉(くれなずむまちのひかりとかげのなかさりゆくあなたへ 歌謡曲 海援隊 武田鉄矢 1979 千葉和臣)",
    info: "",
    filename: "贈る言葉",
  },
  {
    title:
      "こんにちは赤ちゃん(こんにちはあかちゃんあなたのえがお 歌謡曲 梓みちよ 永六輔 中村八大 1963)",
    info: "",
    filename: "こんにちは赤ちゃん",
  },
  {
    title:
      "サッちゃん(さっちゃんはねさちこってゆうんだほんとはね 童謠・唱歌 大中恩 おおなかめぐみ)",
    info: "",
    filename: "サッちゃん",
  },
  {
    title:
      "白いブランコ(きみはおぼえているかしらあのしろいぶらんこ 歌謡曲 フォーク ビリー・バンバン 1969 菅原進)",
    info: "",
    filename: "白いブランコ",
  },
  {
    title:
      "寒い朝(きたかぜふきぬくさむいあさもこころひとつで 歌謡曲 吉永小百合 1962 吉田正)",
    info: "",
    filename: "寒い朝",
  },
  {
    title: "ビッグ・ベンの鐘(ウェストミンスター宮殿の時計 イギリス ロンドン)",
    info: "",
    filename: "ビッグ・ベンの鐘",
  },
  {
    title:
      "津軽海峡・冬景色(うえのはつのやこうれっしゃおりたときから 歌謡曲 石川さゆり 三木たかし 1977)",
    info: "",
    filename: "津軽海峡・冬景色",
  },
  {
    title:
      "スワニー河(はるかなるすわにーがわきしべに フォスター 故郷の人々 アメリカ)",
    info: "",
    filename: "スワニー河",
  },
  {
    title: "美しき青きドナウ(ヨハン・シュトラウス2世 ワルツ クラシック)",
    info: "",
    filename: "美しき青きドナウ",
  },
  {
    title: "呼び込みくん(スーパーでよく聞く曲)",
    info: "",
    filename: "呼び込みくん",
  },
  {
    title: "煙が目にしみる(Smoke Gets In Your Eyes プラターズ 1958 1932 洋楽)",
    info: "",
    filename: "煙が目にしみる",
  },
  {
    title: "威風堂々(エルガー いふうどうどう クラシック)",
    info: "",
    filename: "威風堂々",
  },
  {
    title: "エトピリカ(情熱大陸より 2014 葉加瀬太郎)",
    info: "",
    filename: "エトピリカ",
  },
  {
    title: "マック・ザ・ナイフ(Mack the Knife ジャズ)",
    info: "",
    filename: "マック・ザ・ナイフ",
  },
  {
    title:
      "バット・ノット・フォー・ミー(ガーシュウィン But Not for Me クラシック ジャズ)",
    info: "",
    filename: "バット・ノット・フォー・ミー",
  },
  {
    title: "運命(ベートーベン交響曲5番 クラシック)",
    info: "",
    filename: "運命",
  },
  {
    title:
      "この素晴らしき世界(What a Wonderful World ルイ・アームストロング 1967 ジャズ)",
    info: "",
    filename: "この素晴らしき世界",
  },
  {
    title:
      "愛を感じて(ディズニー「ライオン・キング」より Can you feel the love tonight)",
    info: "",
    filename: "愛を感じて",
  },
  {
    title: "フライ・ミー・トゥ・ザ・ムーン(Fly Me To the Moon  ジャズ 洋楽)",
    info: "",
    filename: "フライ・ミー・トゥ・ザ・ムーン",
  },
  {
    title:
      "ママがサンタにキスをした(I Saw Mommy Kissing Santa Claus クリスマス)",
    info: "",
    filename: "ママがサンタにキスをした",
  },
  {
    title:
      "王の行進(ファランドール あさひうけてすすむおうのぎょうれつうるわし ビゼー アルルの女 クラシック)",
    info: "",
    filename: "王の行進",
  },
  {
    title: "いつか夢で(ディズニー「眠れる森の美女」より Once Upon a Dream)",
    info: "",
    filename: "いつか夢で",
  },
  {
    title: "グノーのアヴェ・マリア(Gounod Ave Maria クリスマス)",
    info: "",
    filename: "グノーのアヴェ・マリア",
  },
  {
    title: "ピアノソナタ第8番悲愴第2楽章より(ベートーベン クラシック)",
    info: "",
    filename: "ピアノソナタ第8番悲愴第2楽章より",
  },
  {
    title:
      "パート・オブ・ユア・ワールド(ディズニー「リトル・マーメイド」より Part of your World)",
    info: "",
    filename: "パート・オブ・ユア・ワールド",
  },
  {
    title: "楽しき農夫(シューマン クラシック)",
    info: "",
    filename: "楽しき農夫",
  },
  {
    title:
      "帰れソレントへ(うるわしのうみはうつつにもゆめむ イタリア ナポリ 童謠・唱歌)",
    info: "",
    filename: "帰れソレントへ",
  },
  {
    title:
      "三百六十五歩のマーチ(しあわせはあるいてこない 1968 水前寺清子 米山正夫)",
    info: "",
    filename: "三百六十五歩のマーチ",
  },
  {
    title:
      "花は咲く(まっしろなゆきみちにはるかぜかおる 歌謡曲 菅野よう子 東日本大震災 チャリティーソング 2011)",
    info: "",
    filename: "花は咲く",
  },
  {
    title: "枯葉(Autumn Leaves ジャズ 元曲はフランスのシャンソン)",
    info: "",
    filename: "枯葉",
  },
  {
    title:
      "ひこうき雲(しろいさかみちがそらまでつづいている 松任谷由実 1973 歌謡曲)",
    info: "",
    filename: "ひこうき雲",
  },
  {
    title: "凱旋行進曲(ヴェルディ アイーダ クラシック)",
    info: "",
    filename: "凱旋行進曲",
  },
  {
    title: "デスペラード(イーグルス Desperado ならず者 洋楽)",
    info: "",
    filename: "デスペラード",
  },
  {
    title: "ハート・アンド・ソウル(Heart and Soul 洋楽 Hoagy Carmichael 1938)",
    info: "",
    filename: "ハート・アンド・ソウル",
  },
  {
    title: "ベートーベンのトルコ行進曲(クラシック)",
    info: "",
    filename: "ベートーベンのトルコ行進曲",
  },
  {
    title:
      "グリーン・スリーブス(Greensleeves 洋楽 童謡・唱歌 フォーク イギリス イングランド)",
    info: "",
    filename: "グリーン・スリーブス",
  },
  {
    title: "聖夜(きよしこのよる クリスマス 童謡・唱歌 讃美歌)",
    info: "",
    filename: "聖夜",
  },
  {
    title: "幻想即興曲(ショパン クラシック)",
    info: "",
    filename: "幻想即興曲",
  },
  {
    title: "サッポロ一番(さっぽろいちばんしおらーめん CM)",
    info: "",
    filename: "サッポロ一番",
  },
  {
    title:
      "夜の調べ(グノーのセレナーデ あわれゆかしきうたのしらべ クラシック フランス)",
    info: "",
    filename: "夜の調べ",
  },
  {
    title: "君は我が心の中に(Du, Du Liegst Mir Im Herzen ドイツ 童謡・唱歌)",
    info: "",
    filename: "君は我が心の中に",
  },
  {
    title: "五月の歌(たのしやごがつくさきはもえ モーツァルト クラシック)",
    info: "",
    filename: "五月の歌",
  },
  {
    title:
      "明治チョコレート(ちょっこれーとちょっこれーとちょこれーとはめいじ CM)",
    info: "",
    filename: "明治チョコレート",
  },
  {
    title: "ヴィヴァルディ四季より春(クラシック)",
    info: "",
    filename: "ヴィヴァルディ四季より春",
  },
  {
    title: "美女と野獣(ディズニー Beauty and the Beast)",
    info: "",
    filename: "美女と野獣",
  },
  {
    title: "ヘイ・ジュード(ビートルズ Hey Jude 洋楽)",
    info: "",
    filename: "ヘイ・ジュード",
  },
  {
    title: "セブン・イレブン(せぶんいれぶんいいきぶん CM)",
    info: "",
    filename: "セブン・イレブン",
  },
  {
    title: "茶色の小瓶(Little Brown Jug ジャズ)",
    info: "",
    filename: "茶色の小瓶",
  },
  {
    title: "愛の喜び(マルティーニ クラシック)",
    info: "",
    filename: "愛の喜び",
  },
  {
    title: "雨だれの前奏曲(ショパン クラシック)",
    info: "",
    filename: "雨だれの前奏曲",
  },
  {
    title:
      "スーパーカリフラジリスティックエクスピアリドーシャス(ディズニー「メリー・ポピンズ」より)",
    info: "",
    filename: "スーパーカリフラジリスティック",
  },
  {
    title: "エリーゼのために(ベートーベン クラシック)",
    info: "",
    filename: "エリーゼのために",
  },
  {
    title:
      "朝日のごとくさわやかに(Softly as in a Morning Sunshine 洋楽 ジャズ)",
    info: "",
    filename: "朝日のごとくさわやかに",
  },
  {
    title: "これが恋かしら(ディズニー「シンデレラ」より So This is Love)",
    info: "",
    filename: "これが恋かしら",
  },
  {
    title: "神の御子は(かみのみこはこよいしもべつれへむに クリスマス 讃美歌)",
    info: "",
    filename: "神の御子は",
  },
  {
    title:
      "ムーン・リバー(Moon River wider than a mile 洋楽 1961 映画 ティファニーで朝食を)",
    info: "",
    filename: "ムーン・リバー",
  },
  {
    title:
      "インターナショナル(たてうえたるものよいまぞひはちかし 童謡・唱歌 フォーク 革命歌 19世紀フランス)",
    info: "",
    filename: "インターナショナル",
  },
  {
    title:
      "歌の翼に(メンデルスゾーン うたのつばさをかりてゆかなさちにあふるるゆめのくにへ クラシック)",
    info: "",
    filename: "歌の翼に",
  },
  {
    title:
      "そりすべり(リロイ・アンダーソン クリスマス 1948 アメリカ Sleigh Ride)",
    info: "",
    filename: "そりすべり",
  },
  {
    title:
      "私のお気に入り(サウンド・オブ・ミュージックより My Favorite Things 1959)",
    info: "",
    filename: "私のお気に入り",
  },
  {
    title: "リベルタンゴ(ピアソラ クラシック 1974 バンドネオン)",
    info: "",
    filename: "リベルタンゴ",
  },
  {
    title: "新世界より(ドヴォルザーク クラシック チェコ 1893)",
    info: "",
    filename: "新世界より",
  },
  {
    title:
      "漕げよマイケル(Michael Row the Boat Ashore Hallelujah 洋楽 童謡・唱歌 黒人霊歌 フォーク)",
    info: "",
    filename: "漕げよマイケル",
  },
  {
    title: "ケーズデンキの歌(ゆめゆめはっぴーいつでもやすい CM)",
    info: "",
    filename: "ケーズデンキの歌",
  },
  {
    title:
      "ウェルナーの野ばら(わらべはみたりのなかのばら ウェルナー クラシック 童謡・唱歌 ドイツ歌曲)",
    info: "",
    filename: "ウェルナーの野ばら",
  },
  {
    title: "ブラームスのワルツ(円舞曲 クラシック)",
    info: "",
    filename: "ブラームスのワルツ",
  },
  {
    title: "ふしぎの国のアリス(ディズニー Alice in Wonderland)",
    info: "",
    filename: "ふしぎの国のアリス",
  },
  {
    title:
      "千の風になって(わたしのおはかのまえでなかないでください 歌謡曲 新井満 2006)",
    info: "",
    filename: "千の風になって",
  },

  {
    title: "宇宙を越えて(ビートルズ 洋楽 Across the Universe)",
    info: "",
    filename: "宇宙を越えて",
  },
  {
    title: "ジングル・ベル(のをこえておかをこえ クリスマス 童謡・唱歌)",
    info: "",
    filename: "ジングル・ベル",
  },
  {
    title: "恋とはどんなものかしら(フィガロの結婚より モーツァルト クラシック)",
    info: "",
    filename: "恋とはどんなものかしら",
  },
  {
    title: "ペールギュントより朝(グリーグ クラシック ノルウェー)",
    info: "",
    filename: "ペールギュントより朝",
  },
  {
    title: "セナのピアノⅡ(Close to You テレビ ロングバケーション)",
    info: "",
    filename: "セナのピアノⅡ",
  },
  {
    title: "少年時代(なつがすぎかぜあざみ 井上陽水 歌謡曲 1990)",
    info: "",
    filename: "少年時代",
  },
  {
    title:
      "ドラえもんのうた(こんなこといいなできたらいいなあんなゆめこんなゆめ 童謡・唱歌 テレビ アニメ 1979 菊池俊輔)",
    info: "",
    filename: "ドラえもんのうた",
  },
  {
    title: "菊の花(みごとにさいたかきねのこぎく 童謡・唱歌 1911)",
    info: "",
    filename: "菊の花みごと",
  },
  {
    title:
      "アンパンマンのマーチ(そうだうれしいんだいきるよろこび  三木たかし 童謡・唱歌 アニメ テレビ 1988 やなせたかし)",
    info: "",
    filename: "アンパンマンのマーチ",
  },
  {
    title:
      "ヴォルガの舟歌(ええこーらええこーらもひとつええこーら 童謡・唱歌 ロシア)",
    info: "",
    filename: "ヴォルガの舟歌",
  },
  {
    title:
      "オン・トップ・オブ・オールド・スモーキー(On Top Of Old Smokey アメリカ フォーク)",
    info: "",
    filename: "オン・トップ・オブ・オールド・スモーキー",
  },
  {
    title: "お正月を写そう(フジカラー おしょうがつをうつそう CM)",
    info: "",
    filename: "お正月を写そう",
  },
  {
    title:
      "ギッチョンチョン(たかいやまからたにそこみれば 江戸明治の演歌 歌謡曲)",
    info: "",
    filename: "ギッチョンチョン",
  },
  {
    title:
      "サザエさん(おさかなくわえたどらねこおっかけて テレビ アニメ 筒美京平 1969)",
    info: "",
    filename: "サザエさん",
  },
  {
    title:
      "シエリト・リンド(うつくしいそら メキシコ cielito lindo 1882 童謡・唱歌)",
    info: "",
    filename: "シエリト・リンド",
  },
  {
    title:
      "シエリト・リンド(うつくしいそら メキシコ cielito lindo 1882 童謡・唱歌)",
    info: "",
    filename: "シエリト・リンド",
  },
  {
    title: "ジムノペディ1番(サティ クラシック)",
    info: "",
    filename: "ジムノペディ1番",
  },
  {
    title:
      "ずいずいずっころばし(ごまみそずいちゃつぼにおわれてとっぴんしゃん 童謡・唱歌)",
    info: "",
    filename: "ずいずいずっころばし",
  },
  {
    title:
      "スカボロー・フェア(サイモンとガーファンクル Scarborough Fair 童謡・唱歌 イギリス)",
    info: "",
    filename: "スカボロー・フェア",
  },
  {
    title:
      "すみだ川(いちょうがえしにくろじゅすかけて 1937 歌謡曲 東海林太郎 山田栄一)",
    info: "",
    filename: "すみだ川",
  },
  {
    title:
      "ちいさい秋みつけた(だれかさんがだれかさんがみつけたちいさいあき 童謡・唱歌 中田喜直 1955)",
    info: "",
    filename: "ちいさい秋みつけた",
  },
  {
    title:
      "とんぼのめがね(とんぼのめがねはみずいろめがね 平井康三郎 童謡・唱歌)",
    info: "",
    filename: "とんぼのめがね",
  },
  {
    title:
      "なみだの操(あなたのためにまもりとおしたおんなのみさお 殿さまキングス 1973 歌謡曲)",
    info: "",
    filename: "なみだの操",
  },
  {
    title:
      "ノーベルのどあめ(なめたらあかんなめたらあかんじんせいなめずに CM 天童よしみ)",
    info: "",
    filename: "ノーベルのどあめ",
  },
  {
    title: "ハナミズキ(そらをおしあげててをのばすきみ 一青窈 2004 歌謡曲)",
    info: "",
    filename: "ハナミズキ",
  },
  {
    title:
      "バルカンの星の下に(くろきひとみいずこわがふるさといずこ 童謡・唱歌 ロシア)",
    info: "",
    filename: "バルカンの星の下に",
  },
  {
    title:
      "ひらいたひらいた(なんのはながひらいたれんげのはながひらいた 童謡・唱歌)",
    info: "",
    filename: "ひらいたひらいた",
  },
  {
    title:
      "マリア・マリ(まどをひらきてわがうたききてよ カプア 童謡・唱歌 イタリア カンツォーネ)",
    info: "",
    filename: "マリア・マリ",
  },
  {
    title:
      "めざせポケモンマスター(たとえひのなかみずのなかくさのなかもりのなか テレビ アニメ 1997 松本梨香 たなかひろかず)",
    info: "",
    filename: "めざせポケモンマスター",
  },
  {
    title:
      "ラ・パロマ(わがふねはばなたつときさびしきなみだあふれぬ 童謡・唱歌 スペイン 鳩)",
    info: "",
    filename: "ラ・パロマ",
  },
  {
    title: "ラデツキー行進曲(ヨハン・シュトラウス1世 クラシック)",
    info: "",
    filename: "ラデツキー行進曲",
  },
  {
    title: "ローソンストア100(ひゃくひゃくひゃくえん CM)",
    info: "",
    filename: "ローソンストア100",
  },
  {
    title:
      "わが悩み知り給う(Nobody Know de Trouble I See わがなやみしりたもう 黒人霊歌)",
    info: "",
    filename: "わが悩み知り給う",
  },
  {
    title:
      "わたしの城下町(こうしどをくぐりぬけみあげるゆうやけのそらに 歌謡曲 小柳ルミ子 1971 平尾昌晃)",
    info: "",
    filename: "わたしの城下町",
  },
  {
    title:
      "ワンツー・ジェンカ(おおきくくちあけて 童謡・唱歌 フィンランド フォークダンス レットキス 坂本九 1966)",
    info: "",
    filename: "ワンツー・ジェンカ",
  },
  {
    title: "愛の夢第3番(リスト クラシック)",
    info: "",
    filename: "愛の夢第3番",
  },
  {
    title:
      "雨降りお月(あめふりおつきさんくものかげおよめにゆくときゃ 童謡・唱歌 中山晋平)",
    info: "",
    filename: "雨降りお月",
  },
  {
    title:
      "家路(Going home とおきやまにひはおちてほしはそらをちりばめぬ ドヴォルザーク 新世界より)",
    info: "",
    filename: "家路",
  },
  {
    title:
      "歌声ひびく(うるわしはるよみどりにはえてうたごえひびく 童謡・唱歌 ドイツ)",
    info: "",
    filename: "歌声ひびく",
  },
  {
    title:
      "花〜すべての人の心に花を(かわはながれてどこどこいくの 歌謡曲 沖縄 喜納昌吉1980)",
    info: "",
    filename: "花〜すべての人の心に花を",
  },
  {
    title:
      "釜山港に帰れ(つばきさくはるなのにあなたはかえらない 歌謡曲 黄善雨 1972 トロット)",
    info: "",
    filename: "釜山港に帰れ",
  },
  {
    title:
      "喜びの歌(はれたるあおぞらただようくもよ 歓喜の歌 ベートーベン クラシック)",
    info: "",
    filename: "喜びの歌",
  },
  {
    title:
      "銀座の恋の物語(こころのそこまでしびれるような 歌謡曲 石原裕次郎 1961 鏑木創)",
    info: "",
    filename: "銀座の恋の物語",
  },
  {
    title:
      "君といつまでも(ふたりをゆうやみがつつむこのまどべに 歌謡曲 加山雄三 1965)",
    info: "",
    filename: "君といつまでも",
  },
  {
    title:
      "肩たたき(かあさんおかたをたたきましょうたんとんたんとん 童謡・唱歌 中山晋平)",
    info: "",
    filename: "肩たたき",
  },
  {
    title:
      "山のかなたに(やまのかなたにあこがれて 歌謡曲 1951 藤山一郎 服部良一 映画)",
    info: "",
    filename: "山のかなたに",
  },
  {
    title:
      "時の流れに身をまかせ(もしもあなたとあえずにいたらわたしはなにをしてたでしょうか 1986 テレサ・テン 歌謡曲 三木たかし)",
    info: "",
    filename: "時の流れに身をまかせ",
  },
  {
    title: "春の風(るるるるーるる、ルルルルールル 童謡・唱歌 広瀬量平)",
    info: "",
    filename: "春の風",
  },
  {
    title: "小さな世界(せかいじゅうどこだって ディズニー It's a small world)",
    info: "",
    filename: "小さな世界",
  },
  {
    title:
      "小樽のひとよ(あいたいきもちがままならぬきたぐにのまちはつめたくとおい 歌謡曲 1967 鶴岡雅義と東京ロマンチカ)",
    info: "",
    filename: "小樽のひとよ",
  },
  {
    title:
      "人生の並木道(なくないもとよいもとよなくな 歌謡曲 ディック・ミネ 古賀政男 1937)",
    info: "",
    filename: "人生の並木道",
  },
  {
    title:
      "人生劇場(やるとおもえばどこまでやるさ 歌謡曲 村田英雄 古賀政男 1963)",
    info: "",
    filename: "人生劇場",
  },
  {
    title:
      "武田節(かいのやまやまひにはえてわれしゅつじんにうれいなし 歌謡曲 三橋美智也 1961 明本京静)",
    info: "",
    filename: "武田節",
  },
  {
    title: "平城山(ひとこうはかなしきものとならやまに 童謡・唱歌 平井康三郎)",
    info: "",
    filename: "平城山",
  },
  {
    title: "水色のワルツ(きみにあううれしさの 歌謡曲 1950 高木東六)",
    info: "",
    filename: "水色のワルツ",
  },
  {
    title:
      "青い背広で(あおいせびろでこころもかるく 歌謡曲 藤山一郎 古賀政男 1934)",
    info: "",
    filename: "青い背広で",
  },
  {
    title: "赤とんぼ(ゆうやけこやけのあかとんぼ 童謡・唱歌 山田耕筰)",
    info: "",
    filename: "赤とんぼ",
  },
  {
    title:
      "赤城の子守唄(なくなよしよしねんねしな 歌謡曲 東海林太郎 竹岡信幸 1934)",
    info: "",
    filename: "赤城の子守唄",
  },
  {
    title:
      "雪国(すきよあなたいまでもいまでもこよみはもうすこしでことしもおわりですね 歌謡曲 吉幾三 1986)",
    info: "",
    filename: "雪国",
  },
  {
    title: "太湖船(サントリーウーロン茶 CM たいこせん amin)",
    info: "",
    filename: "太湖船",
  },
  {
    title: "冬の野(つゆじものおきわつふゆののべぞさびしき 童謡・唱歌 ドイツ)",
    info: "",
    filename: "冬の野",
  },
  {
    title:
      "東京ブギウギ(とうきょうぶぎうぎりずむうきうきこころずきずきわくわく 歌謡曲 笠置シズ子1947 服部良一)",
    info: "",
    filename: "東京ブギウギ",
  },
  {
    title:
      "東京音頭(はあーおどりおどるならちょいと 歌謡曲 中山晋平 1932 丸の内音頭)",
    info: "",
    filename: "東京音頭",
  },
  {
    title:
      "湯の町エレジー(いずのやまやまつきあわく 歌謡曲 1948 近江俊郎 古賀政男)",
    info: "",
    filename: "湯の町エレジー",
  },
  {
    title:
      "憧れのハワイ航路(はれたそらそよぐかぜみなとでふねのどらのねたのし 歌謡曲 岡晴夫 1948 江口夜詩)",
    info: "",
    filename: "憧れのハワイ航路",
  },
  {
    title:
      "汝が友(ゆめになずみてねむるいとしご ハンガリージプシーの歌 ツィゴイネルワイゼン ながとも)",
    info: "",
    filename: "汝が友",
  },
  {
    title:
      "芭蕉布(うみのあおさにそらのあおみなみのかぜに 歌謡曲 普久原恒勇 沖縄 1965)",
    info: "",
    filename: "芭蕉布",
  },
  {
    title:
      "白い花の咲く頃(しろいはながさいてたふるさとの 歌謡曲 岡本敦郎 1950 田村しげる)",
    info: "",
    filename: "白い花の咲く頃",
  },
  {
    title: "白バラの匂う夕べは(Freud euch des Lebens 童謡・唱歌 ドイツ スイス)",
    info: "",
    filename: "白バラの匂う夕べは",
  },
  {
    title:
      "美しき(うつくしきわがこやいずこ 童謡・唱歌 イギリス スコットランドの釣鐘草)",
    info: "",
    filename: "美しき",
  },
  {
    title:
      "北帰行(まどはよつゆにぬれてみやこすでにとおのく 童謡・唱歌 歌謡曲 小林旭 宇田博 旧制旅順高等学校寮歌 1941)",
    info: "",
    filename: "北帰行",
  },
  {
    title:
      "勇気100パーセント(がっかりしてめそめそしてどうしたんだい 童謡・唱歌 テレビ 忍たま乱太郎 光genji 馬飼野康二 1993)",
    info: "",
    filename: "勇気100パーセント",
  },
  {
    title:
      "与作(よさくはきをきるへいへいほーへいへいほーこだまはかえるよ 歌謡曲 1978 北島三郎 七澤公典)",
    info: "",
    filename: "与作",
  },
  {
    title:
      "旅の夜風(はなもあらしもふみこえて 歌謡曲 1938 映画 愛染かつら 霧島昇 ミス・コロムビア 万城目正)",
    info: "",
    filename: "旅の夜風",
  },
  {
    title:
      "恋のバカンス(ためいきのでるようなあなたのくちづけに 歌謡曲 ザ・ピーナッツ 宮川泰 1963)",
    info: "",
    filename: "恋のバカンス",
  },
  {
    title:
      "翔べ！ガンダム(もえあがれもえあがれもえあがれがんだむ 童謡・唱歌 テレビ アニメ 1979 富野由悠季 渡辺岳夫)",
    info: "",
    filename: "翔べ！ガンダム",
  },
  {
    title: "マルエツドクター元気(どくたーげんきどくたーげんき CM)",
    info: "",
    filename: "マルエツドクター元気",
  },
  {
    title:
      "ア・ソング・フォー・ユー(A Song for You 洋楽 レオン・ラッセル 1970 カーペンターズ 1972)",
    info: "",
    filename: "ア・ソング・フォー・ユー",
  },
  {
    title:
      "小さな願い(バート・バカラック ディオンヌ・ワーウィック I Say a Little Prayer 1967 洋楽 ベトナム戦争)",
    info: "",
    filename: "小さな願い",
  },
  {
    title:
      "恋よ、さようなら(I'll Never Fall in Love Again バート・バカラック ディオンヌ・ワーウィック 1968 洋楽)",
    info: "",
    filename: "恋よ、さようなら",
  },
  {
    title:
      "恋のおもかげ(The Look of Love 映画 洋楽 007カジノロワイヤル バート・バカラック ダスティ・スプリングフィールド 1967)",
    info: "",
    filename: "恋のおもかげ",
  },
  {
    title:
      "遙かなる影((They Long to Be) Close to You はるかなる バート・バカラック 洋楽 1963 カーペンターズ 1970)",
    info: "",
    filename: "遙かなる影",
  },
  {
    title:
      "サン・ホセへの道(Do You Know the Way to San Jose ディオンヌ・ワーウィック 1968 バート・バカラック 洋楽)",
    info: "",
    filename: "サン・ホセへの道",
  },
  {
    title:
      "世界は愛を求めている(What the World Needs Now Is Love ジャッキー・デシャノン 1965 バート・バカラック 洋楽)",
    info: "",
    filename: "世界は愛を求めている",
  },
  {
    title:
      "彼こそが海賊(He's a Pirate ディズニー クラウス・バデルト ハンス・ジマー2003年 パイレーツ・オブ・カリビアン/呪われた海賊たち)",
    info: "",
    filename: "彼こそが海賊",
  },
  {
    title: "ヴィーナス(Venus オランダ ショッキング・ブルー  洋楽 1969)",
    info: "",
    filename: "ヴィーナス",
  },
  {
    title: "闘牛士の歌(ビゼーカルメンより クラシック フランス オペラ)",
    info: "",
    filename: "闘牛士の歌",
  },
  {
    title:
      "さよーならまたいつか！(どこからはるがめぐりくるのかしらず 歌謡曲 米津玄師 2024 テレビ 虎に翼)",
    info: "",
    filename: "さよーならまたいつか！",
  },
  {
    title:
      "ダイアモンド(つめたいいずみにすあしをひたしてみあげる Diamonds プリンセス プリンセス プリプリ 1989)",
    info: "",
    filename: "ダイアモンド",
  },
  {
    title: "オブラディ・オブラダ(ビートルズ 洋楽 Ob-La-Di, Ob-La-Da 1968)",
    info: "",
    filename: "オブラディ・オブラダ",
  },
  {
    title: "A列車で行こう(Take the A Train ジャズ 1939 デューク・エリントン)",
    info: "",
    filename: "A列車で行こう",
  },
  {
    title:
      "LOVEマシーン(あんたにゃもったいないあたしゃほんとう 歌謡曲 モーニング娘。 つんく 1999)",
    info: "",
    filename: "LOVEマシーン",
  },
  {
    title: "風が吹いている(いきものがかり 歌謡曲 2012 ロンドン オリンピック)",
    info: "",
    filename: "風が吹いている",
  },
  {
    title: "負けないで(ふとしたしゅんかんに 歌謡曲 ZARD 坂井泉水 1993)",
    info: "",
    filename: "負けないで",
  },
  {
    title: "スーパーマリオブラザーズ(ニンテンドーゲーム 1985 宮本茂 近藤浩治)",
    info: "",
    filename: "スーパーマリオブラザーズ",
  },
  {
    title:
      "大脱走のマーチ(The Great Escape March 映画 1963 ジョン・スタージェス。スティーブ・マックイーン チャールズ・ブロンソン エルマー・バーンスタイン)",
    info: "",
    filename: "大脱走のマーチ",
  },
  {
    title:
      "オー・シャンゼリゼ(フランス シャンソン Les Champs-Élysées ジョー・ダッサン 1969)",
    info: "",
    filename: "オー・シャンゼリゼ",
  },
  {
    title: "トロイメライ(シューマン クラシック ドイツ 子供の情景第7曲)",
    info: "",
    filename: "トロイメライ",
  },
  {
    title:
      "あした(おかあさまなかずにねんねいたしましょ 童謡・唱歌 大正時代 清水かつら 弘田龍太郎)",
    info: "",
    filename: "あした",
  },
  {
    title:
      "会いたくて会いたくて(あいたくてあいたくてふるえる 歌謡曲 西野カナ 2010)",
    info: "",
    filename: "会いたくて会いたくて",
  },
  {
    title:
      "クワイ河マーチ(クワイがわマーチ ボギー大佐 戦場にかける橋 1957 The Bridge on The River Kwai)",
    info: "",
    filename: "クワイ河マーチ",
  },
  {
    title:
      "アイ・ガット・リズム(I Got Rhythm 1930 ジョージ・ガーシュウィン ジャズ クラシック)",
    info: "",
    filename: "アイ・ガット・リズム",
  },
  {
    title: "マイム・マイム(Mayim Mayim 童謡・唱歌 フォークダンス イスラエル)",
    info: "",
    filename: "マイム・マイム",
  },
  {
    title: "ジェリコの戦い(Joshua Fit The Battle Of Jericho 黒人霊歌 ジャズ)",
    info: "",
    filename: "ジェリコの戦い",
  },
  {
    title: "友よ(ともよよあけまえのやみのなかで フォーク 岡林信康 1968)",
    info: "",
    filename: "友よ",
  },
  {
    title: "山谷ブルース(きょうのしごとはつらかった フォーク 岡林信康 1968)",
    info: "",
    filename: "山谷ブルース",
  },
  {
    title: "ある愛の詩(Love Story 映画 1970 フランシス・レイ)",
    info: "",
    filename: "ある愛の詩",
  },
  //
  //
  //
];
