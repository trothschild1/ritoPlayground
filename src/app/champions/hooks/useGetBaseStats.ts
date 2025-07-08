import axios from "axios";
import { useEffect, useState } from "react";

export type Stats = {
    champion: string;
    hp: string;
    mp: string;
    movespeed: string;
    armor: string;
    spellblock: string;
    hpregen: string;
    attackdamage: string;
    attackspeed: string;
}


export const useGetBaseStats = (champion: string) => {
    const [data, setData] = useState<Stats>()

    useEffect(() => {
        if (!champion) return;

        const getStats = async () => {
            const response = await axios.get(
                `http://localhost:3001/get-all/stats-by-champion?champion=${champion}`
            );
            setData(response.data);
        };
        getStats();
    }, [champion]);

    return data;
}