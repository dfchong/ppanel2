---
layout: page
sidebar: false
---

<script setup lang="ts">
import Sponsors from './.vitepress/components/Sponsors.vue'
</script>

<div class="sponsors-header">
  <div class="header-badge">💎 Sponsorship</div>
  <h1>Thank You to Our Sponsors</h1>
  <p>These generous sponsors support the ongoing development of this project, enabling us to provide better services to the community</p>
</div>

<Sponsors
  loading-text="Loading..."
  error-text="Failed to load sponsors data"
  empty-text="No sponsors available"
  visit-title="Visit sponsor"
/>

<style scoped>
.sponsors-header {
  text-align: center;
  margin-bottom: 3.5rem;
  padding-top: 3rem;
}

.header-badge {
  display: inline-block;
  padding: 0.5rem 1.25rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--vp-c-brand);
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
}

.header-badge:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.sponsors-header h1 {
  font-size: 2.75rem;
  font-weight: 800;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

@keyframes gradient-shift {
  0%, 100% { background-position: 0% center; }
  50% { background-position: 100% center; }
}

.sponsors-header p {
  font-size: 1.125rem;
  color: var(--vp-c-text-2);
  max-width: 640px;
  margin: 0 auto;
  line-height: 1.7;
}

@media (max-width: 768px) {
  .sponsors-header {
    margin-bottom: 2.5rem;
    padding-top: 2rem;
  }

  .header-badge {
    font-size: 0.8rem;
    padding: 0.4rem 1rem;
  }

  .sponsors-header h1 {
    font-size: 2rem;
  }

  .sponsors-header p {
    font-size: 1rem;
  }
}
</style>
