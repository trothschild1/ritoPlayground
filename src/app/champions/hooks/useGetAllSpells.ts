import axios from "axios";
import { useEffect, useState } from "react";

export type Spells = {
    champion: string,
    spell_id: string,
    spell_name: string,
    description: string,
    cooldown: string[],
    cost: string[],
    image_full: string
}

export const useGetAllSpells = (champion: string) => {
    const [data, setData] = useState<Spells[]>([])

    useEffect(() => {
        if (!champion) return;

        const getSpells = async () => {
            const response = await axios.get(
                `http://localhost:3001/get-all/spell-by-champion?champion=${champion}`
            );
            setData(response.data);
            console.log(response.data.slice(0, 5));
        };
        getSpells();
    }, [champion]);

    return data;
}