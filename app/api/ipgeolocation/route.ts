import { NextRequest, NextResponse } from "next/server";
import countryToCurrency, { Countries } from "country-to-currency";
import { premiumPriceUSD } from "@/src/core/data/constants";

const getCurrencyFromCountry = (countryCode: Countries) => {
  return countryToCurrency[countryCode]
    ? countryToCurrency[countryCode]
    : "USD";
};

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      req.ip ||
      "127.0.0.1";
    console.log({ forw:  req.headers.get("x-forwarded-for"),real:req.headers.get("x-real-ip"),ip: req.ip });
    const geoUrl = `https://ipinfo.io/${ip}?token=${process.env.ipinfo_token}`;
    const res = await fetch(geoUrl);
    const data = await res.json();
    const country = data.country;
    const currency = getCurrencyFromCountry(country).toLocaleUpperCase();
    const response = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${currency}`,
      { next: { revalidate: 3600 } }
    );

    const d = await response.json();
    let baseprice = Number(d.rates[currency]);
    if (isNaN(baseprice)) {
      baseprice = 1;
    }
    const price = baseprice * premiumPriceUSD;
    console.log({
      dd: d.rates[currency.toLocaleUpperCase()],
      cc: currency,
      country,
    });
    return NextResponse.json([{ price, currency }, null]);
  } catch (error: any) {
    return NextResponse.json([null, error.message]);
  }
}
