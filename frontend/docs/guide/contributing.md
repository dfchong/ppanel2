# Contributors

Thank you to all the developers who have contributed to the PPanel project!

## Project Contributors

PPanel is an open-source project, and we welcome and appreciate all forms of contributions, including but not limited to:

- 💻 Code contributions
- 📝 Documentation improvements
- 🐛 Bug reports
- 💡 Feature suggestions
- 🌍 Translation work
- ⭐ Stars and promotion

## Core Contributors

<script setup>
import { ref, onMounted } from 'vue'

const backendContributors = ref([])
const frontendContributors = ref([])
const backendLoading = ref(true)
const frontendLoading = ref(true)

onMounted(async () => {
  // Fetch contributors from backend related repositories
  try {
    const repos = ['server', 'ppanel', 'ppanel-node']
    const contributorsMap = new Map()

    for (const repo of repos) {
      const response = await fetch(`https://api.github.com/repos/perfect-panel/${repo}/contributors`)
      if (response.ok) {
        const contributors = await response.json()
        contributors.forEach(contributor => {
          if (!contributorsMap.has(contributor.login)) {
            contributorsMap.set(contributor.login, {
              login: contributor.login,
              avatar_url: contributor.avatar_url,
              html_url: contributor.html_url,
              contributions: contributor.contributions
            })
          } else {
            const existing = contributorsMap.get(contributor.login)
            existing.contributions += contributor.contributions
          }
        })
      }
    }

    backendContributors.value = Array.from(contributorsMap.values())
      .sort((a, b) => b.contributions - a.contributions)
  } catch (error) {
    console.error('Failed to fetch backend contributors:', error)
  } finally {
    backendLoading.value = false
  }

  // Fetch contributors from frontend related repositories
  try {
    const repos = ['frontend', 'ppanel-web', 'ppanel-docs']
    const contributorsMap = new Map()

    for (const repo of repos) {
      const response = await fetch(`https://api.github.com/repos/perfect-panel/${repo}/contributors`)
      if (response.ok) {
        const contributors = await response.json()
        contributors.forEach(contributor => {
          if (!contributorsMap.has(contributor.login)) {
            contributorsMap.set(contributor.login, {
              login: contributor.login,
              avatar_url: contributor.avatar_url,
              html_url: contributor.html_url,
              contributions: contributor.contributions
            })
          } else {
            const existing = contributorsMap.get(contributor.login)
            existing.contributions += contributor.contributions
          }
        })
      }
    }

    frontendContributors.value = Array.from(contributorsMap.values())
      .sort((a, b) => b.contributions - a.contributions)
  } catch (error) {
    console.error('Failed to fetch frontend contributors:', error)
  } finally {
    frontendLoading.value = false
  }
})
</script>

### Backend Repository Contributors

<div v-if="backendLoading" class="contributors-loading">
  <div class="loading-spinner"></div>
  <p>Loading contributors...</p>
</div>

<div v-else-if="backendContributors.length === 0" class="contributors-empty">
  <p>No contributors data available</p>
</div>

<div v-else>
  <div class="contributors-grid">
    <a
      v-for="contributor in backendContributors"
      :key="contributor.login"
      :href="contributor.html_url"
      target="_blank"
      rel="noopener noreferrer"
      class="contributor-card"
    >
      <img
        :src="contributor.avatar_url"
        :alt="contributor.login"
        class="contributor-avatar"
        loading="lazy"
      />
      <div class="contributor-info">
        <div class="contributor-name" :title="contributor.login">{{ contributor.login }}</div>
        <div class="contributor-contributions">
          <svg class="contribution-icon" viewBox="0 0 16 16" width="12" height="12" fill="currentColor">
            <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"></path>
          </svg>
          {{ contributor.contributions }} contributions
        </div>
      </div>
    </a>
  </div>
</div>

### Frontend Repository Contributors

<div v-if="frontendLoading" class="contributors-loading">
  <div class="loading-spinner"></div>
  <p>Loading contributors...</p>
</div>

<div v-else-if="frontendContributors.length === 0" class="contributors-empty">
  <p>No contributors data available</p>
</div>

<div v-else>
  <div class="contributors-grid">
    <a
      v-for="contributor in frontendContributors"
      :key="contributor.login"
      :href="contributor.html_url"
      target="_blank"
      rel="noopener noreferrer"
      class="contributor-card"
    >
      <img
        :src="contributor.avatar_url"
        :alt="contributor.login"
        class="contributor-avatar"
        loading="lazy"
      />
      <div class="contributor-info">
        <div class="contributor-name" :title="contributor.login">{{ contributor.login }}</div>
        <div class="contributor-contributions">
          <svg class="contribution-icon" viewBox="0 0 16 16" width="12" height="12" fill="currentColor">
            <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"></path>
          </svg>
          {{ contributor.contributions }} contributions
        </div>
      </div>
    </a>
  </div>
</div>

<style scoped>
.contributors-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  color: var(--vp-c-text-2);
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--vp-c-divider);
  border-top-color: var(--vp-c-brand);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.contributors-empty {
  text-align: center;
  padding: 2rem;
  color: var(--vp-c-text-3);
  font-style: italic;
}

.contributors-stats {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.stat-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.contributors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
}

.contributor-card {
  display: flex;
  align-items: center;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  text-decoration: none;
  color: var(--vp-c-text-1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.contributor-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--vp-c-brand), var(--vp-c-brand-light));
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.contributor-card:hover {
  border-color: var(--vp-c-brand-light);
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.contributor-card:hover::before {
  transform: scaleX(1);
}

.contributor-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  margin-right: 1rem;
  border: 2px solid var(--vp-c-divider);
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.contributor-card:hover .contributor-avatar {
  border-color: var(--vp-c-brand);
  transform: scale(1.05);
}

.contributor-info {
  flex: 1;
  min-width: 0;
}

.contributor-name {
  font-weight: 600;
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0.25rem;
  color: var(--vp-c-text-1);
}

.contributor-contributions {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.contribution-icon {
  opacity: 0.6;
}

@media (max-width: 768px) {
  .contributors-grid {
    grid-template-columns: 1fr;
  }

  .contributors-stats {
    flex-direction: column;
  }

  .stat-badge {
    width: 100%;
    justify-content: center;
  }
}

@media (prefers-color-scheme: dark) {
  .contributor-card:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  }
}
</style>

### Reporting Issues

If you find a bug or have a feature suggestion:

1. Search [GitHub Issues](https://github.com/perfect-panel/frontend/issues) to see if a similar issue exists
2. If not, create a new Issue
3. Provide detailed information:
   - Problem description
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Environment info (browser, OS, etc.)
   - Screenshots or error logs (if applicable)

### Documentation Contributions

Documentation is equally important! You can:

- Fix typos and grammar errors
- Improve clarity of existing documentation
- Add missing documentation
- Translate documentation to other languages
- Add usage examples and tutorials

Documentation source files are located in the `/docs` directory.

### Translation Contributions

We welcome translating PPanel into more languages:

1. Check if there's already a folder for the target language in `/docs`
2. If not, create a new language folder (e.g., `/docs/ja` for Japanese)
3. Copy the English or Chinese version as a base
4. Translate the content
5. Add new language configuration in `.vitepress/config.mts`
6. Submit a Pull Request

## Community

Join our community and connect with other developers:

- **GitHub Discussions**: [Discussion Forum](https://github.com/perfect-panel/frontend/discussions)
- **GitHub Issues**: [Issue Tracker](https://github.com/perfect-panel/frontend/issues)
- **Telegram**: [Join Group](https://t.me/PPanelChat)

## Code of Conduct

We are committed to providing a friendly, safe, and welcoming environment for everyone. Please read and follow our [Code of Conduct](https://github.com/perfect-panel/frontend/blob/main/CODE_OF_CONDUCT.md).

## Acknowledgments

Special thanks to all developers, testers, documentation writers, and community members who have contributed to the PPanel project. You make PPanel better!

## License

By contributing code, you agree that your contributions will be licensed under the project's [GNU License](https://github.com/perfect-panel/frontend/blob/main/LICENSE).
