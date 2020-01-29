export enum Kieli {
  fi = 'fi',
  sv = 'sv',
  se = 'se',
  ru = 'ru',
  en = 'en',
}

export interface SovellusVirhe {
  path?: string;
  err?: string;
  state?: object;
  info?: string;
}

export enum Koulutustyyppi {
  perustutkinto = 'koulutustyyppi_1',
  lukiokoulutus = 'koulutustyyppi_2',
  telma = 'koulutustyyppi_5',
  lisaopetus = 'koulutustyyppi_6',
  ammattitutkinto = 'koulutustyyppi_11',
  erikoisammattitutkinto = 'koulutustyyppi_12',
  aikuistenlukiokoulutus = 'koulutustyyppi_14',
  esiopetus = 'koulutustyyppi_15',
  perusopetus = 'koulutustyyppi_16',
  aikuistenperusopetus = 'koulutustyyppi_17',
  valma = 'koulutustyyppi_18',
  varhaiskasvatus = 'koulutustyyppi_20',
  perusopetusvalmistava = 'koulutustyyppi_22',
  lukiovalmistavakoulutus = 'koulutustyyppi_23',
  tpo = 'koulutustyyppi_999907'
}

export enum KoulutustyyppiToteutus {
  yksinkertainen = 'yksinkertainen',
  perusopetus = 'perusopetus',
  lops = 'lops',
  lops2019 = 'lops2019',
  tpo = 'taiteenperusopetus',

}
