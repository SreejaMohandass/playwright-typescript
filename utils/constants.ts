export const BASE_URL = "https://opendata.aemet.es/opendata";

export const EMAIL_SUBJECT_FOR_API_KEY = 'Alta en el servicio AEMET OpenData';

export const IMAP_CONFIG = {
    user: process.env.EMAIL,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.PORT,
    tls: true,
    tlsOptions: { rejectUnauthorized: false } 
  };

export const RESPONSE_200_INPUT = {
    START_DATE: '2015-01-03T12:11:11UTC', 
    END_DATE: '2015-02-01T12:11:11UTC', 
    ESTACION: '89064'
};

export const RESPONSE_404_INPUT = {
    START_DATE: '2015-01-03T12:11:11UTC', 
    END_DATE: '2015-02-01T12:11:11UTC', 
    ESTACION: '89064RA'
};


