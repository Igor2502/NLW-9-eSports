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

  useEffect(() => {
    axios("http://localhost:3333/games")
      .then(response => setGames(response.data));
   }, []);

  return (
    <div className="max-w-[400px] sm:max-w-[500px] md:max-w-[700px] lg:max-w-[960px] xl:max-w-[1140px] mx-auto flex flex-col items-center my-8 sm:my-9 md:my-10 lg:my-11 xl:my-12">
      <img src={logoImg} className="w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80" />
      <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white font-black mt-9 sm:mt-11 md:mt-12 lg:mt-14 xl:mt-16">
        Seu{" "}
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          duo
        </span>{" "}
        está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6 mt-10 sm:mt-12 md:mt-14 lg:mt-16">
        {games.map((game) => {
          return (
            <GameBanner
              key={game.id}
              bannerUrl={game.bannerUrl}
              title={game.title}
              adsCount={game._count.ads}
            />
          );
        })}
      </div>

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}

export default App;
