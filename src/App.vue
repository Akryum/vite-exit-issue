<script lang="ts" setup>
// lang ts causing the issue (vue plugin calls `transformWithEsbuild`)

import { ref } from 'vue';

const count = ref(0)
</script>

<template>
  Hello

  {{ count }}
</template>