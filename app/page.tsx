"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { songs } from "./songs";

interface MusicData {
  title: string;
  info: string;
  begin: string;
}

export default function MusicSheetApp() {
  const [musicData, setMusicData] = useState<MusicData[]>([]);
  const [currentMusic, setCurrentMusic] = useState<MusicData | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastSearchTerm, setLastSearchTerm] = useState("");

  useEffect(() => {
    document.title = "楽譜(音付き)";
    setMusicData(shuffleArray([...songs]));
  }, []);

  // 曲をシャッフル
  const shuffleArray = (array: MusicData[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // 曲を選択
  const handleMusicSelect = (music: MusicData) => {
    setIsLoading(true);
    setLastSearchTerm(searchTerm);
    setCurrentMusic(music);
    setTimeout(() => setIsLoading(false), 300);
  };

  // リストに戻る
  const handleBackToList = () => {
    setCurrentMusic(null);
    setSearchTerm(lastSearchTerm);
  };

  // 検索
  const filteredMusic = musicData.filter(
    (music) =>
      music.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      music.info.toLowerCase().includes(searchTerm.toLowerCase()) ||
      music.begin.toLowerCase().includes(searchTerm.toLowerCase()),
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
                src={`/${currentMusic.title}.mp3`}
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

                {currentMusic.begin && (
                  <p className="text-sm text-gray-600 mb-2">
                    ({currentMusic.begin})
                  </p>
                )}

                {currentMusic.info && (
                  <p className="text-gray-600">{currentMusic.info}</p>
                )}
              </div>

              <div className="border rounded-lg overflow-hidden">
                <Image
                  src={`/${currentMusic.title}.svg`}
                  alt={`${currentMusic.title} 楽譜`}
                  width={1200}
                  height={600}
                  style={{ width: "100%", height: "auto" }}
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
                    key={music.title}
                    onClick={() => handleMusicSelect(music)}
                    className={`px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-baseline gap-2 min-w-0 flex-1 overflow-hidden whitespace-nowrap">
                        <span className="text-lg text-gray-800 shrink-0">
                          {music.title}
                        </span>

                        {music.begin && (
                          <span className="text-sm text-gray-600 shrink-0">
                            ({music.begin})
                          </span>
                        )}

                        <span className="text-sm text-gray-500 overflow-hidden text-ellipsis">
                          {music.info}
                        </span>
                      </div>

                      <span className="text-blue-500 shrink-0">▶</span>
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
