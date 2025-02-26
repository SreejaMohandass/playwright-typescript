import test, {expect} from "@playwright/test";
import axios from "axios";
import { getAntartida, HTTPConnector } from "~/utils";
import { BASE_URL, RESPONSE_200_INPUT, RESPONSE_404_INPUT } from '~/utils';
import MockAdapter from "axios-mock-adapter";


test.describe("Test Opendata API", () => {
    
    test("Test for response code 200", async () => {
        const response = await getAntartida(RESPONSE_200_INPUT.START_DATE, RESPONSE_200_INPUT.END_DATE, RESPONSE_200_INPUT.ESTACION);
        expect(response["estado"]).toBe(200);
        expect(response["datos"]).toContain("https://opendata.aemet.es/opendata/sh");
        expect(response["descripcion"]).toBe("exito");
         
    });
  
    test("Test for response code 404", async () => {
        const response = await getAntartida(RESPONSE_404_INPUT.START_DATE, RESPONSE_404_INPUT.END_DATE, RESPONSE_404_INPUT.ESTACION);
        expect(response["estado"]).toBe(404);
        expect(response["descripcion"]).toBe("No hay datos que satisfagan esos criterios");
         
    });

    test("Test for response code 401", async () => {
        const response = await axios.get(`${BASE_URL}/api/antartida/datos/fechaini/${RESPONSE_200_INPUT.START_DATE}/fechafin/${RESPONSE_200_INPUT.END_DATE}/estacion/${RESPONSE_200_INPUT.ESTACION}`);
        expect(response.data).toBeFalsy();         
    });

    test("Test for response code 429 (Mocked)", async () => {
        const mock = new MockAdapter(HTTPConnector);

        const mockedURL = `/api/antartida/datos/fechaini/${RESPONSE_200_INPUT.START_DATE}/fechafin/${RESPONSE_200_INPUT.END_DATE}/estacion/${RESPONSE_200_INPUT.ESTACION}`;
        
        mock.onGet(mockedURL).reply(429, {
            estado: 429,
            descripcion: "Too Many Requests"
        });

        try {
            const response = await getAntartida(RESPONSE_200_INPUT.START_DATE, RESPONSE_200_INPUT.END_DATE, RESPONSE_200_INPUT.ESTACION);
            expect(response["estado"]).toBe(429);
            expect(response["descripcion"]).toBe("Too Many Requests");
        } catch (error) {
            expect(error.response.status).toBe(429);
        }
        
        mock.restore();
    });
})