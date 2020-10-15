import tileLukio from '../../public/img/banners/tile_ops_lukio.svg';
import tileEsiopetus from '../../public/img/banners/tile_ops_esiopetus.svg';
import tilePerusopetus from '../../public/img/banners/tile_ops_perusopetus.svg';
import tileTaiteenperusopetus from '../../public/img/banners/tile_ops_taiteenperusopetus.svg';
import tileVarhaiskasvatus from '../../public/img/banners/tile_ops_varhaiskasvatus.svg';
import bannerLukio from '../../public/img/banners/banner_lukio.svg';
import bannerEsiopetus from '../../public/img/banners/banner_esiopetus.svg';
import bannerPerusopetus from '../../public/img/banners/banner_perusopetus.svg';
import bannerTaiteenperusopetus from '../../public/img/banners/banner_taiteenperusopetus.svg';
import bannerVarhaiskasvatus from '../../public/img/banners/banner_varhaiskasvatus.svg';
import bannerVapaasivistystyo from '../../public/img/banners/banner_vapaasivistystyo.svg';
import bannerAmmatillinen from '../../public/img/banners/banner_ammatillinen.svg';
import { themes } from './perusteet';

const koulutustyyppiRyhmaTiles = {
  'lukio': tileLukio,
  'esiopetus': tileEsiopetus,
  'perusopetus': tilePerusopetus,
  'taiteenperusopetus': tileTaiteenperusopetus,
  'varhaiskasvatus': tileVarhaiskasvatus,
};

const koulutustyyppiRyhmaBanners = {
  'lukio': bannerLukio,
  'esiopetus': bannerEsiopetus,
  'perusopetus': bannerPerusopetus,
  'taiteenperusopetus': bannerTaiteenperusopetus,
  'varhaiskasvatus': bannerVarhaiskasvatus,
};

const toteutusBanners = {
  'ammatillinen': bannerAmmatillinen,
  'vapaasivistystyo': bannerVapaasivistystyo,
};

export function koulutustyyppiBanner(koulutustyyppi) {
  const themeType = themes[koulutustyyppi!] || 'lukio';
  const imgUrl = koulutustyyppiRyhmaBanners[themeType] || bannerLukio;
  return { 'background-image': `url('${imgUrl}')` };
}

export function koulutusTyyppiTile(koulutustyyppi) {
  const themeType = themes[koulutustyyppi!] || 'lukio';
  const imgUrl = koulutustyyppiRyhmaTiles[themeType] || tileLukio;
  return { 'background-image': `url('${imgUrl}')` };
}

export function toteutusBanner(toteutus) {
  const imgUrl = toteutusBanners[toteutus] || bannerAmmatillinen;
  return { 'background-image': `url('${imgUrl}')` };
}

export const tileColors = {
  'varhaiskasvatus': ['#FFD966', '#FFCC33'],
  'esiopetus': ['#A3DEFF', '#84D2FF'],
  'perusopetus': ['#8DD9D9', '#67CCCC'],
  'lukio': ['#4172E4', '#0143DA'],
  'taide': ['#FBD9EF', '#FACCEA'],
};

export function tileBackgroundColor(koulutustyyppi) {
  const themeType = themes[koulutustyyppi];
  const tileColor = tileColors[themeType] || tileColors['lukio'];
  return { 'background': 'linear-gradient(180deg, ' + tileColor[0] + ' 0%, ' + tileColor[1] + ' 100%)' };
}
