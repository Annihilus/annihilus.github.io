import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

export interface settingsParams {
  minGP: number,
  decay: number,
  weekEP: number,
}

export interface playerData {
  placement: number;
  name: string;
  description: string;
  ep: number;
  gp: number;
  pr: number;
}

const ELEMENT_DATA: any[] = [
  {placement: 3, name: 'Солист', description: 'Солит на пухи', ep: 500, gp: 10, pr: 50},
  {placement: 1, name: 'Новичок', description: '', ep: 0, gp: 10, pr: 15},
  {placement: 2, name: 'Ветеран', description: '', ep: 500, gp: 100, pr: 5},
  {placement: 4, name: 'Пылесос', description: '', ep: 500, gp: 225, pr: 2},
];

@Injectable()
export class epgpService {


  public set settings(params: settingsParams) {
    this._settings = params;
  }

  public get settings(): settingsParams {
    return this._settings;
  }

  private _settings: settingsParams = {
    minGP: 10,
    decay: 10,
    weekEP: 150,
  };

  public players: BehaviorSubject<any> = new BehaviorSubject<any>(ELEMENT_DATA);

  public data: BehaviorSubject<any> = new BehaviorSubject<any>([ELEMENT_DATA]);

  public decay() {
    const data = this.data.getValue();
    const updatedPlayers = [];
    const lastWeek = data[data.length - 1];

    for (const player of lastWeek) {
      const updatedPlayer = this.decayPlayer({...player});

      updatedPlayers.push(updatedPlayer);
    }

    const sortedPlayers = this.sortByPr(updatedPlayers);

    this.data.next([...this.data.getValue(), sortedPlayers]);
  }

  public addPlayer(data: playerData, index: number) {
    const player = data;

    player.placement = 100;
    player.gp = this._settings.minGP;
    player.pr = this.calcPR(player.ep, player.gp);

    this.players.next([...this.players.getValue(), player]);

    const updatedData = [];

    for (const [i, array] of this.data.getValue().entries()) {
      if (i >= index) {
        const updatedPlayer = this.decayPlayer({...player}, i);
        let result = [...array, updatedPlayer];


        if (i === 0) {
          result = this.sortByPr(result);
        }

        updatedData.push(result);

        continue;
      }

      updatedData.push([...array]);
    }

    this.data.next(updatedData);
  }

  public editPlayer(oldName: string, index: number, data: any) {
    const players = this.data.getValue()[index]
      .filter((x : any) => x.name !== oldName);

    if (!data) {
      return;
    }

    data.pr = this.calcPR(data.ep, data.gp);

    const currentWeekUpdated = [...players, data];
    const updatedData = [];

    for (const [i, array] of this.data.getValue().entries()) {
      if (i === index) {
        updatedData.push(currentWeekUpdated);

        continue;
      }

      if (i > index) {
        const filtered = array
          .filter((x : any) => x.name !== oldName);
        const modifier = i - index;
        const updatedPlayer = this.decayPlayer({...data}, modifier);
        let result = [...filtered, updatedPlayer];

        if (i === 0) {
          result = this.sortByPr(result);
        }

        updatedData.push(result);

        continue;
      }

      updatedData.push([...array]);
    }

    this.data.next(updatedData);
  }

  public decayPlayer(player: playerData, multiplier: number = 1) {
    if (multiplier === 0) {
      return player;
    }

    player.ep = Number((player.ep - (player.ep / 100 * (this._settings.decay * multiplier))).toFixed(2));
    const gp = Number((player.gp - (player.gp / 100 * (this._settings.decay * multiplier))).toFixed(2));

    player.gp = Number(gp) < this._settings.minGP ? this._settings.minGP : gp;
    player.pr = this.calcPR(player.ep, player.gp);

    return player;
  }

  public calcPR(ep: number, gp: number): number {
    return Number((ep / gp).toFixed(2));
  }

  public sortByPr(players: playerData[]): playerData[] {
    return players.sort((a: any, b: any) => b.pr - a.pr);
  }

}