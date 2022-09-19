import { MagnifyingGlassPlus } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";

export function CreateAdBanner() {
  return (
    <div className="pt-1 mt-8 bg-nlw-gradient self-stretch rounded-lg overflow-hidden">
      <div className="bg-[#2A2634] px-3 sm:px-4 md:px-6 lg:px-7 xl:px-8 py-2 sm:py-3 md:py-4 lg:py-5 xl:py-6 flex justify-between items-center">
        <div>
          <strong className="text-lg sm:text-xl md:text-2xl text-white font-black block">
            Não encontrou seu duo?
          </strong>
          <span className="text-xs sm:text-sm md:text-base xl:text-lg text-zinc-400 block">
            Publique um anúncio para encontrar novos players!
          </span>
        </div>

        <Dialog.Trigger>
          <button className="text-xs sm:text-sm md:text-base py-1 md:py-2 lg:py-3 px-1 sm:px-2 md:px-3 lg:px-4 bg-violet-500 hover:bg-violet-600 text-white rounded flex items-center gap-0 sm:gap-1 md:gap-2 lg-gap-3">
            <MagnifyingGlassPlus className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6" />
            Publicar anúncio
          </button>
        </Dialog.Trigger>
      </div>
    </div>
  );
}
