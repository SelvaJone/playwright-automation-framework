export class BookingApi {
    constructor(request) {
        this.request = request;
        this.baseUrl = "https://restful-booker.herokuapp.com";
    }

    async getBooking(bookingId) {
        return await this.request.get(
            `${this.baseUrl}/booking/${bookingId}`
        );
    }

    async createBooking(bookingData) {
        return await this.request.post(
            `${this.baseUrl}/booking`,
            {
                data: bookingData
            }
        );
    }
   async updateBooking(bookingId, bookingData, token) {
    return await this.request.put(
        `${this.baseUrl}/booking/${bookingId}`,
        {
            data: bookingData,
            headers: {
                Cookie: `token=${token}`
            }
        }
    );

}
    async createToken(username, password) {
        return await this.request.post(
            `${this.baseUrl}/auth`,
            {
                data: {
                    username,
                    password
                }
            }
        );
    }
    async deleteBooking(bookingId, token) {
    return await this.request.delete(
        `${this.baseUrl}/booking/${bookingId}`,
        {
            headers: {
                Cookie: `token=${token}`
            }
        }
    );
}
}
// getBooking()
// createBooking()
// updateBooking()
// createToken()
// deleteBooking()