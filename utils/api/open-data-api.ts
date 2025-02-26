import { HTTPConnector } from "./connection";

export const getAntartida = async(
    startDate: string,
    endDate: string,
    estacion: string
): Promise<{ data: any }> => {
    const response = await HTTPConnector.get(`/api/antartida/datos/fechaini/${startDate}/fechafin/${endDate}/estacion/${estacion}`);
    return response.data;
};