import SpotifyBadge from "@/components/SpotifyBadge";

export default function Footer() {
  return (
    <div className="h-90 w-full bg-[#6b705c] flex flex-col items-center justify-around px-4 py-15 pb-20 whitespace-pre-wrap lg:flex-row lg:justify-evenly lg:items-center">
      <h1 className="text-[#ffe8d6] font-dela-gothic-one text-3xl my-5">
        HẾT ÙI :(((
      </h1>
      <div className="flex flex-col justify-center items-center">
        <div className="font-dela-gothic-one text-md lg:text-xl bg-linear-to-r from-green-300 via-40% via-yellow-400 to-110% to-green-200 text-shadow-lg bg-clip-text text-transparent my-5     flex flex-col justify-center items-center">
          <p>Hiện tại tớ đang nghe gì trên Spotify?</p>
          <div className="mt-4 shadow-lg lg:mt-5">
            <a href="https://spotifystats.com/badge/c15237fc5206d23f570839d492859976a55763bb/open">
              <SpotifyBadge />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
