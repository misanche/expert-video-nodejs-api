import { Request, Response } from "express";
import * as P from "bluebird";
import { Exchange, ModelError } from "../lib/models/models";
import * as rp from "request-promise";

export async function getExchangeHandler(req: Request, res: Response): P<any> {
  const options = {
    uri: "https://api.exchangeratesapi.io/latest",
    headers: {
        "Content-Type": "application/json"
    },
    json: true // Automatically parses the JSON string in the response
  };

  try {
      const body: Exchange = await rp(options);
      res.json(body);
  } catch (exception) {
      res.json({ message: "Uknown Error"} as ModelError);
  }

}
