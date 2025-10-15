"use client"; // Only needed if you use hooks like useState, useMutation, etc.

import { EventForm } from "@/components/event-form";

export default function NewEventPage() {
  return (
    <section className="grid gap-6">
      <header>
        <h1 className="text-pretty text-xl font-semibold">Create a new event</h1>
        <p className="text-sm text-muted-foreground">
          Times are saved in IST. Display adapts to your timezone.
        </p>
      </header>
      <EventForm />
    </section>
  );
}
