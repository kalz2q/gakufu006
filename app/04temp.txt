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
      title: "埴生の宿",
      info: "唱歌 はにゅうのやどもわがやどたまのよそいうらやまじ",
      filename: "埴生の宿",
    },
    {
      title: "同期の桜",
      info: "軍歌・戦時歌謡 おまえとおれとはどうきのさくら",
      filename: "同期の桜",
    },
    {
      title: "ラジオ体操の歌",
      info: "作曲: 藤山一郎",
      filename: "ラジオ体操の歌",
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

  // useEffect(() => {
  //   setMusicData((prevMusicData) => ({
  //     ...prevMusicData,
  //     list: shuffleList(musicData),
  //   }));
  // }, []);

  const handleShowMusic = (index: number) => {
    const selectedMusic = musicData[index];
    setMusic(selectedMusic);
    setShowList(false);
  };

  const linecolor = (index: number): string => {
    return index % 2 === 0 ? "lime" : "sky";
  };

  console.log(musicData);

  return (
    <div className="">
      {showList ? (
        <ul>
          {initialData.map((music, index) => (
            <p
              className="mx-auto w-[800px]"
              key={index}
              onClick={() => handleShowMusic(index)}
              // style={{ background: linecolor(index), cursor: "pointer" }}
              style={{ background: linecolor(index), cursor: "pointer" }}
            >
              {music.title}
              <button style={{ float: "right" }}>Show Music</button>
            </p>
          ))}
        </ul>
      ) : (
        <div>
          <div className="">
            <audio src={`${BASE_PATH}/ラジオ体操の歌.mp3`} controls></audio>
          </div>

          <div>
            <Image
              src={`${BASE_PATH}/ラジオ体操の歌.svg`}
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
