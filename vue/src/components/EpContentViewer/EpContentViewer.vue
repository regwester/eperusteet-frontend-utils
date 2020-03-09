<template>
<div v-if="valueFormatted">
  <div class="teksti" v-html="valueFormatted" />
  <div v-for="(viite, idx) in termitWrapped"
       :key="idx">
    <b-popover v-if="viite && viite.el && viite.termi"
               :target="viite.el"
               triggers="click blur"
               placement="bottom">
      <template v-slot:title v-if="viite.termi.selitys">{{ $kaanna(viite.termi.termi) }}</template>
      <div v-if="!viite.termi.selitys">{{ $kaanna(viite.termi.termi) }}</div>
      <div v-if="viite.termi.selitys" v-html="$kaanna(viite.termi.selitys)"></div>
      <!-- Ei toimi production buildissa -->
      <!--<ep-content-viewer v-if="viite.termi.selitys"
                         :value="$kaanna(viite.termi.selitys)"
                         :termit="termit"
                         :kuvat="kuvat" />-->
    </b-popover>
  </div>
</div>
</template>

<script lang="ts">
import _ from 'lodash';
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { LiiteDtoWrapper } from '../../tyypit';
import { TermiDto } from '../../api/ylops';
import { Kielet } from '../../stores/kieli';

@Component
export default class EpContentViewer extends Vue {
  @Prop({ required: false, type: String })
  private value!: string; // Käännetty versio

  @Prop({ required: false, type: Array })
  private termit!: TermiDto[];

  @Prop({ required: false, type: Array })
  private kuvat!: LiiteDtoWrapper[];

  private termiElements: Element[] = [];

  get valueFormatted() {
    if (this.value) {
      const template = document.createElement('template');
      template.innerHTML = this.value;

      // Taulukot
      const tables = template.content.querySelectorAll('table');
      _.each(tables, table => {
        table.setAttribute('class', 'table table-bordered');
      });

      // Kuvat
      const images = template.content.querySelectorAll('img');
      _.each(images, img => {
        // Kääritään figureen
        const wrapper = document.createElement('figure');
        if (img.parentNode) {
          img.parentNode.insertBefore(wrapper, img);
          wrapper.appendChild(img);
        }

        const datauid = img.getAttribute('data-uid');
        if (datauid) {
          const kuva = _.find(this.kuvat, { id: datauid }) as LiiteDtoWrapper;

          if (kuva) {
            img.setAttribute('src', kuva.src);
            /* TODO: Nimeksi asetetaan perusteissa tiedostonnimi eikä kuvatekstiä. Piilotetaan toistaiseksi.
            if (kuva.kuva.nimi) {
              img.setAttribute('alt', kuva.kuva.nimi);

              const figcaption = document.createElement('figcaption');
              figcaption.textContent = kuva.kuva.nimi;
              wrapper.append(figcaption);
            }
            */
          }
        }
      });

      return template.innerHTML;
    }
  }

  get termitWrapped() {
    return _.map(this.termiElements, el => {
      const dataviite = el.getAttribute('data-viite');
      if (dataviite) {
        const termi: any = _.find(this.termit, { 'avain': dataviite } );
        if (termi) {
          el.setAttribute('tabindex', '0');
          el.setAttribute('role', 'button');
          el.setAttribute('title', Kielet.kaanna(termi.termi));
          return {
            el,
            termi,
          };
        }
      }
    });
  }

  @Watch('valueFormatted', { immediate: true })
  async onValueChanged(newVal) {
    await this.$nextTick(); // Odotetaan DOM-elementtien rendausta
    if (newVal) {
      // Termit
      this.termiElements = [];
      const abbrs = this.$el.querySelectorAll('abbr');
      _.each(abbrs, abbr => {
        this.termiElements.push(abbr);
      });
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/_mixins.scss';

.teksti {
  @include teksti-sisalto;
}
</style>
