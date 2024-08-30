function App() {
  interface MusicData {
    jpgUrl: string;
    mp3Url: string;
    title: string;
    filename: string;
  }

  interface Model {
    jpgUrl: string;
    mp3Url: string;
    title: string;
    filename: string;
    dolist: boolean;
    list: MusicData[];
  }

  const initialData: MusicData[] = [
    {
      jpgUrl: "https://lh3.google.com/u/0/d/1dvVCvdFKKJlVmU3WqRgMkg0YsugL3qKR",
      mp3Url:
        "https://drive.google.com/file/d/1877DcOpz7rhRQ7XhpV7I34MQf018IDYt",
      title: "水戸黄門(じんせいらくありゃくもあるさ)",
      filename: "mitokomon.ly",
    },

    {
      jpgUrl: "https://lh3.google.com/u/0/d/1uCHqo0azmYAlA_uXPSbIDqONPcCCsktO",
      mp3Url:
        "https://drive.google.com/file/d/1uz6hK-iGgWwpW3o09bLO9ZRg8AQ3NVxC",
      title: "スーダラ節(植木等、ちょいといっぱいのつもりでのんで)",
      filename: "sudarabushi.ly",
    },
    {
      jpgUrl: "https://lh3.google.com/u/0/d/1Z2Qxq8UoHBDMv6wXuRmNMJWwryg2EN0z",
      mp3Url:
        "https://drive.google.com/file/d/1Mz6hlYoD-PUHQRuGVl1DDm3128sIIIKV",
      title:
        "ママがサンタにキスをした(クリスマス。I Saw Mommy Kissing Santa Claus)",
      filename: "mommykisssanta.ly",
    },
  ];

  const [model, setModel] = useState<Model>({
    jpgUrl: "",
    mp3Url: "",
    title: "",
    filename: "",
    dolist: true,
    list: initialData,
  });

  const shuffleList = (list: MusicData[]): MusicData[] => {
    return list
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
  };

  useEffect(() => {
    setModel((prevModel) => ({
      ...prevModel,
      list: shuffleList(initialData),
    }));
  }, []);

  const handleShowMusic = (index: number) => {
    const selectedMusic = model.list[index];
    setModel({
      ...model,
      jpgUrl: selectedMusic.jpgUrl,
      mp3Url: selectedMusic.mp3Url,
      title: selectedMusic.title,
      filename: selectedMusic.filename,
      dolist: false,
    });
  };

  const linecolor = (index: number): string => {
    return index % 2 === 0 ? "pink" : "yellow";
  };

  return (
    <div>
      {model.dolist ? (
        model.list.map((music, index) => (
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
        ))
      ) : (
        <div>
          <div className="flex flex-row justify-between">
            <p>{model.title}</p>
            <iframe
              className="w-96 h-16"
              src={model.mp3Url + "/preview"}
              // src="https://drive.google.com/file/d/11UBsVhZHAFJZp0TXFAFin46CKQ8hrgL8Q/preview"
            ></iframe>
          </div>
          <div style={{ margin: "auto" }}>
            <img
              src={model.jpgUrl}
              style={{ width: "100%" }}
              alt={model.title}
            />
          </div>
        </div>
      )}
    </div>
  );
}
