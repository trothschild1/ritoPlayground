import axios from "axios";
import { useEffect, useState } from "react";

export type ChampionStats = {
    id: string;
    image_splash: string;
    champion_id: string;
    hp: number;
    hpperlevel: number;
    mp: number;
    mpperlevel: number;
    movespeed: number;
    armor: number;
    armorperlevel: number;
    spellblock: number;
    spellblockperlevel: number;
    attackrange: number;
    hpregen: number;
    hpregenperlevel: number;
    mpregen: number;
    mpregenperlevel: number;
    crit: number;
    critperlevel: number;
    attackdamage: number;
    attackdamageperlevel: number;
    attackspeedperlevel: number;
    attackspeed: number;
};

export const useGetAllChampionStats = () => {
    const [data, setData] = useState<ChampionStats[]>([])

    useEffect(() => {
        const getStats = async () => {
            const response = await axios.get(
                `http://localhost:3001/get-all/stats`
            );
            setData(response.data);
            console.log(response.data.slice(0, 5));
        };
        getStats();
    }, []);

    return data;
}