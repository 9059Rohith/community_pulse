
import { toast } from "sonner";
import { Event } from "@/data/mockData";

// In a real app, this would connect to an email service
export const sendRegistrationEmail = (email: string, name: string) => {
  console.log(`Sending registration email to ${email} for user ${name}`);
  // This would be an API call to your email service
  toast.success(`Registration email sent to ${email}`);
  return true;
};

// In a real app, this would connect to an email service
export const sendEventInterestEmail = (email: string, name: string, event: Event) => {
  console.log(`Sending event interest confirmation to ${email} for event: ${event.title}`);
  // This would be an API call to your email service
  return true;
};

// In a real app, this would connect to an email service
export const sendEventReminderEmail = (email: string, name: string, event: Event) => {
  console.log(`Sending event reminder to ${email} for event: ${event.title}`);
  // This would be an API call to your email service
  return true;
};

// Schedule a reminder for 1 hour before the event
export const scheduleEventReminder = (email: string, name: string, event: Event) => {
  const eventTime = new Date(`${event.startDate}T${event.startTime}`);
  const reminderTime = new Date(eventTime.getTime() - 60 * 60 * 1000); // 1 hour before
  const currentTime = new Date();
  
  const timeUntilReminder = reminderTime.getTime() - currentTime.getTime();
  
  if (timeUntilReminder > 0) {
    console.log(`Scheduling reminder for ${email} at ${reminderTime.toLocaleString()}`);
    
    // In a real app, this would be handled by a scheduled task or cron job
    // For demo purposes, we'll use setTimeout if the reminder is within 24 hours
    if (timeUntilReminder < 24 * 60 * 60 * 1000) {
      setTimeout(() => {
        sendEventReminderEmail(email, name, event);
        toast.info(`Reminder: ${event.title} is starting in 1 hour!`, {
          duration: 10000,
        });
      }, timeUntilReminder);
    }
  }
  
  return true;
};
