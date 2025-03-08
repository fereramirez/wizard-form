"use client";

import type React from "react";

import {createContext, useContext, useState, useCallback, type ReactNode} from "react";

import {type Prettify} from "@/types/utilility-types";

type Event = {name: string; timestamp: number};
type Events = Event[];
type EventsWithElapsedTime = Prettify<Event & {elapsedTime: number}>[];

type EventsStore = {
  events: Events;
  trackEvent: (eventName: string) => void;
  getEvents: () => Events;
  getEventsWithElapsedTime: () => EventsWithElapsedTime;
  resetEvents: () => void;
};

const EventsContext = createContext<EventsStore | undefined>(undefined);

export function EventsProvider({children}: {children: ReactNode}) {
  const [events, setEvents] = useState<Events>([]);

  const trackEvent = useCallback((eventName: string) => {
    const currentTime = Date.now();

    console.log("trackEvent", {eventName, currentTime});

    setEvents((prevEvents) => [...prevEvents, {name: eventName, timestamp: currentTime}]);
  }, []);

  const getEvents = useCallback(() => {
    return events;
  }, [events]);

  const getEventsWithElapsedTime = useCallback(() => {
    return events.map((event) => ({
      ...event,
      elapsedTime: event.timestamp - events[0].timestamp,
    }));
  }, [events]);

  const resetEvents = useCallback(() => {
    setEvents([]);
  }, []);

  const value: EventsStore = {
    events,
    trackEvent,
    getEvents,
    getEventsWithElapsedTime,
    resetEvents,
  };

  return <EventsContext.Provider value={value}>{children}</EventsContext.Provider>;
}

export const useEventsStore = (): EventsStore => {
  const context = useContext(EventsContext);

  if (context === undefined) {
    throw new Error("useEventsStore must be used within an EventsProvider");
  }

  return context;
};
