<script setup lang="ts">
import { onMounted, ref } from "vue";

interface Sponsor {
  logo: string;
  title: string;
  description: string;
  expiryDate: string;
  href: string;
}

interface Props {
  loadingText?: string;
  errorText?: string;
  emptyText?: string;
  visitTitle?: string;
}

const props = withDefaults(defineProps<Props>(), {
  loadingText: "Loading...",
  errorText: "Failed to load sponsors data",
  emptyText: "No sponsors available",
  visitTitle: "Visit sponsor",
});

const sponsors = ref<Sponsor[]>([]);
const loading = ref(true);
const error = ref("");

const isExpired = (expiryDate: string): boolean => {
  try {
    const expiry = new Date(expiryDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    expiry.setHours(0, 0, 0, 0);
    return expiry < today;
  } catch {
    return false;
  }
};

onMounted(async () => {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/perfect-panel/ppanel-assets/main/billing/index.json"
    );
    if (!response.ok) throw new Error("Failed to fetch sponsors data");

    const data = await response.json();
    const allSponsors = [
      ...(data.billing || []),
      ...(data.dashboard || []),
      ...(data.payment || []),
    ];
    sponsors.value = allSponsors.filter(
      (sponsor: Sponsor) => !isExpired(sponsor.expiryDate)
    );
  } catch (e) {
    error.value = props.errorText;
    console.error(e);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="sponsors-container">
    <div v-if="loading" class="loading">{{ loadingText }}</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="sponsors.length === 0" class="empty-state">{{ emptyText }}</div>
    <div v-else class="sponsors-grid">
      <a
        v-for="sponsor in sponsors"
        :key="sponsor.title"
        :href="sponsor.href"
        target="_blank"
        rel="noopener noreferrer"
        class="sponsor-card"
        :title="sponsor.title"
      >
        <img
          :src="sponsor.logo"
          :alt="sponsor.title"
          class="sponsor-logo"
        />
        <div class="sponsor-content">
          <h3 class="sponsor-title">{{ sponsor.title }}</h3>
          <p class="sponsor-description">{{ sponsor.description }}</p>
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped>
.sponsors-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem 2.5rem;
}

.loading,
.error {
  text-align: center;
  padding: 3rem;
  font-size: 1rem;
}

.loading {
  color: var(--vp-c-text-2);
}

.error {
  color: var(--vp-c-danger);
}

.sponsors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.sponsor-card {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.25rem;
  border: 1px solid var(--vp-c-divider);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  position: relative;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

.sponsor-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--vp-c-brand) 0%, var(--vp-c-brand-dark) 100%);
  transform: scaleX(0);
  transition: transform 0.25s ease;
}

.sponsor-card:hover::before {
  transform: scaleX(1);
}

.sponsor-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
  border-color: var(--vp-c-brand-light);
}

.sponsor-logo {
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  object-fit: contain;
  border-radius: 8px;
  background: var(--vp-c-bg);
  padding: 0.5rem;
  transition: transform 0.25s ease;
}

.sponsor-card:hover .sponsor-logo {
  transform: scale(1.05);
}

.sponsor-content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.sponsor-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  line-height: 1.4;
}

.sponsor-description {
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.empty-state {
  text-align: center;
  padding: 5rem 2rem;
  color: var(--vp-c-text-2);
  font-size: 1rem;
}

@media (max-width: 768px) {
  .sponsors-container {
    padding: 0 1rem 2rem;
  }

  .sponsors-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  .sponsor-card {
    padding: 1rem;
  }

  .sponsor-logo {
    width: 60px;
    height: 60px;
  }
}
</style>
