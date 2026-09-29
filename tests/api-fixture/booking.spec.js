import { test, expect } from "./fixtures/apiFixtures.js";
import bookingData from "../testdata/bookingData.json" with { type: "json" };

test("Get booking details", async ({ bookingApi }) => {

    const response = await bookingApi.getBooking(1);

    expect(response.status()).toBe(200);

    const booking = await response.json();

    console.log(booking);

    expect(booking).toHaveProperty("firstname");
    expect(booking).toHaveProperty("lastname");
});


test("Create new booking", async ({ bookingApi }) => {

    const bookingData = {
        firstname: "Selva",
        lastname: "QA",
        totalprice: 250,
        depositpaid: true,
        bookingdates: {
            checkin: "2026-10-01",
            checkout: "2026-10-10"
        },
        additionalneeds: "Breakfast"
    };

    const response = await bookingApi.createBooking(bookingData);

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    console.log(responseBody);

    expect(responseBody).toHaveProperty("bookingid");
    expect(responseBody.booking).toHaveProperty("firstname", "Selva");
    expect(responseBody.booking).toHaveProperty("lastname", "QA");
});
test("Create booking and retrieve it", async ({ bookingApi }) => {

    // 1. Test data
    const bookingData = {
        firstname: "Selva",
        lastname: "Automation",
        totalprice: 300,
        depositpaid: true,
        bookingdates: {
            checkin: "2026-10-01",
            checkout: "2026-10-10"
        },
        additionalneeds: "Breakfast"
    };

    // 2. Create booking
    const createResponse = await bookingApi.createBooking(bookingData);

    expect(createResponse.status()).toBe(200);

    // 3. Get response JSON
    const createResponseBody = await createResponse.json();

    console.log("Create Response:", createResponseBody);

    // 4. Capture booking ID
    const bookingId = createResponseBody.bookingid;

    expect(bookingId).toBeTruthy();

    // 5. Get the newly created booking
    const getResponse = await bookingApi.getBooking(bookingId);

    expect(getResponse.status()).toBe(200);

    // 6. Read GET response
    const booking = await getResponse.json();

    console.log("Get Response:", booking);

    // 7. Validate the data
    expect(booking.firstname).toBe("Selva");
    expect(booking.lastname).toBe("Automation");
    expect(booking.totalprice).toBe(300);
    expect(booking.depositpaid).toBe(true);
});
test("Create and update booking", async ({ bookingApi }) => {
    const tokenResponse = await bookingApi.createToken(
    "admin",
    "password123"
);

expect(tokenResponse.status()).toBe(200);

const tokenBody = await tokenResponse.json();

const token = tokenBody.token;

console.log("Token:", token);

    // 1. Create booking
    const bookingData = {
        firstname: "Selva",
        lastname: "QA",
        totalprice: 250,
        depositpaid: true,
        bookingdates: {
            checkin: "2026-10-01",
            checkout: "2026-10-10"
        },
        additionalneeds: "Breakfast"
    };

    const createResponse = await bookingApi.createBooking(bookingData);

    expect(createResponse.status()).toBe(200);

    const createBody = await createResponse.json();

    const bookingId = createBody.bookingid;

    console.log("Created Booking ID:", bookingId);

    // 2. Updated data
    const updatedBooking = {
        firstname: "Selva",
        lastname: "Automation",
        totalprice: 500,
        depositpaid: false,
        bookingdates: {
            checkin: "2026-11-01",
            checkout: "2026-11-15"
        },
        additionalneeds: "Lunch"
    };

    // 3. Update booking
    const updateResponse = await bookingApi.updateBooking(
    bookingId,
    updatedBooking,
    token
);

    expect(updateResponse.status()).toBe(200);

    const updateBody = await updateResponse.json();

    console.log("Updated Booking:", updateBody);

    // 4. Validate PUT response
    expect(updateBody.firstname).toBe("Selva");
    expect(updateBody.lastname).toBe("Automation");
    expect(updateBody.totalprice).toBe(500);
    expect(updateBody.depositpaid).toBe(false);

    // 5. GET the booking again
    const getResponse = await bookingApi.getBooking(bookingId);

    expect(getResponse.status()).toBe(200);

    const getBody = await getResponse.json();

    console.log("GET After Update:", getBody);

    // 6. Verify updated data
    expect(getBody.firstname).toBe("Selva");
    expect(getBody.lastname).toBe("Automation");
    expect(getBody.totalprice).toBe(500);
    expect(getBody.depositpaid).toBe(false);
});

test("Create and delete booking", async ({ bookingApi }) => {

    // 1. Create authentication token
    const tokenResponse = await bookingApi.createToken(
        "admin",
        "password123"
    );

    expect(tokenResponse.status()).toBe(200);

    const tokenBody = await tokenResponse.json();

    const token = tokenBody.token;

    // 2. Create booking
    // const bookingData = {
    //     firstname: "Selva",
    //     lastname: "DeleteTest",
    //     totalprice: 200,
    //     depositpaid: true,
    //     bookingdates: {
    //         checkin: "2026-10-01",
    //         checkout: "2026-10-10"
    //     },
    //     additionalneeds: "Breakfast"
    // };

    const createResponse =
        await bookingApi.createBooking(bookingData);
        console.log("Create Status:", createResponse.status());
console.log("Create Response:", await createResponse.text());


    expect(createResponse.status()).toBe(200);

    const createBody = await createResponse.json();

    const bookingId = createBody.bookingid;

    console.log("Created Booking ID:", bookingId);

    // 3. Delete booking
    const deleteResponse =
        await bookingApi.deleteBooking(bookingId, token);

    expect(deleteResponse.status()).toBe(201);

    // 4. Verify booking is deleted
    const getResponse =
        await bookingApi.getBooking(bookingId);

    expect(getResponse.status()).toBe(404);

    console.log("Booking successfully deleted");
});
for (const data of bookingData) {

    test(`Create booking - ${data.firstname}`, async ({ bookingApi }) => {

        const response = await bookingApi.createBooking(data);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        console.log("Created Booking:", responseBody);

        expect(responseBody).toHaveProperty("bookingid");
        expect(responseBody.booking.firstname)
            .toBe(data.firstname);

        expect(responseBody.booking.lastname)
            .toBe(data.lastname);

        expect(responseBody.booking.totalprice)
            .toBe(data.totalprice);
    });
}
//Don't validate only the operation response; validate the resulting state.
/*
Create Token
     ↓
token = abc123
     ↓
Create Booking
     ↓
bookingId = 123
     ↓
PUT /booking/123
Cookie: token=abc123
     ↓
GET /booking/123
     ↓
Verify updated data
*/