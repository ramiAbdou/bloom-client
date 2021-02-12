export interface CreateEventGuestArgs {
  email?: string;
  eventId: string;
  firstName?: string;
  lastName?: string;
}

export interface CreateEventWatchArgs {
  eventId: string;
}

export interface EventIdProps {
  eventId: string;
}
