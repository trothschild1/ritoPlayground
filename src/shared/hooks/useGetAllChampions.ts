import axios from "axios";
import { useEffect, useState } from "react";

export type Champion = {
    id: string,
    image_splash: string,
    name: string,
    tag: string,
    title: string
}

export const useGetAllChampions = () => {
    const [data, setData] = useState<Champion[]>([])

    useEffect(() => {
        const getChampions = async () => {
            const response = await axios.get(
                `http://localhost:3001/get-all/champions`
            );
            setData(response.data);
        };
        getChampions();
    }, []);
    // console.log("useGetAllChampions:", data.slice(0, 5));

    return data;
}