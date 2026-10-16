import Image from "next/image";

export default function HeroSection() {
  return (
    <header className="flex flex-col items-center">
      <h1 className="font-google-sans-flex text-5xl font-black">Xin chào</h1>

      <main className="flex flex-col justify-center items-center w-full mt-20 lg:flex-row lg:justify-self-center lg:items-end">
        <div className="lg:mr-15 lg:flex lg:flex-col lg:items-center">
          <Image
            src="/portrait/ta-portrait.jpg"
            alt="Hình đại diện"
            height="2850"
            width="2850"
            className="rounded-[100%] drop-shadow-2xl/30 w-75 h-auto"
            loading="eager"
          />
          <h2 className="mt-10 lg:min-w-82 flex justify-center items-end">
            <span className="font-google-sans-flex text-xl mr-3 font-semibold lg:text-2xl">
              Tớ là,
            </span>
            <span className="font-dela-gothic-one text-3xl bg-linear-to-r from-[#b429f9] to-[#26c5f3] bg-clip-text text-transparent lg:text-4xl">
              Bùi Thế Anh
            </span>
          </h2>
        </div>

        <div className="relative mt-27 lg:ml-15">
          <Image
            src="/stickers/chu-cho-ngheo-kho-xin-tien.png"
            width="1092"
            height="778"
            alt="Chú chó nghèo khổ xin tiền"
            className="absolute w-37.5 h-auto -top-20.5 left-12 drop-shadow-2xl/30 lg:left-27"
          />
          <p className="w-full justify-start text-justify font-nunito text-md bg-[#e3d5ca] p-7 mt-6 rounded-3xl drop-shadow-xl/20 lg:w-130 lg:text-xl">
            Xin chào đằng ấy, rất hân hạnh được gặp cậu. Mình là một lập trình
            viên trẻ vừa tốt nghiệp và đây là dự án đầu tay của mình. Uhm, mà
            sao cậu đến được đây nhỉ? Vì đây là trang web cá nhân của mình, đây
            là nơi mà mình chia sẻ các dự án đã thực hiện và những gì mình đang
            học hỏi. Nên mong cậu đừng soi sét quá nhiều, mình còn non lắm. 
            Nhưng mà nếu cậu muốn tìm hiểu về mình thì cứ tự nhiên nhé, mình sẽ
            không ngăn cản đâu.
          </p>
        </div>
      </main>
    </header>
  );
}
