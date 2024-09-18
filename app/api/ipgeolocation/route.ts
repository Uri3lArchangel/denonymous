import { NextRequest, NextResponse } from "next/server";
import currencyCodes from "currency-codes";

const getCurrencyFromCountry = (countryCode: string) => {
  const currency = currencyCodes.country(countryCode);
  return currency ? currency[0] : "USD";
};

export async function GET(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || req.ip;
  const geoUrl = `https://ipinfo.io/${ip}?token=${process.env.ipinfo_token}`;

  try {
    const res = await fetch(geoUrl);
    const data = await res.json();
    const country = data.country;
    console.log({ country, data });
    const currency = getCurrencyFromCountry(country);
    console.log({ currency, data });
    return NextResponse.json([currency, null]);
  } catch (error: any) {
    return NextResponse.json([null, error.message]);
  }
}
