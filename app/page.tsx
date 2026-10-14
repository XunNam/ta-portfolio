import Image from "next/image";

export default function Home() {
  return (
    // Hero Section
    <section>
      <header className="w-screen bg-(--background) text-(--foreground) pt-32 px-5 flex flex-col items-center">
        <h1 className="font-google-sans-flex text-5xl font-black">Xin chào</h1>

        <main className="flex flex-col justify-center items-center w-full mt-20 px-10 lg:flex-row lg:justify-self-center lg:items-end">
          <div className="lg:mr-15 lg:flex lg:flex-col lg:items-center">
            <Image
              src="/portrait/ta-portrait.jpg"
              alt="Hình đại diện"
              height="300"
              width="300"
              className="rounded-[100%] drop-shadow-2xl/30"
            />
            <h2 className="mt-10 lg:min-w-82">
              <span className="font-google-sans-flex text-xl mr-3 font-semibold lg:text-2xl">
                Tớ là,
              </span>
              <span className="font-dela-gothic-one text-3xl bg-linear-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent lg:text-4xl">
                Bùi Thế Anh
              </span>
            </h2>
          </div>

          <div className="relative mt-27 lg:ml-15">
            <Image
              src="/stickers/chu-cho-ngheo-kho-xin-tien.png"
              width="150"
              height="150"
              alt="Chú chó nghèo khổ xin tiền"
              className="absolute -top-21 left-12 drop-shadow-2xl/30 lg:left-27"
            />
            <p className="w-full justify-start text-justify font-google-sans-flex text-md bg-[#e3d5ca] p-7 mt-6 rounded-3xl drop-shadow-xl/20 lg:w-130 lg:text-xl">
              Xin chào đằng ấy, rất hân hạnh được gặp cậu. Mình là một lập trình
              viên trẻ vừa tốt nghiệp và đây là dự án đầu tay của mình. Uhm, mà
              sao cậu đến được đây nhỉ? Vì đây là trang web cá nhân của mình,
              đây là nơi mà mình chia sẻ các dự án đã thực hiện và những gì mình
              đang học hỏi. Nên mong cậu đừng soi sét quá nhiều, mình còn non
              lắm. Nhưng mà nếu cậu muốn tìm hiểu về mình thì cứ tự nhiên nhé,
              mình sẽ không ngăn cản đâu.
            </p>
          </div>
        </main>
      </header>
    </section>
  );
}
