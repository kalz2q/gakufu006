import Image from "next/image";

import nextConfig from "../next.config.mjs";
const BASE_PATH = nextConfig.basePath || "";

export default function Home() {
  return (
    <main>
      <div className="">
        <audio src={`${BASE_PATH}/ラジオ体操の歌.mp3`} controls></audio>
      </div>

      <div>
        <Image
          src={`${BASE_PATH}/ラジオ体操の歌.svg`}
          alt="Next.js Logo"
          width={4000}
          height={4000}
        />
      </div>
    </main>
  );
}
