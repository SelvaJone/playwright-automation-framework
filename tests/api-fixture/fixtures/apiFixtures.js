import { test as base } from "@playwright/test";

import { BookingApi } from "../api/BookingApi.js";

export const test = base.extend({

    bookingApi: async ({ request }, use) => {

        const bookingApiObject = new BookingApi(request);

        await use(bookingApiObject);
    }
});

export { expect } from "@playwright/test";