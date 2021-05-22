<template>
  <tr>
    <td>
      {{ title }}
    </td>
    <td :style="{ background: color }">
      {{ value }}
      <div v-if="attachment != 0">
        <div v-for="item in attachment" :key="item.id">
          <File :attachment="item" />
        </div>
      </div>
    </td>
  </tr>
</template>

<script>
import File from "./File.vue";
export default {
  name: "Detail",
  components: { File },
  props: ["title", "value", "color", "attachment"]
};
</script>
