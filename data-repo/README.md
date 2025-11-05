# Template repository for Leaderboard Data Repo

Visit [Open Healthcare Network's Leaderboard Deployment](https://contributors.ohc.network/) deployed from [`coronasafe/leaderboard-data` repository](https://github.com/coronasafe/leaderboard-data).

## ⚙️ Configuring Scraper

The scraper scripts fetches data every 24 hours. The scraper workflow needs to run at an interval of 24 hours.

To change what time the scraper workflow runs, update the schedule cron value of the action:

```yml
# .github/workflows/scraper.yml
on:
  schedule:
    - cron: 0 0 * * *
```

### 🔑 Actions Secrets and Variables

**Secrets:**

| Name               | Description                                                      |
|--------------------|------------------------------------------------------------------|
| `SLACK_API_TOKEN`  | Optional; Required for scraping EOD messages for slack           |
| `GIT_ACCESS_TOKEN` | Personal Access Token; Needs write permissions to the data repo. |

**Variables:**

| Name                | Description                                                    |
|---------------------|----------------------------------------------------------------|
| `LEADERBOARD_REPO`  | Optional; Specify to use a fork of the leaderboard app repo.   |
| `SLACK_EOD_CHANNEL` | Optional; The channel ID to use for scanning for EOD messages. |

## 🚀 Deploying Leaderboard

TLDR; just click deploy...

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fcoronasafe%2Fleaderboard-org-data-template%2Ftree%2Fmain&env=GITHUB_PAT&envDescription=GitHub%20Personal%20Access%20Token%20is%20required%20with%20the%20following%20scopes%20repo%2C%20read%3Aorg%2C%20read%3Aproject%2C%20read%3Auser&envLink=https%3A%2F%2Fgithub.com%2Fcoronasafe%2Fleaderboard-org-data-template%2Fblob%2Fmain%2FREADME.md&project-name=leaderboard&repository-name=leaderboard-data&demo-title=Open%20Healthcare%20Network%20-%20Leaderboard&demo-description=Leaderboard%20collects%20data%20from%20GitHub%20and%20Slack%20to%20show%20off%20the%20work%20of%20our%20open%20source%20contributors&demo-url=https%3A%2F%2Fcontributors.ohc.network&demo-image=https%3A%2F%2Fgithub.com%2Fcoronasafe%2Fleaderboard%2Fassets%2F25143503%2F6352a4cf-4b8b-4f80-b45c-6af323ee502e&root-directory=leaderboard&build-command=pnpm%20build&install-command=.%2Fpre-deploy.sh+%26%26+pnpm+install)

> [!NOTE]
> After deployment, run the scraper workflow once to populate the data repo with some data.

### Environment Variables

**`GITHUB_PAT`**
Some pages like [releases](https://contributors.ohc.network/releases), [projects](https://contributors.ohc.network/projects), etc. are server side rendered on-demand or pre-rendered during build time by calling GitHub's APIs and these calls requires authentication.
Create a Personal Access Token ([docs](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic)) with the following scopes **`repo`, `read:org`, `read:project`, `read:user`**.

### ⚙️ Deploy Configurations

The above deploy button uses the following configurations.

Root Directory: `leaderboard`
Build Command: `pnpm build`
Install Command: `./pre-deploy.sh && pnpm install`

## 🎨 Personalizing Leaderboard Deployment

Leaderboard can be personalized by editing the contents in `config` directory.

**Theme and Colors**
Leaderboard has support for light and dark mode. To edit the theme colors, update the [`theme.css`](https://github.com/coronasafe/leaderboard-org-data-template/blob/main/config/theme.css) file.

**Logo**
To change the favicon and logo, replace the files present in the [`config/assets`](https://github.com/coronasafe/leaderboard-org-data-template/tree/main/config/assets) directory with the desired ones.
