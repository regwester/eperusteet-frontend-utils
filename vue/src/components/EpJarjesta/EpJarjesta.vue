<template>
<draggable v-bind="options"
           tag="div"
           class="tree-container"
           :value="value"
           @input="emitter"
           :key="value.length">
  <div v-for="(node, idx) in value" :key="idx">
    <div class="box" :class="{ 'new-box': node.$uusi, 'box-draggable': isEditable }" >
      <span class="handle" v-if="isEditable">
        <fas icon="grip-vertical" />
      </span>
      <span class="chapter">
        {{ prefix }}{{ idx + 1 }}
      </span>
      <span class="name">
        <slot :node="node"></slot>
      </span>
      <div
        v-if="node[childField] && node[childField] != null && node[childField].length > 0"
        class="actions"
        role="button"
        tabindex="0"
        @click="toggle(idx)"
        @keyup.enter="toggle(idx)"
        :aria-expanded="!node.$closed">
        <fas v-if="node.$closed" icon="chevron-down"></fas>
        <fas v-else icon="chevron-up"></fas>
      </div>
    </div>
    <div class="children" v-if="!node.$closed && node[childField] && node[childField] != null">
      <ep-jarjesta
          v-model="node[childField]"
          :is-editable="isEditable"
          :prefix="prefix + (idx + 1) + '.'"
          :child-field="childField"
          :group="uniqueChildGroups ? group + idx : group">
        <slot v-for="(_, name) in $slots" :name="name" :slot="name"></slot>
        <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="data">
          <slot :name="name" v-bind="data" />
        </template>
      </ep-jarjesta>
    </div>
  </div>
</draggable>
</template>

<script lang="ts">

import { Vue, Prop, Component } from 'vue-property-decorator';
import draggable from 'vuedraggable';

@Component({
  name: 'EpJarjesta',
  components: {
    draggable,
  },
})
export default class EpJarjesta extends Vue {
  @Prop({
    required: false,
    type: String,
    default: '',
  })
  private prefix!: string;

  @Prop({
    required: false,
    type: Boolean,
    default: false,
  })
  private isEditable!: boolean;

  @Prop({
    required: false,
    type: Array,
    default: null,
  })
  private value!: any[];

  @Prop({
    required: false,
    default: 'lista',
  })
  private childField!: string;

  @Prop({ default: null })
  private group!: string | null;

  @Prop({ required: false, default: true })
  private sortable!: boolean;

  @Prop({ default: false, required: false })
  private uniqueChildGroups!: boolean;

  get options() {
    return {
      animation: 300,
      group: this.group,
      disabled: !this.isEditable || !this.sortable,
      ghostClass: 'placeholder',
      forceFallback: true,
    };
  }

  toggle(idx) {
    Vue.set(this.value[idx], '$closed', !this.value[idx].$closed);
    this.emitter(this.value);
  }

  emitter(value) {
    this.$emit('input', value);
  }
}
</script>

<style scoped lang="scss">
@import '../../styles/_variables.scss';

.flip-move {
  transition: transform 0.5s;
}

.placeholder {
  opacity: 0.5;
}

.drag-area-empty {
  min-height: 7px;
}

.children {
  margin-left: 26px;
}

.handle {
  color: #668DEA;
  margin-right: 8px;
  cursor: grab;
}

.box {
  min-height: 40px;
  max-width: 512px;
  min-width: 312px;
  border: 1px solid #CCD9F8;
  border-radius: 4px;
  background-color: rgba(230,246,255,0.6);
  padding: 8px 12px;
  margin-bottom: 8px;

  .actions {
    float: right;
    cursor: pointer;
  }

  .chapter {
    color: #668DEA;
    font-size: 16px;
    margin-right: 8px;
    user-select: none;
  }

  &.new-box {
    background-color: rgba(210,226,255,1.0);
    border: 1px solid #ACB9F8;
  }
}

.box-draggable {
  cursor: grab;
}

</style>
