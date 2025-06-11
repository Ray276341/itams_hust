import axiosGithub from 'axios';    
import { getSourceCodeById } from './sourceCode';

export interface GitCommit {
  sha: string;
  author: string;
  message: string;
  date: string;
  url: string;
}

function parseGitHubUrl(url: string): { owner: string; repo: string } | null {
  const m = url.match(/github\.com[/:]([^/]+)\/([^/]+?)(?:\.git)?$/);
  return m ? { owner: m[1], repo: m[2] } : null;
}

export async function getRepoCommitsBySourceCodeId(
  sourceCodeId: number
): Promise<GitCommit[] | null> {
  const sc = await getSourceCodeById(sourceCodeId);
  if (!sc.url) return null;

  const parsed = parseGitHubUrl(sc.url);
  if (!parsed) return null;

  try {
    const res = await axiosGithub.get(
      `https://api.github.com/repos/${parsed.owner}/${parsed.repo}/commits`,
      {
        params: { per_page: 50 },
        headers: { Accept: 'application/vnd.github.v3+json' },
      }
    );

    return res.data.map((c: any) => ({
      sha: c.sha,
      author: c.commit.author.name,
      message: c.commit.message.split('\n')[0],
      date: c.commit.author.date,
      url: c.html_url,
    }));
  } catch (err) {
    console.error('GitHub fetch error:', err);
    return null;
  }
}
