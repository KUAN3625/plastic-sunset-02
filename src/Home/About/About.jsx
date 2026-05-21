import { useState } from "react"
import SideMenu from "../../components/ui/Settings_UI/Side"
import { useSFXStore } from "../../components/stoer/useSFXStore"

const About = () => {
  const play = useSFXStore((s) => s.play)
  const [current, setCurrent] = useState("A")

  const contents = {
    A: {
      title: "About",
      text1: "「Plastic Sunset」是一個融合 Y2K 與 Lo-Fi 美學的數位空間。",
      text2:
       `在資訊高速流通的現代`,
      text3:` 我們希望提供一個能夠讓使用者專注的空間`,
      text4:` 結合番茄鐘、待辦清單與音樂播放器`,
      text4:`讓使用者能在沉浸氛圍中完成每一段專注時光`,

    },
    B: {
      title: "Establish",
      text1: "2026學生專題",
      text2:
      `指導老師:呂瑩蓉`,
      text3:
      `網頁製作:官振群`,
      text4: `--- `,
      text5: `特別感謝：`,
      text6: `Holizna`,
    },
C: {
  title: "Replenish",
  text1: "補充資訊：",
  text2: (
    <>
      Git Hub：
      <a
        href="https://github.com/KUAN3625/Y2K-LO-FI"
        target="_blank"
        rel="noopener noreferrer"
        className="underline"
      >
        Link
      </a>
    </>
  ),
  text3: (
    <>
      音樂來源：
      <a
        href="https://freemusicarchive.org/music/holiznacc0/"
        target="_blank"
        rel="noopener noreferrer"
        className="underline"
      >
        HoliznaCC0
      </a>
    </>
  ),
}
  }

  const data = contents[current]

  return (
    <div className="relative w-full min-h-screen   text-black overflow-hidden">

      {/* 左上固定選單 */}
      <div className="absolute top-4 left-4 pointer-events-auto z-50">
        <SideMenu />
      </div>

      {/* ------- 中螢幕（筆電 md，左右並排，不使用 absolute） ------- */}
<div className="hidden md:flex lg:hidden w-full px-20 mt-4 justify-between items-start">
  
  {/* 左邊按鈕列（小一點） */}
  <div className="px-20">

  <div className="flex items-center gap-4 bg-white/60 border-2 border-black rounded-full px-3 py-3 shadow-[3px_3px_0_#000]">
    {["A", "B", "C"].map((label) => (
      <button
        key={label}
        onClick={() => {
          play("click")
          setCurrent(label)
        }}
        className={`
          w-9 h-9 rounded-full border-[2px] border-black bg-gray-300
          transition-transform text-sm
          ${
            current === label
              ? "bg-gray-100 scale-105"
              : "hover:scale-110"
            }
            `}
            >
        {label}
      </button>
    ))}
  </div>
    </div>

  {/* 中螢幕 About 內容 */}
  <div className="w-[50%] bg-white/85 border-2 font-mono border-black shadow-[3px_3px_0_#000] p-6">
    <div className="border-b-2 border-black pb-3 mb-4">
      <h2 className="text-[32px] font-bold">{data.title}</h2>
    </div>

    <div className="bg-[#e4e4e4]/90 border border-black p-4 text-[15px] leading-[1.8] shadow-[2px_2px_0_#000]">
      <p className="mb-3">{data.text1}</p>
      <p>{data.text2}</p>
      <p>{data.text3}</p>
      <p>{data.text4}</p>
      <p>{data.text5}</p>
      <p>{data.text6}</p>
    </div>
  </div>

</div>


      {/* ------- 小螢幕版（直排，不使用 absolute） ------- */}
  <div className="flex flex-col items-center gap-6 px-6 mt-20 md:hidden">

        {/* 按鈕列 */}
        <div
    className="
    flex items-center justify-center gap-3
    bg-white/90 border-[2px] border-black rounded-full
    px-6 py-2 shadow-[3px_3px_0_#000]
    "
    >
    {["A", "B", "C"].map((label) => (
      <button
      key={label}
      onClick={() => {
        play("click")
        setCurrent(label)
      }}
      className={`
        w-8 h-8 rounded-full border-[2px] border-black bg-gray-300
        text-sm
        transition-transform
        ${
          current === label
          ? "bg-gray-100 scale-105"
          : "hover:scale-110"
        }
        `}
        >
        {label}
      </button>
    ))}
  </div>

        {/* About 內容區 */}
         <div className="
    w-full max-w-[500px] font-mono
    bg-white/85 backdrop-blur-sm border-[2px] border-black 
    shadow-[3px_3px_0_#000] 
    p-6
    ">
    <div className="border-b-[2px] border-black pb-2 mb-4">
      <h2 className="text-[32px] font-bold">{data.title}</h2>
    </div>

    <div
      className="
      bg-[#e4e4e4]/90 border border-black p-4
      text-[15px] leading-[1.8]
      shadow-[2px_2px_0_#000]
      "
      >


      <p className="mb-3">{data.text1}</p>
      <p>{data.text2}</p>
      <p>{data.text3}</p>
      <p>{data.text4}</p>
      <p>{data.text5}</p>
      <p>{data.text6}</p>
    </div>
  </div>
</div>


{/* ------- 大螢幕版（使用 absolute） ------- */}
<div className="hidden lg:block">


        {/* 左側按鈕 */}
        <div
          className="
          absolute
          left-[20%]
          top-[8%]
          -translate-y-1/2
          z-20
          "
          >
          <div
            className="
            flex items-center justify-center gap-5
            bg-white/90 border-[2px] border-black rounded-full
            px-10 py-4 shadow-[3px_3px_0_#000]
            "
            >
            {["A", "B", "C"].map((label) => (
              <button
              key={label}
              onClick={() => {
                play("click")
                setCurrent(label)
              }}
              className={`
                w-10 h-10 rounded-full border-[2px] border-black bg-gray-300
                transition-transform
                ${
                  current === label
                  ? "bg-gray-100 scale-105"
                  : "hover:scale-110"
                }
                `}
                >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* 右側 About 內容 */}
        <div
          className="
          absolute 
          left-[58%]
          top-[36%]
          -translate-y-1/2
          w-[40vw]
          max-w-[520px]
          h-[65vh]
          bg-white/85 backdrop-blur-sm
          border-[2px] border-black 
          shadow-[3px_3px_0_#000]
          p-6
          overflow-hidden font-mono
          "
          >
          <div className="border-b-[2px] border-black pb-3 mb-4">
            <h2 className="text-[38px] md:text-[42px] font-bold">{data.title}</h2>
          </div>

          <div
            className="
            bg-[#e4e4e4]/90 border border-black p-4 md:p-6
            text-[16px] leading-[1.7]
            shadow-[2px_2px_0_#000]
            h-full overflow-y-auto font-bold
            "
            >
            <p className="mb-4">{data.text1}</p>
            <p>{data.text2}</p>
            <p>{data.text3}</p>
            <p>{data.text4}</p>
            <p>{data.text5}</p>
            <p>{data.text6}</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default About
