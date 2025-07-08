import axios from "axios";
import { useEffect, useState } from "react";

type Skins = {
    champion_id: string,
    name: string,
    full_splash: string
}

export const useGetAllSkins = (championId: string) => {
    const [data, setData] = useState<Skins[]>([])

    useEffect(() => {
        const getSkins = async () => {
            const response = await axios.get(
                `http://localhost:3001/get-all/skin-by-champion?championId=${championId}`
            );
            setData(response.data);
            console.log(response.data.slice(0, 5));
        };
        getSkins();
    }, []);

    return data;
}