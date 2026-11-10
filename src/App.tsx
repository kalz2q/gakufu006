import { useEffect, useState } from "react";

interface MusicData {
  title: string;
  info?: string;
  begin: string;
}

const shuffleArray = <T,>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const assetUrl = (fileName: string) =>
  `${import.meta.env.BASE_URL}${encodeURIComponent(fileName)}`;

export default function App() {
  const [musicData, setMusicData] = useState<MusicData[]>([]);
  const [currentMusic, setCurrentMusic] = useState<MusicData | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastSearchTerm, setLastSearchTerm] = useState("");

  useEffect(() => {
    document.title = "楽譜(音付き)";
    fetch(`${import.meta.env.BASE_URL}songs.json`)
      .then((response) => {
        if (!response.ok) throw new Error("songs.json の読み込みに失敗しました");
        return response.json() as Promise<MusicData[]>;
      })
      .then((data) => setMusicData(shuffleArray([...data])))
      .catch((error: unknown) => console.error(error));
  }, []);

  const handleMusicSelect = (music: MusicData) => {
    setIsLoading(true);
    setLastSearchTerm(searchTerm);
    setCurrentMusic(music);
    window.setTimeout(() => setIsLoading(false), 300);
  };

  const handleBackToList = () => {
    setCurrentMusic(null);
    setSearchTerm(lastSearchTerm);
  };

  const normalizedSearch = searchTerm.toLowerCase();
  const filteredMusic = musicData.filter(
    (music) =>
      music.title.toLowerCase().includes(normalizedSearch) ||
      (music.info ?? "").toLowerCase().includes(normalizedSearch) ||
      music.begin.toLowerCase().includes(normalizedSearch),
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {currentMusic ? (
        <div className="mx-auto max-w-6xl overflow-hidden rounded-xl bg-white p-6 shadow-md">
          <div className="mb-4 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <button
              onClick={handleBackToList}
              className="whitespace-nowrap rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
            >
              ← リストに戻る
            </button>
            <div className="w-full">
              <audio
                controls
                className="ml-auto w-full max-w-[800px]"
                src={assetUrl(`${currentMusic.title}.mp3`)}
              />
            </div>
          </div>

          {isLoading ? (
            <div className="flex h-64 items-center justify-center">
              <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-500" />
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h1 className="mb-2 text-2xl font-bold text-gray-800 md:text-3xl">
                  {currentMusic.title}
                </h1>
                {currentMusic.begin && (
                  <p className="mb-2 text-sm text-gray-600">({currentMusic.begin})</p>
                )}
                {currentMusic.info && <p className="text-gray-600">{currentMusic.info}</p>}
              </div>
              <div className="overflow-hidden rounded-lg border">
                <img
                  src={assetUrl(`${currentMusic.title}.svg`)}
                  alt={`${currentMusic.title} 楽譜`}
                  className="h-auto w-full"
                />
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 overflow-hidden rounded-xl bg-white p-6 shadow-md">
            <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
              無料楽譜サイト(音付き)
            </h1>
            <div className="mb-6">
              <input
                type="text"
                placeholder="曲名、歌い出し、ジャンルなどで検索..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="overflow-hidden rounded-lg border">
              <ul className="divide-y divide-gray-200">
                {filteredMusic.map((music, index) => (
                  <li
                    key={music.title}
                    onClick={() => handleMusicSelect(music)}
                    className={`cursor-pointer px-4 py-3 transition-colors hover:bg-gray-50 ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex min-w-0 flex-1 items-baseline gap-2 overflow-hidden whitespace-nowrap">
                        <span className="shrink-0 text-lg text-gray-800">{music.title}</span>
                        {music.begin && (
                          <span className="shrink-0 text-sm text-gray-600">({music.begin})</span>
                        )}
                        <span className="overflow-hidden text-ellipsis text-sm text-gray-500">
                          {music.info}
                        </span>
                      </div>
                      <span className="shrink-0 text-blue-500">▶</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            {filteredMusic.length === 0 && (
              <div className="py-8 text-center text-gray-500">
                該当する曲が見つかりませんでした
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
