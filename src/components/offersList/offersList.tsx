'use client';

import { Trip } from '@/types/trip';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { DateRange } from 'react-day-picker';
import { Filters, Tab } from '../filters';
import { Card, CardSkeleton } from '../card';
import { getTrips } from '@/lib/api/getTrips';
import { formatDate } from '@/lib/formatDate';
import { defaultPriceRange } from '../filters/additionalFilters';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

const LIMIT = 6;

// Helper: build URLSearchParams from current filter state
const buildParams = ({
  search,
  priceRange,
  date,
  selectedAirports,
  selectedfoodOptions,
  activeTab,
  page,
}: {
  search: string;
  priceRange: number[];
  date: DateRange | undefined;
  selectedAirports: string[];
  selectedfoodOptions: string[];
  activeTab: Tab;
  page: number;
}): URLSearchParams => {
  const params = new URLSearchParams();

  if (search) params.set('search', search);
  if (priceRange[0] !== defaultPriceRange[0])
    params.set('minPrice', String(priceRange[0]));
  if (priceRange[1] !== defaultPriceRange[1])
    params.set('maxPrice', String(priceRange[1]));
  if (date?.from) params.set('from', date.from.toISOString());
  if (date?.to) params.set('to', date.to.toISOString());
  selectedAirports.forEach((a) => params.append('departures', a));
  selectedfoodOptions.forEach((f) => params.append('food', f));
  if (activeTab !== 'active') params.set('tab', activeTab);
  if (page > 1) params.set('page', String(page));

  return params;
};

export const OffersList = ({ initialTrips }: { initialTrips: Trip[] }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const initializedRef = useRef(false);

  // Initialize state from URL params
  const [priceRange, setPriceRange] = useState<number[]>(() => {
    const min = searchParams.get('minPrice');
    const max = searchParams.get('maxPrice');
    return [
      min ? Number(min) : defaultPriceRange[0],
      max ? Number(max) : defaultPriceRange[1],
    ];
  });
  const [date, setDate] = useState<DateRange | undefined>(() => {
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    return {
      from: from ? new Date(from) : undefined,
      to: to ? new Date(to) : undefined,
    };
  });
  const [selectedAirports, setSelectedAirports] = useState<string[]>(() =>
    searchParams.getAll('departures'),
  );
  const [selectedfoodOptions, setSelectedfoodOptions] = useState<string[]>(() =>
    searchParams.getAll('food'),
  );
  const [search, setSearch] = useState(() => searchParams.get('search') || '');
  const [activeTab, setActiveTab] = useState<Tab>(
    () => (searchParams.get('tab') as Tab) || 'active',
  );
  const [currentPage, setCurrentPage] = useState(
    () => Number(searchParams.get('page')) || 1,
  );

  // If URL has filters/page params, initialTrips won't match — start loading
  const hasUrlFilters =
    searchParams.has('search') ||
    searchParams.has('minPrice') ||
    searchParams.has('maxPrice') ||
    searchParams.has('from') ||
    searchParams.has('to') ||
    searchParams.has('departures') ||
    searchParams.has('food') ||
    searchParams.has('tab') ||
    searchParams.has('page');

  const [trips, setTrips] = useState<Trip[]>(hasUrlFilters ? [] : initialTrips);
  const [loading, setLoading] = useState(hasUrlFilters);
  const [total, setTotal] = useState(0);

  const totalPages = Math.ceil(total / LIMIT);

  // Update URL without navigation (shallow)
  const updateUrl = useCallback(
    (params: URLSearchParams) => {
      const qs = params.toString();
      const newUrl = qs ? `${pathname}?${qs}` : pathname;
      router.replace(newUrl, { scroll: false });
    },
    [pathname, router],
  );

  const fetchTrips = useCallback(
    async ({
      page,
      searchVal,
      priceRangeVal,
      dateVal,
      airportsVal,
      foodVal,
      tabVal,
    }: {
      page: number;
      searchVal: string;
      priceRangeVal: number[];
      dateVal: DateRange | undefined;
      airportsVal: string[];
      foodVal: string[];
      tabVal: Tab;
    }) => {
      setLoading(true);
      try {
        const offset = (page - 1) * LIMIT;
        const { trips: fetchedTrips, total: fetchedTotal } = await getTrips({
          priceRange: priceRangeVal,
          date: dateVal,
          departures: airportsVal,
          food: foodVal,
          search: searchVal,
          limit: LIMIT,
          offset,
          expired:
            tabVal === 'completed'
              ? true
              : tabVal === 'active'
                ? false
                : undefined,
        });
        setTrips(fetchedTrips);
        setTotal(fetchedTotal);
      } catch {}

      setLoading(false);
    },
    [],
  );

  const scrollToResults = () => {
    const element = document.getElementById('show-items');
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - 100;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const handleSearch = async () => {
    const newPage = 1;
    setCurrentPage(newPage);

    const params = buildParams({
      search,
      priceRange,
      date,
      selectedAirports,
      selectedfoodOptions,
      activeTab,
      page: newPage,
    });
    updateUrl(params);

    await fetchTrips({
      page: newPage,
      searchVal: search,
      priceRangeVal: priceRange,
      dateVal: date,
      airportsVal: selectedAirports,
      foodVal: selectedfoodOptions,
      tabVal: activeTab,
    });

    const isDesktop = window.innerWidth > 768;
    if (!isDesktop) scrollToResults();
  };

  const handlePageChange = async (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);

    const params = buildParams({
      search,
      priceRange,
      date,
      selectedAirports,
      selectedfoodOptions,
      activeTab,
      page,
    });
    updateUrl(params);

    await fetchTrips({
      page,
      searchVal: search,
      priceRangeVal: priceRange,
      dateVal: date,
      airportsVal: selectedAirports,
      foodVal: selectedfoodOptions,
      tabVal: activeTab,
    });

    scrollToResults();
  };

  const handleTabChange = async (tab: Tab) => {
    setActiveTab(tab);
    const newPage = 1;
    setCurrentPage(newPage);

    const params = buildParams({
      search,
      priceRange,
      date,
      selectedAirports,
      selectedfoodOptions,
      activeTab: tab,
      page: newPage,
    });
    updateUrl(params);

    await fetchTrips({
      page: newPage,
      searchVal: search,
      priceRangeVal: priceRange,
      dateVal: date,
      airportsVal: selectedAirports,
      foodVal: selectedfoodOptions,
      tabVal: tab,
    });
  };

  const getVisiblePages = (): number[] => {
    const pages: number[] = [];
    const maxVisible = 5;

    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = start + maxVisible - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  // Load trips on mount (uses URL params state)
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    fetchTrips({
      page: currentPage,
      searchVal: search,
      priceRangeVal: priceRange,
      dateVal: date,
      airportsVal: selectedAirports,
      foodVal: selectedfoodOptions,
      tabVal: activeTab,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Filters
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        date={date}
        setDate={setDate}
        selectedAirports={selectedAirports}
        setSelectedAirports={setSelectedAirports}
        selectedfoodOptions={selectedfoodOptions}
        setSelectedfoodOptions={setSelectedfoodOptions}
        defaultPriceRange={defaultPriceRange}
        onSearch={handleSearch}
        search={search}
        setSearch={setSearch}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch w-full"
        id="show-items"
      >
        {trips.map(
          ({
            id,
            title,
            price,
            duration,
            startDate,
            endDate,
            image,
            shortDescription,
            expired,
          }) => (
            <Card
              id={id}
              key={`${id}-${title}`}
              title={title}
              price={price}
              duration={duration}
              date={`${formatDate(startDate)} - ${formatDate(endDate)}`}
              photo={image}
              description={shortDescription}
              variant="large"
              expired={expired}
            />
          ),
        )}
        {loading &&
          Array.from({ length: LIMIT }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
      </div>
      {!loading && trips.length === 0 && (
        <div className="min-h-[121px]" id="show-items">
          <p className="text-center text-muted py-6">
            Brak ofert spełniających wybrane kryteria.
          </p>
        </div>
      )}
      {totalPages > 1 && !loading && (
        <Pagination className="justify-center">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(currentPage - 1);
                }}
                className={
                  currentPage === 1
                    ? 'pointer-events-none opacity-50'
                    : 'cursor-pointer'
                }
              />
            </PaginationItem>
            {getVisiblePages().map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={page === currentPage}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(page);
                  }}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(currentPage + 1);
                }}
                className={
                  currentPage === totalPages
                    ? 'pointer-events-none opacity-50'
                    : 'cursor-pointer'
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};
