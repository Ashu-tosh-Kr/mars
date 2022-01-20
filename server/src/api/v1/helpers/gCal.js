import vars from "../../../config/vars.js";
//google calendar config
import { google } from "googleapis";
const { OAuth2 } = google.auth;
const oAuth2Client = new OAuth2(
  vars.googleOAuthClientId,
  vars.googleOAuthClientSecret
);
oAuth2Client.setCredentials({ refresh_token: vars.googleOAuthRefreshToken });
const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

/**
 * @docs https://developers.google.com/calendar/api/v3/reference/events/insert
 */
export const addCalEvent = async (gig, talent) => {
  const gigStart = new Date(gig.gigStart);
  const gigEnd = new Date(gig.gigEnd);

  const event = {
    summary: `[${gig.galId}]${gig.gigTitle}`,
    location: gig.gigLocation,
    description: gig.gigDetails,
    colorId: 5,
    start: {
      dateTime: gigStart,
      timeZone: "Asia/Kolkata",
    },
    end: {
      dateTime: gigEnd,
      timeZone: "Asia/Kolkata",
    },
    attendees: [{ displayName: talent.username, email: talent.email }],
  };
  calendar.events.insert(
    { calendarId: "primary", resource: event },
    async (err, event) => {
      // Check for errors and log them if they exist.
      if (err) return console.error("Error Creating Calender Event:", err);
      // Else log that the event was created.
      console.log("Calendar event successfully created.");
      gig.gCalEventId = event.data.id;
      await gig.save();
    }
  );
};

/**
 * @docs https://developers.google.com/calendar/api/v3/reference/events/patch
 */
export const updateCalEvent = async (gig) => {
  const gigStart = new Date(gig.gigStart);
  const gigEnd = new Date(gig.gigEnd);

  const event = {
    summary: `[${gig.galId}]${gig.gigTitle}`,
    location: gig.gigLocation,
    description: gig.gigDetails,
    colorId: gig.currentStatus.step,
    start: {
      dateTime: gigStart,
      timeZone: "Asia/Kolkata",
    },
    end: {
      dateTime: gigEnd,
      timeZone: "Asia/Kolkata",
    },
  };
  calendar.events.patch(
    { calendarId: "primary", eventId: gig.gCalEventId, resource: event },
    async (err) => {
      // Check for errors and log them if they exist.
      if (err) return console.error("Error Creating Calender Event:", err);
      // Else log that the event was created.
      console.log("Calendar event successfully updated.");
    }
  );
};

export const cencelCalEvent = async (gig) => {
  const gigStart = new Date(gig.gigStart);
  const gigEnd = new Date(gig.gigEnd);

  const event = {
    summary: `[${gig.galId}]${gig.gigTitle}`,
    location: gig.gigLocation,
    description: gig.gigDetails,
    colorId: 1,
    status: "cancelled",
    start: {
      dateTime: gigStart,
      timeZone: "Asia/Kolkata",
    },
    end: {
      dateTime: gigEnd,
      timeZone: "Asia/Kolkata",
    },
  };
  calendar.events.patch(
    { calendarId: "primary", eventId: gig.gCalEventId, resource: event },
    async (err) => {
      // Check for errors and log them if they exist.
      if (err) return console.error("Error Creating Calender Event:", err);
      // Else log that the event was created.
      console.log("Calendar event successfully updated.");
    }
  );
};
