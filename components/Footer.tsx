import Image from "next/image";

export default function Footer() {
  return (
    <div className="h-60 w-screen bg-[#6b705c] flex items-center justify-evenly p-15 whitespace-pre-wrap">
      <h1 className="text-[#ffe8d6] font-dela-gothic-one text-3xl">
        HẾT ÙI :(((
      </h1>
      <div>
        <p className="font-dela-gothic-one test-xl">Hiện tại tớ đang nghe gì trên Spotify?</p>
        <div className="mt-4 shadow-lg">
          <a href="https://spotifystats.com/badge/c15237fc5206d23f570839d492859976a55763bb/open">
            <Image
              src="https://spotifystats.com/badge/c15237fc5206d23f570839d492859976a55763bb.svg"
              alt="Now playing on Spotify"
              width={480}
              height={104}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </a>
        </div>
      </div>
    </div>
  );
}
