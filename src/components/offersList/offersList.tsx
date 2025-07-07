'use client';

import { Trip } from '@/types/trip';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { DateRange } from 'react-day-picker';
import { Filters, Tab } from '../filters';
import { Card, CardSkeleton } from '../card';
import { getTrips } from '@/lib/api/getTrips';
import { ArrowUp } from 'lucide-react';
import { formatDate } from '@/lib/formatDate';

const LIMIT = 6;

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const OffersList = ({ initialTrips }: { initialTrips: Trip[] }) => {
  const defaultPriceRange = [0, 10000];
  const [priceRange, setPriceRange] = useState(defaultPriceRange);
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined
  });
  const [selectedAirports, setSelectedAirports] = useState<string[]>([]);
  const [selectedfoodOptions, setSelectedfoodOptions] = useState<string[]>([]);
  const [trips, setTrips] = useState<Trip[]>(initialTrips);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [offset, setOffset] = useState(initialTrips.length);
  const [hasMore, setHasMore] = useState(initialTrips.length === LIMIT);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const isComplitedTab = activeTab === 'completed';
  const isActiveTab = activeTab === 'active';

  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchTrips = useCallback(
    async (reset = false) => {
      if (loading) return;

      setLoading(true);
      try {
        const response = await getTrips({
          priceRange,
          date,
          departures: selectedAirports,
          food: selectedfoodOptions,
          search,
          limit: LIMIT,
          offset: reset ? 0 : offset
        });

        if (reset) {
          setTrips(response);
          setOffset(LIMIT);
          setHasMore(response.length === LIMIT);
        } else {
          setTrips((prev) => {
            const uniqueTrips = [
              ...prev,
              ...response.filter((trip) => !prev.some((t) => t.id === trip.id))
            ];
            return uniqueTrips;
          });
          setOffset((prev) => prev + LIMIT);
          if (response.length < LIMIT) setHasMore(false);
        }
      } catch {}
      setLoading(false);
    },
    [
      priceRange,
      date,
      selectedAirports,
      selectedfoodOptions,
      search,
      offset,
      loading
    ]
  );

  const handleSearch = () => {
    fetchTrips(true); // Reset list and fetch from start
  };

  // Load initial trips
  useEffect(() => {
    fetchTrips(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Infinite Scroll Observer
  useEffect(() => {
    if (!hasMore || loading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchTrips();
        }
      },
      { root: null, rootMargin: '400px', threshold: 1.0 }
    );

    const currentRef = observerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [fetchTrips, hasMore, loading]);

  useEffect(() => {
    const handleScroll = () => {
      const shouldShow = window.scrollY > 800 && trips.length > 6;
      setShowScrollTop(shouldShow);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [trips.length]);

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
        setActiveTab={setActiveTab}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch w-full">
        {trips
          .filter(({ expired }) => {
            if (isComplitedTab) {
              return expired;
            } else if (isActiveTab) {
              return !expired;
            } else {
              return true;
            }
          })
          .map(
            ({
              id,
              title,
              price,
              duration,
              startDate,
              endDate,
              image,
              shortDescription,
              expired
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
            )
          )}
        {loading &&
          Array.from({ length: LIMIT }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
      </div>
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-primary text-white p-3 rounded-full shadow-md hover:bg-primary/90 transition"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
      {!loading && trips.length === 0 && (
        <div className="min-h-[121px]">
          <p className="text-center text-gray-500 py-6">
            Brak ofert spełniających wybrane kryteria.
          </p>
        </div>
      )}
      {hasMore && !loading && <div ref={observerRef} className="h-10 mt-6" />}
    </>
  );
};
