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
