import axios from "axios";
import { useEffect, useState } from "react";

export type Champion = {
    name: string,
    image_splash: string,
    title: string
}

export const useGetAllChampionStats = () => {
    const [data, setData] = useState<Champion[]>([])

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