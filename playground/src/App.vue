<script setup lang="ts">
  import { Button as AButton } from 'antdv-next'

  const rows = Array.from({ length: 14 }, (_, index) => ({
    key: index + 1,
    label: `Row ${index + 1}`,
    value: `Scrollable content ${index + 1}`,
  }))
</script>

<template>
  <a-image-preview-group>
    <a-image
      alt="svg image"
      :width="200"
      src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
    />
    <a-image
      :width="200"
      alt="svg image"
      src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
    />
  </a-image-preview-group>
  <a-style-provider hash-priority="high">
    <a-button>
      click
      <StepForwardOutlined />
    </a-button>
  </a-style-provider>
  <a-scrollbar style="height: 260px; border: 1px solid var(--ant-color-border); border-radius: 12px;">
    <div style="min-width: 680px; padding: 16px;">
      <a-flex justify="space-between" align="center" style="margin-bottom: 12px;">
        <a-typography-title :level="5" style="margin: 0;">
          Activity Stream
        </a-typography-title>
        <a-tag color="processing">
          14 items
        </a-tag>
      </a-flex>

      <a-flex vertical gap="small">
        <div
          v-for="item in rows"
          :key="item.key"
          style="display: grid; grid-template-columns: 120px 1fr 120px; gap: 12px; min-width: 640px; padding: 12px 14px; border-radius: 10px; background: color-mix(in srgb, var(--ant-color-fill-secondary), transparent 20%);"
        >
          <strong>{{ item.label }}</strong>
          <span>{{ item.value }}</span>
          <a-tag :color="item.key % 2 === 0 ? 'success' : 'default'">
            {{ item.key % 2 === 0 ? 'Synced' : 'Queued' }}
          </a-tag>
        </div>
      </a-flex>
    </div>
  </a-scrollbar>
</template>
