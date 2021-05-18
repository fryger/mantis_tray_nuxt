<template>
  <tr>
    <td>
      {{ title }}
    </td>
    <td :style="{ background: color }">
      {{ value }}
    </td>
  </tr>
</template>

<script>
export default {
  name: "Detail",
  props: ["title", "value", "color"]
};
</script>
