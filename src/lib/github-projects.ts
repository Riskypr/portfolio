export interface GithubProject {
  title: string;
  category: string;
  desc: string;
  tech: string[];
  images: string[];
  liveUrl: string | null;
  repoUrl: string;
}

interface GithubRepository {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  fork: boolean;
  archived: boolean;
}

const PLACEHOLDER_IMAGES = [
  "/project-placeholder.svg",
  "/project-placeholder-dark.svg",
  "/project-placeholder-charcoal.svg",
];

export async function getGithubProjects(): Promise<GithubProject[]> {
  try {
    const repositories: GithubRepository[] = [];
    for (let page = 1; ; page += 1) {
      const response = await fetch(
        `https://api.github.com/users/Riskypr/repos?per_page=100&sort=updated&page=${page}`,
        {
          headers: { Accept: "application/vnd.github+json" },
          next: { revalidate: 3600 },
        },
      );

      if (!response.ok) return [];

      const currentPage = (await response.json()) as GithubRepository[];
      repositories.push(...currentPage);
      if (currentPage.length < 100) break;
    }

    return repositories.map((repo, index) => ({
      title: repo.name.replace(/[-_]/g, " "),
      category: [repo.fork ? "Fork" : "Repository", repo.archived ? "Archived" : ""]
        .filter(Boolean)
        .join(" / "),
      desc: repo.description || "Repository GitHub ini belum memiliki deskripsi.",
      tech: [repo.language, ...repo.topics].filter(
        (value): value is string => Boolean(value),
      ),
      images: [PLACEHOLDER_IMAGES[index % PLACEHOLDER_IMAGES.length]],
      liveUrl: repo.homepage?.trim() || null,
      repoUrl: repo.html_url,
    }));
  } catch {
    return [];
  }
}
