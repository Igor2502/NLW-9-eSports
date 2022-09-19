import { FormEvent, useEffect, useState } from "react";
import { Check, GameController } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import axios from 'axios'

import { Input } from "./Form/Input";

interface Game {
  id: string;
  title: string;
}

export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false)

  useEffect(() => {
    axios("http://localhost:3333/games")
      .then(response => setGames(response.data));
  }, []);

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    if (!data.name) {
      return
    }

    try {
      await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel
      })

      alert('Anúncio criado com sucesso!')
    } catch (error) {
      alert('Erro ao criar o anúncio!')
      console.error(error);
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed">
        <Dialog.Content className="fixed bg-[#2A2634] py-4 sm:py-6 md:py-8 px-6 sm:px-8 md:px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[380px] sm:w-[420px] md:w-[480px] shadow-lg shadow-black/25">
          <Dialog.Title className="text-xl sm:text-2xl md:text-3xl font-black">
            Publique um anúncio
          </Dialog.Title>

          <form onSubmit={handleCreateAd} className="mt-4 sm:mt-6 md:mt-8 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="game" className="font-semibold text-sm sm:text-[15px] md:text-base">
                Qual o game?
              </label>
              <select
                name="game"
                id="game"
                className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none"
                defaultValue=""
              >
                <option disabled value="">Selecione o game que deseja jogar</option>
                { games.map(game => {
                  return <option key={game.id} value={game.id}>{game.title}</option>
                }) }
              </select>
            </div>

            <div className="flex flex-col gap-2 text-sm sm:text-[15px] md:text-base">
              <label htmlFor="name">Seu nome (ou nickname)</label>
              <Input
                name="name"
                id="name"
                type="text"
                placeholder="Como te chamam dentro do game?"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              <div className="flex flex-col gap-2 text-sm sm:text-[15px] md:text-base">
                <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
                <Input
                  name="yearsPlaying"
                  id="yearsPlaying"
                  type="number"
                  placeholder="Tudo bem ser ZERO"
                />
              </div>

              <div className="flex flex-col gap-2 text-sm sm:text-[15px] md:text-base">
                <label htmlFor="discord">Qual seu discord?</label>
                <Input name="discord" id="discord" type="text" placeholder="Usuário#0000" />
              </div>
            </div>

            <div className="flex gap-4 sm:gap-5 md:gap-6">
              <div className="flex- flex-col gap-2 text-sm sm:text-[15px] md:text-base">
                <label htmlFor="weekDays">Quando costuma jogar?</label>
                  <ToggleGroup.Root
                    type="multiple"
                    className="grid grid-cols-4 gap-1 mt-2"
                    value={weekDays}
                    onValueChange={setWeekDays}
                  >
                    <ToggleGroup.Item
                      value="0"
                      title="Domingo"
                      className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                    >
                      D
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value="1"
                      title="Segunda"
                      className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                    >
                      S
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value="2"
                      title="Terça"
                      className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                    >
                      T
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value="3"
                      title="Quarta"
                      className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                    >
                      Q
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value="4"
                      title="Quinta"
                      className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                    >
                      Q
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value="5"
                      title="Sexta"
                      className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                    >
                      S
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value="6"
                      title="Sábado"
                      className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                    >
                      S
                    </ToggleGroup.Item>
                  </ToggleGroup.Root>
              </div>

              <div className="flex flex-col gap-2 flex-1 text-sm sm:text-[15px] md:text-base">
                <label htmlFor="hourStart">Qual horário do dia?</label>
                <div className="grid grid-cols-2 gap-2">
                  <Input name="hourStart" id="hourStart" type="time" placeholder="De" />
                  <Input name="hourEnd" id="hourEnd" type="time" placeholder="Até" />
                </div>
              </div>
            </div>

            <label className="mt-2 flex items-center gap-2 text-sm">
              <Checkbox.Root
                className="w-6 h-6 p-1 rounded bg-zinc-900"
                checked={useVoiceChannel}
                onCheckedChange={(checked) => {
                  if (checked === true) {
                    setUseVoiceChannel(true)
                  } else {
                    setUseVoiceChannel(false)
                  }
                }}
              >
                <Checkbox.Indicator>
                  <Check className="w-4 h-4 text-emerald-400" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              Costumo me conectar ao chat de voz
            </label>

            <footer className="mt-2 sm:mt-3 md:mt-4 flex justify-end gap-4">
              <Dialog.Close
                type="button"
                className="bg-zinc-500 px-2 sm:px-3 md:px-5 h-9 sm:h-10 md:h-12 rounded-md text-sm sm:text-[15px] md:text-base font-semibold hover:bg-zinc-600"
              >
                Cancelar
              </Dialog.Close>
              <button
                type="submit"
                className="bg-violet-500 px-2 sm:px-3 md:px-5 h-9 sm:h-10 md:h-12 rounded-md font-semibold text-sm sm:text-[15px] md:text-base flex items-center gap-1 sm:gap-2 md:gap-3 hover:bg-violet-600"
              >
                <GameController className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6" />
                Encontrar duo
              </button>
            </footer>
          </form>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  );
}

