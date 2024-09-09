"use client";
import Image from "next/image";
import nextConfig from "../next.config.mjs";

const BASE_PATH = nextConfig.basePath || "";

import React, { useEffect, useState } from "react";

export default function Home() {
  interface MusicData {
    title: string;
    info: string;
    filename: string;
  }

  const initialData: MusicData[] = [
    {
      title: "埴生の宿(はにゅうのやどもわがやどたまのよそいうらやまじ)",
      info: "童謡・唱歌 はにゅうのやどもわがやどたまのよそいうらやまじ",
      filename: "埴生の宿",
    },
    {
      title: "同期の桜(おまえとおれとはどうきのさくら)",
      info: "軍歌・戦時歌謡 おまえとおれとはどうきのさくら",
      filename: "同期の桜",
    },
    {
      title: "ラジオ体操の歌(作曲: 藤山一郎)",
      info: "作曲: 藤山一郎",
      filename: "ラジオ体操の歌",
    },
    {
      title:
        "嗚呼玉杯に花うけて(一高寮歌 ああぎょくはいにはなうけてりょくしゅにつきのかげやどし)",
      info: "一高寮歌 ああぎょくはいにはなうけてりょくしゅにつきのかげやどし 戦時歌謡",
      filename: "嗚呼玉杯に",
    },
    {
      title: "クシコス・ポスト(ネッケ 運動会)",
      info: "ネッケ作曲 クラシック 運動会 Csikos Post",
      filename: "クシコスポスト",
    },
    {
      title: "冬のソナタ(最初から今まで 冬ソナ)",
      info: "NHK 韓国ドラマ",
      filename: "冬のソナタ",
    },
    {
      title: "叱られて(しかられてあのこはまちまでおつかいに)",
      info: "童謡・唱歌",
      filename: "叱られて",
    },
    {
      title: "学生時代(つたのからまるちゃぺるで)",
      info: "ペギー葉山",
      filename: "学生時代",
    },
    {
      title: "この道(このみちはいつかきたみち)",
      info: "童謡・唱歌",
      filename: "この道",
    },
    {
      title: "子鹿のバンビ(こじかのばんびはかわいいなおはながにおうはるのあさ)",
      info: "童謡・唱歌",
      filename: "子鹿のバンビ",
    },
    {
      title:
        "さらば涙と言おう(さよならはだれにいうさよならはかなしみに 森田健作)",
      info: "",
      filename: "さらば涙と言おう",
    },
    {
      title: "アブラハムの子(あぶらはむにはしちにんのこ)",
      info: "童謡・唱歌",
      filename: "アブラハムの子",
    },
    {
      title: "かっこう(かっこうかっこうどこかでなつをよぶもりのこえ)",
      info: "童謡・唱歌",
      filename: "かっこう",
    },
    {
      title: "森の小人(もりのこかげでどんじゃらほい)",
      info: "童謡・唱歌",
      filename: "森の小人",
    },
    {
      title: "君が代(きみがよはちよにやちよに)",
      info: "国歌",
      filename: "君が代",
    },
    {
      title: "おうま(おうまのおやこはなかよしこよし)",
      info: "童謡・唱歌",
      filename: "おうま",
    },
    {
      title: "金魚の昼寝(あかいべべきたかわいいきんぎょ)",
      info: "童謡・唱歌",
      filename: "金魚の昼寝",
    },
    {
      title: "案山子(やまだのなかのいっぽんあしのかかし)",
      info: "童謡・唱歌",
      filename: "案山子",
    },
    {
      title: "つき(でたでたつきが)",
      info: "童謡・唱歌",
      filename: "つき",
    },
    {
      title: "月の沙漠(つきのさばくをはるばるとたびのらくだがゆきました)",
      info: "童謡・唱歌",
      filename: "月の沙漠",
    },
    {
      title: "あんたがたどこさ(ひごさひごどこさくまもとさ)",
      info: "童謡・唱歌",
      filename: "あんたがたどこさ",
    },
    {
      title: "山の音楽家(わたしゃおんがくかやまのこりす)",
      info: "童謡・唱歌",
      filename: "山の音楽家",
    },
    {
      title: "山のロザリア(やまのむすめろざりあいつもひとりうたうよ)",
      info: "童謡・唱歌",
      filename: "山のロザリア",
    },
    {
      title: "森の水車(みどりのもりのかなたから)",
      info: "童謡・唱歌",
      filename: "森の水車",
    },
    {
      title: "ローレライ(なじかはしらねどこころわびて Lorelei)",
      info: "童謡・唱歌",
      filename: "ローレライ",
    },
    {
      title: "椰子の実(やしのみ。なもしらぬとおきしまより)",
      info: "童謡・唱歌",
      filename: "椰子の実",
    },
    {
      title: "早春賦(はるはなのみのかぜのさむさやたにのうぐいすうたはおもえど)",
      info: "童謡・唱歌",
      filename: "早春賦",
    },
    {
      title: "かなりや(うたをわすれたかなりやは)",
      info: "童謡・唱歌",
      filename: "かなりや",
    },
    {
      title: "鎌倉(しちりがはまのいそづたい)",
      info: "童謡・唱歌",
      filename: "鎌倉",
    },
    {
      title: "くつがなる(おててつないでのみちをゆけば)",
      info: "童謡・唱歌",
      filename: "くつがなる",
    },
    {
      title: "TOMORROW(トゥモロー。なみだのかずだけつよくなれるよ)",
      info: "JPOP",
      filename: "tomorrow",
    },
    {
      title: "一週間(ロシア。にちようびにいちばにでかけ)",
      info: "ロシア",
      filename: "一週間",
    },
    {
      title: "かえるの合唱(かえるのうたがきこえてくるよ)",
      info: "童謡・唱歌",
      filename: "かえるの合唱",
    },
    {
      title: "アマリリス(みんなできこうたのしいオルゴールを)",
      info: "童謡・唱歌",
      filename: "アマリリス",
    },
    {
      title: "ステンカ・ラージン(くおんにとどろくゔぉるがのながれ)",
      info: "ロシア",
      filename: "ステンカ・ラージン",
    },
    {
      title: "さくら(さくらさくらやよいのそらはみわたすかぎり)",
      info: "童謡・唱歌",
      filename: "さくら",
    },
    {
      title:
        "待ちぼうけ(まちぼうけあるひせっせとのらかせぎそこへうさぎがとんででて)",
      info: "童謡・唱歌",
      filename: "待ちぼうけ",
    },
    {
      title: "夕焼け小焼け(ゆうやけこやけでひがくれてやまのおてらのかねがなる)",
      info: "童謡・唱歌",
      filename: "夕焼け小焼け",
    },
    {
      title:
        "宇宙戦艦ヤマト(さらばちきゅうよたびだつふねはうちゅうせんかんやまと)",
      info: "アニメ",
      filename: "宇宙戦艦ヤマト",
    },
    {
      title: "スキーの歌(かがやくひのかげはゆるのやま)",
      info: "童謡・唱歌",
      filename: "スキーの歌",
    },
    {
      title: "スキー(やまはしろがねあさひをあびて)",
      info: "童謡・唱歌",
      filename: "スキー",
    },
    {
      title: "げんこつやまのたぬきさん",
      info: "童謡・唱歌",
      filename: "げんこつやま",
    },
    {
      title: "山寺の和尚さん(やまでらのおしょうさんがまりはけりたしまりはなし)",
      info: "童謡・唱歌。服部良一",
      filename: "山寺の和尚さん",
    },
    {
      title: "雪(ゆきやこんこあられやこんこ)",
      info: "童謡・唱歌",
      filename: "雪",
    },
    {
      title: "あわてんぼうのサンタクロース(クリスマス)",
      info: "童謡・唱歌。クリスマス",
      filename: "あわてんぼうのサンタクロース",
    },
    {
      title: "四季の雨(ふるともみえじはるのあめ)",
      info: "童謡・唱歌。軍歌・戦時歌謡",
      filename: "四季の雨",
    },
    {
      title: "もろびとこぞりて(クリスマス)",
      info: "童謡・唱歌。クリスマス",
      filename: "もろびとこぞりて",
    },
    {
      title: "愛国行進曲(みよとうかいのそらあけて)",
      info: "軍歌・戦時歌謡",
      filename: "愛国行進曲",
    },
    {
      title: "長崎の女(こいのなみだかそてつのはながかぜにこぼれるいしだたみ)",
      info: "歌謡曲",
      filename: "長崎の女",
    },
    {
      title: "水師営の会見(りょじゅんかいじょうやくなりて)",
      info: "軍歌・戦時歌謡",
      filename: "水師営の会見",
    },
    {
      title: "出征兵士を送る歌(わがおおきみにめされたる)",
      info: "軍歌・戦時歌謡",
      filename: "出征兵士を送る歌",
    },
    {
      title:
        "亜麻色の髪の乙女(ヴィレッジ・シンガーズ。あまいろのながいかみをかぜが)",
      info: "ヴィレッジ・シンガーズ。歌謡曲。グループ・サウンズ",
      filename: "亜麻色の髪の乙女",
    },
    {
      title: "高校三年生(あかいゆうひがこうしゃをそめて)",
      info: "歌謡曲。舟木一夫",
      filename: "高校三年生",
    },
    {
      title: "星に願いを(ディズニー。ピノキオ。かがやくほしにこころのゆめを)",
      info: "ディズニー。洋楽",
      filename: "星に願いを",
    },
    {
      title: "樅の木(たんねんばうむ。もみのきもみのきおいやしげれる)",
      info: "童謡・唱歌",
      filename: "樅の木",
    },
    {
      title: "ズンドコ節(きしゃのまどからてをにぎりおくってくれたひとよりも)",
      info: "軍歌・戦時歌謡。海軍小唄",
      filename: "ズンドコ節",
    },
    {
      title: "さらばナポリ(Addio a Napoli わかれのときよいざいざさらば)",
      info: "洋楽 イタリア カンツォーネ",
      filename: "さらばナポリ",
    },
    {
      title: "東京行進曲(むかしこいしいぎんざのやなぎあだなとしまをだれがしろ)",
      info: "歌謡曲",
      filename: "東京行進曲",
    },
    {
      title: "アイルランドの子守歌(トゥラルーラルラー)",
      info: "洋楽 民謡",
      filename: "アイルランドの子守歌",
    },
    {
      title:
        "この木なんの木(日立。このきなんのききになるきなまえもしらないきですから)",
      info: "CMソング",
      filename: "この木なんの木",
    },
    {
      title: "ホエン・アイ・フォール・イン・ラブ(When I Fall in Love)",
      info: "洋楽 めぐり逢えたら 映画音楽 Celine Dion",
      filename: "whenifallinlove",
    },
    {
      title: "秋の夜半(ウェーバー。あきのよわのみそらすみて)",
      info: "クラシック 魔弾の射手 童謡・唱歌",
      filename: "秋の夜半",
    },
    {
      title: "ジョニーが凱旋するとき(When Johnny Comes Marching Home)",
      info: "洋楽 行進曲",
      filename: "ジョニーが凱旋するとき",
    },
    {
      title: "お富さん(いきなくろべいみこしのまつに)",
      info: "歌謡曲 邦楽",
      filename: "お富さん",
    },
    {
      title: "皆の衆(みなのしゅうみなのしゅううれしかったらはらからわらえ)",
      info: "演歌",
      filename: "皆の衆",
    },
    {
      title:
        "チャンチキおけさ(つきがわびしいろじうらのやたいのさけのほろにがさ)",
      info: "演歌 三波春夫",
      filename: "ちゃんちきおけさ",
    },
    {
      title: "Jupiter(ホルスト「惑星」よりジュピター「木星」)",
      info: "クラシック",
      filename: "木星",
    },
    {
      title: "恋は水色(ポール・モーリア)",
      info: "洋楽",
      filename: "恋は水色",
    },
    {
      title: "広瀬中佐(とどろくつつおととびくるだんがん)",
      info: "軍歌・戦時歌謡",
      filename: "広瀬中佐",
    },
    {
      title:
        "チム・チム・チェリー(ディズニー。メリー・ポピンズ。ちむちむにーちむちむにー)",
      info: "洋楽",
      filename: "チム・チム・チェリー",
    },
    {
      title:
        "花まつり(ぬるんだみずにはるのひはうかびこぶねははなたばをつんではしる)",
      info: "洋楽",
      filename: "花まつり",
    },
    {
      title:
        "秋桜(うすべにのこすもすがあきのひのなにげないひだまりにゆれている)",
      info: "歌謡曲",
      filename: "秋桜",
    },
    {
      title: "オーラ・リー(Aura Lee)",
      info: "洋楽",
      filename: "オーラ・リー",
    },
    {
      title: "イエスタデイ・ワンス・モア(カーペンターズ。Yesterday Once More)",
      info: "洋楽",
      filename: "イエスタデイ・ワンス・モア",
    },
    {
      title: "あの丘越えて(やまのまきばのゆうぐれにかりがとんでるただいちわ)",
      info: "歌謡曲 美空ひばり",
      filename: "あの丘越えて",
    },
    {
      title:
        "誰よりも君を愛す(だれにもいわれずたがいにちかったかりそめのこいなら)",
      info: "歌謡曲 松尾和子",
      filename: "誰よりも君を愛す",
    },
    {
      title: "春の唄(らららあかいはなたば)",
      info: "童謡・唱歌 歌謡曲",
      filename: "春の唄ラララ",
    },
    {
      title: "春の歌(メンデルスゾーン)",
      info: "クラシック",
      filename: "メンデルスゾーンの春の歌",
    },
    {
      title: "春の唄(さくらのはなのさくころはうららうららとひはうらら)",
      info: "童謡・唱歌 歌謡曲",
      filename: "春の唄さくら",
    },
    {
      title:
        "夢はひそかに(ディズニー「シンデレラ」より Dream Is a Wish Your Heart Makes)",
      info: "洋楽 Disney",
      filename: "夢はひそかに",
    },
    {
      title: "シューベルトの子守歌(ねむれねむらははのむねに)",
      info: "クラシック",
      filename: "シューベルトの子守歌",
    },
    {
      title: "シューベルトのアヴェ・マリア",
      info: "クラシック クリスマス アベマリア",
      filename: "シューベルトのアヴェ・マリア",
    },
    {
      title: "菩提樹(シューベルト。いずみにそいてしげるぼだいじゅ)",
      info: "クラシック",
      filename: "菩提樹",
    },
    {
      title: "シューベルトのセレナーデ(Schubert Serenade(Staendchen))",
      info: "クラシック",
      filename: "シューベルトのセレナーデ",
    },
    {
      title: "ます(シューベルト。きよきながれをひかりはえてますははしれり)",
      info: "クラシック",
      filename: "ます",
    },
    {
      title: "ストーミー・マンデー(Tボーン・ウォーカー ブルース)",
      info: "洋楽 T-Bone Walker Blues",
      filename: "ストーミー・マンデー",
    },
    {
      title: "シューベルトの野ばら(わらべはみたりのなかのばら)",
      info: "クラシック",
      filename: "シューベルトの野ばら",
    },
  ];

  const [musicData, setMusicData] = useState<MusicData[]>(initialData);
  const [music, setMusic] = useState<MusicData>({
    title: "",
    info: "",
    filename: "",
  });

  const [showList, setShowList] = useState(true);

  function shuffleList(list: MusicData[]) {
    return list
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
  }

  useEffect(() => {
    setMusicData(shuffleList(musicData));
  }, []);

  const handleShowMusic = (index: number) => {
    const selectedMusic = musicData[index];
    setMusic(selectedMusic);
    setShowList(false);
  };

  const linecolor = (index: number): string => {
    return index % 2 === 0 ? "lime" : "sky";
  };

  return (
    <div className="">
      {showList ? (
        <ul>
          {musicData.map((music, index) => (
            <p
              className="mx-auto w-[800px]"
              key={index}
              onClick={() => handleShowMusic(index)}
              style={{ background: linecolor(index), cursor: "pointer" }}
            >
              {music.title}
              <button style={{ float: "right" }}>Show Music</button>
            </p>
          ))}
        </ul>
      ) : (
        <div className="">
          <div className="flex flex-row justify-between">
            <div className="">{music.title}</div>
            <div className="">
              <audio
                src={`${BASE_PATH}/${music.filename}.mp3`}
                controls
              ></audio>
            </div>
          </div>
          <div>
            <Image
              src={`${BASE_PATH}/${music.filename}.svg`}
              alt="music sheet"
              width={4000}
              height={4000}
            />
          </div>
        </div>
      )}
    </div>
  );
}
