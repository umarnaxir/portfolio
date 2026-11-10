'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/styles/primitives';
import { RefreshCw } from 'lucide-react';
import { ArrowUpRight, GitHubIcon } from '../ui/Icons';
import type {
  ContributionDay,
  GitHubContributionsResponse,
} from '@/app/api/github-contributions/route';

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const livePulse = keyframes`
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(57, 211, 83, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(57, 211, 83, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(57, 211, 83, 0); }
`;

const LEVEL_COLORS: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: 'rgba(255, 255, 255, 0.06)',
  1: '#0e4429',
  2: '#006d32',
  3: '#26a641',
  4: '#39d353',
};

const SectionWrapper = styled.section`
  background: ${({ theme }) => theme.colors.background};
  padding-block: 1.5rem;
  position: relative;

  @media (min-width: 1024px) {
    padding-block: 2rem;
  }

  @media (max-width: 767px) {
    padding-block: 1rem;
  }
`;

const GitCard = styled.div`
  position: relative;
  border-radius: 1.5rem;
  background: ${({ theme }) => theme.colors.ink};
  background-image: radial-gradient(
    circle at top right,
    rgba(177, 95, 44, 0.16) 0%,
    rgba(10, 10, 10, 0.98) 55%
  );
  border: 1px solid rgba(255, 255, 255, 0.11);
  box-shadow: 0 22px 55px rgba(0, 0, 0, 0.25);
  padding: 2rem 2.25rem;
  color: #ffffff;
  overflow: hidden;

  @media (max-width: 767px) {
    border-radius: 1.25rem;
    padding: 1.25rem 1.1rem;
    box-shadow: 0 14px 34px rgba(0, 0, 0, 0.2);
  }
`;

const TopBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 1.5rem;

  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }

  @media (max-width: 767px) {
    gap: 0.9rem;
    margin-bottom: 1.15rem;
  }
`;

const LeftIdentity = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
`;

const HandleRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem;
`;

const GitHubBadge = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.32rem 0.75rem;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.14);
  font-size: 0.75rem;
  font-weight: 600;
  color: #ffffff;
  text-decoration: none;
  transition: border-color 0.25s ease, background 0.25s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accentFrom};
    background: rgba(177, 95, 44, 0.18);
  }

  .live-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #39d353;
    animation: ${livePulse} 2.2s infinite;
  }

  @media (max-width: 767px) {
    font-size: 0.7rem;
    padding: 0.28rem 0.65rem;
  }
`;

const RepoMetaChip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0.65rem;
  border-radius: 9999px;
  background: rgba(57, 211, 83, 0.1);
  border: 1px solid rgba(57, 211, 83, 0.25);
  font-size: 0.7rem;
  font-weight: 600;
  color: #39d353;
  letter-spacing: 0.03em;

  @media (max-width: 767px) {
    font-size: 0.66rem;
    padding: 0.25rem 0.55rem;
  }
`;

const RefreshBtn = styled.button<{ $spinning: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0.65rem;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.72);
  font-size: 0.7rem;
  font-weight: 500;
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease;

  &:hover:not(:disabled) {
    border-color: rgba(255, 255, 255, 0.3);
    color: #ffffff;
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }

  svg {
    transition: transform 0.6s ease;
    transform: ${({ $spinning }) => ($spinning ? 'rotate(360deg)' : 'rotate(0deg)')};
  }
`;

const TotalHeading = styled.h2`
  font-size: clamp(1.35rem, 2.5vw, 1.95rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  color: #ffffff;
  line-height: 1.2;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.4rem;

  .count-num {
    font-variant-numeric: tabular-nums;
    color: #ffffff;
    font-weight: 700;
  }

  .count-sub {
    font-weight: 400;
    font-size: clamp(0.95rem, 1.4vw, 1.15rem);
    color: rgba(255, 255, 255, 0.62);
  }

  @media (max-width: 767px) {
    font-size: 1.25rem;

    .count-sub {
      font-size: 0.875rem;
    }
  }
`;

const YearTabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.45rem;

  @media (max-width: 767px) {
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 0.15rem;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const YearBtn = styled.button<{ $active: boolean }>`
  flex: 0 0 auto;
  padding: 0.45rem 0.9rem;
  border-radius: 8px;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid
    ${({ $active, theme }) => ($active ? theme.colors.accentFrom : 'rgba(255, 255, 255, 0.12)')};
  background: ${({ $active, theme }) => ($active ? theme.colors.accent : 'rgba(255, 255, 255, 0.05)')};
  color: ${({ $active }) => ($active ? '#ffffff' : 'rgba(255, 255, 255, 0.68)')};
  transition: all 0.22s ease;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.accentFrom};
    color: #ffffff;
  }

  @media (max-width: 767px) {
    padding: 0.38rem 0.75rem;
    font-size: 0.74rem;
  }
`;

const GraphSurface = styled.div`
  position: relative;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 1.15rem 1.25rem 1rem;

  @media (max-width: 767px) {
    border-radius: 0.875rem;
    padding: 0.85rem 0.75rem 0.75rem;
  }
`;

const ScrollViewport = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  overscroll-behavior-x: contain;
  touch-action: pan-x pan-y;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.2) transparent;

  @media (max-width: 767px) {
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const MatrixInner = styled.div<{ $weekCount: number }>`
  display: grid;
  grid-template-columns: 30px 1fr;
  gap: 0.4rem 0.55rem;
  width: 100%;

  @media (max-width: 1023px) {
    width: max-content;
    grid-template-columns: 28px max-content;
  }
`;

const CornerSpacer = styled.div`
  height: 16px;

  @media (max-width: 1023px) {
    position: sticky;
    left: 0;
    z-index: 4;
    background: #101010;
    box-shadow: 6px 0 10px rgba(16, 16, 16, 0.85);
    padding-right: 4px;
  }
`;

const MonthsRow = styled.div<{ $weekCount: number }>`
  display: grid;
  grid-template-columns: ${({ $weekCount }) => `repeat(${$weekCount}, minmax(0, 1fr))`};
  gap: 3.5px;
  height: 16px;
  align-items: center;

  @media (max-width: 1023px) {
    grid-template-columns: ${({ $weekCount }) => `repeat(${$weekCount}, 12px)`};
    gap: 3px;
  }
`;

const MonthLabel = styled.span`
  font-size: 0.6875rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.55);
  white-space: nowrap;
  user-select: none;
  line-height: 1;
`;

const WeekdaysCol = styled.div`
  display: grid;
  grid-template-rows: repeat(7, 1fr);
  gap: 3.5px;
  align-items: center;

  @media (max-width: 1023px) {
    position: sticky;
    left: 0;
    z-index: 3;
    background: #101010;
    box-shadow: 6px 0 10px rgba(16, 16, 16, 0.85);
    padding-right: 4px;
    gap: 3px;
  }

  span {
    font-size: 0.65rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.48);
    line-height: 1;
    user-select: none;
  }
`;

const CellsGrid = styled.div<{ $weekCount: number }>`
  display: grid;
  grid-template-columns: ${({ $weekCount }) => `repeat(${$weekCount}, minmax(0, 1fr))`};
  gap: 3.5px;

  @media (max-width: 1023px) {
    grid-template-columns: ${({ $weekCount }) => `repeat(${$weekCount}, 12px)`};
    gap: 3px;
  }
`;

const WeekColumn = styled.div`
  display: grid;
  grid-template-rows: repeat(7, 1fr);
  gap: 3.5px;

  @media (max-width: 1023px) {
    gap: 3px;
  }
`;

const DayCell = styled.button<{ $level: 0 | 1 | 2 | 3 | 4; $selected: boolean }>`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 3px;
  padding: 0;
  border: 1px solid
    ${({ $selected, $level }) =>
      $selected
        ? '#ffffff'
        : $level === 0
        ? 'rgba(255, 255, 255, 0.05)'
        : 'rgba(255, 255, 255, 0.08)'};
  background: ${({ $level }) => LEVEL_COLORS[$level]};
  cursor: pointer;
  transition: transform 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
  box-shadow: ${({ $selected }) => ($selected ? '0 0 0 1px #ffffff' : 'none')};

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: scale(1.25);
      border-color: rgba(255, 255, 255, 0.85);
      z-index: 2;
    }
  }

  @media (max-width: 1023px) {
    width: 12px;
    height: 12px;
  }
`;

const EmptySlot = styled.div`
  width: 100%;
  aspect-ratio: 1;

  @media (max-width: 1023px) {
    width: 12px;
    height: 12px;
  }
`;

const LegendAndTooltipBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: 0.9rem;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.62);

  @media (max-width: 767px) {
    font-size: 0.7rem;
    gap: 0.55rem;
    margin-top: 0.75rem;
    padding-top: 0.65rem;
  }
`;

const InspectorText = styled.div`
  display: flex;
  align-items: center;
  gap: 0.45rem;
  min-height: 1.25rem;

  strong {
    color: #ffffff;
    font-weight: 600;
  }

  .swipe-hint {
    color: rgba(255, 255, 255, 0.45);
    @media (min-width: 1024px) {
      display: none;
    }
  }
`;

const LegendGroup = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.32rem;
  margin-left: auto;

  span {
    font-size: 0.7rem;
    color: rgba(255, 255, 255, 0.55);
    margin-inline: 0.15rem;
  }

  .legend-box {
    width: 11px;
    height: 11px;
    border-radius: 2px;
    border: 1px solid rgba(255, 255, 255, 0.08);
  }
`;

const CardFooterActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: 1.25rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 0.74rem;
  color: rgba(255, 255, 255, 0.48);

  .profile-link {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    color: #ffffff;
    font-weight: 600;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.accentFrom};
    }
  }

  @media (max-width: 767px) {
    margin-top: 1rem;
    padding-top: 0.85rem;
    font-size: 0.68rem;
  }
`;

const SkeletonGrid = styled.div`
  height: 126px;
  border-radius: 8px;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.03) 25%,
    rgba(255, 255, 255, 0.08) 50%,
    rgba(255, 255, 255, 0.03) 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.4s infinite linear;
`;

const WEEKDAYS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

function formatHumanDate(dateStr: string): string {
  const date = new Date(`${dateStr}T00:00:00Z`);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export function GitHubContributionsSection() {
  const cardRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const scrollViewportRef = useRef<HTMLDivElement>(null);

  const [selectedYear, setSelectedYear] = useState<string>('last');
  const [refreshTick, setRefreshTick] = useState<number>(0);
  const [data, setData] = useState<GitHubContributionsResponse | null>(null);
  const [displayTotal, setDisplayTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<ContributionDay | null>(null);

  const handleSelectYear = (year: string) => {
    if (year === selectedYear && !error) return;
    setLoading(true);
    setError(null);
    setSelectedYear(year);
  };

  const handleManualSync = () => {
    setLoading(true);
    setError(null);
    setRefreshTick((n) => n + 1);
  };

  useEffect(() => {
    const controller = new AbortController();

    fetch(`/api/github-contributions?year=${encodeURIComponent(selectedYear)}`, {
      cache: 'no-store',
      signal: controller.signal,
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Unable to load live GitHub data.');
        return (await res.json()) as GitHubContributionsResponse;
      })
      .then((json) => {
        setData(json);
        setDisplayTotal(json.total);
        setSelectedDay(json.stats.peakDay);
        setError(null);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        const message = err instanceof Error ? err.message : 'Unable to fetch live GitHub data.';
        setError(message);
        setLoading(false);
      });

    return () => controller.abort();
  }, [selectedYear, refreshTick]);

  // Year options derived from live response + 'last'
  const yearOptions = useMemo(() => {
    const years = data?.availableYears ?? ['2026', '2025', '2024'];
    return [
      { id: 'last', label: 'Last Year' },
      ...years.slice(0, 3).map((y) => ({ id: y, label: y })),
    ];
  }, [data?.availableYears]);

  // Animate card reveal once + counter & grid wave on data load
  useEffect(() => {
    if (typeof window === 'undefined' || !data) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const card = cardRef.current;
    const grid = gridRef.current;

    if (prefersReducedMotion) {
      const raf = requestAnimationFrame(() => setDisplayTotal(data.total));
      return () => cancelAnimationFrame(raf);
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const counterObj = { val: Math.round(data.total * 0.78) };

      gsap.to(counterObj, {
        val: data.total,
        duration: 0.55,
        ease: 'power2.out',
        onUpdate: () => {
          setDisplayTotal(Math.round(counterObj.val));
        },
        scrollTrigger: card
          ? {
              trigger: card,
              start: 'top 95%',
              once: true,
            }
          : undefined,
      });

      if (grid) {
        const cells = grid.querySelectorAll('[data-gh-cell]');
        gsap.fromTo(
          cells,
          { opacity: 0.55, scale: 0.85 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.35,
            ease: 'power2.out',
            stagger: {
              amount: 0.35,
              from: 'start',
            },
            scrollTrigger: card
              ? {
                  trigger: card,
                  start: 'top 95%',
                  once: true,
                }
              : undefined,
          }
        );
      }
    }, cardRef);

    // On mobile, scroll graph cleanly to most recent contributions on right
    if (window.innerWidth < 1024 && scrollViewportRef.current) {
      const vp = scrollViewportRef.current;
      requestAnimationFrame(() => {
        vp.scrollLeft = Math.max(0, vp.scrollWidth - vp.clientWidth);
      });
    }

    return () => ctx.revert();
  }, [data]);

  const weekCount = data?.weeks.length ?? 53;

  return (
    <SectionWrapper id="github-activity">
      <Container>
        <GitCard ref={cardRef}>
          <TopBar>
            <LeftIdentity>
              <HandleRow>
                <GitHubBadge
                  href={`https://github.com/${data?.username ?? 'umarnaxir'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="live-dot" />
                  <GitHubIcon size="0.9rem" />
                  <span>@{data?.username ?? 'umarnaxir'}</span>
                </GitHubBadge>

                {data?.profile && (
                  <RepoMetaChip>
                    <span>{data.profile.publicRepos} Public Repos</span>
                  </RepoMetaChip>
                )}

                <RefreshBtn
                  type="button"
                  onClick={handleManualSync}
                  disabled={loading}
                  $spinning={loading}
                  aria-label="Refresh live GitHub contributions"
                >
                  <RefreshCw size={12} strokeWidth={2.2} aria-hidden="true" />
                  <span>{loading ? 'Syncing' : 'Live Sync'}</span>
                </RefreshBtn>
              </HandleRow>

              <TotalHeading>
                <span className="count-num">
                  {loading && !data ? '--' : displayTotal.toLocaleString()}
                </span>
                <span>contributions</span>
                <span className="count-sub">
                  {selectedYear === 'last' ? 'in the last year' : `in ${selectedYear}`}
                </span>
              </TotalHeading>
            </LeftIdentity>

            <YearTabs role="tablist" aria-label="GitHub contribution year">
              {yearOptions.map((opt) => (
                <YearBtn
                  key={opt.id}
                  type="button"
                  role="tab"
                  aria-selected={selectedYear === opt.id}
                  $active={selectedYear === opt.id}
                  onClick={() => handleSelectYear(opt.id)}
                >
                  {opt.label}
                </YearBtn>
              ))}
            </YearTabs>
          </TopBar>

          <GraphSurface>
            {error ? (
              <div style={{ padding: '2rem 1rem', textAlign: 'center', fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)' }}>
                <p>{error}</p>
                <button
                  type="button"
                  onClick={handleManualSync}
                  style={{
                    marginTop: '0.75rem',
                    padding: '0.45rem 1rem',
                    borderRadius: '8px',
                    background: '#b15f2c',
                    color: '#fff',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                  }}
                >
                  Retry Live Fetch
                </button>
              </div>
            ) : loading && !data ? (
              <SkeletonGrid />
            ) : (
              data && (
                <ScrollViewport ref={scrollViewportRef}>
                  <MatrixInner $weekCount={weekCount}>
                    <CornerSpacer />
                    <MonthsRow $weekCount={weekCount}>
                      {data.weeks.map((week, wIdx) => (
                        <MonthLabel key={wIdx}>{week.monthLabel ?? ''}</MonthLabel>
                      ))}
                    </MonthsRow>

                    <WeekdaysCol>
                      {WEEKDAYS.map((day, idx) => (
                        <span key={idx}>{day}</span>
                      ))}
                    </WeekdaysCol>

                    <CellsGrid ref={gridRef} $weekCount={weekCount}>
                      {data.weeks.map((week, wIdx) => (
                        <WeekColumn key={wIdx}>
                          {week.days.map((day, dIdx) =>
                            day ? (
                              <DayCell
                                key={day.date}
                                type="button"
                                data-gh-cell
                                $level={day.level}
                                $selected={selectedDay?.date === day.date}
                                onMouseEnter={() => setSelectedDay(day)}
                                onFocus={() => setSelectedDay(day)}
                                onClick={() => setSelectedDay(day)}
                                aria-label={`${day.count} contributions on ${formatHumanDate(day.date)}`}
                                title={`${day.count} contributions on ${formatHumanDate(day.date)}`}
                              />
                            ) : (
                              <EmptySlot key={`empty-${wIdx}-${dIdx}`} />
                            )
                          )}
                        </WeekColumn>
                      ))}
                    </CellsGrid>
                  </MatrixInner>
                </ScrollViewport>
              )
            )}

            <LegendAndTooltipBar>
              <InspectorText>
                {selectedDay ? (
                  <span>
                    <strong>
                      {selectedDay.count} {selectedDay.count === 1 ? 'contribution' : 'contributions'}
                    </strong>{' '}
                    on {formatHumanDate(selectedDay.date)}
                  </span>
                ) : (
                  <span className="swipe-hint">← Swipe full year &amp; tap any square</span>
                )}
              </InspectorText>

              <LegendGroup aria-label="Contribution intensity legend">
                <span>Less</span>
                {([0, 1, 2, 3, 4] as const).map((lvl) => (
                  <div
                    key={lvl}
                    className="legend-box"
                    style={{ background: LEVEL_COLORS[lvl] }}
                  />
                ))}
                <span>More</span>
              </LegendGroup>
            </LegendAndTooltipBar>
          </GraphSurface>

          <CardFooterActions>
            <span>
              Real-time data fetched directly from GitHub
              {data?.fetchedAt
                ? ` • Updated ${new Date(data.fetchedAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}`
                : ''}
            </span>

            <a
              href={`https://github.com/${data?.username ?? 'umarnaxir'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="profile-link"
            >
              <span>View GitHub Profile</span>
              <ArrowUpRight size="0.875rem" />
            </a>
          </CardFooterActions>
        </GitCard>
      </Container>
    </SectionWrapper>
  );
}
