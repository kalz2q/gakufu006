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
        "嗚呼玉杯に花うけて(一高寮歌。ああぎょくはいにはなうけてりょくしゅにつきのかげやどし)",
      info: "一高寮歌 ああぎょくはいにはなうけてりょくしゅにつきのかげやどし 戦時歌謡",
      filename: "嗚呼玉杯に",
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
        <div>
          <div className="">{music.title}</div>
          <div className="">
            <audio src={`${BASE_PATH}/${music.filename}.mp3`} controls></audio>
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
