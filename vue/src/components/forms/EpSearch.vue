<template>
<div class="filter" role="search" :class="{'maxWidth': maxWidth}">
    <span class="form-control-feedback">
        <fas fixed-width :icon="icon" :spin="isLoading"></fas>
    </span>
    <label class="sr-only" :for="id">{{ placeholderText }}</label>
    <input :id="id"
           class="form-control"
           type="search"
           :placeholder="placeholderText"
           @input="onInput($event.target.value)"
           :value="val">
</div>
</template>

<script lang="ts">
import _ from 'lodash';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Kielet } from '../../stores/kieli';

@Component({
  name: 'EpSearch',
})
export default class EpSearch extends Vue {
  @Prop({ type: String })
  private value!: string;

  @Prop({ type: String })
  private placeholder!: string;

  @Prop({ required: false, default: false })
  private isLoading!: boolean;

  @Prop({ required: false, default: false })
  private maxWidth!: boolean;

  get id() {
    return 'search-' + _.uniqueId();
  }

  get icon() {
    return this.isLoading ? 'spinner' : 'etsi';
  }

  get placeholderText() {
    return this.placeholder || this.$t('etsi');
  }

  get ariaPlaceholderText() {
    return this.placeholder || this.$t('etsi-tietoja-sivulta');
  }

  public onInput(input: any) {
    this.$emit('input', input);
  }

  get val() {
    if (_.isObject(this.value)) {
      return (this.value as any)[Kielet.getSisaltoKieli.value];
    }
    else {
      return this.value;
    }
  }
}
</script>

<style scoped lang="scss">
.filter {
  position: relative;
  max-width: 400px;

  &.maxWidth {
    max-width: 100%;
  }

  .form-control {
    padding-left: 2.375rem;
    border-radius: 15px;
    background: #F3F3F3;
    border-width: 0;

    &::placeholder {
      color: #aaa;
    }

  }

  .form-control-feedback {
    position: absolute;
    z-index: 2;
    display: block;
    width: 2.375rem;
    height: 2.375rem;
    line-height: 2.375rem;
    text-align: center;
    pointer-events: none;
    color: #aaa;
  }
}

</style>
