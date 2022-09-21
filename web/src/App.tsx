import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import axios from 'axios';

import { CreateAdModal } from "./components/CreateAdModal";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { GameBanner } from "./components/GameBanner";

import "./styles/main.css";
import logoImg from "./assets/logo-nlw-esports.svg";

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [page, setPage] = useState<number>(1);

  function handleNextPage() {
    const limit = Math.ceil(games.length / 6);
    if (page + 1 > limit) {
      setPage(1);
    } else {
      setPage(page + 1);
    }
  }

  function handlePreviousPage() {
    if (page - 1 < 1) {
      setPage(Math.ceil(games.length / 6));
    } else {
      setPage(page - 1);
    }
  }

  function paginate(page_size: number, page_number: number) {
    if (!games) {
      return [];
    }

    const retorno = games.slice((page_number - 1) * page_size, page_number * page_size);

    if (retorno.length < page_size) {
      const aux = page_size - retorno.length;
      for (let i = 0; i < aux; i++) {
        retorno.push(games[i]);
      }
    }

    return retorno;
  }

  useEffect(() => {
    axios("http://localhost:3333/games")
      .then(response => setGames(response.data));
   }, []);

  return (
    <div className="max-w-[400px] sm:max-w-[500px] md:max-w-[700px] lg:max-w-[960px] xl:max-w-[1140px] mx-auto flex flex-col items-center my-8 sm:my-9 md:my-10 lg:my-11 xl:my-12">
      <img src={logoImg} alt="Logo da NLW eSports" className="w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80" />
      <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white font-black mt-9 sm:mt-11 md:mt-12 lg:mt-14 xl:mt-16">
        Seu{" "}
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          duo
        </span>{" "}
        está aqui.
      </h1>

      <div className="flex flex-row items-stretch gap-2 mt-10 sm:mt-12 md:mt-14 lg:mt-16">
        <div
          className="w-14 fill-violet-700 hover:fill-violet-500 bg-arrow-gradient hover:bg-arrow-gradient-hover pt-8 sm:pt-10 md:pt-12 lg:pt-[70px] xl:pt-20"
          onClick={handlePreviousPage}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" >
            <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
          </svg>
        </div>

        <div className="grid grid-cols-6 gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6">
          { paginate(6, page) && paginate(6, page).length
            ? paginate(6, page).map((game) => {
              return (
                <GameBanner
                  key={game?.id}
                  bannerUrl={game?.bannerUrl}
                  title={game?.title}
                  adsCount={game?._count?.ads}
                />
              )
            })
            : null }
        </div>

        <div
          className="w-14 fill-violet-700 hover:fill-violet-500 bg-arrow-gradient hover:bg-arrow-gradient-hover pt-8 sm:pt-10 md:pt-12 lg:pt-[70px] xl:pt-20"
          onClick={handleNextPage}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" >
            <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
          </svg>
        </div>
      </div>

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}

export default App;
