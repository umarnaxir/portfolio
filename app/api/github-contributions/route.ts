import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const GITHUB_USERNAME = 'umarnaxir';
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionWeek {
  days: (ContributionDay | null)[];
  monthLabel: string | null;
}

export interface GitHubContributionsResponse {
  username: string;
  year: string;
  availableYears: string[];
  total: number;
  weeks: ContributionWeek[];
  stats: {
    activeDays: number;
    longestStreak: number;
    currentStreak: number;
    peakDay: ContributionDay | null;
  };
  profile: {
    publicRepos: number;
    followers: number;
    avatarUrl: string;
  } | null;
  source: 'github-live' | 'github-api';
  fetchedAt: string;
}

function clampLevel(lvl: number): 0 | 1 | 2 | 3 | 4 {
  if (lvl <= 0) return 0;
  if (lvl === 1) return 1;
  if (lvl === 2) return 2;
  if (lvl === 3) return 3;
  return 4;
}

function parseGitHubContributionsHtml(html: string): {
  total: number;
  days: ContributionDay[];
  availableYears: string[];
} {
  // 1. Parse total contributions heading
  const totalMatch = html.match(/id="js-contribution-activity-description"[^>]*>\s*([\d,]+)/i);
  const totalFromHeader = totalMatch ? parseInt(totalMatch[1].replace(/,/g, ''), 10) : 0;

  // 2. Map tooltip counts by component ID
  const tooltipCounts = new Map<string, number>();
  const tooltipRegex = /<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]+)<\/tool-tip>/gi;
  let tMatch: RegExpExecArray | null;
  while ((tMatch = tooltipRegex.exec(html)) !== null) {
    const id = tMatch[1];
    const text = tMatch[2].trim();
    if (/^No contributions/i.test(text)) {
      tooltipCounts.set(id, 0);
    } else {
      const countMatch = text.match(/^([\d,]+)\s+contribution/i);
      if (countMatch) {
        tooltipCounts.set(id, parseInt(countMatch[1].replace(/,/g, ''), 10));
      }
    }
  }

  // 3. Parse every day cell (attribute order inside <td> can vary)
  const days: ContributionDay[] = [];
  const tdRegex = /<td\b([^>]*class="[^"]*ContributionCalendar-day[^"]*"[^>]*)>/gi;
  let cMatch: RegExpExecArray | null;
  while ((cMatch = tdRegex.exec(html)) !== null) {
    const attrs = cMatch[1];
    const dateMatch = attrs.match(/data-date="(\d{4}-\d{2}-\d{2})"/);
    const levelMatch = attrs.match(/data-level="(\d)"/);
    const idMatch = attrs.match(/\bid="([^"]+)"/);

    if (dateMatch && levelMatch) {
      const date = dateMatch[1];
      const level = clampLevel(parseInt(levelMatch[1], 10));
      const count = idMatch && tooltipCounts.has(idMatch[1])
        ? (tooltipCounts.get(idMatch[1]) ?? 0)
        : level === 0
        ? 0
        : level * 4;

      days.push({ date, count, level });
    }
  }

  // Sort chronologically
  days.sort((a, b) => a.date.localeCompare(b.date));

  // Extract available year links if returned
  const yearSet = new Set<string>();
  const yearRegex = /id="year-link-(\d{4})"/gi;
  let yMatch: RegExpExecArray | null;
  while ((yMatch = yearRegex.exec(html)) !== null) {
    yearSet.add(yMatch[1]);
  }
  const currentYear = String(new Date().getUTCFullYear());
  if (yearSet.size === 0) {
    yearSet.add(currentYear);
    yearSet.add(String(Number(currentYear) - 1));
    yearSet.add(String(Number(currentYear) - 2));
  }
  const availableYears = Array.from(yearSet).sort((a, b) => Number(b) - Number(a));

  const summedTotal = days.reduce((acc, d) => acc + d.count, 0);
  return {
    total: totalFromHeader > 0 ? totalFromHeader : summedTotal,
    days,
    availableYears,
  };
}

function buildWeeksAndStats(days: ContributionDay[]): {
  weeks: ContributionWeek[];
  stats: GitHubContributionsResponse['stats'];
} {
  const weeks: ContributionWeek[] = [];
  let currentWeek: (ContributionDay | null)[] = [null, null, null, null, null, null, null];

  for (let i = 0; i < days.length; i++) {
    const day = days[i];
    const dow = new Date(`${day.date}T00:00:00Z`).getUTCDay(); // 0=Sun..6=Sat

    if (dow === 0 && i > 0) {
      weeks.push({ days: currentWeek, monthLabel: null });
      currentWeek = [null, null, null, null, null, null, null];
    }
    currentWeek[dow] = day;
  }

  if (currentWeek.some((d) => d !== null)) {
    weeks.push({ days: currentWeek, monthLabel: null });
  }

  // Assign clean month headers without label collisions
  let lastMonth = -1;
  let lastLabeledWeekIdx = -3;
  weeks.forEach((week, idx) => {
    const firstValid = week.days.find((d): d is ContributionDay => d !== null);
    if (!firstValid) return;

    const monthIdx = parseInt(firstValid.date.slice(5, 7), 10) - 1;
    if (monthIdx !== lastMonth) {
      if (idx - lastLabeledWeekIdx >= 2) {
        week.monthLabel = MONTHS[monthIdx];
        lastLabeledWeekIdx = idx;
      }
      lastMonth = monthIdx;
    }
  });

  // Compute activity stats
  let activeDays = 0;
  let longestStreak = 0;
  let runningStreak = 0;
  let peakDay: ContributionDay | null = null;

  for (const day of days) {
    if (day.count > 0) {
      activeDays++;
      runningStreak++;
      if (runningStreak > longestStreak) longestStreak = runningStreak;
      if (!peakDay || day.count > peakDay.count) {
        peakDay = day;
      }
    } else {
      runningStreak = 0;
    }
  }

  // Current streak (allowing today to still have 0 if yesterday was active)
  let currentStreak = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) {
      currentStreak++;
    } else if (i === days.length - 1) {
      continue;
    } else {
      break;
    }
  }

  return {
    weeks,
    stats: {
      activeDays,
      longestStreak,
      currentStreak,
      peakDay,
    },
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const yearParam = searchParams.get('year') || 'last';
  const isSpecificYear = /^\d{4}$/.test(yearParam);

  const contributionsUrl = isSpecificYear
    ? `https://github.com/users/${GITHUB_USERNAME}/contributions?from=${yearParam}-01-01&to=${yearParam}-12-31`
    : `https://github.com/users/${GITHUB_USERNAME}/contributions`;

  const fallbackApiUrl = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=${isSpecificYear ? yearParam : 'last'}`;
  const profileUrl = `https://api.github.com/users/${GITHUB_USERNAME}`;

  const [htmlRes, profileRes] = await Promise.allSettled([
    fetch(contributionsUrl, {
      cache: 'no-store',
      headers: {
        'User-Agent': 'Portfolio-Live-GitHub-Widget',
        'X-Requested-With': 'XMLHttpRequest',
      },
      signal: AbortSignal.timeout(5500),
    }),
    fetch(profileUrl, {
      cache: 'no-store',
      headers: { 'User-Agent': 'Portfolio-Live-GitHub-Widget' },
      signal: AbortSignal.timeout(4000),
    }),
  ]);

  let profile: GitHubContributionsResponse['profile'] = null;
  if (profileRes.status === 'fulfilled' && profileRes.value.ok) {
    try {
      const pJson = (await profileRes.value.json()) as {
        public_repos?: number;
        followers?: number;
        avatar_url?: string;
      };
      if (typeof pJson.public_repos === 'number') {
        profile = {
          publicRepos: pJson.public_repos,
          followers: pJson.followers ?? 0,
          avatarUrl: pJson.avatar_url ?? '',
        };
      }
    } catch {
      profile = null;
    }
  }

  // Primary: Official GitHub live HTML calendar
  if (htmlRes.status === 'fulfilled' && htmlRes.value.ok) {
    const html = await htmlRes.value.text();
    const parsed = parseGitHubContributionsHtml(html);
    if (parsed.days.length > 0) {
      const { weeks, stats } = buildWeeksAndStats(parsed.days);
      const payload: GitHubContributionsResponse = {
        username: GITHUB_USERNAME,
        year: yearParam,
        availableYears: parsed.availableYears,
        total: parsed.total,
        weeks,
        stats,
        profile,
        source: 'github-live',
        fetchedAt: new Date().toISOString(),
      };
      return NextResponse.json(payload, {
        headers: { 'Cache-Control': 'no-store, max-age=0' },
      });
    }
  }

  // Secondary fallback: GitHub Contributions JSON API
  try {
    const apiRes = await fetch(fallbackApiUrl, {
      cache: 'no-store',
      signal: AbortSignal.timeout(5500),
    });
    if (apiRes.ok) {
      const json = (await apiRes.json()) as {
        total?: Record<string, number>;
        contributions?: { date: string; count: number; level: number }[];
      };
      const rawDays = (json.contributions ?? []).map((d) => ({
        date: d.date,
        count: d.count,
        level: clampLevel(d.level),
      }));
      rawDays.sort((a, b) => a.date.localeCompare(b.date));
      const { weeks, stats } = buildWeeksAndStats(rawDays);
      const totalKey = isSpecificYear ? yearParam : 'lastYear';
      const total =
        json.total?.[totalKey] ??
        rawDays.reduce((acc, d) => acc + d.count, 0);
      const currentYear = new Date().getUTCFullYear();

      const payload: GitHubContributionsResponse = {
        username: GITHUB_USERNAME,
        year: yearParam,
        availableYears: [String(currentYear), String(currentYear - 1), String(currentYear - 2)],
        total,
        weeks,
        stats,
        profile,
        source: 'github-api',
        fetchedAt: new Date().toISOString(),
      };
      return NextResponse.json(payload, {
        headers: { 'Cache-Control': 'no-store, max-age=0' },
      });
    }
  } catch {
    // Fall through to structured 502 error
  }

  return NextResponse.json(
    { error: 'Unable to reach GitHub contributions right now.' },
    { status: 502 }
  );
}

