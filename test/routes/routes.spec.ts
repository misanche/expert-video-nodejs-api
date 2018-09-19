import chaiHttp = require("chai-http");
import { initSwaggerMiddlware } from "../../src/middlewares/swagger";
import app from "../../src/application";
import * as chai from "chai";
import * as nock from "nock";
import { Exchange } from "../../src/lib/models/exchange";

const expect = chai.expect;
chai.use(chaiHttp);

describe("Exchange - test GET endpoint ", function () {

    // Mocking call to 3rd party API
    nock("https://api.exchangeratesapi.io")
                .get("/latest?base=EUR")
                // tslint:disable-next-line:max-line-length
                .reply(200, {"base": "EUR", "date": "2018-09-07", "rates": {"AUD": 1.6164, "BGN": 1.9558, "BRL": 4.7918, "CAD": 1.5338, "CHF": 1.1275, "CNY": 7.9451, "CZK": 25.715, "DKK": 7.4567, "GBP": 0.89824, "HKD": 9.1324, "HRK": 7.4341, "HUF": 326.49, "IDR": 17324.0, "ILS": 4.1706, "INR": 83.718, "ISK": 127.8, "JPY": 129.55, "KRW": 1304.8, "MXN": 22.365, "MYR": 4.812, "NOK": 9.776, "NZD": 1.7633, "PHP": 62.592, "PLN": 4.3183, "RON": 4.6385, "RUB": 79.575, "SEK": 10.591, "SGD": 1.6, "THB": 38.13, "TRY": 7.6282, "USD": 1.1634, "ZAR": 17.823}} as Exchange);

    it("should be able to retrieve the exchange", (done: () => void): void => {
        chai.request(app)
            .get("/api/exchange/latest?base=EUR")
            .set("content-type", "application/json")
            .send({})
            .end((err: Error, res: any): void => {
                expect(res.statusCode).to.be.equal(200);
                expect(res.body).not.to.be.equal(undefined);
                console.log(res);
                expect(res.body.base).to.be.equal("EUR");
                expect(res.body.date).to.be.equal("2018-09-07");
                expect(res.body.rates).not.to.be.equal(undefined);
                done();
            });
    });

    it("should be able to retrieve the exchange", (done: () => void): void => {
        chai.request(app)
            .get("/api/exchange/latest")
            .set("content-type", "application/json")
            .send({})
            .end((err: Error, res: any): void => {
                expect(res.statusCode).to.be.equal(400);
                expect(res.body.message).to.be.equal("Request validation failed: Parameter (base) is required");
                done();
            });
    });

});