const tabs = {
  clips: "Clips",
  events: "Evenements",
  pubs: "Pubs",
};

type imageModel = {
  url: string,
  width: number,
  height: number
}

export default function Home() {
  const imageWidth = 200;
  const imagesPerLine = 8;
  const baseUrl = `https://picsum.photos/${imageWidth}`

  const generateRandomImagesLine = () => {
    const images: imageModel[] = [];

    for (let i = 0; i < imagesPerLine; i++) {
      const randomHeight = Math.floor(Math.random() * (400 - imageWidth + 1) + imageWidth)
      const image = `${baseUrl}/${randomHeight}`;
      images.push({
        url: image,
        width: imageWidth,
        height: randomHeight
      });
    }

    return (
      <div className={"flex flex-col gap-4 "}>
        {images.map((image, key) =>
          <img key={key} src={image.url}
               width={image.width}
               height={image.height}
               alt={key.toString()}
               className={"rounded-md"}
          />
        )}
      </div>
    )
  }

  const displayTabs = () => {
    return (
      <div className={"flex flex-row justify-evenly"}>
        {Object.values(tabs).map((tab, key) =>
          <p key={key} className={"text-green-800 text-4xl cursor-pointer"}>
            {tab}
          </p>
        )}
      </div>
    )
  }

  return (
    <div className={"w-screen h-screen overflow-hidden flex flex-row justify-between relative"}>
      <div className={"flex flex-row gap-12"}>
        {generateRandomImagesLine()}
        {generateRandomImagesLine()}
      </div>

      <div className={"absolute top-1/2 left-1/2 translate-50"}>
        <h1 className={"text-red-800 text-8xl whitespace-nowrap"}>Talions Films</h1>
        {displayTabs()}
      </div>

      <div className={"flex flex-row gap-12"}>
        {generateRandomImagesLine()}
        {generateRandomImagesLine()}
      </div>
    </div>
  )
}
