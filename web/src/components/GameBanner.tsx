interface GameBannerProps {
  bannerUrl: string;
  title: string;
  adsCount: number;
}

export function GameBanner(props: GameBannerProps) {
  return (
    <a href="" className="relative rounded-lg overflow-hidden">
      <img src={props.bannerUrl} alt={`Banner do game ${props.title}`} />
      <div className="w-full pt-0.5 sm:pt-3 md:pt-6 lg:pt-12 xl:pt-16 pb-0 sm:pb-0.5 md:pb-2 lg:pb-3 xl:pb-4 px-1 sm:px-2 md:px-3 lg:px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
        <strong className="text-xs sm:text-sm md:text-md lg:text-lg font-bold text-white block">
          {props.title}
        </strong>
        <span className="text-zinc-300 text-[8px] sm:text-[9px] md:text-[11px] lg:text-sm block">{props.adsCount} anúncio(s)</span>
      </div>
    </a>
  );
}
